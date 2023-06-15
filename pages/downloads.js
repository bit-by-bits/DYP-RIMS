import Head from "next/head";
import Side from "../src/Common/Side";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Top from "../src/Common/Top";
import styles2 from "../styles/add.module.css";
import { FloatButton, Form, Spin, message } from "antd";

const Downloads = () => {
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
        ? Date.now() - user?.setUpTime > 86400000 &&
          localStorage.removeItem("user")
        : router.push("/");
  }, [router, user]);

  // STATES

  const [visible, setVisible] = useState(true);

  // EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1200);
  }, []);

  // FUNCTIONS

  return (
    <>
      <Head>
        <title>DYPU RIMS | Downloads</title>
        <link rel="icon" href="../logos/dpu-2.png" />
      </Head>

      <div className={styles2.wrapper}>
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

            <div className={styles2.container}>
              <Top user={user} />

              <div className={styles2.formContainer}>
                <h1 className={styles2.heading}>Downloads</h1>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Downloads;
