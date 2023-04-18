import Head from "next/head";
import styles from "../../styles/file.module.css";
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Loader from "../../src/Common/Loader";
import Navbar from "../../src/Common/Navbar";
// import FileInfo from "../../src/Common/FileInfo";
import Link from "next/link";
import { UserContext } from "../../src/userContext";
import Image from "next/image";

const ID = () => {
  const router = useRouter();
  const { id } = router.query,
    [visible, setVisible] = useState(true);

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

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
          {/* <FileInfo setVisible={setVisible} id={id} /> */}
          <div className={styles.file_btns}>
            <div className={styles.file_btn1}>Download</div>
            <Link href={`/file/${id}/edit`}>
              <div className={styles.file_btn2}>Edit</div>
            </Link>
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

export default ID;
