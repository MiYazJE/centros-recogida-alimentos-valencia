import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import LoadingButton from '../LoadingButton';

const schema = z.object({
  title: z
    .string({ message: 'Este campo es requerido' })
    .min(1, { message: 'Este campo es requerido' }),
  address: z.string().default(''),
  hours: z.string().default('-'),
});

const NewSiteForm = ({ onSubmit, loading }) => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input className="!mt-0" placeholder="Nombre del local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Textarea
                    className="!mt-0"
                    placeholder="Dirección exacta, nombre de la calle, número, etc..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horario</FormLabel>
                <FormControl>
                  <Input className="!mt-0" placeholder="Horario" {...field} />
                </FormControl>
                <FormDescription>
                  Ejemplos: "08:30 - 18:00", "Todo el día", etc...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex py-2 place-content-end">
        <LoadingButton
          className="mt-2"
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          loading={loading}
        >
          Crear
        </LoadingButton>
      </div>
    </>
  );
};

export default NewSiteForm;
