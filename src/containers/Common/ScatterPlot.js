import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as d3 from 'd3';
import test_data from './test_scatter_data'
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
// import genes from '../Common/gene.json'
// import { getBreastKeys, getUserDataProjectsTableData } from '../../actions/api_actions'

export default function BoxPlot({ box_data }) {
  const scatter_plot = useRef(null);
  let option = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  }

  const drawChart = (data_) =>{
    var myChart = new Chart(scatter_plot.current, {
      type: 'scatter',
      data: test_data,
      options:option
      });
  }

  useEffect(()=>{
    drawChart(test_data)
    // if(box_data){
    //     drawChart(box_data)
    // }
  },[])

  return (
      <div>
        <canvas ref={scatter_plot} width="200" height="200"></canvas>
      </div>
  )
}
