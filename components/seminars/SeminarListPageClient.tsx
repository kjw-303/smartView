"use client";

import SeminarCard from "./SeminarCard";
import { SEMINARS } from "./data";

export default function SeminarListPageClient() {
  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">세미나/특강</h1>

      <p className="mt-2 text-xs text-neutral-500">
        SBS컴퓨터아카데미 강남점을 담당해드립니다.<br />
        지금 신청중인 세미나/특강을 확인해보세요.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {SEMINARS.map((s) => (
          <SeminarCard key={s.id} seminar={s} />
        ))}
      </div>
    </div>
  );
}
