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
import BasicComp from "./Components/BasicComp"
import PatientComp from "./Components/PatientComp"
import ClinicalComp from "./Components/ClinicalComp"
import FollowUpComp from "./Components/FollowUpComp"

export default function AccordionComp() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [state, setState] = useState({"charts":[]});

  const dispatch = useDispatch()

  var myRadios = document.getElementsByName('tabs2');
      var setCheck;
      var x = 0;
      for(x = 0; x < myRadios.length; x++){
          myRadios[x].onclick = function(){
              if(setCheck != this){
                   setCheck = this;
              }else{
                  this.checked = false;
                  setCheck = null;
          }
          };
      }

  return (
    <div>
         <div class="shadow-md">
            <div class="tab w-full overflow-hidden border-t">
               <input class="absolute opacity-0" id="tab-single-one" type="radio" name="tabs2"/>
               <label class="block p-5 leading-normal cursor-pointer" for="tab-single-one"><UserCircleIcon className="h-4 w-4 inline"/> <span class="no-underline text-blue-900 ml-2">Basic/Diagnostic Information</span></label>
               <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <BasicComp/>
               </div>
            </div>
            <div class="tab w-full overflow-hidden border-t">
               <input class="absolute opacity-0" id="tab-single-two" type="radio" name="tabs2"/>
               <label class="block p-5 leading-normal cursor-pointer" for="tab-single-two"><PlusCircleIcon className="h-4 w-4 inline"/><span class="no-underline text-blue-900 ml-2">Patient Health Information</span></label>
               <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <PatientComp/>
               </div>
            </div>
            <div class="tab w-full overflow-hidden border-t">
               <input class="absolute opacity-0" id="tab-single-three" type="radio" name="tabs2"/>
               <label class="block p-5 leading-normal cursor-pointer" for="tab-single-three"><BeakerIcon className="h-4 w-4 inline"/><span class="no-underline text-blue-900 ml-2"> Clinical Information</span></label>
               <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <ClinicalComp/>
               </div>
            </div>
            <div class="tab w-full overflow-hidden border-t">
               <input class="absolute opacity-0" id="tab-single-four" type="radio" name="tabs2"/>
               <label class="block p-5 leading-normal cursor-pointer" for="tab-single-four"><SearchIcon className="h-4 w-4 inline"/><span class="no-underline text-blue-900 ml-2"> Follow-up Observation</span></label>
               <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <FollowUpComp/>
               </div>
            </div>
         </div>
      </div>
  )
}
