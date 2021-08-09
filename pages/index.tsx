import Head from "next/head";
import { SearchContextProvider } from "../context/SearchContext";

import Footer from "../components/layout/Footer";
import SearchContainer from "../components/layout/SearchContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Esito Mappatura Infratel 2021</title>
        <meta
          name="description"
          content="Scopri le informazioni riguardanti la copertura prevista per il 2026 al tuo indirizzo."
        />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <main className="flex flex-1 flex-col p-5 items-center w-full">
        <h1 className="text-2xl sm:text-4xl font-medium mb-1 drop-shadow-lg">
          Mappatura Infratel 2021
        </h1>
        <h2 className="sm:text-lg italic font-light text-blue-300 mb-10 drop-shadow-lg">
          Copertura prevista per il 2026
        </h2>
        <SearchContextProvider>
          <SearchContainer />
        </SearchContextProvider>
      </main>
      <Footer />
    </>
  );
}
