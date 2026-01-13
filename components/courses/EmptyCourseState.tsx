"use client";

export default function EmptyCourseState({ onGoRecommend }: { onGoRecommend: () => void }) {
  return (
    <div className="px-5 mt-8 flex flex-col items-center text-center">
      <div className="h-24 w-24 rounded-full bg-neutral-100" />

      <div className="mt-6 text-sm font-semibold text-neutral-900">
        아직 수강내역이 없으시네요
      </div>
      <div className="mt-2 text-xs text-neutral-500 leading-5">
        스마트러닝에서는<br />
        수강정보 확인과 출석체크를 한 번에 할 수 있어요
      </div>

      <button
        type="button"
        onClick={onGoRecommend}
        className="mt-5 w-full max-w-[260px] rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
      >
        내 추천 강의 보러가기
      </button>
    </div>
  );
}
