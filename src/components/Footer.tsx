import React from 'react';
import { ArrowUp, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { AUTHOR_CONFIG } from '../data/authorConfig';

interface FooterProps {
  onNavigate: (view: 'home' | 'story' | 'stories' | 'projects' | 'about') => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#08090D] text-[#9699A5] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between">
          
          {/* Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-lg font-bold font-display text-[#F5F5F0] tracking-tight">
              ISHFAQ SHAFI
            </div>
            <p className="text-xs text-[#9699A5] leading-relaxed max-w-sm">
              Beyond the Code — An editorial publication chronicling the journey of a self-taught developer and cybersecurity learner.
            </p>
            <div className="text-xs font-mono text-[#C7FF4A]">
              “Never stop being curious.”
            </div>
          </div>

          {/* Quick Nav Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col sm:flex-row gap-8 sm:gap-12 text-xs">
            <div className="space-y-3">
              <div className="font-mono text-[#F5F5F0] uppercase tracking-wider text-[11px]">
                PUBLICATION
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="hover:text-[#F5F5F0] transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('story')}
                    className="hover:text-[#F5F5F0] transition-colors"
                  >
                    Featured Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('stories')}
                    className="hover:text-[#F5F5F0] transition-colors"
                  >
                    Stories Index
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-[#F5F5F0] uppercase tracking-wider text-[11px]">
                AUTHOR
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-[#F5F5F0] transition-colors"
                  >
                    About Ishfaq
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('projects')}
                    className="hover:text-[#F5F5F0] transition-colors"
                  >
                    Projects & Lab
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenContact}
                    className="hover:text-[#F5F5F0] transition-colors"
                  >
                    Get in Touch
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect & Top Action (3 cols) */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-4">
            <div className="flex items-center gap-3">
              <a
                href={AUTHOR_CONFIG.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#11131A] hover:bg-white/10 text-[#9699A5] hover:text-[#C7FF4A] border border-white/5 transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={AUTHOR_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#11131A] hover:bg-white/10 text-[#9699A5] hover:text-[#C7FF4A] border border-white/5 transition-colors"
                aria-label="Twitter / X profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={AUTHOR_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#11131A] hover:bg-white/10 text-[#9699A5] hover:text-[#C7FF4A] border border-white/5 transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenContact}
                className="p-2 rounded-lg bg-[#11131A] hover:bg-white/10 text-[#9699A5] hover:text-[#C7FF4A] border border-white/5 transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#9699A5] hover:text-[#C7FF4A] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9699A5]/80">
          <div>
            © {new Date().getFullYear()} Ishfaq Shafi · Beyond the Code. All rights reserved.
          </div>
          <div className="font-mono text-[#9699A5]/60">
            Obsidian #08090D · Electric Lime #C7FF4A · Vivid Violet #9270FF
          </div>
        </div>

      </div>
    </footer>
  );
};
