import { Button } from "antd";
import styles from "../../styles/profile.module.css";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useWindowSize } from "rooks";
import useTitleMaker from "../useTitleMaker";
import useSorter from "../useSorter";
import useCaps from "../useCaps";
import useDate from "../useDate";

const useBookSetter = () => {
  const router = useRouter();
  const { innerWidth } = useWindowSize();

  const { date } = useDate();
  const { sorter } = useSorter();
  const { capitalize } = useCaps();
  const { titleMaker } = useTitleMaker();

  return {
    bookData: books => {
      const TITLE = [
        {
          title: "No.",
          dataIndex: "no",
          key: "no",
          render: (id, record, index) => `${index + 1}.`,
        },
        {
          title: t => titleMaker(t, "title", "Publication Title", "Title"),
          dataIndex: "title",
          key: "title",
          width: "25%",
        },
        {
          title: t => titleMaker(t, "type", "Publication Type", "Type"),
          dataIndex: "type",
          key: "type",
        },
        {
          title: t => titleMaker(t, "book", "Book Name", "Book"),
          dataIndex: "book",
          key: "book",
        },
        {
          title: t => titleMaker(t, "publisher", "Publisher Name", "Publisher"),
          dataIndex: "publisher",
          key: "publisher",
        },
        {
          title: t => titleMaker(t, "published", "Published Year", "Year"),
          dataIndex: "published",
          key: "published",
          render: e => date(e),
          sorter: (a, b, c) => sorter(a.published, b.published, 1, c),
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
        },
      ];

      const BODY = books?.map((e, i) => ({
        key: i,
        title: capitalize(e.publication_title),
        type: capitalize(e.publication_type),
        book: capitalize(e.book_name),
        publisher: capitalize(e.publisher),
        published: e.year_published,
        action: (
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            style={innerWidth > 1600 ? { padding: "2px 10px" } : {}}
            className={styles.tableButton}
            onClick={() => router.push(`/book/${e.id}`)}
          >
            {innerWidth > 1600 ? "View More" : null}
          </Button>
        ),
      }));

      BODY?.sort((a, b) => b.published - a.published);
      if (innerWidth < 1600) TITLE.shift();

      return { TITLE, BODY };
    },
  };
};

export default useBookSetter;
