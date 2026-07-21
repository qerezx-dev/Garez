export type ProjectType =
  | "Image"
  | "Video"
  | "Music"
  | "Voice"
  | "Code"
  | "Document"
  | "Workflow"
  | "Agent";

export type ProjectStatus = "Completed" | "Generating" | "Failed" | "Shared";

export type Project = {
  id: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  lastEdited: string;
  provider: string;
  model: string;
  generations: number;
  storage: string;
  favorite: boolean;
  archived: boolean;
  thumbnail: string;
  accent: string;
};

const seeds: Omit<Project, "id">[] = [
  { title: "Nocturne Mobility", type: "Video", status: "Completed", lastEdited: "4m ago", provider: "Runway", model: "Gen-4 Turbo", generations: 18, storage: "840 MB", favorite: true, archived: false, thumbnail: "city", accent: "from-fuchsia-600 via-violet-700 to-slate-950" },
  { title: "Aether House", type: "Image", status: "Completed", lastEdited: "27m ago", provider: "Stability", model: "SD 3.5 Large", generations: 42, storage: "312 MB", favorite: true, archived: false, thumbnail: "mountain", accent: "from-blue-500 via-indigo-700 to-slate-950" },
  { title: "Helio Identity System", type: "Workflow", status: "Shared", lastEdited: "1h ago", provider: "NORO", model: "Studio Design", generations: 31, storage: "126 MB", favorite: false, archived: false, thumbnail: "abstract", accent: "from-orange-400 via-rose-600 to-violet-950" },
  { title: "Oxbow Voice Casting", type: "Voice", status: "Generating", lastEdited: "1h ago", provider: "ElevenLabs", model: "Multilingual v2", generations: 9, storage: "78 MB", favorite: false, archived: false, thumbnail: "voice", accent: "from-emerald-400 via-teal-700 to-slate-950" },
  { title: "Kinetic Product Film", type: "Video", status: "Generating", lastEdited: "2h ago", provider: "Fal", model: "Kling 1.6", generations: 24, storage: "1.2 GB", favorite: true, archived: false, thumbnail: "product", accent: "from-cyan-400 via-blue-800 to-slate-950" },
  { title: "Future Signals", type: "Music", status: "Completed", lastEdited: "3h ago", provider: "Suno", model: "V4", generations: 15, storage: "94 MB", favorite: false, archived: false, thumbnail: "music", accent: "from-pink-500 via-purple-700 to-slate-950" },
  { title: "Launch Site Engine", type: "Code", status: "Completed", lastEdited: "Yesterday", provider: "OpenAI", model: "o3", generations: 67, storage: "11 MB", favorite: false, archived: false, thumbnail: "code", accent: "from-sky-400 via-cyan-700 to-slate-950" },
  { title: "Q2 Creative Brief", type: "Document", status: "Shared", lastEdited: "Yesterday", provider: "Claude", model: "3.7 Sonnet", generations: 12, storage: "3 MB", favorite: false, archived: false, thumbnail: "document", accent: "from-amber-300 via-orange-600 to-slate-950" },
  { title: "Autonomous Campaign", type: "Agent", status: "Failed", lastEdited: "2d ago", provider: "NORO", model: "Agent Core", generations: 16, storage: "51 MB", favorite: false, archived: false, thumbnail: "agent", accent: "from-slate-400 via-indigo-700 to-slate-950" },
  { title: "Archive / Winter Field", type: "Image", status: "Completed", lastEdited: "4d ago", provider: "Google", model: "Imagen 3", generations: 19, storage: "441 MB", favorite: false, archived: true, thumbnail: "mountain", accent: "from-slate-500 via-blue-900 to-slate-950" },
  { title: "Sable Editorial", type: "Image", status: "Completed", lastEdited: "5d ago", provider: "OpenAI", model: "GPT Image", generations: 38, storage: "287 MB", favorite: true, archived: false, thumbnail: "abstract", accent: "from-rose-400 via-red-800 to-slate-950" },
  { title: "Northstar Workflow", type: "Workflow", status: "Completed", lastEdited: "6d ago", provider: "NORO", model: "Flow Engine", generations: 8, storage: "18 MB", favorite: false, archived: false, thumbnail: "workflow", accent: "from-violet-400 via-blue-700 to-slate-950" },
];

export const projects: Project[] = Array.from({ length: 48 }, (_, index) => ({
  ...seeds[index % seeds.length],
  id: `project-${index + 1}`,
  title: index < seeds.length ? seeds[index].title : `${seeds[index % seeds.length].title} ${Math.floor(index / seeds.length) + 1}`,
  lastEdited: index < 4 ? seeds[index].lastEdited : `${Math.floor(index / 4) + 1}d ago`,
}));

export const filterOptions = ["All", "Recent", "Favorites", "Archived", "Completed", "Generating", "Failed", "Shared"] as const;
