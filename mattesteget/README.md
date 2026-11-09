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

## Publicering

Mappen publiceras som den är av GitHub Pages på `bionicreading.se/mattesteget/`. GitHub Actions kör testerna i molnet.
