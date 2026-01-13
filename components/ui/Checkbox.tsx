"use client";

export default function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={[
        "inline-flex h-5 w-5 items-center justify-center rounded border",
        checked ? "border-[#1E2348] bg-[#1E2348]" : "border-neutral-300 bg-white",
      ].join(" ")}
      aria-hidden="true"
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path
            d="M16.5 5.5L8.5 13.5L3.5 8.5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
