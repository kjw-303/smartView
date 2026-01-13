"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ApplyCompleteModal from "./ApplyCompleteModel";
import { getSeminar } from "./data";

export default function SeminarDetailPageClient({ seminarId }: { seminarId: string }) {
  const router = useRouter();
  const seminar = useMemo(() => getSeminar(seminarId), [seminarId]);

  const [applied, setApplied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!seminar) {
    return (
      <div className="px-5 pt-6">
        <p className="text-sm text-neutral-600">존재하지 않는 특강/세미나입니다.</p>
        <button
          className="mt-4 rounded-xl border px-4 py-2 text-sm"
          onClick={() => router.back()}
        >
          뒤로가기
        </button>
      </div>
    );
  }

  const { title, excerpt, posterLabel, seatsTotal, seatsUsed } = seminar;
  const isFull = seatsUsed >= seatsTotal;

  const onApply = () => {
    if (isFull || applied) return;
    setApplied(true);
    setModalOpen(true);
  };

  return (
    <div className="relative px-5 pt-4">
      <div className="text-sm font-semibold text-neutral-900">{title}</div>

      <div className="mt-3 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <div className="whitespace-pre-line text-xl font-extrabold text-neutral-600">
            {posterLabel}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-neutral-700">
        {excerpt}
        <br />
        특강 내용입니다. 특강 내용입니다. 특강 내용입니다.
        <br />
        특강 내용입니다. 특강 내용입니다. 특강 내용입니다.
      </div>

      <div className="mt-4 text-xs text-neutral-500">
        정원 <b className="text-neutral-700">{seatsUsed + (applied ? 1 : 0)}</b> / {seatsTotal}
      </div>

      <button
        type="button"
        onClick={onApply}
        disabled={isFull || applied}
        className={[
          "mt-4 w-full rounded-xl py-3 text-sm font-semibold",
          isFull || applied ? "bg-neutral-200 text-neutral-500" : "bg-[#1E2348] text-white",
        ].join(" ")}
      >
        {isFull ? "신청불가" : applied ? "신청완료" : "신청하기"}
      </button>

      <ApplyCompleteModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          router.replace("/seminars"); // 확인 누르면 리스트로 (원하면 유지)
        }}
      />
    </div>
  );
}
