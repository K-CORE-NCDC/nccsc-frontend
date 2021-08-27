import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';


export default function DataSurvival({ width,inputData, screenCapture, setToFalseAfterScreenCapture}) {
  const reference = useRef()
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        dispatch(getSurvivalInformation('POST',inputData))
      }
    }
  },[inputData])

  useEffect(()=>{
    if(survivalJson && 'meta' in survivalJson){
      setActiveCmp(true)

    }
  },[survivalJson])

  useEffect(() => {
    if(screenCapture){
      setWatermarkCSS("watermark")
    }else{
      setWatermarkCSS("")
    }

    if(watermarkCss !== ""){
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])

  return (
    <div>
      {activeCmp && <SurvivalCmp watermarkCss={watermarkCss} ref={reference} width={width} survival_data={survivalJson}/>}
    </div>
  )

}
