import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
import { getGenomicInformation } from '../../actions/api_actions'
import chart_types from './genomicCharyTypes'
import LoaderCmp from '../Common/Loader';
import Loader from "react-loader-spinner";


export default function GenomicInfo() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});
  const [loader, setLoader] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenomicInformation("POST",""))
  }, [dispatch])

  let visual_type = {
    "Omics Sample Summary":"Venn",
    "Variant Classification":"Bar",
    "Variant Type":"Bar",
    "CNV Class":"Bar",
    "Top 10 Mutated Genes":"stack_bar",
    "Variant Classification Summary":'box_plot',
    "Variant per Sample":"vertical_stack_bar",
    "Methylation":"vertical_stack_bar",
    "Proteome":"vertical_stack_bar",
    "Phospho":"vertical_stack_bar"
  }

  useEffect(()=>{
    if(summaryJson){
      let html = []
      Object.keys(summaryJson).forEach((item, k) => {
        let type = visual_type[item]
        let comp = ''
        if(item === "dna_per_sample"){
          comp = chart_types(type, summaryJson[item], "x-axis")
        }
        else{
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

      setTimeout(function() {
          setLoader(false)
      }, (1000));
    }
  },[summaryJson])

  return (
    <>
    {
      loader?
        <LoaderCmp />
      :
      <div className="grid grid-cols-3 gap-6 mt-6">
        {state['charts']}
      </div>
    }
    </>
  )
}
