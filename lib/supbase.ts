import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "https://bj-zln.love/api";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6amVvZWxqcGJkZ3htbG9obG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTU0MjQsImV4cCI6MjA2MjE3MTQyNH0.tBBR7I880f7W0d1_ITe4tCjx4pkQYNmW29_mt4uBI-A";

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);