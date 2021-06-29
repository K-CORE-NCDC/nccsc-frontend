import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
// import '../../index.css'
import {
  UserCircleIcon,
  BeakerIcon,
  SearchIcon,
  PlusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import BasicInfromation from './ChildComponents/BasicInformation'
import PatientInformation from './ChildComponents/PatientInformation'
import ClinicalInformation from './ChildComponents/ClinicalInformation';
import FollowUpInformation from './ChildComponents/FollowUpInformation';

export default function SampleSelection() {
  const parentRef = useRef(null);
  const [comp, setComp] = useState('basic')

  const chart_types = (type) => {
    switch (type) {
      case "basic":
        return <BasicInfromation/>
      case "patient":
        return <PatientInformation/>
      case "clinical":
          return <ClinicalInformation/>
      case "follow_up":
          return <FollowUpInformation/>
      default:
        return ""
    }
  }

  function selection(e) {
    setComp(e.target.name)
  }

  return (
            <div className="tab w-full overflow-hidden border-t">
               <input className="absolute opacity-0" id="tab-single-one" type="radio" name="tabs2"/>
               <label className="block p-5 leading-normal cursor-pointer" for="tab-single-one">Step 1<span className="border-r-2 border-blue-800 px-2"/><span className="ml-2">Sample selection</span></label>
               <div className="tab-content overflow-hidden border-l-2  bg-gray-100 border-indigo-800 leading-normal">
                <div className="grid grid-cols-4">
                  <div className="border border-gray-300">
                    <div>
                      <ul className="py-3 px-5">
                        <li className="py-3">
                         <a href="#" name="basic" className="no-underline text-blue-900" onClick={(e)=>selection(e)}><UserCircleIcon className="h-4 w-4 inline"/><span className="pl-2"/>Basic/ Diagnostic information</a>
                        </li>
                        <li className="py-3">
                          <a href="#" name="patient" className="no-underline text-blue-900" onClick={(e)=>selection(e)}>
                            <PlusCircleIcon className="h-4 w-4 inline"/><span className="pl-2"/>Patient Health information
                          </a>
                        </li>
                        <li className="py-3">
                        <a href="#" name="clinical" className="no-underline text-blue-900" onClick={(e)=>selection(e)}>
                          <BeakerIcon className="h-4 w-4 inline"/> <span className="pl-2"/>Clinical information
                        </a>
                        </li>
                        <li className="py-3">
                          <a href="#" name="follow_up" className="no-underline text-blue-900" onClick={(e)=>selection(e)}>
                          <SearchIcon className="h-4 w-4 inline"/><span className="pl-2"/>Follow-up information
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="my-6 px-5">
                      <RefreshIcon className="h-4 w-4 inline"/><span className="pl-2"/> Reset Filter
                    </div>
                  </div>
                  <div className="bg-white col-span-3">
                    {chart_types(comp)}
                  </div>
               </div>
            </div>
            </div>
  )
}

// <ClinicalInformation/>
// <BasicInfromation/>
