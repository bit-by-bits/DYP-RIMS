import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/profile.module.css";
import { FloatButton, Spin } from "antd";
import Side from "../src/Common/Side";
import { useRouter } from "next/router";
import axios from "axios";
import URLObj from "../src/baseURL";

const Profile = () => {
  // BOILERPLATE

  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && user.token === "") router.push("/");
  }, [router, user]);

  // STATES

  const [person, setPerson] = useState({});
  const [data, setData] = useState({});
  const [statistics, setStatistics] = useState({});
  const [visible, setVisible] = useState(false);

  // EFFECTS

  useEffect(() => {
    axios({
      method: "GET",
      url: `${URLObj.base}/home`,
      headers: {
        "X-ACCESS-KEY": URLObj.key,
        "X-AUTH-TOKEN": user.token,
      },
    })
      .then(res => {
        setPerson(res.data.user);
        setData(res.data.data);
        setStatistics(res.data.statistics);

        setVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user]);

  // FUNCTIONS

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.wrapper}>
        <Spin
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(256, 256, 256, 0.8)",
          }}
          spinning={visible}
          size="large"
          tip="Please wait as page loads"
        >
          <FloatButton.BackTop
            style={{ right: 30, bottom: 30, borderRadius: "50%" }}
          />
          <Side user={person} />
        </Spin>

        <div className={styles.profile_wrapper}></div>
      </div>
    </>
  );
};

export default Profile;
