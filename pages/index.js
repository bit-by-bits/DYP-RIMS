import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Dashboard.module.css";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className={styles.dashboard}>
      <Navbar />
    </div>
  );
}
