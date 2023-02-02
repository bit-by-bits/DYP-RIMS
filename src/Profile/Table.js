import {
  faArrowDownAZ,
  faArrowDownZA,
  faCheckToSlot,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import styles from "../../styles/profile.module.css";

export default function Table(props) {
  const [pubs, setPubs] = React.useState([]),
    [tempTableData, setTempTableData] = React.useState([]),
    [tableData, setTableData] = React.useState([]);

  const [rows, setRows] = React.useState([]),
    [head, setHead] = React.useState([]);

  const [title, setTitle] = React.useState([
      ["Title", true],
      ["Impact Factor", true],
      ["SJR Quartile", true],
      ["Indexed In", false],
      ["Citations", true],
      ["Published", true],
      ["View More", true],
    ]),
    [filters, setFilters] = React.useState([
      ["DOAJ", false],
      ["Embase", false],
      ["Medline", false],
      ["PMC", false],
      ["SCIE", false],
      ["Scopus", false],
    ]);

  React.useEffect(() => {
    setPubs(props.data);
    fixTableData();

    fixRows();
    fixHead();

    pubs.length != 0 && setTimeout(() => props.setLoader(false), 1600);
  }, [props.data]);

  // FILL THE DATA STATE FROM PUBS STATE
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
      temp_ROWS[a][2] = pubs[a].sjr;

      temp_ROWS[a][11] = pubs[a].doaj;
      temp_ROWS[a][12] = pubs[a].embase;
      temp_ROWS[a][13] = pubs[a].medline;
      temp_ROWS[a][14] = pubs[a].pmc;
      temp_ROWS[a][15] = pubs[a].scie;
      temp_ROWS[a][16] = pubs[a].scopus;

      temp_ROWS[a][17] = [];
      for (let i = 11; i <= 16; i++)
        if (temp_ROWS[a][i])
          switch (i) {
            case 11:
              temp_ROWS[a][17].push(<div>DOAJ</div>);
              break;
            case 12:
              temp_ROWS[a][17].push(<div>Embase</div>);
              break;
            case 13:
              temp_ROWS[a][17].push(<div>Medline</div>);
              break;
            case 14:
              temp_ROWS[a][17].push(<div>PMC</div>);
              break;
            case 15:
              temp_ROWS[a][17].push(<div>SCIE</div>);
              break;
            case 16:
              temp_ROWS[a][17].push(<div>Scopus</div>);
              break;
          }

      temp_ROWS[a][3] = pubs[a].citations;
      temp_ROWS[a][4] = pubs[a].year;
      temp_ROWS[a][5] = pubs[a].id;

      for (let i = 0; i < 18; i++) temp_ROWS[a][i] = temp_ROWS[a][i] ?? "NA";
    }

    setTableData(temp_ROWS);
    setTempTableData(temp_ROWS);
  }

  // FILL BODY DATA
  function fixRows() {
    const temp_ROWS = [];
    for (let a = 0; a < tableData.length; a++) {
      temp_ROWS.push(
        <tr key={a}>
          <td>
            <span>{tableData[a][0]}</span>
            <span>{tableData[a][6]}</span>
            <span>{tableData[a][7]}</span>
            <span>
              Volume: {tableData[a][8] ? tableData[a][8] : "?"}
              &nbsp;&middot;&nbsp; Issue:{" "}
              {tableData[a][9] ? tableData[a][9] : "?"}
              &nbsp;&middot;&nbsp; Page No: NA
            </span>
            <span>
              No softcopy found for this publication. Kindly upload a softcopy.
            </span>
          </td>

          <td>{tableData[a][1]}</td>
          <td>{tableData[a][2]}</td>

          <td>
            <span>{tableData[a][17]}</span>
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
    }

    !tableData.length &&
      temp_ROWS.push(
        <tr
          style={{
            transform: "translateY(1rem)",
            // color: "#9a2827",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          No Publication Here
        </tr>
      );
    setRows(temp_ROWS);
  }

  React.useEffect(() => {
    fixRows();
  }, [tableData]);

  // FILL HEAD DATA
  function fixHead() {
    const temp_HEAD = [];
    for (let a = 0; a < title.length; a++) {
      temp_HEAD.push(
        <th key={a} className={a == 3 ? styles.check : undefined}>
          <span>{title[a][0]}</span>
          {a == 3 ? (
            <FontAwesomeIcon
              icon={!title[a][1] ? faSquareCheck : faCheckToSlot}
              style={{ cursor: "pointer", marginLeft: "0.3rem" }}
            />
          ) : (
            a != title.length - 1 && (
              <FontAwesomeIcon
                onClick={() => {
                  const TEMP_ARR = [...title];
                  TEMP_ARR[a][1] = !TEMP_ARR[a][1];
                  setTitle(TEMP_ARR);
                  sortTable(a, !title[a][1]);
                }}
                icon={title[a][1] ? faArrowDownAZ : faArrowDownZA}
                style={{ cursor: "pointer", marginLeft: "0.3rem" }}
              />
            )
          )}
          {a == 3 && (
            <form className={styles.checks}>
              {filters.map((e, i) => (
                <label htmlFor={e[0]}>
                  <div>{e[0]}</div>
                  <input
                    type="radio"
                    id={e[0]}
                    name={e[0]}
                    checked={e[1]}
                    onChange={() => filterTable(i)}
                  />
                </label>
              ))}
            </form>
          )}
        </th>
      );
    }

    setHead(temp_HEAD);
  }

  React.useEffect(() => {
    fixHead();
    console.log(title[3]);
  }, [title]);

  // LOGIC TO SORT THE TABLE
  function sortTable(index, ascSort) {
    index > 3 && index--;

    const sortedArr = ascSort
      ? [...tableData].sort(function (a, b) {
          if (a[index] == "NA") return 1;
          if (b[index] == "NA") return -1;

          if (a[index] < b[index]) return -1;
          if (a[index] > b[index]) return 1;
          return 0;
        })
      : [...tableData].sort(function (a, b) {
          if (a[index] == "NA") return 1;
          if (b[index] == "NA") return -1;

          if (b[index] < a[index]) return -1;
          if (b[index] > a[index]) return 1;
          return 0;
        });

    Array.from(document.getElementsByTagName("tr")).forEach(row => {
      if (row.classList.contains(`${styles.profile_thead}`)) return;
      row.classList.add(`${styles.disappear}`);

      setTimeout(() => {
        setTableData(sortedArr);

        row.classList.remove(`${styles.disappear}`);
        row.classList.add(`${styles.appear}`);
        setTimeout(() => row.classList.remove(`${styles.appear}`), 399);
      }, 399);
    });
  }

  // LOGIC TO FILTER THE TABLE
  function filterTable(index) {
    const TEMP_FILTERS = filters;
    TEMP_FILTERS[index][1] = !TEMP_FILTERS[index][1];
    setFilters(filters.map((e, i) => [e[0], i == index ? true : false]));

    const TEMP_ARR = [...title];
    // filters.map(e => e[1]).every(e => e);
    TEMP_ARR[3][1] = true;
    setTitle(TEMP_ARR);

    if (TEMP_FILTERS[index][1]) {
      const TEMP_DATA = tempTableData.filter(e => e[11 + index]);
      setTableData(TEMP_DATA);
    }
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
