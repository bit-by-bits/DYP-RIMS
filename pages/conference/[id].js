import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../src/styles/file.module.css";
import React, { useState, useEffect } from "react";
import { FloatButton, message } from "antd";
import Side from "../../src/components/Common/Side";
import Top from "../../src/components/Common/Top";
import ConferenceInfo from "../../src/components/Add/ConferenceInfo";
import URLObj from "../../src/components/baseURL";
import axios from "axios";
import { useUser } from "../../src/components/context/userContext";
import Spinner from "../../src/components/Common/Spinner";

const Conference = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();

  const { id } = router.query;
  const [ID, setID] = useState("");

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
        <Spinner show={visible} />

        <FloatButton.BackTop
          style={{ left: 30, bottom: 30, borderRadius: "50%" }}
        />

        <div style={{ paddingLeft: "20vw" }}>
          <Side />

          <div className={styles.file_wrapper}>
            <Top />

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
      </div>
    </>
  );
};

export default Conference;
