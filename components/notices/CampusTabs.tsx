"use client";

import type { CampusKey } from "./data";
import { CAMPUSES } from "./data";

export default function CampusTabs({
  value,
  onChange,
}: {
  value: CampusKey;
  onChange: (v: CampusKey) => void;
}) {
  return (
    <div className="flex gap-3">
      {CAMPUSES.map((c) => {
        const active = c.key === value;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onChange(c.key)}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={[
                "h-10 w-10 rounded-full border flex items-center justify-center",
                active ? "border-[#1E2348]" : "border-neutral-200",
              ].join(" ")}
            >
              <div className={["h-5 w-5 rounded-full", active ? "bg-[#1E2348]" : "bg-neutral-200"].join(" ")} />
            </div>
            <div className={["text-[11px]", active ? "text-neutral-900 font-semibold" : "text-neutral-500"].join(" ")}>
              {c.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
