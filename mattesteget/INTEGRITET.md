# Integritet i Mattesteget (utkast)

Den här texten är till för elever, vårdnadshavare och skolans dataskyddsombud. Den slutförs i steg 12.

## Kort version

- Mattesteget samlar **inga personuppgifter**.
- Allt du gör sparas **bara på din egen enhet**, i webbläsaren.
- Inget skickas till någon server. Appen använder ingen analys, ingen spårning och inga tredjepartscookies.
- Du behöver ingen inloggning, ingen e-postadress och inget riktigt namn.

## Vad som sparas och var

| Vad | Var | Varför |
|---|---|---|
| Dina inställningar (typsnitt, textstorlek, bakgrund) | Webbläsarens lokala lagring på din enhet | Så att appen ser ut som du vill nästa gång |
| Smeknamn (valfritt, kommer i senare steg) | På din enhet | Visas bara för dig |
| Dina svar och hur långt du kommit (kommer i senare steg) | IndexedDB på din enhet | Så att appen kan visa din progression och välja repetition |

## Delning med läraren

Läraren får bara det du själv väljer att dela, genom att exportera en fil eller visa en QR-kod. Det sker helt manuellt. Lärarvyn skyddas av en kod som sätts på enheten. Koden är ett skydd mot misstag och är **inte** ett säkert lösenord.

## Ta bort dina uppgifter

Du kan rensa webbplatsdata för sidan i webbläsarens inställningar. Då försvinner allt som Mattesteget har sparat på enheten.

## Externa tjänster

Inga. Typsnitt och allt annat som appen behöver ligger i appen själv. Första gången laddas appen från webbservern. Därefter fungerar den utan internet (från steg 10).

## För skolans IT

Hanterade Chromebooks kan blockera installation av appen eller rensa lagrad data vid utloggning. Det påverkar bara elevens sparade progression.
