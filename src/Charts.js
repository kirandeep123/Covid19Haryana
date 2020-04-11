import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const Charts = ({ chartdata }) => {
  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.data = chartdata;
    console.log(chart.data, " chart data ");
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "district";
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.width=1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "district";
    series.dataFields.valueY = "confirmed";
    series.tooltipText = "{valueY.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

    chart.zoomOutButton.disabled = true;

    chart.responsive.enabled = true;
    chart.responsive.rules.push({
      relevant: am4core.ResponsiveBreakpoints.widthXL,
      state: function(target, stateId) {
        if (target instanceof am4charts.Chart) {
          let state = target.states.create(stateId);
          state.properties.paddingTop = 0;
          state.properties.paddingRight = 15;
          state.properties.paddingBottom = 5;
          state.properties.paddingLeft = 15;
          state.properties.borderRadius=50;
          return state;
        }
      }
    });
    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    setInterval(function() {
      am4core.array.each(chart.data, function(item) {
        item.confirmed = Math.abs(item.confirmed);
      });
      chart.invalidateRawData();
    }, 2000);

    categoryAxis.sortBySeries = series;
  }, [chartdata]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};
export default Charts;
