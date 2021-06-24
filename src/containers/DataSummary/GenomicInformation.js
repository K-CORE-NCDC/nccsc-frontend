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


export default function GenomicInfo() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenomicInformation())
  }, [dispatch])

  useEffect(()=>{
    if(summaryJson){
      let html = []
      Object.keys(summaryJson).forEach((item, k) => {
        html.push(
          <div key={'omics_'+k} className='max-w bg-white rounded overflow-hidden shadow-lg px-4 py-3 mb-5 mx-3 card-border'>
            <div className="px-6 py-4">
              <div className="font-bold text-md mb-2">{item}</div>
            </div>
            <div className="px-6 pt-4 pb-4">
              <BarChartComp data={summaryJson[item]}/>
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
      <div className="grid grid-cols-3 gap-1">
        {state['charts']}
      </div>
    </div>
  )
}
