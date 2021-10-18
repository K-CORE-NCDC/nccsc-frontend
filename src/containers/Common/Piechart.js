
import React, { useState,useEffect,useRef } from 'react'
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
// Chart.register(ChartDataLabels);

// let ctx
export default function Piechart({id,data,width,color, chart_type}) {

  const hexToRgb = hex =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
         ,(m, r, g, b) => '#' + r + r + g + g + b + b)
         .substring(1).match(/.{2}/g)
         .map(x => parseInt(x, 16))

  const drawGraph = (g_data,ct_type) => {
    let ctx = document.getElementById(id).getContext('2d');

    // console.log(g_data)

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: g_data,
        options: {
          plugins:{
            legend: {
              display: true,
              position:'bottom'
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




  useEffect(() => {


    if (data){
      let g_dat = {"labels":[],"datasets":[]}
      let t = []
      let colors = []
      let hex_color = hexToRgb(color)
      let h = 'rgba('+hex_color[0]+','+hex_color[1]+','+hex_color[2]+','

      let linear = 1

      if(id === 'chart_pie_Age'){
        let ageofdiag = {}
        for (var i = 0; i < data.length; i++) {
          let n = parseInt(data[i].name)
          let tmp = 0
          if(n >20 && n<=25){
            tmp = '21~25'
          } else if(n>25 && n<=30 )  {
            tmp = '25~30'
          } else if(n>30 && n<=35) {
            tmp = '30~35'
          } else if(n>35 && n<=40) {
            tmp = '36~40'
          }
          if(tmp in ageofdiag) {
            ageofdiag[tmp] += data[i].cnt
          } else {
            ageofdiag[tmp] = data[i].cnt
          }
        }
        let d = []
        for (var key in ageofdiag) {
          d.push({
            'name': key,
            'cnt': ageofdiag[key]
          })
        }
        data = d

      }
      else if(id==='chart_pie_BMI') {
        let bmi = {}
        for (var i = 0; i < data.length; i++) {
          let n = parseInt(data[i].name)
          let tmp =''
          if(n<18.5){
            tmp='~18.5'
          }else if (n>18.5 &&n<=25) {
            tmp = '18.5 ~ 25'
          }else if (n>25 &&n<=30) {
            tmp='25~30'
          }else if (n>30) {
            tmp='30~'
          }
          if(tmp in bmi) {
            bmi[tmp] += data[i].cnt
          } else {
            bmi[tmp] = data[i].cnt
          }
        }
        let d = []
        for (var key in bmi) {
          d.push({
            'name': key,
            'cnt': bmi[key]
          })
        }
        data = d

      }
      for (var i = 0; i < data.length; i++) {
        t.push(data[i].cnt)
        g_dat['labels'].push(data[i].name)
        colors.push(h+linear+")")
        linear = linear-0.050
      }
      g_dat['datasets'].push({
        "data":t,
        "backgroundColor":colors,
      })

      drawGraph(g_dat, chart_type)
    }
  },[data,chart_type,id])
  let w = width-20

  return (
    <div id={'parent_pie'+id} className="flex">
      <div className="m-auto">
        <canvas id={id}  width={w} height="400"></canvas>
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
