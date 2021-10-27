import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as d3 from 'd3';
import test_data from './test_scatter_data'
import {Chart, registerables} from 'chart.js';
// import ChartDataLabels from 'chartjs-pslugin-datalabels';

Chart.register(...registerables);
// import genes from '../Common/gene.json'
// import { getBreastKeys, getUserDataProjectsTableData } from '../../actions/api_actions'
var myChart
const ScatterPlot = React.forwardRef(({ scatter_data, watermarkCss }, ref) => {
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const scatter_plot = useRef(null);
  const [chartV, setChartV] = useState()
  let option = {
    plugins:{
      tooltip: {
        callbacks: {
          label: function(tooltipItem, data) {
            return  BrstKeys[tooltipItem['raw']['sample']]+ ': (' + tooltipItem.raw.x + ', ' + tooltipItem.raw.y + ')';
          }
        }
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'RNA Expression (z-score)'
        }
      },
      y:{
        title: {
          display: true,
          text: 'Global proteome(z-score)'
        }
      }

    },
    responsive:true,
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
      <div ref={ref} id='scatter_parent' className={`p-5 ${watermarkCss}`}>
        <canvas id="scatter" ref={scatter_plot} height="14vh" width="40vw"></canvas>
      </div>
  )
})

// <canvas ref={scatter_plot} width="50" height="50"></canvas>

export default ScatterPlot
