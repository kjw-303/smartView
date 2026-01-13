export const validators = {
  email(email: string) {
    const v = email.trim();
    if (!v) return "이메일을 입력해주세요.";
    // 간단한 이메일 정규식
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!ok) return "이메일 형식이 올바르지 않습니다.";
    return null;
  },

  password(pw: string) {
    const v = pw.trim();
    if (!v) return "비밀번호를 입력해주세요.";
    if (v.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    return null;
  },

  phone(phone: string) {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "휴대폰 번호를 입력해주세요.";
    if (digits.length < 10 || digits.length > 11) return "휴대폰 번호를 확인해주세요.";
    return null;
  },
};
