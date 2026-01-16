"use client";

import { useState } from "react";

export type FaqItem = {
  id: string;
  category: "course" | "job" | "refund" | "etc";
  title: string;
  body: string;
};

export default function FaqAccordionList({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white">
      {items.map((it) => {
        const open = openId === it.id;
        return (
          <div key={it.id} className="px-4">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : it.id)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <div className="text-sm text-neutral-900">{it.title}</div>
              <Chevron open={open} />
            </button>

            {open && (
              <div className="pb-4 text-sm leading-6 text-neutral-600 whitespace-pre-line">
                {it.body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={["text-neutral-300 transition-transform", open ? "rotate-180" : ""].join(" ")}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
