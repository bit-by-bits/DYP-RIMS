const useCheck = () => {
  const inValidValues = [
    0,
    "0",
    "N/A",
    "NA",
    "Not Available",
    "Not Applicable",
    "-",
    "",
    null,
    undefined,
    "null",
    "undefined",
    "NaN",
    "nan",
    "NAN",
    "Nan",
  ];

  return {
    makeValid: value => (inValidValues.includes(value) ? "N/A" : value),
    invalidButNotZero: value => inValidValues.slice(2).includes(value),
  };
};

export default useCheck;
