import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import FileInfo from "../../src/File/FileInfo";
import { FloatButton, Spin, message } from "antd";
import Side from "../../src/Common/Side";
import Top from "../../src/Common/Top";

const File = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  const { doi } = router.query;
  const [DOI, setDOI] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      user
        ? Date.now() - user?.setUpTime > 3600000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

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
    message.error("Delete functionality unavailable!");
  };

  const editPub = () => {
    router.push(`/uploading/${DOI}`);
  };

  return (
    <>
      <Head>
        <title>File</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spin
          className="spinner"
          spinning={visible}
          size="large"
          tip="Please wait as page loads"
        >
          <FloatButton.BackTop
            style={{ left: 30, bottom: 30, borderRadius: "50%" }}
          />

          <div style={{ paddingLeft: "18vw" }}>
            <Side />

            <div className={styles.file_wrapper}>
              <Top user={user} />

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
        </Spin>
      </div>
    </>
  );
};

export default File;
