# Integritet i Mattesteget

Den här texten är till för elever, vårdnadshavare och skolans dataskyddsombud. Den beskriver vad Mattesteget sparar, var det sparas, och vad som aldrig sker. Den ska läsas tillsammans med skolans dataskyddsombud innan appen används med elever.

## Kort version

- Mattesteget samlar **inga personuppgifter**.
- Allt du gör sparas **bara på din egen enhet**, i webbläsaren.
- Inget skickas till någon server. Appen använder ingen analys, ingen spårning och inga tredjepartscookies.
- Du behöver ingen inloggning, ingen e-postadress och inget riktigt namn.

## Vad som sparas och var

| Vad | Var | Varför |
|---|---|---|
| Dina inställningar (typsnitt, textstorlek, bakgrund) | Webbläsarens lokala lagring på din enhet | Så att appen ser ut som du vill nästa gång |
| Smeknamn (valfritt) | IndexedDB på din enhet | Visas bara för dig, och i filen om du väljer att dela |
| Ett slumpat id | IndexedDB på din enhet | Skapas första gången du sparar en fil till läraren, så att läraren kan se att två filer kommer från samma elev. Har ingen koppling till dig som person |
| Dina steg, antal försök, ledtrådar och de senaste svaren som inte blev rätt | IndexedDB på din enhet | Så att appen kan visa din progression och välja repetition |
| Hur ofta uppgiftstyper ska repeteras (Leitner-lådor) | IndexedDB på din enhet | Så att Dagens pass kan välja uppgifter |
| Lärarkoden (bara på lärarens enhet) | Webbläsarens lokala lagring, som ett hashat värde | Skyddar lärarvyn mot misstag. Den är inte ett säkert lösenord |
| Elevfiler som läraren läst in (bara på lärarens enhet) | IndexedDB på lärarens enhet | Så att läraren kan se översikten utan att läsa in filerna igen |

## Delning med läraren

Läraren får bara det du själv väljer att dela. Under Min resa kan du spara en fil (JSON) eller kopiera en kort sammanfattning som text. Inget skickas automatiskt, och appen har ingen server att skicka till.

Filen innehåller dina steg, antal försök, hur långt du kom i ledtrådstrappan och de senaste svaren som inte blev rätt, samt smeknamnet och det slumpade id:t. Den innehåller inget namn, ingen e-postadress och ingen annan information om dig. Sammanfattningen innehåller bara antal klara steg per modul.

Läraren läser in filerna i lärarvyn, som skyddas av en kod som läraren sätter på sin enhet. Koden är ett skydd mot misstag och är **inte** ett säkert lösenord: vem som helst som har tillgång till enheten kan ta bort koden. Elevfilerna som läses in sparas på lärarens enhet tills läraren tar bort dem, en i taget eller alla på en gång.

## Ta bort dina uppgifter

Under Min resa finns knappen "Ta bort mina uppgifter". Den tar bort allt som Mattesteget har sparat om dig på enheten, och du får ett nytt slumpat id nästa gång du sparar en fil. Du kan också rensa webbplatsdata för sidan i webbläsarens inställningar. En fil som du redan har gett till läraren finns kvar hos läraren tills läraren tar bort den.

## Externa tjänster

Inga. Typsnitt och allt annat som appen behöver ligger i appen själv. Första gången laddas appen från webbservern. Därefter sparas appens filer på enheten (en så kallad service worker), och appen fungerar helt utan internet. Service workern anropar aldrig någon annan adress än appens egen, och den sparar inga personuppgifter, bara appens egna filer.

När det finns en ny version av appen får du ett meddelande och väljer själv när du vill uppdatera.

## För skolans IT

Hanterade Chromebooks kan blockera installation av appen eller rensa lagrad data vid utloggning. Det påverkar bara elevens sparade progression.
