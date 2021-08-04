import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  BeakerIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/outline'
import { file_upload } from '../../../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";

export default function FileUpload({ parentCallBack }) {
  // const parentRef = useRef(null);
  const response = useSelector((data) => data.homeReducer.fileUploadData);
  const dispatch = useDispatch()
  const [state,setState] = useState([])
  const [select,setSelect] = useState({})
  const [error, setError] = useState(false)
  const [error_message, setErrorMessage] = useState({type:"", message:""})
  const [loader, setLoader] = useState({child_1:false,child_2:false,child_3:false,child_4:false})
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
    clinical:["xlsx","xlsx"],
    dna:['txt','maf',"xlsx"],
    rna:["txt","xlsx"],
    proteme:["txt","xlsx"]
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
  const addHtml = (e,id) => {
      let t = state
      id = id+1

      if (t.length<=2){
        setSelect(prevState => ({
            ...prevState,
            ['child_'+id]: "clinical"
        }));
        localStorage.setItem('child_'+id,"clinical")


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
      dispatch(file_upload(files_[key]));
      parentCallBack({"hide":true,"selected_keys":select});
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


// 45
// <footer class="flex justify-end px-8 pb-8 pt-4">
//   <button id="submit" class="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
//     Upload now
//   </button>
//   <button id="cancel" class="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
//     Cancel
//   </button>
// </footer>


// <div class="bg-white sm:px-8 md:px-16 sm:py-8">
//   <main class="container mx-auto max-w-screen-lg h-full">
//     <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);" ondragenter="dragEnterHandler(event);">
//       <div id="overlay" class="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
//         <i>
//           <svg class="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//             <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
//           </svg>
//         </i>
//         <p class="text-lg text-blue-700">Drop files to upload</p>
//       </div>
//       <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
//         <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
//           <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
//             <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
//           </p>
//           <input id="hidden-input" type="file" multiple class="hidden" />
//           <button id="button" class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
//             Upload a file
//           </button>
//         </header>
//
//         <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
//           To Upload
//         </h1>
//
//         <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
//           <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center items-center">
//             <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
//             <span class="text-small text-gray-500">No files selected</span>
//           </li>
//         </ul>
//       </section>
//
//     </article>
//   </main>
// </div>
