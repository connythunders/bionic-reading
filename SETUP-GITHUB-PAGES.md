# 🚀 Guide: Aktivera GitHub Pages med Main Branch

## Steg 1: Merga din kod till main branch

Du har nu en färdig landing page på branchen `claude/improve-landing-page-Ccmc0`.
Så här gör du den till din huvudbranch:

### Via GitHub (Enklast! ⭐)

1. **Gå till ditt repo:**
   ```
   https://github.com/connythunders/super-broccoli
   ```

2. **Skapa Main Branch:**
   - Klicka på branch-dropdown (där det står din nuvarande branch)
   - Skriv `main` i sökrutan
   - Klicka "Create branch: main from 'claude/improve-landing-page-Ccmc0'"

3. **Sätt Main som Default Branch:**
   - Gå till Settings → Branches
   - Under "Default branch", klicka på bytar-ikonen
   - Välj `main`
   - Bekräfta

4. **Aktivera GitHub Pages:**
   - Gå till Settings → Pages
   - Under "Branch", välj `main`
   - Klicka Save

**Klart!** Din sida är nu live på: `https://connythunders.github.io/super-broccoli/`

---

## För Framtida Projekt: Checklist ✅

### När du skapar ett nytt projekt:

#### 1. Skapa Repo med README
- Skapa repo på GitHub
- ✅ Checka i "Add a README file" (detta skapar main branch automatiskt)

#### 2. Koda ditt projekt
- Skapa `index.html` i root-mappen (viktigt för GitHub Pages!)
- Pusha dina ändringar till `main` branch

#### 3. Aktivera GitHub Pages (gör detta direkt!)
```
1. Gå till: https://github.com/dittnamn/ditt-repo/settings/pages
2. Välj branch: main
3. Klicka Save
4. Vänta 1-2 minuter
5. Besök: https://dittnamn.github.io/ditt-repo/
```

#### 4. Verifiera att det fungerar
- Öppna `https://dittnamn.github.io/ditt-repo/`
- Om 404: Vänta ytterligare 1 minut och ladda om
- Om fortfarande 404: Kolla att `index.html` finns i root-mappen

---

## Snabba Fixes

### Problem: "404 - There isn't a GitHub Pages site here"
**Lösning:**
1. Gå till Settings → Pages
2. Välj rätt branch (oftast `main`)
3. Se till att "root" är vald (inte /docs)
4. Vänta 1-2 minuter

### Problem: Ändringar syns inte
**Lösning:**
1. Pusha dina ändringar: `git push`
2. Vänta 1-2 minuter (GitHub Pages bygger om sidan)
3. Gör en "hard refresh": Ctrl+Shift+R (eller Cmd+Shift+R på Mac)

### Problem: CSS/bilder laddas inte
**Lösning:**
- Använd relativa paths: `./style.css` (inte `/style.css`)
- Eller använd: `/repo-namn/style.css`

---

## Pro Tips 💡

### Custom Domain (Valfritt)
Om du vill använda din egen domän (ex: `www.minasida.com`):
1. Gå till Settings → Pages
2. Skriv in din domän under "Custom domain"
3. Följ DNS-instruktionerna från GitHub

### Snabbare Updates
- Jobba direkt på `main` branch för small projects
- Använd branches och Pull Requests för större projekt

### Deploy Preview
- Varje push till `main` uppdaterar sidan automatiskt
- Kolla Actions-tab för att se build status

---

## Filstruktur för GitHub Pages

```
repo-namn/
├── index.html          ← Startsida (måste finnas!)
├── about.html          ← Andra sidor
├── style.css           ← CSS (valfritt)
├── script.js           ← JavaScript (valfritt)
├── images/             ← Bilder (valfritt)
│   ├── logo.png
│   └── hero.jpg
└── README.md           ← Beskrivning (syns på GitHub)
```

**Viktigt:** `index.html` MÅSTE finnas i root-mappen!

---

## Hjälp och Support

- GitHub Pages Docs: https://docs.github.com/en/pages
- Problem? Kolla GitHub Status: https://www.githubstatus.com/

**Lycka till med dina projekt! 🎉**
