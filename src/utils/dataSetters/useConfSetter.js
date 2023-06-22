import { Button } from "antd";
import styles from "../../../styles/profile.module.css";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";
import useTitleMaker from "../useTitleMaker";
import useSorter from "../useSorter";
import useCaps from "../useCaps";
import useDate from "../useDate";

const useConfSetter = () => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { sorter } = useSorter();
  const { date } = useDate();
  const { capitalize } = useCaps();
  const { titleMaker } = useTitleMaker();

  return {
    confData: conferences => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "name", "Conference Name", "Name"),
          dataIndex: "name",
          key: "name",
        },
        {
          title: t => titleMaker(t, "attended_as", "Attended As", "As"),
          dataIndex: "attended_as",
          key: "attended_as",
        },
        {
          title: t => titleMaker(t, "type", "Conference Type", "Type"),
          dataIndex: "type",
          key: "type",
          sorter: (a, b, c) => sorter(a.type, b.type, 1, c),
        },
        {
          title: t => titleMaker(t, "paper", "Paper Presented", "Paper"),
          dataIndex: "paper",
          key: "paper",
        },
        {
          title: t => titleMaker(t, "poster", "Poster Presented", "Poster"),
          dataIndex: "poster",
          key: "poster",
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
          title: t =>
            titleMaker(t, "location", "Conference Location", "Location"),
          dataIndex: "location",
          key: "location",
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = conferences?.map((e, i) => ({
        key: i,
        name: capitalize(e.conference_name),
        attended_as: capitalize(e.attended_as),
        type: capitalize(e.type),
        paper: e.is_paper_presented
          ? e.papers?.map(e => e.title).join(", ")
          : "N/A",
        poster: e.is_poster_presented
          ? e.posters?.map(e => e.title).join(", ")
          : "N/A",
        start: e.start_date,
        end: e.end_date,
        location: capitalize(e.location),
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1600 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/conference/${e.id}`)}
          >
            {innerWidth > 1600 ? "View More" : null}
          </Button>
        ),
      }));

      BODY.sort((a, b) => b.start - a.start);
      if (innerWidth < 1600) TITLE.shift();

      return {
        TITLE:
          innerWidth < 1600
            ? TITLE.filter(e => e.key !== "paper" && e.key !== "poster")
            : TITLE,
        BODY,
      };
    },
  };
};

export default useConfSetter;
