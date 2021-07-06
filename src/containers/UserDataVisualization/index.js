import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
// import '../../index.css'
import {
  BeakerIcon
} from '@heroicons/react/outline'
import TabsComponent from "./Components/TabsComponent";


export default function DataVisualization() {
  const [stage,setStage] = useState(1)
  const [percentage,setPercentage] = useState("25")
  const [statetext, setText] = useState("Data Upload")

  function stageIncrement(){
    let stageText = {1:"Data Upload",2:"Sample Selection",3:"Gene Selection",4:"Visualization"}
    let s_ = stage + 1
    let head_name = stageText[s_]
    let percentage_ = parseInt(percentage) + 25
    if (s_ <= 4){
      setText(head_name)
      setPercentage(percentage_.toString())
      setStage(s_)
    }
  }

  const stage_content = (value) => {
    switch (value) {
      case 1:
        return <TabsComponent color="purple"/>
      case 2:
        return <div><h4>Sample Selection</h4></div>
      case 3:
          return <div><h4>Gene Selection</h4></div>
      case 4:
          return <div><h4>Visualization</h4></div>
      default:
        return <TabsComponent color="purple"/>
    }
  }

  return (
    <div className="py-20 h-screen bg-gray-100">
      <div className="container mx-auto">
          <div className="w-full">
            <section className="border-b-2 border-gray-500">
              <div class="grid grid-cols-10">
                <div className="col-span-10 flex justify-start my-2">
                    <span className="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight">STEP: {stage} </span>
                </div>
                <div className="col-span-5 flex justify-start my-2 mb-3">
                  <div className="text-lg font-bold text-gray-700 leading-tight">{statetext}</div>
                </div>
                <div className="col-span-5 mb-3 pt-2">
                  <div className="w-90 bg-gray bg-gray-600 rounded-full mr-2">
                    <div className="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white" style={{width:percentage+"%"}}>
                    </div>
                  </div>
                  <div class="text-xs w-10 text-gray-600" x-text="parseInt(step / 3 * 100) +'%'">{percentage+"%"}</div>
                </div>
              </div>
            </section>
            <section>
              {stage_content(stage)}
            </section>
            <section>
              <div className="col-span-10 flex justify-end my-1">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stageIncrement}>
                  Next Step
                </button>
              </div>
            </section>
          </div>
      </div>
    </div>
  )
}
