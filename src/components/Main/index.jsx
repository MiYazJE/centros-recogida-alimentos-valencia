export const Main = () => {
  return (
    <main className="flex flex-col p-6 gap-6">
      <span className="mb-4">
        <h1 className="text-4xl mb-3 font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
          Puntos de Recogida de Alimentos en{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DA121A] via-[#ffe016] to-[#DA121A]">
            Valencia
          </span>
        </h1>
        <h2 className="text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white text-center">
          Ayuda para Afectados por las Inundaciones
        </h2>
      </span>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl">¿Cómo puedes ayudar?</h2>
        <p>
          Con esta plataforma, puedes conocer los puntos de recogida de
          alimentos y donaciones para ayudar a los afectados por las
          inundaciones en Valencia. Actualizamos regularmente la información
          sobre los lugares, horarios, y productos más necesarios para facilitar
          las donaciones y apoyo a las comunidades.
        </p>
        <h2 className="md:text-xl">¿Qué encontrarás en esta página?</h2>
        <p>Aquí podrás encontrar:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <span className="underline font-bold">Direcciones</span> de los
            puntos de recogida de alimentos y otros insumos.
          </li>
          <li>
            <span className="underline font-bold">
              Horarios de funcionamiento
            </span>{' '}
            para que puedas acudir en el momento adecuado.
          </li>
          <li>
            <span className="underline font-bold">Recomendaciones</span> sobre
            los productos que más se necesitan.
          </li>
        </ul>
      </article>
    </main>
  );
};
