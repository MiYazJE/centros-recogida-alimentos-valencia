import { supabaseClient } from './supabase';

async function getActiveSites() {
  const { data } = await supabaseClient.from('collection-points').select('*');
  return data ?? [];
}

export { getActiveSites };
