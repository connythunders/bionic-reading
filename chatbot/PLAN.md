# PLAN – Dokumentassistentens strategi

## Fas 1: Dokumentanalys och tokenuppskattning

| Dokument | Tecken | Ord | Uppskattade tokens |
|---|---|---|---|
| Metodbok (DOK1) | 213 860 | 27 332 | ~53 000 |
| Barn- och elevhälsoplan Rättviks kommun (DOK2) | 89 350 | 12 000 | ~22 000 |
| **Totalt** | **303 210** | **39 332** | **~75 800** |

Totalen (~76k tokens) överstiger bekvämt 60k-gränsen. Hela texten i varje anrop är inte lämpligt.

## Vald strategi: Retrieval med chunking

### Chunkning
- Varje dokument delas i avsnitt om ~600 ord med 100 ords överlapp.
- Varje chunk märks med: `id` (DOK1-000, DOK2-000 …), `doc_name`, `heading`, `position`.
- Totalt: **56 chunks** från Metodboken + **26 chunks** från elevhälsoplanen = **82 chunks**.
- Alla chunks lagras i `data/chunks.json` och läses in vid serverstart (cold start).

### Retrieval vid varje förfrågan
- Frågan tokeniseras (ord ≥ 3 tecken).
- Varje chunk poängsätts via enkelt TF-overlap: antal träffar av frågans nyckelord i chunk-texten + rubriken.
- De **8 högst poängsatta** chunkarna skickas som kontext till modellen (~4 800 ord / ~6 000 tokens).
- Om alla top-chunks är från ett enda dokument, läggs minst en relevant chunk från det andra dokumentet till.

### Varför inte full-text i varje anrop?
- ~76k tokens kontext + svar + systemprompt = potentiellt >80k tokens per anrop.
- Kraftigt förhöjd latens och kostnad per fråga.
- Med retrieval hålls kontext under ~8k tokens per anrop, och exakta källhänvisningar med chunk-ID möjliggörs.

### Källhänvisningar
- Modellen instrueras att ange chunk-ID, dokumentnamn, avsnittsrubrik och ordagrant citat (max 15 ord).
- Chunk-ID:t syns i källpanelen i gränssnittet och möjliggör verifiering mot `chunks.json`.
