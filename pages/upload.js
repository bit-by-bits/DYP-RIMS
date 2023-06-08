import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/upload.module.css";
import Image from "next/image";
import URLObj from "../src/baseURL";
import { FloatButton, Input, Spin, Upload, message } from "antd";
import Side from "../src/Common/Side";
import Top from "../src/Common/Top";

const Publications = () => {
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
        ? Date.now() - user?.setUpTime > 3600000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  const { Dragger } = Upload;
  const [visible, setVisible] = useState(true);

  const [DOI, setDOI] = useState();
  const [file, setFile] = useState();
  const [searching, setSearching] = useState(false);

  // EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1400);
  }, []);

  useEffect(() => {
    if (file) add();
  }, [file]);

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
    setSearching(true);

    if (!DOI) {
      setSearching(false);
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
          setSearching(false);

          message.success("Wait while we redirect you");
          router.push(`/uploading/${doi}`);
        })
        .catch(err => {
          setSearching(false);
          message.error("Enter a valid DOI");
        });
    }
  };

  const add = () => {
    if (!file) {
      message.error("Select a file first");
      return;
    }

    message.error("This feature is not available yet. Please use DOI instead");
  };

  return (
    <>
      <Head>
        <title>Add Publications</title>
        <link rel="icon" href="logos/dpu-2.png" />
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

            <div className={styles.upload_wrapper}>
              <Top user={user} />

              <div className={styles.upload_left}>
                <Dragger
                  name="file"
                  multiple={false}
                  style={{ border: "none", width: "65vw" }}
                  beforeUpload={file => setFile(file)}
                >
                  <Image
                    width={60}
                    height={60}
                    alt="ADD"
                    src="/upload/upload.png"
                    className={styles.upload_img}
                  />
                  <div className={styles.upload_title}>Add a file</div>

                  <div className={styles.upload_msg}>
                    Click or drag file to this area to upload
                  </div>
                </Dragger>

                <div className={styles.upload_msg}>Or add a file using DOI</div>
                <div className={styles.flex}>
                  <Input
                    className={styles.upload_input2}
                    autoComplete={true}
                    placeholder="enter doi here"
                    onChange={e => setDOI(e.target.value)}
                    onPressEnter={searchDOI}
                  />

                  {searching ? (
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

export default Publications;
