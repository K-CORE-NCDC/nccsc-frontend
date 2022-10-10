import React, { useState,useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Igv from '../../Common/igv';
import LoaderCmp from '../../Common/Loader';
import { getIgv } from '../../../actions/api_actions'
import NoContentMessage from '../../Common/NoContentComponent'
import { exportComponentAsPNG } from 'react-component-export-image';

// import LoaderCmp from '../../Common/Loader'
import {FormattedMessage} from 'react-intl';

export default function DataIgv({ width,inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const igvJson = useSelector((data) => data.dataVisualizationReducer.igvSummary);
  const [activeCmp,setActiveCmp] = useState(false)
  const [igvLegend,setIgvLegend] = useState("")
  const [loader, setLoader] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")


  useEffect(()=>{
    if(inputData.type !=='' && inputData['genes'].length > 0){
      let dataJson = inputData
      setLoader(true)
      dispatch(getIgv('POST',dataJson))
    }
  },[inputData])

  useEffect(()=>{
    if(igvJson){
      setTimeout(function() {
          setLoader(false)
      }, (1000));
    }
    if(igvJson && igvJson.length > 0){
      setActiveCmp(true)
    }else{
      setActiveCmp(false)
    }
  },[igvJson])


  // useEffect(() => {
  //   setTimeout(function() {
  //       setLoader(false)
  //   }, (10000));
  // }, [igvJson])

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }

    if (watermarkCss !== "" && screenCapture) {
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])


  return (
    <>{
      loader?
      <LoaderCmp/>
      :
      <div>
        {
          activeCmp
          &&
          <>
          <div className="flex flex-row justify-start pl-12 gap-6">
            <div>
              <button className="box-border lg:h-8 xs:h-6 w-20 bg-red-600 border-2 line-through" onClick={()=>setIgvLegend("cn >= 3")}></button>
              <h3><strong className="xs:text-sm sm:text-xl lg:text-2xl">Gain (&gt;=3) </strong></h3>
            </div>
            <div>
              <button className="box-border h-8 xs:h-6 w-20 bg-white border-4" onClick={()=>setIgvLegend("cn = 2")}></button>
              <h3><strong className="xs:text-sm sm:text-xl lg:text-2xl">Normal (=2)</strong></h3>
            </div>
            <div>
              <button className="box-border h-8 xs:h-6 w-20 bg-blue-500 border-4" onClick={()=>setIgvLegend("cn <= 1")}></button>
              <h3><strong className="xs:text-sm sm:text-xl lg:text-2xl">Loss (&lt;=1)</strong></h3>
            </div>
          </div>
          <Igv watermarkCss={watermarkCss} ref={reference} data={igvJson}/>
          </>
        }
        {!activeCmp && <NoContentMessage />}
      </div>
    }
    </>
  )
}
