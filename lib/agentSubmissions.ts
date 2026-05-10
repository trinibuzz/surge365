import { db } from "./db";
import { createAgent } from "./adminAgents";

export type AgentSubmission = {
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
  status: string;
  payment_note: string | null;
  created_agent_id: number | null;
  created_at: Date;
  updated_at: Date;
  approved_at: Date | null;
};

export async function createAgentSubmission(data: {
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
}) {
  await db.query(
    `
    INSERT INTO agent_submissions (
      slug,
      display_name,
      initials,
      phone,
      whatsapp,
      sba_site_url,
      signup_site_url,
      booking_engine_url,
      vortex_site_url,
      biz_opp_video_url,
      comp_plan_video_url,
      powerline_video_url,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING_PAYMENT')
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
    ]
  );
}

export async function getAllAgentSubmissions() {
  const [rows] = await db.query(`
    SELECT *
    FROM agent_submissions
    ORDER BY created_at DESC
  `);

  return rows as AgentSubmission[];
}

export async function approveAgentSubmission(id: number) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM agent_submissions
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  const submissions = rows as AgentSubmission[];
  const submission = submissions[0];

  if (!submission) {
    throw new Error("Submission not found.");
  }

  if (submission.status === "APPROVED" && submission.created_agent_id) {
    return;
  }

  await createAgent({
    slug: submission.slug,
    display_name: submission.display_name,
    initials: submission.initials || "",
    phone: submission.phone || "",
    whatsapp: submission.whatsapp || "",
    sba_site_url: submission.sba_site_url || "",
    signup_site_url: submission.signup_site_url || "",
    booking_engine_url: submission.booking_engine_url || "",
    vortex_site_url: submission.vortex_site_url || "",
    biz_opp_video_url: submission.biz_opp_video_url || "",
    comp_plan_video_url: submission.comp_plan_video_url || "",
    powerline_video_url: submission.powerline_video_url || "",
    is_active: true,
  });

  const [agentRows] = await db.query(
    `
    SELECT id
    FROM agents
    WHERE slug = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [submission.slug]
  );

  const createdAgents = agentRows as { id: number }[];
  const createdAgentId = createdAgents[0]?.id || null;

  await db.query(
    `
    UPDATE agent_submissions
    SET
      status = 'APPROVED',
      created_agent_id = ?,
      approved_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
    [createdAgentId, id]
  );
}

export async function rejectAgentSubmission(id: number) {
  await db.query(
    `
    UPDATE agent_submissions
    SET status = 'REJECTED'
    WHERE id = ?
    `,
    [id]
  );
}