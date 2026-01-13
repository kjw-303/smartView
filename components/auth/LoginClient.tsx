"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "./AuthShell";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import Button from "@/components/ui/Button";
import Toast from "./Toast";
import { authApi } from "@/features/auth/api";
import { useSessionStore } from "@/store/session.store";

export default function LoginClient() {
  const router = useRouter();
  const { login } = useSessionStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string; common?: string }>({});
  const [toast, setToast] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length >= 6 && !submitting;
  }, [email, password, submitting]);

  const onSubmit = async () => {
    setError({});
    setSubmitting(true);

    try {
      const res = await authApi.login({ email, password });

      // ✅ 여기서 role 세팅 끝 (중복 호출 X)
      login({
        role: res.role,
        userName: "나누리", // 데모
      });

      setToast("로그인 되었습니다.");
      router.replace("/");
    } catch (e: any) {
      const msg = e?.message ?? "로그인에 실패했어요.";
      setError({ common: msg, email: "이메일 또는 비밀번호를 확인해주세요." });
      setToast("아이디/비밀번호가 올바르지 않습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title="로그인">
      <div className="space-y-3">
        <TextField
          label="이메일"
          placeholder="smart@blabla.com"
          value={email}
          onChange={setEmail}
          errorText={error.email}
        />

        <PasswordField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={setPassword}
          errorText={error.password}
        />

        {error.common && <p className="text-xs text-red-500">{error.common}</p>}

        <Button disabled={!canSubmit} loading={submitting} onClick={onSubmit}>
          로그인
        </Button>

        <div className="mt-4 flex justify-center gap-3 text-xs text-neutral-600">
          <Link href="/register/terms" className="underline underline-offset-2">
            회원가입
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="#" className="underline underline-offset-2">
            비밀번호 찾기
          </Link>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AuthShell>
  );
}
