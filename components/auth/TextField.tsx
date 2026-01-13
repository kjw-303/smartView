"use client";

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  errorText,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  errorText?: string;
}) {
  const hasError = Boolean(errorText);

  return (
    <div className="space-y-1">
      <label className="text-xs text-neutral-700">{label}</label>
      <input
        className={[
          "w-full rounded-lg border px-3 py-3 text-sm outline-none",
          hasError ? "border-red-400" : "border-neutral-200 focus:border-neutral-400",
        ].join(" ")}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="email"
      />
      {hasError && <p className="text-xs text-red-500">{errorText}</p>}
    </div>
  );
}
