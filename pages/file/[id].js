import Head from "next/head";
import styles from "../../styles/file.module.css";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../src/Common/Navbar";
import axios from "axios";

const ID = () => {
  const router = useRouter();
  const { id } = router.query;
  const temp = [];
  const [pubs, setPubs] = React.useState(temp),
    [authors, setAuthors] = React.useState("");

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
      const item = localStorage.getItem("auth_token");

      let counter = setInterval(() => {
        if (router.isReady) {
          axios({
            method: "GET",
            url: "https://rimsapi.journalchecker.com/api/v1/publication/" + id,
            headers: { Authorization: `Bearer ${item}` },
          }).then(function (response) {
            temp = response.data.publication;
            setPubs(temp);

            let extra = "";
            for (let i = 0; i < temp.author_name.length; i++) {
              setAuthors(
                (extra +=
                  temp.author_name[i].searchable_name +
                  (i != temp.author_name.length - 1 ? ", " : ""))
              );
            }
          });
        }
        if (!router.isReady) clearInterval(counter);
      }, 1000);

      // publication = {
      //   id: pubs.id,
      //   pubmed_id: pubs.pubmed_id,
      //   doi_id: pubs.doi_id,
      //   type: pubs.publication_type,
      //   title: pubs.publication_title,
      //   name: pubs.journal_name,
      //   year: pubs.year,
      //   i_factor: pubs.impact_factor,
      //   h_index: pubs.h_index,
      //   region: pubs.region,
      //   citations: pubs.citations,
      //   dept: pubs.department.name,
      //   authors: "",
      //   softcopy: false,
      // };

      return (
        <>
          <Head>
            <title>File</title>
            <link rel="icon" href="logos/qtanea.png" />
          </Head>

          <main className={styles.wrapper}>
            <Navbar />

            <div className={styles.file_wrapper}>
              <div className={styles.file_text}>
                <div className={styles.file_title}>
                  {pubs.publication_title}
                </div>

                <div className={styles.file_grid}>
                  <div className={styles.file_head}>Authors</div>

                  <div className={styles.file_body}>{authors}</div>

                  <div className={styles.file_head}>Publication date</div>

                  <div className={styles.file_body}>{pubs.year}</div>

                  <div className={styles.file_head}>Journal</div>

                  <div className={styles.file_body}>{pubs.journal_name}</div>

                  <div className={styles.file_head}>Publisher</div>

                  <div className={styles.file_body}>Medknow</div>

                  <div className={styles.file_head}>Description</div>

                  <div className={styles.file_body}>
                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Background:</div>

                      <div className={styles.file_bodyweak}>
                        Acne vulgaris is known to impair many aspects of quality
                        of life. However, the correlation of this impairment
                        with clinical severity remains equivocal despite various
                        school, community and hospital-based studies.
                      </div>
                    </div>

                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Aim:</div>

                      <div className={styles.file_bodyweak}>
                        A hospital-based study was undertaken to measure the
                        impairment of quality of life of patients of acne
                        vulgaris and correlate it with the severity of lesions.
                      </div>
                    </div>

                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Methods:</div>

                      <div className={styles.file_bodyweak}>
                        This was a cross-sectional, questionnaire-based study in
                        a cohort of 100 patients of acne vulgaris attending the
                        outpatient department of our referral hospital. A
                        physician measured the severity of lesions using the
                        global acne grading system, and patients assessed
                        quality of life by completing a questionnaire (Cardiff
                        acne disability index). A correlation of these two was
                        done; some additional correlations were brought out
                        through demographic data collected from the patients.
                      </div>
                    </div>

                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Results:</div>

                      <div className={styles.file_bodyweak}>
                        There was no correlation between the severity of acne
                        vulgaris and an impaired quality of life. Patients who
                        consumed alcohol and/or smoked cigarettes were found to
                        have an impaired quality of life. While the severity of
                        acne progressively lessened in older patients, the
                        impact on quality of life increased.
                      </div>
                    </div>

                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Limitations:</div>

                      <div className={styles.file_bodyweak}>
                        The sample size was small and there was a lack of
                        guaranteed reliability on the self-reported quality of
                        life.
                      </div>
                    </div>

                    <div className={styles.file_bodyitem}>
                      <div className={styles.file_bodybold}>Conclusion:</div>

                      <div className={styles.file_bodyweak}>
                        The severity of acne vulgaris does not correlate with
                        impairment in quality of life.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.file_btns}>
                <div className={styles.file_btn1}>Download</div>

                <div className={styles.file_btn2}>Edit</div>
              </div>

              <div className={styles.footer}>Made by Qtanea</div>
            </div>
          </main>
        </>
      );
    }
  }
};

export default ID;
