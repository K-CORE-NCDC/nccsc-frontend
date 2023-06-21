import React, { useState, useEffect } from "react";
import FileUpload from './SingleDataFileUpload'
import FileProjectDataTable from "./SingleDataTable";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../getCookie";
export default function Index() {
  let history = useHistory();
  const [componentNumber, setComponentNumber] = useState()

  const updateComponentNumber = (num) =>{
    setComponentNumber(num)
  }
  useEffect(() => {
    if(getCookie('is_login') && getCookie('is_login') === 'True'){
      updateComponentNumber(0)
    }
    else{
      history.push("/login")
      }
  }, [history])


 
  
  return (
    <div className="w-full">
      {
        <div>
            { 
             componentNumber === 0 && <FileUpload updateComponentNumber ={updateComponentNumber} componentNumber={componentNumber} />
            }
            { componentNumber === 1 && <FileProjectDataTable updateComponentNumber ={updateComponentNumber}  />
            }
        </div>
      }
    </div>
  )
}

