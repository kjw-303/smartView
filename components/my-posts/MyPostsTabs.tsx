"use client";

export type MyPostsTabKey = "post" | "comment";

const TABS: { key: MyPostsTabKey; label: string }[] = [
  { key: "post", label: "게시글" },
  { key: "comment", label: "댓글" },
];

export default function MyPostsTabs({
  value,
  onChange,
}: {
  value: MyPostsTabKey;
  onChange: (v: MyPostsTabKey) => void;
}) {
  return (
    <div className="border-b border-neutral-200">
      <div className="grid grid-cols-2">
        {TABS.map((t) => {
          const active = value === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={[
                "py-3 text-sm",
                active ? "font-semibold text-neutral-900" : "text-neutral-500",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* underline */}
      <div className="relative h-[2px]">
        <div
          className="absolute top-0 h-[2px] w-1/2 bg-[#1E2348] transition-transform"
          style={{ transform: value === "post" ? "translateX(0%)" : "translateX(100%)" }}
        />
      </div>
    </div>
  );
}
