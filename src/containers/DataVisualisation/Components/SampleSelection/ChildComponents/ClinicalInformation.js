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

export default function ClinicalInformation() {
  return (
    <div className="grid grid-cols-10 py-8">
      <div className="px-8 col-span-3">
          <span class="text-gray-700 px-5"><b>N Stage</b></span>
          <div class="mt-2">
          <div className="grid grid-cols-2">
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Current Smoker"/>
              <span class="ml-2 text-gray-700">Stage Ⅰ</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Stage Ⅱ</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Stage Ⅲ</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Stage Ⅳ</span>
            </label>
          </div>
          </div>
      </div>
      <div className="px-8 col-span-4">
          <span class="text-gray-700 px-5"><b>T Stage</b></span>
          <div class="mt-2 col-span-3">
          <div className="grid grid-cols-2">
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Current Smoker"/>
              <span class="ml-2 text-gray-700">Stage Ⅰ</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Stage Ⅱ</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Stage Ⅲ</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Stage Ⅳ</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Stage Ⅳ</span>
            </label>
          </div>
          </div>
      </div>
      <div className="px-8 col-span-3">
          <span class="text-gray-700 px-5"><b>ER Test Results</b></span>
          <div class="mt-2">
          <div className="grid grid-cols-2">
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Current Smoker"/>
              <span class="ml-2 text-gray-700">Positive</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Negative</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Not evaluable</span>
            </label>
          </div>
          </div>
      </div>
      <div className="px-8 col-span-3 my-2">
          <span class="text-gray-700 px-5"><b>PR Test Results</b></span>
          <div class="mt-2">
          <div className="grid grid-cols-2">
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Current Smoker"/>
              <span class="ml-2 text-gray-700">Positive</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Negative</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">Not evaluable</span>
            </label>
          </div>
          </div>
      </div>
      <div className="px-8 col-span-4 my-2">
          <span class="text-gray-700 px-5"><b>HER2 Score</b></span>
          <div class="mt-2 col-span-3">
          <div className="grid grid-cols-2">
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Current Smoker"/>
              <span class="ml-2 text-gray-700">0</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">0~1+</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">1+</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">2</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">2+</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">3+</span>
            </label>
          </div>
          </div>
      </div>
      <div className="px-8 col-span-3">
          <span className="text-gray-700"><b>Ki-67 Index (1-95 %)</b></span>
          <div className="grid grid-cols-5 py-2">
              <div className="col-span-5 mb-1">
                <select class="w-full border bg-white rounded px-3 py-2 outline-none">
                  <option class="py-1">User-Defined list</option>
                  <option class="py-1">Option 2</option>
                  <option class="py-1">Option 3</option>
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
      </div>
      <div className="col-span-10">
      <div className="bottom-0 right-0 mt-2 mb-3 pr-3">
        <button class="bg-blue-500 float-right hover:bg-blue-700 mb-3 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
          Search Information
        </button>
        <button class="bg-white float-right hover:bg-blue-700  hover:text-white mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded">
          Reset
        </button>
      </div>
      </div>
    </div>
  )
}


// <div className="relative col-span-2 px-2">
//   <div className="absolute top-1 bottom-0 right-5">
//       <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//         Reset
//       </button>
//       <button class="bg-blue-500 hover:bg-blue-700 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
//         Sample Information Search
//       </button>
//   </div>
// </div>
