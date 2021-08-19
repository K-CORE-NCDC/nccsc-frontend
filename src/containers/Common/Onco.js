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
      // const d = data['dna_mutation']
      // const d = data
      const d = [
      {
          "gene": "PTEN",
          "type": "Frame_Shift_Del",
          "sample": "RN57508938",
          "alteration": "PTEN"
      },
      {
          "gene": "PTEN",
          "type": "Missense_Mutation",
          "sample": "RN37312101",
          "alteration": "PTEN"
      },
      {
          "gene": "TP53",
          "type": "Frame_Shift_Del",
          "sample": "RN02202045",
          "alteration": "TP53"
      },
      {
          "gene": "TP53",
          "type": "Missense_Mutation",
          "sample": "RN37312989",
          "alteration": "TP53"
      },
      {
          "gene": "TP53",
          "type": "Missense_Mutation",
          "sample": "RN44439642",
          "alteration": "TP53"
      }
    ]
    //   const d = [{
    //   "gene":"gloabal_mutation",
    //   "type":"train_shift_del",
    //   "sample":"RN9808080",
    //   "alteration":"gloabal_mutation"
    //   },
    //   {
    //   "gene":"missense_mutation",
    //   "type":"Frame_Shift_Ins",
    //   "sample":"RN9808080",
    //   "alteration":"missense_mutation"
    // },
    //   {
    //   "gene":"gloabal_mutation",
    //   "type":"train_shift_del",
    //   "sample":"RN57508938",
    //   "alteration":"gloabal_mutation"
    // }
    // ]
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
