import ExternalLink from "../utils/ExternalLink";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full bg-indigo-900 py-2">
      <p>
        Creato da{" "}
        <ExternalLink
          href="https://edoardo.ranghieri.com"
          text="TheEdoRan"
          className="font-medium"
        />{" "}
        con ❤️
      </p>
      <div className="flex items-center justify-center gap-4 text-sm font-light text-gray-300">
        <p>
          <ExternalLink
            href="https://github.com/theedoran/mappatura2021"
            text="Codice Sorgente"
          />
        </p>
        <p>
          <ExternalLink
            href="https://forum.fibra.click/d/22321-esiti-mappatura-infratel-2021"
            text="Informazioni"
          />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
