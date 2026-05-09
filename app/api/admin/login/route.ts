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
  const formData = await request.formData();

  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  const baseUrl = getBaseUrl(request);

  if (
    !validUsername ||
    !validPassword ||
    !sessionSecret ||
    username !== validUsername ||
    password !== validPassword
  ) {
    return NextResponse.redirect(`${baseUrl}/admin/login?error=1`);
  }

  const response = NextResponse.redirect(`${baseUrl}/admin`);

  response.cookies.set(adminCookieName, sessionSecret, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}