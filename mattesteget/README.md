# Mattesteget

Dyslexi- och dyskalkylivänlig övningsapp (PWA) för gymnasieelever, från taluppfattning mot Matematik 1a. Allt är på svenska och inget lämnar enheten.

Appen har **inget bygge och inga beroenden**. Den är vanlig HTML, CSS och JavaScript-moduler.

## Köra lokalt (PowerShell)

```powershell
cd mattesteget
./tools/serve.ps1
```

- Appen: http://localhost:8080/mattesteget/
- Tester: http://localhost:8080/mattesteget/tests/index.html (alla ska vara gröna)

## Mer

- `PLAN.md` – arkitektur, datamodell och byggsteg
- `CLAUDE.md` – konventioner och tillgänglighetsregler
- `INTEGRITET.md` – vad som sparas och var
- `src/ai/README.md` – hur en framtida AI-tutor kan kopplas in

## Offline och installation

Appen är en PWA: efter första besöket sparas filerna på enheten och appen fungerar utan internet. Den kan installeras från webbläsaren (till exempel i Chrome på Chromebook eller Android). Listan över filer som sparas står i `precache.js` och skapas av `./tools/precache.ps1`. Kör skriptet efter varje ändring av appens filer.

## Publicering

Mappen publiceras som den är av GitHub Pages på `bionicreading.se/mattesteget/`. GitHub Actions kör testerna i molnet.
