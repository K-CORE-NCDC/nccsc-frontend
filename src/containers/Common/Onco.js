import { element } from 'prop-types';
import React, { useState,useEffect } from 'react'
import {OncoPrint} from 'react-oncoprint'
import OncoPrintCustom  from './oncoprint/OncoPrint'

export default function OncoCmp({ width,data }) {
  // console.log('daata')
  const [state, setState] = useState([]);
  const [colorScale, setColorScale] = useState({})


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(()=>{
    if(data.length>0){
    //   const d = [{
    //   "gene":"gloabal_mutation",
    //   "type":"train_shift_del",
    //   "sample":"RN9808080",
    //   "alteration":"gloabal_mutation"
    //   },
      let colorScaleData = {}
      data.forEach(element =>{
        colorScaleData = {...colorScaleData, [element.alteration]: {colorHTML: getRandomColor(), displayName: element.type}}
      })

      setColorScale(colorScaleData)
      setState(data)
    }
  },[data])



  return (
    <div className='onco' id='onco' style={{width:width+'px'}}>
      {Object.keys(colorScale).length > 0 && <OncoPrintCustom width={width} showlegend={true} showoverview={true} SupportedEvents={colorScale} colorccale={colorScale} data={state}/>}
    </div>
  )
}
