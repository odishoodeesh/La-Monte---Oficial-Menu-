import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

const isPlaceholder = (url?: string) => {
  if (!url) return true;
  return (
    url.includes('your-project') || 
    url.includes('placeholder') || 
    url === 'your-supabase-url' ||
    url.trim() === ''
  );
};

export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey && !isPlaceholder(supabaseUrl)) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn('Supabase is not configured or placeholder detected. Authentication and database features will be disabled.');
}

