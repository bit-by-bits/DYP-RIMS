import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/uploading.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { FloatButton, Spin } from "antd";
import Side from "../../src/Common/Side";
import Top from "../../src/Common/Top";
import FileInfo from "../../src/Upload/FileInfo";

const Uploading = () => {
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
        ? Date.now() - user.setUpTime > 3600000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  useEffect(() => {
    if (!router.isReady) return;
    setDOI(doi.join("/").replace("dx.doi.org/", ""));
  }, [doi, router]);

  // STATES

  const [visible, setVisible] = useState(true);
  const [finished, setFinished] = useState(false);

  // EFFECTS

  useEffect(() => {
    if (finished) setTimeout(() => router.push("/profile"), 1999);
  }, [finished, router]);

  // FUNCTIONS

  return (
    <>
      <Head>
        <title>{!finished ? "Confirm Upload" : "Uploaded"}</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spin
          style={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            maxHeight: "100vh",
            position: "fixed",
            backgroundColor: "rgba(256, 256, 256, 0.8)",
          }}
          spinning={visible}
          size="large"
          tip="Please wait as page loads"
        >
          <FloatButton.BackTop
            style={{ left: 30, bottom: 30, borderRadius: "50%" }}
          />

          <div style={{ paddingLeft: "18vw" }}>
            <Side sets={() => {}} />

            <div className={styles.uploading_wrapper}>
              <Top main={{}} user={user} />

              {[
                {
                  status: "Uploading",
                  top: "Your file is being uploaded to RIMS.",
                  bottom: "Kindly confirm the corresponding authors.",
                  image: "/upload/uploading.png",
                },
                {
                  status: "Uploaded",
                  top: "Your file has been successfully uploaded to RIMS.",
                  bottom: "Wait while we redirect you to the home page...",
                  image: "/upload/uploaded.png",
                },
              ].map(
                (e, i) =>
                  finished == i && (
                    <div className={styles.status} key={i}>
                      <Image
                        width={70}
                        height={75}
                        src={e.image}
                        title={e.status}
                        alt={e.status}
                      />
                      <div className={styles.uploading_head}>
                        <span>{e.top}</span>
                        <span>{e.bottom}</span>
                      </div>
                    </div>
                  )
              )}

              {!finished && (
                <FileInfo user={user} setv={setVisible} DOI={DOI} />
              )}

              <a
                href="https://www.qtanea.com/"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt="Q"
                  width={60}
                  height={60}
                  src="/logos/qtanea-colour.png"
                />
              </a>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Uploading;
