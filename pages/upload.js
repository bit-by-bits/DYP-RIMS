import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/upload.module.css";
import Image from "next/image";
import URLObj from "../src/baseURL";
import { FloatButton, Spin, message } from "antd";
import Side from "../src/Common/Side";
import Top from "../src/Common/Top";

const Upload = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

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

  // STATES

  const [visible, setVisible] = useState(true);

  const [file, setFile] = useState();
  const [DOI, setDOI] = useState();

  const [searching, setSearching] = useState({ file: false, doi: false });

  // EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1400);
  }, []);

  // FUNCTIONS

  const isValidHttpUrl = string => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (err) {
      return false;
    }
  };

  const searchDOI = () => {
    setSearching({ file: searching.file, doi: true });

    if (!DOI) {
      setSearching({ file: searching.file, doi: false });
      message.error("Enter a DOI first");

      return;
    } else {
      let doi = DOI;

      if (isValidHttpUrl(doi)) doi = doi.split("//").pop();
      if (doi.includes("doi.org/")) doi = doi.split("doi.org/").pop();

      axios({
        method: "PUT",
        url: `${URLObj.base}/publications/?doi=${doi}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
        },
      })
        .then(res => {
          setSearching({ file: searching.file, doi: false });

          message.success("Wait while we redirect you");
          router.push(`/uploading/${doi}`);
        })
        .catch(err => {
          setSearching({ file: searching.file, doi: false });
          message.error("Enter a valid DOI");
        });
    }
  };

  const add = () => {
    message.error("This feature is not available yet");
  };

  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="logos/dpu-2.png" />
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

            <div className={styles.upload_wrapper}>
              <Top main={{}} user={user} />

              <div className={styles.upload_left}>
                <Image
                  width={60}
                  height={60}
                  alt="ADD"
                  src="/upload/upload.png"
                  className={styles.upload_img}
                />
                <div className={styles.upload_title}>Add a file</div>

                <div className={styles.upload_msg}>
                  Kindly upload a .pdf file.
                </div>

                <label htmlFor="file" className={styles.label}>
                  <input
                    className={styles.upload_input1}
                    onChange={e => setFile(e.target.files[0])}
                    type="file"
                    id="file"
                    accept="application/pdf"
                  />

                  <div className={styles.upload_btn2}>Select File</div>
                  <div className={styles.upload_text}>
                    {file ? "Selected " + file.name : "No File Selected"}
                  </div>
                </label>

                {searching.file ? (
                  <div className={styles.upload_btn}>
                    <div className={styles.dots} />
                  </div>
                ) : (
                  <div onClick={add} className={styles.upload_btn}>
                    Add File
                  </div>
                )}

                <div className={styles.upload_msg}>Or add a file using DOI</div>
                <div className={styles.flex}>
                  <input
                    type="text"
                    id="doi_text"
                    placeholder="Enter DOI"
                    className={styles.upload_input2}
                    onChange={e => setDOI(e.target.value)}
                  />
                  {searching.doi ? (
                    <div className={styles.upload_btn}>
                      <div className={styles.dots} />
                    </div>
                  ) : (
                    <div onClick={searchDOI} className={styles.upload_btn}>
                      Add DOI
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Upload;
