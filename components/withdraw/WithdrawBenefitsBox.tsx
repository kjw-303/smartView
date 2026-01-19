"use client";

export default function WithdrawBenefitsBox() {
  return (
    <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-700 leading-5">
      스마트러닝에서는 학습을 이어갈 수 있어요.<br />
      수강신청/세미나/특강/커뮤니티 기능을 이용할 수 있습니다.
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => alert("TODO: 혜택/이벤트 구경하기")}
          className="flex-1 rounded-xl bg-[#1E2348] py-2 text-xs font-semibold text-white"
        >
          혜택/이벤트 구경하기
        </button>
        <button
          type="button"
          onClick={() => alert("TODO: 커뮤니티 구경하기")}
          className="flex-1 rounded-xl border border-neutral-200 bg-white py-2 text-xs font-semibold text-neutral-800"
        >
          커뮤니티 구경하기
        </button>
      </div>
    </div>
  );
}
