
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://buofkrhjaeaagxpbhayg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1b2ZrcmhqYWVhYWd4cGJoYXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MTkyNDYsImV4cCI6MjA0NjI5NTI0Nn0.NZhn8vhyCqPBWrYgIQ88HCuFlOYPkFrADUSo5AoDj_A'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;