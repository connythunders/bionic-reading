---
description: Lägg till eller uppdatera ett verktygskort på start.html
argument-hint: <fil.html> (eller inget för att hitta verktyg som saknas på startsidan)
allowed-tools: Read, Edit, Glob, Grep, Bash(ls:*)
---

Uppdatera portalen `start.html` för: **$ARGUMENTS**

## Utan argument

Jämför alla `.html`-filer i projektroten mot de `href` som finns i `start.html`. Lista vilka verktyg som saknas på startsidan, med en rad om vad var och en gör. Fråga sedan vilka jag vill lägga till — lägg inte till allt på eget bevåg (vissa filer är experiment eller delkomponenter).

## Med en fil som argument

1. Läs verktyget och förstå vad det faktiskt gör — beskrivningen ska stämma, inte vara marknadsföring.
2. Läs kortstrukturen i `start.html` och följ den exakt:

```html
<!-- Verktygsnamn -->
<a href="filnamn.html" class="card">
    <div class="card-icon">🎲</div>
    <h2>Verktygets namn</h2>
    <div>
        <span class="badge new">Nytt</span>
        <span class="badge ai">AI</span>
        <span class="badge">Ämne</span>
    </div>
    <p>Två meningar om vad verktyget gör och för vem.</p>
    <div class="card-features">
        <ul>
            <li>3–5 konkreta punkter om funktioner</li>
        </ul>
    </div>
</a>
```

3. Placera kortet bland liknande verktyg (religionsverktygen står tillsammans, NP-verktygen tillsammans, osv.) — inte bara sist i griden.
4. Badges ska vara sanna: `ai` bara om verktyget anropar ett API, `new` bara på nytt material. Ämnesbadge på svenska.
5. Välj en ikon som inte redan används av ett grannkort.

Rapportera var i filen kortet hamnade och vilka badges du satte.
