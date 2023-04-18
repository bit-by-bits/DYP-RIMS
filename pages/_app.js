import "../styles/globals.css";
import { useState } from "react";
import { UserContext } from "../src/userContext";

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState({
    id: "",
    picture: "",
    role: "",
    token: "",
    name: "",
    email: "",
    dept: "",
  });

  return (
    <>
      {
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script src="https://accounts.google.com/gsi/client" />
      }

      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
};
export default MyApp;
