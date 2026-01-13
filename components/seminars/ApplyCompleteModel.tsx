"use client";

export default function ApplyCompleteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <div className="w-full max-w-[340px] rounded-2xl bg-white p-5">
        <div className="text-sm font-semibold text-neutral-900">특강 신청이 완료되었습니다.</div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}
