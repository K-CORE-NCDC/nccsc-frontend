import React from "react";
import { FormattedMessage } from "react-intl";
import introduce_img from '../../../assets/images/tcga2.jpg'
import introduce_VisualContents from '../../../assets/images/TCGA_sub.jpg'

export const TCGA = () =>{
  return(
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
                id="TCGA_Main"
                defaultMessage="TCGA is a project initiated by the co-efforts of the National Cancer Institute (NCI) and the National Human Genome Research Institute (NHGRI)."
              />
            </p>

          </div>

        </div>
        <div className="introduceBox02">
          <div className="imgBox">
            <img className="w100" src={introduce_VisualContents} alt="img" />
          </div>
          <span style={{paddingLeft:'15%'}}><a href="https://www.cancer.gov/ccg/research/genome-sequencing/tcga">https://www.cancer.gov/ccg/research/genome-sequencing/tcga</a></span>
        </div>
        <div className="introduceBox03">
          <ul>
            <li>
              <p>
                <FormattedMessage
                  id="TCGA_sub01"
                  defaultMessage="The TCGA Data Portal provides researchers with a platform to search, download and analyze cancer genomic data."
                /></p>
            </li>
            <li>
              <p><FormattedMessage
                id="TCGA_sub02"
                defaultMessage="The Cancer Genome Atlas (TCGA), a landmark cancer genomics program, molecularly characterized over 20,000 primary cancer and matched normal samples spanning 33 cancer types."
              /></p>
            </li>
          </ul>

        </div>

      </div>

    </div>
  </>
  )
}