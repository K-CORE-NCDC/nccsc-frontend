import React, { useState,useEffect,Fragment } from 'react'
import * as d3 from 'd3'
import {scaleSequential} from 'd3-scale'
import Clustergrammer from 'react-clustergrammer';
import '../../styles/clustergram.css'

export default function HeatmapCmp({ width,data }) {
  const [heatmapData, setHeatmapData] = useState({});
  const [active, activeState] = useState(false);

  useEffect(()=>{
    if(data && Object.keys(data).length > 0){
      setHeatmapData(data)
      activeState(true)
    }else{
      setHeatmapData({})
      activeState(false)
    }
  },[data])



  return (
    <>
      {active  &&
        // <div id='heatmap' className='p-3' style={{"width":width+"px","height":"500px"}}>
          <Clustergrammer
            network_data={heatmapData}
            width={width-100}
            height={window.innerHeight}
          />
        // </div>
      }
    </>
  )
}
