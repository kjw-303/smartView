"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

const REVIEWS = [
  { name: "수강생 A", text: "출석부터 강의까지 한 번에 확인돼서 좋아요." },
  { name: "수강생 B", text: "세미나 신청 기능이 편해서 자주 쓰게 됩니다." },
  { name: "수강생 C", text: "수강중 강의 현황이 한눈에 보여서 관리가 쉬워요." },
  { name: "수강생 D", text: "모바일에서 슬라이드로 보는 UI가 직관적이에요." },
];

export default function ReviewSection() {
  return (
    <section>
      <div className="px-5">
      <SectionHeader title="수강생들의 리얼 후기" />
      </div>

      <div className="mt-3 -mx-5 px-5">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          grabCursor
          resistanceRatio={0.6}
          slidesOffsetBefore={20}
        >
          {REVIEWS.map((r, idx) => (
            <SwiperSlide key={`${r.name}-${idx}`} style={{ width: 280 }}>
              <Card>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-neutral-100" />
                    <div>
                      <div className="text-sm font-semibold text-neutral-900">{r.name}</div>
                      <div className="text-[11px] text-neutral-500">리얼 후기</div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-neutral-800">{r.text}</div>
                  <div className="mt-3 text-xs text-neutral-400">★ ★ ★ ★ ★</div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
