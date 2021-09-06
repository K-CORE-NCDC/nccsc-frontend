import React, { useState,useEffect, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from '../../Common/Volcano'
import { exportComponentAsPNG } from 'react-component-export-image';

import { getVolcanoPlotInfo } from '../../../actions/api_actions'
import Loader from "react-loader-spinner";

export default function DataVolcono({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const volcanoJson = useSelector((data) => data.dataVisualizationReducer.volcanoSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [comp,setComp] = useState([])
  // const didMountRef = useRef(false)
  const [data_, setData] = useState('')
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    if(inputData){
      setActiveCmp(false)
      if(inputData.type !==''){
        setLoader(true)
        dispatch(getVolcanoPlotInfo('POST',inputData))
      }
    }
  },[inputData])

  useEffect(()=>{
    if(volcanoJson){
      if(Object.keys(volcanoJson).length>0){
          setActiveCmp(true)
          setData(volcanoJson)
      }
      setTimeout(function() {
          setLoader(false)
      }, (1000));
    }
  },[volcanoJson])

  // console.log(data_)
  // console.log(volcanoJson);
  // console.log(inputData)

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


  return (
    <>
    {
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
      <Fragment>
          {(volcanoJson && Object.keys(volcanoJson).length>0) && <VolcanoCmp watermarkCss={watermarkCss} ref={reference} w={width} data={volcanoJson}/>}
      </Fragment>
    }
    </>
  )

}
