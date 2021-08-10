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
    if(data){
      const d = data
      let colorScaleData = {}
      d.forEach(element =>{
        colorScaleData = {...colorScaleData, [element.alteration]: {colorHTML: getRandomColor(), displayName: element.type}}
      })

      setColorScale(colorScaleData)
      setState(d)
    }
  },[data])



  return (
    <div className='onco' id='onco' style={{width:width+'px'}}>
      {Object.keys(colorScale).length > 0 && <OncoPrintCustom width={width} SupportedEvents={colorScale} colorccale={colorScale} data={state}/>}
    </div>
  )
}
