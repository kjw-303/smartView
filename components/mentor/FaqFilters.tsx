"use client";

const ACADEMIES = ["SBS아카데미컴퓨터아트학원", "SBS아카데미요리학원"];
const BRANCHES = ["강남지점", "홍대지점", "부산지점"];

export default function FaqFilters({
  academy,
  branch,
  onChangeAcademy,
  onChangeBranch,
}: {
  academy: string;
  branch: string;
  onChangeAcademy: (v: string) => void;
  onChangeBranch: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <select
        value={academy}
        onChange={(e) => onChangeAcademy(e.target.value)}
        className="flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
      >
        {ACADEMIES.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        value={branch}
        onChange={(e) => onChangeBranch(e.target.value)}
        className="w-[110px] rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
      >
        {BRANCHES.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>
  );
}
