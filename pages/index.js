import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../src/styles/login.module.css";
import { useRouter } from "next/router";
import URLObj from "../src/components/baseURL";
import { Spin, message } from "antd";
import Image from "next/image";
import { useUser } from "../src/components/context/userContext";

export default function Home() {
  // BOILERPLATE

  const router = useRouter();
  const { user, change } = useUser();

  // STATES

  const [visible, setVisible] = useState(true);

  // EFFECTS

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "827028625147-3sai220i70tsqd8rqr89i4gnrl2d6n2j.apps.googleusercontent.com",
      callback: response =>
        axios({
          method: "POST",
          url: `${URLObj.base}/login/`,
          headers: {
            "X-ACCESS-KEY": URLObj.key,
            "X-GOOGLE-ID-TOKEN": response.credential,
          },
        })
          .then(res => {
            message.success("Login Successful");
            change({ token: res.data?.token, setUpTime: Date.now() });
            router.push("/profile");
          })
          .catch(err => message.error("Login Failed")),
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "medium",
    });

    setTimeout(() => setVisible(false), 1600);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FUNCTIONS

  return (
    <>
      <Head>
        <title>DYPU RIMS | Login</title>
        {
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script src="https://accounts.google.com/gsi/client" />
        }
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <Spin
        className="spinner"
        spinning={visible}
        size="large"
        tip="Please wait as page loads"
      >
        <div className={styles.main}>
          <div className={styles.welcome}>
            <div className={styles.greeting}>
              <div className={styles.title}>Welcome to RIMS</div>

              <div className={styles.content}>
                Dr. D.Y. Patil Medical College, Hospital and Research Center's
                Research Information Manangement System
              </div>
            </div>

            <div className={styles.login}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src="logos/dpu-1.png" alt="DPU" className={styles.logo} />
              }

              <div className={styles.login_top}>Login to RIMS</div>

              <div className={styles.login_middle}>
                Kindly login with your authorized Institute's credentials
              </div>

              <div className={styles.button} id="signInDiv" />

              <div className={styles.login_bottom}>
                Having trouble logging in?
                <a href="mailto:rims@dpu.edu.in?cc=naac.medical@dpu.edu.in&subject=Login not working&body=I am unable to login RIMS with my email id // specify your email here //.">
                  Click here
                </a>
              </div>
            </div>
          </div>

          <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
            <Image
              alt="Q"
              width={60}
              height={60}
              className={styles.foot}
              src="/logos/qtanea-white.png"
            />
          </a>
        </div>
      </Spin>
    </>
  );
}
