
import React, { useState,useEffect,useRef } from 'react'
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
// Chart.register(ChartDataLabels);

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
            },
            datalabels: {
              formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map(data => {
                      sum += data;
                  });
                  let percentage = (value*100 / sum).toFixed(2)+"%";
                  return percentage;
              },
              color: '#fff',
            }
          },
          responsive: false,
          layout:{
            padding:20
          },

        },
        plugins: [ChartDataLabels]
    });


  }

  var dynamicColors = function() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
 };

  useEffect(() => {
    if (data){
      let g_dat = {"labels":[],"datasets":[]}
      let t = []
      let colors = []
      for (var i = 0; i < data.length; i++) {
        t.push(data[i].cnt)
        g_dat['labels'].push(data[i].name)
        let tmp = {}
        colors.push(dynamicColors())
      }
      g_dat['datasets'].push({"data":t,
      "backgroundColor":colors,
      "hoverBorderColor": ['#96ceff', '#424348', '#91ee7c', '#f7a35b', '#8286e9'],
      "hoverBorderWidth": 2
    })
      drawGraph(g_dat, chart_type)
    }
  },[data,chart_type])
  let w = width-20

  return (
    <div id={'parent_pie'+id} className="flex">
      <div className="m-auto">
        <canvas id={id}  width={w} height="300"></canvas>
      </div>
    </div>
  )
}


// scales: {
//   x: {
//    grid: {
//      display: true,
//      drawBorder: true,
//      // drawOnChartArea: true,
//      drawTicks: true,
//    }
//   },
// }
