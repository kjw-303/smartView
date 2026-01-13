"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { useRouter } from "next/navigation";

const HOT = [
  { title: "UI/UX 입문 클래스", sub: "지금 가장 핫한 클래스" },
  { title: "React 실전 포트폴리오", sub: "프로젝트 중심" },
  { title: "웹디자인 부트캠프", sub: "기초부터 탄탄히" },
  { title: "프론트엔드 면접 대비", sub: "취업/포트폴리오" },
];

export default function HotClassSection() {
  const router = useRouter();
  return (
    <section>
      <div className="px-5">
      <SectionHeader
        title="지금 가장 핫한 클래스"
        actionText="전체보기"
        onAction={() => router.push("/hot-classes")}
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
          {HOT.map((it) => (
            <SwiperSlide key={it.title} style={{ width: 280 }}>
              <div role="button" onClick={() => router.push("/hot-classes")}>
              <Card>
                <div className="p-4">
                  <div className="h-28 w-full rounded-2xl bg-neutral-100" />
                  <div className="mt-3 text-sm font-semibold">{it.title}</div>
                  <div className="mt-1 text-xs text-neutral-500">{it.sub}</div>

                  <div className="mt-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                    자세히 보기
                  </div>
                </div>
              </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
