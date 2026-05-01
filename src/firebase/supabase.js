import { createClient } from "@supabase/supabase-js";

// Opción 1: Valores directos (para empezar rápido)
 const supabaseUrl = 'https://gffvvlhxprbtszdonqzz.supabase.co'  // ← Reemplazar con tu URL
 const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZnZ2bGh4cHJidHN6ZG9ucXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5ODk4ODcsImV4cCI6MjA4NTU2NTg4N30.qLZLt7pQVul1YxexM0GNPFJhJCzhpo_pqSKp0YW0rOQ'     // ← Reemplazar con tu anon key

// Opción 2: Variables de entorno (recomendado)
//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar que las credenciales existan
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Faltan las credenciales de Supabase!");
  console.error("Asegurate de:");
  console.error("1. Crear un archivo .env en la raíz del proyecto");
  console.error("2. Agregar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY");
  console.error(
    "O usar valores directos en este archivo (ver comentarios arriba)",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
