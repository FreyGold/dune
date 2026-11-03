import { type NextRequest, NextResponse } from "next/server";
function signOutAndRedirect(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/login", request.url), 303);
  response.cookies.delete("cortex_demo");
  return response;
}
export async function GET(request: NextRequest) { return signOutAndRedirect(request); }
export async function POST(request: NextRequest) { return signOutAndRedirect(request); }
