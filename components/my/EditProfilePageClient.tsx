"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/auth/Toast";
import Button from "@/components/ui/Button";

const CITIES = ["서울시", "부산시", "대구시", "인천시"];
const DISTRICTS_BY_CITY: Record<string, string[]> = {
  서울시: ["강남구", "서초구", "송파구", "마포구"],
  부산시: ["해운대구", "수영구", "부산진구"],
  대구시: ["중구", "수성구", "달서구"],
  인천시: ["연수구", "남동구", "부평구"],
};

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

export default function EditProfilePageClient() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  // 포트폴리오용: 기본값
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState("나누리");
  const [city, setCity] = useState("서울시");
  const [district, setDistrict] = useState("강남구");

  const [phone, setPhone] = useState("010-1234-5678");

  // 번호 변경/인증 플로우
  const [editingPhone, setEditingPhone] = useState(false);
  const [carrier, setCarrier] = useState("SKT");
  const [code, setCode] = useState("");
  const [codeTimeLeft, setCodeTimeLeft] = useState(0);

  const [toast, setToast] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const districts = useMemo(() => DISTRICTS_BY_CITY[city] ?? [], [city]);

  const nameError = useMemo(() => {
    if (!touched) return null;
    if (name.trim().length < 2) return "이름은 2자 이상 입력해주세요.";
    return null;
  }, [name, touched]);

  const canSave = useMemo(() => {
    return name.trim().length >= 2;
  }, [name]);

  const pickImage = () => fileRef.current?.click();

  const onChangeFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const startVerify = () => {
    // 포트폴리오용: 인증번호 발송 시뮬레이션
    setCode("");
    setCodeTimeLeft(177); // 2:57
    setToast("인증번호를 발송했어요. (데모)");
    // 간단 타이머
    const started = Date.now();
    const timer = setInterval(() => {
      const diff = Math.floor((Date.now() - started) / 1000);
      const left = 177 - diff;
      setCodeTimeLeft(Math.max(0, left));
      if (left <= 0) clearInterval(timer);
    }, 1000);
  };

  const confirmVerify = () => {
    if (code.trim().length < 4) {
      setToast("인증번호를 확인해주세요.");
      return;
    }
    setToast("휴대폰 번호가 변경되었습니다. (데모)");
    setEditingPhone(false);
  };

  const onSave = () => {
    setTouched(true);
    if (!canSave) return;
    setToast("저장되었습니다. (데모)");
    router.back();
  };

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">내 정보 수정하기</h1>

      {/* 프로필 이미지 */}
      <div className="mt-5 flex flex-col items-center">
        <button
          type="button"
          onClick={pickImage}
          className="relative h-24 w-24 overflow-hidden rounded-full bg-neutral-200"
          aria-label="프로필 사진 변경"
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="프로필" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" />
          )}

          {/* 카메라 배지 */}
          <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h4l2-2h4l2 2h2a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"
                stroke="#000"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M12 18a4 4 0 100-8 4 4 0 000 8z"
                stroke="#000"
                strokeWidth="1.8"
              />
            </svg>
          </div>
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChangeFile(e.target.files?.[0])}
        />
      </div>

      {/* 이름 */}
      <div className="mt-6 space-y-1">
        <label className="text-xs text-neutral-600">나의 이름</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          className={[
            "w-full rounded-xl border px-3 py-3 text-sm outline-none",
            nameError ? "border-red-400" : "border-neutral-200 focus:border-neutral-400",
          ].join(" ")}
        />
        <div className="flex justify-end text-[11px] text-neutral-400">
          {name.trim().length}/12
        </div>
        {nameError && <div className="text-xs text-red-500">{nameError}</div>}
      </div>

      {/* 지역 */}
      <div className="mt-5 space-y-2">
        <label className="text-xs text-neutral-600">지역</label>
        <div className="grid grid-cols-2 gap-3">
          <select
            value={city}
            onChange={(e) => {
              const v = e.target.value;
              setCity(v);
              setDistrict(DISTRICTS_BY_CITY[v]?.[0] ?? "");
            }}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 전화번호 */}
      <div className="mt-5 space-y-2">
        <label className="text-xs text-neutral-600">전화번호</label>

        {!editingPhone ? (
          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-3">
            <div className="flex-1 text-sm text-neutral-800">{phone}</div>
            <button
              type="button"
              className="text-xs font-semibold text-neutral-600"
              onClick={() => setEditingPhone(true)}
            >
              수정하기
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-xs text-neutral-600">
              등록된 전화번호를 변경하시려면<br />
              새롭게 인증해 주시기 바랍니다.
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-xs text-neutral-600">전화번호</div>
              <div className="flex items-center gap-2">
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-[90px] shrink-0 rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm"
                >
                  <option>SKT</option>
                  <option>KT</option>
                  <option>LGU+</option>
                </select>

                <input
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="min-w-0 flex-1 rounded-xl border border-neutral-200 px-3 py-3 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={startVerify}
                  className="w-[76px] min-w-0 rounded-xl whitespace-nowrap bg-[#1E2348] py-3 text-xs font-semibold text-white"
                >
                  인증요청
                </button>
              </div>

              <div className="mt-3 text-xs text-neutral-600">인증번호를 입력해주세요</div>
              <div className="flex items-center gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 rounded-xl border border-neutral-200 px-3 py-3 text-sm outline-none"
                  placeholder="인증번호"
                />
                <div className="w-[54px] text-right text-xs text-neutral-500">
                  {codeTimeLeft > 0
                    ? `${String(Math.floor(codeTimeLeft / 60)).padStart(2, "0")}:${String(codeTimeLeft % 60).padStart(2, "0")}`
                    : ""}
                </div>
                <button
                  type="button"
                  onClick={confirmVerify}
                  className="w-[56px] rounded-xl bg-neutral-200 py-3 text-xs font-semibold text-neutral-700"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Button disabled={!canSave} onClick={onSave}>
          완료
        </Button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
