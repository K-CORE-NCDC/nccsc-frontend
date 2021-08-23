import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'

// import { getLolipopInformation } from '../../../actions/api_actions'

export default function DataSurvival({ width,inputData }) {
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
      <SurvivalCmp width={width} />
    </div>
  )

}
