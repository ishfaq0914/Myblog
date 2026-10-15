import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { AUTHOR_CONFIG } from '../data/authorConfig';

interface HeroProps {
  onExploreStory: () => void;
  onDiscoverWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreStory, onDiscoverWork }) => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-12 pb-16 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background glows */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#9270FF]/10 blur-[130px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#C7FF4A]/5 blur-[120px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Top Author Signature Badge */}
      <div className="pt-4 pb-6">
        <div className="inline-flex items-center gap-2.5 text-xs tracking-wider uppercase text-[#9699A5] border border-white/10 px-3.5 py-1.5 rounded-full bg-white/[0.02]">
          <span className="text-[#C7FF4A] font-semibold">Author & Engineer</span>
          <span className="text-white/20">/</span>
          <span className="text-[#F5F5F0] font-medium tracking-normal">{AUTHOR_CONFIG.name}</span>
        </div>
      </div>

      {/* Central Hero Grid: Split between Bold Editorial Typography & Visual Node Art */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        
        {/* Left Column: Bold Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-[#F5F5F0] leading-[0.98] font-display text-balance">
            CURIOSITY<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F0] via-[#C7FF4A] to-[#9270FF]">
              BUILDS
            </span><br />
            THE FUTURE.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-[#9699A5] max-w-xl leading-relaxed font-sans">
            A self-taught journey through code, cybersecurity, creativity, and everything in between.
          </p>

          {/* Interactive CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreStory}
              className="group px-6 py-3.5 text-sm font-semibold text-[#08090D] bg-[#C7FF4A] hover:bg-[#d8ff7a] rounded-xl transition-all duration-200 inline-flex items-center gap-2.5 shadow-lg shadow-[#C7FF4A]/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4A]"
            >
              <span>Explore My Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onDiscoverWork}
              className="px-6 py-3.5 text-sm font-medium text-[#F5F5F0] hover:text-[#C7FF4A] bg-[#11131A] hover:bg-[#151822] border border-white/10 rounded-xl transition-all duration-200 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9270FF]"
            >
              <span>Discover My Work</span>
            </button>
          </div>
        </div>

        {/* Right Column: Abstract Interactive Digital Matrix & Node Visual (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl bg-[#11131A]/80 border border-white/10 p-6 shadow-2xl backdrop-blur-sm overflow-hidden group">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#9270FF]/15 blur-3xl pointer-events-none" />
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs text-[#9699A5]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-2 font-mono text-[11px] text-[#9699A5]">ishfaq@terminal:~/journey</span>
              </div>
              <span className="font-mono text-[11px] text-[#C7FF4A]">active_session</span>
            </div>

            {/* Stylized code and interactive telemetry snippet */}
            <div className="pt-4 font-mono text-xs space-y-3">
              <div className="text-[#9699A5] flex items-center gap-2">
                <span className="text-[#C7FF4A]">$</span>
                <span>python3 -m core.analytical_mind</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#08090D] border border-white/5 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-[#F5F5F0]">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#9270FF]" />
                    <span>Logic Decomposition</span>
                  </span>
                  <span className="text-[#C7FF4A]">Calculus → Code</span>
                </div>
                <div className="flex items-center justify-between text-[#F5F5F0]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#C7FF4A]" />
                    <span>POSIX Environment</span>
                  </span>
                  <span className="text-[#9699A5]">Linux / Shell</span>
                </div>
                <div className="flex items-center justify-between text-[#F5F5F0]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9270FF]" />
                    <span>Defensive Security</span>
                  </span>
                  <span className="text-[#9270FF]">Network Discovery</span>
                </div>
              </div>

              {/* Interactive Node Graph Visualization */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] text-[#9699A5] mb-2">
                  <span>SYSTEM ARCHITECTURE GRAPH</span>
                  <span className="text-[#C7FF4A]">6 Modules Mapped</span>
                </div>
                <svg className="w-full h-28 rounded-lg bg-[#08090D] border border-white/5 p-2" viewBox="0 0 320 100">
                  <defs>
                    <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9270FF" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#C7FF4A" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#9270FF" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Connection Lines */}
                  <line x1="40" y1="50" x2="110" y2="30" stroke="url(#edgeGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="110" y1="30" x2="180" y2="65" stroke="url(#edgeGrad)" strokeWidth="1.5" />
                  <line x1="180" y1="65" x2="250" y2="35" stroke="url(#edgeGrad)" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="250" y1="35" x2="295" y2="50" stroke="url(#edgeGrad)" strokeWidth="1.5" />
                  <line x1="110" y1="30" x2="250" y2="35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  
                  {/* Nodes */}
                  <circle cx="40" cy="50" r="6" fill="#9270FF" />
                  <circle cx="110" cy="30" r="7" fill="#C7FF4A" />
                  <circle cx="180" cy="65" r="5" fill="#F5F5F0" />
                  <circle cx="250" cy="35" r="7" fill="#9270FF" />
                  <circle cx="295" cy="50" r="5" fill="#C7FF4A" />

                  {/* Labels */}
                  <text x="30" y="70" fill="#9699A5" fontSize="8" fontFamily="monospace">STEM</text>
                  <text x="96" y="18" fill="#C7FF4A" fontSize="8" fontFamily="monospace">LINUX</text>
                  <text x="165" y="85" fill="#9699A5" fontSize="8" fontFamily="monospace">RECON</text>
                  <text x="238" y="20" fill="#9270FF" fontSize="8" fontFamily="monospace">DEV</text>
                  <text x="280" y="70" fill="#C7FF4A" fontSize="8" fontFamily="monospace">FUTURE</text>
                </svg>
              </div>

              <div className="text-[11px] text-[#9699A5] flex items-center justify-between pt-1">
                <span>Self-taught roadmap</span>
                <span className="text-[#F5F5F0] italic">“Curiosity builds a foundation.”</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll / Explore Prompter */}
      <div className="pt-10 flex items-center justify-between border-t border-white/5 text-xs text-[#9699A5]">
        <div className="flex items-center gap-3">
          <span className="text-[#F5F5F0] font-medium">BEYOND THE CODE</span>
          <span>·</span>
          <span>Editorial Tech Publication</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Volume I</span>
        </div>

        <button
          onClick={onExploreStory}
          className="group flex items-center gap-2 hover:text-[#C7FF4A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A] rounded p-1"
          aria-label="Scroll to featured story"
        >
          <span className="hidden sm:inline">Read Flagship Article</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
