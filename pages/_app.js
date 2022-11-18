config.autoAddCss = false;
import { config } from "@fortawesome/fontawesome-svg-core";

import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <script src="https://accounts.google.com/gsi/client" />
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
