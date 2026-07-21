"use client";

import {
  ArrowDownUp,
  Clock3,
  Download,
  FileClock,
  Filter,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { filterOptions, projects, type Project } from "@/components/projects/project-data";

type Filter = (typeof filterOptions)[number];

export function ProjectsWorkspace() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState("Last edited");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Project | null>(projects[0]);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const matchesSearch = !search || [project.title, project.type, project.provider, project.model].join(" ").toLowerCase().includes(search);
      if (!matchesSearch) return false;
      if (filter === "All" || filter === "Recent") return true;
      if (filter === "Favorites") return project.favorite;
      if (filter === "Archived") return project.archived;
      return project.status === filter;
    });
    return [...filtered].sort((a, b) => sort === "Name" ? a.title.localeCompare(b.title) : a.id.localeCompare(b.id));
  }, [filter, query, sort]);

  return (
    <div className="min-h-dvh bg-[#04060d] text-white">
      <ProjectsBackdrop />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1920px]">
        <ProjectsRail active="Projects" />
        <div className="min-w-0 flex-1">
          <ProjectsHeader onSearch={setQuery} />
          <main className="mx-auto max-w-[1680px] px-5 pb-8 pt-5 xl:px-8">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-cyan-200/70">NORO / PROJECTS</p>
                <h1 className="mt-3 font-[family-name:var(--font-display)] text-[42px] font-semibold tracking-[-.055em] sm:text-[52px]">Everything in motion.</h1>
                <p className="mt-2 text-[13px] text-white/52">A living archive for every world you are building.</p>
              </div>
              <button className="inline-flex h-10 items-center gap-2 rounded-[9px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-4 text-[11px] font-semibold shadow-[0_10px_28px_rgba(43,135,255,.26)]"><Plus className="size-4" />New Project</button>
            </div>

            <section className="rounded-[14px] border border-white/[.1] bg-[linear-gradient(160deg,rgba(11,19,35,.82),rgba(5,8,15,.79))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_18px_55px_rgba(0,0,0,.23)] backdrop-blur-[28px]">
              <div className="flex flex-col gap-3 border-b border-white/[.07] pb-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex h-9 items-center gap-2 rounded-[8px] border border-white/[.08] bg-black/15 px-3 text-[11px] text-white/48"><Search className="size-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-[190px] bg-transparent outline-none placeholder:text-white/35" placeholder="Search projects" /></div>
                  <div className="relative">
                    <button onClick={() => setShowFilters((value) => !value)} className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-white/[.08] bg-white/[.03] px-3 text-[10px] text-white/68"><Filter className="size-3.5" />{filter}</button>
                    <AnimatePresence>{showFilters && <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute left-0 top-11 z-30 grid w-[230px] grid-cols-2 gap-1 rounded-[10px] border border-white/[.11] bg-[#0b1120]/95 p-2 shadow-2xl backdrop-blur-xl">{filterOptions.map((option) => <button key={option} onClick={() => { setFilter(option); setShowFilters(false); }} className={`rounded-[6px] px-2 py-2 text-left text-[10px] ${filter === option ? "bg-cyan-400/15 text-cyan-200" : "text-white/58 hover:bg-white/[.06]"}`}>{option}</button>)}</motion.div>}</AnimatePresence>
                  </div>
                  <button onClick={() => setSort(sort === "Last edited" ? "Name" : "Last edited")} className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-white/[.08] bg-white/[.03] px-3 text-[10px] text-white/68"><ArrowDownUp className="size-3.5" />{sort}</button>
                </div>
                <div className="flex items-center gap-1 rounded-[8px] bg-white/[.035] p-1"><button onClick={() => setView("grid")} className={`grid size-7 place-items-center rounded-[5px] ${view === "grid" ? "bg-white/[.1] text-white" : "text-white/42"}`}><Grid2X2 className="size-3.5" /></button><button onClick={() => setView("list")} className={`grid size-7 place-items-center rounded-[5px] ${view === "list" ? "bg-white/[.1] text-white" : "text-white/42"}`}><List className="size-3.5" /></button></div>
              </div>
              <div className="grid min-h-[570px] grid-cols-1 xl:grid-cols-[minmax(0,1fr)_330px]">
                <VirtualProjectGrid projects={results} view={view} selected={selected?.id} onSelect={setSelected} />
                <ProjectDetail project={selected} onClose={() => setSelected(null)} />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function VirtualProjectGrid({ projects: displayedProjects, view, selected, onSelect }: { projects: Project[]; view: "grid" | "list"; selected?: string; onSelect: (project: Project) => void }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const columnCount = view === "grid" ? 3 : 1;
  const rowHeight = view === "grid" ? 250 : 84;
  const viewportHeight = 570;
  const totalRows = Math.ceil(displayedProjects.length / columnCount);
  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
  const endRow = Math.min(totalRows, Math.ceil((scrollTop + viewportHeight) / rowHeight) + 1);
  const visible = displayedProjects.slice(startRow * columnCount, endRow * columnCount);

  return (
    <div ref={containerRef} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)} className="h-[570px] overflow-auto border-r border-white/[.07] p-3 [scrollbar-color:rgba(255,255,255,.2)_transparent]">
      {displayedProjects.length === 0 ? <EmptyProjects /> : <div style={{ height: totalRows * rowHeight, position: "relative" }}><div className={view === "grid" ? "absolute left-0 right-0 grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3" : "absolute left-0 right-0 space-y-2"} style={{ top: startRow * rowHeight }}>{visible.map((project) => <ProjectCard key={project.id} project={project} list={view === "list"} selected={project.id === selected} onClick={() => onSelect(project)} />)}</div></div>}
    </div>
  );
}

