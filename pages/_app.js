config.autoAddCss = false;
import { config } from "@fortawesome/fontawesome-svg-core";

import Head from "next/head";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Script async src="https://accounts.google.com/gsi/client" />
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
