const agent = {
  name: "Keith Guevara",
  initials: "KG",
  phone: "868-000-0000",
  whatsapp: "18680000000",
};

const links = [
  {
    title: "SBA Site",
    action: "Visit",
    url: "https://example.com/sba-site",
    icon: "/icon-sba.png",
    button: "/button-visit.png",
  },
  {
    title: "Signup Site",
    action: "Visit",
    url: "https://example.com/signup-site",
    icon: "/icon-signup.png",
    button: "/button-visit.png",
  },
  {
    title: "Booking Engine",
    action: "Visit",
    url: "https://example.com/booking-engine",
    icon: "/icon-booking.png",
    button: "/button-visit.png",
  },
  {
    title: "Vortex Site",
    action: "Visit",
    url: "https://example.com/vortex-site",
    icon: "/icon-vortex.png",
    button: "/button-visit.png",
  },
  {
    title: "Biz Opp Video",
    action: "Watch",
    url: "https://example.com/biz-opp-video",
    icon: "/icon-bizopp.png",
    button: "/button-watch.png",
  },
  {
    title: "Comp Plan Video",
    action: "Watch",
    url: "https://example.com/comp-plan-video",
    icon: "/icon-compplan.png",
    button: "/button-watch.png",
  },
  {
    title: "Powerline Video",
    action: "Watch",
    url: "https://example.com/powerline-video",
    icon: "/icon-powerline.png",
    button: "/button-watch.png",
  },
];

export default function DemoAgentPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#010714] px-4 py-6 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(28,213,255,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(247,190,60,0.10),_transparent_36%),linear-gradient(180deg,_#010714_0%,_#03142a_48%,_#010714_100%)]" />
        <div className="absolute left-1/2 top-[-190px] h-[430px] w-[430px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-130px] h-[360px] w-[360px] rounded-full bg-yellow-300/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-[440px]">
        <div className="rounded-[2.85rem] border border-white/10 bg-black/55 p-2 shadow-[0_35px_95px_rgba(0,0,0,0.75)]">
          <div className="relative overflow-hidden rounded-[2.42rem] border border-cyan-300/12 bg-[#041223] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_75px_rgba(28,213,255,0.14)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(6,28,50,0.98)_0%,_rgba(4,18,35,0.99)_42%,_rgba(2,10,22,1)_100%)]" />

            {/* HERO IMAGE */}
            <div className="relative z-10 h-[322px] overflow-hidden">
              <img
                src="/globe-hero.png"
                alt="Surge Three Sixty Five"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#041223]" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#041223] via-[#041223]/70 to-transparent" />

              <div className="absolute bottom-[20px] left-1/2 flex h-[104px] w-[104px] -translate-x-1/2 items-center justify-center rounded-full border border-cyan-300/70 bg-[radial-gradient(circle,_rgba(247,190,60,0.22)_0%,_rgba(28,213,255,0.16)_42%,_rgba(2,8,23,0.98)_76%)] text-[2.35rem] font-semibold tracking-tight text-yellow-200 shadow-[0_0_36px_rgba(28,213,255,0.65)] ring-4 ring-cyan-300/10">
                {agent.initials}
              </div>
            </div>

            {/* AGENT INFO */}
            <div className="relative z-10 -mt-1 px-6 text-center">
              <h1 className="text-[2rem] font-medium leading-none tracking-tight text-white drop-shadow-[0_0_18px_rgba(28,213,255,0.20)]">
                {agent.name}
              </h1>

              <div className="mx-auto mt-3 flex max-w-[315px] items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-300/75" />
                <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
                  surge365 Travel Agent
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-300/75" />
              </div>

              <a
                href={`tel:${agent.phone}`}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-cyan-300/38 bg-[#09263f]/92 px-5 py-2 text-sm font-medium text-cyan-50 shadow-[0_0_20px_rgba(28,213,255,0.20)]"
              >
                📞 Tel: {agent.phone}
              </a>
            </div>

            {/* INTRO CARD */}
            <div className="relative z-10 px-5 pt-5">
              <img
                src="/intro-card.png"
                alt="Your travel. Your freedom. Your future."
                className="w-full rounded-[1.45rem] border border-cyan-300/30 opacity-100 shadow-[0_0_34px_rgba(28,213,255,0.28)]"
              />
            </div>

            {/* LINK CARDS */}
            <div className="relative z-10 px-5 pt-5">
              <div className="space-y-3">
                {links.map((link, index) => (
                  <a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-[1.28rem] border border-cyan-300/26 bg-[#08233d] px-3.5 py-3 shadow-[0_14px_28px_rgba(0,0,0,0.28),0_0_18px_rgba(28,213,255,0.10)] transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-[#0a2a49]"
                  >
                    <img
                      src={link.icon}
                      alt=""
                      className="h-[46px] w-[46px] shrink-0 rounded-[0.95rem] object-cover shadow-[0_0_18px_rgba(28,213,255,0.26)]"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-200/75">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-0.5 text-[1.04rem] font-semibold leading-tight text-white">
                        {link.title}
                      </h3>
                    </div>

                    <img
                      src={link.button}
                      alt={link.action}
                      className="h-[34px] w-[88px] shrink-0 object-contain transition group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* CONTACT BUTTONS */}
            <div className="relative z-10 grid grid-cols-2 gap-3 px-5 pt-5">
              <a href={`tel:${agent.phone}`} className="block">
                <img
                  src="/button-call.png"
                  alt="Call"
                  className="h-[68px] w-full rounded-[1.15rem] object-cover shadow-[0_0_24px_rgba(15,169,219,0.36)] transition hover:scale-[1.01]"
                />
              </a>

              <a
                href={`https://wa.me/${agent.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="/button-whatsapp.png"
                  alt="WhatsApp"
                  className="h-[68px] w-full rounded-[1.15rem] object-cover shadow-[0_0_24px_rgba(55,201,93,0.38)] transition hover:scale-[1.01]"
                />
              </a>
            </div>

            {/* FOOTER */}
            <div className="relative z-10 px-5 pb-6 pt-5">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cyan-950/20 to-transparent" />

              <div className="relative flex items-center justify-center gap-2 text-xs text-slate-500">
                <span>Powered by</span>
                <span className="font-medium text-cyan-300">surge365</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}