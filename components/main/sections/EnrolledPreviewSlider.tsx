"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { useRouter } from "next/navigation";

const ENROLLED = [
  {
    title: "웹디자인",
    subtitle: "교과과정",
    attendance: "출석현황 73%",
    period: "수강기간 42일",
    cta: "출석하기",
  },
  {
    title: "UI/UX(피그마 심화)",
    subtitle: "프로젝트 과정",
    attendance: "출석현황 55%",
    period: "수강기간 18일",
    cta: "출석하기",
  },
  {
    title: "HTML 2주만에 완벽 정복",
    subtitle: "주말 집중",
    attendance: "출석현황 10%",
    period: "수강기간 6일",
    cta: "출석하기",
  },
];

export default function EnrolledPreviewSlider() {
   const router = useRouter();
  return (
    <section>
      <div className="px-5">
        <SectionHeader title="수강신청 내역" actionText="닫기" onAction={() => {}} />
      </div>

      {/* ✅ 메인 padding을 깨고 이어지는 느낌 + peek */}
      <div className="mt-3 -mx-5 px-5">
        <Swiper 
        spaceBetween={12} 
        slidesPerView="auto" 
        grabCursor 
        resistanceRatio={0.6} 
        slidesOffsetBefore={20}>
          {ENROLLED.map((c) => (
            <SwiperSlide key={c.title} style={{ width: 300 }}>
              <Card>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-neutral-500">{c.subtitle}</div>
                      <div className="mt-1 text-base font-semibold text-neutral-900">{c.title}</div>
                    </div>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                      수강중
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-200" />
                    <div className="text-xs text-neutral-600">
                      <div>{c.attendance}</div>
                      <div>{c.period}</div>
                      <div className="text-neutral-500">조금만 더 힘내볼까요? 🔥</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/attendance")}
                    className="mt-4 w-full rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
                  >
                    {c.cta}
                  </button>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
