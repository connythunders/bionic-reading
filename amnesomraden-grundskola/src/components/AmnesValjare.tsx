"use client";

import {
  GRUPP_ORDNING,
  GRUPP_RUBRIK,
  VAV_AMNEN,
} from "@/lib/amnen";
import type { VavAmne } from "@/lib/types";

interface Props {
  valda: string[];
  onToggle: (id: string) => void;
}

export default function AmnesValjare({ valda, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {GRUPP_ORDNING.map((grupp) => {
        const amnen = VAV_AMNEN.filter((a) => a.grupp === grupp);
        if (amnen.length === 0) return null;
        return (
          <fieldset key={grupp} className="border-0 p-0 m-0">
            <legend className="text-sm font-semibold uppercase tracking-wide text-dampad mb-2">
              {GRUPP_RUBRIK[grupp]}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {amnen.map((a) => (
                <Chip
                  key={a.id}
                  amne={a}
                  vald={valda.includes(a.id)}
                  onToggle={() => onToggle(a.id)}
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
  amne,
  vald,
  onToggle,
}: {
  amne: VavAmne;
  vald: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={vald}
      onClick={onToggle}
      className={[
        "rounded-xl2 border px-4 py-2.5 text-left transition-colors",
        "min-h-[48px] text-[15px] leading-tight",
        vald
          ? "border-ankare bg-ankare text-white shadow-sm"
          : "border-ram bg-kort text-text hover:border-ankare hover:bg-ankare-ljus",
      ].join(" ")}
    >
      <span className="font-semibold">{amne.kod}</span>{" "}
      <span className={vald ? "text-white/90" : "text-dampad"}>
        {amne.namn}
      </span>
    </button>
  );
}
