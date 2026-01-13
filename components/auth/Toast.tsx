"use client";

import { useEffect } from "react";

export default function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[min(420px,calc(100vw-24px))] -translate-x-1/2 rounded-lg bg-black/80 px-4 py-3 text-sm text-white">
      {message}
    </div>
  );
}
