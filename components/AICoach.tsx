import React, { useState } from 'react';
import { fetchCheckoutAdvice } from '../services/geminiService';
import { Brain, ArrowRight, Loader2, Calculator } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AICoach: React.FC = () => {
  const [score, setScore] = useState<string>("");
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    const scoreNum = parseInt(score);
    if (isNaN(scoreNum) || scoreNum < 2) return;

    setLoading(true);
    setAdvice(null);
    try {
      const result = await fetchCheckoutAdvice(scoreNum);
      setAdvice(result);
    } catch (error) {
      setAdvice("Oops, the coach is taking a break. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-900/30 rounded-xl mb-4">
            <Brain className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-4xl font-extrabold text-white font-serif">AI Checkout Coach</h2>
          <p className="mt-4 text-xl text-slate-400">
            Enter your remaining score. Get the optimal path to victory.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl">
          <form onSubmit={handleGetAdvice} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calculator className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Ex: 121"
                min="2"
                max="501"
                className="block w-full pl-10 pr-3 py-4 border border-slate-700 rounded-xl leading-5 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading || !score}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Get Advice <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {advice && (
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 animate-fade-in">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Coach Suggests:</h3>
              <div className="prose prose-invert prose-lg max-w-none text-indigo-100">
                <ReactMarkdown>{advice}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Quick Cheat Sheet */}
          <div className="mt-12 border-t border-slate-800 pt-8">
            <h3 className="text-lg font-medium text-white mb-4">Common Finishes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { score: 170, path: 'T20 T20 Bull' },
                { score: 167, path: 'T20 T19 Bull' },
                { score: 164, path: 'T20 T18 Bull' },
                { score: 161, path: 'T20 T17 Bull' },
              ].map((item) => (
                <div key={item.score} className="bg-slate-950 p-4 rounded-lg text-center border border-slate-800">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">{item.score}</div>
                  <div className="text-xs text-slate-400 font-mono">{item.path}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;