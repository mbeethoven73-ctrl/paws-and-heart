import { supabase } from '../lib/supabase';
import type { Application } from '../types';

export interface ApplicationFormData {
  user_id: string;
  pet_id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  housing_type: string;
  has_yard: string;
  work_hours: string;
  veterinarian: string;
  personal_reference: string;
  certification: boolean;
}

export async function submitApplication(data: ApplicationFormData): Promise<{ id: string | null; error: string | null }> {
  const { data: result, error } = await supabase
    .from('applications')
    .insert({
      ...data,
      status: 'pending',
      review_steps: [
        { id: 1, title: 'Review application details', status: 'pending', description: 'The shelter will review your personal information and home lifestyle.' },
        { id: 2, title: 'Clarifying pet condition', status: 'pending', description: 'The shelter is preparing the specific medical and behavioral notes.' },
        { id: 3, title: 'Final application approval', status: 'pending', description: 'Awaiting final sign-off from the shelter director.' },
      ],
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error submitting application:', error.message);
    return { id: null, error: error.message };
  }

  return { id: result?.id || null, error: null };
}

export async function getApplications(userId: string): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      pet:pets(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error.message);
    return [];
  }

  return (data as Application[]) || [];
}

export async function getApplicationById(id: string): Promise<Application | null> {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      pet:pets(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching application:', error.message);
    return null;
  }

  return data as Application;
}

export async function getLatestApplication(userId: string): Promise<Application | null> {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      pet:pets(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching latest application:', error.message);
    return null;
  }

  return data as Application | null;
}
