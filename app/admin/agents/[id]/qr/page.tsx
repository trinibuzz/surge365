export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import QRCode from "qrcode";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getAgentById } from "@/lib/adminAgents";

type QRPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getBaseUrl() {
  const headerList = await headers();

  const host =
    headerList.get("x-forwarded-host") || headerList.get("host") || "";

  const protocol =
    headerList.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

export default async function AgentQRCodePage({ params }: QRPageProps) {
  await requireAdmin();

  const { id } = await params;
  const agentId = Number(id);

  if (!agentId) {
    notFound();
  }

  const agent = await getAgentById(agentId);

  if (!agent) {
    notFound();
  }

  const baseUrl = await getBaseUrl();
  const publicUrl = `${baseUrl}/${agent.slug}`;

  const qrDataUrl = await QRCode.toDataURL(publicUrl, {
    width: 900,
    margin: 2,
    color: {
      dark: "#020816",
      light: "#ffffff",
    },
  });

  return (
    <main className="min-h-screen bg-[#010714] px-4 py-8 text-white">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.12)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <img
                src="/surge-logo.png"
                alt="Surge Three Sixty Five"
                className="h-16 w-auto object-contain drop-shadow-[0_0_22px_rgba(28,213,255,0.42)]"
              />

              <h1 className="mt-5 text-3xl font-semibold">Agent QR Code</h1>

              <p className="mt-2 text-sm text-slate-300">
                Use this QR code for the agent’s tap card, printed card, flyer,
                or sign.
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

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.10)]">
            <div className="rounded-[1.5rem] bg-white p-5">
              <img
                src={qrDataUrl}
                alt={`QR code for ${agent.display_name}`}
                className="h-auto w-full"
              />
            </div>

            <a
              href={qrDataUrl}
              download={`surge365-${agent.slug}-qr.png`}
              className="mt-5 flex w-full justify-center rounded-2xl bg-[#27d7ff] px-6 py-3 text-sm font-semibold text-[#022033] shadow-[0_0_20px_rgba(39,215,255,0.30)]"
            >
              Download QR Code
            </a>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/15 bg-[#061a2e] p-6 shadow-[0_0_50px_rgba(28,213,255,0.10)]">
            <h2 className="text-2xl font-semibold">{agent.display_name}</h2>

            <p className="mt-2 text-sm text-slate-400">
              Public page:
            </p>

            <div className="mt-3 break-all rounded-2xl border border-cyan-300/15 bg-black/25 p-4 text-sm text-cyan-200">
              {publicUrl}
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-cyan-300/20 px-5 py-3 text-center text-sm font-semibold text-cyan-200 hover:bg-cyan-300/10"
              >
                View Public Page
              </a>

              <a
                href={`/admin/agents/${agent.id}/edit`}
                className="rounded-2xl bg-[#27d7ff] px-5 py-3 text-center text-sm font-semibold text-[#022033]"
              >
                Edit Agent
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm leading-6 text-yellow-100">
              Test the QR code with your phone camera before printing or
              programming the NFC card.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}