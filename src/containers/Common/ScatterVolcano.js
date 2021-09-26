import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3'
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import * as ChartZoomPlugin from "chartjs-plugin-zoom"
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);
// Chart.register(zoomPlugin);

var myChart
export default function ScatterVolcono({}) {
  const scatter_plot = useRef(null);
  let option = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      },
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
          // console.log("data--->",data)
          return "[" + tooltipItems.xLabel + "," + tooltipItems.yLabel + "]";
        }
      }
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          drag:true,
          mode: 'xy',
          // rangeMin: { y: 0},
          // rangeMax: { y: 10 }
        },
        // zoom: {
        //   // enabled: true,
        //   drag:{
        //     enabled:true,
        //     threshold:100
        //   },
        //   mode: 'x',
        //   pinch:{
        //     enabled:true,
        //     // threshold:100
        //   }
        //   // rangeMin: { y: 0},
        //   // rangeMax: { y: 20 }
        // }
      }
    }
  }

  const resetChart = () =>{
      myChart.resetZoom()
  }

  const zoomIn = () =>{
      myChart.zoom(1.1)
  }

  const zoomOut = () =>{
      myChart.resetZoom(0.9)
  }

  useEffect(()=>{
    let t = []
    let z = d3.csv("http://3.133.131.207:9002/media/output.csv", function(data) {
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
      // console.log(tmp);
      myChart = new Chart(scatter_plot.current, {
        type: 'scatter',
        data: tmp,
        options:option
      })
      console.log(t);
    })

  },[])
  return (
    <>
    <div id='scatter_parent'>
      <canvas id="scatter" ref={scatter_plot} height="10vh" width="40vw"></canvas>
    </div>

    <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8" onClick={resetChart}>reset</button>
    <button type="button" onClick={zoomIn} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-8 rounded" >zoom in</button>
    <button type="button" onClick={zoomOut} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  ml-8 rounded">zoom out</button>
    </>
  )
}
