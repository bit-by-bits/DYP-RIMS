const useNumber = () => {
  return {
    number: num => (num ? (isNaN(num) ? 0 : num) : 0),
  };
};

export default useNumber;
