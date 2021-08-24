import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'


export default function DataSurvival({ width,inputData }) {
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);
  const [activeCmp,setActiveCmp] = useState(false)

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        dispatch(getSurvivalInformation('POST',inputData))
      }
    }
  },[inputData])

  useEffect(()=>{
    if(survivalJson && 'meta' in survivalJson){
      setActiveCmp(true)

    }
  },[survivalJson])

  return (
    <div>
      {activeCmp && <SurvivalCmp width={width} survival_data={survivalJson}/>}
    </div>
  )

}
