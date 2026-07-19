import {
  Bot,
  Boxes,
  Braces,
  Code2,
  FileText,
  Film,
  FolderKanban,
  ImageIcon,
  Images,
  LayoutDashboard,
  Mic2,
  Music2,
  Palette,
  Settings,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
};

export type CreationMode = {
  id: string;
  label: string;
  icon: LucideIcon;
  hint: string;
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
  toolLabel: string;
  model: string;
  aspect: string;
  quality: string;
  creativity: number;
  seed: string;
  outputCount: number;
  createdAt: string;
};

export type OptionItem = {
  value: string;
  label: string;
};

export type AiProvider = {
  id: string;
  name: string;
  description: string;
  initials: string;
  accent: string;
  status: "ready" | "coming-soon";
};

export type PromptTemplate = {
  id: string;
  label: string;
  prompt: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Studio", href: "#studio", icon: LayoutDashboard, active: true },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Assets", href: "#preview", icon: Images },
  { label: "Workflows", href: "#workflows", icon: Workflow },
  { label: "Models", href: "#models", icon: Boxes },
  { label: "Community", href: "#community", icon: Users },
  { label: "API", href: "#api", icon: Braces },
  { label: "Settings", href: "#settings", icon: Settings },
];

export const CREATION_MODES: CreationMode[] = [
  { id: "image", label: "Image", icon: Images, hint: "Cinematic stills" },
  { id: "video", label: "Video", icon: Film, hint: "Motion & film" },
  { id: "music", label: "Music", icon: Music2, hint: "Scores & audio" },
  { id: "code", label: "Code", icon: Code2, hint: "UI & systems" },
  { id: "agent", label: "Agent", icon: Bot, hint: "Autonomous ops" },
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

export const AI_PROVIDERS: AiProvider[] = [
  {
    id: "openai",
    name: "OpenAI",
    description: "Flagship multimodal models for image and text systems.",
    initials: "OA",
    accent: "from-emerald-400/40 to-teal-500/20",
    status: "coming-soon",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "High-context generation with strong visual reasoning.",
    initials: "GG",
    accent: "from-sky-400/40 to-blue-500/20",
    status: "coming-soon",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Precise creative direction and structured prompt craft.",
    initials: "CL",
    accent: "from-orange-300/35 to-amber-500/20",
    status: "coming-soon",
  },
  {
    id: "stability",
    name: "Stability AI",
    description: "Diffusion-native image models for studio-grade stills.",
    initials: "ST",
    accent: "from-violet-400/40 to-fuchsia-500/20",
    status: "coming-soon",
  },
  {
    id: "fal",
    name: "Fal AI",
    description: "Fast inference endpoints for iterative creative loops.",
    initials: "FA",
    accent: "from-indigo-400/40 to-cyan-500/20",
    status: "coming-soon",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "Premium voice synthesis with expressive performance.",
    initials: "EL",
    accent: "from-rose-300/35 to-purple-500/20",
    status: "coming-soon",
  },
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

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "product",
    label: "Product Hero",
    prompt:
      "Minimal product hero of a titanium wireless earbud on matte black stone, soft cyan rim light, ultra-clean luxury advertising composition",
  },
  {
    id: "cinematic",
    label: "Cinematic Scene",
    prompt:
      "A glass pavilion floating above neon clouds at dusk, volumetric god rays, cinematic widescreen framing, ultra-detailed atmosphere",
  },
  {
    id: "portrait",
    label: "Editorial Portrait",
    prompt:
      "Editorial portrait with soft cyan rim light, shallow depth of field, premium fashion lighting, quiet luxury color grade",
  },
  {
    id: "packaging",
    label: "Packaging",
    prompt:
      "Luxury packaging for a violet perfume bottle, reflective glass, soft studio gradients, high-end commercial still life",
  },
];

export const SEED_PROMPT_HISTORY = [
  "Orbital lounge with aurora glass walls",
  "Slow dolly through a neon mist corridor",
  "Titanium earbud on black velvet, soft rim light",
];

export const SEED_HISTORY: Creation[] = [
  {
    id: "c1",
    prompt: "Orbital lounge with aurora glass walls",
    mode: "image",
    toolLabel: "Image",
    model: "Stability AI",
    aspect: "16:9",
    quality: "Ultra",
    creativity: 72,
    seed: "48291",
    outputCount: 1,
    createdAt: "2m ago",
  },
  {
    id: "c2",
    prompt: "Slow dolly through a neon mist corridor",
    mode: "video",
    toolLabel: "Video",
    model: "Fal AI",
    aspect: "9:16",
    quality: "High",
    creativity: 64,
    seed: "11902",
    outputCount: 2,
    createdAt: "18m ago",
  },
  {
    id: "c3",
    prompt: "Titanium earbud on black velvet, soft rim light",
    mode: "image",
    toolLabel: "Image",
    model: "OpenAI",
    aspect: "1:1",
    quality: "Ultra",
    creativity: 48,
    seed: "77410",
    outputCount: 1,
    createdAt: "1h ago",
  },
];
