"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function getTitle(pathname: string) {
  if (pathname.startsWith("/seminars")) return "세미나/특강";
  if (pathname.startsWith("/notifications")) return "알림";
  if (pathname.startsWith("/courses")) return "수강정보";
  if (pathname.startsWith("/attendance")) return "출석";
  if (pathname.startsWith("/my")) return "마이페이지";
  if (pathname.startsWith("/my/edit-profile")) return "내 정보 수정하기";
  return "";
}

export default function AppHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const isMain = pathname === "/";
  const title = getTitle(pathname);

  return (
    <header className="w-full bg-white border-b border-neutral-100">
      <div className="flex h-14 items-center justify-between px-4">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {isMain ? (
            // ✅ 메인: 로고
            <Image
              src="/icon_logo.svg"
              alt="logo"
              width={20}
              height={24}
              priority
            />
          ) : (
            // ✅ 서브: 뒤로가기
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black hover:bg-neutral-100"
              aria-label="뒤로가기"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* CENTER */}
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-neutral-900">
          {!isMain && title}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1">
          {/* 알림 */}
          <button
            type="button"
            onClick={() => router.push("/notifications")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black hover:bg-neutral-100"
            aria-label="알림"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 17H6a2 2 0 01-2-2c0-1 1-2 2-3V9a6 6 0 1112 0v3c1 1 2 2 2 3a2 2 0 01-2 2h-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10 20a2 2 0 004 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* 메뉴 */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black hover:bg-neutral-100"
            aria-label="메뉴"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
