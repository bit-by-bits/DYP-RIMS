import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../src/Common/Navbar";
import Publishers from "../src/Dashboard/Publishers";
import Graphs from "../src/Dashboard/Graphs";
import Options from "../src/Dashboard/Options";
import Datas from "../src/Dashboard/Datas";

const Dashboard = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.auth_token) router.push("/");
    else {
      const publishers = [];
      for (let a = 0; a < 5; a++)
        publishers[a] = {
          name: "Dr Firstname Lastname",
          college: "Dr. DY Patil Medical College",
          image: "doctah.png",
        };

      return (
        <>
          <Head>
            <title>Dashboard</title>
            <link rel="icon" href="logos/qtanea.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />

            <div className={styles.dashboard}>
              <div className={styles.title}>Dashboard</div>

              <div className={styles.search1}>
                <img src="icons/search.png" />
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.input1}
                />
              </div>

              <Options />
              <Graphs />
              <Datas />
              <Publishers data={publishers} />
            </div>
          </main>
        </>
      );
    }
  }
};

export default Dashboard;
