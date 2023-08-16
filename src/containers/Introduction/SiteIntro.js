import React, { useEffect, useState } from "react";
import logoNew from "../../assets/images/menu-logo-2.png";
import bgimg from '../../assets/images/bg.png';
import ServiceIntro from "./ServiceIntro";
import Organization from "./Organization";
import { FormattedMessage } from "react-intl";
import menu_black from "../../assets/images/right_below_add.png";
import AOS from 'aos';
import introduce_img from '../../assets/images/introduce_logo.svg'
import introduce_VisualContents from '../../assets/images/introduce-visualContents.jpg'
import "aos/dist/aos.css"
import { CBioPortal } from "./RelatedSites/CBioPortal";


export const SiteIntro = ({ height, innerHeight , lan }) => {
  const [activeTab, setActiveTab] = useState('1')
  const _height = innerHeight - height
  const [addingStyle, setAddingStyle] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  console.log('site' , lan)

  return (
    <div className="auto">
      <div className="mainContentsBox">
        <div className="tab">
          <div className="tab_main" >
            <ul>
              <li className={activeTab === '1' ? 'on' : ''}>
                <button type="button" onClick={() => {
                  setSelectedOption('Site Intro')
                  setActiveTab('1')
                }}><FormattedMessage
                    id="introduction_p1"
                    defaultMessage="Site Intro"
                  /></button>
              </li>
              <li className={activeTab === '2' ? 'on' : ''}>
                <button type="button" onClick={() => {
                  setSelectedOption('Service Intro')
                  setActiveTab('2')
                }}><FormattedMessage
                    id="introduction_p2"
                    defaultMessage="Service Intro"
                  /></button>
              </li>
              <li className={activeTab === '3' ? 'on' : ''} >
                <button type="button" onClick={() => {
                  setSelectedOption('Organization')
                  setActiveTab('3')
                }}><FormattedMessage
                    id="introduction_p3"
                    defaultMessage="Organization"
                  /></button>
              </li>
              <li className={activeTab === '4' ? 'on' : ''}>
                <button type="button" onClick={() => {
                  setSelectedOption('Related Sites')
                  setActiveTab('4')
                }}><FormattedMessage
                    id="introduction_p4"
                    defaultMessage="Related Sites"
                  /></button>
              </li>
            </ul>
          </div>


        </div>
        {activeTab === '1' &&
          <div className="tabContents " >
            <div className=" introduceWrap" style={{ 'paddingTop': '0px', height: '100%' }}>
              <div className="introduceBox01">
                <div className="logoBox">
                  <img src={introduce_img} alt="img" />
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
                      /></p>
                  </li>
                  <li>
                    <p><FormattedMessage
                      id="siteIntro_list_2"
                      defaultMessage="Download visualization results"
                    /></p>
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

          </div>}
        {activeTab === '2' &&
          <ServiceIntro lan={lan} />
        }
        {activeTab === '3' &&
          <Organization lan={lan}/>
        }
         {activeTab === '4' &&
          <CBioPortal />
        }
      </div>
    </div>

  )

}
