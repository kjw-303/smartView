"use client";

import Link from "next/link";

export default function TopGuestCard() {
  return (
    <div className="rounded-2xl bg-[#1E2348] p-5 text-white">
      <div className="text-sm font-semibold">로그인하기</div>
      <div className="mt-2 text-sm/6 opacity-90">
        나의 스케줄과 맞춤강의를<br />
        로그인 후 확인해보세요!
      </div>

      <Link
        href="/login"
        className="mt-4 inline-flex w-full justify-center rounded-xl bg-white/10 py-3 text-sm font-semibold"
      >
        로그인
      </Link>
    </div>
  );
}
