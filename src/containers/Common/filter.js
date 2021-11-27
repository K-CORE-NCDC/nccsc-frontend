import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  UserCircleIcon,
  BeakerIcon,
  SearchIcon,
  DocumentAddIcon
} from '@heroicons/react/outline'
import inputJson from './data';
// import filterBoxes from './data'
import {FormattedMessage} from 'react-intl';


let previous = ""

export default function Filter({parentCallback, filterState, set_screen}) {
  const [state, setState] = useState({"html":[]});
  const [selectState, setSelectState] = useState({});
  const [selected, setSelected] = useState('Basic/Diagnostic Information');
  const [filtersUi, setFiltersUi] = useState({});
  const [filterHtml, setFilterHtml] = useState([])
  
  useEffect(()=>{
    
    leftSide()
  },[])
  
  useEffect(()=>{
    drawTags()
    leftSide()
  },[selected, selectState])

  useEffect(()=>{
    if(Object.keys(filterState).length !== 0){
      setSelectState({...filterState})
      switchButton()
    }
  },[filterState])

  useEffect(() => {
    let html = []
    
    if(Object.keys(filtersUi).length > 0){
      Object.keys(filtersUi).forEach(e=>{
        let tmp = []
        if(filtersUi[e].length > 0){

          {filtersUi[e].forEach(sub => {
            tmp.push(<span key={`${sub.key}-${Math.random()}`} className="inline-flex items-center justify-center p-3 px-5  mr-2 text-md font-bold leading-none text-white bg-gray-600 rounded-full mb-4">
              <FormattedMessage  id = {sub.key} defaultMessage={sub.key}/>: &nbsp;<FormattedMessage  id = {sub.value} defaultMessage={sub.value}/>
            </span>)
          })}
        }
        if(tmp.length>0){
          html.push(<div className='mb-5'>
              <h4 className='mb-5'><FormattedMessage  id = {e} defaultMessage={e}/></h4>
              {tmp}
            </div>
          )
        }
      })
    }
    setFilterHtml(html)
  }, [filtersUi])

  
  
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


  let checkbox = (d) => {
    let check = false
    if (d.id in selectState){
      check = true
    } 
    return (
      <div key={d.id} className="px-10">
        <label className="inline-flex items-center">
          <input type="checkbox" id={d.id} name={d.name}
            className="form-checkbox"
            value={d.value}
            defaultChecked={check}
            onChange={e=>selectFn(e)}
          />
          <span className="ml-2 lg:text-2xl sm:text-xl md:text-xl">
            <FormattedMessage  id = {d.value} defaultMessage={d.value}/>
          </span>
        </label>
      </div>
    )
    
  }

  let inputbox = (d) => {
    return (
      <div key={d.id} className="grid grid-cols-5  rounded mx-10 border border-b-color">
        <div className="col-span-2">
          <input type="text" id={'from_'+d.id}
            className="h-full shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={selectState['from_'+d.id]} onChange={e=>selectFn(e)}
             placeholder=""/>
        </div>
        <div className="col-span-1">
          <div className="box-border border-r border-l border-b-color bg-gray-100 h-full w-30  px-3 mb-6 text-center"><b>-</b></div>
        </div>
        <div className="col-span-2">
          <input type="text" id={'to_'+d.id}
            className="h-full  shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight"
            value={selectState['to_'+d.id]} onChange={e=>selectFn(e)}
            placeholder=""/>
        </div>
      </div>
    )
  }

  let selectFn = (e) => {
    let val = e.target.value
    let id = e.target.id
    
    let tmp = selectState
    if (e.target.type==='text'){
      tmp[id] = val
    }else{
      if (id in tmp){

        delete tmp[id]
        document.getElementById(id).checked=false
      }else{
        tmp[id] = val
        document.getElementById(id).checked=true
      }
    }
    setSelectState(tmp)
  }

  const leftSide = () =>{
    let filterBoxes = inputJson.filterBoxes
    let html = []
    Object.keys(filterBoxes).forEach((item, k) => {
      let t = []
      if(filterBoxes[item]){
        let childElements = filterBoxes[item]
        Object.keys(childElements).forEach((childelm, c) => {
          let childHtml = childElements[childelm]
          let inputHtml = []
          for (var i = 0; i < childHtml.length; i++) {
            let type = childHtml[i].type
            switch (type) {
              case "checkbox":
                inputHtml.push(checkbox(childHtml[i]))
                break
              case "number":
                inputHtml.push(inputbox(childHtml[i]))
                break
            }
          }
          let color = inputJson['clinicalColor'][item]
          let id = item.split(" ").join("")
          t.push(
            <div className="px-5 py-3 relative z-10" key={'div_mb_'+c}>
              <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                <div className="ml-3 text-gray-700 w-10/12 lg:text-2xl sm:text-xl md:text-xl tracking-wide">
                  {
                      (childelm in chart_names)?<FormattedMessage  id = {childelm} defaultMessage={chart_names[childelm]}/>:<FormattedMessage  id = {childelm} defaultMessage={childelm}/>
                  }
                </div>
                <div className="relative" onClick={e=>checkBoxFn(e,'md_'+id+"_"+c)}>
                  <input type="checkbox" id={'md_'+id+"_"+c} checked="checked" data-parent={item} className="checkbox sr-only " onChange={e=>checkBoxFn(e,'md_'+id+"_"+c)}/>
                  <div className="block bg-gray-600 w-14 h-6 rounded-full" id={'md_'+id+"_"+c+'_toggle'} style={{backgroundColor:color}}></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white" style={{backgroundColor:"#fff"}}></div>
                </div>
              </label>
              <div className="py-5" id={'child_md_'+id+"_"+c}>
                {inputHtml}
              </div>
            </div>
          )
        })
      }
      html.push(
        <div key={item+'_'+k} className="tab w-full overflow-hidden border-t" onClick={(e)=>switchButton(e,item,k)}>
          <input className="absolute opacity-0" id={"tab-single-"+k} type="radio" name="tabs2"/>
          <label className="block p-5 leading-normal cursor-pointer" htmlFor={"tab-single-"+k}>
            {icon_type[item]}
            <span className="no-underline  ml-2 text-2xl tracking-wide"><FormattedMessage  id ={item} defaultMessage={item}/></span>
          </label>
          {selected === item ? <div className="tab-content overflow-hidden border-l-2 bg-gray-100  leading-normal relative py-3">
            {t}
          </div>:""}
        </div>
      )
    })
    setState((prevState)=>({
      ...prevState,
      'html':html
    }))
  }

  const checkBoxFn = (event,id)=>{
    var did = document.getElementById(id)
    var checkbox_elm = document.getElementById(id).checked;
    if(checkbox_elm){
      document.getElementById(id).checked=false
      document.getElementById(id+"_toggle").style.background='#ccc'
      document.getElementById("child_"+id).classList.add("hidden")
    }else{
      document.getElementById(id).checked=true
      document.getElementById(id+"_toggle").style.background=inputJson['clinicalColor'][did.getAttribute('data-parent')]
      document.getElementById("child_"+id).classList.remove("hidden")
      
    }
  }

  const switchButton = (event,id,k)=>{
    let s = selected
    setSelected(id)
    var myRadios = document.getElementsByName('tabs2');
    var setCheck;
    var x = 0;
    for(x = 0; x < myRadios.length; x++) {
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

  const drawTags = () => {
    let filterBoxes = inputJson.filterBoxes
    let tx = ['aod','bmi','fma','dob','ki67','turc']
    if(Object.keys(selectState).length > 0){
      let filterSelectedHtml = {}
      Object.keys(filterBoxes).forEach(header => {
        filterSelectedHtml = {
          ...filterSelectedHtml,
          [header] : []
        }
        Object.keys(filterBoxes[header]).forEach(field=>{
          filterBoxes[header][field].forEach(subField =>{
            if(subField.id in selectState){
              filterSelectedHtml = {
                ...filterSelectedHtml,
                [header] : [...filterSelectedHtml[header], {key: [field], value: selectState[subField.id]}]
              }
            }else if(tx.indexOf(subField.id)>-1 && selectState["from_"+subField.id] && selectState["to_"+subField.id]){
              filterSelectedHtml = {
                ...filterSelectedHtml,
                [header] : [...filterSelectedHtml[header], {key: [field], value: selectState["from_"+subField.id]+"-"+selectState["to_"+subField.id]}]
              }
              
            }
          })
        })
      })
      setFiltersUi(filterSelectedHtml);
    }
  }

  const sendFilter = ()=>{
    parentCallback(selectState)
    drawTags()

  }

  const reset = ()=>{
    let toggle_check = ['Basic/Diagnostic Information','Patient Health Information','Clinical Information','Follow-up Observation']
    let tmp = selectState

    let ckb = document.querySelectorAll("#all_checkboxes input[type=checkbox]");
    [...ckb].forEach( el => {
      let toggle_check_ = el.getAttribute('data-parent')
      if (!toggle_check.includes(toggle_check_)){
            delete tmp[el.id]
            el.checked=false
      }
    });

    let input_boxes = document.querySelectorAll("#all_checkboxes input[type=text]");
    [...input_boxes].forEach( il => {
      delete tmp[il.id]
      il.value = ""
    })
    setSelectState(tmp)
    parentCallback("")
  }

  return (
    <div>
      
      <div className="py-3 px-2 w-full col-span-2">
        <button className="bg-white  lg:w-80 sm:w-52  lg:h-20 sm:h-16  hover:text-white mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded" onClick={reset}>
          Reset
        </button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 lg:h-20 sm:w-52 sm:h-16 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded" onClick={sendFilter}>
          Search
        </button>
        <button className="float-right lg:hidden md:hidden bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 my-4 mr-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={()=>set_screen(false)}
        type="button">
         close
        </button>
      </div>
      <div>
      <div className="col-span-2 p-1">
        {filterHtml}  
      </div>
      </div>
        <div className="col-span-2" id="all_checkboxes">
        {state['html']  }
      </div>
    </div>
  )
}
