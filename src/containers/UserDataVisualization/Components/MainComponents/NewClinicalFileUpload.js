import React, { useState, useEffect,useContext, useRef } from "react";
import {
  PlusCircleIcon,
  MinusCircleIcon,

} from '@heroicons/react/outline'
import { new_file_upload,uploadClinincalSamples,clear_new_file_upload_state } from '../../../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";
import XLSX from 'xlsx';
import Loader from '../../Widgets/loader';
import { useHistory } from 'react-router-dom'
import ExampleUserTable from "../TableDisplay/cellColorTable";
import DataTable from 'react-data-table-component';
import { Context } from "../../../../wrapper";

import config from "../../../../config";
import CircosPlotGuidelines from "../GuideLines/CircosPlotGuidelines";
import CircosPlotGuidelinesKorean from "../GuideLines/CircosPlotGuidelinesKorean"
import OncoprintGuidelines from "../GuideLines/OncoprintGuidelines";
import LollipopGuidelines from "../GuideLines/LollipopGuidelines";
import VolcanoPlotGuidelines from "../GuideLines/VolcanoPlotGuidelines";
import VolcanoPlotGuidelinesKorean from "../GuideLines/VolcanoPlotGuidelinesKorean";
import HeatmapGuideliens from "../GuideLines/HeatMapGuidelines";
import SurvivalGuidelines from "../GuideLines/SurvivalGuidelines";
import SurvivalGuidelinesKorean from "../GuideLines/SurvivalGuidelinesKorean";
import FusionPlotGuidelines from "../GuideLines/FusionPlotGuidelines";
import FusionPlotGuidelinesKorean from "../GuideLines/FusionPlotGuidelinesKorean";
import CNVGuidelines from "../GuideLines/CNVGuidelines";
import CNVGuidelinesKorean from "../GuideLines/CNVGuidelinesKorean"
import BoxPlotGuidelines from "../GuideLines/BoxPlotGuidelines";
import BoxPlotGuidelinesKorean from "../GuideLines/BoxPlotGuidelinesKorean";
import CorrelationGuidelines from "../GuideLines/CorrelationGuidelines";
import OncoprintGuidelinesKorean from "../GuideLines/OncoprintGuidelinesKorean";
import LollipopplotGuidelinesKorean from "../GuideLines/LollipopGuidelinesKorean";
import HeatMapGuidelinesKorean from "../GuideLines/HeatmapGuidelinesKorean";







function Modal({ showModal, setShowModal, body }) {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Error in the uploaded file
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-2xl leading-relaxed">
                    {body}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

const InforIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
}


