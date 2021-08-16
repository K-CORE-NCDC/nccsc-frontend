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
import FileUpload from './Components/MainComponents/ClinicalFileUpload'
import TabelDisplay from './Components/TableDisplay/'
import Visualization from './Components/Visualizations'


export default function DataVisualization() {
  const [hideupload,setHideUpload] = useState(false)
  const [showVisualization,setShowviualization] = useState(false)
  const fileUploadCallBack = (d_) =>{
    // setTimeout(() => setHideUpload(true), 10000)
  }

  const viusalizationCall = (da) =>{
    setShowviualization(true)
  }

  return (
    <div className="w-full">
      {hideupload?showVisualization?<Visualization/>:<TabelDisplay parentcallBack={viusalizationCall}/>:<FileUpload parentCallBack={fileUploadCallBack}/>}
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
