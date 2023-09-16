import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function BarChartComp({ data, key }) {
  const chartRef = useRef(null);
  const drawGraph = (labels, data_) => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: data_,
              backgroundColor: [
                '#529d3f',
                '#d2352b',
                '#f18532',
                '#644195',
                '#3777af',
                '#c74a52',
                '#fffebc'
              ],
              borderColor: [
                '#529d3f',
                '#d2352b',
                '#f18532',
                '#644195',
                '#3777af',
                '#c74a52',
                '#fffebc'
              ],
              borderWidth: 1,
              borderRadius: 0
            }
          ]
        },
        options: {
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            }
          },
          layout: {
            padding: 20
          },
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
              grid: {
                display: true,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true
              }
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    let labels = [];
    let data_list = [];
    for (var k in data) {
      labels.push(data[k]['name']);
      data_list.push(data[k]['cnt']);
    }
    drawGraph(labels, data_list);
  }, []);

  return (
    <div>
      <canvas ref={chartRef} id={key} height="300"></canvas>
    </div>
  );
}
