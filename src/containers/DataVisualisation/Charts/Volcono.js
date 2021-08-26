import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from '../../Common/Volcano'

import { getVolcanoPlotInfo } from '../../../actions/api_actions'

export default function DataVolcono({ width, inputData }) {
  const dispatch = useDispatch()
  const volcanoJson = useSelector((data) => data.dataVisualizationReducer.volcanoSummary);
  const [activeCmp,setActiveCmp] = useState(false)

  useEffect(()=>{
    if(inputData){
      setActiveCmp(false)
      if(inputData.type !==''){
        dispatch(getVolcanoPlotInfo('POST',inputData))
      }
    }
  },[inputData])

  useEffect(()=>{
    if(volcanoJson){
      setActiveCmp(true)
    }
  },[volcanoJson])

  return (
    <div>
      {activeCmp && <VolcanoCmp w={width} data={volcanoJson}/>}
    </div>
  )

}
