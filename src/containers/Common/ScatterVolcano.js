import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3'
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

var myChart
export default function ScatterVolcono({}) {
  const scatter_plot = useRef(null);
  let option = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    },
    responsive:true,
    tooltips: {
      // mode: "index",
      intersect: false,
      callbacks: { //Added callbacks for label
        // title: () => {
        //   return "";
        // },
        label: (tooltipItems, data) => {
          console.log("data--->",data)
          return "[" + tooltipItems.xLabel + "," + tooltipItems.yLabel + "]";
        }
      }
    },
    zoom: {
        enabled: true,
        mode: 'xy',
    },
    plugins: [ChartDataLabels]
  }

  useEffect(()=>{
    let t = []
    let z = d3.csv("http://localhost:8000/media/output.csv", function(data) {
      if( parseFloat(data.log2FoldChange)){
        return {x:parseFloat(data.log2FoldChange),y:parseFloat(data.pvalue)}
      }
    }).then(function(d){
      let t = []
      for (var i = 0; i < d.length; i++) {
        t.push(d[i])
      }
      let tmp = {
        'datasets':[{
          "data":t,
          'backgroundColor': "#D595F3",
          "label":'genes'
        }]
      }
      console.log(tmp);
      myChart = new Chart(scatter_plot.current, {
        type: 'scatter',
        data: tmp,
        options:option
      })
      console.log(t);
    })

  },[])
  return (

    <div id='scatter_parent'>
      <canvas id="scatter" ref={scatter_plot} height="10vh" width="40vw"></canvas>
    </div>

  )
}
