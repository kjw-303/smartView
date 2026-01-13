export const authApi = {
  async login(body: { email: string; password: string }) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message ?? "login_failed");
    }

    return (await res.json()) as { ok: true; role: "member" | "student" };
  },
  async register(draft: any) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(draft),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message ?? "register_failed");
    }

    return (await res.json()) as { ok: true; userId: string };
  },
};
