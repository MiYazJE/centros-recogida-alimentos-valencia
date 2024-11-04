import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import LoadingButton from "../LoadingButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "../ui/multi-select";
import { TAGS } from "@/enums";
import { useEffect } from "react";

const schema = z.object({
  title: z
    .string({ message: "Este campo es requerido" })
    .min(1, { message: "Este campo es requerido" }),
  address: z.string().default(""),
  hours: z.string().default("-"),
  tags: z.array(z.string()).optional().default([]),
});

const NewSiteForm = ({ onSubmit, loading, address = "" }) => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    form.reset({
      address,
    });
  } , [address, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 pr-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    className="!mt-0"
                    placeholder="Nombre del local"
                    {...field}
                  />
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
                  <Input
                    className="!mt-0"
                    placeholder="08:30 - 18:00, Todo el día, etc..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipos de Ayuda Disponibles</FormLabel>
                <FormControl>
                  <MultiSelect
                    className="!mt-0"
                    options={TAGS}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Selecciona una o varias"
                    variant="inverted"
                    maxCount={3}
                  />
                </FormControl>
                <FormDescription>
                  Selecciona los tipos de ayuda que se pueden encontrar en este punto
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
