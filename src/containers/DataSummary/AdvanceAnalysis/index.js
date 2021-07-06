import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
// import Barchart from '../Common/Barchart';

// import BarChartComp from '../Common/HorizontalBarchart';
// import BarChartComp from "../../Common/HorizontalBarChart"
// import Piechart from '../../Common/Piechart'
// import StackedBarChart from '../../Common/StackedBarChart'
// import CircosCmp from '../Common/Circos'
// import VennCmp from '../.../Common/Venn';
// import VolcanoCmp from '../../Common/Volcano';
// import { dispatch } from "d3-dispatch";
import AccordionComp from "./Components/Accordion/";
import { getGenomicInformation } from '../../../actions/api_actions'
import chart_types from '../genomicCharyTypes';
import "../../../index.css"

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
    "snv_type":"Bar",
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

  return (
    <div className="header">
      <div className="container mx-auto rounded overflow-hidden shadow-lg border border-blue-500">
        <div id="main_div">
          <div className="px-7 grid grid-cols-10 py-8  border-r-2 border-l-2 border-b-2 border-gray-300">
            <div className="col-span-1 pl-4">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2 text-md font-bold text-gray-500 leading-tight">Total</span>
              </label>
            </div>
            <div className="col-span-1">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2   font-bold text-gray-500 leading-tight">Breast Cancer</span>
              </label>
            </div>
            <div className="col-span-1">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2  font-bold text-gray-500 leading-tight">Stomach Cancer</span>
              </label>
            </div>
            <div className="col-span-1">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2  font-bold text-gray-500 leading-tight">Bile Duct Cancer</span>
              </label>
            </div>
            <div className="col-span-1">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2  font-bold text-gray-500 leading-tight">Uterine Cancer</span>
              </label>
            </div>
            <div className="col-span-1">
              <label class="inline-flex items-center">
                <input type="checkbox" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2  font-bold text-gray-500 leading-tight">Brain Cancer</span>
              </label>
            </div>
            <div className="col-span-1">
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2  font-bold text-gray-500 leading-tight">Renel Cancer</span>
              </label>
            </div>
            <div className="col-span-1">
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2  font-bold text-gray-500 leading-tight">Prostate Cancer</span>
              </label>
            </div>
            <div className="col-span-2">
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="accountType" value="personal"/>
                <span class="ml-2  font-bold text-gray-500 leading-tight">head and Neck Cancer</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-10">
            <div className="col-span-3 border border-r-2">
              <div className="grid grid-cols-2 py-3 pb-3">
                <div className="py-3 px-2">
                  <button class="bg-white hover:bg-blue-700  w-40 h-10 hover:text-white mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded">
                    Reset
                  </button>
                </div>
                <div className="py-3">
                  <button class="bg-blue-500 hover:bg-blue-700 mb-3 w-40 h-10 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    Search
                  </button>
                </div>
                <div className="col-span-2">
                  <AccordionComp/>
                </div>
              </div>
            </div>
            <div className="col-span-7 pt-4 overflow-auto h-3/5">
              <div className="grid grid-cols-2 gap-1">
                {state['charts']}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
