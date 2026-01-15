import React, { useState, useEffect } from 'react';
import { Dumbbell, RotateCcw, Trophy, User, ArrowLeft, Target, Zap, Crosshair, Sparkles } from 'lucide-react';
import { fetchTrainingTip } from '../services/geminiService';

// --- SHARED TYPES ---
type GameMode = 'menu' | '501' | 'bobs27' | 'clock';

// --- GAME COMPONENTS ---

// 1. 501 MATCH (Original Logic Refactored)
const X01Game: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const INITIAL_SCORE = 501;
  const [p1, setP1] = useState({ score: INITIAL_SCORE, dartsThrown: 0, history: [] as number[] });
  const [p2, setP2] = useState({ score: INITIAL_SCORE, dartsThrown: 0, history: [] as number[] });
  const [turn, setTurn] = useState<1 | 2>(1);
  const [inputScore, setInputScore] = useState<string>('');
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (winner) return;
    
    const points = parseInt(inputScore);
    if (isNaN(points) || points < 0 || points > 180) {
      alert("Please enter a valid score (0-180)");
      return;
    }

    const currentPlayer = turn === 1 ? p1 : p2;
    const setPlayer = turn === 1 ? setP1 : setP2;
    const remaining = currentPlayer.score - points;

    if (remaining < 0 || remaining === 1) { // Bust
      setPlayer(prev => ({ ...prev, dartsThrown: prev.dartsThrown + 3, history: [...prev.history, 0] }));
      setInputScore('');
      setTurn(turn === 1 ? 2 : 1);
      return;
    }

    if (remaining === 0) { // Win
      setPlayer(prev => ({ score: 0, dartsThrown: prev.dartsThrown + 3, history: [...prev.history, points] }));
      setWinner(turn);
      setInputScore('');
      return;
    }

    setPlayer(prev => ({ score: remaining, dartsThrown: prev.dartsThrown + 3, history: [...prev.history, points] }));
    setInputScore('');
    setTurn(turn === 1 ? 2 : 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <h2 className="text-2xl font-bold text-white font-serif">501 Match</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8">
        {[1, 2].map((playerNum) => {
          const p = playerNum === 1 ? p1 : p2;
          const isTurn = turn === playerNum;
          return (
            <div key={playerNum} className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${isTurn && !winner ? 'bg-slate-900 border-emerald-500 shadow-emerald-900/20 shadow-xl scale-[1.02]' : 'bg-slate-900/50 border-slate-800 opacity-80'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-slate-300">
                  <User className="w-5 h-5" />
                  <span className="font-semibold">Player {playerNum}</span>
                </div>
                {winner === playerNum && <Trophy className="w-6 h-6 text-yellow-400 animate-bounce" />}
              </div>
              <div className="text-6xl md:text-8xl font-bold text-center text-white font-mono tracking-tighter">
                {p.score}
              </div>
              <div className="mt-4 flex justify-between text-xs text-slate-500 uppercase tracking-wider font-semibold">
                <span>Avg: {p.history.length ? (p.history.reduce((a,b)=>a+b,0) / p.history.length).toFixed(1) : '0.0'}</span>
                <span>Darts: {p.dartsThrown}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-md mx-auto">
        {winner ? (
          <div className="text-center bg-emerald-900/20 border border-emerald-500/50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Player {winner} Wins!</h3>
            <button onClick={onBack} className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold">Menu</button>
          </div>
        ) : (
          <form onSubmit={handleScoreSubmit} className="relative">
            <input
              type="number"
              value={inputScore}
              onChange={(e) => setInputScore(e.target.value)}
              placeholder="Enter score"
              className="w-full bg-slate-800 border-2 border-slate-700 text-white text-3xl font-bold text-center py-6 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-900/50 transition-all placeholder:text-slate-600"
              autoFocus
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 rounded-lg font-bold">Enter</button>
          </form>
        )}
      </div>
    </div>
  );
};

// 2. BOB'S 27 (New)
const Bobs27Game: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const DOUBLES = Array.from({ length: 20 }, (_, i) => i + 1); // 1-20
  const [currentDoubleIndex, setCurrentDoubleIndex] = useState(0);
  const [score, setScore] = useState(27);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [aiTip, setAiTip] = useState<string>('');

  useEffect(() => {
    fetchTrainingTip("Bob's 27").then(setAiTip);
  }, []);

  const currentTarget = currentDoubleIndex < 20 ? DOUBLES[currentDoubleIndex] : 25;
  const targetLabel = currentDoubleIndex < 20 ? `D${currentTarget}` : 'Bull';
  const targetValue = currentDoubleIndex < 20 ? currentTarget * 2 : 50; // Bull implies Double Bull (50) usually in Bob's 27

  const handleInput = (hits: number) => {
    let newScore = score;
    if (hits === 0) {
      newScore -= targetValue; // Subtract value of the double missed
    } else {
      newScore += (hits * targetValue); // Add value * hits
    }

    setScore(newScore);

    if (newScore < 0) {
      setGameState('lost');
    } else if (currentDoubleIndex === 20) { // Finished Bull
      setGameState('won');
    } else {
      setCurrentDoubleIndex(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
       <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Exit
        </button>
        <h2 className="text-2xl font-bold text-white font-serif flex items-center"><Zap className="w-5 h-5 text-yellow-400 mr-2"/> Bob's 27</h2>
      </div>

      {aiTip && (
        <div className="mb-6 bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex items-center justify-center gap-2 text-sm text-slate-400">
          <Sparkles className="w-4 h-4 text-emerald-400" /> "{aiTip}"
        </div>
      )}

      {gameState === 'playing' ? (
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl relative">
            <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">Current Target</div>
            <div className="text-6xl font-bold text-emerald-400 mb-6 font-mono">{targetLabel}</div>
            
            <div className="flex items-center justify-center gap-4 mb-2">
               <div className="text-slate-400">Current Score:</div>
               <div className={`text-3xl font-bold ${score < 27 ? 'text-red-400' : 'text-white'}`}>{score}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
             <button onClick={() => handleInput(0)} className="py-4 rounded-xl bg-slate-800 hover:bg-red-900/30 hover:text-red-400 text-slate-300 font-bold border border-slate-700 transition-colors">Miss (0)</button>
             <button onClick={() => handleInput(1)} className="py-4 rounded-xl bg-slate-800 hover:bg-emerald-900/30 hover:text-emerald-400 text-white font-bold border border-slate-700 transition-colors">1 Hit</button>
             <button onClick={() => handleInput(2)} className="py-4 rounded-xl bg-slate-800 hover:bg-emerald-900/30 hover:text-emerald-400 text-white font-bold border border-slate-700 transition-colors">2 Hits</button>
             <button onClick={() => handleInput(3)} className="py-4 rounded-xl bg-slate-800 hover:bg-emerald-900/30 hover:text-emerald-400 text-white font-bold border border-slate-700 transition-colors">3 Hits</button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
           <Trophy className={`w-16 h-16 mx-auto mb-4 ${gameState === 'won' ? 'text-yellow-400' : 'text-slate-600'}`} />
           <h3 className="text-3xl font-bold text-white mb-2">{gameState === 'won' ? 'Challenge Complete!' : 'Game Over'}</h3>
           <p className="text-xl text-slate-400 mb-6">Final Score: <span className="text-white font-bold">{score}</span></p>
           <button onClick={() => { setScore(27); setCurrentDoubleIndex(0); setGameState('playing'); }} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold">Try Again</button>
        </div>
      )}
    </div>
  );
};

// 3. AROUND THE CLOCK (New)
const ClockGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [target, setTarget] = useState(1);
  const [dartsThrown, setDartsThrown] = useState(0);
  const [finished, setFinished] = useState(false);
  const [aiTip, setAiTip] = useState<string>('');

  useEffect(() => {
    fetchTrainingTip("Around the Clock").then(setAiTip);
  }, []);

  const handleHit = () => {
    if (target === 21) { // 21 represents Bull here
      setFinished(true);
    } else {
      setTarget(prev => prev + 1);
    }
  };

  const addDarts = (count: number) => {
    setDartsThrown(prev => prev + count);
  };

  const targetLabel = target === 21 ? 'BULL' : target;

  return (
    <div className="max-w-xl mx-auto text-center">
       <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Exit
        </button>
        <h2 className="text-2xl font-bold text-white font-serif flex items-center"><Crosshair className="w-5 h-5 text-indigo-400 mr-2"/> Around the Clock</h2>
      </div>

      {aiTip && (
        <div className="mb-6 bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex items-center justify-center gap-2 text-sm text-slate-400">
          <Sparkles className="w-4 h-4 text-emerald-400" /> "{aiTip}"
        </div>
      )}

      {!finished ? (
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-full w-48 h-48 mx-auto border-4 border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <div>
                <div className="text-xs text-indigo-300 uppercase font-bold tracking-wider mb-1">Aim For</div>
                <div className="text-6xl font-bold text-white">{targetLabel}</div>
              </div>
           </div>

           <div className="flex justify-center items-center gap-8 text-slate-300">
             <div>Darts Thrown: <span className="text-white font-bold text-xl ml-2">{dartsThrown}</span></div>
             <div>Accuracy: <span className="text-white font-bold text-xl ml-2">{dartsThrown > 0 ? ((target - 1) / dartsThrown * 100).toFixed(0) : 0}%</span></div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button onClick={() => addDarts(3)} className="py-4 bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-700">Missed (3 darts)</button>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={() => { addDarts(1); handleHit(); }} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold">1st</button>
                 <button onClick={() => { addDarts(2); handleHit(); }} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold">2nd</button>
                 <button onClick={() => { addDarts(3); handleHit(); }} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold">3rd</button>
              </div>
           </div>
           <p className="text-xs text-slate-500 mt-2">Click 1st, 2nd, or 3rd to indicate which dart hit the target.</p>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
           <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-bounce" />
           <h3 className="text-3xl font-bold text-white mb-2">Course Completed!</h3>
           <p className="text-xl text-slate-400 mb-6">Total Darts: <span className="text-white font-bold">{dartsThrown}</span></p>
           <button onClick={() => { setTarget(1); setDartsThrown(0); setFinished(false); }} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Play Again</button>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---
const Practice: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('menu');

  if (mode === '501') return <X01Game onBack={() => setMode('menu')} />;
  if (mode === 'bobs27') return <Bobs27Game onBack={() => setMode('menu')} />;
  if (mode === 'clock') return <ClockGame onBack={() => setMode('menu')} />;

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-900/30 rounded-xl mb-4">
            <Dumbbell className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-4xl font-extrabold text-white font-serif">Training Arena</h2>
          <p className="mt-4 text-xl text-slate-400">Select a game mode to sharpen your skills.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => setMode('501')}
            className="group relative p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all text-left shadow-lg hover:shadow-emerald-900/20"
          >
            <div className="absolute top-4 right-4 bg-slate-800 p-2 rounded-lg text-emerald-400 group-hover:bg-emerald-900/50 transition-colors">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mt-8 mb-2 group-hover:text-emerald-400">501 Match</h3>
            <p className="text-sm text-slate-400">Standard tournament format. Race to zero. Best for 2 players.</p>
          </button>

          <button 
            onClick={() => setMode('bobs27')}
            className="group relative p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-yellow-500/50 transition-all text-left shadow-lg hover:shadow-yellow-900/20"
          >
             <div className="absolute top-4 right-4 bg-slate-800 p-2 rounded-lg text-yellow-400 group-hover:bg-yellow-900/50 transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mt-8 mb-2 group-hover:text-yellow-400">Bob's 27</h3>
            <p className="text-sm text-slate-400">Advanced doubles practice. Start with 27, hit doubles to survive.</p>
          </button>

          <button 
            onClick={() => setMode('clock')}
            className="group relative p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all text-left shadow-lg hover:shadow-indigo-900/20"
          >
             <div className="absolute top-4 right-4 bg-slate-800 p-2 rounded-lg text-indigo-400 group-hover:bg-indigo-900/50 transition-colors">
              <Crosshair className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mt-8 mb-2 group-hover:text-indigo-400">Around the Clock</h3>
            <p className="text-sm text-slate-400">Hit 1 through 20 + Bull in order. Perfect for board navigation.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;