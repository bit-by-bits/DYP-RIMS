import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../src/styles/file.module.css";
import React, { useState, useEffect } from "react";
import FileInfo from "../../src/components/File/FileInfo";
import { message } from "antd";
import Side from "../../src/components/Common/Side";
import Top from "../../src/components/Common/Top";
import axios from "axios";
import URLObj from "../../src/components/baseURL";
import { useUser } from "../../src/components/context/userContext";
import Spinner from "../../src/components/Common/Spinner";

const File = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();

  const { doi } = router.query;
  const [DOI, setDOI] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    setDOI(doi.join("/").replace("dx.doi.org/", ""));
  }, [doi, router]);

  // STATES

  const [visible, setVisible] = useState(true);

  // EFFECTS

  // FUNCTIONS

  const downloadPub = () => {
    message.error("Download functionality unavailable!");
  };

  const deletePub = () => {
    const str = JSON.stringify({ doi: DOI });

    axios({
      method: "DELETE",
      url: `${URLObj.base}/publications/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
        "Content-Type": "application/json",
      },
      data: str,
    })
      .then(res => {
        message.success("Publication deleted successfully!");
        router.push("/profile");
      })
      .catch(err => {
        message.error("Publication deletion failed!");
      });
  };

  const editPub = () => {
    router.push(`/uploading/${DOI}`);
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | File</title>
        <link rel="icon" href="../../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spinner show={visible} />

        <div style={{ paddingLeft: "20vw" }}>
          <Side />

          <div className={styles.file_wrapper}>
            <Top />

            <div>
              <FileInfo user={user} setv={setVisible} DOI={DOI} />

              <div className={styles.file_btns}>
                {[
                  {
                    name: "Delete",
                    function: deletePub,
                    class: styles.file_btn2,
                  },
                  {
                    name: "Edit Info",
                    function: editPub,
                    class: styles.file_btn1,
                  },
                  {
                    name: "Download",
                    function: downloadPub,
                    class: styles.file_btn2,
                  },
                ].map(btn => (
                  <div
                    key={btn.name}
                    onClick={btn.function}
                    className={btn.class}
                  >
                    {btn.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default File;
