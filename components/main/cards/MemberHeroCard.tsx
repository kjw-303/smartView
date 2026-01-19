"use client";

import Card from "../ui/Card";

export default function MemberHeroCard({
  userName,
  onClickViewEnrollments,
}: {
  userName: string;
  onClickViewEnrollments: () => void;
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="text-sm font-semibold text-neutral-900">{userName}님 안녕하세요!</div>
        <div className="mt-2 text-sm text-neutral-600">
          아직 수강 중인 강의가 없어요.<br />
          수강신청 후 서비스를 이용해보세요.
        </div>

        <button
          type="button"
          onClick={onClickViewEnrollments}
          className="mt-4 w-full rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
        >
          수강신청 보러가기
        </button>
      </div>
    </Card>
  );
}
