import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createLead(leadData: {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  property_type: string;
  monthly_bill: number;
  roof_direction: string;
  battery_interest: boolean;
  estimated_savings: number;
}) {
  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
    .select();

  if (error) {
    console.error('Error creating lead:', error);
    throw error;
  }

  return data?.[0];
}

export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }

  return data;
}
