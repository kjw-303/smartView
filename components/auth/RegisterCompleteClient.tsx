"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "./AuthShell";
import RegisterProgress from "./RegisterProgress";
import Button from "@/components/ui/Button";
import Toast from "./Toast";
import { useRegisterStore } from "@/store/register.store";
import { authApi } from "@/features/auth/api";
import { useSessionStore } from "@/store/session.store";

function mapErrorMessage(code: string) {
  switch (code) {
    case "required_agreements_missing":
      return "필수 약관 동의가 필요해요.";
    case "form_missing":
      return "이메일/비밀번호/휴대폰 정보를 확인해주세요.";
    case "profile_missing":
      return "프로필 정보를 확인해주세요.";
    case "interests_missing":
      return "관심분야를 1개 이상 선택해주세요.";
    case "duplicate_email":
      return "이미 사용 중인 이메일입니다.";
    default:
      return "회원가입 처리 중 오류가 발생했어요.";
  }
}

export default function RegisterCompleteClient() {
  const router = useRouter();
  const { draft, resetRegister } = useRegisterStore();
  const login = useSessionStore((s) => s.login);

  const [status, setStatus] = useState<"submitting" | "error">("submitting");
  const [toast, setToast] = useState<string | null>(null);

  const submit = async () => {
    setStatus("submitting");
    try {
      await authApi.register(draft);

      // ✅ 자동 로그인
      login({
        role: "member", // 회원가입자는 데모로 member 처리
        userName: draft.profile?.name,
      });

      // ✅ draft 초기화 후 앱 홈으로 이동
      resetRegister();
      router.replace("/");

      // ✅ 여기서 끝 (더 이상 setState 하지 않음)
      return;
    } catch (e: any) {
      setStatus("error");
      setToast(mapErrorMessage(e?.message ?? ""));
    }
  };

  useEffect(() => {
    submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBackToFix = () => {
    router.replace("/register/interests");
  };

  return (
    <AuthShell title="회원가입">
      <RegisterProgress step={5} total={5} />

      <div className="mt-10 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100">
          <div className="text-sm text-neutral-600">
            {status === "submitting" ? "처리중…" : "오류"}
          </div>
        </div>

        <h2 className="mt-5 text-lg font-semibold">
          {status === "submitting" ? "회원가입 처리 중" : "회원가입에 실패했어요"}
        </h2>

        <p className="mt-2 text-sm text-neutral-600">
          {status === "submitting"
            ? "잠시만 기다려주세요."
            : "입력 정보를 다시 확인한 뒤 재시도해주세요."}
        </p>

        <div className="mt-8 w-full space-y-2">
          {status === "submitting" && <Button disabled>처리중...</Button>}

          {status === "error" && (
            <>
              <Button onClick={submit}>다시 시도</Button>
              <button
                type="button"
                onClick={goBackToFix}
                className="w-full rounded-lg border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-800"
              >
                이전 단계로 돌아가기
              </button>
            </>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AuthShell>
  );
}
