import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import styles from "../../styles/profile.module.css";
import { createElement, useEffect } from "react";
import { useAccess } from "../context/accessContext";

const Drop = () => {
  const { change } = useAccess();
  useEffect(() => change(1), []);

  return (
    <Dropdown
      menu={{
        items: ["Individual", "Department", "Institute"].map((e, i) => ({
          key: `${i + 1}`,
          label: `${e} Level`,
        })),
        onClick: e => change(e.key),
        defaultSelectedKeys: ["1"],
        selectable: true,
        style: { textAlign: "center", border: "1px solid #9a2827" },
      }}
    >
      <Button
        type="primary"
        className={`${styles.topButtonCircle} ${styles.topButton}`}
      >
        {createElement(SettingOutlined)}
      </Button>
    </Dropdown>
  );
};

export default Drop;
