"use client";

import Portal from "@/components/ui/Portal";

export default function WithdrawConfirmModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <Portal>
      <div className="absolute inset-0 z-[60] pointer-events-auto bg-black/40 flex items-center justify-center px-5">
        <div className="w-full max-w-[340px] rounded-2xl bg-white p-5 text-center">
          <div className="text-sm font-semibold text-neutral-900">
            회원 탈퇴를 진행할까요?
          </div>
          <div className="mt-2 text-xs text-neutral-500 leading-5">
            탈퇴 시 계정 정보는 복구되지 않습니다.
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-neutral-200 py-3 text-sm font-semibold text-neutral-700"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
