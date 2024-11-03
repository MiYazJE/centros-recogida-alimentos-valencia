import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "¿Cómo puedes ayudar?",
    answer:
      "Con esta plataforma, puedes conocer los puntos de recogida de alimentos y donaciones para ayudar a los afectados por las inundaciones en Valencia. Actualizamos regularmente la información sobre los lugares, horarios, y productos más necesarios para facilitar las donaciones y apoyo a las comunidades.",
  },
  {
    question: "¿Qué encontrarás en esta página?",
    answer: (
      <ul>
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
    question: "¿Cómo añadir un nuevo punto de recogida?",
    answer:
      "Si conoces un lugar que no está en el mapa, puedes añadirlo haciendo clic en el botón 'Añade un punto de recogida'. Luego, selecciona un lugar en el mapa y completa el formulario con la información necesaria.",
  }
];

export const Faq = () => {
  return (
    <div className="px-4 mx-auto max-w-screen-sm py-8 md:px-8 space-y-3">
      <h2 className="text-xl text-center">Preguntas Frecuentes</h2>
      <Accordion
        className="space-y-2"
        type="single"
        collapsible
      >
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger className="font-bold">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
