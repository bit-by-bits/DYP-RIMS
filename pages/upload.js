import axios from "axios";
import React, { useState, useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../src/Common/Navbar";
import styles from "../styles/upload.module.css";
import Alert from "../src/Common/Alert";
import Image from "next/image";
import URLObj from "../src/baseURL";
import { UserContext } from "../src/userContext";

const Upload = () => {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);
  if (typeof window !== "undefined" && user.token === "") router.push("/");

  const [file, setFile] = useState();
  const [DOI, setDOI] = useState();

  const [visible, setVisible] = useState(false);
  const [searching, setSearching] = useState({ file: false, doi: false });

  const [alert, setAlert] = useState({
    text: "",
    type: 0,
  });

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

        const doi = res.data.doiID;
        if (isValidHttpUrl(doi)) doi = doi.split("//").pop();
        localStorage.setItem("udoi", doi);

        setVisible(true);
        setAlert({
          text: "Success: Redirecting you now..",
          type: 1,
        });

        setTimeout(() => {
          setSearching({ file: searching.file, doi: false });
          router.push(`/uploading/${doi}`);
        }, 1001);
      })
      .catch(err => {
        setSearching({ file: searching.file, doi: false });

        setVisible(true);
        setAlert({
          text: "Failed: Enter a valid DOI.",
          type: 2,
        });
      });
  };

  const add = () => {
    setSearching({ file: true, doi: searching.doi });

    if (!file) {
      setSearching({ file: false, doi: searching.doi });

      setVisible(true);
      setAlert({
        text: "Failed: Select a file.",
        type: 2,
      });

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

        const doi = res.data.doiID;
        if (isValidHttpUrl(doi)) doi = doi.split("//").pop();
        localStorage.setItem("udoi", doi);

        setVisible(true);
        setAlert({
          text: "Success: Redirecting you now..",
          type: 1,
        });

        setTimeout(() => {
          setSearching({ file: false, doi: searching.doi });
          router.push(`/uploading/${doi}`);
        }, 1001);
      })
      .catch(err => {
        setSearching({ file: false, doi: searching.doi });

        setVisible(true);
        setAlert({
          text: "Failed: Enter a valid File.",
          type: 2,
        });
      });
  };

  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        <Alert
          setVisible={setVisible}
          visible={visible}
          text={alert.text}
          type={alert.type}
        />

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

            <div className={styles.upload_msg}>Kindly upload a .pdf file.</div>

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
    </>
  );
};

export default Upload;
