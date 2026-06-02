#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   build-gy-np-data.js

   Bygger datafilen skolresultat-gy-data.json från Skolverkets öppna API
   (planned-educations, "Utbildningsguiden"). Filen används av sidan
   np-gymnasiet-resultat.html.

   Datakälla (öppet API, ingen nyckel krävs):
     Skolenheter (gymnasiet):
       GET /planned-educations/v3/school-units?typeOfSchooling=gy
     NP-statistik per skola:
       GET /planned-educations/v3/school-units/{kod}/statistics/gy
     Kommunnamn:
       SCB:s tabell BE0101A (Region-koder)

   Körning:  node scripts/build-gy-np-data.js
   (Hämtar allt över nätet, tar några minuter, skriver skolresultat-gy-data.json)
--------------------------------------------------------------------------- */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API = 'https://api.skolverket.se/planned-educations';
const ACCEPT = 'application/vnd.skolverket.plannededucations.api.v3.hal+json';
const OUT = path.join(__dirname, '..', 'skolresultat-gy-data.json');

// De fem provämnena som Skolverkets gy-statistik redovisar
const SUBJECTS = [
  { key: 'SVE', id: 'sve', label: 'Svenska' },
  { key: 'SVA', id: 'sva', label: 'Svenska som andraspråk' },
  { key: 'MA1', id: 'ma1', label: 'Matematik (prov 1)' },
  { key: 'MA2', id: 'ma2', label: 'Matematik (prov 2)' },
  { key: 'ENG', id: 'eng', label: 'Engelska' },
];

function get(url, accept) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { Accept: accept || 'application/json' } }, res => {
      let data = '';
      res.on('data', c => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error('timeout')));
  });
}

async function getJSON(url, accept, retries = 3) {
  for (let i = 0; i <= retries; i++) {
    try {
      const r = await get(url, accept);
      if (r.status === 200) return JSON.parse(r.body);
      if (r.status === 404) return null;
      throw new Error('HTTP ' + r.status);
    } catch (e) {
      if (i === retries) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

const num = v => {
  if (v == null) return null;
  const s = String(v).replace(',', '.').trim();
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null; // hoppa över "..", "*", "cirka 130" m.m.
  return parseFloat(s);
};
const firstExists = arr => (Array.isArray(arr) ? arr.find(x => x && x.valueType === 'EXISTS') : null);

async function getKommunMap() {
  const d = await getJSON('https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningNy');
  const reg = d.variables.find(v => v.code === 'Region');
  const map = {};
  reg.values.forEach((code, i) => { if (/^\d{4}$/.test(code)) map[code] = reg.valueTexts[i]; });
  return map;
}

async function getAllUnits() {
  let all = [];
  for (let page = 0; page < 30; page++) {
    const d = await getJSON(`${API}/v3/school-units?typeOfSchooling=gy&size=100&page=${page}`, ACCEPT);
    const arr = d && d.body && d.body._embedded ? Object.values(d.body._embedded)[0] : [];
    if (!arr.length) break;
    all = all.concat(arr);
    if (d.body.page && page >= d.body.page.totalPages - 1) break;
  }
  const seen = new Set();
  return all.filter(u => (seen.has(u.code) ? false : (seen.add(u.code), true)))
            .map(u => ({ code: u.code, name: u.name, kommunkod: u.geographicalAreaCode,
                         ort: u.postCodeDistrict, huvudman: u.principalOrganizerType }));
}

// Slå ihop programmens NP-resultat till ett skolvärde per ämne
function aggregate(programMetrics) {
  const out = {};
  SUBJECTS.forEach(sub => {
    const vals = [];
    const labels = {};
    let period = null;
    programMetrics.forEach(pm => {
      const ex = firstExists(pm['averageResultNationalTestsSubject' + sub.key]);
      const n = ex ? num(ex.value) : null;
      if (n != null) {
        vals.push(n);
        if (ex.timePeriod) period = ex.timePeriod;
        const lbl = pm[sub.id + 'SubjectTest'];
        if (lbl) labels[lbl] = (labels[lbl] || 0) + 1;
      }
    });
    if (vals.length) {
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      const course = Object.entries(labels).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
      out[sub.id] = { v: +avg.toFixed(1), n: vals.length, course, period };
    }
  });
  return out;
}

async function pool(items, size, worker) {
  const res = []; let idx = 0;
  const runners = Array.from({ length: size }, async () => {
    while (idx < items.length) {
      const i = idx++;
      res[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return res;
}

(async () => {
  console.log('Hämtar kommunnamn (SCB)...');
  const kommunMap = await getKommunMap();

  console.log('Hämtar gymnasieenheter...');
  const units = await getAllUnits();
  console.log('  ' + units.length + ' enheter');

  console.log('Hämtar NP-statistik per skola (kan ta några minuter)...');
  let done = 0;
  const schools = [];
  await pool(units, 16, async u => {
    const d = await getJSON(`${API}/v3/school-units/${u.code}/statistics/gy`, ACCEPT);
    done++;
    if (done % 100 === 0) process.stdout.write('  ' + done + '/' + units.length + '\n');
    const pm = d && d.body && d.body.programMetrics;
    if (!pm || !pm.length) return;
    const subjects = aggregate(pm);
    if (!Object.keys(subjects).length) return; // ingen NP-data
    const grades = num(firstExists(pm.map(p => p).flatMap(p => p.gradesPointsForStudents || []))?.value);
    const examen = num(firstExists(pm.flatMap(p => p.ratioOfPupilsWithExamWithin3Years || []))?.value);
    schools.push({
      namn: u.name,
      kommun: kommunMap[u.kommunkod] || u.ort || u.kommunkod,
      huvudman: u.huvudman === 'Fristående' ? 'Fristående' : 'Kommunal',
      betyg: grades,
      examen: examen,
      amnen: subjects,
    });
  });

  // Rikssnitt per ämne (medel av skolornas värden)
  const riket = {};
  SUBJECTS.forEach(sub => {
    const vals = schools.map(s => s.amnen[sub.id]?.v).filter(v => v != null);
    if (vals.length) riket[sub.id] = +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  });

  schools.sort((a, b) => a.namn.localeCompare(b.namn, 'sv'));

  const payload = {
    uppdaterad: new Date().toISOString().slice(0, 10),
    kalla: 'Skolverket – Utbildningsguiden API (planned-educations v3), statistik/gy',
    amnen: SUBJECTS.map(s => ({ id: s.id, label: s.label })),
    riket,
    antalSkolor: schools.length,
    skolor: schools,
  };

  fs.writeFileSync(OUT, JSON.stringify(payload));
  console.log('Klart: ' + schools.length + ' skolor med NP-data -> ' + path.relative(process.cwd(), OUT));
  console.log('Rikssnitt:', JSON.stringify(riket));
})().catch(e => { console.error(e); process.exit(1); });
