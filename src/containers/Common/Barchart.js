import React, { useState,useEffect,useRef } from 'react';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);


export default function Barchart({id,data,width,color, chart_type}) {
  const drawGraph = (g_data) => {
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: chart_type,
        data: g_data,
        options: {
          plugins:{
            legend: {
              display: false
            }

          },
          layout:{
            padding:20
          },
          scales: {
            x: {
             grid: {
               display: true,
               drawBorder: true,
               drawOnChartArea: true,
               drawTicks: true,
             }
            },

          }
        }
    });

  }
  useEffect(() => {
    if (data){
      let g_dat = {"labels":[],"datasets":[]}
      let t = []
      for (var i = 0; i < data.length; i++) {
        t.push(data[i].cnt)
        g_dat['labels'].push(data[i].name)
      }
      g_dat['datasets'].push({"data":t,backgroundColor:color})
      drawGraph(g_dat, chart_type)
    }
  },[data])
  let w = width-20

  return (
    <div >
      <canvas id={id}  width={w} height="300"></canvas>
    </div>
  )
}
