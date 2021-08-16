import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import HeatmapCmp from '../../Common/Heatmap'

// import { getLolipopInformation } from '../../../actions/api_actions'

export default function DataHeatmap({ width,inputData }) {
  const dispatch = useDispatch()
  // const lolipopJson = useSelector((data) => data.dataVisualizationReducer.lollipopSummary);

  useEffect(()=>{
    // if(inputData){
    //   if(inputData.type !==''){
    //     dispatch(getLolipopInformation('POST',inputData))
    //   }
    // }
  },[inputData])

  return (
    <div>
      <HeatmapCmp width={width} data={lolipopJson}/>
    </div>
  )

}
