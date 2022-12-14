import React, { useState,useEffect,Fragment } from 'react'
import * as d3 from 'd3'
import {scaleSequential} from 'd3-scale'
// import Clustergrammer from 'react-clustergrammer';
import CanvasXpressReact from 'canvasxpress-react';
import '../../styles/clustergram.css'

const HeatmapCmp = React.forwardRef(({ width, data, watermarkCss }, ref) => {
  const [heatmapData, setHeatmapData] = useState({});
  const [active, activeState] = useState(false);
  const [heatData,setHeatData] = useState()

  let target = "canvas";

  let data_ = data

  let config = {
      "colorSpectrum": ["navy","white","firebrick3"],
      "graphType": "Heatmap",
      "heatmapCellBoxColor": "rgb(255,255,255)",
      "samplesClustered": true,
      "showTransition": false,
      "title": "Clustered data",
      "variablesClustered": true
  }

  useEffect(()=>{
    if(data){
      activeState(true)
      setHeatData(data)
    }
    // if(data && Object.keys(data).length > 0){
    //   setHeatmapData(data)
    // }else{
    //   setHeatmapData({})
    //   activeState(false)
    // }
  },[data])

  // useEffect(()=>{
  // },[heatData])

  return (
    <>
      {active  &&
        <div ref={ref} className="watermarkCss">
          heatData && <CanvasXpressReact target={target} data={data_} config={config} width={500} height={500} />
        </div>
      }
    </>
  )
})

export default HeatmapCmp
