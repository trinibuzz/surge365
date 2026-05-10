export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { createAgent } from "@/lib/adminAgents";

function Field({
  label,
  name,
  defaultValue = "",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-2 w-full rounded-2xl border border-cyan-300/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-cyan-300/50"
      />
    </div>
  );
}

export default async function NewAgentPage() {
  await requireAdmin();

  async function saveNewAgent(formData: FormData) {
    "use server";

    await requireAdmin();

    const activeValue = String(formData.get("is_active") || "");

    await createAgent({
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

              <h1 className="mt-5 text-3xl font-semibold">Add Agent</h1>

              <p className="mt-2 text-sm text-slate-300">
                Create a new surge365 tap-card landing page.
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
          action={saveNewAgent}
          className="mt-6 rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.10)]"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Slug"
              name="slug"
              defaultValue="new-agent"
              required
            />

            <Field
              label="Display Name"
              name="display_name"
              defaultValue=""
              required
            />

            <Field label="Initials" name="initials" defaultValue="" />

            <Field label="Phone" name="phone" defaultValue="" />

            <Field label="WhatsApp" name="whatsapp" defaultValue="" />

            <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-black/20 px-4 py-3">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                defaultChecked
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
              Add the official surge365 links for this agent.
            </p>

            <div className="mt-5 grid gap-5">
              <Field
                label="SBA Site URL"
                name="sba_site_url"
                defaultValue=""
              />

              <Field
                label="Signup Site URL"
                name="signup_site_url"
                defaultValue=""
              />

              <Field
                label="Booking Engine URL"
                name="booking_engine_url"
                defaultValue=""
              />

              <Field
                label="Vortex Site URL"
                name="vortex_site_url"
                defaultValue=""
              />

              <Field
                label="Biz Opp Video URL"
                name="biz_opp_video_url"
                defaultValue=""
              />

              <Field
                label="Comp Plan Video URL"
                name="comp_plan_video_url"
                defaultValue=""
              />

              <Field
                label="Powerline Video URL"
                name="powerline_video_url"
                defaultValue=""
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <button
              type="submit"
              className="rounded-2xl bg-[#27d7ff] px-6 py-3 font-semibold text-[#022033] shadow-[0_0_20px_rgba(39,215,255,0.30)]"
            >
              Create Agent
            </button>

            <a
              href="/admin"
              className="rounded-2xl border border-cyan-300/20 px-6 py-3 text-center font-semibold text-cyan-200 hover:bg-cyan-300/10"
            >
              Cancel
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}