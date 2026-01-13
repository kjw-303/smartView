"use client";

import Link from "next/link";
import Card from "../ui/Card";

export default function StudentHeroCard({
  userName,
  courseTitle,
  attendanceText,
  periodText,
  availableText,
}: {
  userName: string;
  courseTitle: string;
  attendanceText: string;
  periodText: string;
  availableText: string;
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="text-sm font-semibold">{userName}님, 오늘도 화이팅!</div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold">{courseTitle}</div>

            <div className="mt-2 space-y-1 text-xs text-neutral-600">
              <div>{attendanceText}</div>
              <div>{periodText}</div>
              <div>{availableText}</div>
            </div>
          </div>

          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
            수강중
          </span>
        </div>

        <Link
          href="/attendance"
          className="mt-4 inline-flex w-full justify-center rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
        >
          출석하기
        </Link>
      </div>
    </Card>
  );
}
