export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { redirect, notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getAgentById, updateAgentById } from "@/lib/adminAgents";

type EditAgentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function Field({
  label,
  name,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue || ""}
        required={required}
        className="mt-2 w-full rounded-2xl border border-cyan-300/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-cyan-300/50"
      />
    </div>
  );
}

export default async function EditAgentPage({ params }: EditAgentPageProps) {
  await requireAdmin();

  const { id } = await params;
  const agentId = Number(id);

  if (!agentId) {
    notFound();
  }

  const agent = await getAgentById(agentId);

  if (!agent) {
    notFound();
  }

  async function saveAgent(formData: FormData) {
    "use server";

    await requireAdmin();

    const activeValue = String(formData.get("is_active") || "");

    await updateAgentById(agentId, {
      slug: String(formData.get("slug") || "").trim(),
      display_name: String(formData.get("display_name") || "").trim(),
      initials: String(formData.get("initials") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      whatsapp: String(formData.get("whatsapp") || "").trim(),
      sba_site_url: String(formData.get("sba_site_url") || "").trim(),
      signup_site_url: String(formData.get("signup_site_url") || "").trim(),
      booking_engine_url: String(formData.get("booking_engine_url") || "").trim(),
      vortex_site_url: String(formData.get("vortex_site_url") || "").trim(),
      biz_opp_video_url: String(formData.get("biz_opp_video_url") || "").trim(),
      comp_plan_video_url: String(formData.get("comp_plan_video_url") || "").trim(),
      powerline_video_url: String(formData.get("powerline_video_url") || "").trim(),
      is_active: activeValue === "on",
    });

    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#010714] px-4 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.12)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <img
                src="/surge-logo.png"
                alt="Surge Three Sixty Five"
                className="h-16 w-auto object-contain drop-shadow-[0_0_22px_rgba(28,213,255,0.42)]"
              />

              <h1 className="mt-5 text-3xl font-semibold">Edit Agent</h1>

              <p className="mt-2 text-sm text-slate-300">
                Update this agent’s tap-card landing page.
              </p>
            </div>

            <a
              href="/admin"
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Back to Dashboard
            </a>
          </div>
        </div>

        <form
          action={saveAgent}
          className="mt-6 rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.10)]"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Slug"
              name="slug"
              defaultValue={agent.slug}
              required
            />

            <Field
              label="Display Name"
              name="display_name"
              defaultValue={agent.display_name}
              required
            />

            <Field
              label="Initials"
              name="initials"
              defaultValue={agent.initials}
            />

            <Field label="Phone" name="phone" defaultValue={agent.phone} />

            <Field
              label="WhatsApp"
              name="whatsapp"
              defaultValue={agent.whatsapp}
            />

            <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-black/20 px-4 py-3">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                defaultChecked={Boolean(agent.is_active)}
                className="h-5 w-5"
              />
              <label htmlFor="is_active" className="text-sm text-slate-200">
                Agent page active
              </label>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold">Agent Links</h2>
            <p className="mt-1 text-sm text-slate-400">
              These links control the buttons on the public agent page.
            </p>

            <div className="mt-5 grid gap-5">
              <Field
                label="SBA Site URL"
                name="sba_site_url"
                defaultValue={agent.sba_site_url}
              />

              <Field
                label="Signup Site URL"
                name="signup_site_url"
                defaultValue={agent.signup_site_url}
              />

              <Field
                label="Booking Engine URL"
                name="booking_engine_url"
                defaultValue={agent.booking_engine_url}
              />

              <Field
                label="Vortex Site URL"
                name="vortex_site_url"
                defaultValue={agent.vortex_site_url}
              />

              <Field
                label="Biz Opp Video URL"
                name="biz_opp_video_url"
                defaultValue={agent.biz_opp_video_url}
              />

              <Field
                label="Comp Plan Video URL"
                name="comp_plan_video_url"
                defaultValue={agent.comp_plan_video_url}
              />

              <Field
                label="Powerline Video URL"
                name="powerline_video_url"
                defaultValue={agent.powerline_video_url}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <button
              type="submit"
              className="rounded-2xl bg-[#27d7ff] px-6 py-3 font-semibold text-[#022033] shadow-[0_0_20px_rgba(39,215,255,0.30)]"
            >
              Save Changes
            </button>

            <a
              href={`/${agent.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-cyan-300/20 px-6 py-3 text-center font-semibold text-cyan-200 hover:bg-cyan-300/10"
            >
              View Public Page
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}