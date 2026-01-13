"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getHotClass } from "./data";
import BookmarkButton from "@/components/ui/BookmarkButton";

const BRANCHES = ["강남점", "홍대점", "부산점", "대구점"];

export default function HotClassDetailPageClient({ classId }: { classId: string }) {
  const router = useRouter();
  const item = useMemo(() => getHotClass(classId), [classId]);

  const [branch, setBranch] = useState("");

  if (!item) {
    return (
      <div className="px-5 pt-6">
        <p className="text-sm text-neutral-600">존재하지 않는 강의입니다.</p>
        <button
          className="mt-4 rounded-xl border px-4 py-2 text-sm"
          onClick={() => router.back()}
        >
          뒤로가기
        </button>
      </div>
    );
  }

  const canApply = branch.length > 0;

  return (
    <div className="px-5 pt-4">
      <div className="text-sm font-semibold text-neutral-900">{item.title}</div>

      <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100">
        <div className="absolute right-4 top-4 z-10">
          <BookmarkButton id={item.id} />
        </div>
        <div className="flex h-full w-full items-center justify-center text-2xl font-extrabold text-neutral-600">
          {item.thumbLabel}
        </div>
      </div>

      <div className="mt-4 whitespace-pre-line text-sm text-neutral-700">
        {item.description}
      </div>

      <div className="mt-6">
        <label className="text-xs text-neutral-600">지점</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
        >
          <option value="">지점 선택</option>
          {BRANCHES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        disabled={!canApply}
        onClick={() => alert(`TODO: ${branch} 상담 신청`)}
        className={[
          "mt-4 w-full rounded-xl py-3 text-sm font-semibold",
          canApply ? "bg-[#1E2348] text-white" : "bg-neutral-200 text-neutral-500",
        ].join(" ")}
      >
        상담 신청하기
      </button>
    </div>
  );
}
