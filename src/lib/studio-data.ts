import {
  Bot,
  Code2,
  Compass,
  FileText,
  Film,
  History,
  ImageIcon,
  LayoutDashboard,
  MessageSquareText,
  Mic2,
  Music2,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
};

export type AiTool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
  tag: string;
};

export type Creation = {
  id: string;
  prompt: string;
  mode: "image" | "video";
  model: string;
  style: string;
  aspect: string;
  quality: string;
  createdAt: string;
};

export type OptionItem = {
  value: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Studio", href: "#", icon: LayoutDashboard, active: true },
  { label: "Create", href: "#create", icon: Sparkles },
  { label: "Explore", href: "#tools", icon: Compass },
  { label: "Assets", href: "#preview", icon: ImageIcon },
  { label: "History", href: "#history", icon: History },
  { label: "Chat", href: "#", icon: MessageSquareText },
];

export const AI_TOOLS: AiTool[] = [
  {
    id: "image",
    title: "AI Image",
    description: "Cinematic stills, product heroes, and brand-ready visuals.",
    icon: ImageIcon,
    accent: "from-sky-400/35 via-blue-500/15 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.7_0.16_250/0.28)]",
    tag: "Visual",
  },
  {
    id: "video",
    title: "AI Video",
    description: "Short-form motion with lighting-aware scene control.",
    icon: Film,
    accent: "from-violet-400/35 via-fuchsia-500/15 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.68_0.2_300/0.28)]",
    tag: "Motion",
  },
  {
    id: "music",
    title: "AI Music",
    description: "Scores, beds, and sonic identities matched to your mood.",
    icon: Music2,
    accent: "from-cyan-300/30 via-indigo-400/15 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.78_0.13_220/0.25)]",
    tag: "Audio",
  },
  {
    id: "voice",
    title: "AI Voice",
    description: "Natural narration with emotion, pacing, and tone control.",
    icon: Mic2,
    accent: "from-blue-300/30 via-purple-500/15 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.7_0.18_280/0.25)]",
    tag: "Speech",
  },
  {
    id: "code",
    title: "AI Code",
    description: "Production-minded snippets, refactors, and UI systems.",
    icon: Code2,
    accent: "from-indigo-300/30 via-sky-500/12 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.72_0.15_255/0.25)]",
    tag: "Build",
  },
  {
    id: "agent",
    title: "AI Agent",
    description: "Multi-step creative operators that plan and execute.",
    icon: Bot,
    accent: "from-fuchsia-300/28 via-violet-500/15 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.68_0.2_300/0.28)]",
    tag: "Ops",
  },
  {
    id: "design",
    title: "AI Design",
    description: "Layouts, art direction, and cohesive visual systems.",
    icon: Palette,
    accent: "from-violet-300/30 via-blue-500/12 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.7_0.17_270/0.25)]",
    tag: "Look",
  },
  {
    id: "documents",
    title: "AI Documents",
    description: "Briefs, scripts, proposals, and polished long-form copy.",
    icon: FileText,
    accent: "from-sky-300/28 via-indigo-400/12 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_oklch(0.76_0.12_230/0.22)]",
    tag: "Write",
  },
];

export const MODELS: OptionItem[] = [
  { value: "noro-prime", label: "NORO Prime" },
  { value: "noro-cinema", label: "NORO Cinema" },
  { value: "noro-swift", label: "NORO Swift" },
  { value: "noro-ultra", label: "NORO Ultra" },
];

export const STYLES: OptionItem[] = [
  { value: "cinematic", label: "Cinematic" },
  { value: "editorial", label: "Editorial" },
  { value: "product", label: "Product" },
  { value: "noir", label: "Noir" },
  { value: "ethereal", label: "Ethereal" },
];

export const ASPECT_RATIOS: OptionItem[] = [
  { value: "1:1", label: "1:1" },
  { value: "4:5", label: "4:5" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "21:9", label: "21:9" },
];

export const QUALITIES: OptionItem[] = [
  { value: "standard", label: "Standard" },
  { value: "high", label: "High" },
  { value: "ultra", label: "Ultra" },
];

export const PROMPT_SUGGESTIONS = [
  "A glass pavilion floating above neon clouds at dusk",
  "Minimal product hero for a titanium wireless earbud",
  "Editorial portrait with soft cyan rim light",
  "Luxury packaging for a violet perfume bottle",
];

export const SEED_HISTORY: Creation[] = [
  {
    id: "c1",
    prompt: "Orbital lounge with aurora glass walls",
    mode: "image",
    model: "NORO Cinema",
    style: "Cinematic",
    aspect: "16:9",
    quality: "Ultra",
    createdAt: "2m ago",
  },
  {
    id: "c2",
    prompt: "Slow dolly through a neon mist corridor",
    mode: "video",
    model: "NORO Ultra",
    style: "Noir",
    aspect: "9:16",
    quality: "High",
    createdAt: "18m ago",
  },
  {
    id: "c3",
    prompt: "Titanium earbud on black velvet, soft rim light",
    mode: "image",
    model: "NORO Prime",
    style: "Product",
    aspect: "1:1",
    quality: "Ultra",
    createdAt: "1h ago",
  },
];
