import React,{useState,useEffect,useRef,useCallback } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";

import { getGenomicInformation } from '../../../actions/api_actions'
import chart_types from '../genomicCharyTypes';
import inputJson from '../data'
import Filter from './filter'
export default function AdvancedInfo() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenomicInformation())
  }, [dispatch])

  let visual_type = {
    "Variant Classification":"Bar",
    "Variant Type":"Bar",
    "Snv Class":"Bar",
    "dna_mutation_gene":"stack_bar",
    "dna_per_sample":"stack_bar"
  }

  useEffect(()=>{
    if(summaryJson){
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
  },[summaryJson])
  const callback = useCallback((count) => {
    console.log(count);
   // setCount(count);
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
                {state['charts']}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
