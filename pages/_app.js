config.autoAddCss = false;
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <script src="https://accounts.google.com/gsi/client" ></script>
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
