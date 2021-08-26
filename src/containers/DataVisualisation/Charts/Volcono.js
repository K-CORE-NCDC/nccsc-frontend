import React, { useState,useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from '../../Common/Volcano'

import { getVolcanoPlotInfo } from '../../../actions/api_actions'

export default function DataVolcono({ width, inputData }) {
  const dispatch = useDispatch()
  const volcanoJson = useSelector((data) => data.dataVisualizationReducer.volcanoSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [comp,setComp] = useState([])
  // const didMountRef = useRef(false)
  const [data_, setData] = useState('')

  useEffect(()=>{
    if(inputData){
      setActiveCmp(false)
      if(inputData.type !==''){
        dispatch(getVolcanoPlotInfo('POST',inputData))
      }
    }
  },[inputData])

  useEffect(()=>{
    if(volcanoJson){
      if(Object.keys(volcanoJson).length>0){
          setActiveCmp(true)
          setData(volcanoJson)
      }
    }
  },[volcanoJson])

  // console.log(data_)
  // console.log(volcanoJson);
  // console.log(inputData)

  return (
    <Fragment>
        {(volcanoJson && Object.keys(volcanoJson).length>0) && <VolcanoCmp w={width} data={volcanoJson}/>}
    </Fragment>
  )

}
