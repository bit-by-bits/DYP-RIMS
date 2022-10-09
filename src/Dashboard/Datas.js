import React from "react";
import styles from "../../styles/dashboard.module.css";

export default function Datas() {
  return (
    <>
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
    </>
  );
}
