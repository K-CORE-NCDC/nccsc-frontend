import { Chart, registerables } from 'chart.js';
import React, { useState, useEffect, useRef } from 'react';
import NoContentMessage from '../Common/NoContentComponent';
Chart.register(...registerables);

export default function StackBarChartComp({ data, chart_key }) {
  const chartRef = useRef(null);
  const [drawChart, setDrawChart] = useState(true)

  let option = {
    plugins: {
      legend: {
        display: false
      }
    },
    indexAxis: 'y',
    layout: {
      padding: 20
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        beginAtZero: true,
        stacked: true
      }
    }
  };

  const drawGraph = (labels, data_) => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: data_
        },
        options: option
      });
    }
  };

  useEffect(() => {
    let datasets = data['datasets'];
    let labels = data['labels'];
    if (labels?.length > 0) {
      drawGraph(labels, datasets);
      setDrawChart(true);
    }
    else {
      setDrawChart(false);
    }
  }, []);

  return (
    <div>
      {drawChart ?
        <canvas ref={chartRef} id={chart_key} height="300"></canvas>
        :
        <div className='noData' style={{ marginTop: "150px" }}>
          <NoContentMessage />
        </div>
      }
    </div>
  );
}
