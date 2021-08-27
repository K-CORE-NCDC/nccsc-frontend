import React, { useState,useEffect,Fragment } from 'react'
import * as d3 from 'd3'
import {scaleSequential} from 'd3-scale'
import Clustergrammer from 'react-clustergrammer';
import '../../styles/clustergram.css'

const HeatmapCmp = React.forwardRef(({ width, data, watermarkCss }, ref) => {
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
        <div ref={ref} className="watermarkCss">
          <Clustergrammer
            network_data={heatmapData}
            width={width-100}
            height={window.innerHeight}
          />
        </div>
      }
    </>
  )
})

export default HeatmapCmp