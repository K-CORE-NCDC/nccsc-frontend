import React from 'react';
import { FormattedMessage } from 'react-intl';
import introduce_VisualContents from '../../assets/images/introduce-visualContents.jpg';
import mainLogo from '../../assets/images/mainLogo.png';

const ServiceIntroPage = () => {
  return (
    <div className="tabContents " style={{ height: '80vh' }}>
      <div className=" introduceWrap">
        <div className="introduceBox01">
          <div className="logoBox">
            <img src={mainLogo} alt="kcore_logo" />
          </div>
          <div className="txtBox">
            <p>
              <FormattedMessage
                id="siteIntro_text"
                defaultMessage=" K-CORE Portal is a web-based analysis portal that provides visualizations of cancer genomic data, and it is a sub-service portal of the National Cancer Data Cancer website."
              />
            </p>
          </div>
        </div>
        <div className="introduceBox02">
          <div className="imgBox">
            <img className="w100" src={introduce_VisualContents} alt="kcore_bg_img" />
          </div>
        </div>
        <div className="introduceBox03">
          <ul>
            <li>
              <p>
                <FormattedMessage
                  id="siteIntro_list_1"
                  defaultMessage="Analyze single data or multi-omics data in relation to clinical data"
                />
              </p>
            </li>
            <li>
              <p>
                <FormattedMessage
                  id="siteIntro_list_2"
                  defaultMessage="Download visualization results"
                />
              </p>
            </li>
            <li>
              <p>
                <FormattedMessage
                  id="siteIntro_list_3"
                  defaultMessage="Provide drug relation information"
                />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ServiceIntroPage;
