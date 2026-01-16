"use client";

import { useRouter } from "next/navigation";
import InquiryListItem from "./InquiryListItem";

const ITEMS = [
  { id: "m1", title: "임소영 멘토", sub: "SBS컴퓨터아트학원 강남지점" },
  { id: "m2", title: "홍길동 멘토", sub: "SBS컴퓨터아트학원 홍대지점" },
  { id: "m3", title: "윤남노 멘토", sub: "코리아요리아카데미 강남지점" },
];

export default function MentorInquiryListPageClient() {
  const router = useRouter();

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">멘토문의</h1>
      <div className="mt-2 text-xs text-neutral-500">1:1 멘토 문의내역입니다.</div>

      <div className="mt-4 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white px-4">
        {ITEMS.map((it) => (
          <InquiryListItem
            key={it.id}
            title={it.title}
            sub={it.sub}
            onClick={() => alert("TODO: 멘토문의 상세")}
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
