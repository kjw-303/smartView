"use client";

import Link from "next/link";

export default function WriteFab() {
  return (
    <Link
      href="/community/write"
      className={[
        "fixed z-[60]",
        "right-4 bottom-[84px]", // 하단 네비 피해(필요시 조절)
        "flex items-center gap-2",
        "rounded-full bg-[#1E2348] px-5 py-3",
        "text-sm font-semibold text-white shadow-lg",
        "active:opacity-90",
      ].join(" ")}
      aria-label="글쓰기"
    >
      <span className="text-base">✎</span>
      글쓰기
    </Link>
  );
}
