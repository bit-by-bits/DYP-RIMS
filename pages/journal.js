import Head from "next/head";
import styles from "../styles/journal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Navbar from "./navbar";

const file = () => {
  return (
    <>
      <Head>
        <title>Journals</title>
        <link rel="icon" href="icon.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />

        <div className={styles.mgmt_wrapper}>
          <div className={styles.title}>All Publications</div>

          <div className={styles.options}>
            <div className={styles.heading}>Department</div>

            <div className={styles.heading}>Type of Publication</div>

            <div className={styles.heading}>Year</div>

            <div className={styles.heading}>&nbsp;</div>

            <div className={styles.option}>
              <span>Select Department</span>

              <FontAwesomeIcon icon={faAngleDown} className={styles.down_arr} />
            </div>

            <div className={styles.option}>
              <span>All Types</span>

              <FontAwesomeIcon icon={faAngleDown} className={styles.down_arr} />
            </div>

            <div className={styles.option}>
              <span>All Years</span>

              <FontAwesomeIcon icon={faAngleDown} className={styles.down_arr} />
            </div>

            <div className={`${styles.option} ${styles.download}`}>
              <img src="download.png" />
              <span>Download Data</span>
            </div>
          </div>

          <form className={styles.form}>
            <label for="metric1">
              <img src="unchecked.png" />
              <span>Metric 1</span>
              <input type="checkbox" id="metric1" />
            </label>

            <label for="metric2">
              <img src="unchecked.png" />
              <span>Metric 2</span>
              <input type="checkbox" id="metric2" />
            </label>

            <label for="metric3">
              <img src="unchecked.png" />
              <span>Metric 3</span>
              <input type="checkbox" id="metric3" />
            </label>

            <label for="metric4">
              <img src="unchecked.png" />
              <span>Metric 4</span>
              <input type="checkbox" id="metric4" />
            </label>

            <label for="metric5">
              <img src="unchecked.png" />
              <span>Metric 5</span>
              <input type="checkbox" id="metric5" />
            </label>
          </form>

          <table className={styles.profile_table}>
            <tbody>
              <tr className={styles.profile_thead}>
                <th>
                  <span> Title </span> <img src="sort.png" />
                </th>
                <th>
                  <span> Citations </span> <img src="sort.png" />
                </th>
                <th>
                  <span> Metric 1 </span> <img src="sort.png" />
                </th>
                <th>
                  <span> Metric 2 </span> <img src="sort.png" />
                </th>
                <th>
                  <span> Year </span> <img src="sort.png" />
                </th>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>

              <tr>
                <td>
                  <span>
                    Quality of life in acne vulgaris: Relationship to clinical
                    severity and demographic data
                  </span>
                  <span>
                    A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani
                  </span>
                  <span>
                    Indian Journal of Dermatology Venereology and Leprology
                  </span>
                  <span className={styles.false}>
                    No softcopy found for this publication. Kindly upload a
                    softcopy.
                  </span>
                </td>

                <td>44</td>
                <td>12.3</td>
                <td>9.64%</td>
                <td>2016</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.footer}>Made by Qtanea</div>
        </div>
      </main>
    </>
  );
};

export default file;
