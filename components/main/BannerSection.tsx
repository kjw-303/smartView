"use client";

import SectionTitle from "./SectionTitle";

export default function BannerSection() {
  return (
    <section className="mt-8">
      <SectionTitle title="추천" />
      <div className="mt-3 space-y-3">
        <div className="h-24 rounded-2xl bg-neutral-100" />
        <div className="h-24 rounded-2xl bg-neutral-100" />
      </div>
    </section>
  );
}
