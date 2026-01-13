"use client";

import { useMemo, useState } from "react";
import NotificationTabs, { NotificationTabKey } from "./NotificationTabs";
import NotificationList, { NotificationItem } from "./NotificationList";

const MOCK: NotificationItem[] = [
  {
    id: "n1",
    tab: "class",
    title: "컴퓨터 강남 - 포토샵 입문반",
    body: "1월 18일 출석 안내가 변경되었습니다. 4층 강의실 ▶ 3층 강의실로 변경되었습니다.",
    timeAgo: "2시간 전",
  },
  {
    id: "n2",
    tab: "class",
    title: "컴퓨터 강남 - 포토샵 무엇이든 물어보세요",
    body: "만족도 조사를 실시해주세요.",
    timeAgo: "2일 전",
  },
  {
    id: "n3",
    tab: "class",
    title: "컴퓨터 강남 - 포토샵 무엇이든 물어보세요",
    body: "신청하신 세미나/특강 예약이 확정되었습니다.",
    timeAgo: "2일 전",
  },
  {
    id: "n4",
    tab: "community",
    title: "%갤러리 게시글 제목",
    body: "긴 알림 2줄까지 노출. 넘치면 말줄임 처리됩니다. 긴 알림 2줄까지 노출…",
    timeAgo: "2일 전",
  },
  {
    id: "n5",
    tab: "inquiry",
    title: "%문의글의 제목",
    body: "%알림 내용 알림 내용 알림 내용",
    timeAgo: "13일 전",
  },
  {
    id: "n6",
    tab: "inquiry",
    title: "%문의글의 제목",
    body: "%알림 내용 알림 내용 알림 내용",
    timeAgo: "5일 전 · (시간) - (월/일)",
  },
];

export default function NotificationsPageClient() {
  const [tab, setTab] = useState<NotificationTabKey>("class");

  const items = useMemo(() => MOCK.filter((x) => x.tab === tab), [tab]);

  return (
    <div className="px-5">
      <NotificationTabs value={tab} onChange={setTab} />
      <NotificationList items={items} />
    </div>
  );
}
