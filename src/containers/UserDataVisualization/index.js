import React, { useState } from "react";
import FileUpload from './Components/MainComponents/NewClinicalFileUpload'
import FileUploadDropdowncomponent from "./Components/MainComponents/FileUploadDropdowncomponent";
import FileProjectDataTable from "./Components/MainComponents/FileProjectDataTable";

export default function DataVisualization() {
  const [componentNumber, setComponentNumber] = useState()
  const hideupload = false
  const showLoginForm = false
  const fileUploadCallBack = (d_) => {
  }

  const updateComponentNumber = (num) => {
    setComponentNumber(num)
  }

  return (
    <div className="w-full">
      <div className="flex flex-row-reverse">

      </div>
      {!showLoginForm && <div className="m-4 max-w-full">
        <div>

          {!hideupload && componentNumber === 0 &&
            <FileUpload parentCallBack={fileUploadCallBack} updateComponentNumber={updateComponentNumber} />
          }
          {componentNumber === 1 &&
            <FileUploadDropdowncomponent updateComponentNumber={updateComponentNumber} />
          }
          {componentNumber === 2 &&
            <FileProjectDataTable updateComponentNumber={updateComponentNumber} />
          }
        </div>
      </div>}
    </div>
  )
}

