import React, { useEffect, useState } from "react";
import Charts from "./Charts";
import CanvasCharts from "./CanvasChartS";

const Dashboard = () => {
  const [haryanaData, setHaryanaData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [maxCasesReportedIn, setMaxCasesReportedIn] = useState("");
  const [minCasesReportedIn, setMinCasesReportedIn] = useState("");
  let count = 0;

  async function getData() {
    let response = await fetch(
      "https://api.covid19india.org/v2/state_district_wise.json"
    );
    let data = response.json();
    return data;
  }

  function getMaxCasesReportedIn(data) {
    console.log("data in max func ", data);
    let maxcase = data.reduce(
      (total, item) => Math.max(total, item.confirmed),
      data[0].confirmed
    );
    let maxCasesDistrict = data.filter(item => item.confirmed === maxcase)[0]
      .district;

    return [maxCasesDistrict, maxcase];
  }

  function getMinCasesReportedIn(data) {
    console.log("data in max func ", data);
    let mincase = data.reduce(
      (total, item) => Math.min(total, item.confirmed),
      data[0].confirmed
    );
    let minCasesDistrict = data.filter(item => item.confirmed === mincase)[0]
      .district;

    return [minCasesDistrict, mincase];
  }
  useEffect(() => {
    getData().then(data => {
      console.log(data);

      data = data.filter(item => item.state === "Haryana")[0].districtData;
      setHaryanaData(data);
      setMaxCasesReportedIn(getMaxCasesReportedIn(data));
      setMinCasesReportedIn(getMinCasesReportedIn(data));
      setTotalCount(data.reduce((total, item) => total + item.confirmed, 0));
    });
  }, []);

  return (
    <div>
      <div class="stats-container">
        <span className="card">
          {" "}
          Total Count <span className="totalcount">{totalCount}</span>
        </span>
        <span className="card">
          {" "}
          Maximum Cases Reported In
          <span className="totalcount">
            {maxCasesReportedIn[0]} ({maxCasesReportedIn[1]})
          </span>
        </span>
        <span className="card">
          {" "}
          Minimum Cases Reported In
          <span className="totalcount">
            {" "}
            {minCasesReportedIn[0]} ({minCasesReportedIn[1]})
          </span>
        </span>
      </div>
      <div className="main-container">
        {/* <Charts chartdata={haryanaData}/> */}

        <CanvasCharts chartdata={haryanaData} />
      </div>
    </div>
  );
};
export default Dashboard;
