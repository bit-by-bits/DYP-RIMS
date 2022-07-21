import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.nav_left}>
        <Link href="/">
          <div>Home</div>
        </Link>
      </div>
      <div className={styles.nav_right}>
        <Link href="/Upload">
          <div>Add a file</div>
        </Link>
        <Link href="/Login">
          <div className={styles.nav_btn}>Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
