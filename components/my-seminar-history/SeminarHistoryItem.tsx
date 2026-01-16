"use client";

export type SeminarStatus = "applied" | "waiting" | "canceled";

export type SeminarHistory = {
  id: string;
  campus: string;
  title: string;
  datetime: string;
  used: number;
  total: number;
  status: SeminarStatus;
};

function statusText(status: SeminarStatus) {
  if (status === "applied") return { text: "신청완료", cls: "text-blue-600" };
  if (status === "waiting") return { text: "신청완료(대기)", cls: "text-neutral-500" };
  return { text: "취소됨", cls: "text-neutral-400" };
}

export default function SeminarHistoryItem({
  item,
  onCancel,
}: {
  item: SeminarHistory;
  onCancel: () => void;
}) {
  const st = statusText(item.status);

  const canCancel = item.status === "applied" || item.status === "waiting";

  return (
    <div className="px-4 py-4">
      <div className="text-[11px] text-neutral-500">{item.campus}</div>

      <div className="mt-1 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-neutral-900">{item.title}</div>

          <div className="mt-2 space-y-1 text-xs text-neutral-600">
            <div>일시 {item.datetime}</div>
            <div>
              정원{" "}
              <b className={item.used > item.total ? "text-red-500" : "text-neutral-900"}>
                {item.used}
              </b>
              /{item.total} &nbsp; 상태{" "}
              <span className={st.cls}>{st.text}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!canCancel}
          onClick={onCancel}
          className={[
            "text-xs underline underline-offset-2",
            canCancel ? "text-neutral-500" : "text-neutral-300",
          ].join(" ")}
        >
          취소하기
        </button>
      </div>
    </div>
  );
}
