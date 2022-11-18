import Head from "next/head";
import React from "react";
import axios from "axios";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    localStorage.getItem("auth_token") != null
  )
    localStorage.clear();

  React.useEffect(() => {
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
  }, []);

  function handleCallbackResponse(response) {
    var userToken = response.credential;

    axios({
      method: "POST",
      url: `https://rimsapi.journalchecker.com/api/v1/login/`,
      data: { id_token: userToken },
    }).then(function (response) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user_id", response.data.id);
      localStorage.setItem("user_role", response.data.role);
      localStorage.setItem("user_pic", response.data.picture);

      if (localStorage.getItem("user_role") == "management")
        router.push("/management");
      else router.push("/profile");
    });
  }

  return (
    <>
      <Head>
        <title>DYPU / RIMS</title>
        <link rel="icon" href="logos/dpu-2.png" />
      </Head>

      <main className={styles.main}>
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

        {/* <footer className={styles.footer}>Made by Qtanea</footer> */}
        <a href="https://www.qtanea.com/" rel="noreferrer" target="_blank">
          <img alt="Q" className={styles.foot} src="logos/qtanea-white.png" />
        </a>
      </main>
    </>
  );
}
