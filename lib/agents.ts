export type AgentLink = {
  title: string;
  action: "Visit" | "Watch";
  url: string;
  icon: string;
  type: "visit" | "watch";
};

export type Agent = {
  slug: string;
  name: string;
  initials: string;
  phone: string;
  whatsapp: string;
  links: AgentLink[];
};

export const agents: Agent[] = [
  {
    slug: "keith",
    name: "Keith Guevara",
    initials: "KG",
    phone: "868-000-0000",
    whatsapp: "18680000000",
    links: [
      {
        title: "SBA Site",
        action: "Visit",
        url: "https://example.com/sba-site",
        icon: "🌐",
        type: "visit",
      },
      {
        title: "Signup Site",
        action: "Visit",
        url: "https://example.com/signup-site",
        icon: "👤",
        type: "visit",
      },
      {
        title: "Booking Engine",
        action: "Visit",
        url: "https://example.com/booking-engine",
        icon: "📅",
        type: "visit",
      },
      {
        title: "Vortex Site",
        action: "Visit",
        url: "https://example.com/vortex-site",
        icon: "🌀",
        type: "visit",
      },
      {
        title: "Biz Opp Video",
        action: "Watch",
        url: "https://example.com/biz-opp-video",
        icon: "▶",
        type: "watch",
      },
      {
        title: "Comp Plan Video",
        action: "Watch",
        url: "https://example.com/comp-plan-video",
        icon: "📊",
        type: "watch",
      },
      {
        title: "Powerline Video",
        action: "Watch",
        url: "https://example.com/powerline-video",
        icon: "⚡",
        type: "watch",
      },
    ],
  },

  {
    slug: "demo",
    name: "Demo Agent",
    initials: "DA",
    phone: "868-000-0000",
    whatsapp: "18680000000",
    links: [
      {
        title: "SBA Site",
        action: "Visit",
        url: "https://example.com/sba-site",
        icon: "🌐",
        type: "visit",
      },
      {
        title: "Signup Site",
        action: "Visit",
        url: "https://example.com/signup-site",
        icon: "👤",
        type: "visit",
      },
      {
        title: "Booking Engine",
        action: "Visit",
        url: "https://example.com/booking-engine",
        icon: "📅",
        type: "visit",
      },
      {
        title: "Vortex Site",
        action: "Visit",
        url: "https://example.com/vortex-site",
        icon: "🌀",
        type: "visit",
      },
      {
        title: "Biz Opp Video",
        action: "Watch",
        url: "https://example.com/biz-opp-video",
        icon: "▶",
        type: "watch",
      },
      {
        title: "Comp Plan Video",
        action: "Watch",
        url: "https://example.com/comp-plan-video",
        icon: "📊",
        type: "watch",
      },
      {
        title: "Powerline Video",
        action: "Watch",
        url: "https://example.com/powerline-video",
        icon: "⚡",
        type: "watch",
      },
    ],
  },
];

export function getAgentBySlug(slug: string) {
  return agents.find((agent) => agent.slug === slug);
}