"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/session.store";
import AppHeader from "@/components/layout/AppHeader";
import MenuDrawer from "@/components/layout/MenuDrawer";
import BottomTabBar from "@/components/layout/BottomTabBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const role = useSessionStore((s) => s.role);
  const hydrated = useSessionStore((s) => s.hydrated);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (role === "guest") router.replace("/login");
  }, [hydrated, role, router]);

  return (
    <div className="mx-auto h-dvh max-w-[420px] bg-white flex flex-col overflow-hidden relative">
      {/* header */}
      <header className="h-14 shrink-0">
        <AppHeader onOpenMenu={() => setMenuOpen(true)} />
      </header>

      {/* main */}
      <main className={["flex-1 overflow-y-auto", menuOpen ? "pointer-events-none" : "", "pb-8"].join(" ")}>
        {children}
      </main>

      {/* bottom nav */}
      <nav className="h-16 shrink-0">
        <BottomTabBar />
      </nav>

      {/* drawer: header 밖에서 렌더 */}
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* portal root */}
      <div id="overlay-root" className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
