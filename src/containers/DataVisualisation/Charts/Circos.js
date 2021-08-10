import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CircosCmp from '../../Common/Circos'
import { getCircosInformation } from '../../../actions/api_actions'

export default function DataCircos({ width,inputData }) {
  const dispatch = useDispatch()
  const circosJson = useSelector((data) => data.dataVisualizationReducer.circosSummary);

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        dispatch(getCircosInformation('POST',inputData))
      }
    }
  },[inputData])

  return (
    <div>
      {circosJson && <CircosCmp width={width} data={circosJson}/>}
    </div>
  )

}
