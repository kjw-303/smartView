"use client";

import { useMemo, useState } from "react";
import MyPostsTabs, { MyPostsTabKey } from "./MyPostsTabs";
import MyPostList, { MyPostItem } from "./MyPostList";

const POSTS: MyPostItem[] = [
  {
    id: "p1",
    kind: "post",
    category: "특톡",
    title: "오늘 진짜 힘든 하루네요",
    rightText: "3시간 전",
  },
  {
    id: "p2",
    kind: "post",
    category: "%게시판 분류",
    title: "긴 제목 2줄까지만 노출 긴 제목 2줄까지만 노출 긴 제목 2줄까지만 노출…",
    rightText: "2025.03.12",
  },
  {
    id: "p3",
    kind: "post",
    category: "%게시판 분류",
    title: "%게시글 제목",
    rightText: "%작성일",
  },
];

const COMMENTS: MyPostItem[] = [
  {
    id: "c1",
    kind: "comment",
    category: "%게시판 분류",
    title: "댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다…",
    rightText: "2시간 전",
  },
  {
    id: "c2",
    kind: "comment",
    category: "%게시판 분류",
    title: "댓글 내용입니다.",
    rightText: "2025.03.12",
  },
];

export default function MyPostsPageClient() {
  const [tab, setTab] = useState<MyPostsTabKey>("post");

  const items = useMemo(() => (tab === "post" ? POSTS : COMMENTS), [tab]);

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">내가 쓴 글</h1>

      <div className="mt-4">
        <MyPostsTabs value={tab} onChange={setTab} />
      </div>

      <div className="mt-2">
        <MyPostList items={items} />
      </div>
    </div>
  );
}
