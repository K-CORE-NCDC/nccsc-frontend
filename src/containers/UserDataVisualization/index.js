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
import Loader from './Widgets/loader';
import Table from './Widgets/Table'
import UserFilesTable from './Components/TableDisplay/table'
import FileUpload from './Components/MainComponents/ClinicalFileUpload'
import TabelDisplay from './Components/TableDisplay/'
import Visualization from './Components/Visualizations'
import config from "../../config";
import axios from 'axios'


export default function DataVisualization() {
  const userDataTableData = useSelector(state => state.dataVisualizationReducer.userProjectsDataTable)
  const [hideupload, setHideUpload] = useState(true)
  const [showVisualization, setShowviualization] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [userFormData, setUserFormData] = useState({ username: "", password: "" })
  const dispatch = useDispatch()
  const fileUploadCallBack = (d_) => {
    // setTimeout(() => setHideUpload(true), 10000)
  }

  console.log(userDataTableData);
  const accessToken = localStorage.getItem('ncc_access_token')
  const viusalizationCall = (da) => {
    setShowviualization(true)
  }

  const updateUserNamePassword = (e) => {
    setUserFormData(previousState => ({ ...previousState, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (accessToken === null) {
      setShowLoginForm(true)
    } else {
      if (showLoginForm === false) {
        setShowLoginForm(false)
      }
    }
  }, [accessToken])

  useEffect(() => {
    dispatch(getUserDataProjectsTableData())
  }, [])

  const formSubmitAction = (e) => {
    console.log('formsubmit')
    e.preventDefault()
    const url = `${config.auth}api/token/`
    let x = axios({ method: 'POST', url: url, data: userFormData })
    x.then((response) => {
      const data = response.data
      const statusCode = response.status
      console.log(data)
      localStorage.setItem('ncc_access_token', data.access);
      localStorage.setItem('ncc_refresh_token', data.refresh);
      setShowLoginForm(false)
    }).catch((error) => {
      console.log(error)
    })

  }

  return (
    <div className="w-full">
      {showLoginForm && <div>
        <section className="min-h-screen flex flex-col">
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
              <form onSubmit={formSubmitAction} className="text-center">
                <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Sign in
                </h1>
                <div className="py-2 text-left">
                  <input onChange={updateUserNamePassword} type="text" name="username" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="username" />
                </div>
                <div className="py-2 text-left">
                  <input onChange={updateUserNamePassword} name="password" type="password" className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Password" />
                </div>
                <div className="py-2">
                  <button type="submit" className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>}
      <div className="flex flex-row-reverse">
        <button 
        className={`bg-main-blue hover:bg-main-blue w-80 h-20 text-white m-4 font-bold py-2 px-4 border border-blue-700 rounded`}
        onClick={()=>setHideUpload(false)}
        >
          Upload new Samples
        </button>
      </div>
      {hideupload && <div className="m-4">
        <UserFilesTable userDataTableData={userDataTableData} />
      </div>}
      <div>
        {/* {hideupload ? showVisualization ? <Visualization /> : <TabelDisplay parentcallBack={viusalizationCall} /> : <FileUpload parentCallBack={fileUploadCallBack} />} */}
        {!hideupload && <FileUpload parentCallBack={fileUploadCallBack} />}
      </div>
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
