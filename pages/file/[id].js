import Head from "next/head";
import styles from "../../styles/file.module.css";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../src/Common/Navbar";

const ID = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("auth_token")) router.push("/");
    else {
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
                  Quality of life in acne vulgaris: Relationship to clinical
                  severity and demographic data
                </div>

                <div className={styles.file_grid}>
                  <div className={styles.file_head}>Authors</div>

                  <div className={styles.file_body}>
                    Aayush Gupta, Yugal Kishore Sharma, Kedar Nath Dash, Nitin
                    Dinkar Chaudhari, Sumit Jethani
                  </div>

                  <div className={styles.file_head}>Publication date</div>

                  <div className={styles.file_body}>2016/1</div>

                  <div className={styles.file_head}>Journal</div>

                  <div className={styles.file_body}>
                    Indian Journal of Dermatology Venereology and Leprology
                  </div>

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
