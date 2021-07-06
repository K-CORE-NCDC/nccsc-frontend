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


export default function ClinicalComp() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});
  const [checked, setChecked] = useState(true)
  const [input, setInput] = useState({"T_Stage":true,
  "N_Stage":true,"ER":true,"PR":true,"HER2":true,
  "Ki-67":true})
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
                    <b>T Stage</b>
                  </div>
                  <div className="relative" id={'div_'+1}
                  onClick={()=>{setInput(prevState =>({...prevState,"T_Stage":!input['T_Stage']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['T_Stage']} data-parent={"T_Stage"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"T_Stage")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'}
                    style={{backgroundColor:input['T_Stage']?"#60A163":"#ccc"}}></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white"}}></div>
                  </div>
                </label>
              </div>
              {input['T_Stage']?<CheckBox value={["Stage Ⅰ","Stage Ⅱ","Stage Ⅲ","Stage Ⅳ"]}/>:''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                  <b>N Stage</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"N_Stage":!input['N_Stage']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['N_Stage']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['N_Stage']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['N_Stage']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>
              {
                input['N_Stage']?
                <CheckBox value={["Not evaluated","Stage 0","Stage Ⅰ","Stage Ⅱ","Stage Ⅲ"]}/>:''
              }
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>ER Test Results</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"ER":!input['ER']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['ER']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['ER']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['ER']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['ER']?<CheckBox value={['Positive','Negative','Not evaluable']}/>:''}
            </div>
          </div>
          <div className="pt-3 pb-1 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>PR Test Results</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"PR":!input['PR']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['PR']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['PR']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['PR']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['PR']?
                  <CheckBox value={['Positive','Negative','Not evaluable']}/>
                :''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                  <b>  HER2 Score</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"HER2":!input['HER2']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['HER2']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['HER2']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['HER2']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['HER2']?
                <CheckBox value={['0','0~1+','1+','2','2+','3+']}/>
                :''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Ki-67 Index (1-95 %)</b>
                  </div>
                  <div className="relative" id={'div_'+1}
                  onClick={()=>{setInput(prevState =>({...prevState,"Ki-67":!input['Ki-67']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Ki-67']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Ki-67']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Ki-67']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Ki-67']?
                  <div className="grid grid-cols-5 py-2 pr-4">
                      <div className="col-span-5 mb-1">
                        <select class="w-full border bg-white rounded px-3 py-2  outline-none">
                          <option class="py-1">Total</option>
                          <option class="py-1">Positive</option>
                          <option class="py-1">Negative</option>
                         </select>
                      </div>
                      <div className="col-span-2">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Jane Doe"/>
                      </div>
                      <div className="col-span-1">
                        <div className="box-border bg-gray-100 h-10 w-30  px-3 border-t-2 border-b-2 border-gray-300 mb-6"> <b className="mx-5 my-5">-</b></div>
                      </div>
                      <div className="col-span-2">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Jane Doe"/>
                      </div>
                  </div>
                :''}
            </div>
          </div>
        </div>
  )
}
