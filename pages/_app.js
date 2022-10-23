config.autoAddCss = false;
import { config } from "@fortawesome/fontawesome-svg-core";

import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <script async src="https://accounts.google.com/gsi/client" />
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
