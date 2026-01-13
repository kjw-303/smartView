export type AgreementKey = "age" | "service" | "privacy" | "marketing";
export type RegisterAgreements = Record<AgreementKey, boolean>;

export type RegisterProfile = {
  name?: string;
  birth?: string; // YYYY-MM-DD
  gender?: "male" | "female" | "none";
  avatarUrl?: string | null; // 포트폴리오용(로컬 미리보기 URL)
};

export type RegisterDraft = {
  agreements: RegisterAgreements;
  form?: {
    email?: string;
    password?: string;
    phone?: string;
  };
  profile?: RegisterProfile;
  interests?: string[];
};
