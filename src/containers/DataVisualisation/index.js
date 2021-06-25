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
               <input className="absolute opacity-0" id="tab-single-one" type="radio" name="tabs2"/>
               <label className="block p-5 leading-normal cursor-pointer" for="tab-single-one">Step 1<span className="border-r-2 border-blue-800 px-2"/><span className="ml-2">Sample selection</span></label>
               <div className="tab-content overflow-hidden border-l-2  bg-gray-100 border-indigo-800 leading-normal">
                <div className="grid grid-cols-4">
                  <div className="border border-gray-300">
                    <div>
                      <ul className="py-3 px-5">
                        <li className="py-3">
                         <a href="#" className="no-underline text-blue-900"><UserCircleIcon className="h-4 w-4 inline"/><span className="pl-2"/>Basic/ Diagnostic information</a>
                        </li>
                        <li className="py-3">
                          <a href="#" className="no-underline text-blue-900">
                            <PlusCircleIcon className="h-4 w-4 inline"/><span className="pl-2"/>Patient Health information
                          </a>
                        </li>
                        <li className="py-3">
                        <a href="#" className="no-underline text-blue-900">
                          <BeakerIcon className="h-4 w-4 inline"/> <span className="pl-2"/>Clinical information
                        </a>
                        </li>
                        <li className="py-3">
                          <a href="#" className="no-underline text-blue-900">
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
                    <div className="grid grid-cols-2 py-8">
                      <div className="px-8">
                        <span class="text-gray-700">Sex</span>
                        <div class="mt-2">
                          <label class="inline-flex items-center">
                            <input type="radio" class="form-radio" name="accountType" value="Male"/>
                            <span class="ml-2 text-gray-700">Male</span>
                          </label>
                          <label class="inline-flex items-center ml-6">
                            <input type="radio" class="form-radio" name="accountType" value="Female"/>
                            <span class="ml-2 text-gray-700">Female</span>
                          </label>
                        </div>
                      </div>
                      <div className="block pr-4 px-8">
                        <span className="text-gray-700">Age of Diagnosis (20-40 Y)</span>
                        <div className="grid grid-cols-5">
                          <div className="col-span-2">
                            <input className="form-input mt-1 block w-full border border-gray-300" placeholder="Jane Doe"/>
                          </div>
                          <div className="col-span-1">
                            <div className="box-border bg-gray-100 h-7 w-30 px-5 my-1 mb-1"> <b className="mx-8">-</b> </div>
                          </div>
                          <div className="col-span-2">
                            <input className="form-input mt-1 block w-full border border-gray-300" placeholder="Jane Doe"/>
                          </div>
                        </div>
                      </div>
                      <div className="px-8 py-10">
                          <span className="text-gray-700">Body Mass Index (15.82-36.33 kg/㎡)</span>
                          <div className="grid grid-cols-5">
                            <div className="col-span-2">
                              <input className="form-input mt-1 block w-full border border-gray-300" placeholder="Jane Doe"/>
                            </div>
                            <div className="col-span-1">
                              <div className="box-border bg-gray-100 h-7 w-30 px-5 my-1 mb-1"> <b className="mx-8">-</b> </div>
                            </div>
                            <div className="col-span-2">
                              <input className="form-input mt-1 block w-full border border-gray-300" placeholder="Jane Doe"/>
                            </div>
                          </div>
                      </div>
                      <div className="px-8 py-10">
                        <span class="text-gray-700">Diagnosis of Bilateral Breast Cancer</span>
                        <div class="mt-2">
                          <label class="inline-flex items-center">
                            <input type="radio" class="form-radio" name="accountType" value="Male"/>
                            <span class="ml-2 text-gray-700">Yes</span>
                          </label>
                          <label class="inline-flex items-center ml-6">
                            <input type="radio" class="form-radio" name="accountType" value="Female"/>
                            <span class="ml-2 text-gray-700">No</span>
                          </label>
                        </div>
                      </div>
                      <div className="relative col-span-2 px-2">
                        <div className="absolute top-1 bottom-0 right-5">
                            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                              Reset
                            </button>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                              Sample Information Search
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
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
