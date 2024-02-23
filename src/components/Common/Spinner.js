import { Spin } from "antd";
import { useEffect } from "react";

const Spinner = ({ show = false }) => {
  // EFFECTS
  useEffect(() => window?.scrollTo(0, 0), [show]);

  return (
    <Spin spinning={show} size="large" className={`spnr ${show ? "" : "cl"}`} />
  );
};

export default Spinner;
