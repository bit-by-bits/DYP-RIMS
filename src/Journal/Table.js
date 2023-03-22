import Link from "next/link";
import React, { useState, useEffect } from "react";

import styles from "../../styles/journal.module.css";

export default function Table(props) {
  const title = ["Title", "Year", "H-Index", "Department", "View More"],
    rows = [],
    head = [];

  let author_str = "";
  for (let a = 0; a < props.data.length; a++) {
    const b = props.data[a].authors;
    const c = props.data[a].h_index;
    for (let d = 0; d < b.length; d++) {
      author_str += b[d].searchable_name + (d != b.length - 1 ? ", " : "");
    }

    rows.push(
      <tr key={a}>
        <td>
          <span>{props.data[a].title}</span>
          <span>{author_str}</span>
          <span>{props.data[a].name}</span>
          <span className={styles.false}>
            No softcopy found for this publication. Kindly upload a softcopy.
          </span>
        </td>

        <td>{props.data[a].year}</td>
        <td>{c == null ? "N/A" : c}</td>
        <td>{props.data[a].dept}</td>
        <td className={styles.btn_td}>
          <Link href={"/file/" + props.data[a].id}>
            <div className={styles.btn_div}>Click</div>
          </Link>
        </td>
      </tr>
    );

    author_str = "";
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
      <table className={styles.profile_table}>
        <tbody>
          <tr className={styles.profile_thead}>{head}</tr>
          {rows}
        </tbody>
      </table>
    </>
  );
}
