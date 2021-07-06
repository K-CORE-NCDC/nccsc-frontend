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


export default function BasicComp() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});
  const [checked, setChecked] = useState(true)
  const [input, setInput] = useState({"sex":true,"age":true,"body":true})
  const [checkBoxColor, setCheckBoxColor] = useState('#ccc')
  const [checkBoxState, setCheckBoxState] = useState({"sex":true, "diagnosis":true})
  const dispatch = useDispatch()

  const checkBoxFn = (event,id,chart)=>{
    var did = document.getElementById(id)
    var checkbox_elm = document.getElementById(id).checked;
  }


  const CheckBox=(values)=> {
    return(
      <div id="basic_div">
          <div class="mb-4 mx-3">
            <label class="inline-flex items-center">
              <input type="checkbox" class="form-radio" name="accountType" value="Male"/>
              <span class="ml-2 text-gray-700">Male</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Female</span>
            </label>
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
                    <b>Sex</b>
                  </div>
                  <div className="relative" id={'div_'+1}
                  onClick={()=>{setInput(prevState =>({...prevState,"sex":!input['sex']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['sex']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'}
                    style={{backgroundColor:input['sex']?"#60A163":"#ccc"}}></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white"}}></div>
                  </div>
                </label>
              </div>
              {input['sex']?<CheckBox/>:''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Age of Diagnosis (20-40 Y)</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"age":!input['age']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={checked} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['age']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['age']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['age']?
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
                </div>:""
              }
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Body Mass Index (15.82-36.33 kg/㎡)</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"body":!input['body']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={checked} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['body']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['body']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['body']?
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
                </div>:""
              }
            </div>
          </div>
        </div>

  )
}


// <div className="p-0 col-span-2 pt-4 pl-4">
//  sex
// </div>
// <div className="col-span-3 pt-4">
//     <div class="flex mt-1 mb-12">
//       <div className="bottom-0 right-0">
//         <label for="toggleB" className="flex items-left cursor-pointer"/>
//           <div class="relative">
//             <input type="checkbox" id="toggleB" class="sr-only"/>
//             <div class="block bg-gray-600 w-10 h-6 rounded-full"></div>
//             <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
//           </div>
//       </div>
//     </div>
// </div>
