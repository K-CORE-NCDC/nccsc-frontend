import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import introduce_VisualContents from '../../../assets/images/cBioPortal_sub.jpg';
import cBioPortal from '../../../styles/images/cBioPortal.png';
import { CCLE } from './CCLE';
import { Cosmic } from './Cosmic';
import { EurOPDX } from './EurOPDX';
import { ICGC } from './ICGC';
import { TCGA } from './TCGA';

export const CBioPortal = () => {
  const [activeTab, setActiveTab] = useState('1');
  return (
    <div className="auto tabContents" style={{ height: '80vh' }}>
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
                  <FormattedMessage id="cBioPortal" defaultMessage="cBioPortal" />
                </button>
              </li>
              <li className={activeTab === '2' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('2');
                  }}
                >
                  <FormattedMessage id="COSMIC" defaultMessage="COSMIC" />
                </button>
              </li>
              <li className={activeTab === '3' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('3');
                  }}
                >
                  <FormattedMessage id="TCGA" defaultMessage="TCGA" />
                </button>
              </li>
              <li className={activeTab === '4' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('4');
                  }}
                >
                  <FormattedMessage id="CCLE" defaultMessage="CCLE" />
                </button>
              </li>
              <li className={activeTab === '5' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('5');
                  }}
                >
                  <FormattedMessage id="ICGC" defaultMessage="ICGC" />
                </button>
              </li>
              <li className={activeTab === '6' ? 'on' : ''}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('6');
                  }}
                >
                  <FormattedMessage id="EurOPDX" defaultMessage="EurOPDX" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {activeTab === '1' && (
          <>
            <div className="tabContents ">
              <div className=" introduceWrap" style={{ paddingTop: '0px', height: '100%' }}>
                <div className="introduceBox01">
                  <div className="logoBox">
                    <img src={cBioPortal} alt="cbio_logo" />
                  </div>
                  <div className="txtBox">
                    <p>
                      <FormattedMessage
                        id="CBioPortal_Main"
                        defaultMessage="The cBioPortal for Cancer Genomics is an open-access, open-source resource for interactive exploration of multidimensional cancer genomics data sets."
                      />
                    </p>
                  </div>
                </div>
                <div className="introduceBox02">
                  <div className="imgBox">
                    <img className="w100" src={introduce_VisualContents} alt="cbio_img" />
                  </div>
                  <div>
                    <div className="relatedurls" style={{ paddingTop: '5%' }}>
                      <span className="material-icons" style={{ color: 'rosybrown' }}>
                        output
                      </span>
                      <span style={{ paddingLeft: '1%', color: 'dodgerblue' }}>
                        <a href="http://www.cbioportal.org/">http://www.cbioportal.org/</a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="introduceBox03">
                  <ul>
                    <li>
                      <p>
                        <FormattedMessage
                          id="CBioPortal_sub01"
                          defaultMessage="Providing rapid, intuitive, and high-quality access to molecular profiles and clinical attributes from large-scale cancer genomics projects."
                        />
                      </p>
                    </li>
                    <li>
                      <p>
                        <FormattedMessage
                          id="CBioPortal_sub02"
                          defaultMessage="cBioPortal is to significantly lower the barriers between complex genomic data and cancer researchers, therefore to empower researchers to translate these rich data sets into biologic insights and clinical applications."
                        />
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === '2' && <Cosmic />}
        {activeTab === '3' && <TCGA />}
        {activeTab === '4' && <CCLE />}
        {activeTab === '5' && <ICGC />}
        {activeTab === '6' && <EurOPDX />}
      </div>
    </div>
  );
};
