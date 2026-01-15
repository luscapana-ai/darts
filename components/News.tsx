import React, { useEffect, useState } from 'react';
import { fetchNews, NewsArticle } from '../services/geminiService';
import { Newspaper, Calendar, Tag, ArrowRight, Loader2 } from 'lucide-react';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchNews();
        setNews(articles);
      } catch (e) {
        console.error("Failed to load news");
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-3 bg-red-900/30 rounded-xl border border-red-900/50">
            <Newspaper className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-serif">Darts Central News</h2>
            <p className="text-slate-400">Breaking stories from the PDC, WDF, and beyond.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
            <p className="text-slate-400">Fetching latest headlines...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <div 
                key={index} 
                className={`group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-lg ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${index === 0 ? 'h-64 sm:h-80' : 'h-48'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
                  <img 
                    src={`https://picsum.photos/seed/darts${index + 10}/800/600`} 
                    alt="News thumbnail" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/80 text-emerald-200 border border-emerald-500/30 backdrop-blur-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {article.category}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-600/30 backdrop-blur-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {article.date}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors ${index === 0 ? 'text-2xl md:text-3xl font-serif' : 'text-xl'}`}>
                    {article.headline}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                  <button className="flex items-center text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
                    Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-20 bg-slate-900 rounded-xl border border-slate-800">
            <p className="text-slate-400">No news available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;