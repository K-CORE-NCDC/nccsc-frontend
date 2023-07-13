import React, { useState, useEffect } from "react";
import FileUpload from './MultiFileUpload'
import FileProjectDataTable from "./MultiDataTable";
import { useHistory } from "react-router-dom";
import { getCookie } from "../../getCookie";
export default function Index() {
  let history = useHistory();
  const [componentNumber, setComponentNumber] = useState(0)

  const updateComponentNumber = (num) =>{
    setComponentNumber(num)
  }
  
  return (
    <div className="w-full">
      {
        <div>
            { 
             componentNumber === 0 && <FileUpload updateComponentNumber ={updateComponentNumber}  />
            }
            { componentNumber === 1 && <FileProjectDataTable updateComponentNumber ={updateComponentNumber}  />
            }
        </div>
      }
    </div>
  )
}

