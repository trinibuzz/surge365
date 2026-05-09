type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#010714] px-4 text-white">
      <section className="w-full max-w-md rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-7 shadow-[0_0_50px_rgba(28,213,255,0.14)]">
        <div className="text-center">
          <img
            src="/surge-logo.png"
            alt="Surge Three Sixty Five"
            className="mx-auto h-20 w-auto object-contain drop-shadow-[0_0_24px_rgba(28,213,255,0.45)]"
          />

          <h1 className="mt-6 text-3xl font-semibold">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-300">
            Manage surge365 agent pages.
          </p>
        </div>

        {hasError && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Wrong username or password. Try again.
          </div>
        )}

        <form action="/api/admin/login" method="POST" className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="mt-2 w-full rounded-2xl border border-cyan-300/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-cyan-300/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-cyan-300/15 bg-black/25 px-4 py-3 text-white outline-none focus:border-cyan-300/50"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#27d7ff] px-5 py-3 font-semibold text-[#022033] shadow-[0_0_20px_rgba(39,215,255,0.30)] transition hover:scale-[1.01]"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}