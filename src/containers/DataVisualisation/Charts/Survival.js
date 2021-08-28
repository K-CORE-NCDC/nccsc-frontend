import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';


export default function DataSurvival({ width,inputData, screenCapture, setToFalseAfterScreenCapture}) {
  const reference = useRef()
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);
  const [watermarkCss, setWatermarkCSS] = useState("")

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        dispatch(getSurvivalInformation('POST',inputData))
      }
    }
  },[inputData])

  useEffect(() => {
    console.log(screenCapture, watermarkCss);
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

  return (
    <div>
      <SurvivalCmp watermarkCss={watermarkCss} ref={reference} width={width} survival_data={survivalJson}/>
    </div>
  )

}
