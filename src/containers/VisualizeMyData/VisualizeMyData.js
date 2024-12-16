import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import arrow_icon from '../../assets/images/btnDetail-arrow-white.svg';
import { SingleDataVisualization } from './SingleDataVisualization';

export const VisualizeMyData = () => {
  const analyzeButton = {
    singleData: false,
    multiData: false,
    otherTools: false
  }
  return (
    <>
      {analyzeButton?.singleData === false &&
        analyzeButton?.multiData === false &&
        analyzeButton?.otherTools === false && (
          <div className="fullBox mainContentsBox visualizeMyData">
            <ul>
              <li className="box01">
                <div className="cover"></div>
                <div className="inner">
                  <div className="icon"></div>
                  <dl>
                    <dt className="h3">
                      <FormattedMessage
                        id="SingleDataVisualization"
                        defaultMessage="Single Data Visualization"
                      />
                    </dt>
                  </dl>
                  <Link className="btn btnDetail" to="/visualise-singledata/home/">
                    <FormattedMessage id="Analyze" defaultMessage="Analyze" />
                    <img src={arrow_icon} alt="arrow-icon" />
                  </Link>
                </div>
              </li>
              <li className="box02">
                <div className="cover"></div>
                <div className="inner">
                  <div className="icon"></div>
                  <dl>
                    <dt className="h3">
                      <FormattedMessage
                        id="visualizeMyData_multi"
                        defaultMessage="Multi Data Visualization"
                      />
                    </dt>
                  </dl>
                  <Link className="btn btnDetail" to="/multidatavisualization/">
                    <FormattedMessage id="Analyze" defaultMessage="Analyze" />

                    <img src={arrow_icon} alt="arrow-icon" />
                  </Link>
                </div>
              </li>
              <li className="box03">
                <div className="cover"></div>
                <div className="inner">
                  <div className="icon"></div>
                  <dl>
                    <dt className="h3">
                      <FormattedMessage id="visualize_otherTools" defaultMessage="Other Tools" />
                    </dt>
                  </dl>
                  <Link className="btn btnDetail" to="/tools/">
                    <FormattedMessage id="Analyze" defaultMessage="Analyze" />
                    <img src={arrow_icon} alt="arrow-icon" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        )}

      {analyzeButton?.singleData && !analyzeButton?.multiData && !analyzeButton?.otherTools && (
        <SingleDataVisualization />
      )}
    </>
  );
};
