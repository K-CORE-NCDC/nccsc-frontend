import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FileProjectDataTable from "./MultiDataTable";
import FileUpload from './MultiFileUpload';
export default function Index() {
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

