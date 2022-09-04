import React, { useState, useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component';
import SankeyIndex from '../DataVisualisation/Charts/SankeyIndex';
import ReportSubHeader from './ReportSubHeader';
import { useSelector } from "react-redux";
import PdfPrint from './PdfPrint';
function Report({ sampleKey, tableData, tableColumnsData, closeReportFunction, basicInformationData, isReportClicked, isReportClickedFunction }) {
  const [basicHtml, setBasicHtml] = useState([])
  const basicTable = useRef()
  const reportData = useSelector(state => state.dataVisualizationReducer.rniData)

  useEffect(() => {
    if (basicInformationData.length > 0) {
      let tmp = []
      for (let i = 0; i < basicInformationData.length; i++) {
        const row = basicInformationData[i];
        for (const key in row) {
          tmp.push(
            <div key={key} className='grid grid-cols-2  border-b border-gray-200 w-full'>
              <div className='border-r border-gray-200'>
                <p className='px-6 py-3'>
                  {key}
                </p>
              </div>
              <div >
                <p className='px-6 py-3'>
                  {row[key]}
                </p>
              </div>
            </div>
          )
        }
      }
      setBasicHtml(tmp)
    }

    
  }, [basicInformationData])

  const customStyles = {
    headCells: {
      classNames: ['report_sankey'],
      style: {
        'textAlign': 'center',
        'display': 'block',
      }
    },
    expanderCell: {
      style: {
        'minWidth': '5%',
        'display': 'block',
      }
    }
  }

  const rowPreDisabled = (row) => {
    let variant = reportData.variant_info
    let gene = row.gene
    if (gene in variant) {
      // return row
    } else {
      return row
    }
  }

  const rowExpandFunc = (expanded, row) => {
    
    if(expanded){
      let gene = row['gene']
      if(document.getElementById('chart_'+gene)){
        document.getElementById('chart_'+gene).innerHTML=''
      }
    }

  }
  const expandableRowExpanded = (row) => {
    // console.log(row)
  }


  return (
    <>
      <div className='overflow-y-scroll fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50'>
        <div className="relative top-20 m-10 p-5 border shadow-lg rounded-md bg-white text-left">
          <div className='float-right m-5'>
            <PdfPrint isReportClickedFunction={isReportClickedFunction} isReportClicked={isReportClicked} />
          </div>
          <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">


            <h3 className='py-4 px-3'>Sample Name : {sampleKey}</h3>
            <div className='grid grid-cols-4 gap-8'>


              <div className='rounded-lg border border-gray-200'>
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="lg:text-3xl sm:text-xl font-semibold">
                    Basic Information
                  </h3>
                </div>
                <div className='basicTable' ref={basicTable}>
                  {basicHtml}
                </div>
              </div>

              <div className='col-span-3'>
              <p>Click on the dropdown to view Drug Prediction report</p>   
              <div className='col-span-3 rounded-lg border border-gray-200'>
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="lg:text-3xl  sm:text-xl font-semibold">
                    Genomic Summary
                  </h3>

                </div>

                {tableData && <div className=' report_table'>
                  <DataTable pagination
                    columns={tableColumnsData}
                    data={tableData}
                    subHeader
                    customStyles={customStyles}
                    subHeaderComponent={<ReportSubHeader />}
                    expandableRows
                    expandableRowDisabled={rowPreDisabled}
                    expandableRowsComponent={SankeyIndex}
                    expandableRowExpanded={expandableRowExpanded}
                    onRowExpandToggled={rowExpandFunc}
                    subHeaderWrap
                  />
                </div>}
              </div>
              </div>

            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                onClick={closeReportFunction}
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Report