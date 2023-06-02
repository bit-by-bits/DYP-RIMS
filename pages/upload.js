import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/upload.module.css";
import Image from "next/image";
import URLObj from "../src/baseURL";
import { FloatButton, Spin, message } from "antd";
import Side from "../src/Profile/Side";

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

  const search = () => {
    setSearching({ file: searching.file, doi: true });

    const formData = new FormData();
    formData.append("doi", DOI);

    axios({
      method: "POST",
      url: `${URLObj.base}/doi/validate/manual/`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(res => {
        const isValidHttpUrl = string => {
          try {
            const url = new URL(string);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch (err) {
            return false;
          }
        };

        let doi = res.data.doiID;
        if (isValidHttpUrl(doi)) doi = doi.split("//").pop();

        localStorage.setItem("udoi", doi);
        message.success("Wait while we redirect you");

        setTimeout(() => {
          setSearching({ file: searching.file, doi: false });
          router.push(`/uploading/${doi}`);
        }, 1001);
      })
      .catch(err => {
        setSearching({ file: searching.file, doi: false });
        message.error("Enter a valid DOI");
      });
  };

  const add = () => {
    setSearching({ file: true, doi: searching.doi });

    if (!file) {
      setSearching({ file: false, doi: searching.doi });
      message.error("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios({
      method: "POST",
      url: `${URLObj.base}/doi/validate/`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(res => {
        const isValidHttpUrl = string => {
          try {
            const url = new URL(string);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch (err) {
            return false;
          }
        };

        let doi = res.data.doiID;
        if (isValidHttpUrl(doi)) doi = doi.split("//").pop();
        localStorage.setItem("udoi", doi);
        message.success("Wait while we redirect you");

        setTimeout(() => {
          setSearching({ file: false, doi: searching.doi });
          router.push(`/uploading/${doi}`);
        }, 1001);
      })
      .catch(err => {
        setSearching({ file: false, doi: searching.doi });
        message.error("Enter a valid file");
      });
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
            <Side user={user} sets={() => {}} />

            <div className={styles.upload_wrapper}>
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
                    <div
                      style={{
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "110px",
                      }}
                      className={styles.upload_btn}
                    >
                      <div className={styles.dots} />
                    </div>
                  ) : (
                    <div
                      onClick={search}
                      style={{
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "110px",
                      }}
                      className={styles.upload_btn}
                    >
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
