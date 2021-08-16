import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import LollipopCmp from '../../Common/Lollipop'
import { getLolipopInformation } from '../../../actions/api_actions'

export default function DataLolipop({ width,inputData }) {
  const dispatch = useDispatch()
  const lolipopJson = useSelector((data) => data.dataVisualizationReducer.lollipopSummary);

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        dispatch(getLolipopInformation('POST',inputData))
      }
    }
  },[inputData])

  return (
    <div>
      {lolipopJson && <LollipopCmp width={width} data={lolipopJson}/>}
    </div>
  )

}
