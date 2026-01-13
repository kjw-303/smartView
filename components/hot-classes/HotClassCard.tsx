"use client";

import Link from "next/link";
import type { HotClass } from "./data";
import BookmarkButton from "@/components/ui/BookmarkButton";

export default function HotClassCard({ item }: { item: HotClass }) {
  return (
    <Link href={`/hot-classes/${item.id}`} className="block relative">
      {/* 북마크 */}
      <div className="absolute right-2 top-2 z-10">
        <BookmarkButton id={item.id} />
      </div>
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
        {/* 실제 이미지 생기면 img로 교체 */}
        <div className="flex h-full w-full items-center justify-center text-lg font-extrabold text-neutral-600">
          {item.thumbLabel}
        </div>
      </div>

      <div className="mt-2 line-clamp-2 text-sm text-neutral-900">{item.title}</div>
    </Link>
  );
}
