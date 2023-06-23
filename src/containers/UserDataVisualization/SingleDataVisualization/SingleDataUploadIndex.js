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
  console.log(tab)
  const updateComponentNumber = (num) =>{
    setComponentNumber(num)
  }
  const breadCrumbs = {
    '/singledata-upload/': [
        { id: 'FindID', defaultMessage: 'Home', to: '/findid/' },
        { id: 'SubPage1', defaultMessage: 'Visualise My Data', to: '/findid/' },
        { id: 'SubPage2', defaultMessage: 'Single Data Visualisation', to: '/findid/' },
    ],
  };
  return (
    <div>
      
        <HeaderComponent
          title="회원가입"
          breadCrumbs={{
            key1: 'Home',
            key2: 'Visualise My Data',
            key3: 'Single Data Visulisation',
            key4: tab,
            key5:'Upload'

          }}
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
          <div className="section ptn">
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

