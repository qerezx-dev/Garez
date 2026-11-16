"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, FolderKanban, Layers, Workflow, Cpu, Users, 
  Code2, Settings, Crown, Bell, Search, Sparkles, Image as ImageIcon, 
  Video, Music, Mic, FileText, Wand2, Play, ChevronRight, Compass, Plus
} from "lucide-react";

export function StudioShell() {
  const [activeTab, setActiveTab] = useState("studio");
  const [credits, setCredits] = useState(12450);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#05060E] text-slate-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* TOP HEADER */}
      <header className="h-16 border-b border-white/10 bg-[#05060E]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8 w-1/3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="font-black text-lg tracking-wider text-white">N</span>
            </div>
            <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              NORO <span className="text-purple-400 font-light">STUDIO</span>
            </span>
          </div>
        </div>

        <div className="w-1/3 max-w-md hidden md:flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 border border-white/5 font-mono">⌘ K</span>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end w-1/3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-sm font-semibold text-amber-300">{credits.toLocaleString()} Credits</span>
            <button className="w-6 h-6 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white text-xs font-bold transition-all">+</button>
          </div>
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-0.5">
            <div className="w-full h-full bg-[#05060E] rounded-full flex items-center justify-center overflow-hidden font-bold text-xs">
              qR
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTAINER */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-64 border-r border-white/10 bg-[#05060E]/50 backdrop-blur-md p-4 hidden md:flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-1">
              <button onClick={() => setActiveTab("studio")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'studio' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <LayoutDashboard className="w-4 h-4" /> Studio
              </button>
              <button onClick={() => setActiveTab("projects")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <FolderKanban className="w-4 h-4" /> Projects
              </button>
              <button onClick={() => setActiveTab("assets")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'assets' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Layers className="w-4 h-4" /> Assets
              </button>
              <button onClick={() => setActiveTab("workflows")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'workflows' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Workflow className="w-4 h-4" /> Workflows
              </button>
              <button onClick={() => setActiveTab("models")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'models' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Cpu className="w-4 h-4" /> Models
              </button>
              <button onClick={() => setActiveTab("community")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'community' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Users className="w-4 h-4" /> Community
              </button>
              <button onClick={() => setActiveTab("api")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'api' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Code2 className="w-4 h-4" /> API
              </button>
              <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 via-purple-600/10 to-transparent border border-purple-500/20 relative overflow-hidden">
              <Crown className="w-6 h-6 text-purple-400 mb-2" />
              <h4 className="font-bold text-sm text-white">NORO PRO</h4>
              <p className="text-xs text-slate-400 mt-1 mb-3">Unlimited generations, Priority access, Premium models</p>
              <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 transition-all">
                Upgrade Now
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Credits</span>
                <span className="text-amber-300">12,450</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></div>
              </div>
              <p className="text-[10px] text-slate-500">Resets on 1 June 2026</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 px-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold">qR</div>
                <div>
                  <p className="text-xs font-bold text-white">qaRez</p>
                  <p className="text-[10px] text-purple-400 font-medium">Pro Plan</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-8 overflow-y-auto space-y-8">
          
          {activeTab === 'studio' && (
            <div className="space-y-8">
              
              {/* HERO BANNER & PROMPT BOX */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B0D19] via-[#120D26] to-[#0A1128] border border-white/10 p-8 shadow-2xl">
                <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                        Create Anything <br />with <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">AI✨</span>
                      </h1>
                      <p className="text-slate-400 text-sm lg:text-base max-w-xl">
                        All-in-one AI studio to generate, edit and bring your ideas to life.
                      </p>
                    </div>

                    {/* PROMPT BOX */}
                    <div className="p-3 rounded-2xl bg-[#05060E]/80 border border-purple-500/30 shadow-2xl backdrop-blur-xl space-y-3">
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                        className="w-full bg-transparent border-none text-sm text-slate-100 focus:outline-none resize-none placeholder:text-slate-500 px-2"
                        placeholder="Describe your idea..."
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all">
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                          <button className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all">
                            <ImageIcon className="w-3.5 h-3.5 text-purple-400" /> Image ▾
                          </button>
                          <button className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all">
                            <Wand2 className="w-3.5 h-3.5 text-cyan-400" /> Style ▾
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                          </button>
                          <button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
                          >
                            {isGenerating ? "Generating..." : <><Sparkles className="w-4 h-4" /> Generate</>}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Try these:</span>
                      <button onClick={() => setPrompt("Cyberpunk city at night")} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all">Cyberpunk city</button>
                      <button onClick={() => setPrompt("Ocean sunset with vivid colors")} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all">Ocean sunset</button>
                      <button onClick={() => setPrompt("Fantasy castle in mountains")} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all">Fantasy castle</button>
                      <button onClick={() => setPrompt("Professional product photo studio")} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all">Product photo</button>
                    </div>
                  </div>

                  {/* LIVE PREVIEW BOX */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-200">Live Preview</span>
                      <span className="text-xs text-cyan-400 flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Ready
                      </span>
                    </div>

                    <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl flex items-center justify-center group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 via-transparent to-cyan-900/40"></div>
                      <div className="w-16 h-16 rounded-full bg-purple-600/90 backdrop-blur-md flex items-center justify-center text-white shadow-2xl cursor-pointer group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1 fill-white" />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <span>Cyberpunk Drive • 4K</span>
                        <span className="text-purple-400 font-mono">00:10</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="aspect-video rounded-xl bg-purple-900/20 border border-purple-500/40 overflow-hidden relative cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center opacity-70"></div>
                      </div>
                      <div className="aspect-video rounded-xl bg-white/5 border border-white/10 overflow-hidden relative cursor-pointer opacity-60 hover:opacity-100 transition-opacity"></div>
                      <div className="aspect-video rounded-xl bg-white/5 border border-white/10 overflow-hidden relative cursor-pointer opacity-60 hover:opacity-100 transition-opacity"></div>
                      <div className="aspect-video rounded-xl bg-white/5 border border-white/10 overflow-hidden relative cursor-pointer opacity-60 hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI TOOLS GRID */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">AI Tools</h2>
                    <p className="text-sm text-slate-400">Everything you need to create in one place.</p>
                  </div>
                  <button className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    Customize Studio <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  
                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Video</h3>
                      <p className="text-xs text-slate-400 mt-1">Generate cinematic videos from text or images</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-cyan-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Image</h3>
                      <p className="text-xs text-slate-400 mt-1">Create stunning images in any style</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-pink-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                      <Music className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Music</h3>
                      <p className="text-xs text-slate-400 mt-1">Compose original music with AI</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-emerald-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Mic className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Voice</h3>
                      <p className="text-xs text-slate-400 mt-1">Generate realistic voices and speech</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-cyan-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Code</h3>
                      <p className="text-xs text-slate-400 mt-1">Write, edit and debug code with AI</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-amber-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Documents</h3>
                      <p className="text-xs text-slate-400 mt-1">Generate docs, reports and more</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Design</h3>
                      <p className="text-xs text-slate-400 mt-1">Create logos, UI, banners and more</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 hover:border-teal-500/50 transition-all group cursor-pointer space-y-4 shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">AI Agent</h3>
                      <p className="text-xs text-slate-400 mt-1">Your smart assistant for everything</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* WORKFLOW BANNER */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0B0D19] to-cyan-950/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-purple-400" /> Build. Create. Automate.
                  </h3>
                  <p className="text-xs text-slate-400">Workflows let you connect AI tools and automate your creative process.</p>
                </div>
                <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all">
