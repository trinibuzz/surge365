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

export async function getAgentById(id: number) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM agents
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  const agents = rows as AdminAgent[];

  return agents[0] || null;
}

export async function updateAgentById(
  id: number,
  data: {
    slug: string;
    display_name: string;
    initials: string;
    phone: string;
    whatsapp: string;
    sba_site_url: string;
    signup_site_url: string;
    booking_engine_url: string;
    vortex_site_url: string;
    biz_opp_video_url: string;
    comp_plan_video_url: string;
    powerline_video_url: string;
    is_active: boolean;
  }
) {
  await db.query(
    `
    UPDATE agents
    SET
      slug = ?,
      display_name = ?,
      initials = ?,
      phone = ?,
      whatsapp = ?,
      sba_site_url = ?,
      signup_site_url = ?,
      booking_engine_url = ?,
      vortex_site_url = ?,
      biz_opp_video_url = ?,
      comp_plan_video_url = ?,
      powerline_video_url = ?,
      is_active = ?
    WHERE id = ?
    `,
    [
      data.slug,
      data.display_name,
      data.initials,
      data.phone,
      data.whatsapp,
      data.sba_site_url,
      data.signup_site_url,
      data.booking_engine_url,
      data.vortex_site_url,
      data.biz_opp_video_url,
      data.comp_plan_video_url,
      data.powerline_video_url,
      data.is_active,
      id,
    ]
  );
}