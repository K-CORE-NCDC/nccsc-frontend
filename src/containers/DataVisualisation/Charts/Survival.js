import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
import Loader from "react-loader-spinner";


export default function DataSurvival({ width,inputData, screenCapture, setToFalseAfterScreenCapture}) {
  const reference = useRef()
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        setLoader(true)
        dispatch(getSurvivalInformation('POST',inputData))
      }
    }
  },[inputData])


  useEffect(() => {
    setTimeout(function() {
        setLoader(false)
    }, (1000));
  }, [survivalJson])

  useEffect(() => {
    // console.log(screenCapture, watermarkCss);
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
    <>{
      loader?
      <div className="flex justify-center mt-12">
        <Loader
          type="ThreeDots"
          color="#0c3c6a"
          height={200}
          width={200}
          timeout={30000} //3 secs
        />
      </div>
      :
      <div>
        <SurvivalCmp watermarkCss={watermarkCss} ref={reference} width={width} survival_data={survivalJson}/>
      </div>
    }

    </>
  )

}
