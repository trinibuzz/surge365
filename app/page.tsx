export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
          surge365
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Tap. Connect. Share your information instantly.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A smart digital business card platform powered by QR codes and NFC tap
          cards. Share your phone, WhatsApp, email, website, and social media
          links with one simple tap.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
          >
            Get Started
          </a>

          <a
            href="#"
            className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            View Demo Card
          </a>
        </div>

        <div className="mt-16 grid w-full gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
            <h2 className="text-xl font-semibold">NFC Tap Cards</h2>
            <p className="mt-3 text-slate-300">
              Let customers tap your card and instantly open your digital
              profile on their phone.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
            <h2 className="text-xl font-semibold">QR Code Profiles</h2>
            <p className="mt-3 text-slate-300">
              Every profile gets a QR code that can be printed on cards,
              flyers, menus, signs, and packages.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
            <h2 className="text-xl font-semibold">Save Contact</h2>
            <p className="mt-3 text-slate-300">
              Visitors can call, WhatsApp, email, follow your socials, and save
              your details to their phone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}