export default function FileUpload({ parentCallBack, updateComponentNumber}) {
  const projectNameRef = useRef(null);
  const history = useHistory()
  const response = useSelector((data) => data.homeReducer.fileUploadData);
  const clinicalfileresponse = useSelector((data) => data.homeReducer.newFileUploadData);
  const dispatch = useDispatch()
  const [state, setState] = useState([])
  const [select, setSelect] = useState({})
  const [error, setError] = useState(false)
  const [error_message, setErrorMessage] = useState({ type: "", message: "" })
  const [loader, setLoader] = useState({})
  // const [uploadFile, setUploadFile] = useState({clinical:""})
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadFile, setUploadFile] = useState({})
  const [projectName, setProjectName] = useState("")
  const [formSbubmitButtonText, setFormSubmitButtonText] = useState("upload")
  const [showModal, setShowModal] = useState(false)
  const [showModalInfo, setShowModalInfo] = useState(false)
  const [modalData, setModalData] = useState([])
  const [initialInputState, setInitialInputState] = useState(undefined)
  const [componentNumber, setComponentNumber] = useState(0)
  const [selectedFileSampleType, setSelectedFileSampleType] = useState({
    1: "clinical_information",
  })
  const [dropdownOptionsSelected, setDropdownOptionsSelected] = useState({
    1: {
      clinical_information: "Clinical Information",
      rna: "RNA",
      dna_mutation: "DNA Mutation",
      methylation: "DNA Methylation",
      proteome: "proteome",
      phospho: "phospho",
      cnv: "cnv",
      fusion: "fusion"
    }
  })
  const [fileDataAsTableAll, setFileDataAsTableAll] = useState({})
  const [fileDataAsTableRendered, setFileDataAsTableRendered] = useState({})
  const [showFileDataTable, setShowFileDataTable] = useState(false)
  const [tableNavTabs, setTableNavTabs] = useState([])
  const [activeTableKey, setActiveTableKey] = useState("")
  const [disableUploadButton, setDisableUploadButton] = useState(true)
  const [borderRed, setBorderRed] = useState(false)

  // const tableColumnsData = [
  //   {
  //     name: "geneName",
  //     selector: (row) => {
  //       return row.gene;
  //     },
  //     sortable: true,
  //     classNames: ["report_sankey"],
  //     style: {
  //       borderLeft: "1px solid #fff",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },

  //   {
  //     name: "Yes",
  //     selector: (row) => {
  //       if (row.dna === "YES") {
  //         if (row.gene in reportData["variant_info"]) {
  //           let variants = reportData["variant_info"][row.gene];
  //           variants = variants.join("-");
  //           return (
  //             <div data-bs-toggle="tooltip" title={variants}>
  //               {"O " + "(" + reportData["variant_info"][row.gene].length + ")"}
  //             </div>
  //           );
  //         } else {
  //           return row.dna;
  //         }
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #6F7378",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  //   {
  //     name: "No",
  //     selector: (row) => {
  //       if (row.dna === "NO") {
  //         return "O ";
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #ABB0B8",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  //   {
  //     name: "High",
  //     selector: (row) => {
  //       if (row.rna === "HIGH") {
  //         return "O ";
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #6F7378",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  //   {
  //     name: "Intermediate",
  //     selector: (row) => {
  //       if (row.rna !== "HIGH" && row.rna !== "LOW") {
  //         return "O ";
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #ABB0B8",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  //   {
  //     name: "Low",
  //     selector: (row) => {
  //       if (row.rna === "LOW") {
  //         return "O ";
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #ABB0B8",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  //   {
  //     name: "High",
  //     selector: (row) => {
  //       if (row.proteome === "HIGH") {
  //         return "O ";
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #6F7378",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  //   {
  //     name: "Intermediate",
  //     selector: (row) => {
  //       if (row.proteome !== "HIGH" && row.proteome !== "LOW") {
  //         return "O ";
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #ABB0B8",
  //       borderRight: "1px solid #fff",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  //   {
  //     name: "Low",
  //     selector: (row) => {
  //       if (row.proteome === "LOW") {
  //         return "O ";
  //       } else return "";
  //     },
  //     sortable: true,
  //     style: {
  //       borderLeft: "1px solid #ABB0B8",
  //       borderRight: "1px solid #6F7378",
  //       boxSizing: "border-box",
  //       textAlign: "center",
  //       display: "block",
  //       lineHeight: "3.5",
  //     },
  //   },
  // ];


  const resetStates = () => {
    dispatch(clear_new_file_upload_state())
    setSelectedFileSampleType({
      1: "clinical_information",
    })
    setDropdownOptionsSelected({
      1: {
        clinical_information: "Clinical Information",
        rna: "RNA",
        dna_mutation: "DNA Mutation",
        methylation: "DNA Methylation",
        proteome: "proteome",
        phospho: "phospho",
        cnv: "cnv",
        fusion: "fusion"
      }
    })
    setSelectedFiles({})
    setUploadFile([])
  }

  const hideModal = (hide) => {
    setShowModalInfo(hide)
  }

  const setShowModalFunction = (stateData) => {
    setShowModal(stateData)
  }
  useEffect(()=>{
    dispatch(clear_new_file_upload_state())
  },[])

  useEffect(() => {
    if (Object.values(loader).some(element => (element === 'failed'))) {
      setFormSubmitButtonText('retry')
    }
  }, [loader])

  const dropdownOptions = {
    clinical_information: "Clinical Information",
    rna: "RNA",
    dna_mutation: "DNA Mutation",
    methylation: "DNA Methylation",
    proteome: "proteome",
    phospho: "phospho",
    cnv: "cnv",
    fusion: "fusion"
  }

  const changeErrorDataTable = (tableTabName) => {
    setActiveTableKey(tableTabName)
    setFileDataAsTableRendered(fileDataAsTableAll[tableTabName])
  }


  const updateFileTypeOnChange = (e) => {
    const divName = e.target.name
    const divValue = e.target.value
    setDropdownOptionsSelected(prevState => ({
      ...prevState,
      [divValue]: dropdownOptions[divValue]
    }))
    setSelectedFileSampleType((prevState) => ({
      ...prevState,
      [divName]: divValue
    }))
  }


  useEffect(() => {
    let filesUploadedStatus = undefined
    if (response) {
      filesUploadedStatus = response.files
    }

    if (filesUploadedStatus) {
      Object.keys(filesUploadedStatus).forEach(fileType => {
        if (filesUploadedStatus[fileType]) {
          setLoader((prevState) => ({ ...prevState, [fileType]: 'success' }))
        } else {
          setLoader((prevState) => ({ ...prevState, [fileType]: 'failed' }))
        }
      })
    }
    if (filesUploadedStatus) {
      let errorModalData = []
      let modaShowTemp = false
      Object.keys(filesUploadedStatus).forEach(element => {
        if (filesUploadedStatus[element] === false) {
          modaShowTemp = true
          let errorFileName = '' // uploadFile[element]['file'].name
          Object.keys(uploadFile).forEach(e => {
            if (uploadFile[e].type === element) {
              errorFileName = uploadFile[e]['file'].name
            }
          })
          errorModalData.push(
            <div key={element} className="text-black">
              <h6 className="text-red-500">{errorFileName}</h6>
              is invalid, check sample file for reference
            </div>
          )
        }
      })
      setModalData(errorModalData)
      setShowModal(modaShowTemp)

      if (Object.values(filesUploadedStatus).some(element => (element === false))) {
        setFormSubmitButtonText('retry')
      } else {
        setFormSubmitButtonText('visualize')
      }
    }
    if (filesUploadedStatus && filesUploadedStatus.table) {
      setFileDataAsTableAll(filesUploadedStatus.table)
    }
  }, [response])

  useEffect(() => {
    if (fileDataAsTableAll) {
      let currentRenderedTable = Object.keys(fileDataAsTableAll)
      if (currentRenderedTable.length > 0) {
        setFileDataAsTableRendered(fileDataAsTableAll[currentRenderedTable[0]])
        setActiveTableKey(currentRenderedTable[0])
        setShowFileDataTable(true)
      }
    }
  }, [fileDataAsTableAll])

  useEffect(() => {
    if (projectName) {
      if (selectedFiles.length === Object.keys(selectedFileSampleType).length) {
        setDisableUploadButton(false)
      } else {
        setDisableUploadButton(true)
      }
    } else {
      setDisableUploadButton(true)
    }
  }, [projectName, selectedFiles, selectedFileSampleType])

  useEffect(() => {
    let allTableTabs = Object.keys(fileDataAsTableAll)
    let tableNavTabsTemp = []
    allTableTabs.forEach(element => {
      let css = "px-4 py-2 font-semibold rounded-t opacity-50"
      if (activeTableKey === element) {
        css += " border-blue-400 border-b-4 -mb-px opacity-100"
      }
      tableNavTabsTemp.push(
        <li key={element} className={css}>
          <button value={element} onClick={() => changeErrorDataTable(element)} className="capitalize" >{dropdownOptions[element]}</button>
        </li>
      )
    })
    setTableNavTabs(tableNavTabsTemp)
  }, [activeTableKey])

  useEffect(() => {
    if (projectName.length > 0) {
      setBorderRed(false)
    }
  }, [projectName])

  useEffect(() => {
    Object.keys(uploadFile).forEach(element => {
      if (uploadFile[element].type !== selectedFileSampleType[element]) {
        setUploadFile(prevState => ({
          ...prevState,
          [element]: { file: prevState[element].file, type: selectedFileSampleType[element] }
        }))
      }
    })

  }, [selectedFileSampleType])

  useEffect(() => {
    let firstInput = []

    Object.keys(selectedFileSampleType).forEach(key => {

      firstInput.push(
        <div key={key} className="grid grid-cols-12 gap-6 ">
          <div className="relative w-full col-span-4">

            <select onChange={updateFileTypeOnChange}
              name={key}
              defaultChecked={selectedFileSampleType[key]}
              value={selectedFileSampleType[key]}
              className='select-color w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
              
              {Object.keys(dropdownOptionsSelected[key]).map(type => (
                <option className='text-gray-900' key={type} value={type}>{dropdownOptionsSelected[key][type]}</option>
              ))}
            </select>
          </div>
          <div className='relative col-span-4 w-full '>
            <label
              className="select-color w-full block text-right border focus:outline-none border-b-color focus:ring focus:border-blue-300 p-4 mt-3">
              <input type='file' className="w-full" data={key} name={selectedFileSampleType[key]} id="user-file-input" filename={key} onChange={file_Upload_} />
            </label>
          </div>
          <div className='p-5 col-span-2 flex'>
            <div className="inline-flex items-center">
              <PlusCircleIcon height="2em" className="h-10 w-10" viewBox="0 0 24 24" id="plus_1" data-id="1" onClick={addNewHTML} />
            </div>
            {key > 1 && <MinusCircleIcon height="2em" className="h-10 w-10" viewBox="0 0 24 24" id={key} onClick={deleteHtml} />}
            {(loader[selectedFileSampleType[key]] === 'success') && <section className="">
              <div className="mr-6 bg-green-500 rounded px-4 py-2  text-center -ml-3">
                <svg fill="none" viewBox="0 0 24 24" className="w-8 h-8 text-white" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </section>}
            {(loader[selectedFileSampleType[key]] === 'loader') && <Loader />}
            {(loader[selectedFileSampleType[key]] === 'failed') && <strong className="text-red-700 font-bold">Failed!</strong>}
          </div>
          {/* <div className="relative w-full col-span-2">
            <div className="pt-8 pr-0 pl-0">
              <a href={renderSwitch(selectedFileSampleType[key])} className="no-underline hover:underline text-blue-500" download>
                Download Sample
                <DownloadIcon className='w-10' />
              </a>
            </div>
          </div> */}
        </div>
      )
    })
    setInitialInputState(firstInput)
  }, [selectedFileSampleType, loader, selectedFiles])
  

  const file_Upload_ = (e, div_name) => {
    let selected_files = selectedFiles;
    let type_name = e.target.name;
    let divKey = e.target.getAttribute('filename')

    if (type_name && e.target.files) {
      if(e.target.files[0] && 'name' in e.target.files[0] ){
        let file_name = e.target.files[0]['name']
        selectedFiles.push(file_name)
        setUploadFile(prevState => ({
          ...prevState,
          [divKey]: { type: type_name, file: e.target.files[0] }
        }));
        setSelectedFiles([...selected_files])
      }
      

    }
  }

  const renderSwitch = (param) => {
    switch (param) {
      case 'clinical_information':
        return "/SAMPLE_FILES/clinical_information.csv";
      case 'rna_zscore':
        return "/SAMPLE_FILES/rna_zscore.csv";
      case 'dna_mutation':
        return "/SAMPLE_FILES/dna_mutation.csv";
      case 'dna_methylation':
        return "/SAMPLE_FILES/dna_methylation.csv";
      case 'proteome':
        return "/SAMPLE_FILES/global_proteome_rawdata.csv";
      default:
        return "/SAMPLE_FILES/clinical_information.csv";
    }
  }


  const on_upload = () => {
    dispatch(new_file_upload(uploadFile, projectName))
    updateComponentNumber(1)
    for (let key in uploadFile) {
      setLoader((prevState) => ({ ...prevState, [uploadFile[key].type]: 'loader' }))
    }
  }


  const formSubmitButtonActions = () => {
    if (projectName.length > 0) {
      if (formSbubmitButtonText === 'upload') {
        on_upload()
      }
      if (formSbubmitButtonText === 'retry') {
        on_upload()
      }
      if (formSbubmitButtonText === 'visualize') {
        history.push(`/visualise/circos/${response['serializer'].id}`)
      }
    } else {
      projectNameRef.current.focus()
      setBorderRed(true)
    }
  }

 

  const addNewHTML = () => {
    const newElementId = Math.max(...Object.keys(selectedFileSampleType)) + 1
    if (newElementId < 9) {
      let checkedFileTypes = Object.values(selectedFileSampleType)
      let availableTypes = Object.keys(dropdownOptions).filter(step => (!checkedFileTypes.includes(step)))
      let availableTypesJson = {}
      availableTypes.forEach(element => {
        availableTypesJson[element] = dropdownOptions[element]
      })
      setDropdownOptionsSelected(prevState => ({
        ...prevState,
        [newElementId]: availableTypesJson
      }))
      setSelectedFileSampleType((prevState) => ({
        ...prevState,
        [newElementId]: availableTypes[0]
      }))
    }
  }

  const deleteHtml = (e) => {
    let deleteKey = e.target.id
    let selected_ = selectedFiles
    if (deleteKey !== 1) {
      let activeElementKeys = {}
      Object.keys(selectedFileSampleType).forEach(key => {
        if (key != deleteKey) {
          activeElementKeys = { ...activeElementKeys, [key]: selectedFileSampleType[key] }
          selected_.splice(key, 1)
        }
      })
      setSelectedFileSampleType(activeElementKeys)
      setSelectedFiles([...selected_])
    }
  }

  

  
  return (
    <>
      <ModalTest modalStateButton={showModalInfo} setShowModalFunction={hideModal} />
      <div>
        <Modal showModal={showModal} setShowModal={setShowModalFunction} body={modalData} />
      </div>
      {!showFileDataTable && <div className="py-20 h-screen ">
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
              <div className="flex flex-row-reverse ">
                <button onClick={() => setShowModalInfo(true)} className="has-tooltip bg-red-500 hover:bg-red-700 text-white text-center py-2 px-4 rounded-full h-14 w-14 inline-flex items-center">
                  <InforIcon />
                </button>
              </div>
              <div className="flex">
                <div>Project Name:</div>
                <div className="mb-4">
                  <input ref={projectNameRef} onChange={(e) => setProjectName(e.target.value)} value={projectName} className={` ${borderRed ? "border-red-400" : ""} ml-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} required={true} id="project" type="text" placeholder="Project Name" />
                </div>
              </div>
              {/* <div className="pb-3">{selectedFiles ? <h2> Selected Files: <b>{selectedFiles.join(', ')}</b></h2> : ""}</div> */}
              <h2>Upload</h2>
            </div>
            {initialInputState}
            {state}
            <div className="relative w-full col-span-12 text-center">
              <button onClick={resetStates} className="capitalize bg-white  w-80 h-20  mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded">
                Reset
              </button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded ${disableUploadButton ? 'bg-opacity-10' : ''}`}
                onClick={formSubmitButtonActions}
              >
                {formSbubmitButtonText}
              </button>
              
            </div>
          </div>
        </div>
      </div>}
      {showFileDataTable &&
        <div className='col-span-3 gap-6'>
          <button onClick={() => setShowFileDataTable(false)} className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          >
            back to upload
          </button>
          <button onClick={() => history.push(`/visualise/circos/${response['serializer'].id}`)} className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          >
            visualize
          </button>
          <section>
            <nav className=" px-8 pt-2 shadow-md">
              <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " >
                {tableNavTabs}
              </ul>
            </nav>
          </section>
          <section >
            <div id="tab-contents">
              <div>
                <ExampleUserTable tableData={fileDataAsTableRendered} />
              </div>
            </div>
          </section>
        </div>
      }

    </>
  )
}



