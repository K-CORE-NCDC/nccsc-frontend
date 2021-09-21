import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as d3 from 'd3';
import test_data from './test_scatter_data'
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
// import genes from '../Common/gene.json'
// import { getBreastKeys, getUserDataProjectsTableData } from '../../actions/api_actions'
var myChart
export default function ScatterPlot({ scatter_data }) {
  const scatter_plot = useRef(null);
  const [chartV, setChartV] = useState()
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
    plugins: [ChartDataLabels]
}


  const drawChart = (data_) =>{

    // var grapharea = document.getElementById("scatter").getContext("2d");
    // grapharea.destroy();
    // var canvas = document. getElementById("scatter");
    // var context = canvas.getContext('2d');
    // context.clearRect(0, 0, canvas. width, canvas. height)
    if(myChart){
      myChart.destroy()
    }


    myChart = new Chart(scatter_plot.current, {
      type: 'scatter',
      data: data_,
      options:option,
    });
    // console.log(myChart);
  }

  useEffect(()=>{
    if(scatter_data){
        drawChart(scatter_data)
    }
  },[scatter_data])


  return (
      <div id='scatter_parent'>
        <canvas id="scatter" ref={scatter_plot} height="14vh" width="40vw"></canvas>
      </div>
  )
}

// <canvas ref={scatter_plot} width="50" height="50"></canvas>
