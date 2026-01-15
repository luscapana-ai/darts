import React, { useState } from 'react';
import { CartItem } from '../types';
import { Trash2, ShieldCheck, Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartProps {
  items: CartItem[];
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, removeFromCart }) => {
  const [escrowStep, setEscrowStep] = useState<number>(0); // 0: Review, 1: Escrow Processing, 2: Complete

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const buyerFee = 1.00;
  const total = subtotal + buyerFee;

  const handleCheckout = () => {
    setEscrowStep(1);
    setTimeout(() => {
      setEscrowStep(2);
    }, 2500);
  };

  if (items.length === 0 && escrowStep === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl text-white font-serif mb-4">Your cart is empty</h2>
        <Link to="/market" className="text-emerald-500 hover:text-emerald-400 underline">
          Browse the Pro Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white font-serif mb-8">Secure Checkout</h2>

        {escrowStep === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-slate-900 rounded-xl p-4 flex items-center border border-slate-800">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-slate-800" />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-slate-400 text-sm">{item.category}</p>
                    <div className="mt-1 text-emerald-400 font-bold">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-400">Qty: {item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sticky top-24">
                <h3 className="text-lg font-medium text-white mb-4">Order Summary</h3>
                
                <div className="space-y-3 text-sm pb-4 border-b border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>Platform Fee (Buyer)</span>
                    <span>${buyerFee.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 pb-6">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-3 mb-6 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <div className="text-xs text-indigo-200">
                    <strong className="block text-indigo-300 mb-1">Escrow Protected</strong>
                    Your payment is held securely in our Escrow Vault until you confirm delivery.
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Pay & Start Escrow
                </button>
              </div>
            </div>
          </div>
        )}

        {escrowStep === 1 && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-slate-700 animate-pulse"></div>
              <ShieldCheck className="w-10 h-10 text-emerald-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-2xl font-bold text-white mt-6 mb-2">Securing Funds</h3>
            <p className="text-slate-400">Transferring payment to Escrow Vault...</p>
          </div>
        )}

        {escrowStep === 2 && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900 rounded-2xl border border-emerald-500/30">
            <div className="w-20 h-20 rounded-full bg-emerald-900/30 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed</h3>
            <p className="text-slate-400 max-w-md text-center mb-8">
              Your funds are now safely in Escrow. The seller has been notified to ship your items.
            </p>
            <Link 
              to="/"
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;