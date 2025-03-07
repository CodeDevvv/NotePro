import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL; 
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 

// Initialize Supabase client
export const supabase = createClient(supabaseURL, anonKey);
