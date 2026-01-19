"use client";

import { useSessionStore } from "@/store/session.store";
import MyProfileCard from "./MyProfileCard";
import MyPointCouponCard from "./MyPointCouponCard";
import MyMenuSection from "./MyMenuSection";
import { useRouter } from "next/navigation";

export default function MyPageClient() {
  const userName = useSessionStore((s) => s.userName) ?? "나누리";
  const logout = useSessionStore((s) => s.logout);
  const router = useRouter();

  return (
    <div className="px-5 pt-4 py-12">
      <h1 className="text-sm font-semibold text-neutral-900">마이페이지</h1>

      <div className="mt-4 space-y-4">
        <MyProfileCard userName={userName} subText="누루공지" />
        <MyPointCouponCard points={7200} coupons={2} />

        <MyMenuSection
          title="계정"
          items={[
            { label: "비밀번호 변경", onClick: () => alert("TODO") },
            { label: "관심사 관리", onClick: () => alert("TODO") },
            { label: "내 원서 전체보기", onClick: () => alert("TODO") },
          ]}
        />

        <MyMenuSection
          title="수업/신청정보"
          items={[
            { label: "수업안내", onClick: () => alert("TODO") },
            { label: "1:1 멘토문의 내역", onClick: () => router.push("/my/inquiries/mentor") },
            { label: "1:1 학습문의 내역", onClick: () => router.push("/my/inquiries/learning") },
            { label: "세미나/특강 신청현황", onClick: () => router.push("/my/seminar-history") },
            { label: "원데이클래스 신청현황", onClick: () => alert("TODO") },
            { label: "강의실 예약현황", onClick: () => alert("TODO") },
            { label: "스크랩 관리", onClick: () => alert("TODO") },
          ]}
        />

        <MyMenuSection
          title="커뮤니티"
          items={[
            { label: "내가 쓴 글", onClick: () => router.push("/my/posts") },
          ]}
        />

        <MyMenuSection
          title="설정"
          items={[
            { label: "앱 설정", onClick: () => router.push("/my/settings") },
            { label: "약관 및 정보처리방침", onClick: () => alert("TODO") },
          ]}
        />

        <button
          type="button"
          onClick={logout}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
