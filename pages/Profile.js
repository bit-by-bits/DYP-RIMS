import Head from "next/head";
import styles from "../styles/Profile.module.css";
import React from "react";
import Navbar from "../src/Common/Navbar";
import Boxes from "../src/Profile/Boxes";
import Section from "../src/Profile/Section";
import { useRouter } from "next/router";
import Table from "../src/Profile/Table";

const Profile = () => {
  const router = useRouter();
  const checkout = ((typeof window !== 'undefined') ? ((localStorage.auth_token === 'undefined')? router.push("/"):null): null);

  const awards = [4],
    publications = [10];
  for (let a = 0; a < 4; a++)
    awards[a] = { what: "Best paper award IJDVL", when: "Jan 2015" };
  for (let a = 0; a < 10; a++)
    publications[a] = {
      title:
        "Quality of life in acne vulgaris: Relationship to clinical severity and demographic data",
      authors: "A Gupta, YK Sharma, KN Dash, ND Chaudhari, S Jethani",
      insti: "Indian Journal of Dermatology Venereology and Leprology",
      softcopy: false,
      citations: "44",
      metric1: "12.3",
      metric2: "9.64%",
      year: "2016",
    };

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="logos/qtanea.png" />
      </Head>

      <main className={styles.wrapper}>
        <Navbar />
        <div className={styles.profile_wrapper}>
          <Section />
          <Boxes title="Awards & Achievements" data={awards} />
          <Boxes title="Patents" data={awards} />
          <Table title="Publications" data={publications} />
          <Boxes title="Conferences" data={awards} />
          <div className={styles.footer}>Made by Qtanea</div>
        </div>
      </main>
    </>
  );
};

export default Profile;
