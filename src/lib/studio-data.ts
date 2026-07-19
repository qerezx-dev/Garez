import {
  Compass,
  Film,
  ImageIcon,
  LayoutDashboard,
  MessageSquareText,
  Mic2,
  Palette,
  Sparkles,
  Type,
  Wand2,
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
  tag: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Studio", href: "#", icon: LayoutDashboard, active: true },
  { label: "Create", href: "#create", icon: Sparkles },
  { label: "Explore", href: "#tools", icon: Compass },
  { label: "Assets", href: "#preview", icon: ImageIcon },
  { label: "Chat", href: "#", icon: MessageSquareText },
];

export const AI_TOOLS: AiTool[] = [
  {
    id: "image",
    title: "Image Forge",
    description: "Photoreal concepts, brand visuals, and cinematic stills.",
    icon: ImageIcon,
    accent: "from-sky-400/30 to-blue-600/10",
    tag: "Visual",
  },
  {
    id: "video",
    title: "Motion Lab",
    description: "Generate short clips with lighting-aware scene control.",
    icon: Film,
    accent: "from-violet-400/30 to-fuchsia-600/10",
    tag: "Motion",
  },
  {
    id: "copy",
    title: "Copy Engine",
    description: "Campaign headlines, product stories, and polished scripts.",
    icon: Type,
    accent: "from-cyan-300/30 to-indigo-500/10",
    tag: "Text",
  },
  {
    id: "voice",
    title: "Voice Studio",
    description: "Natural narration with emotion and pacing controls.",
    icon: Mic2,
    accent: "from-blue-300/25 to-purple-500/10",
    tag: "Audio",
  },
  {
    id: "style",
    title: "Style Transfer",
    description: "Apply premium art directions across any asset set.",
    icon: Palette,
    accent: "from-indigo-300/30 to-violet-600/10",
    tag: "Look",
  },
  {
    id: "enhance",
    title: "Enhance+",
    description: "Upscale, retouch, and refine with studio-grade detail.",
    icon: Wand2,
    accent: "from-fuchsia-300/25 to-blue-500/10",
    tag: "Polish",
  },
];

export const PROMPT_SUGGESTIONS = [
  "A glass pavilion floating above neon clouds at dusk",
  "Minimal product hero for a titanium wireless earbud",
  "Editorial portrait with soft cyan rim light",
  "Luxury packaging for a violet perfume bottle",
];
