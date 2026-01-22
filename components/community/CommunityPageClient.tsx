"use client";

import { useMemo, useState } from "react";
import CommunityTabs, { CommunityTabKey } from "./CommunityTabs";
import PopularSlider from "./PopularSlider";
import PostList, { PostItem } from "./PostList";
import FilterSheet, { FilterState } from "./FilterSheet";
import WriteFab from "./WriteFab";
import ProfileEditSheet from "./ProfileEditSheet";

const ALL_POSTS: PostItem[] = [
  {
    id: "p1",
    tab: "talk",
    author: "누루공지",
    title: "예약자 보석문의 연결되나요?!",
    body: "상담 노트북에는 예약 연락 못하나요?\n백팩 한가득서ㅠㅠㅠ",
    timeAgo: "1일 전 | 시간 21:22",
    comments: 3,
    likes: 5,
  },
  {
    id: "p2",
    tab: "talk",
    author: "한정직",
    title: "노원에서 경찰과 도둑하실분",
    body: "오늘 저녁 남성강의실서 경찰해주세요 오실 분 구합니다!!",
    timeAgo: "2시간 전 | 조회 212",
    comments: 3,
    likes: 1,
  },
  {
    id: "p3",
    tab: "specup",
    author: "수강생A",
    title: "포트폴리오 피드백 부탁드려요",
    body: "피그마 컴포넌트 구조가 맞는지 봐주세요.",
    timeAgo: "3일 전",
    comments: 1,
    likes: 9,
  },
  {
    id: "p4",
    tab: "gather",
    author: "스터디장",
    title: "Next.js 스터디 구인합니다",
    body: "주 2회 온라인, 과제 기반으로 진행해요.",
    timeAgo: "5일 전",
    comments: 7,
    likes: 12,
  },
  {
    id: "p5",
    tab: "review",
    author: "디자이너B",
    title: "UI 시안 리뷰 부탁합니다",
    body: "컬러/타이포 피드백 부탁드려요!",
    timeAgo: "1주 전",
    comments: 2,
    likes: 4,
  },
];

export default function CommunityPageClient() {
  const [tab, setTab] = useState<CommunityTabKey>("talk");
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [profileEditOpen, setProfileEditOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    sort: "latest",
    tags: ["일반"],
  });

  const posts = useMemo(() => {
    const base = ALL_POSTS.filter((p) => p.tab === tab);

    const q = query.trim();
    const searched = q
      ? base.filter((p) => (p.title + p.body).toLowerCase().includes(q.toLowerCase()))
      : base;

    // 정렬(데모)
    const sorted = [...searched].sort((a, b) => {
      if (filters.sort === "likes") return b.likes - a.likes;
      if (filters.sort === "comments") return b.comments - a.comments;
      return 0; // latest는 그대로(데모)
    });

    return sorted;
  }, [tab, query, filters.sort]);

  return (
    <div className="pt-4 overflow-hidden">
      <div className="px-5">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold text-neutral-900">커뮤니티</h1>
          <button
            type="button"
            onClick={() => setProfileEditOpen(true)}
            className="text-xs text-neutral-500 underline-offset-2"
          >
            프로필 편집
          </button>
        </div>
      </div>

      <div className="mt-4 px-5">
        <CommunityTabs value={tab} onChange={setTab} />
      </div>

      <div className="mt-4">
        <PopularSlider tab={tab} />
      </div>

      {/* 검색 */}
      <div className="mt-4 px-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E2348]"
          >
            <span className="text-lg">≡</span>
            필터
          </button>

          <div className="relative w-[220px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색"
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 pr-9 text-sm outline-none focus:border-neutral-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">⌕</span>
          </div>
        </div>
      </div>

      <div className="mt-3 px-5">
        <PostList items={posts} />
      </div>

      <FilterSheet
        open={filterOpen}
        value={filters}
        onClose={() => setFilterOpen(false)}
        onApply={(v) => {
          setFilters(v);
          setFilterOpen(false);
        }}
      />
      <ProfileEditSheet
        open={profileEditOpen}
        onClose={() => setProfileEditOpen(false)}
      />
      <WriteFab />
    </div>
  );
}
