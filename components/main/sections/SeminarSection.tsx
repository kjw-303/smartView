"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionHeader from "../ui/SectionHeader";

type SeminarItem = {
  id: string;
  title: string;
  posterLabel: string;
};

const SEMINARS: SeminarItem[] = [
  { id: "s1", title: "AI시대 취업 전략", posterLabel: "AI\n취업\n전략" },
  { id: "s2", title: "C4D 무엇이든 물어보세요", posterLabel: "CINEMA\n4D" },
  { id: "s3", title: "긴 제목 긴 제목", posterLabel: "SEMINAR" },
  { id: "s4", title: "UI/UX 트렌드 세션", posterLabel: "UI/UX" },
];

export default function SeminarSection() {
  return (
    <section>
      <div className="px-5">
      <SectionHeader
        title="지금 진행중인 특강/세미나 보러가요!"
        actionText="›"
        onAction={() => {}}
      />
      </div>

      <div className="mt-3 -mx-5 px-5">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          grabCursor
          resistanceRatio={0.6}
          slidesOffsetBefore={20}
        >
          {SEMINARS.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{ width: 150 }}
            >
              <Link href="/seminars" className="block">
                {/* 포스터 카드 */}
                <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                  <div className="flex h-full w-full items-center justify-center p-4 text-center">
                    <div className="whitespace-pre-line text-sm font-extrabold text-neutral-600">
                      {item.posterLabel}
                    </div>
                  </div>
                </div>

                {/* 제목 */}
                <div className="mt-2 line-clamp-2 text-sm text-neutral-900">
                  {item.title}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
