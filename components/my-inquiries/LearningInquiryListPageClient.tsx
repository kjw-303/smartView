"use client";

import { useRouter } from "next/navigation";
import InquiryListItem from "./InquiryListItem";

const ITEMS = [
  { id: "l1", title: "포토샵 기초 특강", sub: "임소영 강사 · SBS컴퓨터 강남" },
  { id: "l2", title: "웹디자인", sub: "홍길동 강사 · SBS컴퓨터 홍대" },
  { id: "l3", title: "한식조리사 자격증(주말)", sub: "윤남노 강사 · 코리아요리아카데미 강남지점" },
];

export default function LearningInquiryListPageClient() {
  const router = useRouter();

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">학습문의</h1>
      <div className="mt-2 text-xs text-neutral-500">1:1 학습 문의내역입니다.</div>

      <div className="mt-4 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white px-4">
        {ITEMS.map((it) => (
          <InquiryListItem
            key={it.id}
            title={it.title}
            sub={it.sub}
            onClick={() => alert("TODO: 학습문의 상세")}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => router.push("/mentor/faq")}
        className="mt-6 w-full rounded-xl bg-neutral-200 py-3 text-sm font-semibold text-neutral-700"
      >
        자주 묻는 질문
      </button>
    </div>
  );
}
