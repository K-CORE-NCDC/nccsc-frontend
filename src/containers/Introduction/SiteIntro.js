import 'aos/dist/aos.css';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import introduce_VisualContents from '../../assets/images/introduce-visualContents.jpg';
import mainLogo from '../../assets/images/mainLogo.png';
import Organization from './Organization';
import { CBioPortal } from './RelatedSites/CBioPortal';
import ServiceIntro from './ServiceIntro';

export const SiteIntro = ({ lan }) => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className="auto">
      <div className="mainContentsBox">
        <div className="tab">
          <div className="tab_main">
            <ul>
              <li className={activeTab === '1' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('1');
                  }}
                >
                  <FormattedMessage id="introduction_p1" defaultMessage="Site Intro" />
                </button>
              </li>
              <li className={activeTab === '2' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('2');
                  }}
                >
                  <FormattedMessage id="introduction_p2" defaultMessage="Service Intro" />
                </button>
              </li>
              <li className={activeTab === '3' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('3');
                  }}
                >
                  <FormattedMessage id="introduction_p3" defaultMessage="Organization" />
                </button>
              </li>
              <li className={activeTab === '4' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('4');
                  }}
                >
                  <FormattedMessage id="introduction_p4" defaultMessage="Related Sites" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        {activeTab === '1' && (
          <div className="tabContents ">
            <div className=" introduceWrap" style={{ paddingTop: '0px', height: '100%' }}>
              <div className="introduceBox01">
                <div className="logoBox">
                  <img src={mainLogo} alt="img" />
                </div>
                <div className="txtBox">
                  <p>
                    <FormattedMessage
                      id="siteIntro_text"
                      defaultMessage=" K-Core Portal is a web-based analysis portal that provides visualizations of cancer genomic data, and it is a sub-service portal of the National Cancer Data Cancer website."
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
        )}
        {activeTab === '2' && <ServiceIntro lan={lan} />}
        {activeTab === '3' && <Organization lan={lan} />}
        {activeTab === '4' && <CBioPortal />}
      </div>
    </div>
  );
};
