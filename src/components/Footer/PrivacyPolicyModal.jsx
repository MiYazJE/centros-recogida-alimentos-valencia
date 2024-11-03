import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const POLICY = [
  {
    title: "Información recopilada",
    content: `En nuestro sitio web solo recopilamos las ubicaciones de los puntos de recogida de ayuda para los afectados por las inundaciones. Los datos que ingresas en el mapa incluyen la dirección del punto de ayuda y se utilizan exclusivamente para que otros usuarios puedan encontrar fácilmente estos puntos de recogida en nuestro mapa.`,
  },
  {
    title: "Uso de la información",
    content: `Utilizamos la información de ubicación que proporcionas para:
      Mostrar los puntos de recogida de ayuda en un mapa interactivo.
      Facilitar la organización y acceso a los recursos en las zonas afectadas por las inundaciones.`,
  },
  {
    title: "Almacenamiento y seguridad de los datos",
    content: `Las ubicaciones de los puntos de ayuda pueden almacenarse en nuestra base de datos o en servidores de terceros para facilitar su acceso y visualización. Nos comprometemos a tomar medidas de seguridad razonables para proteger esta información contra el acceso no autorizado, pérdida o modificación.`,
  },
  {
    title: "Servicios de terceros",
    content: `Este sitio utiliza servicios de terceros, como proveedores de mapas (OpenStreetMap) para la visualización de los mapas, o servicios de gestión de bases de datos (Subabase) para el almacenamiento de los datos.`,
  },
  {
    title: "Derechos de los usuarios",
    content:
      "Como usuario, tienes el derecho de solicitar la eliminación o modificación de la información de los puntos de recogida que hayas proporcionado. Para ejercer este derecho, por favor contáctanos en puntosrecogidavalencia@gmail.com",
  },
  {
    title: "Cambios en la política de privacidad",
    content:
      "Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te recomendamos revisarla periódicamente para estar al tanto de cualquier cambio.",
  },
  {
    title: "Responsabilidad sobre los puntos de recogida",
    content: `Los puntos de recogida de ayuda son proporcionados directamente por los usuarios y son verificados por nosotros. No garantizamos la exactitud, disponibilidad ni la seguridad de estos puntos. Al utilizar nuestro sitio web, aceptas que no nos hacemos responsables de la información incorrecta, incompleta o desactualizada que pueda aparecer en el mapa, ni de cualquier consecuencia derivada de la visita o interacción con estos puntos de recogida.`,
  },
  {
    title: "Enlaces a Terceros",
    content: `Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.`,
  },
];

export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle className="pb-3">Política de privacidad</DialogTitle>
          <ol type="1" className="list-inside list-decimal space-y-3 text-left">
            {POLICY.map((section, index) => (
              <li key={index}>
                <span className="font-bold">{section.title}</span>
                <p className="ml-4">{section.content}</p>
              </li>
            ))}
          </ol>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
