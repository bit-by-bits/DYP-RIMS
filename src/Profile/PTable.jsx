import React from "react";
import styles from "../../styles/profile.module.css";
import { Table } from "antd";

const PTable = ({ title, body }) => {
  return (
    <>
      <div id={title.toLowerCase()} className={styles.profile_box}>
        <div
          className={styles.profile_head}
          style={
            body?.body.length && title === "Publications"
              ? { marginLeft: "7.5vw" }
              : {}
          }
        >
          {title}
        </div>
        <Table
          style={
            body?.body.length && title === "Publications"
              ? { width: "95vw" }
              : { width: "80vw" }
          }
          columns={body?.head}
          dataSource={body?.body}
        />
      </div>
    </>
  );
};

export default PTable;