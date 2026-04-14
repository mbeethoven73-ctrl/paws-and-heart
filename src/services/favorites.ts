import { supabase } from '../lib/supabase';
import type { Favorite } from '../types';

export async function getFavorites(userId: string): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      pet:pets(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching favorites:', error.message);
    return [];
  }

  return (data as Favorite[]) || [];
}

export async function addFavorite(userId: string, petId: number): Promise<boolean> {
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, pet_id: petId });

  if (error) {
    // Duplicate is fine — already favorited
    if (error.code === '23505') return true;
    console.error('Error adding favorite:', error.message);
    return false;
  }

  return true;
}

export async function removeFavorite(userId: string, petId: number): Promise<boolean> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('pet_id', petId);

  if (error) {
    console.error('Error removing favorite:', error.message);
    return false;
  }

  return true;
}

export async function isFavorited(userId: string, petId: number): Promise<boolean> {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('pet_id', petId)
    .maybeSingle();

  if (error) {
    console.error('Error checking favorite:', error.message);
    return false;
  }

  return !!data;
}

export async function getFavoriteIds(userId: string): Promise<Set<number>> {
  const { data, error } = await supabase
    .from('favorites')
    .select('pet_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching favorite IDs:', error.message);
    return new Set();
  }

  return new Set((data || []).map((f: { pet_id: number }) => f.pet_id));
}
