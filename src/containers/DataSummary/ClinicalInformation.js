import React,{useState,useEffect } from "react";
import {
  AdjustmentsIcon,
  UserCircleIcon,
  BeakerIcon,
  SearchIcon,
  DocumentAddIcon
} from '@heroicons/react/outline'
import Barchart from '../Common/Barchart'
import Piechart from '../Common/Piechart'
import { DashboardDsummaryData } from '../../actions/api_actions'
import LoaderCmp from '../Common/Loader';
import {FormattedMessage} from 'react-intl';

import inputJson from './data'

export default function ClinicalInformation() {
  const [leftSide, setLeftSide] = useState({"charts":[],"leftSide":[],"activeCharts":[]});
  const [activeChartsList, setActiveChartsList] = useState(["Sex","Age Of Daignosis","Body Mass Index","Diagnosis Of Bilateral Breast Cancer"]);
  const [selected, setSelected] = useState('Basic/Diagnostic Information');
  
  const [firstLoad, setFirstLoad] = useState(true)
  const [loader, setLoader] = useState(true)
  const [smallScreen,setSmallScreen] = useState(false)
  
  const [summaryJson, setSummaryJson] = useState({})
  const [summaryJsonStatus, setSummaryJsonStatus] = useState(204)


  const change_visual = (e) =>{

    let id = e.target.dataset['id']

    e.target.checked = true
    let c_type = e.target.value
    let current_class_name = "parent_chart_"+c_type+"_"+id
    let toggle_name =''
    if(c_type === "bar"){
      toggle_name ='pie'
    }else if(c_type === "pie"){
      toggle_name ='bar'
    }
    let previous_class_name = "parent_chart_"+toggle_name+"_"+id

    document.getElementById(current_class_name).classList.remove("hidden")
    document.getElementById(previous_class_name).classList.add("hidden")
  }


  useEffect(()=>{
    let response_data = DashboardDsummaryData()
    response_data.then((result) => {
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

  useEffect(()=>{
    if(firstLoad===true && summaryJsonStatus === 200 && summaryJson){
      let tmp = activeChartsList
      for (var i = 0; i < tmp.length; i++) {
        loadChart(tmp[i],selected)
      }
      setFirstLoad(false)
    }
  },[firstLoad,summaryJsonStatus,summaryJson])




  useEffect(()=>{
    if(summaryJsonStatus === 200 && summaryJson){
      leftSideHtml(summaryJson)
      setTimeout(function() {
          setLoader(false)
      }, (1000));
    }
  },[summaryJson,summaryJsonStatus])

  useEffect(()=>{
    if(selected){
      leftSideHtml(summaryJson)
    }
  },[selected])

  let icon_type = {
    "Basic/Diagnostic Information":<UserCircleIcon className="h-8 w-8 inline text-main-blue"/>,
    "Patient Health Information":<DocumentAddIcon className="h-8 w-8 inline text-main-blue"/>,
    "Clinical Information":<BeakerIcon className="h-8 w-8 inline text-main-blue"/>,
    "Follow-up Observation":<SearchIcon className="h-8 w-8 inline text-main-blue"/>
  }

  let chart_names = {
    'Age Of Daignosis':'Age of Diagnosis (20-40 Y)',
    "Body Mass Index":'Body Mass Index (15.82-36.33 kg/㎡)',
    'First Menstrual Age':'First Menstrual Age (10-17 Y)',
    'Duration of Breastfeeding':'Duration of Breastfeeding (1-24 M)',
    'Ki-67 Index':'Ki-67 Index(1-95 %)',
    'Time until relapse is confirmed':'Time until relapse is confirmed (1-16 Y)'
  }

  let chart_inside_names = {
    'Duration of Breastfeeding':'Duration of Breastfeeding (Targeting Experience of Breastfeeding Y respondents(58))',
    'Time until relapse is confirmed':'Time until relapse is confirmed (Targeting Cancer Recurrence Y respondents(44))'
  }


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
            <div className="p-3 relative z-40" key={'div_mb_'+i}>
              <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                <div className="ml-3 lg:text-3xl md:text-2xl sm:text-xl text-gray-700 w-9/12  tracking-wide">
                  {
                    (itm in chart_names)?<FormattedMessage  id = {itm} defaultMessage={chart_names[itm]}/>:<FormattedMessage  id = {itm} defaultMessage={itm}/>
                  }
                </div>
                <div className="relative" id={'div_'+id}  onClick={e=>checkBoxFn(e,'md_'+i,itm)}>
                  <input type="checkbox" id={'md_'+i} checked={check} data-parent={item}  className="checkbox sr-only"
                  onChange={e=>checkBoxFn(e,'md_'+i,itm)}  />
                  <div className="block bg-gray-600 w-14 h-6 rounded-full" id={'md_'+i+'_toggle'} style={{backgroundColor:color}}></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition" style={{backgroundColor:'#fff',opacity:1}}></div>
                </div>
              </label>
            </div>
          )
        })

        tmp.push(
          <div key={item+'_'+k} className="tab w-full overflow-hidden border-t" onClick={(e)=>switchButton(e,item,k)}>
            <input className="absolute opacity-0" id={"tab-single-"+k} type="radio" name="tabs2"/>
            <label className="block p-5 leading-normal cursor-pointer" htmlFor={"tab-single-"+k}>
              {icon_type[item]}
              <span className="no-underline  ml-5 text-2xl tracking-wide"><FormattedMessage  id = {item} defaultMessage={item}/></span>
            </label>
              {selected===item ? <div className="tab-content overflow-hidden border-l-2 bg-gray-100  leading-normal relative">
                {t}
              </div>:""}
          </div>
        )
      })

      setLeftSide((prevState)=>({
        ...prevState,
        'leftSide':tmp
      }))

    }
  }

  const checkBoxFn = (event,id,chart) => {

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
    loadChart(chart, did.getAttribute('data-parent'))

  }

  const loadChart = (chart, parent_name)=>{

    let tmp = leftSide['charts']
    let ac = leftSide['activeCharts']
    let check = true

    for (var i = 0; i < tmp.length; i++) {
      if(tmp[i].key === "chart_"+chart) {
        tmp.splice(i,1)
        check = false
        ac.splice(i,1)
      }
    }

    



    if(check ){
      summaryJsonStatus === 200 && summaryJson && Object.keys(summaryJson[parent_name]).forEach((item, k) => {
        let id = item.split(" ").join("")
        if(item===chart){
          tmp.push(
            <div key={'chart_'+item} data-chart="bar" className='max-w bg-white rounded-2xl overflow-hidden shadow-lg px-4 py-3 mb-5 mx-3 card-border'>
              <h2 className="lg:text-3xl md:text-2xl sm:text-2xl tracking-wide">{(item in chart_inside_names)?<FormattedMessage  id = {item+"_chart"} defaultMessage={chart_inside_names[item]}/>:<FormattedMessage  id = {item} defaultMessage={item}/>}</h2>
              <div className="mt-2 ml-5 p-3">
                  <label className="inline-flex items-center">
                    <input key={'radio_'+id+"_bar"} type="radio" defaultChecked={true} className="form-radio" id={id+"_bar"} data-id={id} name={"cr_"+id+"_"+k} value="bar" onChange={change_visual} />
                    <span className="ml-2 sm:text-xl">Bar</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input key={'radio_'+id+"_pie"} type="radio" defaultChecked={false} className="form-radio" id={id+"_pie"} data-id={id} name={"cr_"+id+"_"+k} value="pie" onChange={change_visual} />
                    <span className="ml-2 sm:text-xl">Pie</span>
                  </label>
              </div>
              <div id="chart-tab-contents">
                <div id={'parent_chart_bar_'+id} className="">
                  <Barchart  id={'chart_bar_'+id}
                  data={summaryJson[parent_name][item]}
                  width='300'
                  color={inputJson['clinicalColor'][parent_name]}
                  title={inputJson['clinical_info_title'][item]}
                  />
                </div>
                <div id={'parent_chart_pie_'+id} className="hidden">
                  <Piechart id={'chart_pie_'+id}
                  data={summaryJson[parent_name][item]}
                  width='300'
                  color={ inputJson['clinicalColor'][parent_name] }

                  />
                </div>
              </div>
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
  }

  useEffect(()=>{
    var objDiv = document.getElementById('charts_container')
    if(objDiv){
      objDiv.scrollTop = objDiv.scrollHeight;
      window.scroll({
        top: document.body.offsetHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  },[leftSide])

  const switchButton = (event,id,k) => {

    let myRadios = document.getElementsByName('tabs2');
    let setCheck;
    let x = 0;

    for(x = 0; x < myRadios.length; x+=1){
      myRadios[x].onclick = function(e){
        if(setCheck !== this){
          setCheck = this;
        }else{

          this.checked = false;
          setCheck = null;
        }
      }
    }
    setSelected(id)
  }




  return (
   <>
      {loader?
        <LoaderCmp />
      :
      <div className="relative">
        <div className="grid grid-cols-4 gap-6">
          <div className={`relative ${smallScreen?"col-span-4 z-10":""}`}>
          <div className={`sm:hidden xs:opacity-95 sm:opacity-95 lg:block xl:block bg-white border border-gray-200 ${smallScreen?"":"xs:hidden"}`}>
              <h4 className="p-3 float-left"><AdjustmentsIcon className="h-6 w-6 inline"/> &nbsp;Filters</h4>
              <button className="float-right lg:hidden md:hidden bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 my-4 mr-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={()=>setSmallScreen(false)}
              type="button">
               close
              </button>
            <div className="shadow-box shadow-md w-full p-3 " id='accordian_tabs' >
              {
                leftSide['leftSide']
              }
            </div>
          </div>
          </div>
          <div className={`xl:col-start-2 lg:col-start-2 col-span-4 m-5 overflow-y-auto h-screen ${smallScreen?"absolute":""}`} id='charts_container'>
            <div className="pl-6 mb-5 lg:hidden md:hidden">
              <button className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={()=>setSmallScreen(true)}
              type="button">
               <AdjustmentsIcon className="h-6 w-6 inline"/>
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-3" >
              {
                leftSide['charts']
              }

            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
}
