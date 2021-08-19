import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from '../../Common/Volcano'

import { getVolcanoPlotInfo } from '../../../actions/api_actions'

export default function DataVolcono({ width, inputData, filter }) {
  const dispatch = useDispatch()
  // const lolipopJson = useSelector((data) => data.dataVisualizationReducer.lollipopSummary);
  const volcanoJson = useSelector((data) => data.dataVisualizationReducer.volcanoSummary);

  useEffect(()=>{
    if(inputData){
      if(filter != null){
        inputData['filter'] = JSON.stringify(filter)
      }
      if(inputData.type !==''){
        dispatch(getVolcanoPlotInfo('POST',inputData))
      }
    }
  },[inputData])

  return (
    <div>
      <VolcanoCmp w={width} data={volcanoJson}/>
    </div>
  )

}
