import React, { useState,useEffect,useRef } from 'react';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default function Barchart({id,data,width,color, chart_type,title}) {
  const hexToRgb = hex =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
         ,(m, r, g, b) => '#' + r + r + g + g + b + b)
         .substring(1).match(/.{2}/g)
         .map(x => parseInt(x, 16))
  const drawGraph = (g_data,ct_type) => {

    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: g_data,
        options: {
          plugins:{
            legend: {
              display: false
            },
            title: {
                display: true,
                position: 'left',
                text: ' # of samples ',
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
             },
             title:{
              display: true,
              text: (title)?title:''
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
      let colors = []
      let hex_color = hexToRgb(color)
      let h = 'rgba('+hex_color[0]+','+hex_color[1]+','+hex_color[2]+','
      let linear = 1
      let na = ''
      for (var i = 0; i < data.length; i++) {
        if(data[i].name==null){
          // g_dat['labels'].push('N/A')
          na = 'N/A'
        }
        else if(data[i].name=="null"){
          // g_dat['labels'].push('N/A')
          na = 'N/A'
        }
        else if(data[i].name==""){
          // g_dat['labels'].push('N/A')
          na = 'N/A'
        }
        else if(data[i].name=="N/A"){
          na = data[i].name
        }
        else{
          g_dat['labels'].push(data[i].name)
        }
        if(na=="N/A"){
          na += "||"+data[i].cnt
        }else{
          t.push(data[i].cnt)
        }
        colors.push(h+linear+")")
        linear = linear-0.020
      }
      if(na!=''){
        na = na.split('||')
        g_dat['labels'].push(na[0])
        t.push(na[1])
      }
      g_dat['datasets'].push({
        "data":t,
        backgroundColor:colors,
        borderRadius: 11
      })
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
