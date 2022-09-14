import React from "react";
import styles from "../../styles/journal.module.css";

export default function Table(props) {
  const title = ["Title", "Citations", "Metric 1", "Metric 2", "Year"],
    rows = [],
    head = [];

  for (let a = 0; a < 10; a++) {
    rows.push(
      <tr key={a}>
        <td>
          <span>{props.data[a].title}</span>
          <span>{props.data[a].authors}</span>
          <span>{props.data[a].insti}</span>
          <span className={styles.false}>
            No softcopy found for this publication. Kindly upload a softcopy.
          </span>
        </td>

        <td>{props.data[a].citations}</td>
        <td>{props.data[a].metric1}</td>
        <td>{props.data[a].metric2}</td>
        <td>{props.data[a].year}</td>
      </tr>
    );
  }

  for (let a = 0; a < 5; a++) {
    head.push(
      <th key={a}>
        <span>{title[a]}</span> <img src="sort.png" />
      </th>
    );
  }

  return (
    <>
      <table className={styles.profile_table}>
        <tbody>
          <tr className={styles.profile_thead}>{head}</tr>
          {rows}
        </tbody>
      </table>
    </>
  );
}
