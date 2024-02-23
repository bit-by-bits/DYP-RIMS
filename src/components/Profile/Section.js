import { Button, Skeleton, Table } from "antd";
import styles from "../../styles/profile.module.css";
import React, { useEffect } from "react";
import { useAccess } from "../context/accessContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Section = ({
  data = { title: [], body: [] },
  head = { header: "", title: "" },
  sections = { sec: "all", setSec: () => {}, setVis: () => {} },
}) => {
  // HOOKS

  const { access } = useAccess();

  // EFFECTS

  useEffect(() => window?.scrollTo(0, 0), []);

  // FUNCTIONS

  const check = () => {
    if (sections?.sec == "all" && access == 1) return true;
    else if (sections?.sec == head?.title?.toLowerCase()) return true;
    else if (head?.title?.includes("Publications") && access != 1) return true;
    else return false;
  };

  const handleSpinner = () => {
    sections?.setVis(true);
    setTimeout(() => sections?.setVis(false), 1999);
  };

  return (
    check() && (
      <Skeleton loading={!data?.title?.length} active>
        <div className={styles.section}>
          <div id={head?.title?.toLowerCase()} className={styles.header}>
            {head?.header}
          </div>

          <div className={styles.sectionTop}>
            <div id={head?.title?.toLowerCase()} className={styles.heading}>
              {head?.title}
            </div>

            <Button
              type="primary"
              className={styles.sectionButton}
              onClick={handleSpinner}
            >
              {sections?.sec == "all" ? (
                <Link href={`/profile#${head?.title?.toLowerCase()}`}>
                  View {head?.title}
                </Link>
              ) : (
                <Link href="/profile">Back to Profile</Link>
              )}
            </Button>
          </div>

          <div className={styles.sectionBottom}>
            <Table
              columns={data?.title}
              dataSource={data?.body}
              pagination={sections?.sec == "all" ? true : false}
            />
          </div>
        </div>
      </Skeleton>
    )
  );
};

export default Section;
