"use client";

import Link from "next/link";
import type { Notice } from "./data";

export default function NoticeList({ items }: { items: Notice[] }) {
  return (
    <div className="divide-y divide-neutral-100">
      {items.map((n) => (
        <Link key={n.id} href={`/notices/${n.id}`} className="block py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="line-clamp-2 text-sm text-neutral-900">{n.title}</div>
              <div className="mt-2 text-xs text-neutral-400">{n.date}</div>
            </div>
            <div className="pt-1 text-neutral-300">›</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
