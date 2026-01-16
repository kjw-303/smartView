"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/auth/Toast";

type Reason = "slow" | "lack" | "bad" | "other";

const REASONS: { key: Reason; label: string }[] = [
  { key: "slow", label: "응답이 너무 느려요" },
  { key: "lack", label: "전문성이 부족해요" },
  { key: "bad", label: "태도가 좋지 않아요" },
  { key: "other", label: "기타" },
];

export default function MentorChangeRequestClient() {
  const router = useRouter();
  const [reason, setReason] = useState<Reason | null>(null);
  const [detail, setDetail] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!reason) return false;
    if (reason === "other") return detail.trim().length >= 2;
    return true;
  }, [reason, detail]);

  const onSubmit = () => {
    if (!canSubmit) return;

    // 포트폴리오용: 제출 시뮬레이션
    setToast("멘토 변경 요청이 접수되었습니다. (데모)");
    setTimeout(() => {
      router.back();
    }, 700);
  };

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">멘토 변경 요청</h1>

      <div className="mt-5 text-sm font-semibold text-neutral-900">
        멘토 변경을 원하시는<br />
        이유를 알려주세요
      </div>

      <div className="mt-4 space-y-4">
        {REASONS.map((r) => (
          <label key={r.key} className="flex items-center gap-3">
            <input
              type="radio"
              name="mentor-change"
              className="h-5 w-5 accent-[#1E2348]"
              checked={reason === r.key}
              onChange={() => setReason(r.key)}
            />
            <span className="text-sm text-neutral-900">{r.label}</span>
          </label>
        ))}

        {reason === "other" && (
          <div className="mt-2">
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="내용을 입력해주세요"
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-neutral-400"
              rows={4}
            />
            <div className="mt-1 text-right text-[11px] text-neutral-400">
              {detail.trim().length}/200
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼(스크린샷처럼 2개) */}
      <div className="mt-10 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full rounded-xl bg-neutral-200 py-3 text-sm font-semibold text-neutral-700"
        >
          돌아가기
        </button>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className={[
            "w-full rounded-xl py-3 text-sm font-semibold",
            canSubmit ? "bg-[#1E2348] text-white" : "bg-neutral-200 text-neutral-500",
          ].join(" ")}
        >
          완료
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
