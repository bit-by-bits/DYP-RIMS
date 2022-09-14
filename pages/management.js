import Head from "next/head";
import styles from "../styles/management.module.css";
import React from "react";
import Navbar from "../src/Common/Navbar";
import Profile from "../src/Management/Profile";
import Graphs from "../src/Management/Graphs";
import Options from "../src/Management/Options";
import Datas from "../src/Management/Datas";
import { useRouter } from "next/router";
import Publishers from "../src/Management/Publishers";

const Mgmt = () => {
  const router = useRouter();
  const checkout = ((typeof window !== 'undefined') ? ((localStorage.auth_token === 'undefined')? router.push("/"):null): null);

  const news = [6],
    publishers = [10];
  for (let a = 0; a < 6; a++)
    news[a] = {
      what: "Dr Firstname Lastname has added a publication on the effects of XYZ.",
      when: "20 June 2021",
    };
  for (let a = 0; a < 5; a++)
    publishers[a] = {
      name: "Dr Firstname Lastname",
      college: "Dr. DY Patil Medical College",
      image: "doctah.png",
    };

  return (
    <>
      <Head>
        <title>Management</title>
        <link rel="icon" href="logos/qtanea.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />

        <div className={styles.mgmt_wrapper}>
          <Profile data={news} />
          <Options />
          <Graphs />
          <Datas />
          <Publishers data={publishers} />

          <div className={styles.footer}>Made by Qtanea</div>
        </div>
      </main>
    </>
  );
};

export default Mgmt;
