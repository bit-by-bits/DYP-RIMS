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
  const [pending, ssetPending] = useState(true);

  // EFFECTS

  useEffect(() => {
    if (!pending) setTimeout(() => router.push("/profile"), 1200);
  }, [pending, router]);

  // FUNCTIONS

  return (
    <>
      <Head>
        <title>{pending ? "Confirm Upload" : "Uploaded"}</title>
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
            <Side sets={() => {}} />

            <div className={styles.uploading_wrapper}>
              <Top main={{}} user={user} />

              <div className={styles.uploading_head}>
                {pending
                  ? "Confirm Corresponding Author(s)"
                  : "Publication Uploaded Successfully!"}
              </div>

              {pending && (
                <FileInfo
                  user={user}
                  setp={ssetPending}
                  setv={setVisible}
                  DOI={DOI}
                />
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
