import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/file.module.css";
import Loader from "../../../src/Common/Loader";
import Navbar from "../../../src/Common/Navbar";
import { useRouter } from "next/router";
import FileForm from "../../../src/Common/FileForm";

const ID = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [router, user]);

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
        <h2
          style={{ margin: "8vw 0 2vw 10vw", color: "#9a2827" }}
        >{`Hello ${user.name}. Please fill the empty fields (if any).`}</h2>
        <FileForm setVisible={setVisible} ID={id} />
      </div>
    </>
  );
};

export default ID;
