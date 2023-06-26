import React from "react";
import { FormattedMessage } from "react-intl";
import introduce_img from '../../../assets/images/introduce_logo.svg'
import introduce_VisualContents from '../../../assets/images/introduce-visualContents.jpg'
import cosmic_img from '../../../styles/images/cosmic_img.png';

export const Cosmic = () => {
  return (
    <>
      <div className="tabContents " >
        <div className="section introduceWrap" style={{ 'paddingTop': '0px', height: '100%' }}>
          <div className="introduceBox01">
            <div className="logoBox">
              <img src={cosmic_img} alt="img" />
            </div>
            <div className="txtBox">
              <p>
                <FormattedMessage
                  id="COSMIC_Main"
                  defaultMessage="COSMIC is an online database of somatically acquired mutations found in human cancer."
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
                    id="COSMIC_sub01"
                    defaultMessage=" COSMIC is the world's largest source of expert manually curated somatic mutation information relating to human cancers."
                  /></p>
              </li>
              <li>
                <p><FormattedMessage
                  id="COSMIC_sub02"
                  defaultMessage="COSMIC also catalogues mutational signatures in human cancer through the COSMIC Signatures group."
                /></p>
              </li>
            </ul>

          </div>

        </div>

      </div>
    </>
  )

}