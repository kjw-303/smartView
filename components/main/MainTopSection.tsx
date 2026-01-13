"use client";

import { useSessionStore } from "@/store/session.store";
import GuestHeroCard from "./cards/GuestHeroCard";
import MemberHeroCard from "./cards/MemberHeroCard";
import StudentHeroCard from "./cards/StudentHeroCard";

export default function MainTopSection() {
  const role = useSessionStore((s) => s.role);
  const userName = useSessionStore((s) => s.userName);

  if (role === "guest") return <GuestHeroCard />;
  if (role === "member") return <MemberHeroCard userName={userName ?? "회원"} />;

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
