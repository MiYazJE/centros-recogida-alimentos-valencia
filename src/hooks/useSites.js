import { useQuery } from "@tanstack/react-query";

const markers = [
  {
    title: 'Centro Comunitario de Patraix',
    position: [39.462116, -0.398936],
    address: 'Calle de Patraix, 12',
    hours: '10:00 - 18:00',
  },
  {
    title: 'Polideportivo de El Carmen',
    position: [39.47959, -0.388406],
    address: 'Av. del Oeste, 45',
    hours: '9:00 - 20:00',
  },
  {
    title: 'Asociación Vecinal Benimaclet',
    position: [39.48531, -0.358142],
    address: 'Plaza de Benimaclet, 3',
    hours: '8:00 - 17:00',
  },
  {
    title: 'Iglesia de San Agustín',
    position: [39.46975, -0.376982],
    address: 'Plaza de San Agustín, 7',
    hours: '11:00 - 19:00',
  },
];

export const useSites = () => {
  const query = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      return Promise.resolve(markers)
    }
  })
  return query;
}