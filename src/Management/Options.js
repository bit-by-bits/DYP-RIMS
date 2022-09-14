import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/management.module.css";

export default function Options() {
  return (
    <>
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
    </>
  );
}