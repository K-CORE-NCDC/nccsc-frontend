import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SingleDataVisualization } from "./SingleDataVisualization";
import { FormattedMessage } from "react-intl";
import arrow_icon from '../../assets/images/btnDetail-arrow-white.svg'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const VisualizeMyData = () => {
  const history = useHistory()
  const [analyzeButton, setAnalyzeButton] = useState({
    singleData: false,
    multiData: false,
    otherTools: false
  })
  return (
    <>
      {
        (analyzeButton?.singleData === false && analyzeButton?.multiData === false && analyzeButton?.otherTools === false) &&
        <div className="fullBox mainContentsBox">
          <ul>
            <li className="box01">
              <div className="cover">

              </div>
              <div className="inner">
                <div className="icon"></div>
                <dl>
                  <dt className="h3">Single Data Visualization</dt>
                </dl>
                <a className="btn btnDetail" href="/visualise-singledata/home/">Analyze
                  <img src={arrow_icon} alt="" />
                </a>
              </div>

            </li>
            <li className="box02">
              <div className="cover">

              </div>
              <div className="inner">
                <div className="icon"></div>
                <dl>
                  <dt className="h3">Multi Data Visualization</dt>
                </dl>
                <a className="btn btnDetail" href="/">Analyze
                  <img src={arrow_icon} alt="" />
                </a>
              </div>

            </li>
            <li className="box03">
              <div className="cover">

              </div>
              <div className="inner">
                <div className="icon"></div>
                <dl>
                  <dt className="h3">Other Tools</dt>
                </dl>
                <a className="btn btnDetail" href="/">Analyze
                  <img src={arrow_icon} alt="" />
                </a>
              </div>

            </li>

          </ul>

        </div>



      }

      {analyzeButton?.singleData && !analyzeButton?.multiData && !analyzeButton?.otherTools &&
        <SingleDataVisualization />
      }
    </>
  )
}
