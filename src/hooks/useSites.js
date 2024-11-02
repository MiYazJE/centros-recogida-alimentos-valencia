import { useQuery } from '@tanstack/react-query';

import { getActiveSites } from '../services/get-sites';

export const useSites = () => {
  const query = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      return await getActiveSites();
    },
  });
  return query;
};
