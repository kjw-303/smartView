"use client";

import SectionTitle from "./SectionTitle";

const MENUS = [
  { label: "수강중 강의", href: "/courses" },
  { label: "세미나&특강", href: "/seminars" },
  { label: "출석부", href: "/attendance/ledger" },
  { label: "교재몰", href: "#" },
  { label: "미디어", href: "#" },
  { label: "고객센터", href: "#" },
  { label: "공지사항", href: "/notices" },
  { label: "마이페이지", href: "/my" },
];

export default function QuickMenu() {
  return (
    <section className="mt-6">
      <SectionTitle title="바로가기" />
      <div className="mt-3 grid grid-cols-4 gap-3">
        {MENUS.map((m) => (
          <a
            key={m.label}
            href={m.href}
            className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-white py-3 text-xs text-neutral-800"
          >
            <div className="h-10 w-10 rounded-xl bg-neutral-100" />
            <div className="text-center">{m.label}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
