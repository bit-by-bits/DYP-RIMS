const useDate = () => {
  return {
    date: d =>
      d
        ? new Date(d)
          ? new Date(d).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : d
        : "N/A",
  };
};

export default useDate;
