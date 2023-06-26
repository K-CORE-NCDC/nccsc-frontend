import React from "react";
import { FormattedMessage } from "react-intl";
import introduce_img from '../../../assets/images/introduce_logo.svg'
import introduce_VisualContents from '../../../assets/images/introduce-visualContents.jpg'
import src_img from '../../../styles/images/europdx-ri_logo_colours.png'

export const EurOPDX = () =>{
  return(
    <>
    <div className="tabContents " >
      <div className="section introduceWrap" style={{ 'paddingTop': '0px', height: '100%' }}>
        <div className="introduceBox01">
          <div className="logoBox">
            <img src={src_img} alt="img" />
          </div>
          <div className="txtBox">
            <p>
              <FormattedMessage
                id="EurOPDX_Main"
                defaultMessage=" The EurOPDX Research Infrastructure aims to improve cancer drug development success rates through the enablement of collaborative PDX research."
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
                  id="EurOPDX_sub01"
                  defaultMessage="Develop efficient and user-friendly IT tools to optimize access to-, and data searching of-, the collection of models and their clinical, molecular and pharmacological annotation."
                /></p>
            </li>
            <li>
              <p><FormattedMessage
                id="EurOPDX_sub02"
                defaultMessage="Integrate into a public repository the distributed collection of diverse PDX models available from EurOPDX Research Infrastructure partners."
              /></p>
            </li>
          </ul>

        </div>

      </div>

    </div>
  </>
  )
}