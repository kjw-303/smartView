"use client";

export type NotificationItem = {
  id: string;
  tab: "class" | "community" | "inquiry";
  title: string;
  body: string;
  timeAgo: string;
};

export default function NotificationList({ items }: { items: NotificationItem[] }) {
  return (
    <div className="divide-y divide-neutral-100">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => alert("TODO: 알림 상세/이동")}
          className="w-full py-4 text-left"
        >
          <div className="text-sm font-semibold text-neutral-900">{it.title}</div>
          <div className="mt-2 line-clamp-2 text-sm text-neutral-700">{it.body}</div>
          <div className="mt-2 text-xs text-neutral-400">{it.timeAgo}</div>
        </button>
      ))}

      {items.length === 0 && (
        <div className="py-10 text-center text-sm text-neutral-400">
          알림이 없습니다.
        </div>
      )}
    </div>
  );
}
