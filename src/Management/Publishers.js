import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/management.module.css";

export default function Publishers(props) {
  const items = [];
  for (let a = 0; a < 5; a++) {
    items.push(
      <div key={a} className={styles.publisher}>
        <div>
          <img src={props.data[a].image} className={styles.pub_img} />
          <div className={styles.pub_info}>
            <div className={styles.pub_name}>{props.data[a].name}</div>
            <div className={styles.pub_clg}>{props.data[a].college}</div>
          </div>
        </div>

        <FontAwesomeIcon icon={faAngleRight} className={styles.right_arr} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.pub_grid}>
        <div className={styles.pub_col}>
          <div className={styles.col_title}>
            Faculty with high impact publications
          </div>
          <div className={styles.col_content}>{items}</div>
        </div>

        <div className={styles.pub_col}>
          <div className={styles.col_title}>
            Faculty with no publications this month
          </div>
          <div className={styles.col_content}>{items}</div>
        </div>
      </div>
    </>
  );
}
