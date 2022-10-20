import React from "react";
import styles from "../../styles/profile.module.css";

export default function Table(props) {
  const title = ["Title", "Year", "H-Index", "Department", "View More"],
    rows = [],
    head = [];

  for (let a = 0; a < props.data.length; a++) {
    rows.push(
      <tr key={a}>
        <td>
          <span>{props.data[a].title}</span>
          <span>{props.data[a].authors}</span>
          <span>{props.data[a].journ}</span>
          <span className={styles.false}>
            No softcopy found for this publication. Kindly upload a softcopy.
          </span>
        </td>

        <td>{props.data[a].year}</td>
        <td>{props.data[a].h_index}</td>
        <td>{props.data[a].dept}</td>
        <td className={styles.btn_td}>
          <div className={styles.btn_div}>Click</div>
        </td>
      </tr>
    );
  }

  for (let a = 0; a < 5; a++) {
    head.push(
      <th key={a}>
        <span>{title[a]}</span>
        <img src="icons/sort.png" />
      </th>
    );
  }

  return (
    <>
      <div id="Publications" className={styles.profile_box}>
        <div className={styles.profile_head}>Publications</div>

        <table className={styles.profile_table}>
          <tbody>
            <tr className={styles.profile_thead}>{head}</tr>
            {rows}
          </tbody>
        </table>
      </div>
    </>
  );
}
