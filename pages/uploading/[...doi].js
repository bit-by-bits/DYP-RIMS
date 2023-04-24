import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../../src/Common/Navbar";
import Loader from "../../src/Common/Loader";
import Status from "../../src/Upload/Status";
import Details from "../../src/Upload/Details";
import styles from "../../styles/uploading.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const Uploading = () => {
  const router = useRouter();
  const { doi } = router.query;

  const [finished, setFinished] = useState(false);
  const [visible, setVisible] = useState(true);

  const [DOI, setDOI] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [router, user]);

  useEffect(() => {
    if (!router.isReady) return;
    setDOI(doi.join("/").replace("dx.doi.org/", ""));
  }, [doi, router]);

  useEffect(() => {
    if (finished) setTimeout(() => router.push("/profile"), 1999);
  }, [finished, router]);

  return (
    <>
      <Head>
        <title>{!finished ? "Confirm Upload" : "Uploaded"}</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Loader visible={visible} />

        <div className={styles.uploading_wrapper}>
          <Status
            img={!finished ? "/upload/uploading.png" : "/upload/uploaded.png"}
            top={
              !finished
                ? "Your file is being uploaded to RIMS."
                : "Your file has been successfully uploaded to RIMS."
            }
            bottom={
              !finished
                ? "Kindly confirm and edit the following details."
                : "Wait while we redirect you to the home page..."
            }
          />

          {!finished && (
            <Details setv={setVisible} setf={setFinished} doi={DOI} />
          )}
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
    </>
  );
};

export default Uploading;
