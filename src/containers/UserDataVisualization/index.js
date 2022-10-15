import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { getUserDataProjectsTableData } from '../../actions/api_actions'
import { useSelector, useDispatch } from "react-redux";
import UserFilesTable from './Components/TableDisplay/table'
import FileUpload from './Components/MainComponents/NewClinicalFileUpload'
import FileUploadDropdowncomponent from "./Components/MainComponents/FileUploadDropdowncomponent";
import FileProjectDataTable from "./Components/MainComponents/FileProjectDataTable";

import { useHistory } from "react-router-dom";

export default function DataVisualization() {
  let history = useHistory();
  // const userDataTableData = useSelector(state => state.dataVisualizationReducer.userProjectsDataTable)
  const [componentNumber, setComponentNumber] = useState(0)
  const [hideupload, setHideUpload] = useState(false)
  // const [showVisualization, setShowviualization] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const dispatch = useDispatch()
  const fileUploadCallBack = (d_) => {
    // setTimeout(() => setHideUpload(true), 10000)
  }
  const [uploadNewSamplesToggle, setUploadNewSamplesToggle] = useState('Upload new Samples')

  

  
  const accessToken = localStorage.getItem('ncc_access_token')
  // const viusalizationCall = (da) => {
  //   setShowviualization(true)
  // }

  useEffect(() => {
    if(accessToken){
      console.log("inside index");
      // dispatch(getUserDataProjectsTableData())
    }else{
      history.push("/login")
    }
  }, [accessToken])

  const updateComponentNumber = (num) =>{
    setComponentNumber(num)
  }
  
  return (
    <div className="w-full">
      <div className="flex flex-row-reverse">
        
      </div>
      {!showLoginForm && <div className="m-4 max-w-full">
        <div>
          
          { !hideupload && componentNumber === 0 && 
            <FileUpload parentCallBack={fileUploadCallBack} updateComponentNumber ={updateComponentNumber}  />
            }
          { componentNumber === 1 && 
            <FileUploadDropdowncomponent updateComponentNumber ={updateComponentNumber}  />
          }
          { componentNumber === 2 && 
            <FileProjectDataTable updateComponentNumber ={updateComponentNumber}  />
          }
        </div>
      </div>}
    </div>
  )
}

