"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LikeState = "none" | "up" | "down";

export default function MentorCard() {
  const [like, setLike] = useState<LikeState>("none");

  const isUp = like === "up";
  const isDown = like === "down";
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white px-5 py-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="h-28 w-28 overflow-hidden rounded-full bg-neutral-200" />

        <div className="mt-4 text-base font-semibold text-neutral-900">임소영 멘토</div>
        <div className="mt-1 text-xs text-neutral-500">SBS컴퓨터아트학원 강남지점</div>

        <div className="mt-4 flex items-center gap-6 text-xs text-neutral-500">
          {/* 👍 */}
          <button
            type="button"
            onClick={() => setLike(isUp ? "none" : "up")}
            className="flex items-center gap-2"
            aria-label="좋아요"
          >
            <ThumbIcon active={isUp} />
            <span className={isUp ? "text-[#1E2348] font-semibold" : ""}> </span>
          </button>

          {/* 👎 */}
          <button
            type="button"
            onClick={() => setLike(isDown ? "none" : "down")}
            className="flex items-center gap-2"
            aria-label="싫어요"
          >
            <ThumbDownIcon active={isDown} />
            <span className={isDown ? "text-[#1E2348] font-semibold" : ""}> </span>
          </button>

          <span className="text-neutral-200">|</span>

          <button
            type="button"
            onClick={() => router.push("/mentor/change-request")}
            className="text-xs text-neutral-600 underline underline-offset-2"
          >
            멘토 변경 요청
          </button>
        </div>
      </div>
    </div>
  );
}

function ThumbIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#1E2348" : "none"}>
      <path
        d="M14 9V5a3 3 0 00-3-3l-1 7H6a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-1.5l2-7A2 2 0 0016 9h-2z"
        stroke={active ? "#1E2348" : "#9CA3AF"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThumbDownIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#1E2348" : "none"}>
      <path
        d="M10 15v4a3 3 0 003 3l1-7h4a2 2 0 002-2V6a2 2 0 00-2-2H10a2 2 0 00-2 1.5l-2 7A2 2 0 008 15h2z"
        stroke={active ? "#1E2348" : "#9CA3AF"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
