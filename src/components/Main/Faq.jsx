import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_ITEMS = [
  {
    question: '¿Cómo puedes ayudar?',
    answer:
      'Con esta plataforma puedes conocer los puntos de recogida de alimentos y donaciones para ayudar a los afectados por las inundaciones en Valencia. Actualizamos regularmente la información sobre los lugares, horarios, y productos más necesarios para facilitar las donaciones y apoyo a las comunidades.',
  },
  {
    question: '¿Qué encontrarás en esta página?',
    answer: (
      <ul className="list-inside list-disc space-y-2 ml-2">
        <li>
          <b>Direcciones</b> de los puntos de recogida de alimentos y otros
          insumos.
        </li>
        <li>
          <b>Horarios de funcionamiento</b> para que puedas acudir en el momento
          adecuado.
        </li>
        <li>
          <b>Recomendaciones</b> sobre los productos que más se necesitan.
        </li>
      </ul>
    ),
  },
  {
    question: '¿Cómo añadir un nuevo punto de recogida?',
    answer: (
      <div className="space-y-2">
        <p>Si conoces un lugar que no está en el mapa, puedes añadirlo:</p>
        <ol className="list-inside list-decimal space-y-1 ml-3">
          <li>
            Haciendo clic en el botón{' '}
            <i className="underline">Añade un punto de recogida.</i>
          </li>
          <li>Utiliza el buscador o mueve el mapa para seleccionar la ubicación.</li>
          <li>Completa el formulario con la información necesaria.</li>
        </ol>
        <p>
          Después lo verificaremos con la mayor brevedad posible y en los
          próximos minutos será visible por todos, esto lo hacemos para asegurar
          una integridad en los datos.
        </p>
      </div>
    ),
  },
];

export const Faq = () => {
  return (
    <div className="px-4 mx-auto max-w-screen-sm py-8 md:px-8 space-y-3">
      <Accordion className="space-y-2" type="single" collapsible>
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger className="font-bold">
              <span className="text-left">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
