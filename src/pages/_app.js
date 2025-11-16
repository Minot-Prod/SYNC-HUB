import "@/styles/globals.css";
import Head from "next/head";
import ShellLayout from "@/components/ShellLayout";

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ShellLayout>{page}</ShellLayout>
    ));

  return (
    <>
      <Head>
        <title>Sync GPT Hub</title>
        <meta
          name="description"
          content="Hub IA de vente pour Sync Productions – prospection, rédaction, analyse et radar opportunités."
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
