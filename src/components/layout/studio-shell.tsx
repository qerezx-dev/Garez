"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, Wand2, Video, Image as ImageIcon, Music, 
  ShoppingBag, Users, Crown, Bell, Play, RotateCcw, Sparkles 
} from "lucide-react";

export function StudioShell() {
  const [activeTab, setActiveTab] = useState("ai-studio");
  const [credits, setCredits] = useState(12450);
  const [prompt, setPrompt] = useState("A futuristic cyberpunk city at night, rain reflecting purple and blue lights on wet asphalt, flying vehicles streaking overhead...");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Noro Cinema XL");
  const [duration, setDuration] = useState("8s");

  const handleGenerate = () => {
    if (credits < 9) return;
    setIsGenerating(true);
    setCredits(prev => prev - 9);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#05060E] text-slate-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      <header className="h-16 border-b border-white/10 bg-[#05060E]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="font-black text-lg tracking-wider text-white">N</span>
            </div>
            <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              NORO <span className="text-purple-400 font-light">Studio</span>
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-1 ml-8 text-sm font-medium text-slate-400">
            <button onClick={() => setActiveTab("ai-studio")} className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'ai-studio' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'hover:text-white'}`}>Stüdyo</button>
            <button onClick={() => setActiveTab("marketplace")} className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'marketplace' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'hover:text-white'}`}>Pazar Yeri</button>
            <button onClick={() => setActiveTab("community")} className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'community' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'hover:text-white'}`}>Topluluk</button>
            <button onClick={() => setActiveTab("analytics")} className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'analytics' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'hover:text-white'}`}>Analitik</button>
            <button onClick={() => setActiveTab("games")} className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'games' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'hover:text-white'}`}>Oynamak</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-sm font-semibold text-amber-300">{credits.toLocaleString()} cr</span>
            <button className="w-6 h-6 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white text-xs font-bold transition-all">+</button>
          </div>
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-0.5">
            <div className="w-full h-full bg-[#05060E] rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-xs font-bold text-white">QC</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        <aside className="w-64 border-r border-white/10 bg-[#05060E]/50 backdrop-blur-md p-4 hidden md:flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Ana Menü</p>
              <div className="space-y-1">
                <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </button>
                <button onClick={() => setActiveTab("ai-studio")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'ai-studio' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Wand2 className="w-4 h-4" /> AI Studio
                </button>
                <button onClick={() => setActiveTab("image-to-video")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'image-to-video' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Video className="w-4 h-4" /> Image to Video
                </button>
                <button onClick={() => setActiveTab("ai-image")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'ai-image' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <ImageIcon className="w-4 h-4" /> AI Image
                </button>
                <button onClick={() => setActiveTab("ai-music")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'ai-music' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Music className="w-4 h-4" /> AI Music
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Keşfet</p>
              <div className="space-y-1">
                <button onClick={() => setActiveTab("marketplace")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'marketplace' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <ShoppingBag className="w-4 h-4" /> Marketplace
                </button>
                <button onClick={() => setActiveTab("community")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'community' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <Users className="w-4 h-4" /> Topluluk
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 via-purple-600/10 to-transparent border border-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
            <Crown className="w-6 h-6 text-purple-400 mb-2" />
            <h4 className="font-bold text-sm text-white">NORO PRO</h4>
            <p className="text-xs text-slate-400 mt-1 mb-3">Sinirsiz nesil, oncelikli kuyruk ve premium modeller.</p>
            <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 transition-all">
              PRO Pakete Gec
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {activeTab === 'ai-studio' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              <div className="xl:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 shadow-2xl backdrop-blur-xl relative">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" /> Prompt
                    </label>
                    <span className="text-xs text-slate-500">{prompt.length} / 2000</span>
                  </div>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="w-full bg-[#05060E] border border-white/10 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-purple-500 transition-all resize-none"
                    placeholder="Describe your vision..."
                  />

                  <div className="flex items-center gap-2 mt-3">
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-purple-300 flex items-center gap-1.5 transition-all">
                      <Sparkles className="w-3.5 h-3.5" /> İyileştir
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-cyan-300 flex items-center gap-1.5 transition-all">
                      <RotateCcw className="w-3.5 h-3.5" /> Yeniden Yaz
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B0D19] border border-white/10 shadow-2xl space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Model</label>
                      <select 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full bg-[#05060E] border border-white/10 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                      >
                        <option>Noro Cinema XL</option>
                        <option>GPT-4o Mini</option>
                        <option>VEO 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Süre</label>
                      <select 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full bg-[#05060E] border border-white/10 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                      >
                        <option>4s</option>
                        <option>8s</option>
                        <option>16s</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 text-white rounded-xl font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Oluşturuluyor...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" /> Oluştur & Önyizle <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full ml-2">9 cr</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="xl:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-[#0B0D19] border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <Play className="w-4 h-4 text-cyan-400" /> Live Preview
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Ready
                    </span>
                  </div>

                  <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative group border border-white/10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-cyan-900/40"></div>
                    <div className="w-16 h-16 rounded-full bg-purple-600/80 backdrop-blur-md flex items-center justify-center text-white shadow-2xl cursor-pointer group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1 fill-white" />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Timeline (0s / 8s)</span>
                      <span>4K • 30fps</span>
                    </div>
                    <div className="h-12 bg-[#05060E] rounded-xl border border-white/10 flex items-center px-3 gap-2 relative overflow-hidden">
                      <div className="h-8 bg-purple-600/30 border border-purple-500/50 rounded-lg w-1/3 flex items-center px-2 text-xs font-semibold text-purple-200">
                        Cyberpunk Drive
                      </div>
                      <div className="h-8 bg-cyan-600/30 border border-cyan-500/50 rounded-lg w-1/4 flex items-center px-2 text-xs font-semibold text-cyan-200">
                        Neon Rain
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-[#0B0D19] to-cyan-900/20 border border-white/10 relative overflow-hidden">
                <h1 className="text-2xl font-bold text-white mb-2">Hayal Gücünü Hayata Geçir</h1>
                <p className="text-slate-400 text-sm">Fikirlerin, yapay zekamız. Sonsuz olasılıklar.</p>
              </div>
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Marketplace & Şablonlar</h2>
              <p className="text-sm text-slate-400">Topluluğun oluşturduğu en iyi promptlar ve görseller burada.</p>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Topluluk Akışı</h2>
              <p className="text-sm text-slate-400">Diğer yaratıcıların paylaştığı son eserleri inceleyin.</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Analitik & Performans</h2>
              <p className="text-sm text-slate-400">GPU kullanım oranları ve günlük üretim istatistikleri.</p>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Oynamak (Play & Earn)</h2>
              <p className="text-sm text-slate-400">Günlük görevler ve turnuvalarla ekstra kredi kazan.</p>
            </div>
          )}

        </main>

        <aside className="w-80 border-l border-white/10 bg-[#05060E]/50 backdrop-blur-md p-4 hidden 2xl:block space-y-6 overflow-y-auto">
          <div className="p-4 rounded-2xl bg-[#0B0D19] border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sistem Durumu</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">GPU Kullanımı</span>
                <span className="font-bold text-cyan-400">63%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[63%] h-full bg-cyan-400 rounded-full"></div>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">VRAM</span>
                <span className="font-bold text-white">12.4 / 16 GB</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0D19] border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Render Kuyruğu (2)</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="font-medium text-slate-200">Galaxy Warp</span>
                <span className="text-emerald-400 font-bold">Aktif</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="font-medium text-slate-400">Neon City Drive</span>
                <span className="text-slate-500">Sırada</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      <footer className="h-10 border-t border-white/10 bg-[#05060E] px-6 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Sistem: Optimal</span>
          <span>•</span>
          <span>Aktif Model: {selectedModel}</span>
        </div>
        <div>
          <span>NORO Studio v4.0.2 • © 2026</span>
        </div>
      </footer>

    </div>
  );
}
