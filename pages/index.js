import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.title}>Dashboard</div>
        <div className={styles.search1}>
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" className={styles.input1} />
        </div>
        <div className={styles.filters}>
          <div className={styles.filter}>
            <label htmlFor="department">Department</label>
            <div className={styles.select_btn}>
              <span>Select Department</span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <div className={styles.menu}>
              <div className={styles.search2}>
                <FontAwesomeIcon icon={faSearch} />
                <input
                  spellCheck="false"
                  placeholder="Search"
                  autoComplete="off"
                  type="text"
                  className={styles.input2}
                />
              </div>
              <div className={styles.menu}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
