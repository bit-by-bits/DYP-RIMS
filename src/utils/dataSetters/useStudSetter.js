import { Button } from "antd";
import styles from "../../styles/profile.module.css";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";
import useTitleMaker from "../useTitleMaker";
import useCaps from "../useCaps";

const useStudSetter = () => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { capitalize } = useCaps();
  const { titleMaker } = useTitleMaker();

  return {
    studData: students => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "name", "Student Name", "Name"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: t => titleMaker(t, "degree", "Student Degree", "Degree"),
          dataIndex: "degree",
          key: "degree",
        },
        {
          title: t => titleMaker(t, "thesis", "Thesis Topic", "Thesis"),
          dataIndex: "thesis",
          key: "thesis",
        },
        {
          title: t => titleMaker(t, "year", "Guided Year", "Year"),
          dataIndex: "year",
          key: "year",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = students?.map((e, i) => ({
        key: i,
        name: capitalize(e.student_name),
        degree: capitalize(e.student_degree),
        thesis: capitalize(e.thesis_topic),
        year: e.year,
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1600 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/student/${e.id}`)}
          >
            {innerWidth > 1600 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.year - a.year);
      if (innerWidth < 1600) TITLE.shift();

      return { TITLE, BODY };
    },
  };
};

export default useStudSetter;
