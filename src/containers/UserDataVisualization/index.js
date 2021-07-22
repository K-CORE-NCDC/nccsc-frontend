import React,{useState,useEffect,useRef} from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { file_upload } from '../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";
import Loader from './Widgets/loader';
import Table from './Widgets/Table'

// import '../../index.css'
export default function DataVisualization() {
  const response = useSelector((data) => data.homeReducer.fileUploadData);
  const dispatch = useDispatch()
  const [state,setState] = useState([])
  const [select,setSelect] = useState({})
  const [error, setError] = useState(false)
  const [error_message, setErrorMessage] = useState({type:"", message:""})
  const [ loader, setLoader] = useState({child_1:false,child_2:false,child_3:false,child_4:false})
  // const [uploadFile, setUploadFile] = useState({clinical:""})
  const [fileData, setFileData] = useState({clinical:"", rna:"",dna:"", porteme:""})
  const [uploadFile, setUploadFile] = useState({})
  const fileInputRef = useRef()


  useEffect(()=>{
    if(response){
      // Object.keys(response).forEach(function(key, value) {
      //   setFileData(prevState => ({
      //         ...prevState,
      //         [key]:response[key]
      //   }));
      //   let loader_state = select
      //   const key_loader = Object.keys(loader_state).find(key_ => loader_state[key_] === key);
      //   setLoader(prevState => ({
      //         ...prevState,
      //         [key_loader]:false
      //   }));
      // })
      console.log(response)
    }
  },[response])


  const selectGene = (event) => {
    const {name,value} = event.target;
    setSelect(prevState => ({
          ...prevState,
          [name]: value
    }));
    localStorage.setItem(name,value)
  }

  const handle_error = (type_, message) =>{
    setErrorMessage(prevState => ({
          ...prevState,
          type: type_,
          message:message
    }));
  }

  const file_types = {
    clinical:["xlsx"],
    dna:['txt','maf'],
    rna:["txt"],
    proteme:["txt"]
  }

  const file_Upload = (e, div_name) =>{
      let type_name = localStorage.getItem(div_name);
      if(type_name){
        let file_name = e.target.files[0]['name']
        let extension = file_name.split('.')
        let validation_error = file_types[type_name].includes(extension[1])?false:true
        if(validation_error){
          setError(true)
          handle_error(e.target.name, "please upload file in ."+file_types[type_name].join(" .")+"  format")
        }
        else{
          setUploadFile(prevState => ({
                ...prevState,
                [div_name]: {type:type_name,file:e.target.files[0]}
          }));
        }
      }
  }

  let s = ""

  const addHtml = (e,id) => {
    let t = state
    id = id+1

    if (t.length<=2){
      setSelect(prevState => ({
          ...prevState,
          ['child_'+id]: "clinical"
      }));
      localStorage.setItem('child_'+id,"clinical")
      // setUploadFile(prevState => ({
      //     ...prevState,
      //     ['child_'+id]: {type:"clinical",file:""}
      // }));


      t.push(
        <div key={'child_'+id} className="grid grid-cols-12 gap-6 ">
          <div className="relative w-full col-span-5 ">
            <select value={select['child_'+id]} name={'child_'+id}
            onChange={e=>selectGene(e)}
            className='w-full p-4 border focus:outline-none border-blue-300 focus:ring focus:border-blue-300 mt-3'>
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
              <input type='file'
              className="hidden"
              // ref={fileInputRef}
              onChange={(e)=>file_Upload(e, 'child_'+id)}
              />
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

  const on_upload = (e) =>{
    let files_ = uploadFile;
    Object.keys(files_).forEach(function(key, value) {
      let for_loader = files_[key]['type'];
      setLoader(prevState => ({
            ...prevState,
            [key]:true
      }));
      dispatch(file_upload(files_[key]))
    })
  }


  return (
    <div className="py-20 h-screen ">
      {error?<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">{error_message['type']}</strong>
          <span class="block sm:inline">  {error_message['message']}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            onClick={(e)=>setError(false)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>:""}
      <div className="grid grid-cols-6 mt-10">
        <div className=" col-start-2 col-span-4 bg-white  space-y-3 px-6 py-10 rounded-3xl shadow-lg border ">
          <div className="relative w-full col-span-12 ">
            <h2>Upload</h2>
          </div>
          <div key='child_1' className="grid grid-cols-12 gap-6 ">
            <div className="relative w-full col-span-5 ">
              <select value={select['child_1']} onChange={e=>selectGene(e)}
              name="child_1"
              className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
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
                <input type='file'  className="hidden" name={select['child_1']} onChange={(e)=>file_Upload(e, "child_1")}/>
              </label>
            </div>
            <div className='p-5 flex'>
              <PlusCircleIcon className='w-10' id="plus_1" data-id="1" onClick={e=>addHtml(e,1)}/>
              {loader['child_1']?<Loader/>:""}
            </div>
          </div>
          {state}
          <div className="relative w-full col-span-12 text-center">
            <button className="bg-white  w-80 h-20  mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded">
              Reset
            </button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={on_upload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 mt-10">
        <div className="col-start-2 col-span-4 space-y-3 px-6 py-10">

        </div>
      </div>
    </div>
  )
}
{response?<Table data_={fileData}/>:""}

// {loader['child_'+id]?<Loader/>:""}
