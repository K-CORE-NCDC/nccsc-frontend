import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CircosCmp from '../../Common/Circos'
import { getCircosInformation } from '../../../actions/api_actions'
import '../../../assets/css/style.css'

export default function DataCircos({ width, inputData }) {
  const dispatch = useDispatch()
  const [sampleKey, setSampleKey] = useState('brst_006')
  console.log(sampleKey)
  const circosJson = useSelector((data) => data.dataVisualizationReducer.circosSummary);
  console.log(sampleKey)
  const sampleList = ["brst_006", "brst_018", "brst_061", "brst_069", "brst_087"]
  let sampleListElements = []
  sampleList.forEach((element, index) => {
    sampleListElements.push(
      <option key={element} value={element}>{element}</option>
    )
  })

  console.log(inputData)
  useEffect(() => {
    if (inputData) {
      let editInputData = inputData
      editInputData = { ...editInputData, sampleKey: sampleKey }
      if (editInputData.type !== '') {
        dispatch(getCircosInformation('POST', editInputData))
      }
    }
  }, [inputData, sampleKey])

  return (
    <div className="flex-row m-1">
      <div className="flex-column p-1">
        <label htmlFor="samples">Choose a Sample: </label>

        <select defaultChecked={sampleKey} onChange={e=>{setSampleKey(e.target.value)}} name="samples" id="samples">
          {sampleListElements}
        </select>
      </div>
      <div>
        {circosJson && <CircosCmp width={width * 0.8} data={circosJson} />}
      </div>
    </div>
  )

}
