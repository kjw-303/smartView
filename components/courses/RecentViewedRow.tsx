"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const RECENT = [
  { id: "uiux-figma-advanced", label: "UIUX(피그마 심화)" },
  { id: "html2-weekend", label: "HTML 2주만에 완벽 정복" },
  { id: "photoshop-basic", label: "비수강생도 OK" },
  { id: "uiux-figma-basic", label: "UIUX(피그마 기초)" },
  { id: "uiux-figma-hard", label: "UIUX(피그마 중급)" },
  { id: "uiux-figma-superhard", label: "UIUX(피그마 고급)" },
];

export default function RecentViewedRow() {
  return (
    <section className="mt-6">
      <div className="px-5 text-sm font-semibold text-neutral-900">최근 본 강의</div>

      {/* ✅ padding 분리 + peek 느낌 */}
      <div className="mt-3 -mx-5 px-5">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          grabCursor
          resistanceRatio={0.6}
          slidesOffsetBefore={20}
        >
          {RECENT.map((c) => (
            <SwiperSlide key={c.id} style={{ width: 92 }}>
              <Link href={`/hot-classes/${c.id}`} className="block">
                <div className="aspect-square w-full rounded-2xl bg-neutral-100" />
                <div className="mt-2 line-clamp-2 text-xs text-neutral-700">
                  {c.label}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
