import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ScatterPlot from '../../Common/ScatterPlot'
import LoaderCmp from '../../Common/Loader'
import { getScatterInformation, getCircosSamplesRnidList } from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';

export default function Scatter({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('')
  const scatterJson = useSelector((data) => data.dataVisualizationReducer.scatterData);
  // const circosSanpleRnidListData = useSelector(state => state.dataVisualizationReducer.circosSanpleRnidListData)
  // const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (inputData) {
      let editInputData = inputData
      if (editInputData.type !== '') {
        setLoader(true)
        dispatch(getScatterInformation('POST', editInputData))
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

  // useEffect(() => {
  //   if (circosSanpleRnidListData) {
  //     let sampleListElementsTemp = []
  //     let sampleKey = ''
  //     Object.entries(circosSanpleRnidListData).forEach(([k,v]) => {
  //       sampleListElementsTemp.push(<option key={k} value={k}>{v}</option>)
  //       if(sampleKey==='') sampleKey = k
  //     })
  //     setSampleKey(sampleKey)
  //     setSampleListElements(sampleListElementsTemp)
  //   }
  // }, [circosSanpleRnidListData])
  useEffect(() => {
    setTimeout(function() {
        setLoader(false)
    }, (1000));
  }, [scatterJson])

  console.log("scatterJson---->",scatterJson)

  return (
    <>{
      loader?
        <LoaderCmp/>
        :
          <div>
            {scatterJson && <ScatterPlot scatter_data={scatterJson}/>}
          </div>
    }
    </>
  )
}
