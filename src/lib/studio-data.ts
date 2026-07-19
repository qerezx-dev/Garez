import {
  Boxes,
  Bot,
  Code2,
  FileText,
  Film,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  Mic2,
  Music2,
  Palette,
  Settings,
  Users,
  Waypoints,
  Workflow,
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
  iconBg: string;
  glow: string;
  tag: string;
};

export type Creation = {
  id: string;
  prompt: string;
  mode: "image" | "video" | "music" | "code";
  model: string;
  aspect: string;
  quality: string;
  creativity: number;
  seed: string;
  outputCount: number;
  createdAt: string;
  duration?: string;
  gradient: string;
};

export type OptionItem = {
  value: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Studio", href: "#create", icon: LayoutDashboard, active: true },
  { label: "Projects", href: "#", icon: FolderKanban },
  { label: "Assets", href: "#preview", icon: ImageIcon },
  { label: "Workflows", href: "#", icon: Workflow },
  { label: "Models", href: "#", icon: Boxes },
  { label: "Community", href: "#", icon: Users },
  { label: "API", href: "#", icon: Waypoints },
  { label: "Settings", href: "#", icon: Settings },
];

export const AI_TOOLS: AiTool[] = [
  {
    id: "video",
    title: "AI Video",
    description: "Cinematic clips with lighting-aware motion control.",
    icon: Film,
    accent: "from-violet-400/50 via-fuchsia-500/25 to-transparent",
    iconBg: "from-violet-500 to-fuchsia-600",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.65_0.2_300/0.35)]",
    tag: "Motion",
  },
  {
    id: "image",
    title: "AI Image",
    description: "Photoreal heroes, brand stills, and concept art.",
    icon: ImageIcon,
    accent: "from-sky-400/50 via-blue-500/25 to-transparent",
    iconBg: "from-sky-500 to-blue-600",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.7_0.16_250/0.35)]",
    tag: "Visual",
  },
  {
    id: "music",
    title: "AI Music",
    description: "Scores and sonic identities matched to mood.",
    icon: Music2,
    accent: "from-pink-400/45 via-rose-500/25 to-transparent",
    iconBg: "from-pink-500 to-rose-600",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.7_0.18_350/0.32)]",
    tag: "Audio",
  },
  {
    id: "voice",
    title: "AI Voice",
    description: "Expressive narration with natural pacing.",
    icon: Mic2,
    accent: "from-emerald-400/45 via-teal-500/25 to-transparent",
    iconBg: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.72_0.14_160/0.32)]",
    tag: "Speech",
  },
  {
    id: "code",
    title: "AI Code",
    description: "Production-minded systems and UI snippets.",
    icon: Code2,
    accent: "from-cyan-400/45 via-teal-500/20 to-transparent",
    iconBg: "from-cyan-500 to-teal-600",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.75_0.12_200/0.3)]",
    tag: "Build",
  },
  {
    id: "documents",
    title: "AI Documents",
    description: "Briefs, scripts, and polished long-form copy.",
    icon: FileText,
    accent: "from-orange-400/45 via-amber-500/20 to-transparent",
    iconBg: "from-orange-500 to-amber-600",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.75_0.14_60/0.3)]",
    tag: "Write",
  },
  {
    id: "design",
    title: "AI Design",
    description: "Layouts, art direction, and visual systems.",
    icon: Palette,
    accent: "from-indigo-400/45 via-violet-500/25 to-transparent",
    iconBg: "from-indigo-500 to-violet-600",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.68_0.18_285/0.32)]",
    tag: "Look",
  },
  {
    id: "agent",
    title: "AI Agent",
    description: "Multi-step operators that plan and execute.",
    icon: Bot,
    accent: "from-slate-300/35 via-cyan-500/20 to-transparent",
    iconBg: "from-slate-500 to-cyan-700",
    glow: "group-hover:shadow-[0_0_50px_oklch(0.7_0.1_220/0.28)]",
    tag: "Ops",
  },
];

export const MEDIA_TYPES: OptionItem[] = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "music", label: "Music" },
  { value: "code", label: "Code" },
];

export const STYLES: OptionItem[] = [
  { value: "cinematic", label: "Cinematic" },
  { value: "editorial", label: "Editorial" },
  { value: "product", label: "Product" },
  { value: "noir", label: "Noir" },
];

export const PROMPT_SUGGESTIONS = [
  "Cyberpunk city",
  "Ocean sunset",
  "Fantasy castle",
  "Product photo",
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

export const OUTPUT_COUNTS: OptionItem[] = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const AI_PROVIDERS = [
  {
    id: "noro",
    name: "NORO Cinema",
    description: "Studio-native cinematic model.",
    initials: "NO",
    accent: "from-violet-400/40 to-blue-500/20",
    status: "ready" as const,
  },
];

export const PROMPT_TEMPLATES = PROMPT_SUGGESTIONS.map((label, index) => ({
  id: `t${index}`,
  label,
  prompt: label,
}));

export const SEED_PROMPT_HISTORY = [
  "Neon cyberpunk coupe on wet asphalt",
  "Moonlit fantasy castle above clouds",
  "Astronaut drifting through aurora dust",
];

export const SEED_HISTORY: Creation[] = [
  {
    id: "c1",
    prompt: "Neon cyberpunk coupe on wet asphalt",
    mode: "video",
    model: "NORO Cinema",
    aspect: "16:9",
    quality: "Ultra",
    creativity: 72,
    seed: "48291",
    outputCount: 1,
    createdAt: "2m ago",
    duration: "00:10",
    gradient: "from-[#1a0b2e] via-[#3b0764] to-[#0ea5e9]",
  },
  {
    id: "c2",
    prompt: "Moonlit fantasy castle above clouds",
    mode: "image",
    model: "NORO Prime",
    aspect: "16:9",
    quality: "Ultra",
    creativity: 68,
    seed: "11902",
    outputCount: 1,
    createdAt: "18m ago",
    gradient: "from-[#0f172a] via-[#312e81] to-[#7c3aed]",
  },
  {
    id: "c3",
    prompt: "Astronaut drifting through aurora dust",
    mode: "image",
    model: "NORO Ultra",
    aspect: "1:1",
    quality: "High",
    creativity: 80,
    seed: "77410",
    outputCount: 1,
    createdAt: "1h ago",
    gradient: "from-[#082f49] via-[#1e3a8a] to-[#db2777]",
  },
  {
    id: "c4",
    prompt: "Abstract luminous wave forms",
    mode: "image",
    model: "NORO Swift",
    aspect: "16:9",
    quality: "High",
    creativity: 55,
    seed: "22011",
    outputCount: 1,
    createdAt: "3h ago",
    gradient: "from-[#083344] via-[#0e7490] to-[#a21caf]",
  },
];
