"use client";

import { useRef } from "react";

export default function SnapSlider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const setSnap = (on: boolean) => {
    const el = ref.current;
    if (!el) return;
    if (on) el.classList.add("snap-x", "snap-mandatory");
    else el.classList.remove("snap-x", "snap-mandatory");
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    state.current.isDown = true;
    state.current.startX = e.pageX - el.offsetLeft;
    state.current.scrollLeft = el.scrollLeft;

    // ✅ 드래그 중에는 snap을 꺼서 “뚝뚝” 느낌 줄이기
    setSnap(false);

    el.classList.add("cursor-grabbing");
  };

  const endDrag = () => {
    const el = ref.current;
    state.current.isDown = false;
    el?.classList.remove("cursor-grabbing");

    // ✅ 드래그 끝나면 snap 다시 켜기
    // (약간의 딜레이를 주면 더 자연스럽게 붙음)
    setTimeout(() => setSnap(true), 0);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !state.current.isDown) return;

    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - state.current.startX) * 1; // 1 = 민감도 (0.8~1.2 취향)
    el.scrollLeft = state.current.scrollLeft - walk;
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseLeave={endDrag}
      onMouseUp={endDrag}
      onMouseMove={onMouseMove}
      className="
        -mx-5 px-5
        flex gap-3 overflow-x-auto
        snap-x snap-mandatory
        scroll-px-5 scroll-smooth
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        cursor-grab select-none
      "
    >
      {children}
    </div>
  );
}
