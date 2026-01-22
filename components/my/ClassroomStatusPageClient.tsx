"use client";

import * as React from "react";

type FilterOption = {
  id: string;
  label: string;
  icon?: string;
};

type TimeSlot = {
  time: string;
  available: boolean;
};

type Classroom = {
  id: string;
  name: string;
  date: string;
  status: "in-class" | "empty";
  timeSlots: TimeSlot[];
};

const FILTERS: FilterOption[] = [
  { id: "computer-gangnam", label: "컴퓨터 강남" },
  { id: "computer-hongdae", label: "컴퓨터 홍대" },
  { id: "cooking-gangnam", label: "요리 강남" },
];

// 시간대 생성 (10:00 ~ 21:30, 30분 단위)
function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 10; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 21 && minute > 30) break;
      const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      // 예시: 일부 시간대는 사용 불가능
      const unavailable = [10, 11, 14, 15, 17, 18].includes(hour) && minute === 0;
      slots.push({ time: timeStr, available: !unavailable });
    }
  }
  return slots;
}

const MOCK_CLASSROOMS: Classroom[] = [
  {
    id: "1",
    name: "강남 05층A",
    date: "2026.01.10",
    status: "empty",
    timeSlots: generateTimeSlots(),
  },
  {
    id: "2",
    name: "강남 05층B",
    date: "2026.01.10",
    status: "empty",
    timeSlots: generateTimeSlots(),
  },
  {
    id: "3",
    name: "강남 05층C",
    date: "2026.01.10",
    status: "empty",
    timeSlots: generateTimeSlots(),
  },
  {
    id: "4",
    name: "강남 05층D",
    date: "2026.01.10",
    status: "empty",
    timeSlots: generateTimeSlots(),
  },
];

export default function ClassroomStatusPageClient() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>(FILTERS[0].id);
  const [expandedClassroomId, setExpandedClassroomId] = React.useState<string | null>(null);
  const [classroomStatuses, setClassroomStatuses] = React.useState<Record<string, "in-class" | "empty">>(() => {
    const initial: Record<string, "in-class" | "empty"> = {};
    MOCK_CLASSROOMS.forEach((c) => {
      initial[c.id] = c.status;
    });
    return initial;
  });

  const toggleExpand = (classroomId: string) => {
    setExpandedClassroomId(expandedClassroomId === classroomId ? null : classroomId);
  };

  const toggleStatus = (classroomId: string, status: "in-class" | "empty") => {
    setClassroomStatuses((prev) => ({ ...prev, [classroomId]: status }));
  };

  return (
    <div className="min-h-dvh bg-white">
      {/* 필터 섹션 */}
      <div className="sticky top-0 z-10 bg-white px-4 pt-4 pb-3">
        <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >
                <div
                  className={[
                    "h-10 w-10 rounded-full border flex items-center justify-center",
                    isSelected ? "border-[#1E2348]" : "border-neutral-200",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "h-5 w-5 rounded-full",
                      isSelected ? "bg-[#1E2348]" : "bg-neutral-200",
                    ].join(" ")}
                  />
                </div>
                <div
                  className={[
                    "text-[11px] whitespace-nowrap",
                    isSelected ? "text-neutral-900 font-semibold" : "text-neutral-500",
                  ].join(" ")}
                >
                  {filter.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 강의실 리스트 */}
      <div className="px-4 pb-24">
        {MOCK_CLASSROOMS.map((classroom) => {
          const isExpanded = expandedClassroomId === classroom.id;
          const currentStatus = classroomStatuses[classroom.id] || classroom.status;

          return (
            <div
              key={classroom.id}
              className="mb-3 rounded-2xl border border-neutral-200 bg-white overflow-hidden"
            >
              {/* 카드 헤더 */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500">{classroom.date}</span>
                    <span className="text-sm font-semibold text-neutral-900">{classroom.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="text-xs text-neutral-500 underline"
                    >
                      강의장 정보
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleExpand(classroom.id)}
                      className="text-neutral-400"
                    >
                      {isExpanded ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M18 15l-6-6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 확장된 내용 */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-neutral-100">
                  {/* 상태 토글 */}
                  <div className="pt-4 pb-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => toggleStatus(classroom.id, "in-class")}
                        className={[
                          "flex-1 rounded-lg py-2 text-sm font-semibold",
                          currentStatus === "in-class"
                            ? "bg-[#1E2348] text-white"
                            : "bg-neutral-100 text-neutral-600",
                        ].join(" ")}
                      >
                        수업중
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(classroom.id, "empty")}
                        className={[
                          "flex-1 rounded-lg py-2 text-sm font-semibold",
                          currentStatus === "empty"
                            ? "bg-[#1E2348] text-white"
                            : "bg-neutral-100 text-neutral-600",
                        ].join(" ")}
                      >
                        빈강의장
                      </button>
                    </div>
                  </div>

                  {/* 시간대 그리드 */}
                  <div className="grid grid-cols-6 gap-2">
                    {classroom.timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        className={[
                          "rounded-lg py-2 text-xs font-medium",
                          slot.available
                            ? "bg-[#1E2348] text-white"
                            : "bg-neutral-100 text-neutral-400",
                        ].join(" ")}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
