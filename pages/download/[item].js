import Head from "next/head";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/download.module.css";
import Navbar from "../../src/Common/Navbar";
import Side from "../../src/Common/Side";
import { useRouter } from "next/router";
import axios from "axios";
import URLObj from "../../src/baseURL";

const Download = () => {
  const router = useRouter();
  const { item } = router.query;

  const [ITEM, setITEM] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (router.isReady) setITEM(item);
  }, [router, item]);

  useEffect(() => {
    if (ITEM)
      axios({
        url: `${URLObj.base}/export/get/schedule/${ITEM}/?userID=${user?.id}`,
        method: "GET",
      }).then(res => {});
  }, [ITEM, user]);

  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        {/* <Side /> */}

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

export default Download;
