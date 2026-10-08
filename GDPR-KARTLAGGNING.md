# GDPR-kartläggning av sidor och appar i repot

Datum: 2026-10-08. Underlag till samtal med dataskyddsombud/IT-ansvarig. **Inte juridisk rådgivning.**

## Så är det gjort (och gränser)
- Genomgången bygger på sökning i koden: vilka externa adresser varje sida anropar, var nycklar lagras, vilka servrar/databaser som finns och vad som skickas.
- **Verifierat i koden:** vilken tjänst som anropas, hur nyckeln lagras, vilka tabeller servrarna skapar.
- **Bedömt:** exakt vad en elev eller lärare *kan* skriva in i fria textfält, och vilken data som därmed kan hamna hos tredje part. Kontrollera det per sida innan ni drar slutsatser.
- **Inte granskat:** appar som körs på andra adresser och inte finns i repot (se avsnitt 5), den kompilerade koden i `lashjalpen/assets/`, samt de installerade tjänsternas egna villkor och avtal.

Risknivå: **Hög** = personuppgifter eller känsliga uppgifter om elever kan lämna skolan på ett rimligt sätt. **Medel** = fri text från elever går till tredje part. **Låg** = ingen eller obetydlig personkoppling.

## 0. Åtgärdat 2026-10-08 (de snabba åtgärderna)
| Åtgärd | Vad som gjordes |
|---|---|
| Adminlösenord | `workshop-app` har inget förvalt lösenord längre. `ADMIN_PASSWORD` måste sättas i `.env`, annars är adminvyn avstängd. Jämförelsen är tidskonstant. **Om appen någonsin körts publikt med det gamla lösenordet (`workshop2025`) ska det betraktas som röjt, eftersom det finns kvar i git-historiken.** |
| Typsnitt | Google Fonts och cdnfonts/jsDelivr-typsnitt ligger nu i `fonts/` (latin + latin-ext, samt OpenDyslexic). 38 sidor och två CSS-filer pekar på de lokala filerna, och preconnect till Google är borttagna. Eleverna skickar inte längre sin IP-adress till Google för typsnitt. |
| Bibliotek | pdf.js (inkl. worker), mammoth, JSZip, FileSaver, docx, pptxgenjs, Leaflet och MarkerCluster ligger i `vendor/`. Testat: `studera.html` gör inga anrop till externa värdar. |
| Integritetsruta och maskering | `js/privacy.js` är inlagd på 22 AI-sidor. Den visar en påminnelse (kan stängas) och maskerar personnummer, e-postadresser och svenska mobilnummer i texten innan den skickas till AI-tjänsten. Den kan inte maskera namn. |
| Nyckel i URL | `ai-language-coach`, `adaptivt-prov` och `rattvik-presentation-generator` skickar nu Gemini-nyckeln i headern i stället för i URL:en (där den kunde hamna i loggar). |

### Det som återstår av punkt 4 (tredje part)
- `pdf-till-word.html` och `recept-app/index.html` hämtar Tesseract.js (OCR) från jsDelivr, och Tesseract hämtar dessutom språkdata vid körning. Självhosting kräver att man pekar ut `workerPath`, `corePath` och `langPath`.
- `avskrift.html` hämtar Transformers.js och talmodeller från jsDelivr/Hugging Face. Kräver separat arbete (stora modeller).
- Kartbrickor från OpenStreetMap/Carto i `rattvik-atervinning` och `litterara-stockholm` är en del av tjänsten och går inte att ta bort.
- Väder från SMHI/Open-Meteo i `vader-rattvik` hämtas av webbläsaren.
- Bilder från `source.unsplash.com` i `ai-language-coach`.

## 1. Gemensamt mönster för alla AI-sidor
| Egenskap | Läge |
|---|---|
| Hur anropet går | Direkt från elevens/lärarens webbläsare till leverantören (Anthropic `api.anthropic.com` eller Google `generativelanguage.googleapis.com`). Ingen mellanhand hos er. |
| Nyckel | Skrivs in av användaren och sparas i klartext i `localStorage` (till exempel `fg_apikey`, `mtg_key`, `sk_apikey`, `anthropic_api_key`). Anthropic-sidorna använder headern `anthropic-dangerous-direct-browser-access`. |
| Avtal | Inget biträdesavtal finns om nyckeln är privat. Leverantören är då inte skolans personuppgiftsbiträde. |
| Tredje land | Data går till USA. |
| Konsekvens | Skolan (huvudmannen) är personuppgiftsansvarig för vad eleverna skriver, men har ingen insyn eller kontroll. |

