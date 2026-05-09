import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "surge365_admin_session";

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  return (
    Boolean(process.env.ADMIN_SESSION_SECRET) &&
    session === process.env.ADMIN_SESSION_SECRET
  );
}

export async function requireAdmin() {
  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin/login");
  }
}

export const adminCookieName = COOKIE_NAME;