function SampleDataTable() {
  const[hideClass, setHideClass]= useState(true)
  const[compindex, setIndex]= useState(-1)
  const renderSwitch = {
    'clinical_information': "/SAMPLE_FILES/clinical_information.csv",
    'rna_zscore': "/SAMPLE_FILES/rna_zscore.csv",
    'dna_mutation': "/SAMPLE_FILES/dna_mutation.csv",
    'dna_methylation': "/SAMPLE_FILES/dna_methylation.csv",
    'proteome': "/SAMPLE_FILES/global_proteome_rawdata.csv"
  }

  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);
  
  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  });
  // const data = {
  //   headers: ['type', 'Download', 'Circos plot', 'Oncoprinter', 'Lollipop plot', 'Volcano Plot', 'Heatmap', 'Survival Plot', 'Gene fusion', 'CNV chart', 'Box plot', 'Correlation plot'],
  //   body: [
  //     ['Clinical information', `${config.media}samples/clinical_information.csv`, true, true, true, true, true, true, true, true, true, true],
  //     ['DNA mutation', `${config.media}samples/dna_mutation.csv`, true, true, true, false, true, true, false, false, false, false],
  //     ['RNA', `${config.media}samples/rna_zscore.csv`, true, true, false, true, true, false, false, false, false, false],
  //     ['DNA Methylation', `${config.media}samples/dna_methylation.csv`, true, false, false, false, true, false, false, false, true, false],
  //     ['Phospo Proteome', `${config.media}samples/phospo.csv`, true, true, true, false, true, false, false, false, true, false],
  //     ['Global Proteome', `${config.media}samples/global_proteome_rawdata.csv`, false, false, false, false, true, false, false, false, false, false],
  //     ['Gene fusion', `${config.media}samples/fusion.csv`, true, false, false, false, false, false, true, false, false, false],
  //     ['CNV', `${config.media}samples/cnv.csv`, true, false, false, false, false, false, false, true, false, false]
  //   ]
  // }
  const newdata = {
    headers: ['plots', 'Clinical information', 'DNA mutation', 'RNA', 'DNA Methylation', 'Phospo Proteome', 'Global Proteome', 'Gene fusion', 'CNV'],
    downloads:['', `${config.media}samples/clinical_information.csv`,`${config.media}samples/dna_mutation.csv`,`${config.media}samples/rna_zscore.csv`,`${config.media}samples/dna_methylation.csv`,`${config.media}samples/phospo.csv`,`${config.media}samples/global_proteome_rawdata.csv`,`${config.media}samples/fusion.csv`,`${config.media}samples/cnv.csv`],
    body: [
      ['Circos', true, true, true, true, true, true, true, true],
      ['Oncoprint',  true, true, false, false, false, false, false, false],
      ['Lollipop',  true, true, false, false, false, false, false, false],
      ['Volcano', true, false, true, false, false, false, false, false],
      ['Heatmap', true, false, true, true, true, true, false, false],
      ['Survival',  true, false, false, false, false, false, false, false],
      ['Fusion gene',  true, false, false, false, false, false, false, false],
      ['CNV',  true, false, false, false, false, false, false, true],
      ['Box', true, true, false, false, false, true, false, false],
      ['Correlation', true, false, true, false, false, true, false, false]
    ],
    componets:[CircosPlotGuidelines,OncoprintGuidelines,LollipopGuidelines,VolcanoPlotGuidelines,HeatmapGuideliens,SurvivalGuidelines,FusionPlotGuidelines,CNVGuidelines,BoxPlotGuidelines,CorrelationGuidelines]
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 border border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  {newdata.headers.map(headerName => (
                    <th
                      key={headerName}
                      scope="col"
                      className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider border"
                    >
                      {headerName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                {newdata.downloads.map((d,i) => {
                  if(i === 0){
                    return (<td key = {`${Math.random()*100}`} className="border"></td>)
                  }
                    if(i !== 0){
                      return (<td key={`${Math.random()*100}`+ i} className="px-6 py-4 whitespace-nowrap text-center text-lg font-medium border">
                             <a href={d} className="text-indigo-600 hover:text-indigo-900">
                               download 
                             </a>
                          </td>)
                    }})}
                </tr>
                {newdata.body.map((row, index) => (
                  <>
                  <tr key={index} trindex={index}  >
                    
                    {row.map((cellData, cellIndex) => {
                      if (cellIndex === 0) {
                        return (
                          <td trindex={index} key={`${index}-${cellIndex}-${cellData}`+ Math.random()*100} className="px-6 py-4 whitespace-nowrap border" >
                            <div trindex={index} className="capitalize text-lg text-gray-900" onClick={(e)=>{
                                setIndex(index)
                                for( let i = 0; i<=9;i++){
                                  if(i !== index){
                                    let ele = document.getElementById(`hidden${i}`)
                                    if (!ele.classList.contains('hidden')){
                                      ele.classList.add('hidden');
                                    }
                                  }
                                  else if(i === index){
                                    let ele = document.getElementById(`hidden${i}`)
                                    if (ele.classList.contains('hidden')){
                                      ele.classList.remove('hidden');
                                    }
                                    else if (!ele.classList.contains('hidden')){
                                      ele.classList.add('hidden');
                                    }
                                  }
                                 
                              }
                              }}>{`${cellData}`}
                              </div>
                          </td>
                        )
                      }
                       else {
                        if (cellData === true) {
                          return (
                            <td key={`${index}-${cellIndex}-${cellData}`+ Math.random()*100} className="px-6 py-4 whitespace-nowrap text-center border">
                              <span className="px-2 text-center inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                yes
                              </span>
                            </td>
                          )
                        } else {
                          return (<td key={`${index}-${cellIndex}-${cellData}`+Math.random()*100} className='border'></td>)
                        }
                      }
                    })}
                    
                  </tr>
                  <tr id={`hidden${index}`} className='hidden' trindex={index}>
                  {
                    index === 0 &&   (Englishlanguage ? <td colSpan={9}> <CircosPlotGuidelines/></td> :  <td colSpan={9}> <CircosPlotGuidelinesKorean/></td>)
                  }
                  {
                      index === 1 &&  (Englishlanguage ? <td colSpan={9}> <OncoprintGuidelines/></td> :  <td colSpan={9}> <OncoprintGuidelinesKorean/></td>)
                  }
                  {
                     index === 2 && (Englishlanguage ? <td colSpan={9}> <LollipopGuidelines/></td> :  <td colSpan={9}> <LollipopplotGuidelinesKorean/></td>)
                  }
                  {
                      index === 3 && (Englishlanguage ? <td colSpan={9}> <VolcanoPlotGuidelines/></td> :  <td colSpan={9}> <VolcanoPlotGuidelinesKorean/></td>)
                  }
                  {
                      index === 4 && (Englishlanguage ? <td colSpan={9}> <HeatmapGuideliens/></td> :  <td colSpan={9}> <HeatMapGuidelinesKorean/></td>)
                  }
                  {
                      index === 5 && (Englishlanguage ? <td colSpan={9}> <SurvivalGuidelines/></td> :  <td colSpan={9}> <SurvivalGuidelinesKorean/></td>)
                  }
                  {
                      index === 6 && (Englishlanguage ? <td colSpan={9}> <FusionPlotGuidelines/></td> :  <td colSpan={9}> <FusionPlotGuidelinesKorean/></td>)
                     
                  }
                  {
                     index === 7 && (Englishlanguage ? <td colSpan={9}> <CNVGuidelines/></td> :  <td colSpan={9}> <CNVGuidelinesKorean/></td>)
                   
                  }
                  {
                      index === 8 && (Englishlanguage ? <td colSpan={9}> <BoxPlotGuidelines/></td> :  <td colSpan={9}> <BoxPlotGuidelinesKorean/></td>)
                      
                  }
                  {
                    index === 9 && <td colSpan={9}><CorrelationGuidelines/></td>
                  }
                  </tr>
                  </>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


// let SampleDataTable =()=>{
//   <DataTable

//   sampleKey={circosSanpleRnidListData[sampleKey]}
//   tableColumnsData={tableColumnsData}
//   tableData={tableData}
//   basicInformationData={basicInformationData}
//   closeReportFunction={closeReportFunction}
//   isReportClickedFunction={isReportClickedFunction}
//   isReportClicked={isReportClicked}/>
// }



function ModalTest({ modalStateButton, setShowModalFunction }) {
  return (
    <>
      {modalStateButton ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-auto"
            style={{maxWidth:'1000px'}}  
          >
            <div className="relative w-auto my-6 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h6 className="font-semibold">
                    File Type Description
                  </h6>
                </div>
                {/*body*/}
                <SampleDataTable />
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalFunction(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

