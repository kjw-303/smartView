"use client";

export default function MyMenuSection({
  title,
  items,
}: {
  title: string;
  items: { label: string; onClick: () => void }[];
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white">
      <div className="px-4 pt-4 text-xs font-semibold text-neutral-400">
        {title}
      </div>

      <div className="mt-2 divide-y divide-neutral-100">
        {items.map((it) => (
          <button
            key={it.label}
            type="button"
            onClick={it.onClick}
            className="flex w-full items-center justify-between px-4 py-3 text-sm text-neutral-900"
          >
            <span>{it.label}</span>
            <span className="text-neutral-300">›</span>
          </button>
        ))}
      </div>
    </section>
  );
}
