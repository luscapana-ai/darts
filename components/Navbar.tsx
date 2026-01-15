import React from 'react';
import { Target, ShoppingCart, BookOpen, Home, Brain, Dumbbell, DollarSign, Newspaper, Calendar, Store } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-emerald-400' : 'text-slate-300 hover:text-white';
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold tracking-tight text-white font-serif">Bullseye</span>
          </div>

          <div className="hidden xl:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1`}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link to="/news" className={`${isActive('/news')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1`}>
                <Newspaper className="w-4 h-4" />
                <span>News</span>
              </Link>
              <Link to="/calendar" className={`${isActive('/calendar')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1`}>
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </Link>
              <Link to="/practice" className={`${isActive('/practice')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1`}>
                <Dumbbell className="w-4 h-4" />
                <span>Practice</span>
              </Link>
              <Link to="/coach" className={`${isActive('/coach')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1`}>
                <Brain className="w-4 h-4" />
                <span>AI Coach</span>
              </Link>
              <Link to="/market" className={`${isActive('/market')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1`}>
                <Store className="w-4 h-4" />
                <span>Shop</span>
              </Link>
              <Link to="/sell" className={`${isActive('/sell')} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1`}>
                <DollarSign className="w-4 h-4" />
                <span>Sell</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="xl:hidden flex justify-around border-t border-slate-800 py-2 bg-slate-900 overflow-x-auto">
         <Link to="/" className="p-2 text-slate-400 hover:text-emerald-400 flex-shrink-0"><Home className="w-6 h-6"/></Link>
         <Link to="/news" className="p-2 text-slate-400 hover:text-emerald-400 flex-shrink-0"><Newspaper className="w-6 h-6"/></Link>
         <Link to="/calendar" className="p-2 text-slate-400 hover:text-emerald-400 flex-shrink-0"><Calendar className="w-6 h-6"/></Link>
         <Link to="/practice" className="p-2 text-slate-400 hover:text-emerald-400 flex-shrink-0"><Dumbbell className="w-6 h-6"/></Link>
         <Link to="/market" className="p-2 text-slate-400 hover:text-emerald-400 flex-shrink-0"><Store className="w-6 h-6"/></Link>
         <Link to="/sell" className="p-2 text-slate-400 hover:text-emerald-400 flex-shrink-0"><DollarSign className="w-6 h-6"/></Link>
         <Link to="/cart" className="p-2 text-slate-400 hover:text-emerald-400 relative flex-shrink-0">
            <ShoppingCart className="w-6 h-6"/>
            {cartCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>}
         </Link>
      </div>
    </nav>
  );
};

export default Navbar;