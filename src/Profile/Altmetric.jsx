import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const Altmetric = ({ DOI }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <Helmet />

      <div
        data-doi={DOI}
        data-badge-popover="right"
        data-badge-type="donut"
        data-hide-no-mentions="true"
        className="altmetric-embed"
      />
    </>
  );
};

export default Altmetric;
