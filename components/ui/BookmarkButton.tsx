"use client";

import { useBookmarkStore } from "@/store/bookmark.store";

export default function BookmarkButton({ id }: { id: string }) {
  const toggle = useBookmarkStore((s) => s.toggle);
  const active = useBookmarkStore((s) => s.has(id));

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault(); // Link 안에서 클릭 가능
        e.stopPropagation();
        toggle(id);
      }}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow"
      aria-label="북마크"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={active ? "#1E2348" : "none"}
      >
        <path
          d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"
          stroke="#1E2348"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
