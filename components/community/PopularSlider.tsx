"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { CommunityTabKey } from "./CommunityTabs";

const POPULAR = [
  { id: "hot1", title: "%제목 최대 한줄 노출 제목 최대 한줄 노출...", sub: "%내용 최대 2줄..." , comments: 3, likes: 5 },
  { id: "hot2", title: "%제목 최대 한줄 노출...", sub: "%내용 최대 2줄..." , comments: 1, likes: 2 },
  { id: "hot3", title: "%제목 최대 한줄 노출...", sub: "%내용 최대 2줄..." , comments: 2, likes: 9 },
];

export default function PopularSlider({ tab }: { tab: CommunityTabKey }) {
  return (
    <section>
      <div className="px-5 text-sm font-semibold text-neutral-900">
        이번 주 인기글 🔥
      </div>

      <div className="mt-3 -mx-5 px-5">
        <Swiper spaceBetween={12} slidesPerView="auto" grabCursor resistanceRatio={0.6} slidesOffsetBefore={20}>
          {POPULAR.map((p) => (
            <SwiperSlide key={p.id} style={{ width: 300 }}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-neutral-200" />
                  <div className="text-xs text-neutral-500">누루공지</div>
                </div>

                <div className="mt-2 line-clamp-1 text-sm font-semibold text-neutral-900">{p.title}</div>
                <div className="mt-1 line-clamp-2 text-xs text-neutral-500">{p.sub}</div>

                <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                  <div>{tab}</div>
                  <div className="flex items-center gap-3">
                    <span>💬 {p.comments}</span>
                    <span>♥ {p.likes}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