function ProjectCard({ project, list, selected, onClick }: { project: Project; list: boolean; selected: boolean; onClick: () => void }) {
  return <motion.article whileHover={{ y: list ? 0 : -3 }} onClick={onClick} className={`group cursor-pointer overflow-hidden rounded-[10px] border transition ${selected ? "border-cyan-300/50 bg-cyan-400/[.07]" : "border-white/[.09] bg-white/[.025] hover:border-white/[.2] hover:bg-white/[.04]"} ${list ? "flex h-[72px] items-center p-2" : "min-h-[235px]"}`}>
    <div className={`relative shrink-0 overflow-hidden bg-gradient-to-br ${project.accent} ${list ? "size-14 rounded-[7px]" : "aspect-[16/9]"}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.32),transparent_38%)]" /><div className="absolute bottom-[18%] left-[29%] h-[18%] w-[45%] rounded-full bg-black/30 blur-md" />{project.type === "Video" && <span className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[8px]">00:12</span>}</div>
    <div className={`${list ? "flex flex-1 items-center justify-between px-3" : "p-3"}`}><div><div className="flex items-center gap-1.5"><h3 className="text-[11px] font-semibold text-white/88">{project.title}</h3>{project.favorite && <Star className="size-3 fill-amber-300 text-amber-300" />}</div><p className="mt-1 text-[9px] text-white/42">{project.type} · {project.provider} · {project.lastEdited}</p>{!list && <div className="mt-3 flex items-center justify-between"><span className={`rounded-full px-2 py-1 text-[8px] ${statusColor(project.status)}`}>{project.status}</span><button className="text-white/38 hover:text-white"><MoreHorizontal className="size-4" /></button></div>}</div>{list && <span className={`rounded-full px-2 py-1 text-[8px] ${statusColor(project.status)}`}>{project.status}</span>}</div>
  </motion.article>;
}

function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return <div className="hidden xl:grid place-items-center text-center text-[11px] text-white/38">Select a project to inspect<br />its universe.</div>;
  return <aside className="hidden h-[570px] overflow-y-auto p-4 xl:block"><div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-cyan-200/65">Project detail</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-[20px] font-semibold">{project.title}</h2></div><button onClick={onClose} className="grid size-7 place-items-center rounded-full bg-white/[.05] text-white/55"><X className="size-3.5" /></button></div><div className={`mt-4 aspect-video rounded-[9px] bg-gradient-to-br ${project.accent}`}><div className="h-full w-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.25),transparent_38%)]" /></div><DetailBlock title="Metadata" items={[["Provider", project.provider], ["Model", project.model], ["Type", project.type], ["Last edited", project.lastEdited]]} /><DetailBlock title="Generation settings" items={[["Generations", String(project.generations)], ["Storage", project.storage], ["Status", project.status], ["Seed", "Auto"]]} /><div className="mt-4 grid grid-cols-2 gap-2"><DetailButton icon={Download} label="Download" /><DetailButton icon={Share2} label="Export" /><DetailButton icon={FileClock} label="Versions" /><DetailButton icon={Clock3} label="Timeline" /></div><p className="mt-5 text-[9px] font-semibold uppercase tracking-[.18em] text-white/40">Assets & history</p><div className="mt-2 space-y-1.5">{["Initial concept", "Direction update", "Final output"].map((item, index) => <div key={item} className="flex items-center gap-2 rounded-[7px] bg-white/[.035] px-2.5 py-2 text-[10px] text-white/63"><span className="grid size-4 place-items-center rounded-full bg-cyan-400/15 text-[8px] text-cyan-200">{index + 1}</span>{item}<span className="ml-auto text-[9px] text-white/30">{index + 1}h</span></div>)}</div></aside>;
}

function DetailBlock({ title, items }: { title: string; items: string[][] }) { return <div className="mt-5 border-t border-white/[.07] pt-4"><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/40">{title}</p><dl className="mt-2 space-y-2">{items.map(([key, value]) => <div key={key} className="flex justify-between text-[10px]"><dt className="text-white/42">{key}</dt><dd className="text-white/78">{value}</dd></div>)}</dl></div>; }
function DetailButton({ icon: Icon, label }: { icon: typeof Download; label: string }) { return <button className="flex items-center gap-1.5 rounded-[7px] border border-white/[.08] bg-white/[.035] px-2 py-2 text-[9px] text-white/65 hover:bg-white/[.08]"><Icon className="size-3" />{label}</button>; }
function EmptyProjects() { return <div className="grid h-full place-items-center text-center"><div><div className="mx-auto grid size-14 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/[.07] text-cyan-200"><SlidersHorizontal className="size-5" /></div><h3 className="mt-4 text-sm font-semibold">No projects here yet</h3><p className="mt-2 max-w-[240px] text-[11px] leading-5 text-white/44">Start a project and your working worlds will appear in this space.</p><button className="mt-4 rounded-[7px] bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-2 text-[10px] font-semibold text-slate-950">Create New Project</button></div></div>; }
function statusColor(status: Project["status"]) { return status === "Completed" ? "bg-emerald-400/12 text-emerald-200" : status === "Generating" ? "bg-cyan-400/12 text-cyan-200" : status === "Failed" ? "bg-rose-400/12 text-rose-200" : "bg-violet-400/12 text-violet-200"; }

function ProjectsRail({ active }: { active: string }) {
  return <aside className="hidden w-[248px] shrink-0 p-3 lg:block"><div className="flex h-[calc(100dvh-24px)] flex-col rounded-[18px] border border-white/[.1] bg-[linear-gradient(165deg,rgba(11,18,33,.86),rgba(5,8,16,.78))] p-3 shadow-[0_24px_64px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-[30px]"><div className="flex items-center gap-2.5 px-2 py-1"><span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#16c7e4,#526cff,#bb61ff)] text-sm font-black">N</span><span><b className="font-[family-name:var(--font-display)] text-[14px] tracking-[.12em]">NORO</b><i className="mt-0.5 block text-[8px] not-italic tracking-[.24em] text-white/45">STUDIO</i></span></div><div className="mt-8 space-y-1">{["Studio","Projects","Assets","Workflows","Models","Community","API","Settings"].map((label, index) => <button key={label} className={`flex h-10 w-full items-center gap-3 rounded-[9px] px-3 text-left text-[12px] ${label === active ? "bg-[linear-gradient(90deg,rgba(4,128,186,.72),rgba(12,112,185,.37))] text-white ring-1 ring-cyan-300/25" : "text-white/55 hover:bg-white/[.055] hover:text-white"}`}><span className="grid size-4 place-items-center text-[10px]">{index + 1}</span>{label}</button>)}</div><div className="mt-auto rounded-xl border border-violet-400/25 bg-violet-950/20 p-3"><p className="text-[10px] font-semibold text-violet-200">NORO PRO</p><p className="mt-2 text-[10px] text-white/45">Unlimited ideas, ready when you are.</p><button className="mt-3 w-full rounded-[6px] bg-gradient-to-r from-fuchsia-600 to-blue-500 py-2 text-[10px]">Upgrade</button></div></div></aside>;
}
function ProjectsHeader({ onSearch }: { onSearch: (value: string) => void }) { return <header className="flex h-[72px] items-center px-5"><div className="flex h-10 w-[240px] items-center gap-2 rounded-[9px] border border-white/[.09] bg-[#080c17]/55 px-3"><Search className="size-4 text-white/38" /><input onChange={(event) => onSearch(event.target.value)} className="w-full bg-transparent text-[11px] text-white/70 outline-none placeholder:text-white/35" placeholder="Search studio" /></div><div className="ml-auto flex items-center gap-3"><span className="rounded-[8px] border border-white/[.09] bg-white/[.025] px-3 py-2 text-[10px] text-white/70">12,450 credits</span><span className="grid size-8 place-items-center rounded-full bg-slate-800 text-[10px]">Q</span></div></header>; }

function ProjectsBackdrop() { return <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute inset-0 bg-[#04060d]" /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_53%_12%,rgba(19,94,176,.17),transparent_30%),radial-gradient(ellipse_at_75%_40%,rgba(126,51,195,.12),transparent_30%)]" /><div className="absolute right-[-10%] top-[5%] size-[600px] rounded-full bg-fuchsia-500/10 blur-3xl" /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(1,2,7,.85)_100%)]" /></div>; }
