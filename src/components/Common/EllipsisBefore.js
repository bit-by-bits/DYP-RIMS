import { Typography } from "antd";
import styles from "../../styles/profile.module.css";

const EllipsisBefore = ({ suffixCount, children }) => {
  const { Text } = Typography;

  const suffix = children.slice(-suffixCount).trim();
  const start = children.slice(0, children.length - suffixCount).trim();

  return (
    <Text
      style={{ maxWidth: "100%" }}
      ellipsis={{ suffix }}
      className={styles.publicationTitle}
    >
      {start}
    </Text>
  );
};

export default EllipsisBefore;
