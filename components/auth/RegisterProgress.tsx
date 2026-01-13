"use client";

export default function RegisterProgress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="mb-4">
      <div className="mb-2 text-xs text-neutral-500">
        {step} / {total}
      </div>
      <div className="h-1.5 w-full rounded bg-neutral-100">
        <div className="h-1.5 rounded bg-[#1E2348]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
