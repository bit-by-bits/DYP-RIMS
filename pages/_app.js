/* eslint-disable @next/next/no-sync-scripts */
import Script from "next/script";
import "../src/styles/globals.css";
import { UserProvider } from "../src/components/context/userContext";
import { AccessProvider } from "../src/components/context/accessContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <Script src="https://cdn.scite.ai/badge/scite-badge-latest.min.js" />
      <Script src="https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js" />

      <UserProvider>
        <AccessProvider>
          <Component {...pageProps} />
        </AccessProvider>
      </UserProvider>
    </>
  );
};
export default MyApp;
