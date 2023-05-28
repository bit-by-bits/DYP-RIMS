import React from "react";
import styles from "../../styles/profile.module.css";
import { Table } from "antd";

const PTable = ({ title, body }) => {
  return <Table className={styles.table} columns={title} dataSource={body} />;
};

export default PTable;
