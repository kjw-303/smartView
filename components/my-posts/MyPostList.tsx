"use client";

export type MyPostItem = {
  id: string;
  kind: "post" | "comment";
  category: string;
  title: string;
  rightText: string;
};

export default function MyPostList({ items }: { items: MyPostItem[] }) {
  return (
    <div className="divide-y divide-neutral-100">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => alert("TODO: 상세 이동")}
          className="flex w-full items-start justify-between gap-3 py-4 text-left"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[11px] text-neutral-400">{it.category}</div>
            <div className="mt-1 line-clamp-2 text-sm text-neutral-900">{it.title}</div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <div className="text-[11px] text-neutral-400">{it.rightText}</div>
            <div className="text-neutral-300">›</div>
          </div>
        </button>
      ))}

      {items.length === 0 && (
        <div className="py-10 text-center text-sm text-neutral-400">
          작성한 내용이 없습니다.
        </div>
      )}
    </div>
  );
}
