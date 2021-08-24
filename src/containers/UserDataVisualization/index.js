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
import FileUpload from './Components/MainComponents/ClinicalFileUpload'

import { useHistory } from "react-router-dom";

export default function DataVisualization() {
  let history = useHistory();
  const userDataTableData = useSelector(state => state.dataVisualizationReducer.userProjectsDataTable)
  const [hideupload, setHideUpload] = useState(true)
  const [showVisualization, setShowviualization] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const dispatch = useDispatch()
  const fileUploadCallBack = (d_) => {
    // setTimeout(() => setHideUpload(true), 10000)
  }

  // console.log(userDataTableData);
  const accessToken = localStorage.getItem('ncc_access_token')
  const viusalizationCall = (da) => {
    setShowviualization(true)
  }


  useEffect(() => {
    if(accessToken){
      dispatch(getUserDataProjectsTableData())
    }else{
      history.push("/login")
    }
  }, [accessToken])

  

  return (
    <div className="w-full">
      <div className="flex flex-row-reverse">
        <button
          className={`bg-main-blue hover:bg-main-blue w-80 h-20 text-white m-4 font-bold py-2 px-4 border border-blue-700 rounded`}
          onClick={() => setHideUpload(false)}
        >
          Upload new Samples
        </button>
      </div>
      {!showLoginForm && <div>
        {hideupload && <div className="m-4">
          <UserFilesTable userDataTableData={userDataTableData} />
        </div>}
        <div>
          {/* {hideupload ? showVisualization ? <Visualization /> : <TabelDisplay parentcallBack={viusalizationCall} /> : <FileUpload parentCallBack={fileUploadCallBack} />} */}
          {!hideupload && <FileUpload parentCallBack={fileUploadCallBack} />}
        </div>
      </div>}
    </div>
  )
}

// <TabsComponent/>

// ______
// {circosJson && <CircosCmp width={width} data={circosJson}/> }
// <OncoCmp/>
// <LollipopCmp/>
// <VolcanoCmp/>
// <HeatmapCmp/>
// ________

// <TabsComponent/>

// <FileUpload/>


// {response?<Table data_={fileData}/>:""}

// {loader['child_'+id]?<Loader/>:""}
// {loader['child_1']?<Loader/>:""}
