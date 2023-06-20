import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import { FloatButton, Spin, message } from "antd";
import Side from "../../src/Common/Side";
import Top from "../../src/Common/Top";
import ConferenceInfo from "../../src/Add/ConferenceInfo";
import URLObj from "../../src/baseURL";
import axios from "axios";

const Conference = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  const { id } = router.query;
  const [ID, setID] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      user
        ? Date.now() - user?.setUpTime > 86400000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  useEffect(() => {
    if (router.isReady) setID(id);
  }, [router, id]);

  // STATES

  const [visible, setVisible] = useState(true);

  // EFFECTS

  // FUNCTIONS

  const downloadConf = () => {
    message.error("Download functionality unavailable!");
  };

  const deleteConf = () => {
    const formdata = new FormData();
    formdata?.append("id", ID);

    axios({
      method: "DELETE",
      url: `${URLObj.base}/research/conference/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Conference deleted successfully!");
        router.push("/profile");
      })
      .catch(err => {
        message.error("Conference deletion failed!");
      });
  };

  const editConf = () => {
    router.push(`/edit/conference/${ID}`);
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Conference</title>
        <link rel="icon" href="../../logos/dpu-2.png" />
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
                <ConferenceInfo user={user} setv={setVisible} ID={ID} />

                <div className={styles.file_btns}>
                  {[
                    {
                      name: "Delete",
                      function: deleteConf,
                      class: styles.file_btn2,
                    },
                    {
                      name: "Edit Info",
                      function: editConf,
                      class: styles.file_btn1,
                    },
                    {
                      name: "Download",
                      function: downloadConf,
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

export default Conference;
