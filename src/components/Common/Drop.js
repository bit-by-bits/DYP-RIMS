import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import styles from "../../styles/profile.module.css";
import { createElement, useEffect, useState } from "react";
import { useAccess } from "../context/accessContext";
import { useUser } from "../context/userContext";
import Spinner from "./Spinner";

const Drop = () => {
  // HOOKS
  const { user } = useUser();
  const { access, change } = useAccess();

  // STATES
  const [visible, setVisible] = useState(false);

  // EFFECTS
  useEffect(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1999);
  }, [access]);

  return (
    <>
      <Spinner show={visible} />

      <Dropdown
        menu={{
          items: ["Individual", "Department", "Institute"]
            .filter((_, i) => i < user?.max_access)
            .map((e, i) => ({
              key: `${i + 1}`,
              label: `${e} Level`,
            })),
          onClick: e => change(e.key),
          selectedKeys: [`${access}`],
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
    </>
  );
};

export default Drop;
