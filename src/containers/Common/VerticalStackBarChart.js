import React, { useState,useEffect,useRef } from 'react';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export default function VerticalStackBarChartComp({data, axis, key}){
    const chartRef_1 = useRef(null);
    let option = {
              plugins:{
                legend: {
                  display: false
                }
              },
              indexAxis: 'x',
              layout: {
               padding: {
                 left: -20
               }
              },
              scales:{
                x: {
                  stacked: true,
                },
                yAxes: [{
                   scaleLabel: {
                     display: true,
                   },
                   ticks:{
                     display: false
                   }
                 }]
              }
          }
          
    const drawGraph = (labels, data_) => {
        if(chartRef_1.current){
          var myChart = new Chart(chartRef_1.current, {
              type: 'bar',
              data: {
                  labels: labels,
                  datasets: data_
              },
              options:option
            });
        }
      }

    useEffect(() => {
      let datasets = data['datasets']
      let labels = data['labels']
      drawGraph(labels, datasets)
    }, []);


    return (
        <div>
          <canvas ref={chartRef_1} id={key} height="200"></canvas>
        </div>
    )
  }
