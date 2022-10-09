import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.nav_left}>
        <Link href="/dashboard">
          <div>Home</div>
        </Link>
      </div>

      <div className={styles.nav_right}>
        <Link href="/upload">
          <div>Add a file</div>
        </Link>
        <Link href="/">
          <div className={styles.nav_btn}>Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
