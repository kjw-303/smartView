"use client";

import { useMemo, useState } from "react";
import SeminarHistoryItem, { SeminarHistory } from "./SeminarHistoryItem";
import CancelConfirmModal from "./CancelConfirmModal";

const MOCK: SeminarHistory[] = [
  {
    id: "h1",
    campus: "SBS컴퓨터아트학원 강남지점",
    title: "C4D 무엇이든 물어보세요",
    datetime: "2025.03.13 14:00",
    used: 14,
    total: 20,
    status: "applied",
  },
  {
    id: "h2",
    campus: "SBS컴퓨터아트학원 강남지점",
    title: "포토샵 무엇이든 물어보세요",
    datetime: "2025.03.13 14:00",
    used: 24,
    total: 20,
    status: "waiting",
  },
  {
    id: "h3",
    campus: "SBS컴퓨터아트학원 강남지점",
    title: "포토샵 무엇이든 물어보세요",
    datetime: "2025.03.13 14:00",
    used: 24,
    total: 20,
    status: "waiting",
  },
];

export default function SeminarHistoryPageClient() {
  const [items, setItems] = useState<SeminarHistory[]>(MOCK);
  const [target, setTarget] = useState<SeminarHistory | null>(null);

  const onCancelRequest = (item: SeminarHistory) => {
    setTarget(item);
  };

  const onConfirmCancel = () => {
    if (!target) return;
    setItems((prev) =>
      prev.map((x) => (x.id === target.id ? { ...x, status: "canceled" } : x))
    );
    setTarget(null);
  };

  const title = useMemo(() => "세미나/특강 신청현황", []);

  return (
    <div className="px-5 pt-4 relative">
      <h1 className="text-sm font-semibold text-neutral-900">{title}</h1>

      <div className="mt-4 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white">
        {items.map((it) => (
          <SeminarHistoryItem
            key={it.id}
            item={it}
            onCancel={() => onCancelRequest(it)}
          />
        ))}
      </div>

      <CancelConfirmModal
        open={!!target}
        onClose={() => setTarget(null)}
        onConfirm={onConfirmCancel}
      />
    </div>
  );
}
