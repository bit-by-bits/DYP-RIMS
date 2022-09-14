config.autoAddCss = false;
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default MyApp
