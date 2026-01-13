"use client";

export default function InterestChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-2 text-sm",
        selected
          ? "border-[#1E2348] bg-[#1E2348] text-white"
          : "border-neutral-200 bg-white text-neutral-700",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
