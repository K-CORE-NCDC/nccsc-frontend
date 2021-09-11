import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import ChordCmp from '../../Common/Chord'
import LoaderCmp from '../../Common/Loader'
import { getFusionInformation} from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';


export default function FusionPlot({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('')
  const fusionJson = useSelector((data) => data.dataVisualizationReducer.fusionData);
  // const circosSanpleRnidListData = useSelector(state => state.dataVisualizationReducer.circosSanpleRnidListData)
  // const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  // const [sampleListElements, setSampleListElements] = useState([])
  // const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (inputData) {
      let editInputData = inputData
      editInputData = { ...editInputData, sampleKey: sampleKey }
      if (editInputData.type !== '') {
        setLoader(true)
        dispatch(getFusionInformation('POST', editInputData))
      }
    }
  }, [inputData, sampleKey])



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
  }, [fusionJson])


  var w = Math.floor((width/100)*75)
  return (
    <>{
      loader?
        <LoaderCmp/>
        :
        <div className="grid ">
          <div>
            {fusionJson && <ChordCmp watermarkCss={watermarkCss} ref={reference} width={w} data={fusionJson}/>}
          </div>
        </div>
    }
    </>
  )
}
