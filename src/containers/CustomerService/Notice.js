import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import FaqList from '../../containers/CustomerVoice/Faq'
import QA from "../CustomerVoice/QA";
import { Others } from "./Others";

export const Notice = () => {
  const [activeTab, setActiveTab] = useState('1')
  return (
    <div className="auto">
      <div className="mainContentsBox">
        <div className="tab">
          <div className="tab_main" >
            <ul>
              <li className={activeTab === '1' ? 'on' : ''}>
                <button type="button" onClick={() => {

                  setActiveTab('1')
                }}><FormattedMessage
                    id="CustomerService_tab1"
                    defaultMessage="Notice"
                  /></button>
              </li>
              <li className={activeTab === '2' ? 'on' : ''}>
                <button type="button" onClick={() => {

                  setActiveTab('2')
                }}><FormattedMessage
                    id="CustomerService_tab2"
                    defaultMessage="Archive"
                  /></button>
              </li>
              <li className={activeTab === '3' ? 'on' : ''} >
                <button type="button" onClick={() => {

                  setActiveTab('3')
                }}><FormattedMessage
                    id="CustomerService_tab3"
                    defaultMessage="FAQ"
                  /></button>
              </li>
              <li className={activeTab === '4' ? 'on' : ''}>
                <button type="button" onClick={() => {

                  setActiveTab('4')
                }}><FormattedMessage
                    id="CustomerService_tab4"
                    defaultMessage="Others"
                  /></button>
              </li>
            </ul>
          </div>
        </div>
        {activeTab === '1' &&
          <QA />
        }

        {activeTab === '3' &&
          <FaqList />

        }
        {activeTab === '4' &&
          <Others />

        }
      </div>
    </div>
  )
}