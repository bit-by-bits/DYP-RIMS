import { Button } from "antd";
import styles from "../../styles/profile.module.css";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";
import useTitleMaker from "../useTitleMaker";
import useSorter from "../useSorter";
import useCaps from "../useCaps";
import useDate from "../useDate";
import useNumber from "../useNumber";

const useProjSetter = () => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { date } = useDate();
  const { sorter } = useSorter();
  const { number } = useNumber();
  const { capitalize } = useCaps();
  const { titleMaker } = useTitleMaker();

  return {
    projData: projects => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "agency", "Funding Agency", "Agency"),
          dataIndex: "agency",
          key: "agency",
        },
        {
          title: t => titleMaker(t, "country", "Agency Country", "Country"),
          dataIndex: "country",
          key: "country",
        },
        {
          title: t => titleMaker(t, "type", "Agency Type", "Type"),
          dataIndex: "type",
          key: "type",
        },
        {
          title: t => titleMaker(t, "amount", "Funds", "Funds"),
          dataIndex: "amount",
          key: "amount",
          render: e => `₹${number(e)} Lakhs`,
          sorter: (a, b, c) => sorter(a.amount, b.amount, 0, c),
        },
        {
          title: t => titleMaker(t, "start", "Start Date", "Start"),
          dataIndex: "start",
          key: "start",
          render: e => date(e),
          sorter: (a, b, c) => sorter(a.start, b.start, 1, c),
        },
        {
          title: t => titleMaker(t, "end", "End Date", "End"),
          dataIndex: "end",
          key: "end",
          render: e => date(e),
          sorter: (a, b, c) => sorter(a.end, b.end, 1, c),
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = projects?.map((e, i) => ({
        key: i,
        agency: capitalize(e.funding_agency),
        country: capitalize(e.country_funding_agency),
        type: capitalize(e.type),
        amount: number(e.funds),
        start: e.starting_date,
        end: e.end_date,
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1600 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/project/${e.id}`)}
          >
            {innerWidth > 1600 ? "View More" : null}
          </Button>
        ),
      }));

      BODY?.sort((a, b) => b.start - a.start);
      if (innerWidth < 1600) TITLE.shift();

      return { TITLE, BODY };
    },
  };
};

export default useProjSetter;
