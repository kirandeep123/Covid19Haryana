import React, { useEffect, useState } from "react";
import Charts from "./Charts";
import CanvasCharts from './CanvasChartS';

const Dashboard = () => {
  const [haryanaData,setHaryanaData]=useState([]);
  async function getData() {
    let response = await fetch(
      "https://api.covid19india.org/v2/state_district_wise.json"
    );
    let data = response.json();
    return data;
  }

  useEffect(() => {
    getData().then(data => {
       // eslint-disable-next-line react-hooks/exhaustive-deps
       setHaryanaData( data.filter(item => item.state === "Haryana")[0].districtData)
       console.log(haryanaData," haryana hayana ")
    });
  }, []);

  return (
    <div className="main-container">
      {/* <Charts chartdata={haryanaData}/> */}
      <CanvasCharts chartdata={haryanaData}/>
    </div>
  );
};
export default Dashboard;
