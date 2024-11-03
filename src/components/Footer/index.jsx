export const Footer = ({openModal}) => {
  return (
    <footer className="pt-5">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a
            href="https://puntosrecogidavalencia.org"
            className="hover:underline"
          >
            puntosrecogidavalencia
          </a>
          . Todos los derechos reservados.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <button onClick={openModal} className="hover:underline me-4 md:me-6">
              Política de privacidad
            </button>
          </li>
          <li>
            <a href="mailto:puntosrecogidavalencia@gmail.com" rel="noopener nofollow" className="hover:underline">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
