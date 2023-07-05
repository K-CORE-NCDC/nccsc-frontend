import React, { useState, useEffect,useContext, useRef } from "react";
import { SingleFileUpload,clearSingleFIleUploadState } from '../../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Widgets/loader';
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { Context } from "../../../wrapper";
import {FormattedMessage} from 'react-intl';

const SingleDataFileUpload = ({ updateComponentNumber})=> {
    const projectNameRef = useRef(null);
    const history = useHistory()
    const response = useSelector((data) => data.homeReducer.fileUploadData);
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [error_message, setErrorMessage] = useState({ type: "", message: "" })
    const [loader, setLoader] = useState({})
    const [selectedFiles, setSelectedFiles] = useState([])
    const [uploadFile, setUploadFile] = useState({})
    const [projectName, setProjectName] = useState("")
    const [formSbubmitButtonText, setFormSubmitButtonText] = useState("upload")
    const [initialInputState, setInitialInputState] = useState(undefined)
    let { tab } = useParams();
    const allowedTabs = ["circos","lollipop","CNV","heatmap","box","survival"]    
    const charts = {
        "circos":{
            rna: "RNA",
            dna_mutation: "DNA Mutation",
            methylation: "DNA Methylation",
            proteome: "proteome",
            cnv: "CNV",
            fusion: "fusion",
        },
        "lollipop":{
            phospho: "phospho",
            dna_mutation: "DNA Mutation",
        },
        "CNV":{
            cnv: "CNV",
        },
        "heatmap":{
            rna: "RNA",
            methylation: "DNA Methylation",
            proteome: "proteome",
            phospho: "phospho",
        },
        "box":{
            proteome: "proteome",
            dna_mutation: "DNA Mutation",
        },
        "survival":{
          clinical_information: "Clinical Information",
      }
    }

    const [selectedFileSampleType, setSelectedFileSampleType] = useState( ()=>{
        let firstKey = ''
        if (allowedTabs.includes(tab)&&Object.keys(charts).includes(tab))
            firstKey = Object.keys(charts[tab])[0]
        return {1:firstKey}
    })
    const [dropdownOptionsSelected, setDropdownOptionsSelected] = useState(()=>{
        let object = {}
        if (allowedTabs.includes(tab)&&Object.keys(charts).includes(tab))
            object = charts[tab]
        return {1:object}
      }
    )
   
    const [dropdownOptions, setDropdownOptions] = useState(()=>{
        let object = {}
        if (allowedTabs.includes(tab)&&Object.keys(charts).includes(tab))
            object = charts[tab]
        return object
    })
    const [fileDataAsTableAll, setFileDataAsTableAll] = useState({})
    const [showFileDataTable, setShowFileDataTable] = useState(false)
    const [disableUploadButton, setDisableUploadButton] = useState(true)
    const [borderRed, setBorderRed] = useState(false)
    const [koreanlanguage, setKoreanlanguage] = useState(false);
    const [Englishlanguage, setEnglishlanguage] = useState(true);
    const context = useContext(Context);

    useEffect(()=>{
        if(!allowedTabs.includes(tab) ){
            history.push('/notfound/')
        }
    },[tab])

    useEffect(()=>{
        dispatch(clearSingleFIleUploadState())
      },[])
    
    useEffect(() => {
      if (context["locale"] === "kr-KO") {
        setKoreanlanguage(true);
        setEnglishlanguage(false);
      } else {
        setKoreanlanguage(false);
        setEnglishlanguage(true);
      }
    },[context]);
  
    useEffect(()=>{
      if(formSbubmitButtonText === 'upload' || formSbubmitButtonText === '업로드 파일'){
        if(koreanlanguage){
          setFormSubmitButtonText('업로드 파일')
        }
        else{
          setFormSubmitButtonText('upload')
        }
      }
    },[koreanlanguage,Englishlanguage])
  
    useEffect(()=>{
      setErrorMessage({ type: "", message: "" })
    },[])
  
    const resetStates = () => {
      dispatch(clearSingleFIleUploadState())
      setSelectedFileSampleType({
        1: "clinical_information",
      })

      setDropdownOptionsSelected(()=>{
        let object = {}
        if (allowedTabs.includes(tab)&&Object.keys(charts).includes(tab))
            object = charts[tab]
        return {1:object}
      })
      setSelectedFiles({})
      setUploadFile([])
    }
  
    useEffect(() => {
      if (Object.values(loader).some(element => (element === 'failed'))) {
        if(koreanlanguage){
          setFormSubmitButtonText('Retry')
        }
        else{
  
          setFormSubmitButtonText('다시 해 보다')
        }
      }
    }, [loader])
  
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
        Object.keys(filesUploadedStatus).forEach(element => {
          if (filesUploadedStatus[element] === false) {
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
  
        if (Object.values(filesUploadedStatus).some(element => (element === false))) {
          if(koreanlanguage){
            setFormSubmitButtonText('Retry')
          }
          else{
  
            setFormSubmitButtonText('다시 해 보다')
          }
        } else {
          if(koreanlanguage){
            setFormSubmitButtonText('시각화')
          }
          else{
  
            setFormSubmitButtonText('Visualize')
          }
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
  
        firstInput.push(<>
          <dl key={'dl1-'+key} className="boardSearchBox">
              <dt>Select Type:</dt>
              <dd className="selectBox select">
                <select onChange={updateFileTypeOnChange}
                  name={key}
                  defaultChecked={selectedFileSampleType[key]}
                  value={selectedFileSampleType[key]}
                  className='select-color w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                  
                  {Object.keys(dropdownOptionsSelected[key]).map(type => (
                    <option className='text-gray-900' key={type} value={type}>{dropdownOptionsSelected[key][type]}</option>
                  ))}
                </select>
              </dd>
              
          </dl>
          <dl key={'dl2-'+key}>
            <dt>&nbsp;</dt>
            <dd className='inputText'>
              <label
                className="select-color w-full block text-right border focus:outline-none border-b-color focus:ring focus:border-blue-300 p-4 mt-3">
                <input type='file' className="w-full" data={key} name={selectedFileSampleType[key]} id="user-file-input" filename={key} onChange={file_Upload_} />
              </label>
            </dd>
          </dl>
          </>
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
    const on_upload = () => {
        let abcd = uploadFile
        console.log('a-----',abcd)
        abcd = Object.keys(abcd).reduce((acc, key) => {
            const { type, file } = uploadFile[key];
            acc[type] = { type, file };
            return acc;
        }, {});
        setUploadFile(abcd)
        console.log('abcd', abcd)
        dispatch(SingleFileUpload(abcd, projectName))
        updateComponentNumber(1)
        for (let key in uploadFile) {
            setLoader((prevState) => ({ ...prevState, [uploadFile[key].type]: 'loader' }))
        }
    }
  
  
    const formSubmitButtonActions = () => {
      if (projectName.length > 0) {
        if (formSbubmitButtonText === 'upload' || formSbubmitButtonText === '업로드 파일') {
          on_upload()
        }
        if (formSbubmitButtonText === 'retry' || formSbubmitButtonText === '다시 해 보다') {
          on_upload()
        }
        if (formSbubmitButtonText === 'visualize') {
          history.push(`/visualise-singledata/circos/${response['serializer'].id}`)
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
          if (key !== deleteKey) {
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
      
        {!showFileDataTable && 
          <div className="auto ">
            {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">{error_message['type']}</strong>
              <span className="block sm:inline">  {error_message['message']}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-red-500" role="button"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  onClick={(e) => setError(false)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
              </span>
            </div> : ""}
            <div className="formBox">
              <dl>
                <dt>
                  <FormattedMessage id="ProjectName" defaultMessage="Project Name" />:
                </dt> 
                <dd >
                  <div className="inputText">
                    <input ref={projectNameRef} onChange={(e) => setProjectName(e.target.value)} value={projectName} required={true} id="project" type="text" placeholder="Project Name" />
                  </div>
                </dd>
              </dl>
              {initialInputState}
            </div>
            <div className="bottomBtns">
              <div className="flex">
                <button onClick={resetStates} className="btn btnGray bdBtn">
                  <FormattedMessage id="Reset" defaultMessage="Reset" />
                </button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btnPrimary" onClick={formSubmitButtonActions}>
                  {formSbubmitButtonText}
                </button>
              </div>
            </div>
          </div>
        }
        {showFileDataTable &&
          <div >
            <button onClick={() => setShowFileDataTable(false)} className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
            >
              back to upload
            </button>
            <button onClick={() => history.push(`/visualise-singledata/circos/${response['serializer'].id}`)} className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
            >
              visualize
            </button>
          </div>
        }
  
      </>
    )
  }

export default SingleDataFileUpload
  