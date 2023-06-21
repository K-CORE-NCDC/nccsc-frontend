import React from "react";
import bgimg from '../../assets/images/bg.png';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MultiDataVisualization = () => {
  const history = useHistory()
  return (
    <div className="row-span-4  grid grid-rows-6 span-3">
    <span>Contents</span>
    <div className="row-span-3 mx-40">
      <img className="object-fill " alt="img" src={bgimg} />
    </div>
    <div className="row-span-2 py-16">
      <div className=" flex flex-row justify-center align-center gap-6">
        <div className=" sm:px-6 lg:px-0 ">
          <div className="min-w-0 flex-1">
            <div className="shadow sm:overflow-hidden sm:rounded-md ">
              <button onClick={() =>{
                history.push('/visualise/circos/')
              }} className="bg-blue-300 px-4 py-6 sm:p-6 text-black">Example Page</button>
            </div>
          </div>
        </div>
        <div className=" sm:px-6 lg:px-0">
          <div className="min-w-0 flex-1">
            <div className="shadow sm:overflow-hidden sm:rounded-md ">
              <button className="bg-blue-300 px-4 py-6 sm:p-6 text-black">Download Manual</button>
            </div>
          </div>
        </div>

      </div>
    </div>



  </div>

  )

}
export default MultiDataVisualization;