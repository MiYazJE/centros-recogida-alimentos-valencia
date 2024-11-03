import { supabaseClient } from './supabase';

async function getActiveSites(filters) {
  const { data } = await supabaseClient.from('collection-points').select('*').contains('tags', filters ?? null);
  return data ?? [];
}

export { getActiveSites };
