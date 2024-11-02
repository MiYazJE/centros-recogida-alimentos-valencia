import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
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

const schema = z.object({
  title: z.string({ message: 'Este campo es requerido' }),
  address: z.string().default(''),
  hours: z.string().default('-'),
});

const NewSiteForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            className="space-y-1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Textarea placeholder="Dirección" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hours"
            className="space-y-1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horario</FormLabel>
                <FormControl>
                  <Input placeholder="Horario" {...field} />
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
      <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
        Crear
      </Button>
    </>
  );
};

export default NewSiteForm;
