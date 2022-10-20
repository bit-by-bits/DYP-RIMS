config.autoAddCss = false;
import { config } from "@fortawesome/fontawesome-svg-core";

import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
