"use client";

export default function Button({
  children,
  disabled,
  loading,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={[
        "w-full rounded-lg py-3 text-sm font-semibold",
        disabled || loading ? "bg-neutral-200 text-neutral-500" : "bg-[#1E2348] text-white",
      ].join(" ")}
    >
      {loading ? "처리중..." : children}
    </button>
  );
}
