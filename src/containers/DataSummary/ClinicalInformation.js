import React,{useState,useEffect,useRef,useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  UserCircleIcon
} from '@heroicons/react/outline'

import Barchart from '../Common/Barchart'
import { getDashboardDsummaryData } from '../../actions/api_actions'
import inputJson from './data'
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
    if(data && selected){

      Object.keys(data).forEach((item, k) => {
        let t = []
        Object.keys(data[item]).forEach((itm, i) => {
          let check = false
          let color = '#ccc'
          if(ac.indexOf(itm)>-1){
            check = true
            color = inputJson['clinicalColor'][item]
          }
          let id = itm.split(" ").join("")
          t.push(
            <div className="p-3 relative z-10" key={'div_mb_'+i}>
              <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                <div className="ml-3 text-gray-700 w-9/12 text-2xl tracking-wide">
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
          <div key={item+'_'+k} class="tab w-full overflow-hidden border-t" onClick={(e)=>switchButton(e,item,k)}>
            <input class="absolute opacity-0" id={"tab-single-"+k} type="radio" name="tabs2"/>
            <label class="block p-5 leading-normal cursor-pointer" htmlFor={"tab-single-"+k}>
              <UserCircleIcon className="h-8 w-8 inline text-main-blue"/>
              <span class="no-underline  ml-2 text-2xl tracking-wide">{item}</span>
            </label>

              {selected===item ? <div class="tab-content overflow-hidden border-l-2 bg-gray-100  leading-normal relative">
                {t}
              </div>:""}

          </div>

        )
      })
      // console.log(selected);
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
      document.getElementById(id+"_toggle").style.background=inputJson['clinicalColor'][did.getAttribute('data-parent')]
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
              <h2 className="text-3xl tracking-wide">{item}</h2>
              <div class="mt-2 ml-5 p-3">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio" name={"cr_"+k} value="Bar"/>
                  <span class="ml-2">Bar</span>
                </label>
                <label class="inline-flex items-center ml-6">
                  <input type="radio" class="form-radio" name={"cr_"+k} value="Pie"/>
                  <span class="ml-2">Pie</span>
                </label>
              </div>
              <Barchart  id={'chart_'+id}  data={summaryJson[parent_name][item]} width='300' color={inputJson['clinicalColor'][parent_name]}/>
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

  const switchButton = (event,id,k)=>{
    let s = selected
    setSelected(id)

    var myRadios = document.getElementsByName('tabs2');
    var setCheck;
    var x = 0;

    for(x = 0; x < myRadios.length; x++){
      var child_id = myRadios[x].id
      myRadios[x].onclick = function(e){
        if(setCheck != this){
          setCheck = this;
        }else{
          this.checked = false;
          setCheck = null;
        }
      }
    }


  }


  return (
   <div className="grid grid-cols-4 gap-6">
      <div className="bg-white border border-gray-200">
        <div>
        </div>
        <h4 className="p-3"><AdjustmentsIcon className="h-6 w-6 inline"/> &nbsp;Filters</h4>
        <div className="shadow-box shadow-md w-full p-3" id='accordian_tabs' >
          {leftSide['leftSide']}
        </div>
      </div>
      <div className="col-start-2 col-span-4 m-5">
        <div className="grid grid-cols-3 gap-3">
          {leftSide['charts']}
        </div>

      </div>
    </div>
  )
}
