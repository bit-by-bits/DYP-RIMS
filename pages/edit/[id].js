import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/file.module.css";
import Loader from "../../src/Common/Loader";
import Navbar from "../../src/Common/Navbar";
import FileForm from "../../src/File/FileForm";
import Image from "next/image";
import Side from "../../src/Common/Side";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [ID, setID] = useState(id);
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [router, user]);

  useEffect(() => {
    if (router.isReady) setID(id);
  }, [router, id]);

  return (
    <>
      <Head>
        <title>File</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Side />

        <Loader visible={visible} />
        <h2
          style={{ margin: "8vw 0 2vw 10vw", color: "#9a2827" }}
        >{`Hey ${user.name}. Please fill the empty fields (if any).`}</h2>
        <FileForm setVisible={setVisible} id={ID} user={user} />
        <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
          <Image
            alt="Q"
            width={60}
            height={60}
            src="/logos/qtanea-colour.png"
          />
        </a>
      </div>
    </>
  );
};

export default Edit;
