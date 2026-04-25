/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback, useDeferredValue, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, Utensils, Info, Search, ShoppingBag, Plus, 
  Home, Heart, History, Sparkles, X, Trash2, Minus, 
  ChevronRight, CheckCircle2, Clock, Pizza, Sandwich,
  Salad, Flame, Zap, Droplets, Leaf, Wind, GlassWater,
  IceCream, Cookie, Beef, Soup, Sun, Moon, Layout,
  LayoutGrid, LayoutList, LayoutTemplate, Palette, Menu,
  Volume2, VolumeX, Maximize2, Calendar, MapPin, 
  Languages, Globe, User as UserIcon, LogOut, Mail, Lock,
  RefreshCw, Cloud
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import { Category, MenuItem, CartItem, MainCategory } from './types';
import { MENU_ITEMS } from './data';
import { fetchDuhokWeather, WeatherData } from './services/weatherService';

type View = 'menu' | 'profile' | 'reservation';

interface PaletteColors {
  bg: string;
  text: string;
  textRgb: string;
  glassBg: string;
  glassBorder: string;
  glassDarkBg: string;
  glassDarkBorder: string;
  accent: string;
  glowOpacity: number;
  atmosphere1: string;
  atmosphere2: string;
  colors: string[]; // For preview
}

const PALETTES: Record<string, PaletteColors> = {
  minimal: {
    bg: '#F9F8F6',
    text: '#1A1A1A',
    textRgb: '26, 26, 26',
    glassBg: 'rgba(255, 255, 255, 0.6)',
    glassBorder: 'rgba(0, 0, 0, 0.05)',
    glassDarkBg: 'rgba(255, 255, 255, 0.8)',
    glassDarkBorder: 'rgba(0, 0, 0, 0.03)',
    accent: '#2D2D2D',
    glowOpacity: 0.05,
    atmosphere1: 'rgba(0, 0, 0, 0.02)',
    atmosphere2: 'rgba(0, 0, 0, 0.01)',
    colors: ['#F9F8F6', '#FFFFFF', '#2D2D2D', '#1A1A1A']
  },
  midnight: {
    bg: '#0A0A0B',
    text: '#ffffff',
    textRgb: '255, 255, 255',
    glassBg: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassDarkBg: 'rgba(0, 0, 0, 0.4)',
    glassDarkBorder: 'rgba(255, 255, 255, 0.05)',
    accent: '#a855f7',
    glowOpacity: 0.3,
    atmosphere1: 'rgba(45, 26, 80, 0.4)',
    atmosphere2: 'rgba(20, 30, 60, 0.4)',
    colors: ['#0A0A0B', '#1A1A1B', '#a855f7', '#ffffff']
  },
  sunset: {
    bg: '#2D033B',
    text: '#E5B8F4',
    textRgb: '229, 184, 244',
    glassBg: 'rgba(229, 184, 244, 0.05)',
    glassBorder: 'rgba(229, 184, 244, 0.1)',
    glassDarkBg: 'rgba(45, 3, 59, 0.6)',
    glassDarkBorder: 'rgba(193, 71, 233, 0.2)',
    accent: '#C147E9',
    glowOpacity: 0.4,
    atmosphere1: 'rgba(129, 12, 168, 0.3)',
    atmosphere2: 'rgba(45, 3, 59, 0.3)',
    colors: ['#2D033B', '#810CA8', '#C147E9', '#E5B8F4']
  },
  ocean: {
    bg: '#082032',
    text: '#FDFDFD',
    textRgb: '253, 253, 253',
    glassBg: 'rgba(253, 253, 253, 0.05)',
    glassBorder: 'rgba(253, 253, 253, 0.1)',
    glassDarkBg: 'rgba(8, 32, 50, 0.6)',
    glassDarkBorder: 'rgba(44, 57, 75, 0.3)',
    accent: '#FF4C29',
    glowOpacity: 0.35,
    atmosphere1: 'rgba(44, 57, 75, 0.4)',
    atmosphere2: 'rgba(51, 71, 86, 0.4)',
    colors: ['#082032', '#2C394B', '#334756', '#FF4C29']
  },
  emerald: {
    bg: '#061a14',
    text: '#e2e8f0',
    textRgb: '226, 232, 240',
    glassBg: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassDarkBg: 'rgba(0, 0, 0, 0.5)',
    glassDarkBorder: 'rgba(16, 185, 129, 0.2)',
    accent: '#10b981',
    glowOpacity: 0.25,
    atmosphere1: 'rgba(16, 185, 129, 0.1)',
    atmosphere2: 'rgba(16, 185, 129, 0.05)',
    colors: ['#061a14', '#064e3b', '#10b981', '#e2e8f0']
  },
  cream: {
    bg: '#FDFCF8',
    text: '#1A1A1A',
    textRgb: '26, 26, 26',
    glassBg: 'rgba(0, 0, 0, 0.03)',
    glassBorder: 'rgba(0, 0, 0, 0.08)',
    glassDarkBg: 'rgba(255, 255, 255, 0.7)',
    glassDarkBorder: 'rgba(0, 0, 0, 0.05)',
    accent: '#B8860B',
    glowOpacity: 0.15,
    atmosphere1: 'rgba(184, 134, 11, 0.1)',
    atmosphere2: 'rgba(184, 134, 11, 0.05)',
    colors: ['#FDFCF8', '#DFD3C3', '#B8860B', '#1A1A1A']
  },
  nordic: {
    bg: '#222831',
    text: '#EEEEEE',
    textRgb: '238, 238, 238',
    glassBg: 'rgba(238, 238, 238, 0.05)',
    glassBorder: 'rgba(238, 238, 238, 0.1)',
    glassDarkBg: 'rgba(34, 40, 49, 0.6)',
    glassDarkBorder: 'rgba(0, 173, 181, 0.2)',
    accent: '#00ADB5',
    glowOpacity: 0.3,
    atmosphere1: 'rgba(57, 62, 70, 0.4)',
    atmosphere2: 'rgba(34, 40, 49, 0.4)',
    colors: ['#222831', '#393E46', '#00ADB5', '#EEEEEE']
  },
  vintage: {
    bg: '#1B262C',
    text: '#BBE1FA',
    textRgb: '187, 225, 250',
    glassBg: 'rgba(187, 225, 250, 0.05)',
    glassBorder: 'rgba(187, 225, 250, 0.1)',
    glassDarkBg: 'rgba(27, 38, 44, 0.6)',
    glassDarkBorder: 'rgba(50, 130, 184, 0.2)',
    accent: '#3282B8',
    glowOpacity: 0.3,
    atmosphere1: 'rgba(15, 76, 117, 0.4)',
    atmosphere2: 'rgba(27, 38, 44, 0.4)',
    colors: ['#1B262C', '#0F4C75', '#3282B8', '#BBE1FA']
  },
  lavender: {
    bg: '#2D333B',
    text: '#ADBAC7',
    textRgb: '173, 186, 199',
    glassBg: 'rgba(173, 186, 199, 0.05)',
    glassBorder: 'rgba(173, 186, 199, 0.1)',
    glassDarkBg: 'rgba(45, 51, 59, 0.6)',
    glassDarkBorder: 'rgba(118, 131, 144, 0.2)',
    accent: '#768390',
    glowOpacity: 0.2,
    atmosphere1: 'rgba(34, 39, 46, 0.4)',
    atmosphere2: 'rgba(45, 51, 59, 0.4)',
    colors: ['#22272E', '#2D333B', '#768390', '#ADBAC7']
  }
};

const getLabel = (item: any, field: 'name' | 'description', language: 'en' | 'ku' | 'ar') => {
  if (language === 'ku') {
    return field === 'name' ? (item.nameKu || item.name) : (item.descKu || item.description);
  }
  if (language === 'ar') {
    return field === 'name' ? (item.nameAr || item.name) : (item.descAr || item.description);
  }
  return field === 'name' ? item.name : item.description;
};

