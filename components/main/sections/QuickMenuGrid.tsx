"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";
import { useQuickMenuStore, DEFAULT_MENUS } from "@/store/quickmenu.store";

export default function QuickMenuGrid() {
  const router = useRouter();
  const hydrated = useQuickMenuStore((s) => s.hydrated);
  const selectedMenuIds = useQuickMenuStore((s) => s.selectedMenuIds);
  const allMenus = useQuickMenuStore((s) => s.allMenus);
  const [menus, setMenus] = useState(DEFAULT_MENUS);

  useEffect(() => {
    if (hydrated) {
      const selected = selectedMenuIds
        .map((id) => allMenus.find((m) => m.id === id))
        .filter((m): m is typeof DEFAULT_MENUS[0] => m !== undefined);
      setMenus(selected);
    }
  }, [hydrated, selectedMenuIds, allMenus]);

  return (
    <section className="px-5">
      <SectionHeader
        title="바로가기"
        actionText="편집"
        onAction={() => router.push("/quickmenu/customize")}
      />
      <div className="mt-3 grid grid-cols-4 gap-3">
        {menus.map((m) => (
          <Link
            key={m.id}
            href={m.href}
            className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white py-3 text-xs text-neutral-800 shadow-sm"
          >
            <div className="h-10 w-10 rounded-2xl bg-neutral-100" />
            <div className="text-center">{m.label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
