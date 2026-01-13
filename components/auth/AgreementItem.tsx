"use client";

import Checkbox from "@/components/ui/Checkbox";

export default function AgreementItem({
  label,
  checked,
  onToggle,
  onView,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onView?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 hover:bg-neutral-50">
      <button
        type="button"
        onClick={onToggle}
        className="flex flex-1 items-center gap-3 text-left"
      >
        <Checkbox checked={checked} />
        <span className="text-sm text-neutral-800">{label}</span>
      </button>

      <button
        type="button"
        onClick={onView}
        className="text-xs text-neutral-500 underline underline-offset-2"
      >
        보기
      </button>
    </div>
  );
}
