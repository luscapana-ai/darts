import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { ShoppingCart, Plus, Filter, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketplaceProps {
  addToCart: (product: Product) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ addToCart }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProducts = filter === 'all' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white font-serif">Pro Shop</h2>
            <p className="text-slate-400 mt-1">Official equipment used by the champions.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4 items-center">
             <Link 
              to="/sell"
              className="flex items-center px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-emerald-400 hover:bg-slate-800 transition-colors"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Sell Your Gear
            </Link>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Categories</option>
                <option value="darts">Darts</option>
                <option value="boards">Boards</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-900/20">
              <div className="relative aspect-square overflow-hidden bg-slate-800">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs uppercase font-semibold tracking-wider">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <button 
                  onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-center bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;