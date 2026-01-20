"use client";

export type CommunityTabKey = "talk" | "specup" | "gather" | "review";

const TABS: { key: CommunityTabKey; label: string; sub: string }[] = [
  { key: "talk", label: "톡&톡", sub: "자유게시판" },
  { key: "specup", label: "스팩업", sub: "학습게시판" },
  { key: "gather", label: "모여라+", sub: "구인게시판" },
  { key: "review", label: "리얼리뷰", sub: "자기 작품 리뷰" },
];

export default function CommunityTabs({
  value,
  onChange,
}: {
  value: CommunityTabKey;
  onChange: (v: CommunityTabKey) => void;
}) {
  return (
    <div className="flex gap-5 border-b border-neutral-200 text-sm">
      {TABS.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={[
              "pb-3",
              active ? "font-semibold text-neutral-900 border-b-2 border-[#1E2348]" : "text-neutral-500",
            ].join(" ")}
            title={t.sub}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
