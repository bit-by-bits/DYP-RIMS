import React from "react";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import styles from "../styles/login.module.css";

const login = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="icon.png" />
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
            <img src="/dpu.png" alt="DPU" className={styles.logo} />
            <div className={styles.login_top}>Login to RIMS</div>
            <div className={styles.login_middle}>
              Kindly login with your authorized Insitute credentials
            </div>
            <button className={styles.button} onClick={() => signIn()}>
              {" "}
              <img src="gugul.png" alt="G" />
              <span>Login with Google</span>
            </button>
            <div className={styles.login_bottom}>
              Having trouble logging in? <a href="">Click here</a>
            </div>
          </div>
        </div>
        <footer className={styles.footer}>Made by Qtanea</footer>
      </main>
    </>
  );
};

export default login;
