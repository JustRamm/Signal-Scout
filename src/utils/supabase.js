import { createClient } from '@supabase/supabase-js';

// Replace these with your project's URL and Anon Key from the Supabase Dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jvjqvigzpykhspzfhqex.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2anF2aWd6cHlraHNwemZocWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODk3MzgsImV4cCI6MjA5MDA2NTczOH0.g_IaBheYrZT8LoUMD2eukDQKlZBXj_ULYQCKppOlC4s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
