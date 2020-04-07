import React, { useEffect, useState } from "react";
import TableData from "./TableData";
import { create } from "istanbul-reports";

function createData(district, confirmedCases) {
  return { district, confirmedCases };
}

const Dashboard = () => {
  const [leftRows, setLeftRows] = useState([]);
  const [rightRows, setRightRows] = useState([]);

  const createRows = data => {
    setLeftRows(
      data.slice(0, 9).map(item => createData(item.district, item.confirmed))
    );
    setRightRows(
      data.slice(9, 17).map(item => createData(item.district, item.confirmed))
    );
  };
  async function getData() {
    let response = await fetch(
      "https://api.covid19india.org/v2/state_district_wise.json"
    );
    let data = response.json();
    return data;
  }

  useEffect(() => {
    getData().then(data => {
      var haryanaData = data.filter(item => item.state === "Haryana");
      createRows(haryanaData[0].districtData);
    });
  }, []);

  return (
    <div className="main-container">
      <TableData rows={leftRows} />
      <div class="circle">
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
</div>
      <TableData rows={rightRows} />
    </div>
  );
};
export default Dashboard;
