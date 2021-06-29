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

export default function FollowUpInformation() {
  return (
    <div className="grid grid-cols-4 py-8">
      <div className="px-8">
          <span class="text-gray-700 px-5"><b>Cancer Recurrence</b></span>
          <div class="mt-2">
          <div className="grid grid-cols-2">
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Current Smoker"/>
              <span class="ml-2 text-gray-700">Yes</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input type="checkbox" class="form-radio" name="accountType" value="Female"/>
              <span class="ml-2 text-gray-700">No</span>
            </label>
          </div>
          </div>
      </div>
      <div className="block pr-4 px-8">
        <span className="text-gray-700"><b>Time until relapse is confirmed (0.8-186.3 M)</b></span>
        <div className="grid grid-cols-5 py-2">
          <div className="col-span-2">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Jane Doe"/>
          </div>
          <div className="col-span-1">
            <div className="box-border bg-gray-100 h-10 w-30  px-3 border-t-2 border-b-2 border-gray-300 mb-6"> <b className="mx-5 my-5">-</b> </div>
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
