import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";

import Loader from "../../src/Common/Loader";
import Navbar from "../../src/Common/Navbar";
import FileInfo from "../../src/File/FileInfo";
import { message } from "antd";

const File = () => {
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
  }, [user, router]);

  useEffect(() => {
    if (router.isReady) setID(id);
    console.log(id);
  }, [router, id]);

  return (
    <>
      <Head>
        <title>File</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Loader visible={visible} />

        <div className={styles.file_wrapper}>
          <FileInfo setVisible={setVisible} id={ID} />
          <div className={styles.file_btns}>
            <div
              onClick={() => message.error("File missing")}
              className={styles.file_btn1}
            >
              Download
            </div>
            <div
              onClick={() => router.push(`/edit/${ID}`)}
              className={styles.file_btn2}
            >
              Edit File
            </div>
            <div
              onClick={() => message.error("Delete functionality missing")}
              className={styles.file_btn2}
            >
              Delete
            </div>
          </div>

          <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
            <Image
              alt="Q"
              width={60}
              height={60}
              className={styles.foot}
              src="/logos/qtanea-colour.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default File;
