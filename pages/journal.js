import Head from "next/head";
import styles from "../styles/journal.module.css";
import React from "react";
import Navbar from "../src/Common/Navbar";
import Table from "../src/Journal/Table";
import { useRouter } from "next/router";
import Options from "../src/Journal/Options";

const Journal = () => {
  const router = useRouter();
  const checkout = ((typeof window !== 'undefined') ? ((localStorage.auth_token === 'undefined')? router.push("/"):null): null);

  const publications = [10];
  for (let a = 0; a < 30; a++)
    publications[a] = {
      title:
        "Quality of life in acne vulgaris: Relationship to clinical severity and demographic data",
      authors: "A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani",
      insti: "Indian Journal of Dermatology Venereology and Leprology",
      softcopy: false,
      citations: "44",
      metric1: "12.3",
      metric2: "9.64%",
      year: "2016",
    };

  return (
    <>
      <Head>
        <title>Journals</title>
        <link rel="icon" href="logos/qtanea.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />

        <div className={styles.mgmt_wrapper}>
          <div className={styles.title}>All Publications</div>
          <Options />
          <form className={styles.form}>
            <label for="metric1">
              <img src="unchecked/unchecked.png" />
              <span>Metric 1</span>
              <input type="checkbox" id="metric1" />
            </label>

            <label for="metric2">
              <img src="unchecked/unchecked.png" />
              <span>Metric 2</span>
              <input type="checkbox" id="metric2" />
            </label>

            <label for="metric3">
              <img src="unchecked/unchecked.png" />
              <span>Metric 3</span>
              <input type="checkbox" id="metric3" />
            </label>

            <label for="metric4">
              <img src="unchecked/unchecked.png" />
              <span>Metric 4</span>
              <input type="checkbox" id="metric4" />
            </label>

            <label for="metric5">
              <img src="unchecked/unchecked.png" />
              <span>Metric 5</span>
              <input type="checkbox" id="metric5" />
            </label>
          </form>
          <Table data={publications} />
          <div className={styles.footer}>Made by Qtanea</div>
        </div>
      </main>
    </>
  );
};

export default Journal;
