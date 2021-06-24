import React, { useState,useEffect,useRef } from 'react';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default function BarChartComp({data}){
      const chartRef = useRef(null);

      const drawGraph = (labels, data_) => {
        if(chartRef.current){

          var myChart = new Chart(chartRef.current, {
              type: 'bar',
              data: {
                  labels: labels,
                  datasets: [{
                      label: '',
                      data: data_,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  indexAxis: 'y',
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
            });
        }
      }

    useEffect(() => {
      let labels = []
      let data_list = []
      for (var k in data){
          labels.push(data[k]['name'])
          data_list.push(data[k]['cnt'])
      }

      drawGraph(labels,data_list)
    }, []);


    return (
        <div>
          <canvas ref={chartRef} id="myChart" width="1000" height="1000"></canvas>
        </div>
    )
  }
