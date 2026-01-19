"use client";

export default function ToggleRow({
  label,
  description,
  value,
  disabled,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-4">
      <div className="min-w-0 flex-1">
        <div className={["text-sm", disabled ? "text-neutral-400" : "text-neutral-900"].join(" ")}>
          {label}
        </div>
        {description && (
          <div className="mt-1 text-xs leading-5 text-neutral-500">{description}</div>
        )}
      </div>

      {/* ✅ FIXED TOGGLE */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!value)}
        className={[
          "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
          disabled ? "bg-neutral-200" : value ? "bg-[#1E2348]" : "bg-neutral-300",
        ].join(" ")}
        aria-label={label}
      >
        <span
          className={[
            "inline-block h-6 w-6 rounded-full bg-white shadow transition-transform",
            value ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
