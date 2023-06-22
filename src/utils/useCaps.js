const useCaps = () => {
  return {
    capitalize: str =>
      str ? str.charAt(0).toUpperCase() + str.slice(1) : "- Not Available -",
  };
};

export default useCaps;
