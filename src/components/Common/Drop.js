import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import styles from "../../styles/profile.module.css";
import { createElement } from "react";
import { useAccess } from "../context/accessContext";

const Drop = () => {
  const { access, change } = useAccess();

  return (
    <Dropdown
      menu={{
        items: [1, 2, 3].map(e => ({ key: e, label: `Level ${e}` })),
        onClick: e => change(e.key),
        defaultSelectedKeys: [access],
        selectable: true,
        style: { width: 100, textAlign: "center", border: "1px solid #9a2827" },
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
