import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../src/styles/file.module.css";
import React, { useState, useEffect } from "react";
import { FloatButton, Spin, message } from "antd";
import Side from "../../src/components/Common/Side";
import Top from "../../src/components/Common/Top";
import ProfileInfo from "../../src/components/Add/ProfileInfo";
import axios from "axios";
import URLObj from "../../src/components/baseURL";
import { useUser } from "../../src/components/context/userContext";

const Profile = () => {
  // HOOKS

  const router = useRouter();
  const { user } = useUser();

  const { id } = router.query;
  const [ID, setID] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    setID(id);
  }, [router, id]);

  // STATES

  const [visible, setVisible] = useState(true);
  const [userData, setUserData] = useState({});

  // EFFECTS

  useEffect(() => {
    if (ID && user?.token) {
      axios({
        method: "PUT",
        url: `${URLObj.base}/faculty/?id=${ID}`,
        headers: {
          "X-ACCESS-KEY": URLObj.key,
          "X-AUTH-TOKEN": user?.token,
          "X-ACCESS-LEVEL": "department",
        },
      })
        .then(res => {
          setVisible(false);
          setUserData(res?.data?.profile?.user);
          localStorage.setItem(
            "token",
            JSON.stringify({ token: res?.data?.token })
          );
        })
        .catch(err => {
          console.log(err);
          message.error("Could not fetch file data");
        });
    }
  }, [ID, user]);

  // FUNCTIONS

  const addPubs = () => {
    router.push("/upload");
  };

  const editProfile = () => {
    router.push(`/edit/profile/${ID}`);
  };

  return (
    <>
      <Head>
        <title>DYPU RIMS | Profile</title>
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
              <Top />

              <div>
                <ProfileInfo data={userData} />

                <div className={styles.file_btns}>
                  {[
                    {
                      name: "Add Publications",
                      function: addPubs,
                      class: styles.file_btn2,
                    },
                    {
                      name: "Edit Info",
                      function: editProfile,
                      class: styles.file_btn1,
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

export default Profile;
