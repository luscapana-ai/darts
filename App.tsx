import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Encyclopedia from './components/Encyclopedia';
import Marketplace from './components/Marketplace';
import Practice from './components/Practice';
import AICoach from './components/AICoach';
import Sell from './components/Sell';
import Cart from './components/Cart';
import News from './components/News';
import CalendarEvents from './components/CalendarEvents';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500 selection:text-white">
        <Navbar cartCount={cartCount} />
        
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/news" element={<News />} />
          <Route path="/calendar" element={<CalendarEvents />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/coach" element={<AICoach />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/market" element={<Marketplace addToCart={addToCart} />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/cart" element={<Cart items={cart} removeFromCart={removeFromCart} />} />
        </Routes>

        <footer className="bg-slate-950 border-t border-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
            <p className="mb-4 text-sm">&copy; 2024 Bullseye Darts World. All rights reserved.</p>
            <p className="text-xs">
              Powered by Google Gemini AI. Images from Unsplash/Picsum.
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;