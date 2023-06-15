import React from "react";
import { List } from "antd";
import styles from "../../styles/file.module.css";

const ListSection = ({ head = "", data, paginate = false }) => {
  return (
    <div style={{ width: "100%" }} className={styles.authors}>
      <div className={styles.info_head}>{head}</div>
      <div className={styles.auth_body}>
        <List
          grid={{ gutter: 16 }}
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
          pagination={
            paginate
              ? { position: "bottom", align: "center", pageSize: 10 }
              : false
          }
        />
      </div>
    </div>
  );
};

export default ListSection;
