import type { User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest): Promise<{ response: NextResponse; user: User | null }> {
  const demo = request.cookies.get("cortex_demo")?.value === "1";
  return { response: NextResponse.next({ request }), user: demo ? ({ id: "demo", email: "demo@cortex.example" } as User) : null };
}