Delade skoldatorer: en sparad nyckel i `localStorage` kan läsas av nästa användare på samma webbläsarprofil. Det är en säkerhetsrisk, inte bara en GDPR-fråga.

## 2. AI-sidor, per sida
| Sida | Tjänst | Vad som skickas (bedömt) | Risk | Kommentar |
|---|---|---|---|---|
| `motesapp.html` | Anthropic | Mötestal (taligenkänning i webbläsaren) som text, plus sammanfattning | **Hög** | Möten kan handla om enskilda elever och personal. Röst går dessutom till Google/Microsoft. |
| `motestranskribering.html` | Anthropic | Transkription med talarnamn | **Hög** | Talarnamn byts mot riktiga namn. Exportfiler (.txt) hamnar lokalt. |
| `metodbok-emi.html` | Anthropic | Frågor till handboken för elevhälsans medicinska insats | **Hög** | Frågan kan innehålla elevhälsa/journaluppgifter (art. 9, sekretess). Ska bara användas med generella frågor. |
| `vardnadshavarkommunikation.html` | Anthropic | Ärendebeskrivning, elevens förnamn (valfritt), mejlutkast | **Hög** | Har redan filter för personnummer och GDPR-granskning (bra). Fortfarande känsliga ärenden. |
| `adaptivt-prov.html` | Gemini | Lärarens läsmaterial och elevernas svar på provfrågor | **Medel–Hög** | Elevsvar är kopplade till en inloggad/identifierad elev om läraren organiserar det så. |
| `ai-provtraning.html` | Anthropic | Uppladdad fil (pdf/docx/txt) samt elevsvar | **Medel–Hög** | Uppladdade dokument kan innehålla personuppgifter. |
| `rattvik-presentation-generator.html` | Gemini | Uppladdade filer och text | **Medel–Hög** | Har samtyckesruta om att inte mata in personuppgifter (bra), men kontrollen är bara en ruta. |
| `np-matte.html`, `np-matte-gym.html`, `np-matte-ak9.html` | Anthropic | Elevens svar och frågor | **Medel** | Fri text. Ingen identitet krävs, men elever kan skriva namn. |
| `samhallskunskap-ideologier.html`, `samhallskunskap-marknadsekonomi.html` | Anthropic | "Elevens svar" i fri text | **Medel** | Samma som ovan. Framsteg sparas bara lokalt. |
| `uf-idementor.html` (+ Next-app `uf-idementor/`) | Anthropic | Elevens affärsidé och samtal, ofta med bakgrund och målgrupp | **Medel** | Elever beskriver sin idé, ibland med familj/vänner. Kontrollera var nyckeln hålls i Next-versionen. |
| `gymnasiearbete.html`, `…-bygg-el`, `…-naturbruk`, `…-skog-mark-djur` | Anthropic | Frågor till handboken | **Medel** | Fri text. Handbokens GDPR-kapitel uppmanar redan till avidentifiering. |
| `ai-language-coach.html` | Gemini | Elevens text och uppläst tal (taligenkänning) | **Medel** | Nyckeln skickas i URL (`?key=`), vilket kan hamna i loggar. Bör flyttas till header. Hämtar bild via `source.unsplash.com`. |
| `prata-engelska.html` | Claude eller Gemini | Elevens uppläsning som text | **Medel** | Informerar eleven. Inget sparas av appen. Ska bara användas med godkänd leverantör. |
| `berattelsegeneratorn.html` | Anthropic | Berättelseidéer | **Låg–Medel** | Fri text men sällan personkopplad. |
| `franvaro-generator.html` | Anthropic | Lärarens ämne och kunskapskrav | **Låg** | Ingen elevdata ska skickas. API-nyckel i `fg_apikey`. |
| `partierna-nyheter.html` | Anthropic | Nyhetsrubriker | **Låg** | Ingen personkoppling. |

## 3. Egen server eller databas
| Plats | Vad lagras | Risk | Åtgärd |
|---|---|---|---|
| `backend/` (quiz) | Tabellerna `quiz_results` (poäng), `documents` (uppladdat dokument och **extraherad text**), `quiz_sessions`, `ai_quiz_results` (svar och AI-feedback). Filer sparas i `uploads/`. | **Medel–Hög** | Uppladdade dokument kan innehålla personuppgifter. Inga gallringsregler finns. Begränsa vad som får laddas upp, gallra automatiskt, kräv inloggning. |
| `workshop-app/` | `Submission.teamName` och `Answer.answerText`. | **Medel** | Fri text. **Åtgärdat:** förvalt adminlösenord är borttaget (se avsnitt 0). |
| `riksdag-skola/` | `subscribers` med **e-postadresser**, bekräftelse- och avregistreringstoken. | **Medel** | Dubbel opt-in och avregistrering finns (bra). Saknas: integritetsinformation, gallring, biträdesavtal för e-postleverantör och hosting. |
| `np-engelska/`, `np-engelska-gy/` | Text skickas till ElevenLabs (`api.elevenlabs.io`) via server-nyckel för uppläsning. | **Låg–Medel** | Okej om texten är fasta provtexter. Inte om elevtext. |
| `chatbot/` | Anthropic via serverns nyckel. | **Okänt** | Granska vilken data som kan skickas in och om något loggas (finns ingen lagring i `api/chat.js` vid sökningen). |
| `amnesomraden/`, `amnesomraden-grundskola/` | Hämtar öppna data från Skolverket. | **Låg** | Kontrollera `api/generera` om det skickar fri text till AI. |

