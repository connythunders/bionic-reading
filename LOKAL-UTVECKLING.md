# Lokal Utveckling - Se Ändringar Direkt!

## Problemet du hade

```
Gammal workflow (LÅNGSAM):
1. Ändra kod
2. git add .
3. git commit -m "..."
4. git push
5. Vänta på GitHub Pages...
6. Ladda om sidan
7. Se att något är fel
8. Börja om från steg 1...
```

## Den nya workflow (SNABB)

```
Ny workflow (DIREKT):
1. Starta lokal server (1 gång)
2. Ändra kod
3. Tryck F5 i webbläsaren
4. Se ändringen DIREKT!
5. Upprepa steg 2-4 tills du är nöjd
6. SEDAN: commit + push (endast 1 gång när allt är klart)
```

---

## Så här gör du

### Steg 1: Öppna Terminal/Kommandoprompt

**Mac/Linux:**
- Öppna "Terminal"

**Windows:**
- Tryck `Windows + R`, skriv `cmd`, tryck Enter

### Steg 2: Gå till projektmappen

```bash
cd /home/user/bionic-reading
```

### Steg 3: Starta servern

**Enklaste sättet (Linux/Mac):**
```bash
./starta-lokal.sh
```

**Windows:**
- Dubbelklicka på `starta-lokal.bat`

**Eller manuellt:**
```bash
python3 -m http.server 8000
```

### Steg 4: Öppna i webbläsaren

Gå till: **http://localhost:8000**

---

## Workflow Sammanfattning

```
┌─────────────────────────────────────────────────────────┐
│                    LOKAL UTVECKLING                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   1. Starta server:  ./starta-lokal.sh                 │
│                                                         │
│   2. Öppna webbläsare: http://localhost:8000           │
│                                                         │
│   3. Ändra din kod i valfri editor                     │
│                                                         │
│   4. Spara filen (Ctrl+S)                              │
│                                                         │
│   5. Ladda om webbläsaren (F5)                         │
│                                                         │
│   6. Se ändringen DIREKT!                              │
│                                                         │
│   7. Upprepa 3-6 tills du är nöjd                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                  NÄR DU ÄR KLAR                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   git add .                                             │
│   git commit -m "Beskrivning av ändring"               │
│   git push                                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## VS Code Live Server (Ännu Enklare!)

Om du använder VS Code:

1. Installera tillägget "Live Server" (av Ritwick Dey)
2. Högerklicka på `index.html`
3. Välj "Open with Live Server"
4. Nu uppdateras sidan **automatiskt** när du sparar!

---

## Vanliga Frågor

### Varför ser jag inte mina ändringar?
- Har du sparat filen? (Ctrl+S)
- Har du laddat om sidan? (F5)
- Körs servern fortfarande? (kolla terminalen)

### Varför fungerar inte Python?
- Installera Python: https://www.python.org/downloads/
- På Mac/Linux: `python3` istället för `python`

### Hur stoppar jag servern?
- Tryck `Ctrl+C` i terminalen

### Behöver jag internet?
- NEJ! Allt körs på din dator!

---

## Sammanfattning

| Metod | Hastighet | När du ska använda |
|-------|-----------|-------------------|
| GitHub Pages | Långsam (1-5 min) | När du vill publicera för andra |
| Lokal server | Direkt! | När du utvecklar och testar |

**Tips:** Arbeta ALLTID lokalt först. Pusha till GitHub endast när du är nöjd!
