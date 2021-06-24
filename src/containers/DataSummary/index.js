import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
import Barchart from '../Common/Barchart'
import Piechart from '../Common/Piechart'
import StackedBarChart from '../Common/StackedBarChart'
// import CircosCmp from '../Common/Circos'
import VennCmp from '../Common/Venn'
import VolcanoCmp from '../Common/Volcano'
// import { dispatch } from "d3-dispatch";
import { getDashboardDsummaryData } from '../../actions/api_actions'

import GenomicInfo from "./GenomicInformation"


export default function DataSummary() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.dataSummary);
  const [leftSide, setLeftSide] = useState({"charts":[],"leftSide":[]});
  const [activeChartsList, setActiveChartsList] = useState([]);
  const [activeCharts, setActiveCharts] = useState([]);
  const [selected, setSelected] = useState('');
  const [divWidth, setdivWidth] = useState('');
  const [divWidth1, setdivWidth1] = useState('');

  const parentRef = useRef(null);
  const parentRef1 = useRef(null);

  const dispatch = useDispatch()
  useEffect(() => {
    if(parentRef.current){
      let parentWidth  = parentRef.current.offsetWidth;
      setdivWidth(parentWidth)
    }
    if(parentRef1.current){
      let parentWidth  = parentRef1.current.offsetWidth;
      setdivWidth1(parentWidth)
    }
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
    // let lt = leftSide
    // lt['leftSide'] = []
    let tmp = []
    if(data){
      Object.keys(data).forEach((item, k) => {
        let t = []
        Object.keys(data[item]).forEach((itm, i) => {
          t.push(
            <div className="mb-3" key={'div_mb_'+i}>
              <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                <div className="ml-3 text-gray-700 w-80">
                  {itm}
                </div>
                <div className="relative" onClick={e=>checkBoxFn(e,'md_'+i,itm)}>
                  <input type="checkbox" id={'md_'+i} data-parent={item}  className="checkbox sr-only" />
                  <div className="block bg-gray-600 w-14 h-6 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition"></div>
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
      // lt['leftSide'].push(tmp)
      // console.log(lt);
      setLeftSide((prevState)=>({
        ...prevState,
        'leftSide':tmp
      }))
    }
  }




  const toggleTab = (event)=>{
    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("a");
    tabTogglers.forEach(function(toggler) {
      toggler.addEventListener("click", function(e) {
        e.preventDefault();

        let tabName = this.getAttribute("href");

        let tabContents = document.querySelector("#tab-contents");

        for (let i = 0; i < tabContents.children.length; i++) {

          tabTogglers[i].parentElement.classList.remove("border-blue-400", "border-b",  "-mb-px", "opacity-100");  tabContents.children[i].classList.remove("hidden");
          if ("#" + tabContents.children[i].id === tabName) {
            continue;
          }
          tabContents.children[i].classList.add("hidden");

        }
        e.target.parentElement.classList.add("border-blue-400", "border-b-4", "-mb-px", "opacity-100");
      })
    })
  }

  const checkBoxFn = (event,id,chart)=>{
    let tmp = activeChartsList
    var did = document.getElementById(id)
    var checkbox_elm = document.getElementById(id).checked;
    if(checkbox_elm){
      document.getElementById(id).checked=false
      let indx = tmp.indexOf(chart)
      if(indx>-1){
        tmp.splice(indx,1)
      }
    }else{
      document.getElementById(id).checked=true
      if(!tmp.includes(chart)){
        tmp.push(chart)
      }
    }
    setActiveChartsList(tmp)
    loadChart(chart,did.getAttribute('data-parent'))
  }

  const loadChart = (chart,parent_name)=>{
    let tmp = leftSide['charts']
    // console.log("---->",tmp)
    let check = true
    for (var i = 0; i < tmp.length; i++) {
      if(tmp[i].key==="chart_"+chart) {
        tmp.splice(i,1)
        check = false
      }
    }
    if(check){
       console.log("---->",summaryJson[parent_name])
      Object.keys(summaryJson[parent_name]).forEach((item, k) => {
        if(item===chart){
          tmp.push(
            <div key={'chart_'+item} className='max-w-sm bg-white rounded overflow-hidden shadow-lg'>
              <Barchart  id={'chart_'+k} data={summaryJson[parent_name][item]} width='300'/>
            </div>
          )
        }
      })
    }
    setLeftSide((prevState)=>({
      ...prevState,
      'charts':tmp
    }))
    // console.log(tmp);
    // setActiveCharts(tmp)
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
    <div className="header py-5">
      <section className="pt-5 relative pt-11 items-center  bg-cover bg-center bg-website-bg  justify-center">
        <nav className="bg-white px-8 pt-2 shadow-md">
          <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " onClick={toggleTab}>
            <li className="px-4 py-2  font-semibold opacity-50 border-b-4 -mb-px border-blue-400 rounded-t opacity-100">
              <a id="default-tab" href="#first" >Clinical Information</a>
            </li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50"><a href="#second">Genomic Information</a></li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50"><a href="#third">Advanced Information</a></li>
          </ul>
        </nav>

      </section>
      <section className="bg-website-bg ">
        <div id="tab-contents">
          <div id="first" className="grid grid-cols-4 gap-3">
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
              <div className="grid bg-white" ref={parentRef1}>
                {divWidth1 && <VolcanoCmp width={divWidth1}/>}
              </div>
            </div>
          </div>
          <div id="second" className="hidden p-4">
            <GenomicInfo/>
          </div>
          <div id="third" className="hidden p-4">
            Third tab
          </div>

        </div>
      </section>
    </div>
  )
}
