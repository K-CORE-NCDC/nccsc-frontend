import React from "react";
import box_Plot from '../../assets/images/Box.png'
import Circos from '../../assets/images/Circos.png'
import CNN from '../../assets/images/CNN.png'
import DataSummary from '../../assets/images/DataSummary.png'
import HeatMap from '../../assets/images/HeatMap.png'
import lollipop from '../../assets/images/lollipop.png'

export const SingleDataVisualization = () => {
  return (
    <div className="grid grid-rows-2 gap-3 h-full w-full mx-10">
      <div className="grid grid-cols-3 gap-6 py-10 px-5 ">
        <div className="shadow">
          <div className="flex justify-between">
            <h6 className="pt-10 px-2">Data Summary</h6>
            <div className="  pt-10 px-2">
              <span>
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Download
                </button>
              </span>
              <span className="px-3">
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Run Analysis
                </button>
              </span>
            </div>
          </div>
          <div className="py-16">
            <img src={DataSummary} alt="img" />
          </div>
        </div>


        <div className="shadow">
          <div className="flex justify-between">
            <h6 className="pt-10 px-2">BOX Plot</h6>
            <div className="flex justify-end pt-10 px-2">
              <span>
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Download
                </button>
              </span>
              <span className="px-3">
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Run Analysis
                </button>
              </span>
            </div>
          </div>
          <div className="py-16">
            <img src={box_Plot} alt="img" />
          </div>
        </div>

        <div className="shadow">
          <div className="flex justify-between">
            <h6 className="pt-10 px-2">CNV Plot</h6>
            <div className="flex justify-end pt-10 px-2">
              <span>
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Download
                </button>
              </span>
              <span className="px-3">
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Run Analysis
                </button>
              </span>
            </div>
          </div>
          <div className="py-16">
            <img src={CNN} alt="img" />
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-6 ">
        <div className="shadow">
          <div className="flex justify-between">
            <h6 className="pt-10 px-2">HeatMap</h6>
            <div className="flex justify-end pt-10 px-2">
              <span>
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Download
                </button>
              </span>
              <span className="px-3">
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Run Analysis
                </button>
              </span>
            </div>
          </div>
          <div className="py-16">
            <img src={HeatMap} alt="img" />
          </div>
        </div>


        <div className="shadow">
          <div className="flex justify-between">
            <h6 className="pt-10 px-2">Circos Plot</h6>
            <div className="flex justify-end pt-10 px-2">
              <span>
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Download
                </button>
              </span>
              <span className="px-3">
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Run Analysis
                </button>
              </span>
            </div>
          </div>
          <div className="py-16">
            <img src={Circos} alt="img" />
          </div>
        </div>



        <div className="shadow">
          <div className="flex justify-between">
            <h6 className="pt-10 px-2">Lollipop Plot</h6>
            <div className="flex justify-end pt-10 px-2">
              <span>
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Download
                </button>
              </span>
              <span className="px-3">
                <button name='type' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full'>
                  Run Analysis
                </button>
              </span>
            </div>
          </div>
          <div className="py-16">
            <img src={lollipop} alt="img" />
          </div>
        </div>
      </div>

    </div>
  )

}