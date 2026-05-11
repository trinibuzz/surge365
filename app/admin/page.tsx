export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import {
  deleteAgentById,
  getAllAgents,
  setAgentActiveStatus,
} from "@/lib/adminAgents";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const agents = await getAllAgents();

  async function deactivateAgent(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = Number(formData.get("id"));

    if (id) {
      await setAgentActiveStatus(id, false);
    }

    redirect("/admin");
  }

  async function activateAgent(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = Number(formData.get("id"));

    if (id) {
      await setAgentActiveStatus(id, true);
    }

    redirect("/admin");
  }

  async function deleteAgent(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = Number(formData.get("id"));

    if (id) {
      await deleteAgentById(id);
    }

    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#010714] px-4 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.12)] md:flex-row md:items-center md:justify-between">
          <div>
            <img
              src="/surge-logo.png"
              alt="Surge Three Sixty Five"
              className="h-16 w-auto object-contain drop-shadow-[0_0_22px_rgba(28,213,255,0.42)]"
            />

            <h1 className="mt-5 text-3xl font-semibold">Agent Dashboard</h1>

            <p className="mt-2 text-sm text-slate-300">
              View and manage surge365 agent tap pages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/agents/new"
              className="rounded-2xl bg-[#27d7ff] px-5 py-3 text-sm font-semibold text-[#022033] shadow-[0_0_18px_rgba(39,215,255,0.30)]"
            >
              Add Agent
            </a>

            <a
              href="/admin/submissions"
              className="rounded-2xl border border-yellow-300/25 px-5 py-3 text-sm font-semibold text-yellow-200 hover:bg-yellow-300/10"
            >
              Submissions
            </a>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {agents.length === 0 && (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-slate-300">
              No agents found yet.
            </div>
          )}

          {agents.map((agent) => {
            const liveUrl = `/${agent.slug}`;
            const badgeText = agent.initials || "A";
            const isActive = Boolean(agent.is_active);

            return (
              <div
                key={agent.id}
                className="rounded-[1.5rem] border border-cyan-300/14 bg-[#061a2e]/95 p-5 shadow-[0_14px_28px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-1 text-center text-[10px] font-semibold leading-tight text-yellow-200">
                        {badgeText}
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">
                          {agent.display_name}
                        </h2>
                        <p className="text-sm text-slate-400">
                          /{agent.slug}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
                      <p>
                        <span className="text-slate-500">Phone:</span>{" "}
                        {agent.phone || "Not set"}
                      </p>

                      <p>
                        <span className="text-slate-500">WhatsApp:</span>{" "}
                        {agent.whatsapp || "Not set"}
                      </p>

                      <p>
                        <span className="text-slate-500">Status:</span>{" "}
                        <span
                          className={
                            isActive ? "text-green-300" : "text-red-300"
                          }
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {isActive && (
                      <>
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-2xl border border-cyan-300/20 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/10"
                        >
                          View Page
                        </a>

                        <a
                          href={`/admin/agents/${agent.id}/qr`}
                          className="rounded-2xl border border-yellow-300/25 px-4 py-2 text-sm font-semibold text-yellow-200 hover:bg-yellow-300/10"
                        >
                          QR Code
                        </a>
                      </>
                    )}

                    {!isActive && (
                      <span className="rounded-2xl border border-red-400/20 px-4 py-2 text-sm font-semibold text-red-200">
                        Page Off
                      </span>
                    )}

                    <a
                      href={`/admin/agents/${agent.id}/edit`}
                      className="rounded-2xl bg-[#27d7ff] px-4 py-2 text-sm font-semibold text-[#022033]"
                    >
                      Edit
                    </a>

                    {isActive ? (
                      <form action={deactivateAgent}>
                        <input type="hidden" name="id" value={agent.id} />
                        <button
                          type="submit"
                          className="rounded-2xl border border-yellow-300/25 px-4 py-2 text-sm font-semibold text-yellow-200 hover:bg-yellow-300/10"
                        >
                          Deactivate
                        </button>
                      </form>
                    ) : (
                      <form action={activateAgent}>
                        <input type="hidden" name="id" value={agent.id} />
                        <button
                          type="submit"
                          className="rounded-2xl border border-green-400/25 px-4 py-2 text-sm font-semibold text-green-200 hover:bg-green-500/10"
                        >
                          Activate
                        </button>
                      </form>
                    )}

                    <form action={deleteAgent}>
                      <input type="hidden" name="id" value={agent.id} />
                      <button
                        type="submit"
                        className="rounded-2xl border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}