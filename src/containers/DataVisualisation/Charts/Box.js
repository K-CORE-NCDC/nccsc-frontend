import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import BoxPlot from '../../Common/BoxPlot2'
import LoaderCmp from '../../Common/Loader'
import { getBoxInformation} from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';

export default function Box({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()

  const boxJson = useSelector((data) => data.dataVisualizationReducer.boxData);
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (inputData) {
      let editInputData = inputData
      if (editInputData.type !== '') {
        setLoader(true)
        dispatch(getBoxInformation('POST', editInputData))
      }
    }
  }, [inputData])

  useEffect(() => {
    if(inputData && inputData.genes.length > 0) {
      setDisplaySamples(true)
    }else{
      setDisplaySamples(false)
    }
  }, [inputData])

  // useEffect(() => {
  //   if(!circosSanpleRnidListData){
  //     dispatch(getCircosSamplesRnidList())
  //   }
  // }, [])

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
  }, [boxJson])

  return (
    <>{
      loader?
        <LoaderCmp/>
        :
          <div className="grid">
            {boxJson && <BoxPlot box_data={boxJson} ref={reference} width={width}/>}
          </div>
    }
    </>
  )
}
