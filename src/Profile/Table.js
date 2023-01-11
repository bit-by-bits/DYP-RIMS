import {
  faArrowDownAZ,
  faArrowDownZA,
  faCircleQuestion,
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
      ["Indices", true],
      ["Indexed In", true],
      ["Citations", true],
      ["Year", true],
      ["View More", true],
    ]);

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
      temp_ROWS[a] = new Array(18);
      const au = pubs[a].authors;

      temp_ROWS[a][6] = "";
      for (let c = 0; c < au.length; c++)
        temp_ROWS[a][6] +=
          au[c].searchable_name + (c != au.length - 1 ? ", " : "");

      temp_ROWS[a][0] = pubs[a].title;
      temp_ROWS[a][7] = pubs[a].name;
      temp_ROWS[a][8] = pubs[a].volume;
      temp_ROWS[a][9] = pubs[a].issue;
      temp_ROWS[a][10] = "page number idk";

      temp_ROWS[a][1] = pubs[a].i_factor.toFixed(2);
      temp_ROWS[a][11] = pubs[a].sjr;

      temp_ROWS[a][2] = 0;
      temp_ROWS[a][12] = pubs[a].doaj;
      temp_ROWS[a][13] = pubs[a].embase;
      temp_ROWS[a][14] = pubs[a].medline;
      temp_ROWS[a][15] = pubs[a].pmc;
      temp_ROWS[a][16] = pubs[a].scie;
      temp_ROWS[a][17] = pubs[a].scopus;
      temp_ROWS[a][18] = "";

      temp_ROWS[a][3] = pubs[a].citations;
      temp_ROWS[a][4] = pubs[a].year;
      temp_ROWS[a][5] = pubs[a].id;

      for (let i = 12; i <= 17; i++) {
        if (temp_ROWS[a][i]) {
          temp_ROWS[a][2]++;

          switch (i) {
            case 12:
              temp_ROWS[a][18] += "DOAJ ";
              break;

            case 13:
              temp_ROWS[a][18] += "Embase ";
              break;

            case 14:
              temp_ROWS[a][18] += "Medline ";
              break;

            case 15:
              temp_ROWS[a][18] += "PMC ";
              break;

            case 16:
              temp_ROWS[a][18] += "SCIE ";
              break;

            case 17:
              temp_ROWS[a][18] += "Scopus";
              break;
          }
        }
      }
    }

    console.log(temp_ROWS);
    setTableData(temp_ROWS);
  }

  function fixRows() {
    const temp_ROWS = [];
    for (let a = 0; a < tableData.length; a++) {
      temp_ROWS.push(
        <tr key={a}>
          <td>
            <span>{tableData[a][0]}</span>
            <span>
              <span className={styles.extra_span}>who: </span>
              {tableData[a][6]}
            </span>
            <span>
              <span className={styles.extra_span}>what: </span>
              {tableData[a][7]}
            </span>
            <span>
              Volume: {tableData[a][8] ? tableData[a][8] : "?"}
              &nbsp;&middot;&nbsp; Issue:{" "}
              {tableData[a][9] ? tableData[a][9] : "?"}
              &nbsp;&middot;&nbsp; Issue: ?
            </span>
            {/* <span>
              No softcopy found for this publication. Kindly upload a softcopy.
            </span> */}
          </td>

          <td>
            <span>{tableData[a][1]}</span>
            <span>{tableData[a][11]}</span>
          </td>

          <td>
            <span>{tableData[a][2]}</span>
            <span style={{ position: "relative" }}>
              <FontAwesomeIcon
                className={styles.more_info}
                icon={faCircleQuestion}
              />
              <div className={styles.card}>{tableData[a][18]}</div>
            </span>
          </td>

          <td>{tableData[a][3]}</td>
          <td>{tableData[a][4]}</td>
          <td className={styles.btn_td}>
            <Link href={"/file/" + tableData[a][5]}>
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
    for (let a = 0; a < title.length; a++) {
      temp_HEAD.push(
        <th key={a}>
          <span>{title[a][0]}</span>
          {a != title.length - 1 && (
            <FontAwesomeIcon
              onClick={() => {
                const temp_ARR = [...title];
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

    Array.from(document.getElementsByTagName("tr")).forEach((row) => {
      if (row.classList.contains(`${styles.profile_thead}`)) return;

      row.classList.add(`${styles.disappear}`);

      setTimeout(() => {
        row.style.opacity = 0;
        setTableData(sortedArr);

        row.classList.remove(`${styles.disappear}`);
        row.classList.add(`${styles.appear}`);

        setTimeout(() => {
          row.style.opacity = 1;
          row.classList.remove(`${styles.appear}`);
        }, 399);
      }, 399);
    });
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
