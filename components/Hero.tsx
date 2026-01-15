import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, History, Brain, Dumbbell, Sparkles } from 'lucide-react';
import { fetchDailyTip } from '../services/geminiService';

const Hero: React.FC = () => {
  const [tip, setTip] = useState<string>("Loading your daily pro tip...");

  useEffect(() => {
    fetchDailyTip().then(setTip);
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-950 pt-10 pb-24">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Dartboard Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Daily Tip Banner */}
        <div className="mb-8 max-w-3xl w-full bg-emerald-900/30 backdrop-blur-md border border-emerald-500/30 rounded-full px-6 py-2 flex items-center justify-center space-x-3 shadow-lg animate-fade-in-up">
          <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm md:text-base text-emerald-100 font-medium truncate md:overflow-visible md:whitespace-normal">
            <span className="font-bold text-emerald-400">Daily Tip:</span> {tip}
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg font-serif">
          Precision. Focus. <span className="text-emerald-500">Mastery.</span>
        </h1>
        <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          The ultimate companion for darts enthusiasts. Train with AI, track your 501 games, and explore the history of the sport.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl px-4">
          <Link 
            to="/practice" 
            className="group flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-700 hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-900/40"
          >
            <Dumbbell className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Practice
          </Link>
          <Link 
            to="/coach" 
            className="group flex items-center justify-center px-6 py-4 border border-slate-700 text-base font-medium rounded-xl text-indigo-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white transition-all backdrop-blur-sm"
          >
            <Brain className="w-5 h-5 mr-2 group-hover:text-indigo-400 transition-colors" />
            AI Coach
          </Link>
          <Link 
            to="/market" 
            className="group flex items-center justify-center px-6 py-4 border border-slate-700 text-base font-medium rounded-xl text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white transition-all backdrop-blur-sm"
          >
            <Trophy className="w-5 h-5 mr-2 group-hover:text-yellow-400 transition-colors" />
            Pro Shop
          </Link>
          <Link 
            to="/encyclopedia" 
            className="group flex items-center justify-center px-6 py-4 border border-slate-700 text-base font-medium rounded-xl text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white transition-all backdrop-blur-sm"
          >
            <History className="w-5 h-5 mr-2 group-hover:text-red-400 transition-colors" />
            History
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 bg-emerald-900/50 rounded-lg flex items-center justify-center mb-4">
              <Dumbbell className="text-emerald-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Practice Arena</h3>
            <p className="text-slate-400">Track your 501 matches with our interactive scoreboard. Perfect for friendly matches or solo training.</p>
          </div>
          <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-colors">
             <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4">
              <Brain className="text-indigo-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Checkout Coach</h3>
            <p className="text-slate-400">Stuck on a tricky number? Our AI coach calculates the optimal checkout path instantly.</p>
          </div>
          <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-xl border border-slate-800 hover:border-red-500/30 transition-colors">
             <div className="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center mb-4">
              <History className="text-red-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Expert Knowledge</h3>
            <p className="text-slate-400">Access a vast library of darts history, rules, and terminology generated by expert AI models.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;