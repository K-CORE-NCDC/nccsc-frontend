import React,{useState,useEffect,useRef,useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'

import Barchart from '../Common/Barchart'
import { getDashboardDsummaryData } from '../../actions/api_actions'
import clinicalColor from './data'
export default function ClinicalInformation() {
  const summaryJson = useSelector((data) => data.homeReducer.dataSummary);
  const [leftSide, setLeftSide] = useState({"charts":[],"leftSide":[],"activeCharts":[]});
  const [activeChartsList, setActiveChartsList] = useState([]);

  const [selected, setSelected] = useState('Basic/Diagnostic Information');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDashboardDsummaryData())
  }, [dispatch])

  useEffect(()=>{
    if(summaryJson){
      leftSideHtml(summaryJson)


    }
  },[summaryJson])

  useEffect(()=>{
    leftSideHtml(summaryJson)

  },[selected])



  const leftSideHtml = (data)=>{

    let ac = leftSide['activeCharts']
    let tmp = []
    if(data){
      Object.keys(data).forEach((item, k) => {
        let t = []
        Object.keys(data[item]).forEach((itm, i) => {
          let check = false
          let color = '#ccc'
          if(ac.indexOf(itm)>-1){
            check = true
            color = clinicalColor[item]
          }
          let id = itm.split(" ").join("")
          t.push(
            <div className="mb-3" key={'div_mb_'+i}>
              <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                <div className="ml-3 text-gray-700 w-80">
                  {itm}
                </div>
                <div className="relative" id={'div_'+id}  onClick={e=>checkBoxFn(e,'md_'+i,itm)}>
                  <input type="checkbox" id={'md_'+i} checked={check} data-parent={item}   className="checkbox sr-only" onChange={e=>checkBoxFn(e,'md_'+i,itm)}/>
                  <div className="block bg-gray-600 w-14 h-6 rounded-full" id={'md_'+i+'_toggle'} style={{backgroundColor:color}}></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white" style={{backgroundColor:'#fff'}}></div>
                </div>
              </label>
            </div>
          )
        })
        tmp.push(
          <li key={'li_'+k} className={selected===item?"relative bg-kramp-100 bg-tab border-b border-gray-200 rounded":"relative border-b border-gray-200 "}>
            <button type="button" className={selected===item?"w-full p-3 text-left border-b border-gray-200 focus:outline-none":"w-full p-3 text-left focus:outline-none"}  onClick={(e)=>switchButton(e,item)}>
              <div className="flex items-center justify-between">
                <span>{item}</span>
                {selected===item ? <ChevronDownIcon className="h-6 w-6" aria-hidden="true"/>:<ChevronUpIcon className="h-6 w-6" aria-hidden="true"/>}
              </div>
            </button>
            {selected===item ?
              <div className="relative overflow-hidden grid grid-cols-1 py-5">
                {t}
              </div>
            :''}
          </li>
        )
      })
      setLeftSide((prevState)=>({
        ...prevState,
        'leftSide':tmp
      }))
    }
  }


  const checkBoxFn = (event,id,chart)=>{
    let tmp = activeChartsList
    var did = document.getElementById(id)

    var checkbox_elm = document.getElementById(id).checked;
    if(checkbox_elm){
      document.getElementById(id).checked=false
      document.getElementById(id+"_toggle").style.background='#ccc'
      let indx = tmp.indexOf(chart)
      if(indx>-1){
        tmp.splice(indx,1)
      }
    }else{
      document.getElementById(id).checked=true
      document.getElementById(id+"_toggle").style.background=clinicalColor[did.getAttribute('data-parent')]
      if(!tmp.includes(chart)){
        tmp.push(chart)
      }
    }
    setActiveChartsList(tmp)
    loadChart(chart,did.getAttribute('data-parent'))
  }

  const loadChart = (chart,parent_name)=>{
    let tmp = leftSide['charts']
    let ac = leftSide['activeCharts']
    let check = true

    for (var i = 0; i < tmp.length; i++) {
      if(tmp[i].key==="chart_"+chart) {
        tmp.splice(i,1)
        check = false
        ac.splice(i,1)
      }
    }

    if(check){
      Object.keys(summaryJson[parent_name]).forEach((item, k) => {
        let id = item.split(" ").join("")
        if(item===chart){
          tmp.push(
            <div key={'chart_'+item} className='max-w bg-white rounded overflow-hidden shadow-lg px-4 py-3 mb-5 mx-3 card-border'>
              <h2 className="text-xl">{item}</h2>
              <Barchart  id={'chart_'+id}  data={summaryJson[parent_name][item]} width='300' color={clinicalColor[parent_name]}/>
            </div>
          )
          ac.push(item)
        }
      })
    }
    setLeftSide((prevState)=>({
      ...prevState,
      'charts':tmp,
      'activeCharts':ac
    }))
    // setActiveCharts(ac)
  }

  const switchButton = (event,id)=>{
    // console.log(event,id);
    let s = selected
    if (s===id){
      setSelected('')
    }else{
      setSelected(id)
    }
  }


  return (
   <div className="grid grid-cols-4 gap-3">
      <div className="bg-white max-w-xl  border border-gray-200">
        <div>
        </div>
        <h4 className="p-3"><AdjustmentsIcon className="h-6 w-6 inline"/> &nbsp;Filters</h4>
        <ul className="shadow-box w-100 p-3" id='accordian_tabs' >
          {leftSide['leftSide']}
        </ul>
      </div>
      <div className="col-start-2 col-span-3 m-5">
        <div className="grid grid-cols-4 sm:grid-cols-3 gap-3">
          {leftSide['charts']}
        </div>

      </div>
    </div>
  )
}
