import React,{useState,useEffect,useRef } from "react";
import { GenomicInformation } from '../../actions/api_actions'
import chart_types from './genomicCharyTypes'


export default function GenomicInfo() {
  const [state, setState] = useState({"charts":[]});
  const [summaryJson, setSummaryJson] = useState({})
  const [summaryJsonStatus, setSummaryJsonStatus] = useState(204)

  useEffect(()=>{
    let data = GenomicInformation('POST','')
    data.then((result)=>{
      if(result.status === 200)
      {
        setSummaryJson(result.data)
        setSummaryJsonStatus(200)
      }
      else{
        setSummaryJson({})
        setSummaryJsonStatus(204)
      }
    })
  },[])
  let visual_type = {
    "Variant Classification":"Bar",
    "Variant Type":"Bar",
    "Snv Class":"Bar",
    "Top 10 Mutated Genes":"stack_bar",
    "Variant Classification Summary":'box_plot',
    "Variant per Sample":"vertical_stack_bar"
  }


  useEffect(()=>{
     if(summaryJsonStatus === 200 && summaryJson){
      let html = []
      Object.keys(summaryJson).forEach((item, k) => {
        let type = visual_type[item]
        let comp = ''
        if(item === "dna_per_sample"){
          comp = chart_types(type, summaryJson[item], "x-axis")
        }else{
          comp = chart_types(type, summaryJson[item],'')
        }

        html.push(
          <div key={'omics_'+k} className='max-w bg-white rounded overflow-hidden shadow-lg px-4 py-3 mb-5 mx-3 card-border'>
            <div className="px-6 py-4">
              <div className="font-bold text-md mb-2">{item}</div>
            </div>
            <div className="px-6 pt-4 pb-4">
              {comp}
            </div>
          </div>
        )
      })
      setState((prevState)=>({
        ...prevState,
        'charts':html
      }))
    }
  },[summaryJson,summaryJsonStatus])

  return (
    <div className="grid grid-cols-3 gap-6">
      {state['charts']}
    </div>

  )
}
