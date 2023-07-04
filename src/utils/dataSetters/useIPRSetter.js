import { Button } from "antd";
import styles from "../../styles/profile.module.css";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";
import useTitleMaker from "../useTitleMaker";
import useSorter from "../useSorter";
import useCaps from "../useCaps";
import useDate from "../useDate";

const useIPRSetter = () => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { date } = useDate();
  const { sorter } = useSorter();
  const { capitalize } = useCaps();
  const { titleMaker } = useTitleMaker();

  return {
    iprData: iprs => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "title", "Title of IPR", "Title"),
          dataIndex: "title",
          key: "title",
        },
        {
          title: t => titleMaker(t, "ipr", "IPR Awarded", "IPR"),
          dataIndex: "ipr",
          key: "ipr",
        },
        {
          title: t => titleMaker(t, "status", "IPR Status", "Status"),
          dataIndex: "status",
          key: "status",
        },
        {
          title: t => titleMaker(t, "agency", "Awarding Agency", "Agency"),
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: t => titleMaker(t, "date", "Published Date", "Date"),
          dataIndex: "date",
          key: "date",
          render: e => date(e),
          sorter: (a, b, c) => sorter(a.date, b.date, 1, c),
        },
        {
          title: t => titleMaker(t, "year", "IPR Number", "Number"),
          dataIndex: "ipr_number",
          key: "ipr_number",
          sorter: (a, b, c) => sorter(a.ipr_number, b.ipr_number, 0, c),
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = iprs?.map((e, i) => ({
        key: i,
        title: capitalize(e.title_of_ipr),
        ipr: capitalize(e.IPR_awarded),
        status: capitalize(e.status),
        agency: capitalize(e.awarding_agency),
        date: e.date_of_publication,
        ipr_number: capitalize(e.ipr_number),
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1600 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/ipr/${e.id}`)}
          >
            {innerWidth > 1600 ? "View More" : null}
          </Button>
        ),
      }));

      BODY?.sort((a, b) => b.date - a.date);
      if (innerWidth < 1600) TITLE.shift();

      return { TITLE, BODY };
    },
  };
};

export default useIPRSetter;
