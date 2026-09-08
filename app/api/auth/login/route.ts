import { NextResponse } from "next/server";
import { AUTH_COOKIE, createAdminToken, isAdminPasswordValid } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET) {
      return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
    }
    if (!isAdminPasswordValid(String(password || ""))) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(AUTH_COOKIE, createAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
