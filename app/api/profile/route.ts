import { NextResponse } from "next/server";
import { ensureProfileTable, getPool } from "@/lib/db";

export const runtime = "nodejs";

function isAuthorized(request: Request) {
  const expected = process.env.ADMIN_API_KEY;
  return Boolean(expected && request.headers.get("x-admin-api-key") === expected);
}

export async function GET() {
  try {
    await ensureProfileTable();
    const result = await getPool().query("SELECT profile, updated_at FROM profile_data WHERE id = 1");
    return NextResponse.json({ profile: result.rows[0]?.profile ?? null, updatedAt: result.rows[0]?.updated_at ?? null });
  } catch (error) {
    console.error("Profile GET failed", error);
    return NextResponse.json({ error: "Database is not configured or unavailable." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body?.profile || typeof body.profile !== "object") {
      return NextResponse.json({ error: "A profile object is required." }, { status: 400 });
    }

    await ensureProfileTable();
    const result = await getPool().query(
      `INSERT INTO profile_data (id, profile, updated_at)
       VALUES (1, $1::jsonb, NOW())
       ON CONFLICT (id) DO UPDATE SET profile = EXCLUDED.profile, updated_at = NOW()
       RETURNING updated_at`,
      [JSON.stringify(body.profile)]
    );

    return NextResponse.json({ ok: true, updatedAt: result.rows[0].updated_at });
  } catch (error) {
    console.error("Profile PUT failed", error);
    return NextResponse.json({ error: "Unable to save profile." }, { status: 500 });
  }
}
