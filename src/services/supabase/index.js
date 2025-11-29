import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://eofandrbnkfokmwqzdoj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZmFuZHJibmtmb2ttd3F6ZG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMzA2OTAsImV4cCI6MjA3OTgwNjY5MH0.AhqERsjkGeXR2QfqUcBWbhzrM-i5OZaFiKf86yw-POc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;