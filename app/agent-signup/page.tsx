export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createAgentSubmission } from "@/lib/agentSubmissions";

type AgentSignupPageProps = {
  searchParams: Promise<{
    key?: string;
    submitted?: string;
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
      <label className="text-sm font-medium text-slate-100">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-cyan-300/20 bg-[#031323]/80 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/70 focus:shadow-[0_0_18px_rgba(39,215,255,0.18)]"
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
  const submitted = params.submitted === "1";

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

    const travelCompanyName =
      String(formData.get("initials") || "").trim() ||
      makeInitials(displayName);

    await createAgentSubmission({
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
    });

    redirect(`/agent-signup?key=${submittedKey}&submitted=1`);
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
    <main className="min-h-screen bg-[#010714] px-4 py-6 text-white">
      <section className="mx-auto max-w-6xl">
        {/* HERO BANNER */}
        <div className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#061a2e] p-2 shadow-[0_0_60px_rgba(28,213,255,0.18)]">
          <div className="relative h-[260px] overflow-hidden rounded-[1.6rem] md:h-[390px]">
            <img
              src="/agent-form-hero.png"
              alt="Surge365 travel agent form"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#010714]/30" />
          </div>
        </div>

        {/* FORM CARD */}
        <div className="relative mt-8 overflow-hidden rounded-[2.2rem] border border-yellow-300/25 bg-[#05182d]/95 p-5 shadow-[0_0_70px_rgba(28,213,255,0.14)] md:p-8">
          <div className="pointer-events-none absolute left-1/2 top-[-120px] h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/16 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative text-center">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Agent Information Form
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              Complete the form below to submit your travel agent details for
              review.
            </p>

            <div className="mx-auto mt-6 flex max-w-xl items-center gap-4 rounded-2xl border border-yellow-300/25 bg-black/20 p-4 text-left shadow-[0_0_30px_rgba(212,175,55,0.10)]">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-yellow-300/40 bg-yellow-300/10 text-2xl">
                🛡️
              </div>

              <p className="text-sm font-medium leading-6 text-yellow-100 md:text-base">
                Your page will be reviewed and activated after payment
                confirmation.
              </p>
            </div>
          </div>

          {submitted && (
            <div className="relative mt-6 rounded-[2rem] border border-green-400/25 bg-green-500/10 p-6 shadow-[0_0_40px_rgba(34,197,94,0.12)]">
              <h2 className="text-2xl font-semibold text-green-300">
                Submission received.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Thank you. Your information has been submitted successfully.
                Your tap-card page will be activated after payment is confirmed.
              </p>
            </div>
          )}

          <form action={submitAgentForm} className="relative mt-8">
            <input type="hidden" name="key" value={key} />

            <div className="grid gap-x-7 gap-y-5 md:grid-cols-2">
              <Field
                label="Full Name"
                name="display_name"
                placeholder="Enter your full name"
                required
              />

              <Field
                label="Travel Company Name"
                name="initials"
                placeholder="Enter your travel company name"
              />

              <Field
                label="Page Name / Slug"
                name="slug"
                placeholder="Enter page name or slug no spaces"
              />

              <Field
                label="Phone"
                name="phone"
                placeholder="Enter your phone number"
              />

              <Field
                label="WhatsApp"
                name="whatsapp"
                placeholder="Enter your WhatsApp number"
              />

              <Field
                label="SBA Site URL"
                name="sba_site_url"
                placeholder="https://your-sba-site.com"
                type="url"
              />

              <Field
                label="Signup Site URL"
                name="signup_site_url"
                placeholder="https://your-signup-site.com"
                type="url"
              />

              <Field
                label="Booking Engine URL"
                name="booking_engine_url"
                placeholder="https://your-booking-engine.com"
                type="url"
              />

              <Field
                label="Vortex Site URL"
                name="vortex_site_url"
                placeholder="https://your-vortex-site.com"
                type="url"
              />

              <Field
                label="Biz Opp Video URL"
                name="biz_opp_video_url"
                placeholder="https://youtube.com/watch?v=yourvideo"
                type="url"
              />

              <Field
                label="Comp Plan Video URL"
                name="comp_plan_video_url"
                placeholder="https://youtube.com/watch?v=yourvideo"
                type="url"
              />

              <Field
                label="Powerline Video URL"
                name="powerline_video_url"
                placeholder="https://youtube.com/watch?v=yourvideo"
                type="url"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="min-w-[220px] rounded-full bg-gradient-to-r from-cyan-300 to-[#11bde8] px-8 py-3 text-base font-semibold text-[#022033] shadow-[0_0_28px_rgba(39,215,255,0.35)] transition hover:scale-[1.02]"
              >
                Submit
              </button>
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-slate-400">
              After submission, your information will be sent for review. The
              tap-card page will only be activated after payment is confirmed.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}