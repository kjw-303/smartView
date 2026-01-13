"use client";

export type NotificationTabKey = "class" | "community" | "inquiry";

const TABS: { key: NotificationTabKey; label: string }[] = [
  { key: "class", label: "수업안내" },
  { key: "community", label: "커뮤니티" },
  { key: "inquiry", label: "문의답변" },
];

export default function NotificationTabs({
  value,
  onChange,
}: {
  value: NotificationTabKey;
  onChange: (v: NotificationTabKey) => void;
}) {
  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex border-b border-neutral-200">
        {TABS.map((t) => {
          const active = value === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={[
                "flex-1 py-3 text-sm",
                active ? "font-semibold text-neutral-900" : "text-neutral-500",
              ].join(" ")}
            >
              {t.label}
              <div
                className={[
                  "mx-auto mt-2 h-[2px] w-10 rounded",
                  active ? "bg-[#1E2348]" : "bg-transparent",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
