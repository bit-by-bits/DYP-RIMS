import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import Loader from "../src/Common/Loader";
import URLObj from "../src/baseURL";
import { message } from "antd";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  useEffect(() => localStorage.clear(), []);

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "827028625147-3sai220i70tsqd8rqr89i4gnrl2d6n2j.apps.googleusercontent.com",
      callback: response =>
        axios({
          method: "POST",
          url: `${URLObj.base}/login/`,
          data: { id_token: response.credential },
        })
          .then(res => {
            message.success("Login Successful");

            localStorage.setItem(
              "user",
              JSON.stringify({
                id: res.data.id,
                picture: res.data.picture,
                role: res.data.role,
                token: res.data.token,
                name: "",
                email: "",
                dept: "",
              })
            );

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

  return (
    <>
      <Head>
        <title>DYPU / RIMS</title>
        {
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script src="https://accounts.google.com/gsi/client" />
        }
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <div className={styles.main}>
        <Loader visible={visible} />
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
            <div className={styles.button} id="signInDiv"></div>
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
            src="/logos/qtanea-colour.png"
          />
        </a>
      </div>
    </>
  );
}
