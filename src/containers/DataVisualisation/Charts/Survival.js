import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'


export default function DataSurvival({ width,inputData }) {
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);

  
  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        // dispatch(getLolipopInformation('POST',inputData))
        dispatch(getSurvivalInformation('POST',inputData))
      }
    }
  },[inputData])

  return (
    <div>
      {survivalJson && <SurvivalCmp width={width} survival_data={survivalJson}/>}
    </div>
  )

}
