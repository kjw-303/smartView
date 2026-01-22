"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQuickMenuStore } from "@/store/quickmenu.store";

export default function QuickMenuCustomizePageClient() {
  const router = useRouter();
  const allMenus = useQuickMenuStore((s) => s.allMenus);
  const selectedMenuIds = useQuickMenuStore((s) => s.selectedMenuIds);
  const toggleMenu = useQuickMenuStore((s) => s.toggleMenu);
  const reorderMenus = useQuickMenuStore((s) => s.reorderMenus);
  const getSelectedMenus = useQuickMenuStore((s) => s.getSelectedMenus);

  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);
  const [touchStartY, setTouchStartY] = React.useState<number | null>(null);
  const [longPressTimer, setLongPressTimer] = React.useState<NodeJS.Timeout | null>(null);

  const selectedMenus = getSelectedMenus();
  const unselectedMenus = allMenus.filter((m) => !selectedMenuIds.includes(m.id));

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      reorderMenus(draggedIndex, dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderMenus(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    
    // 롱프레스 감지
    const timer = setTimeout(() => {
      setDraggedIndex(index);
    }, 300);
    setLongPressTimer(timer);
  };

  const handleTouchMove = (e: React.TouchEvent, index: number) => {
    if (draggedIndex === null || touchStartY === null) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const currentY = touch.clientY;
    
    // 드래그 중인 아이템의 위치 계산
    const itemHeight = 80; // 대략적인 아이템 높이
    const diff = currentY - touchStartY;
    const newIndex = Math.round(diff / itemHeight) + draggedIndex;
    
    if (newIndex >= 0 && newIndex < selectedMenus.length && newIndex !== index) {
      setDragOverIndex(newIndex);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      reorderMenus(draggedIndex, dragOverIndex);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
    setTouchStartY(null);
  };

  const handleSave = () => {
    router.back();
  };

  return (
    <div className="min-h-dvh bg-white">
      <div className="px-5 pt-4 pb-24">
        {/* 자주 쓰는 서비스 섹션 */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">자주 쓰는 서비스</h2>
            <div className="text-xs text-neutral-500">
              {selectedMenuIds.length}/10
            </div>
          </div>
          <p className="mb-4 text-xs text-neutral-400">
            꾹 누르면 순서 변경이 가능해요
          </p>

          <div className="space-y-2">
            {selectedMenus.map((menu, index) => {
              const isDragging = draggedIndex === index;
              const isDragOver = dragOverIndex === index;

              return (
                <div
                  key={menu.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  onTouchStart={(e) => handleTouchStart(e, index)}
                  onTouchMove={(e) => handleTouchMove(e, index)}
                  onTouchEnd={handleTouchEnd}
                  className={[
                    "flex items-center gap-3 rounded-2xl border bg-white p-4 touch-none",
                    isDragging ? "opacity-50" : "",
                    isDragOver ? "border-[#1E2348] border-2" : "border-neutral-200",
                  ].join(" ")}
                >
                  {/* 드래그 핸들 */}
                  <div className="flex flex-col gap-1 text-neutral-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="9" cy="5" r="1.5" />
                      <circle cx="15" cy="5" r="1.5" />
                      <circle cx="9" cy="12" r="1.5" />
                      <circle cx="15" cy="12" r="1.5" />
                      <circle cx="9" cy="19" r="1.5" />
                      <circle cx="15" cy="19" r="1.5" />
                    </svg>
                  </div>

                  {/* 아이콘 */}
                  <div className="h-10 w-10 flex-shrink-0 rounded-2xl bg-neutral-100" />

                  {/* 라벨 */}
                  <div className="flex-1 text-sm font-medium text-neutral-900">
                    {menu.label}
                  </div>

                  {/* 토글 버튼 */}
                  <button
                    type="button"
                    onClick={() => toggleMenu(menu.id)}
                    className="h-6 w-11 rounded-full bg-[#1E2348] p-0.5 transition-colors"
                  >
                    <div className="h-5 w-5 rounded-full bg-white transition-transform translate-x-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 사용 가능한 서비스 섹션 */}
        {unselectedMenus.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-neutral-900">사용 가능한 서비스</h2>
            <div className="space-y-2">
              {unselectedMenus.map((menu) => (
                <div
                  key={menu.id}
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4"
                >
                  {/* 아이콘 */}
                  <div className="h-10 w-10 flex-shrink-0 rounded-2xl bg-neutral-100" />

                  {/* 라벨 */}
                  <div className="flex-1 text-sm font-medium text-neutral-900">
                    {menu.label}
                  </div>

                  {/* 토글 버튼 */}
                  <button
                    type="button"
                    onClick={() => toggleMenu(menu.id)}
                    className="h-6 w-11 rounded-full bg-neutral-300 p-0.5 transition-colors"
                  >
                    <div className="h-5 w-5 rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 완료 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[420px] border-t border-neutral-100 bg-white p-4">
          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
