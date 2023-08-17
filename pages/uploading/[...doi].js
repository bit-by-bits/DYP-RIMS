import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../src/styles/uploading.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { FloatButton } from "antd";
import Side from "../../src/components/Common/Side";
import Top from "../../src/components/Common/Top";
import FileInfo from "../../src/components/Upload/FileInfo";
import { useUser } from "../../src/components/context/userContext";
import Spinner from "../../src/components/Common/Spinner";

const Uploading = () => {
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
  const [text, setText] = useState("");
  const [pending, ssetPending] = useState(true);

  // EFFECTS

  useEffect(() => {
    if (!pending)
      setTimeout(() => {
        router.push(`/file/${DOI}`);
      }, 2000);
  }, [DOI, pending, router]);

  // FUNCTIONS

  return (
    <>
      <Head>
        <title>DYPU RIMS | {pending ? "Confirm Upload" : "Uploaded"}</title>
        <link rel="icon" href="../../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spinner show={visible} />

        <FloatButton.BackTop
          style={{ left: 30, bottom: 30, borderRadius: "50%" }}
        />

        <div style={{ paddingLeft: "18vw" }}>
          <Side />

          <div className={styles.uploading_wrapper}>
            <Top />

            <div className={styles.uploading_head}>
              {pending
                ? "Select Authors from Dr. D.Y. Patil Medical College, Pune"
                : text}
            </div>

            {pending && (
              <FileInfo
                user={user}
                setp={ssetPending}
                setv={setVisible}
                sett={setText}
                DOI={DOI}
              />
            )}

            <div style={{ color: "#9a2827", fontWeight: "bold" }}>
              If there is any error please contact your department clerk who
              will make the necessary changes later after you add the article.
            </div>

            <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
              <Image
                alt="Q"
                width={60}
                height={60}
                src="/logos/qtanea-colour.png"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Uploading;
