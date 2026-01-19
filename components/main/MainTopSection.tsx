"use client";

import { useState } from "react";
import { useSessionStore } from "@/store/session.store";
import GuestHeroCard from "./cards/GuestHeroCard";
import MemberHeroCard from "./cards/MemberHeroCard";
import StudentHeroCard from "./cards/StudentHeroCard";
import EnrolledPreviewSlider from "./sections/EnrolledPreviewSlider";

export default function MainTopSection() {
  const role = useSessionStore((s) => s.role);
  const userName = useSessionStore((s) => s.userName);

  const [showEnrollments, setShowEnrollments] = useState(false);

  if (role === "guest") return <GuestHeroCard />;

  if (role === "member") {
    return (
      <div className="space-y-4">
        <div className="px-5">
        <MemberHeroCard
          userName={userName ?? "회원"}
          onClickViewEnrollments={() => setShowEnrollments((v) => !v)}
        />
        </div>
        {/* ✅ 버튼 누르면 “수강신청 내역 슬라이더” 노출 */}
        <div className="-mx-5 px-5">
        {showEnrollments && <EnrolledPreviewSlider />}
        </div>
      </div>
    );
  }

  // student
  return (
    <StudentHeroCard
      userName={userName ?? "수강생"}
      courseTitle="웹디자인"
      attendanceText="출석현황 2/38"
      periodText="수강기간 42일"
      availableText="출석가능 7일"
    />
  );
}
