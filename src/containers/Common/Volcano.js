import React from 'react'
import "../../styles/volcano.css"
import { Chart, registerables } from 'chart.js';
import zoomPlugin from "chartjs-plugin-zoom";
import DataTable from 'react-data-table-component';
import VolcanoPlotD3 from './VolcanoD3'
import { FormattedMessage } from "react-intl";

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
      name: 'PVALUE',
      selector: row => row["-Log(Pvalue)"],
      sortable: true
    }
  ]

  // const downloadTableAsCsv = (tableType) => {
  //   let rows = [
  //     ["GENE NAME", "LOG2FC", "LOG(PVALUE) negative"],
  //   ];
  //   if (tableType === "positive") {
  //     tableData.forEach(element => {
  //       if (element["log2(fold_change)"] <= -5) {
  //         rows.push([element["gene"], element["log2(fold_change)"], element["p_value"]])
  //       }

  //     });
  //   } else if (tableType === "negative") {
  //     tableData.forEach(element => {
  //       if (element["p_value"] >= 5) {
  //         rows.push([element["gene"], element["log2(fold_change)"], element["p_value"]])
  //       }
  //     });
  //   } else {
  //     tableData.forEach(element => {
  //       rows.push([element["gene"], element["log2(fold_change)"], element["p_value"]])
  //     })
  //   }
  //   let csvContent = "data:text/csv;charset=utf-8,"
  //     + rows.map(e => e.join(",")).join("\n");
  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", `RNA-expression-${tableType}.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  // }
  const downloadTableAsCsv = (tableType) => {
    console.log('tt',tableType);
    let rows = [
      ["GENE NAME", "LOG2FC", "LOG(PVALUE) negative"],
    ];
  
    if (tableType === "negative") {
      tableData.forEach(element => {
        if (element["log2(fold_change)"] <= -1.5 && element["p_value"] <= 0.5) {
          rows.push([element["gene"], element["log2(fold_change)"], element["p_value"]]);
        }
      });
    } else if (tableType === "positive") {
      tableData.forEach(element => {
        if (element["log2(fold_change)"] >= 1.5 && element["p_value"] <= 0.5) {
          rows.push([element["gene"], element["log2(fold_change)"], element["p_value"]]);
        }
      });
    } else {
      tableData.forEach(element => {
        rows.push([element["gene"], element["log2(fold_change)"], element["p_value"]]);
      });
    }
  
    // Create a CSV content string
    let csvContent = rows.map(row => row.join(",")).join("\n");
  
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a download link
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `RNA-expression-${tableType}.csv`);
    link.style.display = "none";
  
    // Append the link to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);
  };

  return (
    <div className='BorderstyleViz'>
      <div id='scatter_parent'  >
        <VolcanoPlotD3 watermarkCss={watermarkCss} dataProps={data} />
      </div>
      <div className="VolcanoCardText">
        <p className="TextBlue"><FormattedMessage id="Blue" defaultMessage="Blue :" />{`Log2FC <= -1.5 & pvalue <= 0.05`}</p>
        <p className="TextRed"><FormattedMessage id="Red" defaultMessage="Red :" />{`Log2FC >= 1.5 & pvalue <= 0.05`}</p>
        <p className="TextGrey">
          <FormattedMessage id="Grey" defaultMessage="Grey :" /> Not significant gene
        </p>
        <p className="TextBlack">
          <FormattedMessage id="Black" defaultMessage="Black :" /> Selected genes
        </p>
      </div>
      <div className="M4 PopoverStyles" style={{ justifyContent: "center" }}>
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
                    gap: "10px"
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
                  gap: "10px"
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

      <div className="VolcanoContainer" style={{ margin: "20px 0px" }}>
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
