import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import Loader from "../src/Common/Loader";
import { UserContext } from "../src/userContext";
import URLObj from "../src/baseURL";

export default function Home() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.token) router.push("/profile");
  }, [user]);

  useEffect(
    () =>
      setUser({
        id: "",
        picture: "",
        role: "",
        token: "",
        name: "",
        email: "",
        dept: "",
      }),
    []
  );

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "827028625147-3sai220i70tsqd8rqr89i4gnrl2d6n2j.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "medium",
    });

    setTimeout(() => setVisible(false), 1600);
  }, []);

  function handleCallbackResponse(response) {
    axios({
      method: "POST",
      url: `${URLObj.base}/login/`,
      data: { id_token: response.credential },
    }).then(res => {
      setUser({
        id: res.data.id,
        picture: res.data.picture,
        role: res.data.role,
        token: res.data.token,
        name: user.name,
        email: user.email,
        dept: user.dept,
      });
    });
  }

  return (
    <>
      <Head>
        <title>DYPU / RIMS</title>
        <script src="https://accounts.google.com/gsi/client" />
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
            <img src="logos/dpu-1.png" alt="DPU" className={styles.logo} />
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
          <img alt="Q" className={styles.foot} src="logos/qtanea-white.png" />
        </a>
      </div>
    </>
  );
}
