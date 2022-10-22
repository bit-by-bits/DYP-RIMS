config.autoAddCss = false;
import { config } from "@fortawesome/fontawesome-svg-core";

import Head from "next/head";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <script async src="https://accounts.google.com/gsi/client" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
