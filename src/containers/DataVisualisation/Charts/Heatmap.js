import React, { useState,useEffect, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import HeatmapCmp from '../../Common/Heatmap'
import { getHeatmapInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'

export default function DataHeatmap({ width,inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [activeCmp,setActiveCmp] = useState(false)
  const [tableType,setTableType] = useState('rna')
  const [data_,setData] = useState('')
  const heatmapJson = useSelector((data) => data.dataVisualizationReducer.heatmapSummary);
  // const didMountRef = useRef(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)


  useEffect(()=>{
    if(inputData){
      setActiveCmp(false)
      if(inputData.type !==''){
        setLoader(true)
        inputData['table_type'] = tableType
        dispatch(getHeatmapInformation('POST',inputData))
      }
    }
  },[inputData])

  useEffect(()=>{
    if(heatmapJson){
      if(Object.keys(heatmapJson).length>0){
          setActiveCmp(true)
          setData(heatmapJson)
      }
      setTimeout(function() {
          setLoader(false)
      }, (1000));
    }
  },[heatmapJson])

  useEffect(() => {
    if(screenCapture){
      setWatermarkCSS("watermark")
    }else{
      setWatermarkCSS("")
    }

    if(watermarkCss !== "" && screenCapture){
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])



  const changeType = (e,type)=> {
    let c = document.getElementsByName('type')
    setActiveCmp(false)
    setLoader(true)
    for (var i = 0; i < c.length; i++) {
      let classList = c[i].classList
      classList.remove("hover:bg-main-blue","bg-main-blue","text-white");
      classList.add("text-teal-700","hover:bg-teal-200", "bg-teal-100")
    }
    e.target.classList.add("hover:bg-main-blue","bg-main-blue","text-white")
    setTableType(type)
    if(inputData.type !==''){
      let dataJson = inputData
      // dataJson['genes'] = gene
      dataJson['table_type'] = type
      dispatch(getHeatmapInformation('POST',inputData))
    }
  }

  return (
      <div>
        <div className="grid grid-cols-2  ">
          <div className="p-5 text-right">
            <div className="flex justify-start items-baseline flex-wrap">
              <div className="flex m-2">
                <button onClick={e=>changeType(e,'rna')} name='type' className="rounded-r-none  hover:scale-110
                  focus:outline-none flex p-5 rounded font-bold cursor-pointer
                  hover:bg-main-blue  bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition">
                    Rna
                </button>
                <button onClick={e=>changeType(e,'methylation')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                    Methylation
                </button>
                <button onClick={e=>changeType(e,'proteome')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                    Proteome
                </button>
                <button onClick={e=>changeType(e,'phospo')} name='type' className="rounded-l-none border-l-0
                  hover:scale-110 focus:outline-none flex justify-center p-5
                  rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100
                  text-teal-700 border duration-200 ease-in-out border-teal-600 transition">
                    Phospo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='grid'>
        {
          loader?
          <LoaderCmp/>
          :<HeatmapCmp watermarkCss={watermarkCss} ref={reference} width={width} data={heatmapJson}/>
        }
        </div>
      </div>
  )
}
