import React,{useState,useEffect,useRef,useCallback,usePrevious } from "react";
import { GenomicInformation } from '../../../actions/api_actions'
import chart_types from '../genomicCharyTypes';
import Filter from './filter'

export default function AdvancedInfo() {
  const [state, setState] = useState([]);
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
    "Variant Per Sample":"stack_bar",
    "Variant Classification Summary":'box_plot',
    "Variant per Sample":"vertical_stack_bar"
  }

  useEffect(()=>{
    if(summaryJsonStatus === 200 && summaryJson){
      let html = []
      Object.keys(summaryJson).forEach((item, k) => {
        let type = visual_type[item]
        let comp = ''
        comp = chart_types(type, summaryJson[item], visual_type[item])

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
      setState(html)
    }
  },[summaryJson,summaryJsonStatus])

  const callback = useCallback((filters) => {
    let data_ = {'filter':filters}
    setState([])
    GenomicInformation('POST',data_)
  }, []);


  return (
    <div className="header">
      <div className="mx-auto rounded overflow-hidden ">
        <div id="main_div">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200">
              <Filter parentCallback={callback}/>
            </div>
            <div className="col-start-2 col-span-3 pt-4 overflow-auto ">
              <div className="grid grid-cols-3 gap-1">
                {state}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
