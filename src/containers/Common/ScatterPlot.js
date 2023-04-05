import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
var myChart
const ScatterPlot = React.forwardRef(({ scatter_data, watermarkCss }, ref) => {
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const scatter_plot = useRef(null);
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
          text: 'Global Proteome (z-score)'
        }
      }

    },
    responsive:true,
  }


  const drawChart = (data_) =>{
    if(myChart){
      myChart.destroy()
    }
    myChart = new Chart(scatter_plot.current, {
      type: 'scatter',
      data: data_,
      options:option,
    });
  }

  useEffect(()=>{
    if(scatter_data){
        drawChart(scatter_data)
    }
  },[scatter_data])


  return (
      <div ref={ref} id='scatter_parent' className={`p-5 lg:w-full sm:w-5/6 ${watermarkCss}`}>
        <canvas id="scatter" ref={scatter_plot} height="14vh" width="40vw"></canvas>
      </div>
  )
})
export default ScatterPlot
