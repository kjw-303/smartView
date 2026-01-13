"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { getNotice } from "./data";

export default function NoticeDetailPageClient({ noticeId }: { noticeId: string }) {
  const router = useRouter();
  const notice = useMemo(() => getNotice(noticeId), [noticeId]);

  if (!notice) {
    return (
      <div className="px-5 pt-6">
        <div className="text-sm text-neutral-600">존재하지 않는 공지입니다.</div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-4">
      <div className="text-sm font-semibold text-neutral-900">{notice.title}</div>
      <div className="mt-2 text-xs text-neutral-400">{notice.date}</div>

      <div className="mt-4 h-px bg-neutral-100" />

      <div className="mt-4 whitespace-pre-line text-sm leading-6 text-neutral-700">
        {notice.body}
      </div>

      {/* 이미지 영역(데모) */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-neutral-100">
        <div className="aspect-video w-full" />
      </div>

      <div className="mt-2 text-xs text-neutral-400">
        SBS아카데미컴퓨터아트학원 강남지점
      </div>
    </div>
  );
}
