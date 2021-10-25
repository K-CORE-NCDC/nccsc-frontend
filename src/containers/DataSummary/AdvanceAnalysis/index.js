import React,{useState,useEffect,useRef,useCallback,usePrevious } from "react";
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
import VennCmp from '../../Common/Venn'
// import Loader from "react-loader-spinner";
import LoaderCmp from '../../Common/Loader';

export default function AdvancedInfo() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [filterState,setFilterState] = useState({})
  const [state, setState] = useState([]);
  const [data, setData] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch()
  const prevCountRef = useRef();
  const [loader, setLoader] = useState(true)
  const [reset, setReset] = useState("")
  // const [previousSelection,setPreviousSelection] = useState({});

  useEffect(() => {
    dispatch(getGenomicInformation("POST",""))
  }, [dispatch])

  let visual_type = {
    "Variant Classification":"Bar",
    "Variant Type":"Bar",
    "Snv Class":"Bar",
    "Top 10 Mutated Genes":"stack_bar",
    "Variant Per Sample":"stack_bar",
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
        if(item === "Venn") {
          return
        }
        let comp = ''
        comp = chart_types(type, summaryJson[item], visual_type[item])
        if (item !== "Omics Sample Summary"){
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
        }
      })
      setState(html)
      setTimeout(function() {
          setLoader(false)
      }, (1000));
    }
  },[summaryJson])

  const callback = useCallback((filters,selected) => {
    setState([])

    if(filters){
      setLoader(true)
      let data_ = {'filter':filters}
      dispatch(getGenomicInformation("POST", data_))
    }else{
      setLoader(true)
      dispatch(getGenomicInformation("POST", ""))
    }
  }, []);

  // console.log("---->",previousSelection)
  // useEffect(()=>{
  // },[loader])

  // console.log(loader)

  return (
    <div className="header">
      <div className="mx-auto rounded overflow-hidden ">
        <div id="main_div">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200">
              <Filter parentCallback={callback}/>
            </div>
            <div className="col-start-2 col-span-3 pt-4 overflow-auto ">
            {
              loader?<LoaderCmp/>:
              <div className="grid grid-cols-3 gap-1">
                    {state}
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
