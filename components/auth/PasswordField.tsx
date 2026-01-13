"use client";

import { useState } from "react";

export default function PasswordField({
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
  const [show, setShow] = useState(false);
  const hasError = Boolean(errorText);

  return (
    <div className="space-y-1">
      <label className="text-xs text-neutral-700">{label}</label>

      <div
        className={[
          "flex items-center rounded-lg border px-3 py-3",
          hasError ? "border-red-400" : "border-neutral-200 focus-within:border-neutral-400",
        ].join(" ")}
      >
        <input
          className="w-full text-sm outline-none"
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="ml-2 text-xs text-neutral-500"
          onClick={() => setShow((v) => !v)}
        >
          {show ? "숨김" : "표시"}
        </button>
      </div>

      {hasError && <p className="text-xs text-red-500">{errorText}</p>}
    </div>
  );
}
