"use client";

export default function InquiryListItem({
  title,
  sub,
  onClick,
}: {
  title: string;
  sub: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 py-4 text-left"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-neutral-200" />
        <div>
          <div className="text-sm font-semibold text-neutral-900">{title}</div>
          <div className="mt-1 text-xs text-neutral-500">{sub}</div>
        </div>
      </div>

      <div className="text-neutral-300">›</div>
    </button>
  );
}
