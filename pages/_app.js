config.autoAddCss = false;
import { config } from "@fortawesome/fontawesome-svg-core";

import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>

      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
