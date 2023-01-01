import Head from "next/head";
import styles from "../../styles/file.module.css";
import React from "react";
import { useRouter } from "next/router";
import Loader from "../../src/Common/Loader";
import Navbar from "../../src/Common/Navbar";
import FileInfo from "../../src/Common/FileInfo";

const ID = () => {
  const router = useRouter();
  const { id } = router.query,
    [visible, setVisible] = React.useState(true);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token");

      function loader() {
        setTimeout(() => {
          setVisible(false);
        }, 1600);
      }

      return (
        <>
          <Head>
            <title>File</title>
            <link rel="icon" href="logos/dpu-2.png" />
          </Head>

          <main onLoad={loader} className={styles.wrapper}>
            <Navbar />
            <Loader visible={visible} />

            <div className={styles.file_wrapper}>
              <FileInfo item={item} id={id} />
              <div className={styles.file_btns}>
                <div className={styles.file_btn1}>Download</div>

                <div className={styles.file_btn2}>Edit</div>
              </div>

              <a
                href="https://www.qtanea.com/"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  alt="Q"
                  className={styles.foot}
                  src="../logos/qtanea-colour.png"
                />
              </a>
            </div>
          </main>
        </>
      );
    }
  }
};

export default ID;
