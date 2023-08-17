import { Spin } from "antd";

const Spinner = ({ show = false }) => {
  return (
    <Spin spinning={show} size="large" className={`spnr ${show ? "" : "cl"}`} />
  );
};

export default Spinner;
