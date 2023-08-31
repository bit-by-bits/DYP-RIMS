import { Button, Skeleton, Table } from "antd";
import styles from "../../styles/profile.module.css";
import React, { useEffect } from "react";
import { useAccess } from "../context/accessContext";
import { useRouter } from "next/router";

const Section = ({
  data = { title: [], body: [] },
  head = { header: "", title: "" },
  sections = { sec: "all", setSec: () => {} },
}) => {
  // HOOKS

  const router = useRouter();
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

            {sections?.sec == "all" ? (
              <Button
                type="primary"
                className={styles.sectionButton}
                onClick={() => sections?.setSec(head?.title?.toLowerCase())}
              >
                View All
              </Button>
            ) : (
              <Button
                type="primary"
                className={styles.sectionButton}
                onClick={() => {
                  sections?.setSec("all");
                  router.push("/profile");
                }}
              >
                Return Back
              </Button>
            )}
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
