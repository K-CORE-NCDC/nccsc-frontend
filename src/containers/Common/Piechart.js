
import React, { useState,useEffect,useRef } from 'react'
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default function Piechart({id,data,width,color, chart_type}) {
  const drawGraph = (g_data,ct_type) => {
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
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
  },[data,chart_type])
  let w = width-20

  return (
    <div id={'parent'+id}>
      <canvas id={id}  width={w} height="300"></canvas>
    </div>
  )
}
