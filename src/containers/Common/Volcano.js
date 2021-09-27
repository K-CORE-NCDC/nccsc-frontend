import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import dataD from './data.diff'
import "../../styles/volcano.css"
import UserFilesTable from './Table'
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import * as ChartZoomPlugin from "chartjs-plugin-zoom"
import zoomPlugin from "chartjs-plugin-zoom";
import DataTable from 'react-data-table-component';

Chart.register(...registerables, zoomPlugin);

var myChart
const VolcanoCmp = React.forwardRef(({ w, data, watermarkCss, negative_data, positive_data, tab_count, tableData }, ref) => {
  const table_cols = [
    {
      name: 'GENE NAME',
      selector: row => row["Gene Name"],
      sortable: true
    },
    {
      name: 'LOG2FC',
      selector: row => row["Log2FC"],
      sortable: true
    },
    {
      name: '-LOG(PVALUE)',
      selector: row => row["-Log(Pvalue)"],
      sortable: true
    }
  ]
  const volcano_plot = useRef(null);
  let option = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      },
    },
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
        }
      }
    },
    plugins: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.labels[tooltipItem.index];
            return label + ': (test' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          drag: true,
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

  const resetChart = () => {
    myChart.resetZoom()
  }

  const zoomIn = () => {
    myChart.zoom(1.1)
  }

  const zoomOut = () => {
    myChart.resetZoom(0.9)
  }

  function volcanoPlot(d_) {
    myChart = new Chart(volcano_plot.current, {
      type: 'scatter',
      data: {
        'datasets': d_
      },
      options: option
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
  const downloadTableAsCsv = (tableType) => {
    let rows = [
      ["GENE NAME", "LOG2FC", "LOG(PVALUE) negative"],
    ];
    if (tableType === "positive") {
      tableData.forEach(element => {
        if(element["log2(fold_change)"] <= -5){
          rows.push([element["gene"], element["log2(fold_change)"], element["q_value"]])
        }
      });
    } else if(tableType === "negative") {
      tableData.forEach(element => {
        if(element["q_value"] >= 5){
          rows.push([element["gene"], element["log2(fold_change)"], element["q_value"]])
        }
      });
    }else{
      tableData.forEach(element => {
        rows.push([element["gene"], element["log2(fold_change)"], element["q_value"]])
      })
    }
    let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RNA-expression-${tableType}.csv`);
    document.body.appendChild(link);
    link.click();
  }
  return (
    <div>
      <div id='scatter_parent' className={`p-3 ${watermarkCss}`}>
        <canvas id="scatter" ref={volcano_plot} height="20vh" width="40vw"></canvas>
      </div>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8" onClick={resetChart}>reset</button>
      <button type="button" onClick={zoomIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-8 rounded" >zoom in</button>
      <button type="button" onClick={zoomOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  ml-8 rounded">zoom out</button>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Down Level(log2FC <= -5)"}</strong></h2>
          <div>
            {/* <UserFilesTable userDataTableData={negative_data} /> */}
            <DataTable pagination
                      columns={table_cols}
                      data={negative_data}
                    />
            <div className="mt-8 ml-4 text-left flex flex-row justify-between">
              <h2><strong>Total entries:  {tab_count['negative']}</strong></h2>
              <button onClick={() => downloadTableAsCsv("negative")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Up Level(log2FC >= 5)"}</strong></h2>
          {/* <UserFilesTable userDataTableData={positive_data} /> */}
          <DataTable pagination
                      columns={table_cols}
                      data={positive_data}
                    />
          <div className="mt-8 ml-4 text-left flex flex-row justify-between">
            <h2><strong>Total entries:  {tab_count['positive']}</strong></h2>
            <button onClick={() => downloadTableAsCsv("negative")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              <span>Download</span>
            </button>
          </div>
          {/* <DataTable pagination
                      columns={table_cols}
                      data={tableData}
                    /> */}
        </div>
        <div className="mt-8 ml-4 text-left flex flex-row justify-between">
            <h2><strong>Download Entire Data</strong></h2>
            <button onClick={() => downloadTableAsCsv("")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              <span>Download</span>
            </button>
          </div>
      </div>
    </div>
  )
})

export default VolcanoCmp
