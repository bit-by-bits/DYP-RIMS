import React, { useState, useEffect } from "react";
import styles from "../../styles/profile.module.css";
import URLObj from "../baseURL";
import { FilePdfOutlined } from "@ant-design/icons";
import { message } from "antd";

const Boxes = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      props.data.map((d, i) => (
        <div key={i} className={styles.profile_body}>
          <div className={styles.profile_one}>{d.name}</div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className={styles.profile_two}>{d.time}</div>
            <div>&middot;</div>
            <div className={styles.profile_two}>{d.venue}</div>
            <div>&middot;</div>
            {d.pdf ? (
              <a href={URLObj.rims + d.pdf} target="_blank" rel="noreferrer">
                <FilePdfOutlined style={{ color: "#52c41a" }} />
              </a>
            ) : (
              <FilePdfOutlined
                style={{ color: "#eb2f96" }}
                onClick={() => message.error("No PDF exists")}
              />
            )}
          </div>
        </div>
      ))
    );
  }, [props]);

  return (
    <>
      <div className={styles.profile_box}>
        <div className={styles.profile_head}>{props.title}</div>
        <div className={styles.profile_bodygrid}>
          {data.length ? data : "N/A"}
        </div>
      </div>
    </>
  );
};

export default Boxes;
