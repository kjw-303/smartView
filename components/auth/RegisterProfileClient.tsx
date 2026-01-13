"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "./AuthShell";
import RegisterProgress from "./RegisterProgress";
import TextField from "./TextField";
import Button from "@/components/ui/Button";
import Toast from "./Toast";
import { useRegisterStore } from "@/store/register.store";

export default function RegisterProfileClient() {
  const { setProfile } = useRegisterStore();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  // store 확장 없이도 일단 화면 진행 가능 (원하면 다음에 draft.profile로 저장 추가)
  const { setForm } = useRegisterStore(); // 이미 쓰고 있어서 import 유지용 (안 써도 됨)

  const [name, setName] = useState("");
  const [birth, setBirth] = useState(""); // YYYY-MM-DD
  const [gender, setGender] = useState<"male" | "female" | "none">("none");

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const canNext = useMemo(() => {
    return name.trim().length >= 2 && /^\d{4}-\d{2}-\d{2}$/.test(birth);
  }, [name, birth]);

  const onPickImage = () => fileRef.current?.click();

  const onChangeFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const onNext = () => {
    if (!canNext) {
      setToast("이름/생년월일을 확인해주세요.");
      return;
    }
    setProfile({
      name: name.trim(),
      birth,
      gender,
      avatarUrl,
    });
    // 포트폴리오용: 일단 다음 단계로 이동
    // (원하면 store에 draft.profile로 저장하도록 다음에 확장)
    router.push("/register/interests");
  };

  return (
    <AuthShell title="회원가입">
      <RegisterProgress step={3} total={5} />

      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onPickImage}
            className="relative h-24 w-24 overflow-hidden rounded-full border border-neutral-200 bg-neutral-50"
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="프로필" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
                사진 추가
              </div>
            )}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChangeFile(e.target.files?.[0])}
          />

          <button
            type="button"
            onClick={onPickImage}
            className="text-xs text-neutral-600 underline underline-offset-2"
          >
            프로필 사진 선택
          </button>
        </div>

        <TextField
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={setName}
        />

        <div className="space-y-1">
          <label className="text-xs text-neutral-700">생년월일</label>
          <input
            className="w-full rounded-lg border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-neutral-400"
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
          <p className="text-[11px] text-neutral-500">예: 1999-01-01</p>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-neutral-700">성별 (선택)</div>
          <div className="flex gap-2">
            {[
              { key: "male", label: "남" },
              { key: "female", label: "여" },
              { key: "none", label: "선택안함" },
            ].map((it) => (
              <button
                key={it.key}
                type="button"
                onClick={() => setGender(it.key as any)}
                className={[
                  "flex-1 rounded-lg border px-3 py-3 text-sm",
                  gender === it.key ? "border-[#1E2348] bg-[#1E2348] text-white" : "border-neutral-200 bg-white",
                ].join(" ")}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>

        <Button disabled={!canNext} onClick={onNext}>
          다음
        </Button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AuthShell>
  );
}
