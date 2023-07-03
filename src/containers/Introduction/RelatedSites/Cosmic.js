import React from "react";
import { FormattedMessage } from "react-intl";
import introduce_VisualContents from '../../../assets/images/COSMIC_sub.jpg'
import cosmic_img from '../../../assets/images/COSMIC.png';

export const Cosmic = () => {
  return (
    <>
      <div className="tabContents " >
        <div className="introduceWrap" style={{ 'paddingTop': '0px', height: '100%' }}>
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
              <img className="w100" src={introduce_VisualContents} alt="img" style={{height:'300px'}}/>
            </div>
            <span style={{paddingLeft:'30%'}}><a href="https://cancer.sanger.ac.uk/cosmic">https://cancer.sanger.ac.uk/cosmic</a></span>
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