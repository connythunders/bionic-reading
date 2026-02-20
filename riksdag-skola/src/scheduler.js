const cron = require('node-cron');
const db = require('./db');
const riksdag = require('./riksdag');
const mailer = require('./mailer');

async function refreshDocuments() {
  console.log(`[${new Date().toISOString()}] Startar dokumenthämtning...`);

  try {
    const docs = await riksdag.fetchAllDocuments(2);
    const inserted = db.insertDocuments(docs);

    db.setSetting('last_update', new Date().toISOString());

    console.log(`  ${inserted} nya dokument sparade (av ${docs.length} hämtade).`);

    if (inserted > 0) {
      await notifySubscribers();
    }

    return { fetched: docs.length, inserted };
  } catch (err) {
    console.error('Fel vid dokumenthämtning:', err.message);
    return { error: err.message };
  }
}

async function notifySubscribers() {
  const unnotified = db.getUnnotifiedDocuments();
  if (unnotified.length === 0) {
    console.log('  Inga nya dokument att notifiera om.');
    return;
  }

  const subscribers = db.getActiveSubscribers();
  if (subscribers.length === 0) {
    console.log('  Inga aktiva prenumeranter att notifiera.');
    db.markDocumentsNotified(unnotified.map(d => d.id));
    return;
  }

  console.log(`  Skickar notis om ${unnotified.length} dokument till ${subscribers.length} prenumeranter...`);

  const sent = await mailer.sendNotifications(subscribers, unnotified);
  console.log(`  ${sent} mejl skickade.`);

  db.markDocumentsNotified(unnotified.map(d => d.id));
}

function startScheduler() {
  // Run every 6 hours: at minute 0, hours 0,6,12,18
  cron.schedule('0 0,6,12,18 * * *', async () => {
    console.log('--- Schemalagd körning ---');
    await refreshDocuments();
  });

  console.log('Schemaläggare startad (körs var 6:e timme).');
}

module.exports = {
  refreshDocuments,
  notifySubscribers,
  startScheduler
};
