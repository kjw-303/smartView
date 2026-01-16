"use client";

export default function SectionHeader({
  title,
  actionText,
  onAction,
}: {
  title: string;
  actionText?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
      {actionText && (
        <button
          type="button"
          onClick={onAction}
          className="text-xs text-neutral-50 underline-offset-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
