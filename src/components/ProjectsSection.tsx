import React from 'react';
import { ExternalLink, Code2, Terminal, Shield, Sparkles, FolderGit2 } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { AUTHOR_CONFIG } from '../data/authorConfig';

export const ProjectsSection: React.FC = () => {
  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C7FF4A]">
            CODE & LAB EXPERIMENTS
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-bold font-display text-[#F5F5F0] tracking-tight">
            Selected Works
          </h2>
          <p className="mt-3 text-sm text-[#9699A5]">
            Practical software utilities, network probers, and experimental creative tools built through hands-on learning.
          </p>
        </div>

        <a
          href={AUTHOR_CONFIG.socials.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#C7FF4A] hover:underline"
        >
          <FolderGit2 className="w-4 h-4" />
          <span>View GitHub Repositories</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="flex flex-col justify-between p-8 rounded-2xl bg-[#11131A] border border-white/5 hover:border-white/20 transition-all duration-300 group"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs font-mono text-[#9699A5] mb-4">
                <span className="text-[#9270FF]">{proj.category}</span>
                <span>{proj.status}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold font-display text-[#F5F5F0] group-hover:text-[#C7FF4A] transition-colors">
                {proj.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-[#9699A5] leading-relaxed">
                {proj.description}
              </p>
            </div>

            {/* Technologies & Links */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-[#F5F5F0]/70 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#C7FF4A] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Source Code</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {proj.liveUrl && proj.liveUrl !== '#' && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F5F5F0] hover:text-[#C7FF4A] inline-flex items-center gap-1.5"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
