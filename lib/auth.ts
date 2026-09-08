import { createHmac, timingSafeEqual } from "crypto";

export const AUTH_COOKIE = "karan_admin_session";

function secret() {
  return process.env.AUTH_SECRET || "";
}

export function createAdminToken() {
  const value = "admin";
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function isAdminTokenValid(token: string | undefined) {
  if (!token || !secret()) return false;
  const expected = createAdminToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isAdminPasswordValid(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  return Boolean(expected && password && password === expected);
}
