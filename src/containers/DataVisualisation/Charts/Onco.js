import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";

import OncoCmp from '../../Common/Onco'
import { getOncoInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader'

export default function DataOnco({ width,inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const oncoJson = useSelector((data) => data.dataVisualizationReducer.oncoSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [chartData,setChartData] = useState({})
  const [inputState,setInputState] = useState({})
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    if(inputData && 'genes' in inputData){
      setActiveCmp(false)

      setInputState((prevState) => ({...prevState,...inputData }))
    }
  },[inputData])


  useEffect(()=>{
    if(inputState && 'genes' in inputState){
      setActiveCmp(false)
      if(inputState.type !==''){
        setLoader(true)
        let dataJson = inputState
        dispatch(getOncoInformation('POST',dataJson))
      }
    }
  },[inputState])

  useEffect(()=>{
    if(oncoJson){
      setChartData((prevState) => ({
        ...prevState,
        ...oncoJson
      }))
      setActiveCmp(true)
    }
  },[oncoJson])

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

  useEffect(() => {
    setTimeout(function() {
        setLoader(false)
    }, (1000));
  }, [oncoJson])

  return (
    <>{
      loader?
      <LoaderCmp/>
      :
      <div>

        {activeCmp &&
          <div className='text-left'>
            <h3>Global Mutation Distribution :distribution of total mutation</h3>
            <h3>Global Mutation Count :count of total somatic mutation</h3>
            <h3>Mutation Distribution :distribution of selected mutation</h3>
            <h3>Mutation Count :count of selected somatic mutation</h3>
            <OncoCmp watermarkCss={watermarkCss} ref={reference} width={width} data={chartData}/>
          </div>
        }
      </div>
    }
    </>
  )

}
