"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "홈" },
  { href: "/mentor", label: "멘토" },
  { href: "/community", label: "커뮤니티" },
  { href: "/courses", label: "수강정보" },
  { href: "/my", label: "마이페이지" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 border-t border-neutral-200 bg-white">
      <div className="grid h-16 grid-cols-5">
        {TABS.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={[
                "flex flex-col items-center justify-center gap-1 text-[11px]",
                active ? "text-[#1E2348]" : "text-neutral-500",
              ].join(" ")}
            >
              <div className={["h-6 w-6 rounded-md", active ? "bg-[#1E2348]/10" : "bg-neutral-100"].join(" ")} />
              <span className={active ? "font-semibold" : ""}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
