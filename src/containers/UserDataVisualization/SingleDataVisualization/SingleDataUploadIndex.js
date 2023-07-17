import React, { useState, useEffect } from "react";
import FileUpload from './SingleDataFileUpload'
import FileProjectDataTable from "./SingleDataTable";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {FormattedMessage} from 'react-intl';
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
export default function Index() {
  
  const [componentNumber, setComponentNumber] = useState(0)
  let { tab, project_id } = useParams();
  const updateComponentNumber = (num) =>{
    setComponentNumber(num)
  }
  const breadCrumbs = {
    '/singledata-upload/': [
        { id: 'FindID', defaultMessage: 'Home', to: '/' },
        { id: 'SubPage1', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
        { id: 'SubPage2', defaultMessage: 'Single Data Visualisation', to: '/visualise-singledata/home/' },
        { id: 'SubPage2', defaultMessage: `Upload ${tab}`, to: `/singledata-upload/${tab}` },
        
    ],
    
};
  return (
    <div>
      
        <HeaderComponent
          title="회원가입"
          routeName="/singledata-upload/"
          breadCrumbs={breadCrumbs['/singledata-upload/']}

          type="single"
        />
        <article id="subContents" className="subContents">
          <div className="contentsTitle">
            <h3>
              <font>
                <font >Single Data </font>
                <span className="colorSecondary">
                  <font ><FormattedMessage id="Upload" defaultMessage="Upload" /></font>
                </span>
              </font>
            </h3>
          </div>
          <div className="ptn">
            { 
              componentNumber === 0 && 
              <FileUpload updateComponentNumber ={updateComponentNumber} componentNumber={componentNumber} />
            }
            { componentNumber === 1 && <FileProjectDataTable updateComponentNumber ={updateComponentNumber}  />
            }
                
          </div>
        </article>
    </div>
  )
}

