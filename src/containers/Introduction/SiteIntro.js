import 'aos/dist/aos.css';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import introduce_VisualContents from '../../assets/images/introduce-visualContents.jpg';
import mainLogo from '../../assets/images/mainLogo.png';
import Organization from './Organization';
import { CBioPortal } from './RelatedSites/CBioPortal';
import ServiceIntro from './ServiceIntro';
import ServiceIntroPage from './SiteIntroPage';

export const SiteIntro = ({ lan }) => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className="auto">
      <div className="mainContentsBox" style={{marginTop:"45px"}}>
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
      </div>
      {activeTab === '1' && <ServiceIntroPage />}
      {activeTab === '2' && <ServiceIntro lan={lan} />}
      {activeTab === '3' && <Organization lan={lan} />}
      {activeTab === '4' && <CBioPortal />}
    </div>
  );
};
