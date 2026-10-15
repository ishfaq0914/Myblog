import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import { Article } from '../types/blog';

interface StoriesIndexProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const StoriesIndex: React.FC<StoriesIndexProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Unique categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((a) => a.category)));
    return ['ALL', ...cats];
  }, [articles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'ALL' || article.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        article.excerpt.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C7FF4A]">
          CHRONICLES & DISPATCHES
        </span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-bold font-display text-[#F5F5F0] tracking-tight">
          Stories & Research Notes
        </h2>
        <p className="mt-4 text-base text-[#9699A5] leading-relaxed">
          Reflections on self-taught software development, cybersecurity analysis, network protocols, and creative technology.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9699A5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chronicles by title, topic, or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#11131A] border border-white/10 text-sm text-[#F5F5F0] placeholder:text-[#9699A5]/50 focus:outline-none focus:border-[#C7FF4A] focus:ring-1 focus:ring-[#C7FF4A] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9699A5] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Buttons (Interactive Tab Controls per rule 0.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A] ${
                selectedCategory === cat
                  ? 'bg-white/10 text-[#C7FF4A] shadow-sm'
                  : 'text-[#9699A5] hover:text-[#F5F5F0] hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="group flex flex-col justify-between rounded-2xl bg-[#11131A] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer p-6 hover:shadow-xl"
            >
              <div>
                {/* Visual Cover */}
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden bg-[#08090D]">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-transparent" />
                </div>

                {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
                <div className="flex items-center gap-2 text-xs text-[#9699A5] font-mono mb-3">
                  <span className="text-[#C7FF4A]">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{art.publishedDate}</span>
                </div>

                {/* Story Title */}
                <h3 className="text-xl font-bold font-display text-[#F5F5F0] group-hover:text-[#C7FF4A] transition-colors leading-snug">
                  {art.title}
                </h3>

                {/* Story Excerpt */}
                <p className="mt-3 text-sm text-[#9699A5] line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-[#9699A5]">By {art.author}</span>
                <span className="text-xs font-semibold text-[#F5F5F0] group-hover:text-[#C7FF4A] inline-flex items-center gap-1 transition-colors">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center rounded-2xl bg-[#11131A]/60 border border-white/5 p-8">
          <BookOpen className="w-10 h-10 text-[#9699A5] mx-auto mb-4" />
          <h3 className="text-lg font-bold font-display text-[#F5F5F0]">No chronicles found</h3>
          <p className="mt-2 text-sm text-[#9699A5] max-w-sm mx-auto">
            No articles match your query “{searchQuery}”. Try clearing the search or exploring all categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="mt-6 px-4 py-2 text-xs font-semibold text-[#08090D] bg-[#C7FF4A] rounded-lg hover:bg-[#d8ff7a] transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Search & Filter</span>
          </button>
        </div>
      )}
    </section>
  );
};
