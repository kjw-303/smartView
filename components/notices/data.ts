export type CampusKey = "gangnam" | "hongdae" | "cooking";

export const CAMPUSES: { key: CampusKey; label: string }[] = [
  { key: "gangnam", label: "컴퓨터 강남" },
  { key: "hongdae", label: "컴퓨터 홍대" },
  { key: "cooking", label: "요리 강남" },
];

export type Notice = {
  id: string;
  campus: CampusKey;
  title: string;
  date: string; // YYYY.MM.DD
  body: string;
};

export const NOTICES: Notice[] = [
  {
    id: "n1",
    campus: "gangnam",
    title: "여자화장실 공사 일정 안내",
    date: "2025.03.12",
    body:
      "내용입니다. 내용입니다. 내용입니다. 내용입니다.\n\n내용입니다. 내용입니다. 내용입니다. 내용입니다.\n\n내용입니다. 내용입니다.",
  },
  {
    id: "n2",
    campus: "gangnam",
    title: "긴 공지사항 제목 2줄까지만 노출 긴 공지사항 제목 2줄까지만 노출 긴 공지사항 제목 2줄까지만 노출",
    date: "2025.03.12",
    body: "내용입니다. 내용입니다.\n\n내용입니다. 내용입니다.\n\n내용입니다.",
  },
  {
    id: "n3",
    campus: "hongdae",
    title: "C4D 무엇이든 물어보세요 신청 시작!",
    date: "2025.03.12",
    body: "특강 신청이 시작되었습니다.\n\n자세한 내용은 본문을 확인해주세요.",
  },
  {
    id: "n4",
    campus: "hongdae",
    title: "%게시글 제목",
    date: "%작성일",
    body: "내용입니다.",
  },
  {
    id: "n5",
    campus: "cooking",
    title: "%게시글 제목",
    date: "%작성일",
    body: "내용입니다.",
  },
];

export function getNotice(id: string) {
  return NOTICES.find((n) => n.id === id);
}
