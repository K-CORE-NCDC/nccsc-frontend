import React from "react";
import { FormattedMessage } from "react-intl";
import introduce_img from '../../../assets/images/introduce_logo.svg'
import introduce_VisualContents from '../../../assets/images/introduce-visualContents.jpg'

export const ICGC = () =>{
  return(
    <>
    <div className="tabContents " >
      <div className="section introduceWrap" style={{ 'paddingTop': '0px', height: '100%' }}>
        <div className="introduceBox01">
          <div className="logoBox">
            <img src={introduce_img} alt="img" />
          </div>
          <div className="txtBox">
            <p>
              <FormattedMessage
                id="ICGC_Main"
                defaultMessage="The ICGC was launched in 2008 to coordinate large-scale cancer genome studies in tumours from 50 cancer types and/or subtypes that are of main importance across the globe."
              />
            </p>

          </div>

        </div>
        <div className="introduceBox02">
          <div className="imgBox">
            <img className="w100" src={introduce_VisualContents} alt="img" />
          </div>

        </div>
        <div className="introduceBox03">
          <ul>
            <li>
              <p>
                <FormattedMessage
                  id="ICGC_sub01"
                  defaultMessage="Being open source, you can easily search and analyze data and construct queries against multiple data sets."
                /></p>
            </li>
            <li>
              <p><FormattedMessage
                id="ICGC_sub02"
                defaultMessage="The ICGC DCC is tasked with managing the data for the consortium."
              /></p>
            </li>
          </ul>

        </div>

      </div>

    </div>
  </>
  )
}