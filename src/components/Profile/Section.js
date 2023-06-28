import { Button, Skeleton, Table } from "antd";
import styles from "../../styles/profile.module.css";
import React from "react";

const Section = ({
  data = { title: [], body: [] },
  head = { header: "", title: "" },
  sections = { sec: "all", setSec: () => {} },
}) => {
  return (
    (sections?.sec == "all" || sections?.sec == head?.title?.toLowerCase()) && (
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
                onClick={() => sections?.setSec("all")}
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
