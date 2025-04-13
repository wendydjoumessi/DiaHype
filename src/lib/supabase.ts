import { createClient } from '@supabase/supabase-js';

// Get environment variables or use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a variable to track if we're using mock data
export const usingMockData = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log warning if using fallback values
if (usingMockData) {
  console.warn('Using mock data due to missing Supabase credentials. For proper database functionality, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);