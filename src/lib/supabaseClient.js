import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iebwfqnulmlcnvbjczjw.supabase.co'; // tu URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllYndmcW51bG1sY252Ympjemp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMjUyNzgsImV4cCI6MjA2MzkwMTI3OH0.z5R1YZpmIY51HXkxuuxWVNAS0mViTPlLfqryE0rFn-o'; // tu clave anon

export const supabase = createClient(supabaseUrl, supabaseKey);