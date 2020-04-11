import React from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function createDataPoint(data) {
  let resultingArray = [];
  data.map(item => {
    resultingArray.push({ label: item.district, y: item.confirmed });
  });
  return resultingArray;
}

const CanvasChartS = ({ chartdata }) => {
  const result = createDataPoint(chartdata);
  console.log(result, " cahrtdata result  ");
  const options = {
    title: {
      text: "Haryana District Corona Cases"
    },
    animationEnabled: true,
    data: [
      {
        type: "bar",
        dataPoints: result
      }
    ]
  };

  return (
    <div style={{ height: 100 + "%", width: 100 + "%" }}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default CanvasChartS;
