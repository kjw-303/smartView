export type AttendanceRow = {
  round: number;      // 1회차
  date: string;       // 2025.04.12
  time?: string;      // 18:48
  status: "출석" | "결석" | "수료" | "-";
};

export const COURSE = {
  title: "웹디자인",
  period: "25.03.10 ~ 25.05.10 | 월, 수, 금",
};

export const LEDGER: AttendanceRow[] = [
  { round: 1, date: "2025.04.12", time: "18:48", status: "출석" },
  { round: 2, date: "2025.04.13", time: "18:51", status: "출석" },
  { round: 3, date: "2025.04.14", status: "결석" },
  { round: 4, date: "2025.04.15", time: "18:54", status: "출석" },
  { round: 5, date: "%수료일", status: "수료" },
  { round: 6, date: "%수료일", status: "수료" },
  { round: 7, date: "%수료일", status: "-" },
  { round: 8, date: "%수료일", status: "-" },
  { round: 9, date: "%수료일", status: "-" },
];
