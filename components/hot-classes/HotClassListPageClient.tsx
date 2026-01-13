"use client";

import HotClassCard from "./HotClassCard";
import { HOT_CLASSES } from "./data";

export default function HotClassListPageClient() {
  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">추천강의</h1>

      <div className="mt-3 rounded-xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
        학습 관심사를 기반으로<br />
        나누리님께 적합한 강의를 큐레이션했습니다.
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {HOT_CLASSES.map((c) => (
          <HotClassCard key={c.id} item={c} />
        ))}
      </div>
    </div>
  );
}
