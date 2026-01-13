import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const email = body?.form?.email as string | undefined;
  const password = body?.form?.password as string | undefined;
  const phone = body?.form?.phone as string | undefined;

  const agreements = body?.agreements ?? {};
  const interests = body?.interests ?? [];
  const profile = body?.profile ?? {};

  // ✅ 최소 검증(포트폴리오용)
  const requiredOk = agreements?.age && agreements?.service && agreements?.privacy;
  if (!requiredOk) {
    return NextResponse.json({ message: "required_agreements_missing" }, { status: 400 });
  }
  if (!email || !password || !phone) {
    return NextResponse.json({ message: "form_missing" }, { status: 400 });
  }
  if (!profile?.name || !profile?.birth) {
    return NextResponse.json({ message: "profile_missing" }, { status: 400 });
  }
  if (!Array.isArray(interests) || interests.length < 1) {
    return NextResponse.json({ message: "interests_missing" }, { status: 400 });
  }

  // ✅ 데모용: 특정 이메일은 실패 시뮬레이션
  if (String(email).includes("fail")) {
    return NextResponse.json({ message: "duplicate_email" }, { status: 409 });
  }

  // (실제라면 DB 저장 + 토큰 발급 등)
  return NextResponse.json({
    ok: true,
    userId: "demo-user-001",
  });
}
