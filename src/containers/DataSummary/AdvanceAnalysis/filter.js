import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  UserCircleIcon
} from '@heroicons/react/outline'
import inputJson from '../data'
export default function Filter({parentCallback}) {
  const [state, setState] = useState({"html":[]});
  const [selectState, setSelectState] = useState({});
  const [selected, setSelected] = useState('Basic/Diagnostic Information');



  useEffect(()=>{
    leftSide()
  },[])
  useEffect(()=>{

    leftSide()
  },[selected])

  let checkbox = (d) => {
    let check = false
    if (d.id in selectState){
      check = true
    }
    return (
      <div key={d.id} className="px-10">
        <label class="inline-flex items-center">
            <input type="checkbox" id={d.id} name={d.name}
            className="form-checkbox"
            value={d.value}
            onChange={e=>selectFn(e)}
             />
          <span class="ml-2">{d.value}</span>
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
                <div className="ml-3 text-gray-700 w-10/12 text-2xl tracking-wide">
                  {childelm}
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
        <div key={item+'_'+k} class="tab w-full overflow-hidden border-t" onClick={(e)=>switchButton(e,item,k)}>
          <input class="absolute opacity-0" id={"tab-single-"+k} type="radio" name="tabs2"/>
          <label class="block p-5 leading-normal cursor-pointer" htmlFor={"tab-single-"+k}>
            <UserCircleIcon className="h-8 w-8 inline text-main-blue"/>
            <span class="no-underline  ml-2 text-2xl tracking-wide">{item}</span>
          </label>
          {selected === item ? <div class="tab-content overflow-hidden border-l-2 bg-gray-100  leading-normal relative py-3">
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
      console.log(did.getAttribute('data-parent'),selectState);
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

  const sendFilter = ()=>{
    parentCallback(selectState)  
  }
  return (
    <div>
      <div className="py-3 px-2 w-full col-span-2">
        <button class="bg-white  w-80 h-20 hover:text-white mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded">
          Reset
        </button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button class="bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded" onClick={sendFilter}>
          Search
        </button>
      </div>
      <div className="col-span-2">
        {state['html']  }
      </div>
    </div>
  )
}
