import { profile as initialProfile } from "@/data/profile";
import { ensureProfileTable, getPool } from "@/lib/db";

export type Profile = typeof initialProfile;

/**
 * Reads the latest saved profile from Postgres and falls back to the
 * resume source data when the database is unavailable or has not been seeded.
 * This keeps the public resume and interview-prep pages in sync with edits.
 */
export async function getCurrentProfile(): Promise<Profile> {
  try {
    await ensureProfileTable();
    const result = await getPool().query("SELECT profile FROM profile_data WHERE id = 1");
    const saved = result.rows[0]?.profile;
    if (saved && typeof saved === "object") return saved as Profile;
  } catch (error) {
    console.error("Could not load saved profile; using resume defaults.", error);
  }

  return initialProfile;
}
