"use client";

import { useState } from "react";

import type { Arbetsomrade } from "@/lib/types";

interface Props {
  arbetsomrade: Arbetsomrade;
}

export default function ResultatKort({ arbetsomrade: a }: Props) {
  const [oppen, setOppen] = useState(false);
  const [kopierad, setKopierad] = useState(false);

  async function kopiera() {
    try {
      await navigator.clipboard.writeText(somText(a));
      setKopierad(true);
      setTimeout(() => setKopierad(false), 2000);
    } catch {
      /* clipboard ej tillgängligt */
    }
  }

  return (
    <article className="rounded-xl2 border border-ram bg-kort p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-text">{a.titel}</h3>
        <button
          type="button"
          onClick={kopiera}
          className="shrink-0 rounded-lg border border-ram px-3 py-1.5 text-sm text-dampad hover:border-ankare hover:text-ankare"
          aria-label="Kopiera arbetsområdet"
        >
          {kopierad ? "Kopierat ✓" : "Kopiera"}
        </button>
      </div>

      {a.kort_beskrivning && (
        <p className="mt-2 text-text">{a.kort_beskrivning}</p>
      )}

      {a.amnen_kurser.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {a.amnen_kurser.map((amne, i) => (
            <span
              key={i}
              className="rounded-full bg-ankare-ljus px-2.5 py-1 text-sm text-ankare"
            >
              {amne}
            </span>
          ))}
        </div>
      )}

      {a.varfor_passar_eleverna && (
        <Falt rubrik="Varför passar det eleverna" text={a.varfor_passar_eleverna} />
      )}

      <button
        type="button"
        onClick={() => setOppen((v) => !v)}
        aria-expanded={oppen}
        className="mt-4 text-sm font-medium text-ankare hover:underline"
      >
        {oppen ? "Visa mindre" : "Visa mer (uppgift, koppling, bedömning)"}
      </button>

      {oppen && (
        <div className="mt-3 border-t border-ram pt-3">
          {a.elevuppgift && <Falt rubrik="Elevuppgift" text={a.elevuppgift} />}
          {a.koppling_centralt_innehall && (
            <Falt
              rubrik="Koppling till centralt innehåll"
              text={a.koppling_centralt_innehall}
            />
          )}
          {a.bedomningside && (
            <Falt rubrik="Bedömningsidé" text={a.bedomningside} />
          )}
        </div>
      )}
    </article>
  );
}

function Falt({ rubrik, text }: { rubrik: string; text: string }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-dampad">
        {rubrik}
      </p>
      <p className="mt-0.5 text-text">{text}</p>
    </div>
  );
}

function somText(a: Arbetsomrade): string {
  return [
    a.titel,
    "",
    a.kort_beskrivning,
    "",
    `Ämnen/kurser: ${a.amnen_kurser.join(", ")}`,
    "",
    `Varför passar eleverna: ${a.varfor_passar_eleverna}`,
    "",
    `Elevuppgift: ${a.elevuppgift}`,
    "",
    `Koppling till centralt innehåll: ${a.koppling_centralt_innehall}`,
    "",
    `Bedömningsidé: ${a.bedomningside}`,
  ].join("\n");
}
