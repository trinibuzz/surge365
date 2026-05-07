const agent = {
  name: "Keith Guevara",
  phone: "868-000-0000",
  whatsapp: "8680000000",
};

const links = [
  {
    title: "SBA Site",
    action: "Visit",
    url: "https://example.com/sba-site",
  },
  {
    title: "Signup Site",
    action: "Visit",
    url: "https://example.com/signup-site",
  },
  {
    title: "Booking Engine",
    action: "Visit",
    url: "https://example.com/booking-engine",
  },
  {
    title: "Vortex Site",
    action: "Visit",
    url: "https://example.com/vortex-site",
  },
  {
    title: "Biz Opp Video",
    action: "Watch",
    url: "https://example.com/biz-opp-video",
  },
  {
    title: "Comp Plan Video",
    action: "Watch",
    url: "https://example.com/comp-plan-video",
  },
  {
    title: "Powerline Video",
    action: "Watch",
    url: "https://example.com/powerline-video",
  },
];

export default function DemoAgentPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-5 py-8 text-white">
      <section className="mx-auto max-w-md">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              surge365
            </p>

            <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-3xl font-bold text-cyan-200">
              KG
            </div>

            <h1 className="mt-5 text-3xl font-bold">{agent.name}</h1>

            <p className="mt-2 text-slate-300">surge365 Travel Agent</p>

            <a
              href={`tel:${agent.phone}`}
              className="mt-4 inline-block rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200"
            >
              Tel: {agent.phone}
            </a>
          </div>

          <div className="mt-7 rounded-3xl bg-black/25 p-5 text-center">
            <h2 className="text-xl font-bold">Start Here</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Access my surge365 links below to visit travel sites, search deals,
              watch videos, or learn how to join.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {links.map((link) => (
              <div
                key={link.title}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
              >
                <h3 className="text-lg font-semibold">{link.title}</h3>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-cyan-400 px-4 py-3 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
                  >
                    {link.action}
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Check out this ${link.title}: ${link.url}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/15 px-4 py-3 text-center font-bold text-white transition hover:bg-white/10"
                  >
                    Share
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={`tel:${agent.phone}`}
              className="rounded-xl bg-white/10 px-4 py-3 text-center font-bold text-white transition hover:bg-white/15"
            >
              Call
            </a>

            <a
              href={`https://wa.me/${agent.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-500 px-4 py-3 text-center font-bold text-white transition hover:bg-green-400"
            >
              WhatsApp
            </a>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            Powered by surge365
          </p>
        </div>
      </section>
    </main>
  );
}