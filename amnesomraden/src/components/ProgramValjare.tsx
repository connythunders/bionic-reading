"use client";

import {
  GRUPP_ORDNING,
  GRUPP_RUBRIK,
  PROGRAM,
} from "@/lib/program";
import type { SkolProgram } from "@/lib/types";

interface Props {
  valda: string[];
  onToggle: (id: string) => void;
}

export default function ProgramValjare({ valda, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {GRUPP_ORDNING.map((grupp) => {
        const program = PROGRAM.filter((p) => p.grupp === grupp);
        if (program.length === 0) return null;
        return (
          <fieldset key={grupp} className="border-0 p-0 m-0">
            <legend className="text-sm font-semibold uppercase tracking-wide text-dampad mb-2">
              {GRUPP_RUBRIK[grupp]}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {program.map((p) => (
                <Chip
                  key={p.id}
                  program={p}
                  vald={valda.includes(p.id)}
                  onToggle={() => onToggle(p.id)}
                />
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}

function Chip({
  program,
  vald,
  onToggle,
}: {
  program: SkolProgram;
  vald: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={vald}
      onClick={onToggle}
      title={program.karaktarsomraden.join(", ")}
      className={[
        "rounded-xl2 border px-4 py-2.5 text-left transition-colors",
        "min-h-[48px] text-[15px] leading-tight",
        vald
          ? "border-ankare bg-ankare text-white shadow-sm"
          : "border-ram bg-kort text-text hover:border-ankare hover:bg-ankare-ljus",
      ].join(" ")}
    >
      <span className="font-semibold">{program.kod}</span>{" "}
      <span className={vald ? "text-white/90" : "text-dampad"}>
        {program.namn.replace(/programmet$/i, "").trim()}
      </span>
    </button>
  );
}
