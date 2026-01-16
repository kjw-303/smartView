"use client";

export type FaqCategoryKey = "course" | "job" | "refund" | "etc";

const CATS: { key: FaqCategoryKey; label: string }[] = [
  { key: "course", label: "수강/상담" },
  { key: "job", label: "취업/입시" },
  { key: "refund", label: "휴학/환불" },
  { key: "etc", label: "기타" },
];

export default function FaqCategoryChips({
  value,
  onChange,
}: {
  value: FaqCategoryKey;
  onChange: (v: FaqCategoryKey) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATS.map((c) => {
        const active = value === c.key;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onChange(c.key)}
            className={[
              "whitespace-nowrap rounded-full border px-3 py-2 text-sm",
              active
                ? "border-[#1E2348] bg-[#1E2348] text-white"
                : "border-neutral-200 bg-white text-neutral-700",
            ].join(" ")}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
