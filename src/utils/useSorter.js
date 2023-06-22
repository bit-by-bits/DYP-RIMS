import useCheck from "./useChecks";

const useSorter = () => {
  const { invalidButNotZero } = useCheck();

  return {
    sorter: (first, second, type, mode) => {
      if (invalidButNotZero(first)) return mode === "ascend" ? 1 : -1;
      if (invalidButNotZero(second)) return mode === "ascend" ? -1 : 1;

      if (type == 0) return first - second;
      else return first.localeCompare(second);
    },
  };
};

export default useSorter;
