import {
  faArrowDownAZ,
  faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import styles from "../../styles/profile.module.css";

export default function Table(props) {
  const [pubs, setPubs] = React.useState([]),
    [tableData, setTableData] = React.useState([]),
    [rows, setRows] = React.useState([]),
    [head, setHead] = React.useState([]),
    [title, setTitle] = React.useState([
      ["Title", true],
      ["Year", true],
      ["H-Index", true],
      ["Department", true],
      ["View More", true],
    ]);

  let temp_STR = "",
    temp_ARR = [];

  React.useEffect(() => {
    setPubs(props.data);
    fixTableData();

    fixRows();
    fixHead();

    pubs.length != 0 && setTimeout(() => props.setLoader(false), 1600);
  }, [props.data]);

  function fixTableData() {
    const temp_ROWS = new Array(pubs.length);
    for (let a = 0; a < pubs.length; a++) {
      const b = pubs[a].authors;
      for (let c = 0; c < b.length; c++)
        temp_STR += b[c].searchable_name + (c != b.length - 1 ? ", " : "");

      temp_ROWS[a] = new Array(7);
      temp_ROWS[a][0] = pubs[a].title;
      temp_ROWS[a][4] = temp_STR;
      temp_ROWS[a][5] = pubs[a].name;
      temp_ROWS[a][1] = pubs[a].year;
      temp_ROWS[a][2] = pubs[a].h_index;
      temp_ROWS[a][3] = pubs[a].dept;
      temp_ROWS[a][6] = pubs[a].id;

      temp_STR = "";
    }

    setTableData(temp_ROWS);
    console.log("tableData : ", tableData);
  }

  function fixRows() {
    const temp_ROWS = [];
    for (let a = 0; a < tableData.length; a++) {
      temp_ROWS.push(
        <tr key={a}>
          <td>
            <span>{tableData[a][0]}</span>
            <span>{tableData[a][4]}</span>
            <span>{tableData[a][5]}</span>
            <span>
              No softcopy found for this publication. Kindly upload a softcopy.
            </span>
          </td>

          <td>{tableData[a][1]}</td>
          <td>{tableData[a][2]}</td>
          <td>{tableData[a][3]}</td>
          <td className={styles.btn_td}>
            <Link href={"/file/" + tableData[a][6]}>
              <div className={styles.btn_div}>Click</div>
            </Link>
          </td>
        </tr>
      );

      setRows(temp_ROWS);
    }
  }

  React.useEffect(() => {
    fixRows();
  }, [tableData]);

  function fixHead() {
    const temp_HEAD = [];
    for (let a = 0; a < 5; a++) {
      temp_HEAD.push(
        <th key={a}>
          <span>{title[a][0]}</span>
          {a != 4 && (
            <FontAwesomeIcon
              onClick={() => {
                temp_ARR = [...title];
                temp_ARR[a][1] = !temp_ARR[a][1];
                setTitle(temp_ARR);
                sortTable(a, !title[a][1]);
              }}
              icon={title[a][1] ? faArrowDownAZ : faArrowDownZA}
              style={{ cursor: "pointer", marginLeft: "0.4rem" }}
              // title={title[a][1] ? "asc sort" : "desc sort"}
            />
          )}
        </th>
      );

      setHead(temp_HEAD);
    }
  }

  React.useEffect(() => {
    fixHead();
  }, [title]);

  function sortTable(index, ascSort) {
    const sortedArr = ascSort
      ? [...tableData].sort(function (a, b) {
          if (a[index] < b[index]) return -1;
          if (a[index] > b[index]) return 1;
          return 0;
        })
      : [...tableData].sort(function (a, b) {
          if (b[index] < a[index]) return -1;
          if (b[index] > a[index]) return 1;
          return 0;
        });

    setTableData(sortedArr);
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
