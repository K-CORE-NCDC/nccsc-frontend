import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef } from 'react';

Chart.register(...registerables);

export default function StackBarChartComp({ data, key }) {
  const chartRef = useRef(null);

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
    drawGraph(labels, datasets);
  }, []);

  return (
    <div>
      <canvas ref={chartRef} id={key} height="200"></canvas>
    </div>
  );
}
