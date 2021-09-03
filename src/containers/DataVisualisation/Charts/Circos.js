import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CircosCmp from '../../Common/Circos'
import { getCircosInformation, getCircosSamplesRnidList } from '../../../actions/api_actions'
import '../../../assets/css/style.css'
import { exportComponentAsPNG } from 'react-component-export-image';

export default function DataCircos({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('')
  const circosJson = useSelector((data) => data.dataVisualizationReducer.circosSummary);
  const circosSanpleRnidListData = useSelector(state => state.dataVisualizationReducer.circosSanpleRnidListData)
  const [sampleListElements, setSampleListElements] = useState([])
  const [displaySamples, setDisplaySamples] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")


  useEffect(() => {
    if (inputData) {
      let editInputData = inputData
      editInputData = { ...editInputData, sampleKey: sampleKey }
      if (editInputData.type !== '') {
        dispatch(getCircosInformation('POST', editInputData))
      }
    }
  }, [inputData, sampleKey])

  useEffect(() => {
    if(inputData && inputData.genes.length > 0) {
      setDisplaySamples(true)
    }else{
      setDisplaySamples(false)
    }
  }, [inputData])

  useEffect(() => {
    if(!circosSanpleRnidListData){
      dispatch(getCircosSamplesRnidList())
    }
  }, [])

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
    if (circosSanpleRnidListData) {
      let sampleListElementsTemp = []
      circosSanpleRnidListData.forEach((element, index) => {
        sampleListElementsTemp.push(
          <option key={element.rn_key} value={element.rn_key}>{element.brst_key}</option>
        )
      })
      setSampleListElements(sampleListElementsTemp)
    }
  }, [circosSanpleRnidListData])

  return (
    <div className="flex-row m-1">
      {displaySamples && <div className="flex-column p-1">
        <label htmlFor="samples">Choose a Sample: </label>

        <select defaultChecked={sampleKey} onChange={e => { setSampleKey(e.target.value) }} name="samples" id="samples">
          {sampleListElements}
        </select>
      </div>}
      <div>
        {circosJson && <CircosCmp watermarkCss={watermarkCss} ref={reference} width={width * 0.8} data={circosJson} />}
      </div>
    </div>
  )

}
