import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="icon.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />

        <div className={styles.dashboard}>
          <div className={styles.title}>Dashboard</div>

          <div className={styles.search1}>
            <img src="search.png" />
            <input type="text" placeholder="Search" className={styles.input1} />
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
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
                    </div>{" "}
                  </div>

                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.right_arr}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
