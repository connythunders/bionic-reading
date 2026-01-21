# Snabbstart - AI Quiz Generator

## Steg 1: Starta PostgreSQL

### Alternativ A: Med Docker (Rekommenderat)
```bash
cd /home/user/bionic-reading
docker-compose up -d
```

### Alternativ B: Lokal PostgreSQL
Se till att PostgreSQL körs och skapa databasen:
```bash
psql -U postgres
CREATE DATABASE quizdb;
\q
psql -U postgres -d quizdb -f init.sql
```

## Steg 2: Lägg till Anthropic API-nyckel

1. Gå till https://console.anthropic.com/
2. Skapa ett konto eller logga in
3. Skapa en API-nyckel
4. Öppna `/home/user/bionic-reading/backend/.env`
5. Ersätt `your_api_key_here` med din riktiga nyckel:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-xxx...
   ```

## Steg 3: Starta Backend

```bash
cd /home/user/bionic-reading/backend
npm run dev
```

Du bör se:
```
Backend körs på port 3000
Databasanslutning lyckades: [timestamp]
```

## Steg 4: Öppna Frontend

Öppna i din webbläsare:
```
file:///home/user/bionic-reading/ai-quiz-generator.html
```

Eller via en lokal server:
```bash
cd /home/user/bionic-reading
python3 -m http.server 8000
# Öppna: http://localhost:8000/ai-quiz-generator.html
```

## Steg 5: Testa med en fil

1. **Skapa en testfil**: Du kan använda ett Word-dokument eller PDF med lite text (minst 100 tecken)
2. **Dra och släpp** filen i uppladdningsområdet
3. **Klicka på "Generera Quiz med AI"**
4. **Vänta** medan AI skapar 25 frågor (tar ~10-30 sekunder)
5. **Svara** på frågorna
6. **Få feedback** - AI analyserar dina svar och ger personliga tips

## Snabbt test utan API-nyckel

Om du bara vill se gränssnittet utan att testa AI-funktionen:
1. Öppna `ai-quiz-generator.html` i webbläsaren
2. Se UI:t för filuppladdning
3. Backend kommer att ge ett felmeddelande när du försöker generera quiz (detta är normalt utan API-nyckel)

## Felsökning

### "Databasanslutning misslyckades"
- Kontrollera att PostgreSQL körs
- Verifiera credentials i `.env`

### "AI kunde inte generera quiz"
- Kontrollera att `ANTHROPIC_API_KEY` är korrekt i `.env`
- Verifiera att du har credits på ditt Anthropic-konto

### "Filen kunde inte laddas upp"
- Kontrollera att filen är PDF eller DOCX (inte TXT)
- Filstorlek max 10MB
- Filen måste innehålla minst 100 tecken text

## Vad händer nu?

Backend-servern är redo att ta emot förfrågningar när den startar. Frontend kommer att:
1. Skicka filen till `/api/quiz/upload`
2. Backend extraherar text från PDF/DOCX
3. Frontend anropar `/api/quiz/generate` med documentId
4. Claude AI skapar 25 quiz-frågor
5. När du svarar skickas svaren till `/api/quiz/evaluate`
6. AI genererar personlig feedback baserat på dina svar
