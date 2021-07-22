import React, { useState,useEffect } from 'react'
import {OncoPrint} from 'react-oncoprint'

export default function OncoCmp({ width,data }) {
  const [state, setState] = useState([]);
  useEffect(()=>{
   //  const data = [
   //   {
   //     sample: 'TCGA-25-2392-01',
   //     gene: 'TP53',
   //     alteration: 'FUSION',
   //     type: 'FUSION',
   //   },
   //   {
   //     sample: 'TCGA-25-2393-01',
   //     gene: 'TP53',
   //     alteration: 'FUSION',
   //     type: 'FUSION',
   //   },
   //   // ...
   // ];
   console.log(data);
   setState(data)
 },[data])
  return (
    <div className='onco' id='onco' style={{"width":width+"px"}}>
      <OncoPrint data={state}/>
    </div>
  )
}