## 4. Tredje part som får elevens IP-adress vid sidvisning (typsnitt och bibliotek åtgärdade, se avsnitt 0)
När en sida laddar resurser från en annan domän får den domänen elevens IP-adress. IP-adress är personuppgift. Det har prövats i EU (bland annat Google Fonts i tysk domstol 2022).
- **Google Fonts:** `ai-laromedel/*`, `religion-laromedel/*`, `copilot-*`, `mattestod`, `retorikverkstaden`, `skrivstod`, `uf-idementor`, `lashjalpen`.
- **cdnfonts.com:** manualerna (`copilot-manual-*`, `excel-manual`, `word-manual`, `powerpoint-manual`, `onedrive-manual`, `teams-manual-gy`, `notebooklm-manual`), `ai-provtraning`, `studera`.
- **CDN för bibliotek (cdnjs, jsDelivr, unpkg):** `index`, `avskrift`, `pdf-till-word`, `studera`, `ai-provtraning`, `recept-app`, `litterara-stockholm`, `lashjalpen`, `rattvik-presentation-generator`, `rattvik-atervinning`.
- **Kartor och bilder:** OpenStreetMap, Carto, Google (Rättvik återvinning, litterära Stockholm), Unsplash (`ai-language-coach`).
- **Väder:** SMHI och Open-Meteo (`vader-rattvik`).
- Inga spårningsskript (Google Analytics, Tag Manager eller liknande) hittades i värdlistan.

**Åtgärd:** lägg typsnitt och bibliotek i repot (self-hosting). Det tar bort de flesta av dessa flöden och går snabbt att göra.

## 5. Inte granskat: appar utanför repot
`start.html` länkar till appar som körs på andra adresser: `uf-idementor.vercel.app`, `np-engelska.vercel.app`, `bionic-reading-v6r6.vercel.app`, `bionic-reading-89.vercel.app`, `bionic-reading-2f3h.vercel.app`, `bionic-reading-skrivcoach.vercel.app`, `copilot-skolledare.vercel.app`, `aifornyborjare.vercel.app` samt en Google Cloud Run-app (`begreppsm-staren-gymnasieplattform-…run.app`). Hosting hos Vercel och Google är i sig en personuppgiftsbehandling om appen lagrar eller loggar något. Kartlägg varje app separat, särskilt **skrivcoachen** (elevtexter).

## 6. Rekommenderad ordning
1. **Prata med dataskyddsombudet** och lämna den här filen. Be om besked om vilka leverantörer som får användas för elevdata.
2. **Stäng av eller varna** på sidorna i risk Hög tills det finns ett avtal: `motesapp`, `motestranskribering`, `metodbok-emi`, och lägg en tydlig varningsruta på `vardnadshavarkommunikation`.
3. ~~Byt adminlösenordet~~ Åtgärdat. Sätt `ADMIN_PASSWORD` i miljön.
4. ~~Self-hosta typsnitt och bibliotek~~ Åtgärdat utom Tesseract och avskrift (se avsnitt 0).
5. ~~Integritetsruta och maskering~~ Åtgärdat på 22 AI-sidor (avsnitt 0).
6. **Gallring och information** för `backend/`, `workshop-app` och `riksdag-skola`.
7. **Byt till en AI-tjänst som kommunen/skolan har avtal med** och flytta nycklarna från webbläsaren till en server.
8. Kartlägg de externa apparna i avsnitt 5.

## 7. Det som redan är bra
- Inga spårningsskript hittades.
- Framsteg och resultat ligger i de flesta sidor bara lokalt i webbläsaren.
- `vardnadshavarkommunikation` filtrerar personnummer, `rattvik-presentation-generator` kräver en bekräftelse, `gymnasiearbete` lär eleverna avidentifiera, och `riksdag-skola` har dubbel opt-in med avregistrering.
