import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import Loader from "../../src/Common/Loader";
import Navbar from "../../src/Common/Navbar";
import FileInfo from "../../src/File/FileInfo";
import { message } from "antd";
import axios from "axios";
import Side from "../../src/Common/Side";

const File = () => {
  const router = useRouter();
  const { id } = router.query;

  const [ID, setID] = useState(id);
  const [visible, setVisible] = useState(true);

  const [file, setFile] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [user, router]);

  useEffect(() => {
    if (router.isReady) setID(id);
    console.log(id);
  }, [router, id]);

  const download = () => {
    message.error("Download functionality unavailable!");
  };

  const remove = () => {
    let data = new FormData();
    data.append("id", ID);

    axios({
      method: "post",
      url: "https://dpu-file-server.herokuapp.com/delete",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(res => {
        message.success("Publication deleted successfully!");

        router.push("/");
      })
      .catch(err => message.error("Publication not deleted!"));
  };

  return (
    <>
      <Head>
        <title>File</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Navbar />
        {/* <Side /> */}

        <Loader visible={visible} />

        <div className={styles.file_wrapper}>
          <FileInfo setv={setVisible} setd={setFile} id={ID} />
          <div className={styles.file_btns}>
            <div
              onClick={() => router.push(`/edit/${ID}`)}
              className={styles.file_btn1}
            >
              Edit
            </div>

            {file && (
              <div onClick={download} className={styles.file_btn2}>
                Download
              </div>
            )}

            <div onClick={remove} className={styles.file_btn2}>
              Delete
            </div>
          </div>

          <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
            <Image
              alt="Q"
              width={60}
              height={60}
              className={styles.foot}
              src="/logos/qtanea-colour.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default File;
