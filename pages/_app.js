import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      {
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script src="https://accounts.google.com/gsi/client" />
      }
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
