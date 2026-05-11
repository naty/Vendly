/* =============================================
   VENDLY — Supabase client (frontend)
   ============================================= */

const SUPABASE_URL = 'https://mzxkpwidnivbhrevcukn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eGtwd2lkbml2YmhyZXZjdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjE5MTEsImV4cCI6MjA5NDA5NzkxMX0._XtPTWIYkVQk_M07IhI2I2Kmgs6hXY1YJOZOiTLWYco';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
