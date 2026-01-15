"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/session.store";
import EmptyCourseState from "./EmptyCourseState";
import RecentViewedRow from "./RecentViewedRow";

export default function CoursesPageClient() {
  const router = useRouter();
  const role = useSessionStore((s) => s.role);

  return (
    <div className="pt-4 overflow-hidden">
      <h1 className="px-5 text-sm font-semibold text-neutral-900">내 수강정보</h1>

      {/* 비수강생 */}
      {role === "member" && (
        <>
          <EmptyCourseState onGoRecommend={() => router.push("/hot-classes")} />
          <div className="mt-6 h-px bg-neutral-100" />
          <RecentViewedRow />
        </>
      )}

      {/* 수강생(다음 단계에서 강의 목록으로 확장) */}
      {role === "student" && (
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
          수강중 강의 목록 영역 (다음 단계에서 구현)
        </div>
      )}
    </div>
  );
}
