import { Button, Table } from "antd";
import styles from "../../styles/profile.module.css";
import React from "react";

const Section = ({ str, data, sec, setSec }) => {
  return (
    (sec == "all" || sec == str.toLowerCase()) && (
      <div className={styles.section}>
        <div className={styles.sectionTop}>
          <div id={str.toLowerCase()} className={styles.heading}>
            {str}
          </div>

          {sec == "all" ? (
            <Button
              type="primary"
              className={styles.sectionButton}
              onClick={() => setSec(str.toLowerCase())}
            >
              View All
            </Button>
          ) : (
            <Button
              type="primary"
              className={styles.sectionButton}
              onClick={() => setSec("all")}
            >
              Return Back
            </Button>
          )}
        </div>

        <div className={styles.sectionBottom}>
          <Table
            columns={data?.title}
            dataSource={data?.body}
            pagination={sec == "all" ? true : false}
          />
        </div>
      </div>
    )
  );
};

export default Section;
