import React from "react";
import Head from "next/head";
import styles from "../../../styles/file.module.css";
import Loader from "../../../src/Common/Loader";
import Navbar from "../../../src/Common/Navbar";
import { useRouter } from "next/router";
import FileForm from "../../../src/Common/FileForm";

const ID = () => {
  const router = useRouter();
  const { id } = router.query,
    [visible, setVisible] = React.useState(true);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token");

      return (
        <>
          <Head>
            <title>File</title>
            <link rel="icon" href="logos/dpu-2.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />
            <Loader visible={visible} />
            <h2 style={{ margin: "8vw 0 2vw 10vw", color: "#9a2827" }}>
              Hello {localStorage.getItem("user_name")}. Please fill the empty
              fields (if any).
            </h2>
            <FileForm setVisible={setVisible} item={item} id={id} />
          </main>
        </>
      );
    }
  }
};

export default ID;
