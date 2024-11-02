import { Faq } from "./Faq";

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
      <article className="flex flex-col gap-2 justify-center">
        <h2 className="text-xl">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          <Faq />
        </div>
      </article>
    </main>
  );
};
