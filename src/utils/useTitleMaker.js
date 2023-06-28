import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const useTitleMaker = () => {
  return {
    titleMaker: (titleProps, name, title1, title2) => {
      const sortedColumn = titleProps.sortColumns?.find(
        ({ column }) => column.key === name
      );

      return (
        <div
          style={{
            gap: innerWidth > 1600 ? 10 : 5,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>{innerWidth > 1600 ? title1 : title2}</span>
          {sortedColumn?.order === "ascend" ? (
            <SortAscendingOutlined />
          ) : sortedColumn?.order === "descend" ? (
            <SortDescendingOutlined />
          ) : null}
        </div>
      );
    },
  };
};

export default useTitleMaker;
