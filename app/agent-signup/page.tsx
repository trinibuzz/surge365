export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createAgent } from "@/lib/adminAgents";

type AgentSignupPageProps = {
  searchParams: Promise<{
    key?: string;
    created?: string;
  }>;
};

function Field({
  label,
  name,
  placeholder = "",
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-2xl border border-cyan-300/15 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
      />
    </div>
  );
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function makeInitials(value: string) {
  return value
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function AgentSignupPage({
  searchParams,
}: AgentSignupPageProps) {
  const params = await searchParams;
  const key = params.key || "";
  const createdSlug = params.created || "";

  const validKey = process.env.AGENT_FORM_KEY;
  const isAllowed = Boolean(validKey) && key === validKey;

  async function submitAgentForm(formData: FormData) {
    "use server";

    const submittedKey = String(formData.get("key") || "");
    const validServerKey = process.env.AGENT_FORM_KEY;

    if (!validServerKey || submittedKey !== validServerKey) {
      redirect("/agent-signup");
    }

    const displayName = String(formData.get("display_name") || "").trim();
    const rawSlug = String(formData.get("slug") || "").trim();

    const slug = makeSlug(rawSlug || displayName);

    // This still saves into the existing "initials" column,
    // but the form displays it as Travel Company Name.
    const travelCompanyName =
      String(formData.get("initials") || "").trim() || makeInitials(displayName);

    await createAgent({
      slug,
      display_name: displayName,
      initials: travelCompanyName,
      phone: String(formData.get("phone") || "").trim(),
      whatsapp: String(formData.get("whatsapp") || "").trim(),
      sba_site_url: String(formData.get("sba_site_url") || "").trim(),
      signup_site_url: String(formData.get("signup_site_url") || "").trim(),
      booking_engine_url: String(formData.get("booking_engine_url") || "").trim(),
      vortex_site_url: String(formData.get("vortex_site_url") || "").trim(),
      biz_opp_video_url: String(formData.get("biz_opp_video_url") || "").trim(),
      comp_plan_video_url: String(formData.get("comp_plan_video_url") || "").trim(),
      powerline_video_url: String(formData.get("powerline_video_url") || "").trim(),
      is_active: true,
    });

    redirect(`/agent-signup?key=${submittedKey}&created=${slug}`);
  }

  if (!isAllowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#010714] px-4 text-white">
        <section className="w-full max-w-md rounded-[2rem] border border-red-400/20 bg-[#061a2e] p-7 text-center shadow-[0_0_50px_rgba(28,213,255,0.12)]">
          <img
            src="/surge-logo.png"
            alt="Surge Three Sixty Five"
            className="mx-auto h-20 w-auto object-contain drop-shadow-[0_0_24px_rgba(28,213,255,0.45)]"
          />

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Private Form
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            This agent signup form requires a private access key.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#010714] px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        {/* Header card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.12)]">
          <div className="pointer-events-none absolute left-1/2 top-[-90px] h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/20 bg-black/25 shadow-[0_0_30px_rgba(28,213,255,0.18)]">
              <img
                src="/surge-logo.png"
                alt="Surge Three Sixty Five"
                className="h-16 w-auto object-contain drop-shadow-[0_0_22px_rgba(28,213,255,0.45)]"
              />
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
              Agent Information Form
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Fill out the information below to create your tap-card landing
              page. Once submitted, your page will be created and can be updated
              by the admin if needed.
            </p>
          </div>
        </div>

        {createdSlug && (
          <div className="mt-6 rounded-[2rem] border border-green-400/25 bg-green-500/10 p-6 shadow-[0_0_40px_rgba(34,197,94,0.12)]">
            <h2 className="text-2xl font-semibold text-green-300">
              Agent page created successfully.
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              The new page is ready here:
            </p>

            <a
              href={`/${createdSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-2xl bg-[#27d7ff] px-5 py-3 font-semibold text-[#022033] shadow-[0_0_20px_rgba(39,215,255,0.30)]"
            >
              View /{createdSlug}
            </a>
          </div>
        )}

        <form
          action={submitAgentForm}
          className="mt-6 rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.10)]"
        >
          <input type="hidden" name="key" value={key} />

          <div className="rounded-[1.5rem] border border-cyan-300/10 bg-black/15 p-5">
            <h2 className="text-xl font-semibold">Agent Details</h2>
            <p className="mt-1 text-sm text-slate-400">
              This information appears at the top of the agent page.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                name="display_name"
                placeholder="Example: Maria Joseph"
                required
              />

              <Field
                label="Page Name / Slug"
                name="slug"
                placeholder="Example: maria"
              />

              <Field
                label="Travel Company Name"
                name="initials"
                placeholder="Example: NPSTravel"
              />

              <Field
                label="Phone Number"
                name="phone"
                placeholder="Example: 868-000-0000"
              />

              <Field
                label="WhatsApp Number"
                name="whatsapp"
                placeholder="Example: 18680000000"
              />
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-cyan-300/10 bg-black/15 p-5">
            <h2 className="text-xl font-semibold">Travel Links</h2>

            <p className="mt-1 text-sm text-slate-400">
              Paste the official links you want displayed on the tap-card page.
            </p>

            <div className="mt-5 grid gap-5">
              <Field
                label="SBA Site URL"
                name="sba_site_url"
                placeholder="Paste SBA Site link"
                type="url"
              />

              <Field
                label="Signup Site URL"
                name="signup_site_url"
                placeholder="Paste Signup Site link"
                type="url"
              />

              <Field
                label="Booking Engine URL"
                name="booking_engine_url"
                placeholder="Paste Booking Engine link"
                type="url"
              />

              <Field
                label="Vortex Site URL"
                name="vortex_site_url"
                placeholder="Paste Vortex Site link"
                type="url"
              />

              <Field
                label="Biz Opp Video URL"
                name="biz_opp_video_url"
                placeholder="Paste Biz Opp Video link"
                type="url"
              />

              <Field
                label="Comp Plan Video URL"
                name="comp_plan_video_url"
                placeholder="Paste Comp Plan Video link"
                type="url"
              />

              <Field
                label="Powerline Video URL"
                name="powerline_video_url"
                placeholder="Paste Powerline Video link"
                type="url"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:items-center">
            <button
              type="submit"
              className="rounded-2xl bg-[#27d7ff] px-7 py-3 text-sm font-semibold text-[#022033] shadow-[0_0_20px_rgba(39,215,255,0.30)] transition hover:scale-[1.01]"
            >
              Submit
            </button>

            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              After submission, the agent page will be created automatically and
              will also appear inside the admin dashboard.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}