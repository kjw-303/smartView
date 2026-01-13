"use client";

import { useMemo, useState } from "react";
import CampusTabs from "./CampusTabs";
import NoticeList from "./NoticeList";
import Pagination from "./Pagination";
import { CampusKey, NOTICES } from "./data";

export default function NoticeListPageClient() {
  const [campus, setCampus] = useState<CampusKey>("gangnam");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filtered = useMemo(
    () => NOTICES.filter((n) => n.campus === campus),
    [campus]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">공지사항</h1>

      <div className="mt-3">
        <CampusTabs
          value={campus}
          onChange={(c) => {
            setCampus(c);
            setPage(1);
          }}
        />
      </div>

      <div className="mt-4">
        <NoticeList items={items} />
      </div>

      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
