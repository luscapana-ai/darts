import React, { useState } from 'react';
import { DollarSign, Tag, Image as ImageIcon, ShieldCheck } from 'lucide-react';

const Sell: React.FC = () => {
  const [price, setPrice] = useState<string>('');
  const [name, setName] = useState('');
  
  const numericPrice = parseFloat(price) || 0;
  const sellerFee = numericPrice * 0.05;
  const payout = numericPrice - sellerFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Item listed successfully! (Demo)");
    setPrice('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white font-serif">Sell Your Gear</h2>
          <p className="mt-2 text-slate-400">List your darts equipment on our secure marketplace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Item Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-950 text-white focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g. Winmau Blade 6"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Listing Price ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-950 text-white focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-950 text-white focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  List Item
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-1">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 sticky top-24">
              <h3 className="text-lg font-medium text-white mb-4">Payout Estimator</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Listing Price</span>
                  <span>${numericPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>Seller Fee (5%)</span>
                  <span>-${sellerFee.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-slate-700 flex justify-between font-bold text-lg text-emerald-400">
                  <span>You Get</span>
                  <span>${payout.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 bg-emerald-900/20 rounded-lg p-3 border border-emerald-900/50 flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-200">
                  Funds are held in secure escrow until the buyer confirms receipt of the item.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;