import { supabase } from '../lib/supabase';
import type { Pet } from '../types';

export async function getPets(filters?: {
  species?: string;
  age_category?: string;
  size?: string;
  search?: string;
}): Promise<Pet[]> {
  let query = supabase.from('pets').select('*').order('created_at', { ascending: false });

  if (filters?.species && filters.species !== 'Any') {
    // Map display names to DB values
    const speciesMap: Record<string, string> = {
      'Dogs': 'dog',
      'Cats': 'cat',
      'Small Pets': 'small_pet',
      'Birds': 'bird',
      'Rabbits': 'small_pet',
    };
    const dbSpecies = speciesMap[filters.species] || filters.species.toLowerCase();
    query = query.eq('species', dbSpecies);
  }

  if (filters?.age_category && filters.age_category !== 'Any') {
    const ageMap: Record<string, string> = {
      'Baby': 'baby',
      'Young': 'young',
      'Adult': 'adult',
      'Senior': 'senior',
    };
    query = query.eq('age_category', ageMap[filters.age_category] || filters.age_category.toLowerCase());
  }

  if (filters?.size && filters.size !== 'Any') {
    const sizeMap: Record<string, string> = {
      'Small': 'small',
      'Medium': 'medium',
      'Large': 'large',
      'Extra Large': 'extra_large',
    };
    query = query.eq('size', sizeMap[filters.size] || filters.size.toLowerCase());
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,breed.ilike.%${filters.search}%,tags.cs.{${filters.search}}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching pets:', error.message);
    return [];
  }

  return (data as Pet[]) || [];
}

export async function getPetById(id: number): Promise<Pet | null> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching pet:', error.message);
    return null;
  }

  return data as Pet;
}

export async function getFeaturedPets(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured pets:', error.message);
    return [];
  }

  return (data as Pet[]) || [];
}
