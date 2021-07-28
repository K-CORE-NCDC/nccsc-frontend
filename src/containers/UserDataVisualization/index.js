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
import TabsComponent from './Components/TabsComponet';

// import '../../index.css'

export default function DataVisualization() {
  const [hideupload,setHideUpload] = useState(true)
  const fileUploadCallBack = (d_) =>{
    setTimeout(() => setHideUpload(true), 10000)
  }

  return (
    <div className="w-full">
      {hideupload?
        <TabsComponent/>
        :<FileUpload parentCallBack={fileUploadCallBack}/>
      }
    </div>
  )
}

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
