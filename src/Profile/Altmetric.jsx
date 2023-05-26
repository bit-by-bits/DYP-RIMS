import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const Altmetric = ({ DOI, type }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, [DOI, type]);

  return (
    <>
      <Helmet />

      {type ? (
        <div
          data-doi={DOI}
          className="altmetric-embed"
          data-badge-type="donut"
          data-badge-popover="right"
          data-hide-no-mentions="true"
        />
      ) : (
        <div
          data-doi={DOI}
          className="altmetric-embed"
          data-badge-type="medium-donut"
          data-badge-details="right"
        />
      )}
    </>
  );
};

export default Altmetric;
