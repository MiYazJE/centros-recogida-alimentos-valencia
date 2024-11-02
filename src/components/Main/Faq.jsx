import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
];

export const Faq = () => {
  return (
    <Accordion
      type="single"
      collapsible
    >
      {FAQ_ITEMS.map((item, index) => (
        <AccordionItem key={index} value={index.toString()} >
          <AccordionTrigger>
            <h3>{item.question}</h3>
          </AccordionTrigger>
          <AccordionContent>
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
