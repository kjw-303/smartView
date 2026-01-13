"use client";

import { useEffect } from "react";
import { useSessionStore } from "@/store/session.store";

const GROUPS = [
  {
    title: "학원소식",
    items: ["공지사항", "수강정보", "세미나/특강", "추천강의"],
  },
  {
    title: "학원생활",
    items: ["분실물찾기", "빈 강의실 찾기", "시설접수"],
  },
  {
    title: "기출문제",
    items: ["필기/실기 접수"],
  },
];

export default function MenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const userName = useSessionStore((s) => s.userName) ?? "나누리";

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 열릴 때 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* 오버레이 */}
      <div
        className={[
          "absolute inset-0 z-50 bg-black/40 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/* 패널 */}
      <aside
        className={[
          "absolute right-0 top-0 z-[60] h-full w-[320px] max-w-[85vw] bg-white shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-neutral-200" />
            <div>
              <div className="text-sm font-semibold">{userName} 님</div>
              <div className="text-xs text-neutral-500">누루공지</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black hover:bg-neutral-100"
            aria-label="닫기"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-6 px-5 pb-6">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <div className="mb-2 text-xs font-semibold text-neutral-400">{g.title}</div>
              <div className="space-y-3">
                {g.items.map((it) => (
                  <button
                    key={it}
                    type="button"
                    onClick={() => alert(`TODO: ${it}`)}
                    className="block w-full text-left text-sm text-neutral-900"
                  >
                    {it}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
