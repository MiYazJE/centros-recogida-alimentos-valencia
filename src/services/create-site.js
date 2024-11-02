import { supabaseClient } from './supabase';

async function createSite(site) {
  const { data, error } = await supabaseClient
    .from('collection-points-temp')
    .insert(site);

  if (error) throw error;

  return data;
}

export { createSite };
