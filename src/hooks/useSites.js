import { useMutation, useQuery } from '@tanstack/react-query';

import { getActiveSites } from '../services/get-sites';
import { createSite } from '@/services/create-site';
import { useToast } from './use-toast';

export const useSites = () => {
  const query = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      return await getActiveSites();
    },
  });
  return query;
};

export const useSiteMutation = ({ callbackOnSuccess }) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await createSite(data);
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Punto de recogida creado!',
        description:
          'Gracias por la aportación. Lo verificaremos con la mayor brevedad posible.',
      });
      callbackOnSuccess();
    },
    onError: () =>
      toast({
        variant: 'destructive',
        description: 'Lo sentimos, han surgido problemas. Inténtelo más tarde',
      }),
  });
  return mutation;
};
