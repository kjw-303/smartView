export type UserRole = "guest" | "member" | "student";

export type Session = {
  role: UserRole;
  userName?: string;        // member/student일 때
  currentCourse?: {
    id: string;
    title: string;
    progressText?: string;  // 예: "출석현황 2/38"
    periodText?: string;    // 예: "수강기간 42일"
    statusText?: string;    // 예: "출석가능 7일"
  };
};
