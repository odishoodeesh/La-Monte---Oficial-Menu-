import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ShoppingBag, ChevronLeft } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

const ingredients: Ingredient[] = [
  { id: 'tomatoes', name: 'Tomatoes', price: 500, emoji: '🍅' },
  { id: 'egg', name: 'Boiled Egg', price: 750, emoji: '🥚' },
  { id: 'cheese', name: 'Cheese', price: 1000, emoji: '🧀' },
  { id: 'toast', name: 'Toast', price: 500, emoji: '🍞' },
];

export default function BuildBreakfastView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);

  const toggleIngredient = (id: string) => {
    const newSelected = new Set(selectedIngredients);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIngredients(newSelected);
  };

  const totalPrice = 4000 + Array.from(selectedIngredients).reduce<number>((sum, id) => {
    const item = ingredients.find(i => i.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  return (
    <div className="w-full h-[92vh] max-w-md mx-auto bg-[#faf7f2] flex flex-col relative overflow-hidden rounded-3xl shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center p-5 z-20">
        <button onClick={() => onNavigate('menu')} className="p-2 bg-white rounded-full shadow-sm text-[#2e4a3e]">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => onNavigate('menu')}>
          <img src="https://i.ibb.co/995h3pcg/logo.png" alt="La Monte Logo" className="h-10" />
        </button>
        <button className="bg-[#2e4a3e] text-white px-4 py-2 rounded-xl font-bold text-xs active:scale-95 transition-transform">
          Add to Cart
        </button>
      </div>

      {/* Ceramic Dish Visual */}
      <div className="flex-1 flex justify-center items-center relative">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white to-[#e2ded4] shadow-[12px_18px_25px_rgba(0,0,0,0.12),inset_-4px_-4px_12px_rgba(0,0,0,0.05),inset_4px_4px_12px_rgba(255,255,255,0.8)] flex justify-center items-center relative">
          <div className="w-52 h-52 rounded-full bg-gradient-to-br from-white to-[#f0ede6] shadow-[inset_6px_6px_14px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] relative overflow-hidden">
            {ingredients.map(ing => (
              <motion.span
                key={ing.id}
                className={`absolute text-4xl drop-shadow-lg ${selectedIngredients.has(ing.id) ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, scale: 0.2, y: 80 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                style={{
                  top: ing.id === 'tomatoes' ? '35px' : ing.id === 'egg' ? '40px' : ing.id === 'cheese' ? '120px' : '110px',
                  left: ing.id === 'tomatoes' ? '40px' : ing.id === 'egg' ? '120px' : ing.id === 'cheese' ? '50px' : '120px'
                }}
              >
                {ing.emoji}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className={`bg-white rounded-t-3xl shadow-[0_-8px_25px_rgba(0,0,0,0.08)] z-10 p-5 pt-3 transition-all duration-300 ${isSheetCollapsed ? 'h-[135px]' : 'h-auto'} overflow-hidden`}>
        <div className="flex flex-col items-center cursor-pointer mb-4" onClick={() => setIsSheetCollapsed(!isSheetCollapsed)}>
          <div className="w-10 h-1 bg-gray-200 rounded-full mb-2"></div>
          <div className="flex justify-between w-full items-center">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Tap to Add Ingredients</span>
            <ChevronDown className={`text-gray-400 transition-transform ${isSheetCollapsed ? 'rotate-180' : ''}`} size={16} />
          </div>
        </div>

        {/* Ingredients Grid - Only show when expanded */}
        <div className={`grid grid-cols-2 gap-3 mb-5 transition-opacity duration-300 ${isSheetCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          {ingredients.map(ing => (
            <div 
              key={ing.id}
              onClick={() => toggleIngredient(ing.id)}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border-2 ${selectedIngredients.has(ing.id) ? 'bg-[#e8efe9] border-[#2e4a3e]' : 'bg-gray-50 border-gray-100'}`}
            >
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                {ing.emoji}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{ing.name}</span>
                <span className="text-xs text-gray-500">+{ing.price.toLocaleString()} IQD</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Checkout */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Price</span>
            <span className="text-xl font-extrabold text-gray-900">{totalPrice.toLocaleString()} IQD</span>
          </div>
          <button className="bg-[#2e4a3e] text-white px-6 py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