// Memoized Menu Item Card for performance
const MenuItemCard = memo(({ 
  item, 
  index, 
  viewMode, 
  favorites, 
  toggleFavorite, 
  setSelectedItem,
  language,
  t
}: { 
  item: MenuItem; 
  index: number; 
  viewMode: string; 
  favorites: string[]; 
  toggleFavorite: (id: string, e: React.MouseEvent) => void; 
  setSelectedItem: (item: MenuItem) => void;
  language: 'en' | 'ku' | 'ar';
  t: any;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={viewMode !== 'list' && viewMode !== 'magazine' ? { y: -8, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } } : { x: 8 }}
      transition={{ 
        delay: Math.min(index * 0.03, 0.3),
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }}
      onClick={() => setSelectedItem(item)}
      className={`group relative glass-dark rounded-[1.2rem] overflow-hidden cursor-pointer hover:border-[var(--text-color)]/20 transition-all duration-300 flex flex-col ${
        viewMode === 'grid' 
          ? 'h-full' 
          : viewMode === 'list'
          ? 'flex-row h-32'
          : viewMode === 'minimal'
          ? 'h-full'
          : viewMode === 'compact'
          ? 'h-full'
          : 'min-h-[500px]'
      }`}
    >
      {viewMode === 'grid' && (
        <>
          <div className="relative w-full aspect-square overflow-hidden bg-black/5 rounded-2xl md:rounded-3xl p-4">
            <motion.button 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => toggleFavorite(item.id, e)}
              className="absolute top-4 right-4 z-30 p-2 glass rounded-full hover:bg-[var(--text-color)]/10 transition-all"
            >
              <Heart 
                size={14} 
                className={favorites.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-[var(--text-color)]'} 
              />
            </motion.button>

            {item.rank && (
              <div className="absolute top-4 left-4 z-20 px-2 py-0.5 glass rounded-full text-[8px] font-bold uppercase tracking-widest text-[var(--text-color)]/80">
                {item.rank}
              </div>
            )}

            <img 
              src={item.thumbnail || item.image} 
              alt={getLabel(item, 'name', language)}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>

          <div className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-serif italic text-[var(--text-color)] leading-tight">{getLabel(item, 'name', language)}</h3>
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium">{item.price}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t.checkout}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'list' && (
        <>
          <div className="w-32 h-full flex-shrink-0 bg-black/5 p-4">
            <img 
              src={item.thumbnail || item.image} 
              alt={getLabel(item, 'name', language)}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-grow p-4 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-serif italic text-glow">{getLabel(item, 'name', language)}</h3>
              <span className="text-sm font-medium">{item.price}</span>
            </div>
            <p className="text-xs opacity-40 line-clamp-2 font-light mb-2">{getLabel(item, 'description', language)}</p>
            <div className="flex items-center gap-3">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggleFavorite(item.id, e)}
                className="text-white/40 hover:text-red-500 transition-colors"
              >
                <Heart size={14} className={favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''} />
              </motion.button>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-20">{t.checkout}</span>
            </div>
          </div>
        </>
      )}

      {viewMode === 'minimal' && (
        <>
          <div className="relative w-full aspect-square overflow-hidden bg-black/5 p-2 rounded-xl">
            <img 
              src={item.thumbnail || item.image} 
              alt={item.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            {favorites.includes(item.id) && (
              <div className="absolute top-1.5 right-1.5 z-10">
                <Heart size={8} className="text-red-500 fill-red-500" />
              </div>
            )}
          </div>
          <div className="p-2 text-center">
            <h3 className="text-[9px] font-serif italic text-[var(--text-color)] leading-tight truncate">{getLabel(item, 'name', language)}</h3>
            <p className="text-[7px] font-bold text-[var(--text-color)]/70">{item.price}</p>
          </div>
        </>
      )}

      {viewMode === 'compact' && (
        <>
          <div className="relative w-full aspect-square overflow-hidden bg-black/5 p-1 rounded-lg">
            <img 
              src={item.thumbnail || item.image} 
              alt={item.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-1.5 flex flex-col items-center">
            <p className="text-[8px] font-bold text-center truncate w-full px-1">{item.name}</p>
            <p className="text-[7px] opacity-60 font-medium">{item.price}</p>
          </div>
        </>
      )}

      {viewMode === 'magazine' && (
        <>
          <div className="relative w-full h-[400px] flex items-center justify-center p-8 bg-black/5">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-sm aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10"
            >
              <img 
                src={item.thumbnail || item.image} 
                alt={item.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-inner">
                <Maximize2 size={32} className="text-white drop-shadow-lg" />
              </div>
            </motion.div>
          </div>
          
          <div className="p-8 flex flex-col justify-between flex-grow">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-60 mb-2 block">
                {item.category}
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif italic text-[var(--text-color)] leading-tight">{item.name}</h3>
            </div>

            <div className="flex justify-between items-end">
              <div className="max-w-[70%]">
                <p className="text-sm opacity-60 line-clamp-2 font-light mb-4">{item.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-medium">{item.price}</span>
                  <div className="h-px w-12 bg-[var(--text-color)]/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Discover</span>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggleFavorite(item.id, e)}
                className="p-4 glass rounded-full"
              >
                <Heart 
                  size={20} 
                  className={favorites.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-[var(--text-color)]'} 
                />
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
});

const MagicWorld = ({ 
  isOpen, 
  onClose, 
  menuItems, 
  addToCart, 
  setSelectedItem, 
  setIsFullscreenImageOpen,
  t,
  language
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  menuItems: MenuItem[]; 
  addToCart: (item: MenuItem, note?: string) => void;
  setSelectedItem: (item: MenuItem | null) => void;
  setIsFullscreenImageOpen: (open: boolean) => void;
  t: any;
  language: 'en' | 'ku' | 'ar';
}) => {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<string | null>(null);
  const [temp, setTemp] = useState<string | null>(null);
  const [craving, setCraving] = useState<'Drink' | 'Sweet' | 'Hungry' | null>(null);
  const [recommendation, setRecommendation] = useState<MenuItem | null>(null);

  const moods = [
    { emoji: '😊', label: t.how_feeling === 'هەست بە چی دەکەیت؟' ? 'دڵخۆش' : t.how_feeling === 'كيف تشعر؟' ? 'سعيد' : 'Happy', color: 'rgba(255, 223, 0, 0.4)' },
    { emoji: '😴', label: t.how_feeling === 'هەست بە چی دەکەیت؟' ? 'ماندوو' : t.how_feeling === 'كيف تشعر؟' ? 'متعب' : 'Tired', color: 'rgba(138, 43, 226, 0.4)' },
    { emoji: '😔', label: t.how_feeling === 'هەست بە چی دەکەیت؟' ? 'دڵتەنگ' : t.how_feeling === 'كيف تشعر؟' ? 'حزين' : 'Sad', color: 'rgba(70, 130, 180, 0.4)' },
    { emoji: '⚡', label: t.how_feeling === 'هەست بە چی دەکەیت؟' ? 'چالاک' : t.how_feeling === 'كيف تشعر؟' ? 'متحمس' : 'Energetic', color: 'rgba(255, 69, 0, 0.4)' },
  ];

  const temps = [
    { emoji: '❄️', label: t.cold_warm === 'سارد یان گەرم؟' ? 'سارد' : t.cold_warm === 'بارد أم دافئ؟' ? 'بارد' : 'Cold', color: 'rgba(0, 191, 255, 0.4)' },
    { emoji: '🔥', label: t.cold_warm === 'سارد یان گەرم؟' ? 'گەرم' : t.cold_warm === 'بارد أم دافئ؟' ? 'دافئ' : 'Warm', color: 'rgba(255, 69, 0, 0.4)' },
  ];

  const cravings = [
    { emoji: '☕', label: t.drink_step, value: 'Drink' as const },
    { emoji: '🍰', label: t.sweet_step, value: 'Sweet' as const },
    { emoji: '🍞', label: t.hungry_step, value: 'Hungry' as const },
  ];

  const handleMoodSelect = (m: string) => {
    setMood(m);
    setStep(2);
  };

  const handleTempSelect = (t: string) => {
    setTemp(t);
    setStep(3);
  };

  const handleCravingSelect = (c: 'Drink' | 'Sweet' | 'Hungry') => {
    setCraving(c);
    generateRecommendation(mood!, temp!, c);
    setStep(4);
  };

  const generateRecommendation = (m: string, t: string, c: 'Drink' | 'Sweet' | 'Hungry') => {
    let filtered = menuItems;
    
    // Primary Filter: Craving
    if (c === 'Sweet') {
      filtered = filtered.filter(item => item.category === 'Sweets & Cake');
    } else if (c === 'Hungry') {
      filtered = filtered.filter(item => item.category === 'Toasts');
    } else {
      filtered = filtered.filter(item => item.mainCategory === 'Drinks');
      if (t === 'Warm') {
        filtered = filtered.filter(item => item.category === 'Hot Drinks');
      } else {
        filtered = filtered.filter(item => item.category === 'Cold Drinks' || item.category === 'Coffee Frappe' || item.category === 'Cold Brew');
      }
    }

    // Secondary Filter: Mood
    if (m === 'Happy') {
      const happyItems = filtered.filter(item => 
        item.name.toLowerCase().includes('vanilla') || 
        item.name.toLowerCase().includes('caramel') || 
        item.name.toLowerCase().includes('strawberry') ||
        item.name.toLowerCase().includes('mango') ||
        item.name.toLowerCase().includes('sweet') ||
        item.name.toLowerCase().includes('fruit')
      );
      if (happyItems.length > 0) filtered = happyItems;
    } else if (m === 'Tired') {
      const tiredItems = filtered.filter(item => 
        item.name.toLowerCase().includes('espresso') || 
        item.name.toLowerCase().includes('americano') ||
        item.name.toLowerCase().includes('cortado') ||
        item.name.toLowerCase().includes('double') ||
        item.name.toLowerCase().includes('strong')
      );
      if (tiredItems.length > 0) filtered = tiredItems;
    } else if (m === 'Sad') {
      const sadItems = filtered.filter(item => 
        item.name.toLowerCase().includes('chocolate') || 
        item.name.toLowerCase().includes('mocha') ||
        item.name.toLowerCase().includes('latte') ||
        item.name.toLowerCase().includes('creamy') ||
        item.name.toLowerCase().includes('nutella')
      );
      if (sadItems.length > 0) filtered = sadItems;
    } else if (m === 'Energetic') {
      const energeticItems = filtered.filter(item => 
        item.name.toLowerCase().includes('lemonade') || 
        item.name.toLowerCase().includes('mojito') ||
        item.name.toLowerCase().includes('matcha') ||
        item.name.toLowerCase().includes('mint') ||
        item.name.toLowerCase().includes('fresh')
      );
      if (energeticItems.length > 0) filtered = energeticItems;
    }

    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setRecommendation(random || menuItems[0]);
  };

  const reset = () => {
    setStep(1);
    setMood(null);
    setTemp(null);
    setCraving(null);
    setRecommendation(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[var(--bg-color)]/80 backdrop-blur-3xl"
          />
          
          {/* Magic Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
              style={{ backgroundColor: step === 1 ? 'var(--accent-color)' : step === 2 ? moods.find(m => m.label === mood)?.color : step === 3 ? temps.find(t => t.label === temp)?.color : 'var(--accent-color)' }}
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
              style={{ backgroundColor: step === 1 ? 'var(--accent-color)' : step === 2 ? moods.find(m => m.label === mood)?.color : step === 3 ? temps.find(t => t.label === temp)?.color : 'var(--accent-color)' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="relative w-[92%] md:w-full max-w-lg glass rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-center shadow-[0_0_100px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[var(--text-color)]/5 transition-all z-50"
            >
              <X size={20} />
            </motion.button>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="space-y-3">
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="inline-block"
                    >
                      <Sparkles size={36} className="text-yellow-400 mx-auto" />
                    </motion.div>
                    <h2 className="text-2xl md:text-4xl font-serif italic text-glow">{t.how_feeling}</h2>
                    <p className="opacity-40 tracking-widest uppercase text-[10px] font-bold">{t.step} 1 {t.of} 3</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {moods.map((m) => (
                      <motion.button
                        key={m.label}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMoodSelect(m.label)}
                        className="flex flex-col items-center gap-3 p-3 md:p-4 glass-dark rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-500">{m.emoji}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{m.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-4xl font-serif italic text-glow">{t.cold_warm}</h2>
                    <p className="opacity-40 tracking-widest uppercase text-[10px] font-bold">{t.step} 2 {t.of} 3</p>
                  </div>

                  <div className="flex justify-center gap-6">
                    {temps.map((t) => (
                      <motion.button
                        key={t.label}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTempSelect(t.label)}
                        className="flex flex-col items-center gap-3 p-4 md:p-6 glass-dark rounded-2xl hover:bg-white/10 transition-all group min-w-[100px] md:min-w-[140px]"
                      >
                        <span className="text-3xl md:text-5xl group-hover:scale-110 transition-transform duration-500">{t.emoji}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{t.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                  >
                    {language === 'en' ? 'Go Back' : language === 'ku' ? 'گەڕانەوە' : 'الرجوع'}
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-4xl font-serif italic text-glow">{t.craving}</h2>
                    <p className="opacity-40 tracking-widest uppercase text-[10px] font-bold">{t.step} 3 {t.of} 3</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {cravings.map((c) => (
                      <motion.button
                        key={c.label}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCravingSelect(c.value)}
                        className="flex flex-col items-center gap-3 p-4 md:p-6 glass-dark rounded-2xl hover:bg-white/10 transition-all group"
                      >
                        <span className="text-3xl md:text-5xl group-hover:scale-110 transition-transform duration-500">{c.emoji}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{c.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                  >
                    {language === 'en' ? 'Go Back' : language === 'ku' ? 'گەڕانەوە' : 'الرجوع'}
                  </button>
                </motion.div>
              )}

              {step === 4 && recommendation && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-10"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-serif italic text-glow">{t.magic_suggestion}</h2>
                    <p className="opacity-40 tracking-widest uppercase text-[9px] font-bold">{t.magic_suggestion}</p>
                  </div>

                  <div className="glass-dark rounded-[2rem] overflow-hidden p-6 flex flex-col items-center gap-4 border border-white/10">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedItem(recommendation);
                        setIsFullscreenImageOpen(true);
                      }}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl cursor-zoom-in relative group"
                    >
                      <img 
                        src={recommendation.thumbnail || recommendation.image} 
                        alt={recommendation.name} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 size={20} className="text-white drop-shadow-lg" />
                      </div>
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-2xl font-serif italic mb-1">{getLabel(recommendation, 'name', language)}</h3>
                      <p className="text-xs opacity-60 mb-4 max-w-xs mx-auto">{getLabel(recommendation, 'description', language)}</p>
                      <span className="text-xl font-medium block mb-6">{recommendation.price}</span>
                      
                      <div className="flex gap-3 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            addToCart(recommendation);
                            handleClose();
                          }}
                          className="px-6 py-3 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl"
                        >
                          {t.add_to_order}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={reset}
                          className="px-6 py-3 glass rounded-full text-[10px] font-bold uppercase tracking-widest"
                        >
                          {t.try_again}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AuthModal = ({ 
  isOpen, 
  onClose, 
  language,
  t
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  language: 'en' | 'ku' | 'ar';
  t: any;
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!supabase) throw new Error(t.auth.configError);
      
      let loginEmail = email;

      if (mode === 'login') {
        // If it doesn't look like an email, assume it's a username
        if (!email.includes('@')) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('email')
            .eq('username', email.toLowerCase())
            .single();

          if (profileError || !profile) {
            throw new Error(t.auth.userNotFound);
          }
          loginEmail = profile.email;
        }

        const { error } = await supabase.auth.signInWithPassword({ 
          email: loginEmail, 
          password 
        });
        if (error) throw error;
      } else {
        // Sign up mode
        if (!username || username.length < 3) {
          throw new Error(t.auth.usernameShort);
        }

        // Check if username is taken
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username.toLowerCase())
          .maybeSingle();

        if (existingUser) {
          throw new Error(t.auth.usernameTaken);
        }

        const { data: authData, error: signupError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });

        if (signupError) throw signupError;

        if (authData.user) {
          // Create profile record
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              username: username.toLowerCase(),
              email: email.toLowerCase()
            });
          
          if (profileError) {
            // If profile creation fails, we might have a ghost user, but Supabase handles it usually
            console.error('Error creating profile:', profileError);
          }
        }
        
        alert(t.auth.checkEmail);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || t.auth.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-[var(--text-color)]/40 hover:text-[var(--text-color)]">
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[var(--text-color)]/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--text-color)]/10">
                <UserIcon size={32} />
              </div>
              <h2 className="text-3xl font-serif italic mb-2">{mode === 'login' ? t.auth.login : t.auth.signup}</h2>
              <p className="opacity-40 text-xs uppercase tracking-widest font-bold">{t.auth.welcome}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4 flex items-center gap-2">
                  <Mail size={12} /> {mode === 'login' ? t.auth.emailOrUsername : t.auth.email}
                </label>
                <input 
                  type="text" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 glass-dark rounded-2xl px-6 focus:outline-none focus:ring-1 focus:ring-[var(--text-color)]/20 transition-all font-medium"
                  placeholder={mode === 'login' ? t.auth.emailOrUsername : "name@example.com"}
                />
              </div>

              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4 flex items-center gap-2">
                    <UserIcon size={12} /> {t.auth.username}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-14 glass-dark rounded-2xl px-6 focus:outline-none focus:ring-1 focus:ring-[var(--text-color)]/20 transition-all font-medium"
                    placeholder="lux_user"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 ml-4 flex items-center gap-2">
                  <Lock size={12} /> {t.auth.password}
                </label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 glass-dark rounded-2xl px-6 focus:outline-none focus:ring-1 focus:ring-[var(--text-color)]/20 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs text-center font-medium bg-red-400/10 py-3 rounded-xl border border-red-400/20 px-4"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full h-14 bg-[var(--text-color)] text-[var(--bg-color)] rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl disabled:opacity-50"
              >
                {loading ? t.auth.loading : (mode === 'login' ? t.auth.signIn : t.auth.register)}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
              >
                {mode === 'login' ? t.auth.noAccount : t.auth.haveAccount}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const [activeMainCategory, setActiveMainCategory] = useState<MainCategory>('Drinks');
  const [activeCategory, setActiveCategory] = useState<Category>('Hot Drinks');
  const [activeQuickFilter, setActiveQuickFilter] = useState<'All' | 'Seasonal' | 'Recommended' | 'Combinations'>('All');
  const [theme, setTheme] = useState<keyof typeof PALETTES>('minimal');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'minimal' | 'compact' | 'magazine'>('grid');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [currentView, setCurrentView] = useState<View>('menu');
  const [profileTab, setProfileTab] = useState<'favorites' | 'history'>('history');
  const [showIntro, setShowIntro] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Background Music
  useEffect(() => {
    const audio = new Audio('https://image2url.com/r2/default/audio/1774682334207-b2eb5d34-3c4d-480d-9649-4cb13e213b74.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const playAudio = () => {
      if (!isMuted && audio.paused) {
        audio.play().catch(err => {
          console.log('Autoplay blocked, waiting for user interaction', err);
        });
      }
    };

    playAudio();

    const handleInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      audio.pause();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  }, [isMuted]);
  
  // State for Cart, Favorites, and History
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orderHistory, setOrderHistory] = useState<{ id: string; date: string; items: CartItem[]; total: string; tableNumber?: string; orderType?: string }[]>([]);
  
  const [tableNumber, setTableNumber] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'drive-through'>('dine-in');
  const [itemNote, setItemNote] = useState('');
  
  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ku' | 'ar'>('en');
  const [isMagicWorldOpen, setIsMagicWorldOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    phone: '',
    table: '',
    date: '',
    time: ''
  });
  const [isReserving, setIsReserving] = useState(false);
  const [showReservationSuccess, setShowReservationSuccess] = useState(false);
  
  // Auth & Profile State
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; date: string; items: CartItem[]; total: string; tableNumber?: string } | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [recommendedIds, setRecommendedIds] = useState<string[]>([]);
  const [showBars, setShowBars] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  
  // Refs to avoid stale closures
  const favoritesRef = React.useRef(favorites);
  const orderHistoryRef = React.useRef(orderHistory);
  const userRef = React.useRef(user);

  useEffect(() => {
    favoritesRef.current = favorites;
  }, [favorites]);

  useEffect(() => {
    orderHistoryRef.current = orderHistory;
  }, [orderHistory]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Language & RTL Effect
  useEffect(() => {
    const dir = (language === 'ar' || language === 'ku') ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  // Supabase Auth Effect
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id, favoritesRef.current, orderHistoryRef.current);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        fetchUserData(session.user.id, favoritesRef.current, orderHistoryRef.current);
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        setFavorites([]);
        setOrderHistory([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string, currentLocalFavorites?: string[], currentLocalOrders?: any[]) => {
    if (!supabase) return;
    setIsSyncing(true);
    
    try {
      // 1. Fetch Everything from Profile
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username, email, favorites, history')
        .eq('id', userId)
        .single();
      
      // If profile doesn't exist, create it
      if (profileError?.code === 'PGRST116' || !profileData) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          const newProfile = {
            id: userId,
            email: userData.user.email || '',
            username: userData.user.user_metadata?.username || userData.user.email?.split('@')[0] || 'user',
            favorites: currentLocalFavorites || [],
            history: currentLocalOrders || []
          };
          const { data: created } = await supabase.from('profiles').insert(newProfile).select().single();
          profileData = created;
        }
      }
      
      if (profileData) {
        setProfile({ username: profileData.username, email: profileData.email });
        
        // Handle Favorites
        let cloudFavorites: string[] = Array.isArray(profileData.favorites) ? profileData.favorites : [];
        if (currentLocalFavorites && currentLocalFavorites.length > 0) {
          cloudFavorites = [...new Set([...cloudFavorites, ...currentLocalFavorites])];
          await supabase.from('profiles').update({ favorites: cloudFavorites }).eq('id', userId);
        }
        setFavorites(cloudFavorites);

        // Handle History
        let cloudHistory = Array.isArray(profileData.history) ? profileData.history : [];
        if (currentLocalOrders && currentLocalOrders.length > 0) {
          const localOnlyOrders = currentLocalOrders.filter(lo => !cloudHistory.some((dbo: any) => dbo.id === lo.id));
          if (localOnlyOrders.length > 0) {
            cloudHistory = [...localOnlyOrders, ...cloudHistory];
            await supabase.from('profiles').update({ history: cloudHistory }).eq('id', userId);
          }
        }
        setOrderHistory(cloudHistory);
      }
    } catch (err) {
      console.error('UserData fetch/sync failed:', err);
    } finally {
      setIsSyncing(false);
      setLastSynced(new Date());
    }
  };

  const t = {
    en: {
      menu: 'Menu',
      profile: 'Profile',
      favorites: 'Favorites',
      history: 'History',
      reserve: 'Reserve a Table',
      magic: 'Magic World',
      theme: 'Change Theme',
      language: 'Language',
      about: 'About Us',
      search: 'Search menu...',
      recommended: "Today's Recommendations",
      weather_picks: "Weather-based picks for Duhok",
      items: "Items Available",
      orders: "Previous Orders",
      add_to_order: "Add to Order",
      try_again: "Try Again",
      magic_suggestion: "Magic Suggestion!",
      how_feeling: "How are you feeling?",
      cold_warm: "Cold or Warm?",
      craving: "What are you craving?",
      drink_step: "Drink",
      sweet_step: "Sweet",
      hungry_step: "Hungry",
      step: "Step",
      of: "of",
      cart: {
        title: "Your Order",
        empty: "Your bag is empty",
        dine_in: "Dine In",
        drive: "Drive",
        table_num: "Table Num",
        subtotal: "Subtotal",
        total: "Total",
        order_now: "Order Now",
        processing: "Processing",
        reorder: "Re-order",
        details: "Order Details"
      },
      cart_legacy: "Your Cart", // keeping for safety during transition
      checkout: "Checkout",
      discover: "Discover",
      categories: {
        'Drinks': 'Drinks',
        'Food': 'Food',
        'Shisha': 'Shisha',
        'Hot Drinks': 'Hot Drinks',
        'Cold Drinks': 'Cold Drinks',
        'Cold Brew': 'Cold Brew',
        'Coffee Frappe': 'Coffee Frappe',
        'Mojito': 'Mojito',
        'Smoothies': 'Smoothies',
        'Milkshake': 'Milkshake',
        'Red Bull': 'Red Bull',
        'Refreshing Drinks': 'Refreshing Drinks',
        'Fresh Juice': 'Fresh Juice',
        'Detox': 'Detox',
        'Iced Tea': 'Iced Tea',
        'Tea': 'Tea',
        'Water': 'Water',
        'Matcha': 'Matcha',
        'Milk': 'Milk',
        'Hot Chocolate': 'Hot Chocolate',
        'Sweets & Cake': 'Sweets & Cake',
        'Toasts': 'Toasts',
        'COOKIES': 'Cookies'
      },
      quick_filters: {
        'All': 'All',
        'Seasonal': 'Seasonal',
        'Recommended': 'Recommended',
        'Combinations': 'Combinations'
      },
      reservation: {
        title: "Reserve a Table",
        available: "Tables 1 - 17 Available",
        name: "Name",
        phone: "Phone",
        date: "Date",
        time: "Time",
        guests: "Guests",
        confirm: "Confirm Reservation",
        reserving: "Reserving..."
      },
      about_us: {
        title: 'La Monte Restaurant & Cafe',
        desc: 'Experience the pinnacle of culinary art at La Monte. Our restaurant and cafe blend traditional flavors with modern elegance.',
        location: 'Location',
        hours: 'Hours',
        days_st: 'Sat-Thu',
        day_f: 'Fri',
        city: 'Duhok',
        address: 'Mersin Towers'
      },
      auth: {
        title: "Account",
        login: "Login",
        logout: "Logout",
        signup: "Sign Up",
        email: "Email",
        password: "Password",
        signIn: "Sign In",
        register: "Register",
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        welcome: "Welcome back!",
        loading: "Loading...",
        error: "Authentication failed.",
        configError: "Database setup missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your app Secrets.",
        username: "Username",
        emailOrUsername: "Email or Username",
        userNotFound: "User not found with this username.",
        usernameTaken: "Username already taken.",
        usernameShort: "Username must be at least 3 characters.",
        checkEmail: "Check your email for the confirmation link!"
      }
    },
    ku: {
      menu: 'مینیو',
      profile: 'پرۆفایل',
      favorites: 'دڵخوازەکان',
      history: 'داواکارییەکان',
      reserve: 'حیجزکردنی مێز',
      magic: 'جیهانی سیحراوی',
      theme: 'گۆڕینی ڕەنگ',
      language: 'زمان',
      about: 'دەربارەی ئێمە',
      search: 'گەڕان لە مینیو...',
      recommended: "پێشنیارەکانی ئەمڕۆ",
      weather_picks: "پێشنیارەکان بەپێی کەشوهەوای دهۆک",
      items: "پارچە بەردەستەکان",
      orders: "داواکارییەکانی پێشوو",
      add_to_order: "زيادکردن بۆ داواکاری",
      try_again: "دووبارە هەوڵبدەرەوە",
      magic_suggestion: "پێشنیاری سیحراوی!",
      how_feeling: "هەست بە چی دەکەیت؟",
      cold_warm: "سارد یان گەرم؟",
      craving: "حەزت لە چییە؟",
      drink_step: "خواردنەوە",
      sweet_step: "شیرینی",
      hungry_step: "برسییەتی",
      step: "هەنگاوی",
      of: "لە",
      cart: {
        title: "داواکارییەکەت",
        empty: "کارتەکەت بەتاڵە",
        dine_in: "لێرە دەخۆم",
        drive: "تێپەڕبوو",
        table_num: "ژمارەی مێز",
        subtotal: "کۆى گشتى بچووک",
        total: "کۆی گشتی",
        order_now: "ئێستا داوا بکە",
        processing: "لە پڕۆسەدایە",
        reorder: "دووبارە داوا بکەرەوە",
        details: "وردەکارییەکانی داواکاری"
      },
      checkout: "تەواوکردنی کڕین",
      discover: "دۆزینەوە",
      categories: {
        'Drinks': 'خواردنەوەکان',
        'Food': 'خواردن',
        'Shisha': 'نێرگەلە',
        'Hot Drinks': 'خواردنەوە گەرمەکان',
        'Cold Drinks': 'خواردنەوە ساردەکان',
        'Cold Brew': 'کۆڵد برو',
        'Coffee Frappe': 'کۆفی فراپێ',
        'Mojito': 'مۆهیتۆ',
        'Smoothies': 'سمووزی',
        'Milkshake': 'میلک شیک',
        'Red Bull': 'ریدبوڵ',
        'Refreshing Drinks': 'خواردنەوە تازەگەرییەکان',
        'Fresh Juice': 'شەربەتی تازە',
        'Detox': 'دیتۆکس',
        'Iced Tea': 'ایس تی',
        'Tea': 'چای',
        'Water': 'ئاو',
        'Matcha': 'ماچای',
        'Milk': 'شیر',
        'Hot Chocolate': 'شۆکۆلاتەی گەرم',
        'Sweets & Cake': 'شیرینی و کێک',
        'Toasts': 'تۆست',
        'COOKIES': 'کۆکیز'
      },
      quick_filters: {
        'All': 'هەمووی',
        'Seasonal': 'وەرزی',
        'Recommended': 'پێشنیارکراو',
        'Combinations': 'تێکەڵەکان'
      },
      reservation: {
        title: "حیجزکردنی مێز",
        available: "مێزەکانی ١ - ١٧ بەردەستن",
        name: "ناو",
        phone: "تەلەفۆن",
        date: "بەروار",
        time: "کات",
        guests: "کەس",
        confirm: "پشتڕاستکردنەوە",
        reserving: "لە پڕۆسەی حیجزکردنە..."
      },
      about_us: {
        title: 'ڕێستورانت و کافێی لا مۆنت',
        desc: 'لوتکەی هونەری لێنانی خواردن لە لا مۆنت ئەزموون بکە. ڕێستورانت و کافێی ئێمە تێکەڵەیەک لە تامە نەریتییەکان و هاوچەرخی پێشکەش دەکات.',
        location: 'شوێن',
        hours: 'کاتژمێرەکان',
        days_st: 'شەممە-پێنجشەممە',
        day_f: 'هەینی',
        city: 'دهۆک',
        address: 'تاوەرەکانی مێرسین'
      },
      auth: {
        title: "هەژمار",
        login: "چوونەژوورەوە",
        logout: "چوونەدەرەوە",
        signup: "خۆتۆمارکردن",
        email: "ئیمەیل",
        password: "وشەی نهێنی",
        signIn: "بچۆرە ژوورەوە",
        register: "تۆمارکردن",
        noAccount: "هەژمارت نییە؟",
        haveAccount: "هەژمارت هەیە؟",
        welcome: "بەخێربێیتەوە!",
        loading: "لە پڕۆسەدایە...",
        error: "پڕۆسەی چوونەژوورەوە سەرکەوتوو نەبوو.",
        configError: "ڕێکخستنی بنکەی زانیاری بوونی نییە. تکایە VITE_SUPABASE_URL زیاد بکە بۆ نهێنییەکانی بەرنامەکە.",
        username: "ناوی بەکارهێنەر",
        emailOrUsername: "ئیمەیل یان ناوی بەکارهێنەر",
        userNotFound: "بەکارهێنەر بەم ناوە نەدۆزرایەوە.",
        usernameTaken: "ئەم ناوە پێشتر گیراوە.",
        usernameShort: "ناوی بەکارهێنەر دەبێت لانی کەم ٣ پیت بێت.",
        checkEmail: "سەیری ئیمەیڵەکەت بکە بۆ لینکی دڵنیابوونەوە!"
      }
    },
    ar: {
      menu: 'القائمة',
      profile: 'الملف الشخصي',
      favorites: 'المفضلات',
      history: 'سجل الطلبات',
      reserve: 'حجز طاولة',
      magic: 'العالم السحري',
      theme: 'تغيير المظهر',
      language: 'اللغة',
      about: 'حولنا',
      search: 'بحث في القائمة...',
      recommended: "توصيات اليوم",
      weather_picks: "توصيات بناءً على طقس دهوك",
      items: "عناصر متاحة",
      orders: "طلبات سابقة",
      add_to_order: "إضافة إلى الطلب",
      try_again: "حاول مرة أخرى",
      magic_suggestion: "اقتراح سحري!",
      how_feeling: "كيف تشعر؟",
      cold_warm: "بارد أم دافئ؟",
      craving: "ماذا تشتهي؟",
      drink_step: "مشروب",
      sweet_step: "حلوي",
      hungry_step: "جائع",
      step: "خطوة",
      of: "من",
      cart: {
        title: "طلبك",
        empty: "سلتك فارغة",
        dine_in: "محلي",
        drive: "سفري",
        table_num: "رقم الطاولة",
        subtotal: "المجموع الفرعي",
        total: "المجموع الكلي",
        order_now: "اطلب الآن",
        processing: "جاري المعالجة",
        reorder: "إعادة الطلب",
        details: "تفاصيل الطلب"
      },
      checkout: "الدفع",
      discover: "اکتشف",
      categories: {
        'Drinks': 'المشروبات',
        'Food': 'الطعام',
        'Shisha': 'الأرجيلة',
        'Hot Drinks': 'مشروبات ساخنة',
        'Cold Drinks': 'مشروبات باردة',
        'Cold Brew': 'کولد برو',
        'Coffee Frappe': 'کوفي فرابية',
        'Mojito': 'موهيتو',
        'Smoothies': 'سموذي',
        'Milkshake': 'ميلك شيك',
        'Red Bull': 'ريد بول',
        'Refreshing Drinks': 'مشروبات منعشة',
        'Fresh Juice': 'عصير طازج',
        'Detox': 'ديتوكس',
        'Iced Tea': 'آيس تي',
        'Tea': 'شاي',
        'Water': 'ماء',
        'Matcha': 'ماتشا',
        'Milk': 'حليب',
        'Hot Chocolate': 'شوكولاتة ساخنة',
        'Sweets & Cake': 'حلويات وكيك',
        'Toasts': 'توست',
        'COOKIES': 'كوكيز'
      },
      quick_filters: {
        'All': 'الكل',
        'Seasonal': 'موسمي',
        'Recommended': 'موصى به',
        'Combinations': 'خلطات'
      },
      reservation: {
        title: "حجز طاولة",
        available: "الطاولات من 1 إلى 17 متوفرة",
        name: "الاسم",
        phone: "الهاتف",
        date: "التاريخ",
        time: "الوقت",
        guests: "الأشخاص",
        confirm: "تأكيد الحجز",
        reserving: "جاري الحجز..."
      },
      about_us: {
        title: 'مطعم ومقهى لا مونت',
        desc: 'استمتع بقمة فنون الطهي في لا مونت. يمزج مطعمنا ومقهانا بين النكهات التقليدية والأناقة العصرية.',
        location: 'الموقع',
        hours: 'الساعات',
        days_st: 'السبت-الخميس',
        day_f: 'الجمعة',
        city: 'دهوك',
        address: 'أبراج مرسين'
      },
      auth: {
        title: "الحساب",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        signup: "إنشاء حساب",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        signIn: "تسجيل الدخول",
        register: "تسجيل",
        noAccount: "ليس لديك حساب؟",
        haveAccount: "لديك حساب بالفعل؟",
        welcome: "مرحباً بعودتك!",
        loading: "جاري التحميل...",
        error: "فشل تسجيل الدخول.",
        configError: "إعداد قاعدة البيانات مفقود. يرجى إضافة VITE_SUPABASE_URL إلى أسرار التطبيق.",
        username: "اسم المستخدم",
        emailOrUsername: "البريد الإلكتروني أو اسم المستخدم",
        userNotFound: "لم يتم العثور على المستخدم بهذا الاسم.",
        usernameTaken: "اسم المستخدام مأخوذ بالفعل.",
        usernameShort: "يجب أن يكون اسم المستخدم 3 أحرف على الأقل.",
        checkEmail: "تحقق من بريدك الإلكتروني للحصول على رابط التأكيد!"
      }
    }
  }[language];

  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowBars(false);
      } else {
        setShowBars(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Effect
  useEffect(() => {
    const palette = PALETTES[theme];
    const root = document.documentElement;
    
    root.style.setProperty('--bg-color', palette.bg);
    root.style.setProperty('--text-color', palette.text);
    root.style.setProperty('--text-color-rgb', palette.textRgb);
    root.style.setProperty('--glass-bg', palette.glassBg);
    root.style.setProperty('--glass-border', palette.glassBorder);
    root.style.setProperty('--glass-dark-bg', palette.glassDarkBg);
    root.style.setProperty('--glass-dark-border', palette.glassDarkBorder);
    root.style.setProperty('--accent-color', palette.accent);
    root.style.setProperty('--glow-opacity', palette.glowOpacity.toString());
    root.style.setProperty('--atmosphere1', palette.atmosphere1);
    root.style.setProperty('--atmosphere2', palette.atmosphere2);
    
    // Remove old theme classes just in case
    root.classList.remove('theme-cream', 'theme-emerald');
  }, [theme]);

  // Load data from localStorage
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    
    const savedCart = localStorage.getItem('cafe_cart');
    const savedFavs = localStorage.getItem('cafe_favorites');
    const savedHistory = localStorage.getItem('cafe_history');
    const savedTheme = localStorage.getItem('cafe_theme');
    const savedViewMode = localStorage.getItem('cafe_view_mode');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHistory) setOrderHistory(JSON.parse(savedHistory));
    if (savedTheme) setTheme(savedTheme as any);
    if (savedViewMode) setViewMode(savedViewMode as any);

    return () => clearTimeout(timer);
  }, []);

  // Weather and Recommendation Logic
  useEffect(() => {
    const initWeather = async () => {
      const data = await fetchDuhokWeather();
      setWeather(data);

      const drinks = MENU_ITEMS.filter(i => i.mainCategory === 'Drinks');
      const cakes = MENU_ITEMS.filter(i => i.category === 'Sweets & Cake');
      const toasts = MENU_ITEMS.filter(i => i.category === 'Toasts');

      // Deterministic selection based on current date and weather
      const today = new Date().toDateString();
      const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const selectOne = (items: MenuItem[], isCold: boolean) => {
        if (items.length === 0) return null;
        // Filter by weather if possible
        const weatherMatches = items.filter(i => {
          if (isCold) return i.category === 'Hot Drinks' || i.description.toLowerCase().includes('warm') || i.description.toLowerCase().includes('hot');
          return i.category === 'Cold Drinks' || i.category === 'Cold Brew' || i.category === 'Coffee Frappe' || i.description.toLowerCase().includes('ice');
        });
        const pool = weatherMatches.length > 0 ? weatherMatches : items;
        return pool[seed % pool.length].id;
      };

      const selected = [
        selectOne(drinks, data.isCold),
        selectOne(cakes, data.isCold),
        selectOne(toasts, data.isCold)
      ].filter(Boolean) as string[];

      setRecommendedIds(selected);
    };

    initWeather();
  }, []);

  useEffect(() => {
    // Only save to localStorage if we're not currently syncing from the cloud
    // This prevents overwriting local data with temporary empty states during login
    if (!isSyncing) {
      localStorage.setItem('cafe_cart', JSON.stringify(cart));
      localStorage.setItem('cafe_favorites', JSON.stringify(favorites));
      localStorage.setItem('cafe_history', JSON.stringify(orderHistory));
      localStorage.setItem('cafe_theme', theme);
      localStorage.setItem('cafe_view_mode', viewMode);
    }
  }, [cart, favorites, orderHistory, theme, viewMode, isSyncing]);

  // Memoized Filtering Logic
  const filteredItems = useMemo(() => {
    const search = deferredSearchQuery.toLowerCase();
    
    return MENU_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search) || 
                           item.description.toLowerCase().includes(search);
      
      if (currentView === 'favorites') {
        return favorites.includes(item.id) && matchesSearch;
      }

      if (activeQuickFilter === 'Recommended') {
        return recommendedIds.includes(item.id) && matchesSearch;
      }

      const matchesQuickFilter = activeQuickFilter === 'All' ||
        (activeQuickFilter === 'Seasonal' && item.isSeasonal) ||
        (activeQuickFilter === 'Combinations' && item.isCombination);
      
      return item.mainCategory === activeMainCategory && 
             item.category === activeCategory && 
             matchesSearch && 
             matchesQuickFilter;
    });
  }, [deferredSearchQuery, currentView, favorites, activeMainCategory, activeCategory, activeQuickFilter, recommendedIds]);

  const addToCart = useCallback((item: MenuItem, note: string = '') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.note === note);
      if (existing) {
        return prev.map(i => (i.id === item.id && i.note === note) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, note }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, note?: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.note === note)));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number, note?: string) => {
    setCart(prev => prev.map(i => {
      if (i.id === id && i.note === note) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  }, []);

  const handleReorder = (items: CartItem[]) => {
    setCart(prev => {
      let newCart = [...prev];
      items.forEach(newItem => {
        const existing = newCart.find(i => i.id === newItem.id && i.note === newItem.note);
        if (existing) {
          existing.quantity += newItem.quantity;
        } else {
          newCart.push({ ...newItem });
        }
      });
      return newCart;
    });
    setIsCartOpen(true);
    setSelectedOrder(null);
  };

  const toggleFavorite = useCallback(async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isFavorite = favorites.includes(id);
    const newFavorites = isFavorite 
      ? favorites.filter(fid => fid !== id) 
      : [...favorites, id];
    
    setFavorites(newFavorites);

    if (user && supabase) {
      setIsSyncing(true);
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ favorites: newFavorites })
          .eq('id', user.id);
        
        if (error) throw error;
        setLastSynced(new Date());
      } catch (err) {
        console.error('Supabase favorites update error:', err);
      } finally {
        setIsSyncing(false);
      }
    }
  }, [favorites, user]);

  const checkout = async () => {
    if (cart.length === 0) return;
    setIsOrdering(true);
    
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const orderDate = new Date().toLocaleString();
    const total = calculateTotal();
    
    // Create Supabase persistence function
    const persistToSupabase = async (newOrder: any) => {
      if (user && supabase) {
        setIsSyncing(true);
        try {
          // Fetch current history first to append
          const { data } = await supabase.from('profiles').select('history').eq('id', user.id).single();
          const currentHistory = Array.isArray(data?.history) ? data.history : [];
          
          const { error } = await supabase
            .from('profiles')
            .update({ 
              history: [newOrder, ...currentHistory] 
            })
            .eq('id', user.id);
            
          if (error) throw error;
          setLastSynced(new Date());
        } catch (err) {
          console.error('Supabase history update error:', err);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    // Prepare Telegram message
    let message = `🆕 *New Order: #${orderId}*\n`;
    message += `📅 Date: ${orderDate}\n`;
    message += `🚗 *Order Type: ${orderType === 'drive-through' ? 'Drive Through' : 'Dine In'}*\n`;
    if (orderType === 'dine-in') {
      message += `📍 *Table Number: ${tableNumber || 'Not specified'}*\n\n`;
    } else {
      message += `\n`;
    }
    message += `🛒 *Items:*\n`;
    cart.forEach(item => {
      message += `- ${item.name} x${item.quantity} (${item.price})\n`;
      if (item.note) {
        message += `  📝 _Note: ${item.note}_\n`;
      }
    });
    message += `\n💰 *Total: ${total}*`;

    try {
      const botToken = '8697462798:AAGZ_erAA-jsXrtrrLhUa6NPIvuARvkEOx0';
      // Note: You need a Chat ID to send messages. 
      // Replace 'YOUR_CHAT_ID' with your actual Telegram Chat ID or Group ID.
      const chatId = '8241860308';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send Telegram message');
      }

      const newOrder = {
        id: orderId,
        date: orderDate,
        items: [...cart],
        total: total,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        orderType: orderType
      };
      
      setOrderHistory(prev => [newOrder, ...prev]);
      setCart([]);
      setTableNumber('');
      setIsCartOpen(false);
      setShowOrderSuccess(true);
      setTimeout(() => setShowOrderSuccess(false), 3000);

      // Persist directly into Profile Table
      await persistToSupabase(newOrder);
    } catch (error) {
      console.error('Error sending order:', error);
      const newOrder = {
        id: orderId,
        date: orderDate,
        items: [...cart],
        total: total,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        orderType: orderType
      };
      setOrderHistory(prev => [newOrder, ...prev]);
      setCart([]);
      setIsCartOpen(false);
      setShowOrderSuccess(true);
      setTimeout(() => setShowOrderSuccess(false), 3000);
      
      // Still try to persist to Supabase
      await persistToSupabase(newOrder);
    } finally {
      setIsOrdering(false);
    }
  };

  const handleReservation = async () => {
    const { name, phone, table, date, time } = reservationData;
    if (!name || !phone || !table || !date || !time) return;
    
    setIsReserving(true);
    
    const reservationId = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    let message = `📅 *New Table Reservation: #${reservationId}*\n`;
    message += `👤 Name: ${name}\n`;
    message += `📞 Phone: ${phone}\n`;
    message += `🪑 *Table Number: ${table}*\n`;
    message += `🗓️ Date: ${date}\n`;
    message += `⏰ Time: ${time}\n`;

    try {
      const botToken = '8697462798:AAGZ_erAA-jsXrtrrLhUa6NPIvuARvkEOx0';
      const chatId = '8241860308';
      
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send Telegram message');
      }

      setIsReservationOpen(false);
      setShowReservationSuccess(true);
      setReservationData({ name: '', phone: '', table: '', date: '', time: '' });
      setTimeout(() => setShowReservationSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending reservation:', error);
      // Fallback success for demo
      setIsReservationOpen(false);
      setShowReservationSuccess(true);
      setTimeout(() => setShowReservationSuccess(false), 3000);
    } finally {
      setIsReserving(false);
    }
  };

  const calculateTotal = useCallback(() => {
    const total = cart.reduce((acc, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return acc + (price * item.quantity);
    }, 0);
    return total.toLocaleString() + ' IQD';
  }, [cart]);

  const mainCategories: { name: MainCategory; icon: any }[] = [
    { name: 'Drinks', icon: Coffee },
    { name: 'Food', icon: Utensils },
    { name: 'Shisha', icon: Flame },
  ];

  const categories: { name: Category; icon: any; main: MainCategory }[] = [
    { name: 'Hot Drinks', icon: Coffee, main: 'Drinks' },
    { name: 'Cold Drinks', icon: GlassWater, main: 'Drinks' },
    { name: 'Cold Brew', icon: Coffee, main: 'Drinks' },
    { name: 'Coffee Frappe', icon: Coffee, main: 'Drinks' },
    { name: 'Mojito', icon: Wind, main: 'Drinks' },
    { name: 'Smoothies', icon: Wind, main: 'Drinks' },
    { name: 'Milkshake', icon: IceCream, main: 'Drinks' },
    { name: 'Red Bull', icon: Zap, main: 'Drinks' },
    { name: 'Refreshing Drinks', icon: Wind, main: 'Drinks' },
    { name: 'Fresh Juice', icon: Droplets, main: 'Drinks' },
    { name: 'Detox', icon: Leaf, main: 'Drinks' },
    { name: 'Iced Tea', icon: Coffee, main: 'Drinks' },
    { name: 'Tea', icon: Coffee, main: 'Drinks' },
    { name: 'Milk', icon: GlassWater, main: 'Drinks' },
    { name: 'Hot Chocolate', icon: Coffee, main: 'Drinks' },
    { name: 'Water', icon: Droplets, main: 'Drinks' },
    { name: 'Matcha', icon: Leaf, main: 'Drinks' },
    { name: 'Shisha', icon: Flame, main: 'Shisha' },
    { name: 'Sweets & Cake', icon: Cookie, main: 'Food' },
    { name: 'Toasts', icon: Sandwich, main: 'Food' },
    { name: 'COOKIES', icon: Cookie, main: 'Food' },
  ];

  const filteredCategories = categories.filter(cat => cat.main === activeMainCategory);

  const logoUrl = "https://i.ibb.co/995h3pcg/logo.png";

  return (
    <div className="min-h-screen font-sans text-[var(--text-color)] overflow-x-hidden selection:bg-[var(--accent-color)]/30 bg-[var(--bg-color)]">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#F9F8F6] overflow-hidden"
          >
            {/* Atmospheric Background for Intro */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1.2 }}
                transition={{ duration: 4, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full bg-radial from-[var(--accent-color)]/5 via-transparent to-transparent blur-[100px]" 
              />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="mb-8"
              >
                <img 
                  src={logoUrl} 
                  alt="La Monte Logo" 
                  className="w-80 md:w-[450px] h-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.05)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="flex flex-col items-center"
              >
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--text-color)]/40 to-transparent mb-4" />
                <p className="text-[10px] uppercase tracking-[0.8em] text-[var(--text-color)]/40 font-bold">Experience the Dawn</p>
              </motion.div>
            </div>

            {/* Cinematic Scanline */}
            <motion.div 
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 3, ease: "linear", repeat: 0 }}
              className="absolute left-0 right-0 h-[2px] bg-white/10 blur-sm z-20 pointer-events-none"
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="atmosphere-bg" />
            
            {/* Top Navigation Bar */}
            <motion.header 
              animate={{ 
                y: showBars ? 0 : -120,
                opacity: showBars ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-[60px] z-50 glass rounded-[2rem] px-4 md:px-8 flex items-center justify-between shadow-2xl"
            >
              <div className="flex items-center gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center cursor-pointer h-12 px-1 overflow-hidden"
                  onClick={() => { setCurrentView('menu'); setActiveCategory('Hot Drinks'); }}
                >
                  <img 
                    src={logoUrl} 
                    alt="La Monte" 
                    className="h-full w-auto object-contain brightness-110"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                <div className="h-8 w-px bg-white/10 hidden md:block" />

                <nav className="hidden md:flex items-center gap-5 text-sm font-medium opacity-60">
                  <motion.button 
                    whileHover={{ scale: 1.1, textShadow: "0 0 8px rgba(var(--text-color-rgb, 255, 255, 255), 0.5)" }}
                    onClick={() => setCurrentView('menu')}
                    className={`transition-colors flex items-center gap-2 ${currentView === 'menu' ? 'text-[var(--text-color)] opacity-100' : 'hover:text-[var(--text-color)]'}`}
                  >
                    <Home size={14} />
                    {t.menu}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, textShadow: "0 0 8px rgba(var(--text-color-rgb, 255, 255, 255), 0.5)" }}
                    onClick={() => setCurrentView('profile')}
                    className={`transition-colors flex items-center gap-2 ${currentView === 'profile' ? 'text-[var(--text-color)] opacity-100' : 'hover:text-[var(--text-color)]'}`}
                  >
                    <UserIcon size={14} />
                    {t.profile}
                  </motion.button>
                </nav>
              </div>

              <div className="flex items-center gap-2 md:gap-4 flex-grow max-w-md mx-2 md:mx-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative w-fit"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={16} />
                  <input 
                    type="text"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-48 h-10 glass rounded-2xl pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/20 transition-all placeholder:opacity-20"
                  />
                </motion.div>
                {weather && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:flex items-center gap-2 px-3 py-1.5 glass rounded-full"
                  >
                    {weather.isCold ? <div className="p-1 bg-blue-500/20 rounded-full"><Wind size={10} className="text-blue-400" /></div> : <div className="p-1 bg-orange-500/20 rounded-full"><Sun size={10} className="text-orange-400" /></div>}
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold leading-tight">{weather.temp}°C Duhok</span>
                      <span className="text-[8px] opacity-40 leading-tight uppercase font-medium">{weather.condition}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsInfoOpen(true)}
                  className="hidden p-2.5 hover:bg-white/10 rounded-2xl transition-all text-white/60 hover:text-white"
                  title="About Us"
                >
                  <Info size={20} />
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const modes: ('grid' | 'list' | 'minimal' | 'compact' | 'magazine')[] = ['grid', 'list', 'minimal', 'compact', 'magazine'];
                    const nextIndex = (modes.indexOf(viewMode) + 1) % modes.length;
                    setViewMode(modes[nextIndex]);
                  }}
                  className="hidden p-2.5 hover:bg-white/10 rounded-2xl transition-all relative group"
                  title={`Switch to ${
                    viewMode === 'grid' ? 'list' : 
                    viewMode === 'list' ? 'minimal' : 
                    viewMode === 'minimal' ? 'compact' : 
                    viewMode === 'compact' ? 'magazine' : 'grid'
                  } view`}
                >
                  {viewMode === 'grid' && <LayoutGrid size={20} className="group-hover:scale-110 transition-transform" />}
                  {viewMode === 'list' && <LayoutList size={20} className="group-hover:scale-110 transition-transform" />}
                  {viewMode === 'minimal' && <LayoutTemplate size={20} className="group-hover:scale-110 transition-transform" />}
                  {viewMode === 'compact' && <Layout size={20} className="group-hover:scale-110 transition-transform" />}
                  {viewMode === 'magazine' && <Sparkles size={20} className="group-hover:scale-110 transition-transform" />}
                </motion.button>



                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(true)}
                  className="p-2.5 hover:bg-white/10 rounded-2xl transition-all relative group"
                >
                  <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                  {cart.length > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg animate-in zoom-in"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2.5 hover:bg-white/10 rounded-2xl transition-all relative group"
                >
                  <Menu size={20} className="group-hover:scale-110 transition-transform" />
                </motion.button>
              </div>
            </motion.header>

            {/* Top Floating Navigation (Under Header) */}
            {currentView === 'menu' && (
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ 
                  y: showBars ? 0 : -150,
                  opacity: showBars ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-28 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 w-full max-w-[95vw]"
              >
                {/* Main Categories */}
                <nav className="glass rounded-full pl-[4px] pt-[5px] pr-1 pb-1 ml-0 -mt-[10px] flex items-center gap-1 shadow-xl shadow-[var(--text-color)]/10 overflow-x-auto no-scrollbar">
                  {mainCategories.map((main) => (
                    <motion.button
                      key={main.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveMainCategory(main.name);
                        const firstSub = categories.find(c => c.main === main.name);
                        if (firstSub) setActiveCategory(firstSub.name);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                        activeMainCategory === main.name
                          ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-lg'
                          : 'opacity-60 hover:opacity-100 hover:bg-[var(--text-color)]/10'
                      }`}
                    >
                      <main.icon size={10} />
                      {t.categories[main.name] || main.name}
                    </motion.button>
                  ))}
                </nav>

                {/* Sub Categories */}
                <nav className="glass rounded-full p-1 flex items-center gap-1 shadow-lg shadow-[var(--text-color)]/5 overflow-x-auto no-scrollbar max-w-full w-[337.5px] h-[35.9141px]">
                  {filteredCategories.map((cat) => (
                    <motion.button
                      key={cat.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeCategory === cat.name
                          ? 'bg-[var(--accent-color)] text-white shadow-md'
                          : 'opacity-50 hover:opacity-100 hover:bg-white/5'
                      }`}
                    >
                      {t.categories[cat.name] || cat.name}
                    </motion.button>
                  ))}
                </nav>

                {/* Quick Filters Row */}
                <nav className="glass rounded-full p-1 flex items-center gap-1 shadow-lg shadow-[var(--text-color)]/5 overflow-x-auto no-scrollbar max-w-full">
                  {(['All', 'Seasonal', 'Recommended', 'Combinations'] as const).map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveQuickFilter(filter)}
                      className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        activeQuickFilter === filter
                          ? filter === 'Recommended' ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-md'
                          : 'opacity-50 hover:opacity-100 hover:bg-white/5'
                      }`}
                    >
                      {filter === 'Recommended' && <Sun size={8} className={activeQuickFilter === 'Recommended' ? 'animate-pulse' : ''} />}
                      {t.quick_filters[filter] || filter}
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            )}

            <main className="pt-60 pb-32 px-4 max-w-7xl mx-auto min-h-[80vh]">
              <AnimatePresence mode="wait">
                {currentView === 'profile' ? (
                  <motion.div
                    key="profile-view"
                    initial={{ opacity: 0, scale: 0.98, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -30 }}
                    className="w-full"
                  >
                    {/* User Profile Header */}
                    <div className="glass rounded-[3rem] p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent-color)]/5 rounded-full -mr-40 -mt-40 blur-[100px]" />
                      
                      <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full glass border-4 border-[var(--bg-color)] shadow-2xl overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                          {user ? (
                            <img 
                              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${profile?.username || user.email}`} 
                              alt="Avatar" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon size={56} className="opacity-10" />
                          )}
                        </div>
                        {user && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute bottom-2 right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-[var(--bg-color)] shadow-lg flex items-center justify-center"
                          >
                            <CheckCircle2 size={12} className="text-white" />
                          </motion.div>
                        )}
                      </div>

                      <div className="text-center md:text-left flex-1 relative z-10">
                        <motion.h1 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-4xl md:text-5xl font-serif italic mb-3 tracking-tight"
                        >
                          {user ? (profile?.username ? `@${profile.username}` : user.email?.split('@')[0]) : (language === 'en' ? 'Guest' : language === 'ar' ? 'ضيف' : 'میوان')}
                        </motion.h1>
                        <p className="opacity-40 text-sm tracking-[0.3em] uppercase font-bold mb-8">
                          {user ? user.email : (language === 'en' ? 'Login to unlock your history' : language === 'ar' ? 'سجل الدخول لعرض سجلاتك' : 'بچۆرە ژوورەوە بۆ بینینی مێژووەکەت')}
                        </p>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                          {!user ? (
                            <motion.button
                              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setIsAuthOpen(true)}
                              className="bg-[var(--text-color)] text-[var(--bg-color)] px-10 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all"
                            >
                              {t.auth.login}
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => supabase?.auth.signOut()}
                              className="glass border border-[var(--text-color)]/10 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-red-500/10 hover:border-red-500/30 transition-all flex items-center gap-2"
                            >
                              <LogOut size={14} /> {t.auth.logout}
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {user && (
                        <div className="flex gap-4 md:flex-col lg:flex-row">
                          <motion.div 
                            whileHover={{ y: -5 }}
                            className="text-center px-8 py-5 glass-dark rounded-[2.5rem] min-w-[120px] shadow-xl"
                          >
                            <p className="text-3xl font-serif italic mb-1 text-[var(--accent-color)]">{orderHistory.length}</p>
                            <p className="text-[10px] uppercase tracking-widest font-black opacity-30">{t.history}</p>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -5 }}
                            className="text-center px-8 py-5 glass-dark rounded-[2.5rem] min-w-[120px] shadow-xl"
                          >
                            <p className="text-3xl font-serif italic mb-1 text-red-500/80">{favorites.length}</p>
                            <p className="text-[10px] uppercase tracking-widest font-black opacity-30">{t.favorites}</p>
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Personal Activity Tabs */}
                    {user && (
                      <div className="space-y-10">
                        <div className="flex items-center justify-center md:justify-start gap-8 border-b border-[var(--text-color)]/5 pb-2">
                          <button 
                            onClick={() => setProfileTab('history')}
                            className={`px-2 py-4 text-sm font-black uppercase tracking-widest transition-all relative ${profileTab === 'history' ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                          >
                            <span className="flex items-center gap-2"><History size={14} /> {t.history}</span>
                            {profileTab === 'history' && (
                              <motion.div layoutId="profile-tab-active" className="absolute bottom-[-2px] left-0 right-0 h-1 bg-[var(--accent-color)] rounded-full" />
                            )}
                          </button>
                          <button 
                            onClick={() => setProfileTab('favorites')}
                            className={`px-2 py-4 text-sm font-black uppercase tracking-widest transition-all relative ${profileTab === 'favorites' ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                          >
                            <span className="flex items-center gap-2"><Heart size={14} /> {t.favorites}</span>
                            {profileTab === 'favorites' && (
                              <motion.div layoutId="profile-tab-active" className="absolute bottom-[-2px] left-0 right-0 h-1 bg-red-400 rounded-full" />
                            )}
                          </button>
                        </div>

                        <AnimatePresence mode="wait">
                          {profileTab === 'history' ? (
                            <motion.div
                              key="tab-hist"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-6"
                            >
                              {orderHistory.length > 0 ? (
                                orderHistory.map((order) => (
                                  <motion.div 
                                    key={order.id} 
                                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.02)" }}
                                    className="glass-dark rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between gap-8 transition-all border border-white/5 shadow-2xl group"
                                  >
                                    <div className="space-y-6">
                                      <div className="flex items-center gap-4">
                                        <div className="px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 group-hover:border-[var(--accent-color)]/30 transition-colors">
                                          Order #{order.id}
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-40 text-[10px] font-bold uppercase tracking-widest">
                                          <Clock size={10} /> {order.date}
                                        </div>
                                      </div>
                                      <div className="flex -space-x-5">
                                        {order.items.slice(0, 5).map((item, i) => (
                                          <motion.div 
                                            key={i} 
                                            whileHover={{ y: -8, zIndex: 10, scale: 1.1 }}
                                            className="w-14 h-14 rounded-full border-[3px] border-[#0A0A0B] overflow-hidden bg-white/5 shadow-lg cursor-pointer"
                                          >
                                            <img src={item.thumbnail || item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                          </motion.div>
                                        ))}
                                        {order.items.length > 5 && (
                                          <div className="w-14 h-14 rounded-full border-[3px] border-[#0A0A0B] bg-[var(--text-color)]/10 flex items-center justify-center text-[10px] font-black tracking-tighter backdrop-blur-md">
                                            +{order.items.length - 5}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-col justify-between items-end gap-6">
                                      <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-widest font-black opacity-20 mb-1">Total Amount</p>
                                        <p className="text-3xl font-serif italic text-glow">{order.total}</p>
                                      </div>
                                      <div className="flex items-center gap-6">
                                        <motion.button 
                                          whileHover={{ scale: 1.05, color: "#fff" }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => handleReorder(order.items)}
                                          className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent-color)] flex items-center gap-2 group/btn"
                                        >
                                          <ShoppingBag size={14} className="group-hover/btn:rotate-12 transition-transform" /> {t.cart.reorder}
                                        </motion.button>
                                        <motion.button 
                                          whileHover={{ x: 5, opacity: 1 }}
                                          onClick={() => setSelectedOrder(order)}
                                          className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 flex items-center gap-2 hover:text-[var(--text-color)] transition-all"
                                        >
                                          Details <ChevronRight size={14} />
                                        </motion.button>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))
                              ) : (
                                <div className="py-32 flex flex-col items-center justify-center glass rounded-[3rem] border border-dashed border-white/10">
                                  <Clock className="opacity-10 mb-6" size={64} strokeWidth={1} />
                                  <p className="opacity-40 uppercase tracking-[0.3em] font-black text-xs">Awaiting your first taste</p>
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="tab-favs"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
                            >
                              {favorites.length > 0 ? (
                                MENU_ITEMS.filter(item => favorites.includes(item.id)).map((item, index) => (
                                  <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    viewMode="grid"
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                    setSelectedItem={setSelectedItem}
                                    language={language}
                                    t={t}
                                  />
                                ))
                              ) : (
                                <div className="col-span-full py-32 flex flex-col items-center justify-center glass rounded-[3rem] border border-dashed border-white/10">
                                  <Heart className="opacity-10 mb-6 text-red-500" size={64} strokeWidth={1} />
                                  <p className="opacity-40 uppercase tracking-[0.3em] font-black text-xs">Heart a few items to see them here</p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <>
                    {/* Catalog Header */}
                    <div className="mb-14 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                       <div className="space-y-2">
                        <motion.h2 
                          key={activeCategory}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-4xl md:text-5xl font-serif italic text-glow"
                        >
                          {activeQuickFilter === 'Recommended' 
                              ? t.recommended 
                              : (t.categories[activeCategory] || activeCategory)}
                        </motion.h2>
                        <p className="opacity-40 text-xs tracking-[0.4em] uppercase font-black">
                          {activeQuickFilter === 'Recommended' 
                            ? `${t.weather_picks} ${weather ? `(${weather.temp}°C)` : ''}`
                            : `${t.categories[activeMainCategory] || activeMainCategory} / ${filteredItems.length} ${t.items}`}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      key={currentView + activeCategory + searchQuery + viewMode}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={
                        viewMode === 'grid' 
                          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
                          : viewMode === 'list'
                          ? "flex flex-col gap-4 max-w-3xl mx-auto"
                          : "grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto"
                      }
                    >
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            index={index}
                            viewMode={viewMode}
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                            setSelectedItem={setSelectedItem}
                            language={language}
                            t={t}
                          />
                        ))
                      ) : (
                        <div className="col-span-full py-40 flex flex-col items-center justify-center glass rounded-[4rem] text-center">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Search className="opacity-10 mb-6" size={80} strokeWidth={1} />
                          </motion.div>
                          <h3 className="text-xl font-serif italic mb-2">No flavor matches</h3>
                          <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Try adjusting your filters or search terms</p>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </main>

            {/* Item Detail Modal */}
            <AnimatePresence>
              {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => { setSelectedItem(null); setItemNote(''); }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="relative w-[92%] md:w-full max-w-lg glass rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col items-center shadow-2xl p-5 md:p-8"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-32 h-32 md:w-48 md:h-48 relative group cursor-zoom-in mb-4 rounded-3xl overflow-hidden glass p-1.5" 
                      onClick={() => setIsFullscreenImageOpen(true)}
                    >
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <img 
                          src={selectedItem.image} 
                          alt={selectedItem.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 size={18} className="text-white drop-shadow-lg" />
                      </div>
                    </motion.div>
                    
                    <div className="w-full text-center">
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { setSelectedItem(null); setItemNote(''); }}
                        className="absolute top-5 right-5 w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all z-10"
                      >
                        <X size={18} />
                      </motion.button>

                      <div className="flex flex-col items-center mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                            {t.categories[selectedItem.category] || selectedItem.category}
                          </span>
                          {selectedItem.calories && (
                            <span className="text-[8px] font-bold text-white/30 border border-white/10 px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                              {selectedItem.calories}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl md:text-2xl font-serif italic text-glow">{getLabel(selectedItem, 'name', language)}</h2>
                      </div>
                      
                      <p className="text-xs md:text-sm opacity-60 leading-relaxed mb-4 font-light max-w-md mx-auto">
                        {getLabel(selectedItem, 'description', language)}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-lg md:text-xl font-medium">{selectedItem.price}</span>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => toggleFavorite(selectedItem.id, e)}
                          className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-colors"
                        >
                          <Heart size={12} className={favorites.includes(selectedItem.id) ? 'text-red-500 fill-red-500' : ''} />
                          {favorites.includes(selectedItem.id) ? t.favorites : t.favorites /* simplifying to same key for now */}
                        </motion.button>
                      </div>

                      <div className="mb-4 text-left">
                        <label className="text-[8px] font-bold uppercase tracking-widest opacity-40 mb-1.5 block ml-1 text-center">Special Note (Optional)</label>
                        <textarea 
                          value={itemNote}
                          onChange={(e) => setItemNote(e.target.value)}
                          placeholder="Extra sugar, no ice, etc..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/20 resize-none h-20 text-center"
                        />
                      </div>

                      <div className="flex gap-3">
                        <motion.button 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => { 
                            addToCart(selectedItem, itemNote); 
                            setSelectedItem(null); 
                            setItemNote('');
                          }}
                          className="flex-grow bg-[var(--text-color)] text-[var(--bg-color)] py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all shadow-xl"
                        >
                          {t.add_to_order}
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsCartOpen(true)}
                          className="w-14 h-14 glass rounded-xl flex items-center justify-center hover:bg-[var(--text-color)]/10 transition-all shadow-lg"
                        >
                          <ShoppingBag size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Fullscreen Image Viewer */}
            <AnimatePresence>
              {isFullscreenImageOpen && selectedItem && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFullscreenImageOpen(false)}
                    className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                  />
                  
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => setIsFullscreenImageOpen(false)}
                    className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all z-10"
                  >
                    <X size={24} className="md:size-32" />
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative max-w-full max-h-full flex items-center justify-center"
                  >
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                    />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                      <h3 className="text-white/90 font-serif italic text-xl md:text-2xl">{getLabel(selectedItem, 'name', language)}</h3>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
              {isCartOpen && (
                <div className="fixed inset-0 z-[110] flex justify-end">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCartOpen(false)}
                    className="absolute inset-0 bg-[var(--bg-color)]/60 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="relative w-[225px] h-full glass-dark border-[1.5px] border-[var(--text-color)]/10 rounded-none pb-8 flex flex-col"
                  >
                    <div className="p-6 border-b border-[var(--text-color)]/10 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-serif italic mb-0.5">{t.cart.title}</h2>
                        <p className="text-[10px] text-[var(--text-color)]/40 uppercase tracking-widest font-bold">{cart.length} {t.items}</p>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsCartOpen(false)}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-[var(--text-color)]/10 transition-all"
                      >
                        <X size={18} />
                      </motion.button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                      {cart.length > 0 ? (
                        cart.map((item, idx) => (
                          <div key={`${item.id}-${idx}`} className="flex gap-3 group">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black/5">
                              <img src={item.thumbnail || item.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start mb-0.5">
                                <h4 className="text-[13px] font-medium leading-tight">{getLabel(item, 'name', language)}</h4>
                                <motion.button 
                                  whileHover={{ scale: 1.2, color: "#ef4444" }}
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => removeFromCart(item.id, item.note)} 
                                  className="text-[var(--text-color)]/20 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </motion.button>
                              </div>
                              <p className="text-[11px] text-[var(--text-color)]/40 mb-1.5">{item.price}</p>
                              
                              {item.note && (
                                <div className="mb-2 p-1.5 bg-[var(--text-color)]/5 rounded-lg border border-[var(--text-color)]/5">
                                  <p className="text-[9px] text-[var(--text-color)]/30 italic line-clamp-1">"{item.note}"</p>
                                </div>
                              )}

                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2.5 bg-[var(--text-color)]/5 rounded-full px-2.5 py-0.5 border border-[var(--text-color)]/10">
                                  <motion.button 
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => updateQuantity(item.id, -1, item.note)} 
                                    className="text-[var(--text-color)]/40 hover:text-[var(--text-color)]"
                                  >
                                    <Minus size={12} />
                                  </motion.button>
                                  <span className="text-xs font-medium w-3 text-center">{item.quantity}</span>
                                  <motion.button 
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => updateQuantity(item.id, 1, item.note)} 
                                    className="text-[var(--text-color)]/40 hover:text-[var(--text-color)]"
                                  >
                                    <Plus size={12} />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                          <ShoppingBag size={64} className="mb-4" />
                          <p className="font-medium">{t.cart.empty}</p>
                        </div>
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="p-6 glass border-t border-[var(--text-color)]/10 space-y-4">
                        <div className="space-y-3">
                          <div className="flex p-0.5 bg-[var(--text-color)]/5 rounded-xl border border-[var(--text-color)]/10">
                            <button 
                              onClick={() => setOrderType('dine-in')}
                              className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${orderType === 'dine-in' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                            >
                              {t.cart.dine_in}
                            </button>
                            <button 
                              onClick={() => setOrderType('drive-through')}
                              className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${orderType === 'drive-through' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                            >
                              {t.cart.drive}
                            </button>
                          </div>

                          <div className="relative">
                            {orderType === 'dine-in' ? (
                              <>
                                <input 
                                  type="text"
                                  placeholder={t.cart.table_num}
                                  value={tableNumber}
                                  onChange={(e) => setTableNumber(e.target.value)}
                                  className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--text-color)]/20 transition-all placeholder:text-[var(--text-color)]/20"
                                />
                              </>
                            ) : (
                              <div className="p-3 bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl text-center">
                                <p className="text-[10px] opacity-60 uppercase tracking-widest font-bold">Drive-Thru Mode</p>
                              </div>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-[var(--text-color)]/40">
                              <span>{t.cart.subtotal}</span>
                              <span>{calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between text-lg font-medium pt-1.5 border-t border-[var(--text-color)]/5">
                              <span>{t.cart.total}</span>
                              <span>{calculateTotal()}</span>
                            </div>
                          </div>
                        </div>
                        <motion.button 
                          whileHover={!tableNumber || isOrdering ? {} : { scale: 1.01, y: -1 }}
                          whileTap={!tableNumber || isOrdering ? {} : { scale: 0.99 }}
                          onClick={checkout}
                          disabled={isOrdering || (orderType === 'dine-in' && !tableNumber)}
                          className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${isOrdering || (orderType === 'dine-in' && !tableNumber) ? 'bg-[var(--text-color)]/20 text-[var(--text-color)]/40 cursor-not-allowed' : 'bg-[var(--text-color)] text-[var(--bg-color)] hover:opacity-90'}`}
                        >
                          {isOrdering ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                              {t.cart.processing}
                            </>
                          ) : (
                            t.cart.order_now
                          )}
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Reservation Modal */}
            <AnimatePresence>
              {isReservationOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsReservationOpen(false)}
                    className="absolute inset-0 bg-[var(--bg-color)]/80 backdrop-blur-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="relative w-[92%] md:w-full max-w-md glass rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 overflow-hidden"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsReservationOpen(false)}
                      className="absolute top-5 right-5 w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                      <X size={18} />
                    </motion.button>

                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Calendar size={24} className="text-[var(--accent-color)]" />
                      </div>
                      <h2 className="text-2xl font-serif italic mb-1">{t.reservation.title}</h2>
                      <p className="text-[10px] text-[var(--text-color)]/40 uppercase tracking-widest font-bold">{t.reservation.available}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest opacity-40 ml-1.5">Name</label>
                          <input 
                            type="text"
                            placeholder="Your Name"
                            value={reservationData.name}
                            onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                            className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]/20 transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest opacity-40 ml-1.5">Phone</label>
                          <input 
                            type="tel"
                            placeholder="Phone Number"
                            value={reservationData.phone}
                            onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                            className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]/20 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-widest opacity-40 ml-1.5">Table (1-17)</label>
                        <select 
                          value={reservationData.table}
                          onChange={(e) => setReservationData({...reservationData, table: e.target.value})}
                          className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]/20 transition-all appearance-none cursor-pointer font-medium"
                        >
                          <option value="" className="bg-[var(--bg-color)]">Choose table</option>
                          {Array.from({ length: 17 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num} className="bg-[var(--bg-color)]">Table {num}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest opacity-40 ml-1.5">Date</label>
                          <input 
                            type="date"
                            value={reservationData.date}
                            onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                            className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]/20 transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest opacity-40 ml-1.5">Time</label>
                          <input 
                            type="time"
                            value={reservationData.time}
                            onChange={(e) => setReservationData({...reservationData, time: e.target.value})}
                            className="w-full bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]/20 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <motion.button 
                        whileHover={isReserving ? {} : { scale: 1.01 }}
                        whileTap={isReserving ? {} : { scale: 0.99 }}
                        onClick={handleReservation}
                        disabled={isReserving || !reservationData.name || !reservationData.phone || !reservationData.table || !reservationData.date || !reservationData.time}
                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center justify-center gap-2 mt-2 ${isReserving || !reservationData.name || !reservationData.phone || !reservationData.table || !reservationData.date || !reservationData.time ? 'bg-[var(--text-color)]/20 text-[var(--text-color)]/40 cursor-not-allowed' : 'bg-[var(--text-color)] text-[var(--bg-color)] hover:opacity-90'}`}
                      >
                        {isReserving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Reserving
                          </>
                        ) : (
                          'Confirm Reservation'
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Reservation Success Toast */}
            <AnimatePresence>
              {showReservationSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.9 }}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] glass px-8 py-4 rounded-2xl flex items-center gap-4 shadow-2xl border border-green-500/20"
                >
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">Reservation Confirmed!</p>
                    <p className="text-[10px] opacity-60 uppercase tracking-widest text-white">We'll see you soon.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Modal */}
            <AnimatePresence>
              {isInfoOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsInfoOpen(false)}
                    className="absolute inset-0 bg-[var(--bg-color)]/80 backdrop-blur-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-[92%] md:w-full max-w-md glass rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-center"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsInfoOpen(false)}
                      className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                      <X size={20} />
                    </motion.button>
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={logoUrl} 
                      alt="La Monte" 
                      className="h-12 w-auto mx-auto mb-6"
                      referrerPolicy="no-referrer"
                    />
                    <h2 className="text-2xl md:text-3xl font-serif italic mb-3 md:mb-4 text-glow">{t.about_us.title}</h2>
                    <p className="text-xs md:text-sm text-[var(--text-color)]/60 leading-relaxed mb-5 md:mb-6">
                      {t.about_us.desc}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <motion.div 
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
                        className="glass-dark p-4 rounded-2xl"
                      >
                        <h4 className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-color)]/40 mb-1.5 flex items-center gap-1.5"><MapPin size={10} /> {t.about_us.location}</h4>
                        <p className="text-xs leading-relaxed">{t.about_us.address},<br />{t.about_us.city}</p>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
                        className="glass-dark p-4 rounded-2xl"
                      >
                        <h4 className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-color)]/40 mb-1.5 flex items-center gap-1.5"><Clock size={10} /> {t.about_us.hours}</h4>
                        <div className="space-y-1">
                          <p className="text-[10px] leading-tight"><span className="opacity-40">{t.about_us.days_st}:</span> 8am - 1am</p>
                          <p className="text-[10px] leading-tight"><span className="opacity-40">{t.about_us.day_f}:</span> 1pm - 1am</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Order Details Modal */}
            <AnimatePresence>
              {selectedOrder && (
                <div className="fixed inset-0 z-[130] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedOrder(null)}
                    className="absolute inset-0 bg-[var(--bg-color)]/80 backdrop-blur-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-[92%] md:w-full max-w-md glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-6 md:mb-8">
                      <div>
                        <h2 className="text-2xl font-serif italic mb-1">{t.cart.details}</h2>
                        <p className="text-xs text-[var(--text-color)]/40 uppercase tracking-widest font-bold">#{selectedOrder.id}</p>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedOrder(null)}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        <X size={18} />
                      </motion.button>
                    </div>

                    <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="py-3 border-b border-white/5 last:border-0 group">
                          <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-[var(--text-color)]/40 font-bold">{item.quantity}x</span>
                              <span className="text-sm">{item.name}</span>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                onClick={(e) => toggleFavorite(item.id, e)}
                                className={`opacity-0 group-hover:opacity-100 transition-opacity ${favorites.includes(item.id) ? 'text-red-500' : 'text-[var(--text-color)]/20'}`}
                              >
                                <Heart size={14} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                              </motion.button>
                            </div>
                            <span className="text-sm font-medium">{item.price}</span>
                          </div>
                          {item.note && (
                            <p className="text-[10px] text-[var(--text-color)]/30 italic ml-8">Note: {item.note}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="glass-dark p-4 rounded-xl space-y-1.5">
                        <div className="flex justify-between text-xs text-[var(--text-color)]/40">
                          <span>{language === 'en' ? 'Date' : language === 'ku' ? 'بەروار' : 'التاريخ'}</span>
                          <span>{selectedOrder.date}</span>
                        </div>
                        {selectedOrder.tableNumber && (
                          <div className="flex justify-between text-xs text-[var(--text-color)]/40">
                            <span>{t.cart.table_num}</span>
                            <span>{selectedOrder.tableNumber}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-base font-medium pt-1.5 border-t border-white/5">
                          <span>{language === 'en' ? 'Total Paid' : language === 'ku' ? 'کۆی گشتی دراو' : 'إجمالي المدفوع'}</span>
                          <span>{selectedOrder.total}</span>
                        </div>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleReorder(selectedOrder.items)}
                        className="w-full bg-[var(--text-color)] text-[var(--bg-color)] py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl"
                      >
                        <ShoppingBag size={14} /> {t.cart.reorder}
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Success Toast */}
            <AnimatePresence>
              {showOrderSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] glass px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl border-green-500/50"
                >
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest">Order Placed Successfully</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Magic World Modal */}
            <MagicWorld 
              isOpen={isMagicWorldOpen} 
              onClose={() => setIsMagicWorldOpen(false)} 
              menuItems={MENU_ITEMS}
              addToCart={addToCart}
              setSelectedItem={setSelectedItem}
              setIsFullscreenImageOpen={setIsFullscreenImageOpen}
              t={t}
              language={language}
            />

            <AuthModal 
              isOpen={isAuthOpen}
              onClose={() => setIsAuthOpen(false)}
              language={language}
              t={t}
            />

            {/* Palette Selection Modal */}
            <AnimatePresence>
              {isPaletteOpen && (
                <div className="fixed inset-0 z-[180] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsPaletteOpen(false)}
                    className="absolute inset-0 bg-[var(--bg-color)]/80 backdrop-blur-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-[92%] md:w-full max-w-sm glass-dark rounded-[2.5rem] p-8 shadow-2xl border border-white/10"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--accent-color)]/20 rounded-xl">
                          <Palette size={20} className="text-[var(--accent-color)]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-serif italic">Color Palettes</h2>
                          <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Ambient Themes</p>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPaletteOpen(false)}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        <X size={18} />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                      {Object.entries(PALETTES).map(([id, p]) => (
                        <motion.button
                          key={id}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setTheme(id as any);
                            setIsPaletteOpen(false);
                          }}
                          className={`flex items-center gap-4 p-4 rounded-2xl transition-all relative ${
                            theme === id 
                              ? 'bg-white/10 border border-white/10 shadow-lg' 
                              : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="flex -space-x-1.5">
                            {p.colors.map((c, i) => (
                              <div 
                                key={i} 
                                className="w-6 h-6 rounded-full border-2 border-black/20 shadow-sm" 
                                style={{ backgroundColor: c }} 
                              />
                            ))}
                          </div>
                          <div className="text-left flex-1">
                            <span className={`text-sm capitalize block ${theme === id ? 'font-bold' : 'opacity-60'}`}>
                              {id}
                            </span>
                            <span className="text-[8px] opacity-20 uppercase tracking-widest block">
                              {p.colors.length} Colors
                            </span>
                          </div>
                          {theme === id && (
                            <motion.div 
                              layoutId="active-theme"
                              className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-color)]" 
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Language Selection Modal */}
            <AnimatePresence>
              {isLanguageOpen && (
                <div className="fixed inset-0 z-[180] flex items-center justify-center p-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsLanguageOpen(false)}
                    className="absolute inset-0 bg-[var(--bg-color)]/80 backdrop-blur-xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-[92%] md:w-full max-w-sm glass-dark rounded-[2.5rem] p-8 shadow-2xl border border-white/10"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--accent-color)]/20 rounded-xl">
                          <Languages size={20} className="text-[var(--accent-color)]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-serif italic">Language</h2>
                          <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Select Preference</p>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsLanguageOpen(false)}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        <X size={18} />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {(['en', 'ku', 'ar'] as const).map((lang) => (
                        <motion.button
                          key={lang}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setLanguage(lang);
                            setIsLanguageOpen(false);
                          }}
                          className={`flex items-center gap-4 p-4 rounded-2xl transition-all relative ${
                            language === lang 
                              ? 'bg-white/10 border border-white/10 shadow-lg' 
                              : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg font-bold">
                            {lang === 'en' ? '🇺🇸' : lang === 'ku' ? '☀️' : '🇮🇶'}
                          </div>
                          <div className="text-left flex-1 px-2">
                            <span className={`text-sm block ${language === lang ? 'font-bold' : 'opacity-60'}`}>
                              {lang === 'en' ? 'English' : lang === 'ku' ? 'کوردی' : 'العربية'}
                            </span>
                            <span className="text-[8px] opacity-20 uppercase tracking-widest block">
                              {lang === 'en' ? 'Default' : lang === 'ku' ? 'سۆرانی' : 'اللغة العربية'}
                            </span>
                          </div>
                          {language === lang && (
                            <motion.div 
                              layoutId="active-lang"
                              className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-color)]" 
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[150]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute inset-0 bg-[var(--bg-color)]/60 backdrop-blur-xl"
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                               className="absolute right-0 top-0 bottom-0 w-72 glass-dark border-l border-[var(--text-color)]/10 p-6 flex flex-col gap-4 shadow-2xl z-[160] overflow-y-auto no-scrollbar"
                  >
                    <div className="flex justify-between items-center mb-2 px-2 pt-2">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-40">{t.menu}</span>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center translate-x-2 -translate-y-2"
                      >
                        <X size={18} />
                      </motion.button>
                    </div>

                    <nav className="flex flex-col gap-1">
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => { setCurrentView('menu'); setIsMobileMenuOpen(false); }}
                        className={`flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all ${currentView === 'menu' ? 'bg-[var(--text-color)] text-[var(--bg-color)]' : 'hover:bg-[var(--text-color)]/5'}`}
                      >
                        <Home size={18} />
                        <span className="font-medium">{t.menu}</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => { 
                          if (user) {
                            setCurrentView('profile'); 
                          } else {
                            setIsAuthOpen(true);
                          }
                          setIsMobileMenuOpen(false); 
                        }}
                        className={`flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all ${currentView === 'profile' ? 'bg-[var(--text-color)] text-[var(--bg-color)] shadow-lg' : 'hover:bg-[var(--text-color)]/5'}`}
                      >
                        <UserIcon size={18} className={currentView === 'profile' ? 'text-[var(--bg-color)]' : 'text-[var(--text-color)] opacity-60'} />
                        <span className="font-medium">{t.profile}</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => { setIsReservationOpen(true); setIsMobileMenuOpen(false); }}
                        className={`flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all ${isReservationOpen ? 'bg-[var(--text-color)] text-[var(--bg-color)]' : 'hover:bg-[var(--text-color)]/5'}`}
                      >
                        <Calendar size={18} />
                        <span className="font-medium">{t.reserve}</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => { setIsMagicWorldOpen(true); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all hover:bg-[var(--text-color)]/5 text-yellow-500"
                      >
                        <Sparkles size={18} />
                        <span className="font-medium">{t.magic}</span>
                      </motion.button>
                    </nav>

                    <nav className="flex flex-col gap-1 pt-2 border-t border-[var(--text-color)]/10">
                      {user && (
                        <div className="px-4 py-2 mb-2 bg-[var(--text-color)]/5 rounded-2xl flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--text-color)]/10 flex items-center justify-center">
                            <UserIcon size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold leading-none">@{profile?.username || 'user'}</span>
                            <span className="text-[10px] opacity-40 truncate max-w-[150px]">{user.email}</span>
                          </div>
                        </div>
                      )}
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          const modes: ('grid' | 'list' | 'minimal' | 'compact' | 'magazine')[] = ['grid', 'list', 'minimal', 'compact', 'magazine'];
                          const nextIndex = (modes.indexOf(viewMode) + 1) % modes.length;
                          setViewMode(modes[nextIndex]);
                        }}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all hover:bg-[var(--text-color)]/5"
                      >
                        <Layout size={18} />
                        <span className="font-medium capitalize">{viewMode} View</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          if (user) {
                            supabase?.auth.signOut();
                            setIsMobileMenuOpen(false);
                          } else {
                            setIsAuthOpen(true);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all hover:bg-red-500/10 text-red-500"
                      >
                        {user ? <LogOut size={18} /> : <UserIcon size={18} />}
                        <span className="font-medium">{user ? t.auth.logout : t.auth.login}</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={toggleMute}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all hover:bg-[var(--text-color)]/5"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        <span className="font-medium">{isMuted ? 'Unmute' : 'Mute'} Music</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => { setIsPaletteOpen(true); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all hover:bg-[var(--text-color)]/5"
                      >
                        <Palette size={18} />
                        <span className="font-medium">{t.theme}</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => { setIsLanguageOpen(true); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all hover:bg-[var(--text-color)]/5"
                      >
                        <Globe size={18} />
                        <span className="font-medium">{t.language}</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => { setIsInfoOpen(true); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-4 py-2.5 px-4 rounded-2xl transition-all hover:bg-[var(--text-color)]/5"
                      >
                        <Info size={18} />
                        <span className="font-medium">{t.about}</span>
                      </motion.button>
                    </nav>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

