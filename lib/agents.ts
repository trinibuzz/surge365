import { db } from "./db";

export type Agent = {
  id: number;
  slug: string;
  display_name: string;
  initials: string | null;
  phone: string | null;
  whatsapp: string | null;
  sba_site_url: string | null;
  signup_site_url: string | null;
  booking_engine_url: string | null;
  vortex_site_url: string | null;
  biz_opp_video_url: string | null;
  comp_plan_video_url: string | null;
  powerline_video_url: string | null;
  is_active: number | boolean;
};

export async function getAgentBySlug(slug: string) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM agents
    WHERE slug = ?
    AND is_active = TRUE
    LIMIT 1
    `,
    [slug]
  );

  const agents = rows as Agent[];

  return agents[0] || null;
}