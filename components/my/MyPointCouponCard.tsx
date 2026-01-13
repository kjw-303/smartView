"use client";

export default function MyPointCouponCard({
  points,
  coupons,
}: {
  points: number;
  coupons: number;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-xs text-neutral-700">
        친구추천 하고 <b>5,000포인트</b>를 받자~
      </div>
      <div className="mt-1 text-[11px] text-neutral-500">(이벤트 or Ad)</div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-neutral-50 p-3">
          <div className="text-[11px] text-neutral-500">포인트</div>
          <div className="mt-1 text-lg font-semibold text-neutral-900">
            {points.toLocaleString()}
          </div>
        </div>

        <div className="rounded-xl bg-neutral-50 p-3">
          <div className="text-[11px] text-neutral-500">보유쿠폰</div>
          <div className="mt-1 text-lg font-semibold text-neutral-900">
            {coupons}개
          </div>
        </div>
      </div>
    </div>
  );
}
