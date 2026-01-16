"use client";

import Portal from "@/components/ui/Portal";

export default function CancelConfirmModal({
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
            세미나/특강 신청을 취소하시겠습니까?
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
