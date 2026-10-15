import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { Article } from '../types/blog';
import { AUTHOR_CONFIG } from '../data/authorConfig';

interface FeaturedArticleHeroProps {
  article: Article;
  onReadFullStory: () => void;
}

export const FeaturedArticleHero: React.FC<FeaturedArticleHeroProps> = ({
  article,
  onReadFullStory,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C7FF4A]">
            FLAGSHIP EDITORIAL STORY
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-display text-[#F5F5F0] tracking-tight">
            Featured Chronicle
          </h2>
        </div>
        <div className="text-xs text-[#9699A5] font-mono">
          <span>VOL. 01</span>
          <span className="mx-2">/</span>
          <span>ISSUE #01</span>
        </div>
      </div>

      {/* Featured Card Container */}
      <div 
        onClick={onReadFullStory}
        className="group relative rounded-3xl bg-[#11131A] border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(199,255,74,0.08)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Visual Cover (7 cols) */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden bg-[#08090D]">
            {!imageError ? (
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : null}

            {/* Styled CSS Fallback if Image fails to load */}
            {imageError && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#11131A] via-[#151822] to-[#08090D] text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#C7FF4A]/10 border border-[#C7FF4A]/20 flex items-center justify-center text-[#C7FF4A] mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-[#F5F5F0]">{article.title}</h3>
                <p className="mt-2 text-xs text-[#9699A5] max-w-sm">From Curiosity to Code — High-Resolution Editorial Cover</p>
              </div>
            )}

            {/* Gradient Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#11131A] hidden lg:block" />
          </div>

          {/* Editorial Content (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata (Zero-Pill Rule) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9699A5] font-mono mb-4">
                <span className="text-[#C7FF4A] font-semibold">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedDate}</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0] leading-snug group-hover:text-[#C7FF4A] transition-colors">
                {article.title}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#9699A5] leading-relaxed">
                {article.subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#F5F5F0]/80 leading-relaxed font-serif italic border-l-0 pl-0">
                “{article.excerpt}”
              </p>
            </div>

            {/* Footer with Author & CTA */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#181A24] to-[#08090D] border border-[#C7FF4A]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(199,255,74,0.15)]">
                  <span className="font-display font-black text-xs tracking-tighter text-[#C7FF4A]">
                    IS
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#F5F5F0]">{article.author}</div>
                  <div className="text-[11px] text-[#9699A5]">Author & Learner</div>
                </div>
              </div>

              <button
                type="button"
                className="group/btn inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#08090D] bg-[#C7FF4A] hover:bg-[#d8ff7a] rounded-xl transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4A]"
              >
                <span>Read the Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
