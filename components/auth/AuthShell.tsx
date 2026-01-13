"use client";

import Link from "next/link";

export default function AuthShell({
  title,
  children,
  bottomLinks = true,
}: {
  title: string;
  children: React.ReactNode;
  bottomLinks?: boolean;
}) {
  return (
    <div className="mx-auto min-h-dvh max-w-[420px] px-5 pb-10 pt-6">
      <header className="mb-6 text-center">
        <h1 className="text-base font-semibold">{title}</h1>
      </header>

      <main>{children}</main>

      {bottomLinks && (
        <footer className="mt-10 flex justify-center gap-4 text-xs text-neutral-500">
          <Link href="#">서비스 이용약관</Link>
          <Link href="#">개인정보 처리방침</Link>
          <Link href="#">고객센터</Link>
        </footer>
      )}
    </div>
  );
}
