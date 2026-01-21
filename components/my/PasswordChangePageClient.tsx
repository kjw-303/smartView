"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Portal from "@/components/ui/Portal";

function Modal({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <Portal>
      <div className="fixed inset-0 z-[80]">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="absolute left-1/2 top-1/2 w-[86%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-xl">
          <div className="text-sm font-semibold text-neutral-900">{message}</div>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 h-11 w-full rounded-xl bg-[#1E2348] text-sm font-semibold text-white active:opacity-90"
          >
            확인
          </button>
        </div>
      </div>
    </Portal>
  );
}

function EyeButton({
  shown,
  onToggle,
}: {
  shown: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-lg p-2 text-neutral-200 active:bg-neutral-100"
      aria-label={shown ? "비밀번호 숨기기" : "비밀번호 보기"}
    >
      {shown ? "표시" : "숨김"}
    </button>
  );
}

function InputRow({
  label,
  value,
  onChange,
  type,
  right,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 text-xs font-semibold text-neutral-200">{label}</div>
      <div className="flex h-12 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          className="h-full w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
          placeholder=""
        />
        {right}
      </div>
    </div>
  );
}

export default function PasswordChangePageClient() {
  const router = useRouter();

  const [current, setCurrent] = React.useState("");
  const [nextPw, setNextPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNext, setShowNext] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState("");

  const [success, setSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // 최소 조건(원하면 더 강화 가능)
  const isMatch = nextPw.length > 0 && nextPw === confirm;
  const canSubmit =
    current.trim().length > 0 &&
    nextPw.trim().length >= 8 &&
    isMatch &&
    nextPw !== current &&
    !submitting;

  const openModal = (msg: string) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  const onSubmit = async () => {
    if (!canSubmit) return;

    // 프론트 단 기본 에러 처리(스샷 플로우)
    if (!isMatch) return openModal("비밀번호 확인이 일치하지 않습니다.");
    if (nextPw === current) return openModal("새 비밀번호는 기존 비밀번호와 달라야 합니다.");

    setSubmitting(true);

    try {
      // TODO: 실제 API 연결
      // const res = await fetch("/api/my/password-change", { ... });

      // 데모용: "기존 비밀번호 불일치" 케이스 재현 가능
      // current가 "wrong"이면 실패
      await new Promise((r) => setTimeout(r, 350));
      if (current === "wrong") {
        openModal("기존 비밀번호가 일치하지 않습니다.");
        return;
      }

      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white">
        {/* 상단바 */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="mx-auto pr-8 text-base font-semibold text-neutral-900"></div>
          </div>
          <div className="h-px bg-neutral-200" />
        </div>

        {/* 성공 */}
        <div className="flex min-h-[50dvh] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/15">
            <span className="text-4xl">✅</span>
          </div>
          <div className="text-sm font-semibold text-neutral-900">
            비밀번호 설정이 완료되었습니다.
          </div>
          <div className="mt-2 text-xs text-neutral-500">
            새로운 비밀번호로 다시 로그인해주세요.
          </div>
        </div>

        <div className="bottom-0 left-0 right-0 bg-white p-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="h-12 w-full rounded-xl bg-[#1E2348] text-sm font-semibold text-white active:opacity-90"
          >
            로그인하러가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* 상단바 */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="mx-auto pr-8 text-base font-semibold text-neutral-900"></div>
        </div>
        <div className="h-px bg-neutral-200" />
      </div>

      {/* 폼 */}
      <div className="px-4 py-5 pb-24">
        <InputRow
          label="기존 비밀번호"
          value={current}
          onChange={setCurrent}
          type={showCurrent ? "text" : "password"}
          right={<EyeButton shown={showCurrent} onToggle={() => setShowCurrent((v) => !v)} />}
        />

        <InputRow
          label="새로운 비밀번호"
          value={nextPw}
          onChange={setNextPw}
          type={showNext ? "text" : "password"}
          right={<EyeButton shown={showNext} onToggle={() => setShowNext((v) => !v)} />}
        />

        <InputRow
          label="비밀번호 확인"
          value={confirm}
          onChange={setConfirm}
          type={showConfirm ? "text" : "password"}
          right={<EyeButton shown={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />}
        />

        {/* 안내(원하면 문구 조정) */}
        <div className="mt-1 text-xs text-neutral-400">
          새 비밀번호는 8자 이상 입력해주세요.
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="bottom-0 left-0 right-0 bg-white p-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={[
            "h-12 w-full rounded-xl text-sm font-semibold",
            canSubmit
              ? "bg-[#1E2348] text-white active:opacity-90"
              : "bg-neutral-200 text-neutral-500",
          ].join(" ")}
        >
          확인
        </button>
      </div>

      <Modal open={modalOpen} message={modalMsg} onClose={() => setModalOpen(false)} />
    </div>
  );
}
