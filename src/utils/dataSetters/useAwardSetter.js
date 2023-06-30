import { Button } from "antd";
import styles from "../../styles/profile.module.css";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";

import useTitleMaker from "../useTitleMaker";
import useSorter from "../useSorter";
import useCaps from "../useCaps";
import useDate from "../useDate";

const useAwardSetter = () => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { date } = useDate();
  const { sorter } = useSorter();
  const { capitalize } = useCaps();
  const { titleMaker } = useTitleMaker();

  return {
    awardData: awards => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "name", "Award Name", "Award"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: t => titleMaker(t, "agency", "Awarding Agency", "Agency"),
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: t => titleMaker(t, "type", "Award Type", "Type"),
          dataIndex: "type",
          key: "type",
          sorter: (a, b, c) => sorter(a.type, b.type, 1, c),
        },
        {
          title: t => titleMaker(t, "date", "Awarded Date", "Date"),
          dataIndex: "date",
          key: "date",
          render: e => date(e),
          sorter: (a, b, c) => sorter(a.date, b.date, 1, c),
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = awards?.map((e, i) => ({
        key: i,
        name: capitalize(e.title),
        agency: capitalize(e.awarding_agency),
        type: capitalize(e.award_type),
        date: e.date_awarded,
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1600 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/award/${e.id}`)}
          >
            {innerWidth > 1600 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.date - a.date);
      if (innerWidth < 1600) TITLE.shift();

      return { TITLE, BODY };
    },
  };
};

export default useAwardSetter;
