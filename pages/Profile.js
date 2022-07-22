import Head from "next/head";
import styles from "../styles/profile.module.css";
import Link from "next/link";
import React from "react";
import Navbar from "./navbar";

const profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="icon.png" />
      </Head>
      <main className={styles.wrapper}>
        <Navbar />
        <div className={styles.profile_wrapper}>
          <div className={styles.profile_section}>
            <div className={styles.profile_grid}>
              <div className={styles.profile_personal}>
                <img src="doctah.png" className={styles.profile_img}></img>
                <div className={styles.profile_text}>
                  <div className={styles.profile_name}>Dr Aayush Gupta</div>
                  <div className={styles.profile_degree}>MBBS, M.D.</div>
                  <div className={styles.profile_post}>Associate Professor</div>
                  <div className={styles.profile_dept}>
                    Department of Dermatology
                  </div>
                  <div className={styles.profile_clg}>
                    Dr. D. Y. Patil Medical College
                  </div>
                  <div className={styles.profile_edit}>
                    Edit Profile Details
                  </div>
                </div>
              </div>
              <div className={styles.profile_btn}>Add a file</div>
              <div className={styles.profile_btn}>Download CV</div>
            </div>

            <div className={styles.profile_feats}>
              <Link href="#publications">
                <div className={styles.profile_feat}>
                  <span>49 Publications</span>
                </div>
              </Link>
              <Link href="#patents">
                <div className={styles.profile_feat}>
                  <span>3 Patents</span>
                </div>
              </Link>
              <Link href="#conferences">
                <div className={styles.profile_feat}>
                  <span>17 Conferences</span>
                </div>
              </Link>
              <Link href="#awards">
                <div className={styles.profile_feat}>
                  <span>12 Awards</span>
                </div>
              </Link>
              <Link href="#awards">
                <div className={styles.profile_feat}>
                  <span>12 Awards</span>
                </div>
              </Link>
              <Link href="#awards">
                <div className={styles.profile_feat}>
                  <span>12 Awards</span>
                </div>
              </Link>
            </div>
          </div>
          <div id="awards" className={styles.profile_box}>
            <div className={styles.profile_head}>Awards & Achievements</div>
            <div className={styles.profile_bodygrid}>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
            </div>
          </div>
          <div id="patents" className={styles.profile_box}>
            <div className={styles.profile_head}>Patents</div>
            <div className={styles.profile_bodygrid}>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
            </div>
          </div>
          <div id="publications" className={styles.profile_box}>
            <div className={styles.profile_head}>Publications</div>
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
          </div>
          <div id="conferences" className={styles.profile_box}>
            <div className={styles.profile_head}>Conferences</div>
            <div className={styles.profile_bodygrid}>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
              <div className={styles.profile_body}>
                <div className={styles.profile_topic}>
                  Best paper award IJDVL
                </div>
                <div className={styles.profile_time}>Jan 2015</div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>Made by Qtanea</div>
        </div>
      </main>
    </>
  );
};

export default profile;
