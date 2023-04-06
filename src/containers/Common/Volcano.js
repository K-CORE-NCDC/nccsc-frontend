import React from 'react'
import "../../styles/volcano.css"
import { Chart, registerables } from 'chart.js';
import zoomPlugin from "chartjs-plugin-zoom";
import DataTable from 'react-data-table-component';
import VolcanoPlotD3 from './VolcanoD3'

Chart.register(...registerables, zoomPlugin);

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

  const downloadTableAsCsv = (tableType) => {
    let rows = [
      ["GENE NAME", "LOG2FC", "LOG(PVALUE) negative"],
    ];
    if (tableType === "positive") {
      tableData.forEach(element => {
        if (element["log2(fold_change)"] <= -5) {
          rows.push([element["gene"], element["log2(fold_change)"], element["q_value"]])
        }
        
      });
    } else if (tableType === "negative") {
      tableData.forEach(element => {
        if (element["q_value"] >= 5) {
          rows.push([element["gene"], element["log2(fold_change)"], element["q_value"]])
        }
      });
    } else {
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
      <div id='scatter_parent'  >
        <VolcanoPlotD3 watermarkCss={watermarkCss} dataProps={data}/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Down Level"}</strong></h2>
          <div>
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
          <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Up Level"}</strong></h2>
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
