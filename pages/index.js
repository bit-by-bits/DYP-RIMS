import Head from "next/head";
import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    /* global google */

    if (localStorage.getItem("user") === null) {
      google.accounts.id.initialize({
        client_id:
          "827028625147-3sai220i70tsqd8rqr89i4gnrl2d6n2j.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "medium",
      });
    }
  }, []);

  function handleCallbackResponse(response) {
    var userToken = response.credential;

    axios({ 
      method: "POST",
      url: `http://127.0.0.1:8000/api/v1/login/`,
      data: { id_token: userToken },
    }).then(function (response) {
      localStorage.setItem("auth_token", response.data.token);
      router.push('/dashboard');
    });
  }

  return (
    <>
      <Head>
        <title>DYPU | RIMS</title>
        <link rel="icon" href="logos/qtanea.png" />
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>

      <main className={styles.main}>
        <div className={styles.welcome}>
          <div className={styles.greeting}>
            <div className={styles.title}>Welcome to RIMS</div>

            <div className={styles.content}>
              DY Patil University's Research Information Manangements System
            </div>
          </div>

          <div className={styles.login}>
            <img src="logos/dpu.png" alt="DPU" className={styles.logo} />
            <div className={styles.login_top}>Login to RIMS</div>
            <div className={styles.login_middle}>
              Kindly login with your authorized Insitute credentials
            </div>
            <div className={styles.button} id="signInDiv"></div>
            <div className={styles.login_bottom}>
              Having trouble logging in? <a href="">Click here</a>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>Made by Qtanea</footer>
      </main>
    </>
  );
}
