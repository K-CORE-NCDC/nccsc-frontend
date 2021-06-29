import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
import '../../index.css'
import {
  UserCircleIcon,
  BeakerIcon,
  SearchIcon,
  PlusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import ModalComponent from "./Components/ModalPopup";

export default function DataVisualization() {
  const parentRef = useRef(null);

  let myRadios = document.getElementsByName('tabs2');
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
    <div className="my-16">
      <div className="w-full md:w-full p-8">
         <div className="shadow-md">
            <div className="tab w-full overflow-hidden border-t">
              <input className="absolute opacity-0" id="tab-single-two" type="radio" name="tabs2"/>
              <label className="block p-5 leading-normal cursor-pointer" for="tab-single-two">Step 1<span className="border-r-2 border-blue-800 px-2"/> <span className="ml-2">Data Upload</span></label>
              <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                <ModalComponent/>
              </div>
            </div>
            <div className="tab w-full overflow-hidden border-t">
               <input className="absolute opacity-0" id="tab-single-two" type="radio" name="tabs2"/>
               <label className="block p-5 leading-normal cursor-pointer" for="tab-single-two">Step 2<span className="border-r-2 border-blue-800 px-2"/> <span className="ml-2">Gene selection</span></label>
               <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                 <div className="px-5 py-4 pb-3">
                    <div className="mb-2">
                     <select class="w-full border bg-white rounded px-3 py-2 outline-none">
                       <option class="py-1">User-Defined list</option>
                       <option class="py-1">Option 2</option>
                       <option class="py-1">Option 3</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      <textarea className="resize-none border rounded-md w-full border-gray-300  focus:outline-none focus:border-gray-700" rows="3" placeholder="  Enter Hugo Gene Symbols, Gene Aliases, or OQL."></textarea>
                    </div>
                    <div className="bottom-0 right-0 mt-2 mb-3">
                      <button class="bg-blue-500 float-right hover:bg-blue-700 mb-3 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                        Search
                      </button>
                    </div>
                  </div>
               </div>
            </div>
            <div className="tab w-full overflow-hidden border-t my-5">
               <input className="absolute opacity-0" id="tab-single-three" type="radio" name="tabs2"/>
               <label className="block p-5 leading-normal cursor-pointer" for="tab-single-three">Step 3<span className="border-r-2 border-blue-800 px-2"/><span className="ml-2">Visualization</span></label>
               <div className="tab-content overflow-hidden border-l-2 bg-gray-100 border-indigo-500 leading-normal">
                  <p className="p-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
