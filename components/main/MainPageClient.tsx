"use client";

import MainTopSection from "./MainTopSection";
import QuickMenuGrid from "./sections/QuickMenuGrid";
import HotClassSection from "./sections/HotClassSection";
import ReviewSection from "./sections/ReviewSection";
import PromoBannerSection from "./sections/SeminarSection";

export default function MainPageClient() {
  return (
    <div className="mx-auto min-h-dvh max-w-[420px] pb-24" style={{backgroundColor:"#8f8f8f",overflow:"hidden"}}>
      <div className="px-5 pt-6">
        <MainTopSection />
      </div>

      <div className="mt-6 space-y-8">
        <QuickMenuGrid />
        <HotClassSection />
        <ReviewSection />
        <PromoBannerSection />
      </div>
    </div>
  );
}
