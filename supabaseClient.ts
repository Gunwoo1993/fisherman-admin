
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_URL = 'https://weqnoteeqovvrpsnoduu.supabase.co';
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcW5vdGVlcW92dnJwc25vZHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTE0NTQsImV4cCI6MjA4NjcyNzQ1NH0.mA3Nw3KfNnlU0z_u7ALdq3lK__M-rN5-X6ZxQ0imfgY';

let supabaseInstance: SupabaseClient | null = null;
let currentUrl: string | null = null;
let currentKey: string | null = null;

export const getSupabaseConfig = () => {
  const url = localStorage.getItem('SUPABASE_URL') || DEFAULT_URL;
  const key = localStorage.getItem('SUPABASE_ANON_KEY') || DEFAULT_KEY;
  return { url, key };
};

export const initSupabase = () => {
  const { url, key } = getSupabaseConfig();
  
  if (!url || !key) return null;

  if (!supabaseInstance || currentUrl !== url || currentKey !== key) {
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
    currentUrl = url;
    currentKey = key;
  }
  
  return supabaseInstance;
};
