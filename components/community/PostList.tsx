"use client";

export type PostItem = {
  id: string;
  tab: "talk" | "specup" | "gather" | "review";
  author: string;
  title: string;
  body: string;
  timeAgo: string;
  comments: number;
  likes: number;
};

export default function PostList({ items }: { items: PostItem[] }) {
  return (
    <div className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white">
      {items.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => alert("TODO: 게시글 상세")}
          className="w-full px-4 py-4 text-left"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-neutral-200" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="text-xs text-neutral-500">{p.author}</div>
                <div className="text-[11px] text-neutral-400">{p.timeAgo}</div>
              </div>

              <div className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900">
                {p.title}
              </div>
              <div className="mt-1 line-clamp-2 text-xs text-neutral-500 whitespace-pre-line">
                {p.body}
              </div>

              <div className="mt-2 flex items-center gap-3 text-xs text-neutral-400">
                <span>💬 {p.comments}</span>
                <span>♥ {p.likes}</span>
              </div>
            </div>

            <div className="h-14 w-14 rounded-xl bg-neutral-100" />
          </div>
        </button>
      ))}
    </div>
  );
}
