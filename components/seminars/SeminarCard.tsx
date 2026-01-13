"use client";

import Link from "next/link";
import type { Seminar } from "./data";

export default function SeminarCard({ seminar }: { seminar: Seminar }) {
  const { id, title, posterLabel, seatsUsed, seatsTotal } = seminar;

  return (
    <Link href={`/seminars/${id}`} className="block">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <div className="flex h-full w-full items-center justify-center p-4 text-center">
          <div className="whitespace-pre-line text-sm font-extrabold text-neutral-600">
            {posterLabel}
          </div>
        </div>
      </div>

      <div className="mt-2 line-clamp-2 text-sm text-neutral-900">{title}</div>
      <div className="mt-1 text-xs text-neutral-500">
        정원 <b className="text-neutral-700">{seatsUsed}</b> / {seatsTotal}
      </div>
    </Link>
  );
}
