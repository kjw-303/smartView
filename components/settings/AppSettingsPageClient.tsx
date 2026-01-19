"use client";

import { useMemo, useState } from "react";
import ToggleRow from "./ToggleRow";
import Portal from "@/components/ui/Portal";
import { useRouter } from "next/navigation";

export default function AppSettingsPageClient() {
  const [pushAll, setPushAll] = useState(true);
  const [pushClass, setPushClass] = useState(true);
  const [pushCommunity, setPushCommunity] = useState(false);
  const [pushInquiry, setPushInquiry] = useState(true);

  const [openWithdraw, setOpenWithdraw] = useState(false);
  const router = useRouter();

  // 전체 토글 OFF면 하위 토글은 비활성 처리
  const childDisabled = !pushAll;

  // 전체 토글 ON/OFF 시 하위 토글도 같이 켜고 싶으면 이 로직을 쓰면 됨(선택)
  const onToggleAll = (v: boolean) => {
    setPushAll(v);
    if (!v) return;
    // ON으로 켤 때 기본값(원하는 정책에 맞게 수정 가능)
    setPushClass(true);
    setPushInquiry(true);
  };

  const currentVersion = useMemo(() => "v1.0", []);
  const updateText = useMemo(() => "업데이트 필요", []);

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">앱 설정</h1>

      {/* 푸시 알림 영역 */}
      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white px-4">
        <ToggleRow
          label="푸시 알림"
          description="푸시 알림을 허용하면, 뉴스에서 새로운 알림을 받을 수 있습니다."
          value={pushAll}
          onChange={onToggleAll}
        />

        <div className="h-px bg-neutral-100" />

        <div className={childDisabled ? "opacity-60" : ""}>
          <ToggleRow
            label="수업안내"
            value={pushClass}
            disabled={childDisabled}
            onChange={setPushClass}
          />
          <ToggleRow
            label="커뮤니티"
            value={pushCommunity}
            disabled={childDisabled}
            onChange={setPushCommunity}
          />
          <ToggleRow
            label="문의답변"
            value={pushInquiry}
            disabled={childDisabled}
            onChange={setPushInquiry}
          />
        </div>

        <div className="h-px bg-neutral-100" />

        <div className="flex items-center justify-between py-4">
          <div className="text-sm font-semibold text-neutral-900">현재버전</div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span>{currentVersion}</span>
            <span className="text-neutral-300">|</span>
            <span className="text-red-500">{updateText}</span>
          </div>
        </div>
      </div>

      {/* 회원 탈퇴 */}
      <button
        type="button"
        onClick={() => router.push("/my/withdraw")}
        className="mt-10 w-full rounded-xl border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-700"
      >
        회원 탈퇴
      </button>

      {/* 탈퇴 확인 모달 */}
      {openWithdraw && (
        <Portal>
          <div className="absolute inset-0 z-[60] pointer-events-auto bg-black/40 flex items-center justify-center px-5">
            <div className="w-full max-w-[340px] rounded-2xl bg-white p-5 text-center">
              <div className="text-sm font-semibold text-neutral-900">
                회원 탈퇴를 진행할까요?
              </div>
              <div className="mt-2 text-xs text-neutral-500 leading-5">
                탈퇴 시 일부 서비스 이용이 제한될 수 있습니다.
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOpenWithdraw(false)}
                  className="w-full rounded-xl bg-neutral-200 py-3 text-sm font-semibold text-neutral-700"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenWithdraw(false);
                    alert("TODO: 탈퇴 처리");
                  }}
                  className="w-full rounded-xl bg-[#1E2348] py-3 text-sm font-semibold text-white"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
