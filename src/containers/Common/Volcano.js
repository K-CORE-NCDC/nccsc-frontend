import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import dataD from './data.diff'
import "../../styles/volcano.css"
import UserFilesTable from './Table'
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import * as ChartZoomPlugin from "chartjs-plugin-zoom"
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);

var myChart
const VolcanoCmp = React.forwardRef(({ w, data, watermarkCss, negative_data, positive_data, tab_count }, ref) => {
    const volcano_plot = useRef(null);
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

    function volcanoPlot(d_) {
      myChart = new Chart(volcano_plot.current, {
        type: 'scatter',
        data: {
          'datasets':d_
        },
        options:option
      })
    }
    useEffect(() => {
        if (data) {
          volcanoPlot(data)
        }
    }, [data])

    // <div ref={ref} id='volcano' className={`p-3 ${watermarkCss}`}>
    // </div>
    // <button id="resetBtn">Reset</button>
    return (
        <div>
            <div id='scatter_parent' className={`p-3 ${watermarkCss}`}>
              <canvas id="scatter" ref={volcano_plot} height="10vh" width="40vw"></canvas>
            </div>
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8" onClick={resetChart}>reset</button>
            <button type="button" onClick={zoomIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-8 rounded" >zoom in</button>
            <button type="button" onClick={zoomOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  ml-8 rounded">zoom out</button>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Down Level(log2FC <= -5)"}</strong></h2>
                <div>
                  <UserFilesTable userDataTableData={negative_data}/>
                  <div className="mt-8 ml-4 text-left">
                    <h2><strong>Total entries:  {tab_count['negative']}</strong></h2>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Up Level(log2FC >= 5)"}</strong></h2>
                <UserFilesTable userDataTableData={positive_data}/>
                <div className="mt-8 ml-4 text-left">
                  <h2><strong>Total entries:  {tab_count['positive']}</strong></h2>
                </div>
              </div>
            </div>
        </div>
    )
})

export default VolcanoCmp
