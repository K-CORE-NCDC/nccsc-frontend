import React from "react";
import { FormattedMessage } from "react-intl";
import introduce_img from '../../../assets/images/CCLE.jpg'
import introduce_VisualContents from '../../../assets/images/ccle_sub.jpg'


export const CCLE = () => {
  return (
    <>
      <div className="tabContents " >
        <div className="introduceWrap" style={{ 'paddingTop': '0px', height: '100%' }}>
          <div className="introduceBox01">
            <div className="logoBox">
              <img src={introduce_img} alt="img" />
            </div>
            <div className="txtBox">
              <p>
                <FormattedMessage
                  id="CCLE_Main"
                  defaultMessage=" The Cancer Cell Line Encyclopedia (CCLE) project is an effort to conduct a detailed genetic characterization of a large panel of human cancer cell lines."
                />
              </p>

            </div>

          </div>
          <div className="introduceBox02">
            <div className="imgBox">
              <img className="w100" src={introduce_VisualContents} alt="img" />
            </div>
            <span style={{paddingLeft:'30%'}}><a href="https://sites.broadinstitute.org/ccle/">https://sites.broadinstitute.org/ccle/</a></span>
          </div>
          <div className="introduceBox03">
            <ul>
              <li>
                <p>
                  <FormattedMessage
                    id="CCLE_sub01"
                    defaultMessage="A compilation of gene expression, chromosomal copy number, and massively parallel sequencing data from 952 human cancer cell lines"
                  /></p>
              </li>
              <li>
                <p><FormattedMessage
                  id="CCLE_sub02"
                  defaultMessage="Visualization of CCLE data in cBioPortal"
                /></p>
              </li>
            </ul>

          </div>

        </div>

      </div>
    </>
  )
}