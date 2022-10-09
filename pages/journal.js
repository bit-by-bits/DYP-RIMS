import Head from "next/head";
import styles from "../styles/journal.module.css";
import axios from "axios";
import React from "react";
import Navbar from "../src/Common/Navbar";
import Table from "../src/Journal/Table";
import { useRouter } from "next/router";
import Options from "../src/Journal/Options";

const Journal = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.auth_token) router.push("/");
    else {
      const publications = [],
        temp = [];
      const item = localStorage.getItem("auth_token");
      const [pubs, setPubs] = React.useState(temp);

      React.useEffect(() => {
        axios({
          method: "GET",
          url: `http://127.0.0.1:8000/api/v1/publication`,
          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          temp = response.data.publications;
          setPubs(temp);
        });
      }, []);

      for (let a = 0; a < pubs.length; a++) {
        publications[a] = {
          id: pubs[a].id,
          title: pubs[a].publication_title,
          authors: pubs[a].author_name[0].searchable_name,
          journ: pubs[a].journal_name,
          softcopy: false,
          citations: "44",
          metric1: "12.3",
          metric2: "9.64%",
          year: pubs[a].year,
        };
      }

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
    }
  }
};

export default Journal;
