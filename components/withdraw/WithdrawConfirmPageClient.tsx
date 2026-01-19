"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWithdrawStore, WithdrawReasonKey } from "./store";
import WithdrawBenefitsBox from "./WithdrawBenefitsBox";

const REASONS: { key: WithdrawReasonKey; label: string }[] = [
  { key: "not_use", label: "더 이상 수강하지 않아요" },
  { key: "hard", label: "사용을 잘 안하게 돼요" },
  { key: "privacy", label: "개인정보 보호를 위해 삭제할 정보가 있어요" },
  { key: "benefit_small", label: "혜택이 너무 적어요" },
  { key: "other", label: "기타" },
];

export default function WithdrawReasonPageClient() {
  const router = useRouter();
  const reason = useWithdrawStore((s) => s.reason);
  const detail = useWithdrawStore((s) => s.detail);
  const setReason = useWithdrawStore((s) => s.setReason);
  const setDetail = useWithdrawStore((s) => s.setDetail);

  const canNext = useMemo(() => {
    if (!reason) return false;
    if (reason === "other") return detail.trim().length >= 2;
    return true;
  }, [reason, detail]);

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">회원 탈퇴</h1>

      <div className="mt-6 text-sm font-semibold text-neutral-900">
        회원 탈퇴를 하시려는<br />
        이유를 알려주세요
      </div>

      <div className="mt-5 space-y-4">
        {REASONS.map((r) => (
          <label key={r.key} className="flex items-center gap-3">
            <input
              type="radio"
              name="withdraw-reason"
              className="h-5 w-5 accent-[#1E2348]"
              checked={reason === r.key}
              onChange={() => setReason(r.key)}
            />
            <span className="text-sm text-neutral-900">{r.label}</span>
          </label>
        ))}

        {/* 스샷 0.2.2: 기타 선택 시 입력 */}
        {reason === "other" && (
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value.slice(0, 200))}
            placeholder="내용을 입력해주세요"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-neutral-400"
            rows={4}
          />
        )}

        {/* 스샷 0.2.1: 특정 이유 선택 시 혜택 박스 보여주기(예: not_use) */}
        {reason === "not_use" && <WithdrawBenefitsBox />}
      </div>

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
          disabled={!canNext}
          onClick={() => router.push("/my/withdraw/confirm")}
          className={[
            "w-full rounded-xl py-3 text-sm font-semibold",
            canNext ? "bg-[#1E2348] text-white" : "bg-neutral-200 text-neutral-500",
          ].join(" ")}
        >
          다음 단계
        </button>
      </div>
    </div>
  );
}
