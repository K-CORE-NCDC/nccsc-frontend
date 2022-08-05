import React,{ useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import SankeyIndex from '../../../DataVisualisation/Charts/SankeyIndex';




import ReportSubHeader from '../../../Common/ReportSubHeader';



function Report({ tableData, tableColumnsData, closeRNIDetailsFunction,basicInformationData }) {
  const [basicHtml, setBasicHtml] = useState([])
  useEffect(()=>{
    if(basicInformationData.length>0){
      let tmp = []
      for (let i = 0; i < basicInformationData.length; i++) {
        const row = basicInformationData[i];
        for (const key in row) {
          tmp.push(
            <div key={key} className='grid grid-cols-2 px-6 py-3 border-b border-gray-200 w-full'>
              <div>{key}</div>
              <div>{row[key]}</div>
            </div>
          )  
        }
      }
      setBasicHtml(tmp)
    }
  },[basicInformationData])
  
  return (
    <>
      <div className='overflow-y-scroll fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50'>
        <div className="relative top-20 m-10 p-5 border shadow-lg rounded-md bg-white text-left">
          <div className="border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className='grid grid-cols-4 gap-8'>
              <div className='rounded-lg border border-gray-200'>
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="lg:text-3xl sm:text-xl font-semibold">
                    Basic Information
                  </h3>
                </div>
                <div className='mt-5'>
                  {basicHtml}
                </div>
              </div>
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
                    subHeaderComponent={<ReportSubHeader />}
                    expandableRows expandableRowsComponent={SankeyIndex} 
                    subHeaderWrap
                  />
                </div>}
              </div>

            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                onClick={closeRNIDetailsFunction}
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