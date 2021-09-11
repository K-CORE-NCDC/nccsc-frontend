import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as d3 from 'd3';
import test_data from './test_scatter_data'
import {Chart, registerables} from 'chart.js';

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
  }


  const drawChart = (data_) =>{

    if(myChart){
      myChart.destroy();
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
        <canvas id="scatter" ref={scatter_plot} height="10vh" width="40vw"></canvas>
      </div>
  )
}

// <canvas ref={scatter_plot} width="50" height="50"></canvas>
