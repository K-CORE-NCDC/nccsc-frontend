import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from '../../Common/Volcano'

// import { getLolipopInformation } from '../../../actions/api_actions'

export default function DataVolcono({ width,inputData }) {
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
      <VolcanoCmp width={width} data={lolipopJson}/>
    </div>
  )

}
