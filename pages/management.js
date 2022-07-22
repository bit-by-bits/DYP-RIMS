import Head from "next/head";
import styles from "../styles/management.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Navbar from "./navbar";

const file = () => {
  return (
    <>
      <Head>
        <title>Management</title>
      </Head>

      <main className={styles.wrapper}>
        <Navbar />

        <div className={styles.mgmt_wrapper}>
          <div className={styles.profile_section}>
            <div className={styles.profile_grid}>
              <div className={styles.profile_personal}>
                <img src="doctah.png" className={styles.profile_img}></img>
                <div className={styles.profile_text}>
                  <div className={styles.profile_name}>
                    Dr FirstName LastName
                  </div>

                  <div className={styles.profile_post}>Associate Professor</div>

                  <div className={styles.profile_clg}>
                    Dr. D. Y. Patil Medical College
                  </div>

                  <div className={styles.profile_edit}>
                    Edit Profile Details
                  </div>
                </div>
              </div>

              <div className={styles.search}>
                <img src="search.png" />
                <input
                  type="text"
                  placeholder="Search for Department or Faculty"
                  className={styles.input}
                />
              </div>

              <div className={styles.profile_scroll}>
                <div className={styles.profile_scrolltop}>This weeks updates</div>
                <div className={styles.profile_scrollbody}>
                <div className={styles.profile_scrollitem}>
                  <div className={styles.profile_scrollevent}>
                    Dr Firstname Lastname has added a publication on the effects
                    of XYZ.
                  </div>
                  <div className={styles.profile_scrolltime}>20 June 2021</div>
                </div>
                <div className={styles.profile_scrollitem}>
                  <div className={styles.profile_scrollevent}>
                    Dr Firstname Lastname has added a publication on the effects
                    of XYZ.
                  </div>
                  <div className={styles.profile_scrolltime}>20 June 2021</div>
                </div>
                <div className={styles.profile_scrollitem}>
                  <div className={styles.profile_scrollevent}>
                    Dr Firstname Lastname has added a publication on the effects
                    of XYZ.
                  </div>
                  <div className={styles.profile_scrolltime}>20 June 2021</div>
                </div>
                <div className={styles.profile_scrollitem}>
                  <div className={styles.profile_scrollevent}>
                    Dr Firstname Lastname has added a publication on the effects
                    of XYZ.
                  </div>
                  <div className={styles.profile_scrolltime}>20 June 2021</div>
                </div>
                <div className={styles.profile_scrollitem}>
                  <div className={styles.profile_scrollevent}>
                    Dr Firstname Lastname has added a publication on the effects
                    of XYZ.
                  </div>
                  <div className={styles.profile_scrolltime}>20 June 2021</div>
                </div>
                <div className={styles.profile_scrollitem}>
                  <div className={styles.profile_scrollevent}>
                    Dr Firstname Lastname has added a publication on the effects
                    of XYZ.
                  </div>
                  <div className={styles.profile_scrolltime}>20 June 2021</div>
                </div>
                </div>
              </div>

              <div className={styles.profile_btn1}>
                <span>Add a file</span>
              </div>

              <div className={styles.profile_btn2}>
                <span>Download CV</span>
              </div>
            </div>
          </div>

          <div className={styles.options}>
            <div className={styles.heading}>Department</div>

            <div className={styles.heading}>Faculty</div>

            <div className={styles.heading}>Time Period</div>

            <div className={styles.heading}>&nbsp;</div>

            <div className={styles.option}>
              <span>Search Department</span>

              <FontAwesomeIcon icon={faAngleDown} className={styles.down_arr} />
            </div>

            <div className={styles.option}>
              <span>Dr. Aayush Gupta</span>

              <FontAwesomeIcon icon={faAngleDown} className={styles.down_arr} />
            </div>

            <div className={styles.option}>
              <span>Select Time Period</span>

              <FontAwesomeIcon icon={faAngleDown} className={styles.down_arr} />
            </div>

            <div className={`${styles.option} ${styles.download}`}>
              <img src="download.png" />
              <span>Download Data</span>
            </div>
          </div>

          <div className={styles.graphs}>
            <div className={styles.graph}></div>

            <div className={styles.graph}></div>
          </div>

          <div className={styles.datas}>
            <div className={styles.data}>
              <div className={styles.data_title}>24k</div>

              <div className={styles.data_text}>Publications</div>
            </div>

            <div className={styles.data}>
              <div className={styles.data_title}>123</div>

              <div className={styles.data_text}>Patents</div>
            </div>

            <div className={styles.data}>
              <div className={styles.data_title}>1.3k</div>

              <div className={styles.data_text}>Awards</div>
            </div>

            <div className={styles.data}>
              <div className={styles.data_title}>2.4k</div>

              <div className={styles.data_text}>Conferences</div>
            </div>

            <div className={styles.data}>
              <div className={styles.data_title}>648</div>

              <div className={styles.data_text}>Books</div>
            </div>
          </div>

          <div className={styles.pub_grid}>
            <div className={styles.pub_col}>
              <div className={styles.col_title}>
                Faculty with high impact publications
              </div>

              <div className={styles.col_content}>
                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>
              </div>
            </div>

            <div className={styles.pub_col}>
              <div className={styles.col_title}>
                Faculty with no publications this month
              </div>

              <div className={styles.col_content}>
                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>

                <div className={styles.publisher}>
                  <div>
                    <img src="doctah.png" className={styles.pub_img} />
                    <div className={styles.pub_info}>
                      <div className={styles.pub_name}>
                        Mr. FirstName LastName
                      </div>

                      <div className={styles.pub_clg}>
                        Dr. DY Patil Medical College
                      </div>
                    </div>
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>Made by Qtanea</div>
        </div>
      </main>
    </>
  );
};

export default file;
