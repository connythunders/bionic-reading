"use client";

import { useEffect, useState } from "react";

import ProgramValjare from "@/components/ProgramValjare";
import ResultatKort from "@/components/ResultatKort";
import {
  ANKARAMNEN,
  DEFAULT_ANKARAMNE,
  programById,
} from "@/lib/program";
import type { Arbetsomrade, GenereraSvar } from "@/lib/types";

const LS_NYCKEL = "amnesomraden:senaste";

interface Sokning {
  ankaramne: string;
  tema: string;
  program: string[];
}

export default function Page() {
  const [ankaramne, setAnkaramne] = useState(DEFAULT_ANKARAMNE);
  const [tema, setTema] = useState("");
  const [valda, setValda] = useState<string[]>([]);
  const [laddar, setLaddar] = useState(false);
  const [fel, setFel] = useState<string | null>(null);
  const [resultat, setResultat] = useState<Arbetsomrade[] | null>(null);
  const [kallor, setKallor] = useState<string[]>([]);
  const [senaste, setSenaste] = useState<Sokning[]>([]);

  // Läs senaste sökningar från localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_NYCKEL);
      if (raw) setSenaste(JSON.parse(raw) as Sokning[]);
    } catch {
      /* ignorera */
    }
  }, []);

  function sparaSenaste(s: Sokning) {
    setSenaste((tidigare) => {
      const utan = tidigare.filter(
        (t) =>
          !(
            t.tema.toLowerCase() === s.tema.toLowerCase() &&
            t.ankaramne === s.ankaramne &&
            t.program.join(",") === s.program.join(",")
          ),
      );
      const ny = [s, ...utan].slice(0, 5);
      try {
        localStorage.setItem(LS_NYCKEL, JSON.stringify(ny));
      } catch {
        /* ignorera */
      }
      return ny;
    });
  }

  function toggleProgram(id: string) {
    setValda((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    );
  }

  async function hitta(e?: React.FormEvent) {
    e?.preventDefault();
    setFel(null);
    if (!tema.trim()) {
      setFel("Skriv in ett tema.");
      return;
    }
    if (valda.length === 0) {
      setFel("Välj minst ett program.");
      return;
    }

    setLaddar(true);
    setResultat(null);
    try {
      const res = await fetch("/api/generera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ankaramne, tema: tema.trim(), program: valda }),
      });
      const data = (await res.json()) as GenereraSvar & {
        error?: string;
        detalj?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || "Något gick fel.");
      }
      setResultat(data.arbetsomraden);
      setKallor(data.kallor || []);
      sparaSenaste({ ankaramne, tema: tema.trim(), program: valda });
    } catch (err) {
      setFel(err instanceof Error ? err.message : "Något gick fel.");
    } finally {
      setLaddar(false);
    }
  }

  function korOm(s: Sokning) {
    setAnkaramne(s.ankaramne);
    setTema(s.tema);
    setValda(s.program);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-ankare">
          Stiernhööksgymnasiet · Rättvik
        </p>
        <h1 className="mt-1 text-3xl font-bold leading-tight text-text sm:text-4xl">
          Ämnesövergripande arbetsområden
        </h1>
        <p className="mt-3 max-w-2xl text-dampad">
          Skriv in ett tema och välj ett eller flera av skolans program. Du får
          3–4 förslag på ämnesövergripande arbetsområden, anpassade till
          elevernas yrkesvardag och förankrade i Skolverkets centrala innehåll.
        </p>
      </header>

      <form
        onSubmit={hitta}
        className="rounded-xl2 border border-ram bg-kort p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-[200px_1fr]">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-text">Ankarämne</span>
            <select
              value={ankaramne}
              onChange={(e) => setAnkaramne(e.target.value)}
              className="h-12 rounded-lg border border-ram bg-botten px-3 text-text"
            >
              {ANKARAMNEN.map((a) => (
                <option key={a.kod} value={a.kod}>
                  {a.namn}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-text">Tema</span>
            <input
              type="text"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="t.ex. imperialismen"
              className="h-12 rounded-lg border border-ram bg-botten px-3 text-text placeholder:text-dampad/70"
            />
          </label>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-text">
            Program{" "}
            <span className="font-normal text-dampad">(välj ett eller flera)</span>
          </p>
          <ProgramValjare valda={valda} onToggle={toggleProgram} />
        </div>

        {fel && (
          <p
            role="alert"
            className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {fel}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={laddar}
            className="inline-flex h-12 items-center justify-center rounded-xl2 bg-ankare px-6 font-semibold text-white shadow-sm transition hover:bg-ankare/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {laddar ? "Tar fram förslag…" : "Hitta arbetsområden"}
          </button>
          {valda.length > 0 && (
            <span className="text-sm text-dampad">
              {valda.length} program valt{valda.length === 1 ? "" : "a"}:{" "}
              {valda.map((id) => programById(id)?.kod).join(", ")}
            </span>
          )}
        </div>
      </form>

      {senaste.length > 0 && !resultat && !laddar && (
        <section className="mt-6">
          <p className="mb-2 text-sm font-semibold text-dampad">
            Senaste sökningar
          </p>
          <div className="flex flex-wrap gap-2">
            {senaste.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => korOm(s)}
                className="rounded-full border border-ram bg-kort px-3 py-1.5 text-sm text-dampad hover:border-ankare hover:text-ankare"
              >
                {s.tema} ·{" "}
                {s.program.map((id) => programById(id)?.kod).join("/")}
              </button>
            ))}
          </div>
        </section>
      )}

      {laddar && (
        <section className="mt-8 flex flex-col gap-3" aria-live="polite">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl2 border border-ram bg-kort"
            />
          ))}
          <p className="text-center text-sm text-dampad">
            Hämtar Skolverkets centrala innehåll och genererar förslag…
          </p>
        </section>
      )}

      {resultat && (
        <section className="mt-8" aria-live="polite">
          <h2 className="mb-4 text-xl font-bold text-text">
            {resultat.length} arbetsområden
          </h2>
          <div className="flex flex-col gap-4">
            {resultat.map((a, i) => (
              <ResultatKort key={i} arbetsomrade={a} />
            ))}
          </div>
          {kallor.length > 0 && (
            <p className="mt-4 text-xs text-dampad">
              Underlag: {kallor.join(" · ")}
            </p>
          )}
        </section>
      )}

      <footer className="mt-14 border-t border-ram pt-6 text-sm text-dampad">
        <p>
          Källa: Skolverkets öppna data (Syllabus API). Förslagen genereras med
          AI och är ett stöd – läraren ansvarar för den pedagogiska
          bedömningen. Inga personuppgifter om elever hanteras.
        </p>
      </footer>
    </main>
  );
}
