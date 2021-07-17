import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
// import '../../index.css'


export default function DataVisualization() {
  const [state,setState] = useState([])

  useEffect(()=>{


  },[])

  const addHtml = (e,id) => {
    let t = state
    id = id+1

    if (t.length<=2){
      t.push(
        <div key={'child_'+id} className="grid grid-cols-12 gap-6 ">
          <div className="relative w-full col-span-5 ">
            <select value='clinical' onChange={e=>selectGene(e)} className='w-full p-4 border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 mt-3'>
              <option value="clinical">Clinical</option>
              <option value="rna">RNA</option>
              <option value="dna">DNA</option>
              <option value="proteme">Porteme</option>
            </select>
          </div>
          <div className='relative col-span-5 w-full '>
            <label
              className="w-full block text-right border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 p-4 mt-3">
              <span className="inline-block px-8 py-2 text-md  leading-none text-white-100 bg-gray-300 rounded">Select</span>
              <input type='file' className="hidden" />
            </label>
          </div>
          <div className='p-5 flex'>
            <PlusCircleIcon className='w-10' id={"plus_"+id} onClick={e=>addHtml(e,id)}/>
            <MinusCircleIcon className='w-10' id={"minus_"+id} onClick={e=>removeHtml(e,id)}/>
          </div>
        </div>
      )
      setState([...t])
    }
  }

  const removeHtml = (e,id) =>{
    let t = state
    let tmp = []
    for (var i = 0; i < t.length; i++) {
      let key = t[i].key
      if(key ==='child_'+id){
        t.splice(i,1)
      }
    }
    setState([...t])

  }

  const selectGene = (event) => {

  }

  return (
    <div className="py-20 h-screen ">
      <div className="grid grid-cols-6">
        <div className=" col-start-2 col-span-4 bg-white  space-y-3 px-6 py-10 rounded-3xl shadow-lg border ">
          <div className="relative w-full col-span-12 ">
            <h2>Upload</h2>
          </div>
          <div key='child_1' className="grid grid-cols-12 gap-6 ">
            <div className="relative w-full col-span-5 ">
              <select value='clinical' onChange={e=>selectGene(e)} className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                <option value="clinical">Clinical</option>
                <option value="rna">RNA</option>
                <option value="dna">DNA</option>
                <option value="proteme">Porteme</option>
              </select>
            </div>
            <div className='relative col-span-5 w-full '>
              <label
                className="w-full block text-right border focus:outline-none border-b-color focus:ring focus:border-blue-300 p-4 mt-3">
                <span className="inline-block px-8 py-2 text-md  leading-none text-white-100 bg-gray-300 rounded">Select</span>
                <input type='file' className="hidden" />
              </label>
            </div>
            <div className='p-5'>
              <PlusCircleIcon className='w-10' id="plus_1" data-id="1" onClick={e=>addHtml(e,1)}/>
            </div>
          </div>
          {state}
          <div className="relative w-full col-span-12 text-center">
            <button class="bg-white  w-80 h-20  mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded">
              Reset
            </button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button class="bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded" >
              Upload
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
