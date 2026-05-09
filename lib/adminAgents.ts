import { db } from "./db";

export type AdminAgent = {
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
  created_at: Date;
  updated_at: Date;
};

export async function getAllAgents() {
  const [rows] = await db.query(`
    SELECT *
    FROM agents
    ORDER BY created_at DESC
  `);

  return rows as AdminAgent[];
}