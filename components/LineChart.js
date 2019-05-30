import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = ({ chartData }) => {
  const options = {
    chart: {
      type: "spline"
    },
    title: {
      text: "Line Chart"
    },
    yAxis: {
      title: "Amount"
    },
    series: chartData
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
