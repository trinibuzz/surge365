export const runtime = "nodejs";


import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/agents";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type LinkItem = {
  title: string;
  action: "Visit" | "Watch";
  url: string | null;
  icon: string;
  type: "visit" | "watch";
};

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const links = [
    {
      title: "SBA Site",
      action: "Visit",
      url: agent.sba_site_url,
      icon: "🌐",
      type: "visit",
    },
    {
      title: "Signup Site",
      action: "Visit",
      url: agent.signup_site_url,
      icon: "👤",
      type: "visit",
    },
    {
      title: "Booking Engine",
      action: "Visit",
      url: agent.booking_engine_url,
      icon: "✈",
      type: "visit",
    },
    {
      title: "Vortex Site",
      action: "Visit",
      url: agent.vortex_site_url,
      icon: "🌀",
      type: "visit",
    },
    {
      title: "Biz Opp Video",
      action: "Watch",
      url: agent.biz_opp_video_url,
      icon: "▶",
      type: "watch",
    },
    {
      title: "Comp Plan Video",
      action: "Watch",
      url: agent.comp_plan_video_url,
      icon: "▥",
      type: "watch",
    },
    {
      title: "Powerline Video",
      action: "Watch",
      url: agent.powerline_video_url,
      icon: "⚡",
      type: "watch",
    },
  ].filter((link): link is LinkItem => Boolean(link.url));

  const phone = agent.phone || "";
  const whatsapp = agent.whatsapp || "";
  const initials =
    agent.initials ||
    agent.display_name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <main className="min-h-screen overflow-hidden bg-[#010714] px-4 py-6 text-white">
      {/* Page glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(28,213,255,0.20),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(247,190,60,0.12),_transparent_35%),linear-gradient(180deg,_#010714_0%,_#03142a_48%,_#010714_100%)]" />
        <div className="absolute left-1/2 top-[-180px] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-130px] h-[360px] w-[360px] rounded-full bg-yellow-300/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-[440px]">
        {/* Outer phone-style frame */}
        <div className="rounded-[2.75rem] border border-white/10 bg-black/40 p-2 shadow-[0_35px_90px_rgba(0,0,0,0.65)]">
          <div className="relative overflow-hidden rounded-[2.35rem] border border-cyan-300/12 bg-[#041223] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_70px_rgba(28,213,255,0.14)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(6,28,50,0.96)_0%,_rgba(4,18,35,0.98)_44%,_rgba(2,10,22,1)_100%)]" />

            {/* Top decorative globe and travel details */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[395px] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-cyan-300/14 to-transparent" />

              <img
                src="/globe-arc.png"
                alt=""
                className="absolute left-1/2 top-[100px] w-[675px] max-w-none -translate-x-1/2 opacity-95 drop-shadow-[0_0_42px_rgba(28,213,255,0.32)]"
              />

              <div className="absolute left-5 top-[112px] text-sm text-yellow-200/85 drop-shadow-[0_0_10px_rgba(250,204,21,0.55)]">
                ✦
              </div>

              <div className="absolute right-14 top-[176px] text-sm text-yellow-200/70 drop-shadow-[0_0_10px_rgba(250,204,21,0.45)]">
                ✦
              </div>

              <div className="absolute right-7 top-14 text-[28px] text-yellow-300 drop-shadow-[0_0_13px_rgba(250,204,21,0.65)]">
                ✈
              </div>

              <div className="absolute right-[55px] top-[66px] h-40 w-28 rotate-[28deg] rounded-full border-r border-dashed border-yellow-300/70" />

              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#041223]" />
            </div>

            <div className="relative px-6 pb-6 pt-7">
              {/* Logo */}
              <img
                src="/surge-logo.png"
                alt="Surge Three Sixty Five"
                className="mx-auto h-[80px] w-auto object-contain drop-shadow-[0_0_26px_rgba(28,213,255,0.52)]"
              />

              {/* Agent header */}
              <div className="mt-5 text-center">
                <div className="mx-auto flex h-[104px] w-[104px] items-center justify-center rounded-full border border-cyan-300/65 bg-[radial-gradient(circle,_rgba(247,190,60,0.20)_0%,_rgba(28,213,255,0.15)_42%,_rgba(2,8,23,0.98)_76%)] text-[2.35rem] font-medium tracking-tight text-yellow-200 shadow-[0_0_34px_rgba(28,213,255,0.55)] ring-4 ring-cyan-300/10">
                  {initials}
                </div>

                <h1 className="mt-5 text-[2rem] font-medium leading-none tracking-tight text-white drop-shadow-[0_0_18px_rgba(28,213,255,0.20)]">
                  {agent.display_name}
                </h1>

                <div className="mx-auto mt-3 flex max-w-[315px] items-center justify-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-300/75" />
                  <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
                    surge365 Travel Agent
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-300/75" />
                </div>

                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-cyan-300/38 bg-[#09263f]/92 px-5 py-2 text-sm font-medium text-cyan-50 shadow-[0_0_20px_rgba(28,213,255,0.20)]"
                  >
                    📞 Tel: {phone}
                  </a>
                )}
              </div>

              {/* Intro card */}
              <div className="mt-5 rounded-[1.5rem] border border-cyan-300/26 bg-[linear-gradient(135deg,rgba(7,35,58,0.96),rgba(4,20,38,0.95))] p-4 shadow-[0_0_28px_rgba(28,213,255,0.12)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-[#06233a] text-3xl shadow-[inset_0_0_16px_rgba(28,213,255,0.10)]">
                    🧳
                  </div>

                  <div>
                    <h2 className="text-[1.35rem] font-medium leading-tight text-white">
                      Your travel. Your freedom.
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Access my official surge365 sites and videos below.
                    </p>
                  </div>
                </div>
              </div>

              {/* Link cards */}
              <div className="mt-5 space-y-3">
                {links.map((link, index) => (
                  <a
                    key={link.title}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-[1.35rem] border border-cyan-300/14 bg-[#061a2e]/95 px-3.5 py-3.5 shadow-[0_14px_28px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:border-cyan-300/34 hover:bg-[#08213a]"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[1.22rem] shadow-[inset_0_0_12px_rgba(255,255,255,0.04)] ${
                        link.type === "watch"
                          ? "border-purple-300/30 bg-purple-400/12 text-purple-100"
                          : "border-cyan-300/28 bg-cyan-300/10 text-cyan-100"
                      }`}
                    >
                      {link.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-200/65">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-0.5 text-[1.03rem] font-medium leading-tight text-white">
                        {link.title}
                      </h3>
                    </div>

                    <div
                      className={`shrink-0 rounded-xl px-3.5 py-2 text-[13px] font-semibold ${
                        link.type === "watch"
                          ? "bg-[#6b46ff] text-white shadow-[0_0_18px_rgba(107,70,255,0.42)]"
                          : "bg-[#27d7ff] text-[#022033] shadow-[0_0_18px_rgba(39,215,255,0.40)]"
                      }`}
                    >
                      {link.action}
                    </div>
                  </a>
                ))}
              </div>

              {/* Contact buttons */}
              {(phone || whatsapp) && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="rounded-[1.35rem] bg-[linear-gradient(180deg,#10a9dc,#087fa8)] px-4 py-4 text-center text-white shadow-[0_0_22px_rgba(15,169,219,0.30)] transition hover:scale-[1.01]"
                    >
                      <span className="block text-lg font-medium">Call</span>
                      <span className="mt-1 block text-xs font-medium text-cyan-100/90">
                        {phone}
                      </span>
                    </a>
                  )}

                  {whatsapp && (
                    <a
                      href={`https://wa.me/${whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[1.35rem] bg-[linear-gradient(180deg,#37c95d,#239946)] px-4 py-4 text-center text-white shadow-[0_0_22px_rgba(55,201,93,0.32)] transition hover:scale-[1.01]"
                    >
                      <span className="block text-lg font-medium">
                        WhatsApp
                      </span>
                      <span className="mt-1 block text-xs font-medium text-green-50/90">
                        Chat with me
                      </span>
                    </a>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="relative mt-6">
                <div className="pointer-events-none absolute inset-x-0 -bottom-7 h-20 bg-gradient-to-t from-cyan-950/30 to-transparent" />

                <div className="relative flex items-center justify-center gap-2 text-xs text-slate-500">
                  <span>Powered by</span>
                  <span className="font-medium text-cyan-300">surge365</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}