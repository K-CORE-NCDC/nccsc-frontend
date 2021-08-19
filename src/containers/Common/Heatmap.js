import React, { useState,useEffect } from 'react'
import * as d3 from 'd3'
import {scaleSequential} from 'd3-scale'
import Clustergrammer from 'react-clustergrammer';
import '../../styles/clustergram.css'


export default function HeatmapCmp({ width,data }) {
  const [state, setState] = useState({});
  const [active, activeState] = useState(false);

  useEffect(()=>{
    if(data){
      setState(data)
    }
  },[data])

  useEffect(()=>{
    if(state){
      activeState(true)
    }
  },[state])

  return (

    <div id='heatmap' className='p-3' style={{"width":width+"px","height":"500px"}}>
      {active  &&
        <Clustergrammer
          network_data={state}
          width={width-100}
          height={window.innerHeight}
        />}
    </div>


  )
}
