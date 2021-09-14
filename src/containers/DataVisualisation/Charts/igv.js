import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Igv from '../../Common/igv';
import LoaderCmp from '../../Common/Loader';
import { getIgv } from '../../../actions/api_actions'
// import { exportComponentAsPNG } from 'react-component-export-image';

// import LoaderCmp from '../../Common/Loader'

export default function DataIgv({ width,inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const dispatch = useDispatch()
  const igvJson = useSelector((data) => data.dataVisualizationReducer.igvSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    if(inputData.type !==''){
      let dataJson = inputData
      setLoader(true)
      dispatch(getIgv('POST',dataJson))
    }
  },[inputData])

  useEffect(()=>{
    if(igvJson){
      setActiveCmp(true)
      setTimeout(function() {
          setLoader(false)
      }, (10000));
    }
  },[igvJson])


  // useEffect(() => {
  //   setTimeout(function() {
  //       setLoader(false)
  //   }, (10000));
  // }, [igvJson])



  return (
    <>{
      loader?
      <LoaderCmp/>
      :
      <div>
        {activeCmp && <Igv data={igvJson}/>}
      </div>
    }
    </>
  )
}
