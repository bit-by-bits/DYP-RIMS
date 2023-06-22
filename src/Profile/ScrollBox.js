import { List, Typography } from "antd";
import React from "react";

const ScrollBox = ({ data }) => {
  const { Text } = Typography;

  return (
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Text mark>[ITEM]</Text> {item}
        </List.Item>
      )}
    />
  );
};

export default ScrollBox;
