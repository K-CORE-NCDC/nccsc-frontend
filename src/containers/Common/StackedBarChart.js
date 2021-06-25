import React, { useState,useEffect,useRef } from 'react';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default function StackBarChartComp({data,axis}){
      const chartRef = useRef(null);

      console.log("axis--->",axis)
      let axis_ = ''

      if(axis === "x-axis"){
        axis_ = {
            // indexAxis: 'x',
            // legends:false,
            scales:{
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
            }
        }
      }else{
        axis_ = {
            indexAxis: 'y',
            // legends:false,
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
      }

      const drawGraph = (labels, data_) => {
        if(chartRef.current){

          var myChart = new Chart(chartRef.current, {
              type: 'bar',
              data: {
                  labels: labels,
                  datasets: data_
              },
              options:axis_
            });
        }
      }

    useEffect(() => {
      let labels = data['categories']
      let data_list = data['series']
      drawGraph(labels,data_list)
    }, []);


    return (
        <div>
          <canvas ref={chartRef} id="myChart" height="200"></canvas>
        </div>
    )
  }
