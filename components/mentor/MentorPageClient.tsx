"use client";

import MentorCard from "./MentorCard";
import { useRouter } from "next/navigation";

export default function MentorPageClient() {
  const router = useRouter();
  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">멘토</h1>

      <div className="mt-6">
        <MentorCard />
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          className="w-full rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
          onClick={() => router.push("/mentor/faq")}
        >
          자주 묻는 질문
        </button>

        <button
          type="button"
          className="w-full rounded-xl border border-[#1E2348] bg-white py-3 text-sm font-semibold text-[#1E2348]"
          onClick={() => router.push("/mentor/inquiry")}
        >
          멘토님에게 문의하기
        </button>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold text-neutral-900">상담시간</div>
        <div className="mt-2 space-y-1 text-xs text-neutral-600 leading-5">
          <div>평일 업무시간 : 09:30~18:30</div>
          <div>주말 및 공휴일 업무시간 (토) 09:30~14:00 (일, 공휴일) 휴무</div>
        </div>
      </div>
    </div>
  );
}
