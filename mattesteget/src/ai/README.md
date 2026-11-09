# AI-tutor (framtida, inte byggd)

Mattesteget innehåller **ingen AI** i MVP. Den här mappen är tom med avsikt. Texten beskriver hur en AI-tutor skulle kunna kopplas in senare utan att bryta mot appens dataskydd. Den slutförs i steg 12.

## Principer

1. **Ledtrådar, aldrig svar.** AI-tutorn får bara formulera ledtrådar på nivå 1–3 i ledtrådstrappan. Facit och hela lösningar kommer alltid från innehållsfilerna.
2. **Ingen persondata.** Anropen innehåller bara uppgiftens ID och elevens senaste svar som text. Inget smeknamn, ingen progression, ingen enhetsinformation.
3. **EU-hostad serverproxy.** Webbläsaren anropar aldrig en AI-leverantör direkt. En egen proxy i EU tar emot anropet, tar bort allt onödigt, begränsar frekvensen och loggar inget innehåll.
4. **Frivilligt och synligt.** Funktionen är avstängd som standard och slås på av skolan. Eleven ser tydligt när AI används.
5. **Fungerar utan.** Appen ska fungera helt utan AI och utan nätverk.

## Hur det kan kopplas in

- Ett gränssnitt `getHint({ itemId, level, studentAnswer })` som returnerar text eller `null`.
- Standardimplementationen returnerar alltid `null`, så att ledtrådstrappan använder de fasta ledtrådarna.
- En proxyimplementation läggs till bakom en inställning, med anrop till en enda konfigurerad adress.
- CSP i `index.html` utökas med just den adressen, och bara när funktionen är påslagen.
- Dataskyddskonsekvensbedömning och uppdaterad `INTEGRITET.md` krävs före aktivering.
