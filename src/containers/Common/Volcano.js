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
    <div className='BorderstyleViz'>
      <div id='scatter_parent'  >
        <VolcanoPlotD3 watermarkCss={watermarkCss} dataProps={data} />
      </div>
      <div className="M4 PopoverStyles">
        <div>
          <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Down Level"}</strong></h2>
          <div>
            <DataTable pagination
              columns={table_cols}
              data={negative_data}
              customStyles={{
                table: {
                  border: '1px solid black',
                },
                pagination: {
                  style: {
                      gap:"10px"
                  }
                }      
              }}
            />
            <div className="VolcanoContainer">
              <h2 className="VolcanoText">Total entries: <strong>{tab_count['negative']}</strong></h2>
              <button onClick={() => downloadTableAsCsv("negative")} className="VolcanoButton">
                <svg className="VolcanoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                <span className="VolcanoDownloadText">Download</span>
              </button>
            </div>

          </div>
        </div>
        <div>
          <h2 className="text-left text-blue-800 mb-12 mt-12"><strong>{"Expression Up Level"}</strong></h2>
          <DataTable pagination
            columns={table_cols}
            data={positive_data}
            customStyles={{
              table: {
                border: '1px solid black',
              },
              pagination: {
                style: {
                    gap:"10px"
                }
              }      
            }}
          />
          <div className="VolcanoContainer">
            <h2 className="VolcanoText">Total entries: <strong>{tab_count['positive']}</strong></h2>
            <button onClick={() => downloadTableAsCsv("positive")} className="VolcanoButton">
              <svg className="VolcanoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              <span className="VolcanoDownloadText">Download</span>
            </button>
          </div>
        </div>
      </div>

      <div className="VolcanoContainer" style={{margin:"20px 0px"}}>
        <h2 className="VolcanoText"><strong>Download Entire Data</strong></h2>
        <button onClick={() => downloadTableAsCsv("")} className="VolcanoButton">
          <svg className="VolcanoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span className="VolcanoDownloadText">Download</span>
        </button>
      </div>
    </div>
  )
})

export default VolcanoCmp
