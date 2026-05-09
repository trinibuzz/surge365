import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/adminAuth";

export const runtime = "nodejs";

function getBaseUrl(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");

  const protocol =
    request.headers.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

export async function POST(request: Request) {
  const baseUrl = getBaseUrl(request);

  const response = NextResponse.redirect(`${baseUrl}/admin/login`);

  response.cookies.set(adminCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}}