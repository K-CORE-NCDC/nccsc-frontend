import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  UserCircleIcon,
  BeakerIcon,
  SearchIcon,
  PlusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";


export default function FollowUpComp() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});
  const [checked, setChecked] = useState(true)
  const [input, setInput] = useState({"Cancer":true,"Time":true})
  const [checkBoxColor, setCheckBoxColor] = useState('#ccc')
  // const [checkBoxState, setCheckBoxState] = useState({"sex":true, "diagnosis":true})
  const dispatch = useDispatch()

  const checkBoxFn = (event,id,chart)=>{
    var did = document.getElementById(id)
    var checkbox_elm = document.getElementById(id).checked;
  }


  const CheckBox = (values) => {
    let check_boxes_html = []
    for(var j in values){
      values[j].forEach((item, i) => {
        check_boxes_html.push(
          <label class="inline-flex items-center mr-2">
            <input type="checkbox" class="form-radio" name="accountType" value={item}/>
            <span class="ml-2 text-gray-700">{item}</span>
          </label>
        )
      });
    }
    return(
      <div id="basic_div">
          <div class="mb-4 mx-3">
            {check_boxes_html}
          </div>
      </div>
    )
  }

  return (
        <div className="grid grid-col-5">
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Cancer Recurrence</b>
                  </div>
                  <div className="relative" id={'div_'+1}
                  onClick={()=>{setInput(prevState =>({...prevState,"Cancer":!input['Cancer']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Cancer']} data-parent={"Cancer"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"Cancer")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'}
                    style={{backgroundColor:input['Cancer']?"#60A163":"#ccc"}}></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white"}}></div>
                  </div>
                </label>
              </div>
              {input['Cancer']?<CheckBox value={["Yes","No"]}/>:''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                  <b>Time until relapse is confirmed (0.8-186.3 M)</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Time":!input['Time']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Time']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Time']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Time']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>
              {
                input['Time']?
                <div className="grid grid-cols-5 py-2 pr-2">
                    <div className="col-span-2">
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Jane Doe"/>
                    </div>
                    <div className="col-span-1">
                      <div className="box-border bg-gray-100 h-10 w-30  px-3 border-t-2 border-b-2 border-gray-300 mb-6"> <b className="mx-8 my-5">-</b> </div>
                    </div>
                    <div className="col-span-2">
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Jane Doe"/>
                    </div>
                </div>
                :''
              }
            </div>
          </div>

        </div>
  )
}
