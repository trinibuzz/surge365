export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import {
  approveAgentSubmission,
  getAllAgentSubmissions,
  rejectAgentSubmission,
} from "@/lib/agentSubmissions";

export default async function AdminSubmissionsPage() {
  await requireAdmin();

  const submissions = await getAllAgentSubmissions();

  async function approveSubmission(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = Number(formData.get("id"));

    if (id) {
      await approveAgentSubmission(id);
    }

    redirect("/admin/submissions");
  }

  async function rejectSubmission(formData: FormData) {
    "use server";

    await requireAdmin();

    const id = Number(formData.get("id"));

    if (id) {
      await rejectAgentSubmission(id);
    }

    redirect("/admin/submissions");
  }

  return (
    <main className="min-h-screen bg-[#010714] px-4 py-8 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.12)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <img
                src="/surge-logo.png"
                alt="Surge Three Sixty Five"
                className="h-16 w-auto object-contain drop-shadow-[0_0_22px_rgba(28,213,255,0.42)]"
              />

              <h1 className="mt-5 text-3xl font-semibold">
                Agent Submissions
              </h1>

              <p className="mt-2 text-sm text-slate-300">
                Review submitted forms and activate pages only after payment is
                confirmed.
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

        <div className="mt-6 grid gap-4">
          {submissions.length === 0 && (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-slate-300">
              No submissions yet.
            </div>
          )}

          {submissions.map((submission) => {
            const isApproved = submission.status === "APPROVED";
            const isRejected = submission.status === "REJECTED";
            const isPending =
              submission.status === "PENDING_PAYMENT" ||
              submission.status === "PENDING_REVIEW";

            return (
              <div
                key={submission.id}
                className="rounded-[1.5rem] border border-cyan-300/14 bg-[#061a2e]/95 p-5 shadow-[0_14px_28px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-1 text-center text-[10px] font-semibold leading-tight text-yellow-200">
                        {submission.initials || "AG"}
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">
                          {submission.display_name}
                        </h2>
                        <p className="text-sm text-slate-400">
                          Requested page: /{submission.slug}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
                      <p>
                        <span className="text-slate-500">Phone:</span>{" "}
                        {submission.phone || "Not set"}
                      </p>

                      <p>
                        <span className="text-slate-500">WhatsApp:</span>{" "}
                        {submission.whatsapp || "Not set"}
                      </p>

                      <p>
                        <span className="text-slate-500">Status:</span>{" "}
                        <span
                          className={
                            isApproved
                              ? "text-green-300"
                              : isRejected
                                ? "text-red-300"
                                : "text-yellow-300"
                          }
                        >
                          {submission.status}
                        </span>
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <h3 className="text-sm font-semibold text-cyan-200">
                        Submitted Links
                      </h3>

                      <div className="mt-3 grid gap-2 text-sm text-slate-400">
                        <p>
                          <span className="text-slate-500">SBA:</span>{" "}
                          {submission.sba_site_url || "Not provided"}
                        </p>

                        <p>
                          <span className="text-slate-500">Signup:</span>{" "}
                          {submission.signup_site_url || "Not provided"}
                        </p>

                        <p>
                          <span className="text-slate-500">Booking:</span>{" "}
                          {submission.booking_engine_url || "Not provided"}
                        </p>

                        <p>
                          <span className="text-slate-500">Vortex:</span>{" "}
                          {submission.vortex_site_url || "Not provided"}
                        </p>

                        <p>
                          <span className="text-slate-500">
                            Biz Opp Video:
                          </span>{" "}
                          {submission.biz_opp_video_url || "Not provided"}
                        </p>

                        <p>
                          <span className="text-slate-500">
                            Comp Plan Video:
                          </span>{" "}
                          {submission.comp_plan_video_url || "Not provided"}
                        </p>

                        <p>
                          <span className="text-slate-500">
                            Powerline Video:
                          </span>{" "}
                          {submission.powerline_video_url || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 md:justify-end">
                    {isPending && (
                      <>
                        <form action={approveSubmission}>
                          <input
                            type="hidden"
                            name="id"
                            value={submission.id}
                          />
                          <button
                            type="submit"
                            className="rounded-2xl bg-[#27d7ff] px-4 py-2 text-sm font-semibold text-[#022033] shadow-[0_0_18px_rgba(39,215,255,0.25)]"
                          >
                            Approve After Payment
                          </button>
                        </form>

                        <form action={rejectSubmission}>
                          <input
                            type="hidden"
                            name="id"
                            value={submission.id}
                          />
                          <button
                            type="submit"
                            className="rounded-2xl border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/10"
                          >
                            Reject
                          </button>
                        </form>
                      </>
                    )}

                    {isApproved && (
                      <>
                        <a
                          href={`/${submission.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-2xl border border-green-400/30 px-4 py-2 text-sm font-semibold text-green-200 hover:bg-green-500/10"
                        >
                          View Live Page
                        </a>

                        {submission.created_agent_id && (
                          <a
                            href={`/admin/agents/${submission.created_agent_id}/edit`}
                            className="rounded-2xl bg-[#27d7ff] px-4 py-2 text-sm font-semibold text-[#022033] shadow-[0_0_18px_rgba(39,215,255,0.25)]"
                          >
                            Edit Live Agent
                          </a>
                        )}
                      </>
                    )}

                    {isRejected && (
                      <span className="rounded-2xl border border-red-400/20 px-4 py-2 text-sm font-semibold text-red-200">
                        Rejected
                      </span>
                    )}
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