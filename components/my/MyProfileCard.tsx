"use client";

import Link from "next/link";

export default function MyProfileCard({
  userName,
  subText,
}: {
  userName: string;
  subText: string;
}) {
  return (
    <Link
      href="/my/edit-profile"
      className="block rounded-2xl border border-neutral-200 bg-white p-4 hover:bg-neutral-50 active:bg-neutral-100"
      aria-label="내 정보 수정하기"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-neutral-200" />
          <div>
            <div className="text-sm font-semibold text-neutral-900">{userName}님</div>
            <div className="text-xs text-neutral-500">{subText}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-300">
          <span className="text-[11px] text-neutral-400">내 정보 수정</span>
          <span className="text-lg leading-none">›</span>
        </div>
      </div>
    </Link>
  );
}
