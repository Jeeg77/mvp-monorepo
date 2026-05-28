import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase env variables");
}

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
