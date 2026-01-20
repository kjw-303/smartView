"use client";

import * as React from "react";
import Portal from "@/components/ui/Portal";

export type FilterState = {
  sort: "latest" | "likes" | "comments";
  tags: string[]; // 단일 선택으로 써도 되고(현재는 1개만 유지)
};

const SORTS: { key: FilterState["sort"]; label: string }[] = [
  { key: "latest", label: "최신순" },
  { key: "likes", label: "좋아요순" },
  { key: "comments", label: "조회순" },
];

const TAGS = ["일반", "고민/질문", "맛집", "취미", "친구만들기"];

const DEFAULT_FILTER: FilterState = { sort: "latest", tags: ["일반"] };

export default function FilterSheet({
  open,
  value,
  onClose,
  onApply,
}: {
  open: boolean;
  value: FilterState;
  onClose: () => void;
  onApply: (v: FilterState) => void;
}) {
  const [draft, setDraft] = React.useState<FilterState>(value);

  // ✅ 시트 열릴 때마다 현재 적용값(value)을 draft에 동기화
  React.useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  if (!open) return null;

  const setSort = (sort: FilterState["sort"]) =>
    setDraft((prev) => ({ ...prev, sort }));

  const selectTag = (tag: string) =>
    setDraft((prev) => ({ ...prev, tags: [tag] })); // 단일 선택

  const reset = () => setDraft(DEFAULT_FILTER);

  const apply = () => {
    onApply(draft); // ✅ 여기서만 적용 콜백 호출
    onClose();      // ✅ 적용 눌렀을 때만 닫힘
  };

  return (
    <Portal>
      <div className="absolute inset-0 z-[70] pointer-events-auto">
        {/* dim */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        {/* sheet */}
        <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-200" />

          <div className="text-sm font-semibold text-neutral-900">필터</div>

          <div className="mt-4">
            <div className="text-xs font-semibold text-neutral-500">정렬</div>
            <div className="mt-2 flex gap-2">
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSort(s.key)}
                  className={[
                    "rounded-full border px-3 py-2 text-sm",
                    draft.sort === s.key
                      ? "border-[#1E2348] bg-[#1E2348] text-white"
                      : "border-neutral-200 bg-white text-neutral-700",
                  ].join(" ")}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs font-semibold text-neutral-500">태그</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {TAGS.map((t) => {
                const active = draft.tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => selectTag(t)}
                    className={[
                      "rounded-full border px-3 py-2 text-sm",
                      active
                        ? "border-[#1E2348] bg-[#1E2348] text-white"
                        : "border-neutral-200 bg-white text-neutral-700",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={apply}
              className="rounded-xl bg-[#1E2348] px-4 py-3 text-sm font-semibold text-white"
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
