import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/agents";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AgentPage({ params }: PageProps) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#020816] px-4 py-6 text-white">
      <div className="mx-auto max-w-[430px]">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#041223] shadow-[0_0_50px_rgba(0,0,0,0.45)]">
          {/* top background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(180deg,_#041223_0%,_#07182c_38%,_#05101f_100%)]" />

          {/* logo + stars + plane */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] overflow-hidden">
            <div className="absolute left-6 top-24 text-sm text-yellow-200/80">
              ✦
            </div>
            <div className="absolute right-12 top-44 text-sm text-yellow-200/70">
              ✦
            </div>
            <div className="absolute right-8 top-14 text-[28px] text-yellow-300 drop-shadow-[0_0_12px_rgba(250,204,21,0.55)]">
              ✈
            </div>
            <div className="absolute right-[56px] top-[66px] h-40 w-28 rotate-[28deg] rounded-full border-r border-dashed border-yellow-300/70" />

            <img
              src="/globe-arc.png"
              alt=""
              className="absolute left-1/2 top-[120px] w-[610px] max-w-none -translate-x-1/2 opacity-90"
            />
          </div>

          <div className="relative px-6 pb-6 pt-7">
            {/* logo */}
            <img
              src="/surge-logo.png"
              alt="Surge Three Sixty Five"
              className="mx-auto h-[72px] w-auto object-contain drop-shadow-[0_0_22px_rgba(34,211,238,0.45)]"
            />

            {/* agent header */}
            <div className="mt-6 text-center">
              <div className="mx-auto flex h-[98px] w-[98px] items-center justify-center rounded-full border border-cyan-300/60 bg-[radial-gradient(circle,_rgba(15,23,42,0.2)_0%,_rgba(8,18,35,0.85)_55%,_rgba(2,8,23,1)_100%)] text-[2.3rem] font-semibold text-yellow-200 shadow-[0_0_24px_rgba(34,211,238,0.45)] ring-4 ring-cyan-300/12">
                {agent.initials}
              </div>

              <h1 className="mt-5 text-[2rem] font-semibold tracking-tight text-white">
                {agent.name}
              </h1>

              <div className="mx-auto mt-3 flex max-w-[310px] items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-300/70" />
                <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
                  surge365 Travel Agent
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-300/70" />
              </div>

              <a
                href={`tel:${agent.phone}`}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-[#0b2742] px-5 py-2 text-sm font-medium text-cyan-50 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
              >
                📞 Tel: {agent.phone}
              </a>
            </div>

            {/* intro card */}
            <div className="mt-5 rounded-[1.5rem] border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(7,35,58,0.95),rgba(4,20,38,0.92))] p-4 shadow-[0_0_24px_rgba(34,211,238,0.10)]">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-[#06233a] text-3xl">
                  🧳
                </div>

                <div>
                  <h2 className="text-[1.45rem] font-semibold leading-tight text-white">
                    Your travel. Your freedom. Your future.
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Access my official travel sites and videos below.
                  </p>
                </div>
              </div>
            </div>

            {/* link cards */}
            <div className="mt-5 space-y-3">
              {agent.links.map((link, index) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-[1.35rem] border border-cyan-300/16 bg-[#061a2e] px-3.5 py-3.5 transition hover:border-cyan-300/32 hover:bg-[#08213a]"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-[1.3rem] ${
                      link.type === "watch"
                        ? "border-purple-300/30 bg-purple-400/10"
                        : "border-cyan-300/28 bg-cyan-300/10"
                    }`}
                  >
                    {link.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-200/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-0.5 text-[1.02rem] font-semibold leading-tight text-white">
                      {link.title}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ${
                      link.type === "watch"
                        ? "bg-[#6b46ff] text-white shadow-[0_0_16px_rgba(107,70,255,0.38)]"
                        : "bg-[#27d7ff] text-[#022033] shadow-[0_0_16px_rgba(39,215,255,0.36)]"
                    }`}
                  >
                    {link.action}
                  </div>
                </a>
              ))}
            </div>

            {/* bottom buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={`tel:${agent.phone}`}
                className="rounded-[1.35rem] bg-[linear-gradient(180deg,#0fa9db,#087fa8)] px-4 py-4 text-center text-white shadow-[0_0_20px_rgba(15,169,219,0.28)]"
              >
                <span className="block text-lg font-semibold">Call</span>
                <span className="mt-1 block text-xs font-medium text-cyan-100/90">
                  {agent.phone}
                </span>
              </a>

              <a
                href={`https://wa.me/${agent.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[1.35rem] bg-[linear-gradient(180deg,#37c95d,#239946)] px-4 py-4 text-center text-white shadow-[0_0_20px_rgba(55,201,93,0.30)]"
              >
                <span className="block text-lg font-semibold">WhatsApp</span>
                <span className="mt-1 block text-xs font-medium text-green-50/90">
                  Chat with me
                </span>
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <span>Powered by</span>
              <span className="font-semibold text-cyan-300">surge365</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}