import React from 'react'
import DataTable from 'react-data-table-component';


function Report({ tableData, tableColumnsData, closeRNIDetailsFunction,basicInformationData,baisInformationColumnsData }) {
  console.log(tableData);

  return (
    <>
      <div className=' overflow-y-scroll fixed inset-0 bg-gray-600 bg-opacity-50 w-full z-50'>
        <div className="relative w-1/2 h-1/2 my-10 mx-auto">
          {/*content*/}

          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}

            {/* Table 1 */}

            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="lg:text-3xl sm:text-xl font-semibold">
                Basic Information
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            {tableData && <div className='mt-5 my-0 mx-auto  w-11/12 shadow-lg'>
              <DataTable pagination
                columns={baisInformationColumnsData}
                data={basicInformationData}


              />
            </div>}

            {/* table 2 */}

            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="lg:text-3xl mt-2 sm:text-xl font-semibold">
                Genomic Summary
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            {tableData && <div className='mt-5 my-0 mx-auto  w-11/12 shadow-lg'>
              <DataTable pagination
                columns={tableColumnsData}
                data={tableData}


              />
            </div>}


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