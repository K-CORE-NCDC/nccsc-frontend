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


export default function PatientComp() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});
  const [checked, setChecked] = useState(true)
  const [input, setInput] = useState({"smoking":true,
  "Alcohol":true,"Family":true,"First":true,"Menopause":true,
  "Childbirth":true,"Experience":true,"Duration":true,"Intake":true,
  "Hormone":true})
  const [checkBoxColor, setCheckBoxColor] = useState('#ccc')
  // const [checkBoxState, setCheckBoxState] = useState({"sex":true, "diagnosis":true})
  const dispatch = useDispatch()

  const checkBoxFn = (event,id,chart)=>{
    var did = document.getElementById(id)
    var checkbox_elm = document.getElementById(id).checked;
  }


  const CheckBox=(values)=> {
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
                    <b>Smoking Status</b>
                  </div>
                  <div className="relative" id={'div_'+1}
                  onClick={()=>{setInput(prevState =>({...prevState,"smoking":!input['smoking']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['smoking']} data-parent={"smoking"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"smoking")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'}
                    style={{backgroundColor:input['smoking']?"#60A163":"#ccc"}}></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white"}}></div>
                  </div>
                </label>
              </div>
              {input['smoking']?<CheckBox value={['Current Smoker','Former Smoker','Nonsmoker']}/>:''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Alcohol Consumption</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Alcohol":!input['Alcohol']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Alcohol']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Alcohol']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Alcohol']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>
              {
                input['Alcohol']?
                <CheckBox value={['Yes','No']}/>:''
              }
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Family History of Breast Cancer</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Family":!input['Family']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Family']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Family']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Family']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Family']?<CheckBox value={['Yes','No']}/>:''}
            </div>
          </div>
          <div className="pt-3 pb-1 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>First Menstrual Age (10-17 Y)</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"First":!input['First']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['First']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['First']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['First']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['First']?
                <div className="grid grid-cols-5  pr-3">
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
                :''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Menopause</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Menopause":!input['Menopause']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Menopause']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Menopause']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Menopause']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Menopause']?
                <CheckBox value={['Yes','No']}/>
                :''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Childbirth</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Childbirth":!input['Childbirth']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Childbirth']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Childbirth']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Childbirth']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Childbirth']?
                <CheckBox value={['Yes','No']}/>
                :''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Experience of Breastfeeding</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Experience":!input['Experience']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Experience']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Experience']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Experience']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Experience']?
                <CheckBox value={['Yes','No']}/>
                :''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Duration of Breastfeeding (1-24 M)</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Duration":!input['Duration']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Duration']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Duration']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Duration']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Duration']?
                <div className="grid grid-cols-5 py-2 pr-3">
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
                :''}
            </div>
          </div>
          <div className="pt-3 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Intake of Oral Contraceptive Pill</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Intake":!input['Intake']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={input['Intake']} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Intake']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Intake']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Intake']?
                <CheckBox value={['Yes','No']}/>
                :''}
            </div>
          </div>
          <div className="pt-1 pb-3 col-span-5">
            <div className="w-full pl-4">
              <div className="mb-3" key={'div_mb_'+1}>
                <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                  <div className="ml-3 text-gray-700 w-4/5">
                    <b>Hormone Replacement Therapy</b>
                  </div>
                  <div className="relative" id={'div_'+1}  onClick={()=>{setInput(prevState =>({...prevState,"Hormone":!input['Hormone']}))}}>
                    <input type="checkbox" id={'md_'+1} checked={checked} data-parent={"sex"}
                    className="checkbox sr-only"
                    onChange={e=>checkBoxFn(e,'md_'+1,"sex")}/>
                    <div className="block bg-gray-600 w-14 h-6 rounded-full" id={1+'_toggle'} style={{backgroundColor:input['Hormone']?"#60A163":"#ccc"}}></div>
                    <div className="absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{backgroundColor:"white", transform: input['Hormone']?"translateX(100%)":""}}></div>
                  </div>
                </label>
              </div>{
                input['Hormone']?
                <CheckBox value={['Yes','No']}/>
                :''}
            </div>
          </div>
        </div>
  )
}
