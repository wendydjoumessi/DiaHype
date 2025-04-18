import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing.');
  throw new Error('Missing Supabase URL or Anon Key. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
