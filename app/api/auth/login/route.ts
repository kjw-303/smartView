import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 데모 룰:
  // - password === "123456" 이면 성공
  // - email에 student가 포함되면 student, 아니면 member
  if (password !== "123456") {
    return NextResponse.json({ message: "invalid_credentials" }, { status: 401 });
  }

  const role = String(email).includes("student") ? "student" : "member";
  return NextResponse.json({ ok: true, role });
}
