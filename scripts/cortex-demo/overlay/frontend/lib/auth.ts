import { cookies } from "next/headers";
import type { CurrentProfile } from "@/lib/api/profile";
export async function getServerSession() {
  const loggedIn = (await cookies()).get("cortex_demo")?.value === "1";
  if (!loggedIn) return null;
  const profile: CurrentProfile = { id: "demo", name: "Demo Student", avatar_url: null, role: "user", is_verified: false, verified_at: null, verification_requested_at: null, preferred_language: "en", university_id: null, college_id: null, major_id: null, year_level_id: null };
  return { user: { id: "demo", email: "demo@cortex.example" }, profile, accessToken: "shared-demo" };
}
