import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Supabase environment variables are not set. Please add SUPABASE_URL and SUPABASE keys.');
}

const supabase: SupabaseClient = createClient(SUPABASE_URL || '', SUPABASE_KEY || '');

export async function listProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createProduct(payload: any) {
  const { data, error } = await supabase.from('products').insert([payload]).select().single();
  if (error) throw error;
  return data;
}

export async function getProductById(id: number | string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: number | string, payload: any) {
  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: number | string) {
  const { data, error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return data;
}

export async function listCategories() {
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) throw error;
  return data;
}

export async function createCategory(name: string) {
  const { data, error } = await supabase.from('categories').insert([{ name }]).select().single();
  if (error) throw error;
  return data;
}

export async function createAdmin(username: string, password: string) {
  const { data, error } = await supabase.from('admins').insert([{ username, password }]).select().single();
  if (error) throw error;
  return data;
}

export async function findAdminByUsername(username: string) {
  const { data, error } = await supabase.from('admins').select('*').eq('username', username).single();
  if (error) throw error;
  return data;
}

export async function countAdmins() {
  const { count, error } = await supabase.from('admins').select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count || 0;
}

export default supabase;
