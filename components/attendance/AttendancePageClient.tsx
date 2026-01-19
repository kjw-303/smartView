"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { COURSE } from "./data";

export default function AttendancePageClient() {
  const router = useRouter();
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">출석하기</h1>

      <div className="mt-4">
        <div className="text-sm font-semibold text-neutral-900">{COURSE.title}</div>
        <div className="mt-1 text-xs text-neutral-500">{COURSE.period}</div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="h-24 w-24 rounded-3xl bg-neutral-100" />
        <div className="mt-4 text-sm text-neutral-600">
          {checkedIn ? "출석이 완료되었습니다." : "출석가능시간은 19:10 까지 입니다."}
        </div>

        <button
          type="button"
          onClick={() => setCheckedIn(true)}
          disabled={checkedIn}
          className={[
            "mt-6 w-full rounded-xl py-3 text-sm font-semibold",
            checkedIn ? "bg-neutral-200 text-neutral-500" : "bg-emerald-500 text-white",
          ].join(" ")}
        >
          출석하기
        </button>

        {/* ✅ 여기: 출석부 페이지로 이동 */}
        <button
          type="button"
          onClick={() => router.push("/attendance/ledger")}
          className="mt-4 text-xs text-neutral-600 underline underline-offset-2"
        >
          출석부 보기
        </button>
      </div>
    </div>
  );
}
