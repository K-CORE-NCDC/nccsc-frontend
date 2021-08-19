import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import HeatmapCmp from '../../Common/Heatmap'

import { getHeatmapInformation } from '../../../actions/api_actions'

export default function DataHeatmap({ width,inputData, filter }) {
  const dispatch = useDispatch()
  const heatmapJson = useSelector((data) => data.dataVisualizationReducer.heatmapSummary);

  useEffect(()=>{
    if(inputData){
      
      if(filter != null){
        inputData['filter'] = JSON.stringify(filter)
      }
      if(inputData.type !==''){
        dispatch(getHeatmapInformation('POST',inputData))
      }
    }
  },[inputData])

  return (
    <div>
      {heatmapJson && <HeatmapCmp width={width} data={heatmapJson}/>}
    </div>
  )

}
