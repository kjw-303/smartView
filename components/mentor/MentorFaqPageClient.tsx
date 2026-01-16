"use client";

import { useMemo, useState } from "react";
import FaqFilters from "./FaqFilters";
import FaqCategoryChips, { FaqCategoryKey } from "./FaqCategoryChips";
import FaqAccordionList, { FaqItem } from "./FaqAccordionList";

const MOCK: FaqItem[] = [
  {
    id: "f1",
    category: "course",
    title: "연강이나, 동시수강이 가능한가요?",
    body:
      "시간이 겹치지 않는 정원 범위 내에서 연강 및 동시수강이 가능합니다.\n\n자세한 상담이 필요하면 멘토님에게 문의해주세요.",
  },
  { id: "f2", category: "course", title: "%게시글 제목", body: "답변 내용입니다." },
  { id: "f3", category: "job", title: "%게시글 제목", body: "답변 내용입니다." },
  { id: "f4", category: "refund", title: "%게시글 제목", body: "답변 내용입니다." },
  { id: "f5", category: "etc", title: "%게시글 제목", body: "답변 내용입니다." },
];

export default function MentorFaqPageClient() {
  const [academy, setAcademy] = useState("SBS아카데미컴퓨터아트학원");
  const [branch, setBranch] = useState("강남지점");
  const [category, setCategory] = useState<FaqCategoryKey>("course");

  const items = useMemo(() => {
    return MOCK.filter((x) => x.category === category);
  }, [category]);

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">자주 묻는 질문</h1>

      <div className="mt-4">
        <FaqFilters
          academy={academy}
          branch={branch}
          onChangeAcademy={setAcademy}
          onChangeBranch={setBranch}
        />
      </div>

      <div className="mt-4">
        <FaqCategoryChips value={category} onChange={setCategory} />
      </div>

      <div className="mt-4">
        <FaqAccordionList items={items} />
      </div>
    </div>
  );
}
