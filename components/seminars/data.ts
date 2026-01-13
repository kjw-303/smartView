export type Seminar = {
  id: string;
  title: string;
  excerpt: string;
  posterLabel: string; // 포트폴리오용 포스터 대체 텍스트
  seatsTotal: number;
  seatsUsed: number;
};

export const SEMINARS: Seminar[] = [
  {
    id: "c4d-ama",
    title: "C4D 무엇이든 물어보세요",
    excerpt: "특강 내용입니다. 특강 내용입니다. 특강 내용입니다…",
    posterLabel: "CINEMA\n4D",
    seatsTotal: 20,
    seatsUsed: 14,
  },
  {
    id: "ai-job",
    title: "AI시대 취업 전략",
    excerpt: "지금 상황/현업 이야기! Q&A까지 함께합니다.",
    posterLabel: "AI\n취업\n전략",
    seatsTotal: 50,
    seatsUsed: 21,
  },
  {
    id: "bagel-class",
    title: "베이글 클래스",
    excerpt: "가벼운 체험형 클래스. 준비물은 편한 마음!",
    posterLabel: "Bagel",
    seatsTotal: 50,
    seatsUsed: 32,
  },
  {
    id: "xmas-cake",
    title: "크리스마스 케이크 만들기",
    excerpt: "연말 특강! 즐겁게 만들고 가져가요.",
    posterLabel: "CHRISTMAS\nCAKE",
    seatsTotal: 20,
    seatsUsed: 14,
  },
];

export function getSeminar(id: string) {
  return SEMINARS.find((s) => s.id === id);
}
