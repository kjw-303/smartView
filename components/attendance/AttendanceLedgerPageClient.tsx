"use client";

import { COURSE, LEDGER } from "./data";

function statusClass(status: string) {
  if (status === "출석") return "text-blue-600";
  if (status === "결석") return "text-neutral-400";
  if (status === "수수료") return "text-blue-600";
  return "text-neutral-300";
}

export default function AttendanceLedgerPageClient() {
  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">출석하기</h1>

      <div className="mt-4">
        <div className="text-sm font-semibold text-neutral-900">{COURSE.title}</div>
        <div className="mt-1 text-xs text-neutral-500">{COURSE.period}</div>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white">
        <div className="grid grid-cols-[56px_1fr_64px_56px] gap-2 px-4 py-3 text-[11px] text-neutral-400">
          <div>회차</div>
          <div>일자</div>
          <div className="text-right">시간</div>
          <div className="text-right">상태</div>
        </div>
        <div className="h-px bg-neutral-100" />

        <div className="divide-y divide-neutral-100">
          {LEDGER.map((r) => (
            <div
              key={r.round}
              className="grid grid-cols-[56px_1fr_64px_56px] gap-2 px-4 py-3 text-sm"
            >
              <div className="text-neutral-600">{r.round}회차</div>
              <div className="text-neutral-700">{r.date}</div>
              <div className="text-right text-neutral-600">{r.time ?? "-"}</div>
              <div className={["text-right font-semibold", statusClass(r.status)].join(" ")}>
                {r.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
