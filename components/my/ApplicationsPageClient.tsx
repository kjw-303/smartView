"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Application = {
  id: string;
  academyName: string;
  branchName: string;
  firstRegisteredAt: string; // YYYY. MM. DD
  applicationNo: string;
  logoSrc?: string; // /images/... or remote
};

const MOCK: Application[] = [
  {
    id: "1",
    academyName: "SBS아카데미컴퓨터아트학원",
    branchName: "강남지점",
    firstRegisteredAt: "2013. 08. 21",
    applicationNo: "13080213",
    logoSrc: "/images/mock/sbs.png", // 없으면 자동 placeholder 처리됨
  },
  {
    id: "2",
    academyName: "SBS아카데미컴퓨터아트학원",
    branchName: "홍대지점",
    firstRegisteredAt: "2016. 12. 04",
    applicationNo: "16124734",
    logoSrc: "/images/mock/sbs.png",
  },
  {
    id: "3",
    academyName: "코리아요리아트아카데미",
    branchName: "강남지점",
    firstRegisteredAt: "2025. 11. 21",
    applicationNo: "25114137",
    logoSrc: "/images/mock/korea.png",
  },
];

function TopBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-10 bg-white"></div>
  );
}

function Logo({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-500">
        LOGO
      </div>
    );
  }
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-neutral-50">
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}

export default function ApplicationsPageClient() {
  const [items] = React.useState<Application[]>(MOCK);

  return (
    <div className="bg-white">
      <TopBar title="내 원서 전체보기" />

      <div className="px-4 py-4 pb-24">
        {items.length === 0 ? (
          <div className="mt-16 text-center text-sm text-neutral-500">
            아직 등록된 원서가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((a) => (
              <button
                key={a.id}
                type="button"
                // TODO: 상세 페이지 있으면 이동
                onClick={() => {}}
                className="rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm active:opacity-90"
              >
                <div className="flex justify-center">
                  <Logo src={a.logoSrc} alt={a.academyName} />
                </div>

                <div className="mt-3 text-[12px] font-semibold text-neutral-900 line-clamp-2">
                  {a.academyName}
                </div>
                <div className="mt-1 text-[12px] font-semibold text-neutral-900">
                  {a.branchName}
                </div>

                <div className="mt-3 space-y-1 text-[11px] text-neutral-500">
                  <div>
                    최초등록일 :{" "}
                    <span className="font-medium text-neutral-700">
                      {a.firstRegisteredAt}
                    </span>
                  </div>
                  <div>
                    원서번호 :{" "}
                    <span className="font-medium text-neutral-700">
                      {a.applicationNo}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
