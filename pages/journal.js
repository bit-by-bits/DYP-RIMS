import Head from "next/head";
import styles from "../styles/journal.module.css";
import axios from "axios";
import React from "react";
import Navbar from "../src/Common/Navbar";
import Table from "../src/Journal/Table";
import Options from "../src/Journal/Options";
import { useRouter } from "next/router";

const Journal = () => {
  const router = useRouter();
  const publications = [],
    temp = [];
  const [pubs, setPubs] = React.useState(temp);

  React.useEffect(() => {
    callback();
  }, []);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token");

      function callback() {
        axios({
          method: "GET",
          url: `https://rimsapi.journalchecker.com/api/v1/publication`,
          headers: { Authorization: `Bearer ${item}` },
        }).then(function (response) {
          temp = response.data.publications;
          setPubs(temp);
        });
      }

      for (let a = 0; a < pubs.length; a++)
        publications[a] = {
          id: pubs[a].id,
          pubmed_id: pubs[a].pubmed_id,
          doi_id: pubs[a].doi_id,
          type: pubs[a].publication_type,
          title: pubs[a].publication_title,
          name: pubs[a].journal_name,
          year: pubs[a].year,
          i_factor: pubs[a].impact_factor,
          h_index: pubs[a].h_index,
          region: pubs[a].region,
          citations: pubs[a].citations,
          dept: pubs[a].department.name,
          authors: pubs[a].author_name,
          sjr: pubs[a].sjr,
          doaj: pubs[a].in_doaj,
          embase: pubs[a].in_embase,
          medline: pubs[a].in_medline,
          pmc: pubs[a].in_pmc,
          scie: pubs[a].in_scie,
          scopus: pubs[a].in_scopus,
          softcopy: false,
        };

      return (
        <>
          <Head>
            <title>Journals</title>
            <link rel="icon" href="logos/dpu-2.png" />
          </Head>

          <div onLoad={callback} className={styles.wrapper}>
            <Navbar />

            <div className={styles.mgmt_wrapper}>
              <div className={styles.title}>All Publications</div>
              <Options />
              <Table data={publications} />

              {/* <div className={styles.footer}>Made by Qtanea</div> */}
              <a
                href="https://www.qtanea.com/"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  alt="Q"
                  className={styles.foot}
                  src="logos/qtanea-colour.png"
                />
              </a>
            </div>
          </div>
        </>
      );
    }
  }
};

export default Journal;
