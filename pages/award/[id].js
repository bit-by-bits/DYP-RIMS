import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/file.module.css";
import React, { useState, useEffect } from "react";
import { FloatButton, Spin, message } from "antd";
import Side from "../../src/Common/Side";
import Top from "../../src/Common/Top";
import AwardInfo from "../../src/Add/AwardInfo";
import URLObj from "../../src/baseURL";
import axios from "axios";

const Award = () => {
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

  const downloadAward = () => {
    message.error("Download functionality unavailable!");
  };

  const deleteAward = () => {
    const formdata = new FormData();
    formdata?.append("id", ID);

    axios({
      method: "DELETE",
      url: `${URLObj.base}/research/award/`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user?.token,
      },
      data: formdata,
    })
      .then(res => {
        message.success("Award deleted successfully!");
        router.push("/profile");
      })
      .catch(err => {
        message.error("Award deletion failed!");
      });
  };

  const editAward = () => {
    router.push(`/edit/award/${ID}`);
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Award</title>
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
                <AwardInfo user={user} setv={setVisible} ID={ID} />

                <div className={styles.file_btns}>
                  {[
                    {
                      name: "Delete",
                      function: deleteAward,
                      class: styles.file_btn2,
                    },
                    {
                      name: "Edit Info",
                      function: editAward,
                      class: styles.file_btn1,
                    },
                    {
                      name: "Download",
                      function: downloadAward,
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

export default Award;
