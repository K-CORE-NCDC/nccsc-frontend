import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import OncoCmp from '../../Common/Onco'
import { getOncoInformation } from '../../../actions/api_actions'

export default function DataOnco({ width,inputData }) {
  const dispatch = useDispatch()
  const oncoJson = useSelector((data) => data.dataVisualizationReducer.oncoSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [chartData,setChartData] = useState({})

  useEffect(()=>{
    if(inputData){
      if(inputData.type !==''){
        dispatch(getOncoInformation('POST',inputData))
        setActiveCmp(false)
      }
    }

  },[inputData])

  useEffect(()=>{
    if(oncoJson){
      setChartData((prevState) => ({...prevState,...oncoJson }))
    }
  },[oncoJson])

  useEffect(()=>{
    if(chartData){
      setActiveCmp(true)
    }
  },[chartData])


  return (
    <div>
      {activeCmp && <OncoCmp width={width} data={chartData}/>}
    </div>
  )

}
