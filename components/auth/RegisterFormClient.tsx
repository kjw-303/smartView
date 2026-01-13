"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "./AuthShell";
import RegisterProgress from "./RegisterProgress";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import Button from "@/components/ui/Button";
import Toast from "./Toast";
import { validators } from "@/features/auth/validators";
import { useRegisterStore } from "@/store/register.store";

function formatPhone(v: string) {
  // 숫자만 남기고 010-1234-5678 형태로
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

export default function RegisterFormClient() {
  const router = useRouter();
  const { draft, setForm } = useRegisterStore();

  const [email, setEmail] = useState(draft.form?.email ?? "");
  const [password, setPassword] = useState(draft.form?.password ?? "");
  const [phone, setPhone] = useState(draft.form?.phone ?? "");

  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean; phone?: boolean }>({});
  const [toast, setToast] = useState<string | null>(null);

  const emailError = useMemo(() => (touched.email ? validators.email(email) : null), [email, touched.email]);
  const pwError = useMemo(() => (touched.password ? validators.password(password) : null), [password, touched.password]);
  const phoneError = useMemo(() => (touched.phone ? validators.phone(phone) : null), [phone, touched.phone]);

  const canNext = useMemo(() => {
    return !validators.email(email) && !validators.password(password) && !validators.phone(phone);
  }, [email, password, phone]);

  const onNext = () => {
    // 터치 처리해서 에러 노출
    setTouched({ email: true, password: true, phone: true });

    if (!canNext) {
      setToast("입력값을 확인해주세요.");
      return;
    }

    // store에 저장 (다음 스텝으로 넘어가도 유지)
    setForm({
      email: email.trim(),
      password: password.trim(),
      phone: phone.replace(/\D/g, ""),
    });

    router.push("/register/profile"); // 다음 스텝(프로필)
  };

  return (
    <AuthShell title="회원가입">
      <RegisterProgress step={2} total={5} />

      <div className="space-y-3">
        <TextField
          label="이메일"
          placeholder="smart@blabla.com"
          value={email}
          onChange={setEmail}
          errorText={emailError ?? undefined}
        />
        <div className="text-[11px] text-neutral-500">
          로그인 아이디로 사용됩니다.
        </div>

        <PasswordField
          label="비밀번호"
          placeholder="8자 이상 입력해주세요"
          value={password}
          onChange={setPassword}
          errorText={pwError ?? undefined}
        />
        <div className="text-[11px] text-neutral-500">
          영문/숫자 조합을 권장해요.
        </div>

        <TextField
          label="휴대폰 번호"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(v) => setPhone(formatPhone(v))}
          errorText={phoneError ?? undefined}
        />

        {/* 인증 UI(와이어프레임에 맞춰 다음 단계에서 더 디테일하게 추가 가능)
            지금은 폼 스텝 진행을 우선 */}
        <Button disabled={!canNext} onClick={onNext}>
          다음
        </Button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AuthShell>
  );
}
