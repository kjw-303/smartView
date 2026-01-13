"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "./AuthShell";
import AgreementItem from "./AgreementItem";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import RegisterProgress from "./RegisterProgress";
import { useRegisterStore } from "@/store/register.store";

export default function RegisterTermsClient() {
  const router = useRouter();
  const { draft, toggleAgreement, setAllAgreements } = useRegisterStore();

  const agreements = draft.agreements;

  const allChecked = useMemo(() => {
    return Object.values(agreements).every(Boolean);
  }, [agreements]);

  const requiredChecked = useMemo(() => {
    return agreements.age && agreements.service && agreements.privacy;
  }, [agreements]);

  const onClickAll = () => setAllAgreements(!allChecked);

  const onNext = () => {
    if (!requiredChecked) return;
    router.push("/register/form");
  };

  return (
    <AuthShell title="회원가입">
      {/* (선택) 진행 표시 */}
      <RegisterProgress step={1} total={5} />

      <div className="space-y-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <button
            type="button"
            onClick={onClickAll}
            className="flex w-full items-center gap-3"
          >
            <Checkbox checked={allChecked} />
            <div className="text-left">
              <div className="text-sm font-semibold">전체 동의</div>
              <div className="text-xs text-neutral-500">
                서비스 이용을 위해 약관에 동의해주세요.
              </div>
            </div>
          </button>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-2">
          <AgreementItem
            label="(필수) 만 14세 이상입니다"
            checked={agreements.age}
            onToggle={() => toggleAgreement("age")}
            onView={() => alert("만 14세 이상 안내(임시)")}
          />
          <AgreementItem
            label="(필수) 서비스 이용약관 동의"
            checked={agreements.service}
            onToggle={() => toggleAgreement("service")}
            onView={() => alert("서비스 이용약관(임시)")}
          />
          <AgreementItem
            label="(필수) 개인정보 처리방침 동의"
            checked={agreements.privacy}
            onToggle={() => toggleAgreement("privacy")}
            onView={() => alert("개인정보 처리방침(임시)")}
          />
          <AgreementItem
            label="(선택) 마케팅 정보 수신 동의"
            checked={agreements.marketing}
            onToggle={() => toggleAgreement("marketing")}
            onView={() => alert("마케팅 정보 수신(임시)")}
          />
        </div>

        {!requiredChecked && (
          <p className="text-xs text-red-500">
            필수 약관에 동의해야 다음으로 진행할 수 있어요.
          </p>
        )}

        <Button disabled={!requiredChecked} onClick={onNext}>
          다음
        </Button>
      </div>
    </AuthShell>
  );
}
