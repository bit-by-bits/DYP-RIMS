import React, { useState, useEffect, useContext } from "react";

import Head from "next/head";
import styles from "../../../styles/file.module.css";
import Loader from "../../../src/Common/Loader";
import Navbar from "../../../src/Common/Navbar";
import { useRouter } from "next/router";
import FileForm from "../../../src/Common/FileForm";
import { UserContext } from "../../../src/userContext";

const ID = () => {
  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  const router = useRouter();
  const { id } = router.query,
    [visible, setVisible] = useState(true);

  return (
    <>
      <Head>
        <title>File</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Loader visible={visible} />
        <h2 style={{ margin: "8vw 0 2vw 10vw", color: "#9a2827" }}>
          Hello {localStorage.getItem("user_name")}. Please fill the empty
          fields (if any).
        </h2>
        <FileForm setVisible={setVisible} id={id} />
      </div>
    </>
  );
};

export default ID;
