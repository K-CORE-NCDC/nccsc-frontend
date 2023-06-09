import React, { useState, useEffect } from "react";
import FileUpload from './Components/MainComponents/NewClinicalFileUpload'
import FileUploadDropdowncomponent from "./Components/MainComponents/FileUploadDropdowncomponent";
import FileProjectDataTable from "./Components/MainComponents/FileProjectDataTable";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function DataVisualization() {
  let history = useHistory();
  const [componentNumber, setComponentNumber] = useState(0)
  const hideupload = false
  const showLoginForm = false
  const fileUploadCallBack = (d_) => {
  }
  const loginResponse = useSelector((data) => data.homeReducer.login_data);    

  useEffect(() => {
    if(loginResponse && 'is_login' in loginResponse &&  loginResponse['is_login'] === true){
    
    }
    else{
      history.push("/login"  )
    }
  }, [history])


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

