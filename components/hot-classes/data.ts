export type HotClass = {
  id: string;
  title: string;
  description: string;
  thumbLabel: string; // 포트폴리오용 썸네일 대체
};

export const HOT_CLASSES: HotClass[] = [
  {
    id: "uiux-figma-advanced",
    title: "UIUX(피그마 심화)",
    description:
      "강의 내용입니다.\n강의 내용입니다. 강의 내용입니다.\n강의 내용입니다. 강의 내용입니다.",
    thumbLabel: "FIGMA",
  },
  {
    id: "html2-weekend",
    title: "HTML 2주만에 완벽 정복",
    description:
      "기초부터 실전까지 빠르게.\n주말 집중 과정으로 구성되었습니다.",
    thumbLabel: "HTML",
  },
  {
    id: "photoshop-basic",
    title: "포토샵 기초",
    description:
      "디자인 입문자를 위한 포토샵 기초.\n실습 중심으로 진행됩니다.",
    thumbLabel: "PS",
  },
  {
    id: "uiux-figma-basic",
    title: "UIUX(피그마 기초)",
    description:
      "피그마 첫 입문.\n컴포넌트/오토레이아웃까지 함께합니다.",
    thumbLabel: "UI/UX",
  },
];

export function getHotClass(id: string) {
  return HOT_CLASSES.find((c) => c.id === id);
}
