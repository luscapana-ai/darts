import React, { useState } from 'react';
import { EncyclopediaTopic } from '../types';
import { fetchDartsContent } from '../services/geminiService';
import { Book, Loader2, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Encyclopedia: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setError(null);
    setContent(""); // Clear previous content

    try {
      const result = await fetchDartsContent(topic);
      setContent(result);
    } catch (err) {
      setError("Failed to load article. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-serif">
            The Darts Knowledge Base
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Powered by Gemini AI. Select a topic to generate a comprehensive guide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-lg font-medium text-emerald-500 mb-4 px-3 flex items-center">
              <Book className="w-5 h-5 mr-2" />
              Topics
            </h3>
            {Object.values(EncyclopediaTopic).map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                disabled={loading && selectedTopic === topic}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border ${
                  selectedTopic === topic
                    ? 'bg-emerald-900/40 border-emerald-500/50 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 min-h-[500px] shadow-xl relative overflow-hidden">
              {!selectedTopic ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                  <Info className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">Select a topic from the sidebar to begin.</p>
                </div>
              ) : (
                <>
                  <div className="border-b border-slate-800 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-white font-serif">{selectedTopic}</h1>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                      <p className="text-slate-400 animate-pulse">Consulting the archives...</p>
                    </div>
                  ) : error ? (
                    <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 text-red-400">
                      {error}
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-emerald max-w-none">
                       {/* Using a simple markdown display. In a real app, I'd use a library, but sticking to basic text rendering logic for simplicity or a simple library if allowed. 
                           Wait, 'react-markdown' is a very standard library. I will use it for cleanliness.
                       */}
                       <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encyclopedia;