import useNumber from "../useNumber";

const useExtraSetter = () => {
  const { number } = useNumber();

  return {
    setExtra: (pubs, confs, projs, setExtra) => {
      let CITATIONS = { total: 0, crossref: 0, scopus: 0, wos: 0 };

      let IMPACT = { total: 0, average: 0 };

      let ACCESS = { gold: 0, green: 0, bronze: 0, closed: 0 };

      let INDEX = {
        pubmed: 0,
        scopus: 0,
        doaj: 0,
        wos: 0,
        medline: 0,
        total: 0,
      };

      let FUNDS = 0;
      let PAPERS = 0;
      let POSTERS = 0;

      pubs?.forEach(e => {
        CITATIONS.total += e.citations_total;
        CITATIONS.crossref += e.citations_crossref;
        CITATIONS.scopus += e.citations_scopus;
        CITATIONS.wos += e.citations_wos;

        IMPACT.total += e.impact_factor;

        if (e.open_access) {
          switch (e.open_access_status) {
            case "gold":
              ACCESS.gold++;
              break;

            case "green":
              ACCESS.green++;
              break;

            case "bronze":
              ACCESS.bronze++;
              break;

            default:
          }
        } else ACCESS.closed++;

        if (e.in_pubmed) INDEX.pubmed++;
        if (e.in_scopus) INDEX.scopus++;
        if (e.in_doaj) INDEX.doaj++;
        if (e.in_wos) INDEX.wos++;
        if (e.in_medline) INDEX.medline++;

        if (e.in_pubmed || e.in_scopus || e.in_doaj || e.in_wos || e.in_medline)
          INDEX.total++;
      });

      IMPACT.average = IMPACT.total / pubs?.length;

      confs?.forEach(e => {
        if (e.is_paper_presented) PAPERS += e.papers?.length;

        if (e.is_poster_presented) POSTERS += e.posters?.length;
      });

      projs
        ?.filter(e => number(e.funds))
        .forEach(e => (FUNDS += parseFloat(number(e.funds))));

      setExtra({
        index: INDEX,
        funds: FUNDS,
        papers: PAPERS,
        impact: IMPACT,
        access: ACCESS,
        posters: POSTERS,
        citations: CITATIONS,
      });
    },
  };
};

export default useExtraSetter;
