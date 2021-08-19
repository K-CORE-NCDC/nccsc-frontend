import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import OncoCmp from '../../Common/Onco'
import { getOncoInformation } from '../../../actions/api_actions'

export default function DataOnco({ width,inputData }) {
  const dispatch = useDispatch()
  const oncoJson = useSelector((data) => data.dataVisualizationReducer.oncoSummary);

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        dispatch(getOncoInformation('POST',inputData))
      }
    }
  },[inputData])

  return (
    <div>
      {oncoJson && <OncoCmp width={width} data={oncoJson}/>}
    </div>
  )

}
