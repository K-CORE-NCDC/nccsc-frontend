import React, { useState,useEffect,useRef } from 'react';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default function StackBarChartComp({data,axis}){
      const chartRef = useRef(null);

      let axis_ = ''

      if(axis === "x-axis"){
        axis_ = {
            // indexAxis: 'x',
            // legends:false,
            plugins:{
              legend: {
                display: false
              }

            },
            layout:{
              padding:20
            },
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
            plugins:{
              legend: {
                display: false
              }

            },
            layout:{
              padding:20
            },
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
