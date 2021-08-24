import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
import Barchart from '../Common/Barchart';

// import BarChartComp from '../Common/HorizontalBarchart';
import BarChartComp from "../Common/HorizontalBarChart"
import Piechart from '../Common/Piechart'
import StackedBarChart from '../Common/StackedBarChart'
// import CircosCmp from '../Common/Circos'
import VennCmp from '../Common/Venn'
import VolcanoCmp from '../Common/Volcano'
// import { dispatch } from "d3-dispatch";
import { getGenomicInformation } from '../../actions/api_actions'

import chart_types from './genomicCharyTypes'


export default function GenomicInfo() {
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
    "Top 10 Mutated Genes":"stack_bar",
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

  return (

    <div className="grid grid-cols-3 gap-6">
      {state['charts']}
    </div>

  )
}
