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
  <div className="mx-auto h-dvh max-w-[420px] bg-white relative overflow-hidden">
    <AppHeader onOpenMenu={() => setMenuOpen(true)} />

    {/* ✅ main만 스크롤 */}
    <main className="h-full overflow-y-auto pb-35">
      {children}
    </main>

    <BottomTabBar />

    <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
  </div>
);



}
