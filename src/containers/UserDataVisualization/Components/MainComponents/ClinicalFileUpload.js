import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  BeakerIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  DownloadIcon
} from '@heroicons/react/outline'
import { file_upload } from '../../../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../Widgets/loader';
import FileSaver from 'file-saver';

export default function FileUpload({ parentCallBack }) {
  // const parentRef = useRef(null);
  const response = useSelector((data) => data.homeReducer.fileUploadData);
  const dispatch = useDispatch()
  const [state, setState] = useState([])
  const [select, setSelect] = useState({})
  const [error, setError] = useState(false)
  const [error_message, setErrorMessage] = useState({ type: "", message: "" })
  const [loader, setLoader] = useState({ child_1: false, child_2: false, child_3: false, child_4: false })
  // const [uploadFile, setUploadFile] = useState({clinical:""})
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadFile, setUploadFile] = useState({})
  const fileInputRef = useRef()

  const [initialInputState, setInitialInputState] = useState(undefined)
  const [selectedFileSampleType, setSelectedFileSampleType] = useState({ 1: "clinical_information" })

  useEffect(() => {
    // addHtml()
  }, [select])

  console.log(selectedFileSampleType);
  console.log(uploadFile);

  useEffect(() => {
    if (response) {
      Object.keys(response).forEach(function (key, value) {
        // localStorage.setItem(key, false)
        // console.log(localStorage)

        // localStorage.removeItem(key)
        // setFileData(prevState => ({
        //       ...prevState,
        //       [key]:response[key]
        // }));
        // let loader_state = select
        // const key_loader = Object.keys(loader_state).find(key_ => loader_state[key_] === key);
        setLoader(prevState => ({
          ...prevState,
          [key]: false
        }));
      })
    }
  }, [response])


  const selectGene = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setSelect(prevState => ({
      ...prevState,
      [name]: value
    }));
    localStorage.setItem(name, value)
  }

  const handle_error = (type_, message) => {
    setErrorMessage(prevState => ({
      ...prevState,
      type: type_,
      message: message
    }));
  }

  const file_types = {
    clinical_information: ["xlsx", 'csv'],
    dna_mutation: ['txt', 'maf', "xlsx", 'csv'],
    dna_methylation: ['txt', 'maf', "xlsx", 'csv'],
    rna_zscore: ["txt", "xlsx", 'csv'],
    proteome: ["txt", "xlsx", 'csv']
  }

  const file_Upload_ = (e, div_name) => {
    let selected_files = selectedFiles;
    let type_name = e.target.name;

    if (type_name) {
      let file_name = e.target.files[0]['name']
      selectedFiles.push(file_name)
      let extension = file_name.split('.')
      let validation_error = file_types[type_name].includes(extension[1]) ? false : true
      if (validation_error) {
        setError(true)
        handle_error(e.target.name, "please upload file in ." + file_types[type_name].join(" .") + "  format")
      }
      else {
        setUploadFile(prevState => ({
          ...prevState,
          [e.target.name]: { type: type_name, file: e.target.files[0] }
        }));
        setSelectedFiles([...selected_files])
      }
    }
  }

  const renderSwitch = (param) => {
    switch (param) {
      case 'clinical_information':
        return "/SAMPLE_FILES/clinical_information.xlsx";
      case 'rna_zscore':
        return "/SAMPLE_FILES/rna_zscore.xlsx";
      case 'dna_mutation':
        return "/SAMPLE_FILES/dna_mutation.xlsx";
      case 'dna_methylation':
        return "/SAMPLE_FILES/dna_methylation.xlsx";
      case 'proteome':
        return "/SAMPLE_FILES/global_proteome_rawdata.xlsx";
      default:
        return "/SAMPLE_FILES/clinical_information.xlsx";
    }
  }

  const on_upload = (e) => {
    let files_ = uploadFile;
    Object.keys(files_).forEach(function (key, value) {
      let for_loader = files_[key]['type'];
      setLoader(prevState => ({
        ...prevState,
        [key]: true
      }));
      dispatch(file_upload(files_[key], key));
      parentCallBack({ "hide": true, "selected_keys": select });
    })
  }

  const testFunction = (e) => {
    console.log(e.target.value, e.target.name);
    setSelectedFileSampleType((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const addNewHTML = () => {
    const newElementId = Math.max(...Object.keys(selectedFileSampleType)) + 1
    if(newElementId<6){
      setSelectedFileSampleType((prevState) => ({
        ...prevState,
        [newElementId]: "clinical_information"
      }))
    }
  }

  const deleteHtml = (e) => {
    let deleteKey = e.target.id
    let selected_ = selectedFiles
    if (deleteKey !== 1) {
      let activeElementKeys = {}
      Object.keys(selectedFileSampleType).forEach(key =>{
        if(key != deleteKey){
          activeElementKeys = {...activeElementKeys, [key]: selectedFileSampleType[key]}
          selected_.splice(key, 1)
        }
      })
      setSelectedFileSampleType(activeElementKeys)
      setSelectedFiles([...selected_])
    }
  }

  useEffect(() => {
    let firstInput = []
    Object.keys(selectedFileSampleType).forEach(key => {
      firstInput.push(
        <div key={key} className="grid grid-cols-12 gap-6 ">
          <div className="relative w-full col-span-4">
            <select value={selectedFileSampleType[key]} onChange={testFunction}
              name={key}
              className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
              <option value="clinical_information">Clinical Information</option>
              <option value="rna_zscore">RNA</option>
              <option value="dna_mutation">DNA Mutation</option>
              <option value="dna_methylation">DNA Methylation</option>
              <option value="proteome">Porteome</option>
            </select>
          </div>
          <div className='relative col-span-4 w-full '>
            <label
              className="w-full block text-right border focus:outline-none border-b-color focus:ring focus:border-blue-300 p-4 mt-3">
              <span className="inline-block px-8 py-2 text-md  leading-none text-white-100 bg-gray-300 rounded">Select</span>
              <input type='file' className="hidden"  name={selectedFileSampleType[key]} filename={key} onChange={file_Upload_} />
            </label>
          </div>
          <div className='p-5 col-span-2 flex'>
            <PlusCircleIcon className='w-10' id="plus_1" data-id="1" onClick={addNewHTML} />
            {key>1 && <MinusCircleIcon className='w-10' id={key} onClick={deleteHtml} />}
            {loader["child_1"] ? <Loader /> : ""}
          </div>
          <div className="relative w-full col-span-2">
            <div className="pt-8 pr-0 pl-0">
              <a href={renderSwitch(selectedFileSampleType[key])} className="no-underline hover:underline text-blue-500" download>
                Download Sample
                <DownloadIcon className='w-10' />
              </a>
            </div>
          </div>
        </div>
      )
    })
    setInitialInputState(firstInput)
  }, [selectedFileSampleType])


  return (
    <div className="py-20 h-screen ">
      {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">{error_message['type']}</strong>
        <span className="block sm:inline">  {error_message['message']}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-red-500" role="button"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            onClick={(e) => setError(false)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
      </div> : ""}
      <div className="grid grid-cols-6 mt-10">
        <div className=" col-start-2 col-span-4 bg-white  space-y-3 px-6 py-10 rounded-3xl shadow-lg border ">
          <div className="relative w-full col-span-12 ">
            <div className="pb-3">{selectedFiles ? <h2> Selected Files: <b>{selectedFiles.join(', ')}</b></h2> : ""}</div>
            <h2>Upload</h2>
          </div>
          {initialInputState}
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
    </div>
  )
}
