import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../src/styles/file.module.css";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import Side from "../../src/components/Common/Side";
import Top from "../../src/components/Common/Top";
import AwardInfo from "../../src/components/Add/AwardInfo";
import URLObj from "../../src/components/baseURL";
import axios from "axios";
import { useUser } from "../../src/components/context/userContext";
import Spinner from "../../src/components/Common/Spinner";

const Award = () => {
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
        <Spinner show={visible} />

        <div style={{ paddingLeft: "20vw" }}>
          <Side />

          <div className={styles.file_wrapper}>
            <Top />

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
      </div>
    </>
  );
};

export default Award;
