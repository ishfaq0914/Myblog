import React from 'react';
import { AUTHOR_CONFIG } from '../data/authorConfig';
import { Terminal, Shield, Cpu, Sparkles, ExternalLink, Mail } from 'lucide-react';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Portrait & Quick Dossier (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#11131A] relative shadow-2xl">
            <img
              src={AUTHOR_CONFIG.avatarUrl}
              alt={AUTHOR_CONFIG.name}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover aspect-square"
            />
            <div className="p-6 bg-[#11131A] border-t border-white/5 space-y-4">
              <div>
                <h3 className="text-xl font-bold font-display text-[#F5F5F0]">{AUTHOR_CONFIG.name}</h3>
                <p className="text-xs text-[#9699A5] mt-0.5">{AUTHOR_CONFIG.title}</p>
              </div>

              {/* Status and Location */}
              <div className="space-y-2 text-xs font-mono text-[#9699A5] pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>LOCATION</span>
                  <span className="text-[#F5F5F0]">{AUTHOR_CONFIG.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>DISCIPLINE</span>
                  <span className="text-[#C7FF4A]">STEM & Software</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS</span>
                  <span className="text-[#9270FF]">Class 12 / Self-Taught</span>
                </div>
              </div>

              {/* Direct Mail Action */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={onOpenContact}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-[#08090D] bg-[#C7FF4A] hover:bg-[#d8ff7a] rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send a Message</span>
                </button>
                <a
                  href={AUTHOR_CONFIG.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 text-xs font-medium text-[#F5F5F0] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-colors inline-flex items-center justify-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Pillars (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C7FF4A]">
              BEHIND THE CODE
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-bold font-display text-[#F5F5F0] tracking-tight">
              Curiosity as an Operating System
            </h2>
          </div>

          <div className="space-y-4 text-base text-[#9699A5] leading-relaxed">
            <p>
              Hi, I'm <strong className="text-[#F5F5F0]">Ishfaq Shafi</strong>. I am a self-taught programmer, technology enthusiast, and aspiring software engineer.
            </p>
            <p>
              My journey began outside standard computer science classrooms. Balancing intense preparation for competitive engineering exams alongside Class 12 board syllabi taught me that abstract problems in calculus, electromagnetism, and organic chemistry share the exact same DNA as computational logic.
            </p>
            <p>
              Instead of treating computers as consumer black boxes, I took a screwdriver to their software guts: compiling scripts in Linux, analyzing how packets travel through sockets, and discovering how security testing safeguards real infrastructure.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-[#11131A] border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C7FF4A]/10 text-[#C7FF4A] flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-[#F5F5F0]">Analytical Core</h4>
              <p className="text-xs text-[#9699A5] leading-relaxed">
                Deconstructing ambiguous challenges into discrete mathematical algorithms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11131A] border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#9270FF]/10 text-[#9270FF] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-[#F5F5F0]">Security Mindset</h4>
              <p className="text-xs text-[#9699A5] leading-relaxed">
                Probing network boundaries ethically to build robust, defensive architectures.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11131A] border border-white/5 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-[#F5F5F0]">Creative Synergy</h4>
              <p className="text-xs text-[#9699A5] leading-relaxed">
                Blending motion graphics, 3D text presets, and sleek user interface design.
              </p>
            </div>
          </div>

          {/* Quote Block */}
          <blockquote className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="font-serif italic text-lg text-[#F5F5F0] leading-relaxed">
              “Keep breaking things down. Keep building them back up. Never stop being curious.”
            </p>
            <footer className="mt-3 text-xs font-mono text-[#9699A5]">
              — Ishfaq Shafi, Author & Learner
            </footer>
          </blockquote>
        </div>

      </div>
    </section>
  );
};
