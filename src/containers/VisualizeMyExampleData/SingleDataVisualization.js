import React, { useState } from "react";
import logoNew from "../../assets/images/Left_up.png";
import bgimg from '../../assets/images/bg.png';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MultiDataVisualization from "./MultiDataVisualization";
import { FormattedMessage } from "react-intl";
import correct_icon from '../../assets/images/icons8-correct-48.png'


export const SingleDataVisualization = () => {
  const [activeTab, setActiveTab] = useState('1')
  const history = useHistory()


  return (
    <div className="auto">
      <div className="mainContentsBox">
        <div className="tab " >
          <ul>
            <li className={activeTab === '1' ? 'on' : ''}>
              <button type="button" onClick={() => setActiveTab('1')}><FormattedMessage
                id="introduction_p1"
                defaultMessage="Single data Visualization guidelines"
              /></button>
            </li>
            <li className={activeTab === '2' ? 'on' : ''}>
              <button type="button" onClick={() => setActiveTab('2')}><FormattedMessage
                id="introduction_p2"
                defaultMessage="Multi data Visualization guidelines"
              /></button>
            </li>
            <li className={activeTab === '4' ? 'on' : ''}>
              <button type="button" onClick={() => setActiveTab('4')}><FormattedMessage
                id="introduction_p4"
                defaultMessage="Other tools guidelines"
              /></button>
            </li>
          </ul>
        </div>
        {activeTab === '1' && <>
          <div className="tabContents " >


            <div className="dataSearchWrap">
              <div className="popularBox">
              <p className="tit h5">
                      Contents
                    </p>
                {/* <div>
                  <div>
                    <p className="tit h5">
                      Contents
                    </p>
                  </div>
                  <div>
                    <a href='#test' className="btn btnPrimary btnSearch">Download Manual</a>
                    <a href='#test' className="btn btnPrimary btnSearch">Example Page</a>
                  </div>
                </div> */}
                <div style={{ width: '100%', display: 'flex' }}>


                  <ul className="" style={{ width: '50%', borderRight: '1px solid #ddd', paddingRight: '10px' }}>
                    <li className="" tabIndex="0" style={{}}>
                      <p> <b>Variant Summary : </b> &nbsp;
                        visualize summary information of major variant types</p>
                    </li>
                    <li className="" tabIndex="-1" style={{}}>
                      <p> <b>Lollipop Plot :</b> &nbsp; visualize mutation or phosphorylation of certain gene on a sequence</p>
                    </li>
                    <li className="" tabIndex="-1" style={{}}>
                      <p><b>CNV Plot :</b>  &nbsp; visualize copy number variation data on integrated genome viewer</p>
                    </li>
                    <li className="" tabIndex="-1" style={{}}>
                      <p> <b>Heatmap :</b> &nbsp; represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)</p>
                    </li>
                  </ul>
                  <ul style={{ width: '50%', paddingLeft: '10px' }}>
                    <li className="" tabIndex="-1" style={{}}>

                      <p> <b>Circos plot :</b> &nbsp; visualize one of the seven omics data as a circular layer on a circular chromosome map</p>
                    </li>
                    <li className="" tabIndex="-1" style={{}}>

                      <p><b>Box Plot (Tumor vs Normal):</b> &nbsp; visualize the genetic information statistics of the selected gene(s) in the form of boxes</p>
                    </li>
                    <li className="" tabIndex="-1" style={{}}>

                      <p> <b>Survival Plot :</b> &nbsp; visualize the recurrence/survival probability of patients according to clinical variable conditions</p>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="popularBox">
                <ul>
                  <li className="" tabIndex="-1" style={{}}>
                    
                    <p> <b>Circos plot :</b> &nbsp; visualize one of the seven omics data as a circular layer on a circular chromosome map</p>
                  </li>
                  <li className="" tabIndex="-1" style={{}}>
                   
                    <p><b>Box Plot (Tumor vs Normal):</b> &nbsp; visualize the genetic information statistics of the selected gene(s) in the form of boxes</p>
                  </li>
                  <li className="" tabIndex="-1" style={{}}>
                    
                    <p> <b>Survival Plot :</b> &nbsp; visualize the recurrence/survival probability of patients according to clinical variable conditions</p>
                  </li>
                </ul>
              </div> */}

            </div>
            <table className="contentsTable" style={{ marginTop: '15px' }}>
              <thead>
                <tr>
                  <th>DataType</th>
                  <th style={{ width: '160px' }}>VariantSummary</th>
                  <th>Lollipop</th>
                  <th>CNV Plot</th>
                  <th>Heatmap</th>
                  <th>Circos Plot</th>
                  <th>Box Plot</th>
                  <th>SurvivalPlot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Clinical Information</td>
                  <td></td>
                  <td ></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span>
                  </td>
                </tr>
                <tr>
                  <td>Dna Mutation</td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>RNA</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Proteome</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CNV</td>
                  <td></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Methylation</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Phosphorylation</td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Fusion</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span class="material-icons">radio_button_unchecked</span></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <table className="table {">
            <thead>
            <tr>
                      <th>DataType</th>
                      <th>Variant Summary</th>
                      <th>Lollipop</th>
                      <th>CNV Plot</th>
                      <th>Heatmap</th>
                      <th>Circos Plot</th>
                      <th>Box Plot</th>
                      <th>SurvivalPlot</th>
                    </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sushma</td>
                <td>24</td>
              </tr>
            </tbody>


          </table> */}

          {/* <div className="dataSearchWrap">
            <div className="popularBox">
              <p className="tit h5">Contents</p>
              <ul className="">
                <li className="" tabIndex="0" style={{}}>
                  <p>Variant Summary:</p>
                  <p>visualize summary information of major variant types</p>
                </li>
                <li className="" tabIndex="-1" style={{}}>
                  <p>Lollipop Plot:</p>
                  <p>visualize mutation or phosphorylation of certain gene on a sequence</p>
                </li>
                <li className="" tabIndex="-1" style={{}}>
                  <p>CNV Plot:</p>
                  <p>visualize copy number variation data on integrated genome viewer</p>
                </li>
                <li className="" tabIndex="-1" style={{}}>
                  <p>Heatmap:</p>
                  <p> represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)</p>
                </li>
                <li className="" tabIndex="-1" style={{}}>
                  <p>Circos plot:</p>
                  <p>visualize one of the seven omics data as a circular layer on a circular chromosome map</p>
                </li>
                <li className="" tabIndex="-1" style={{}}>
                  <p>Box Plot (Tumor vs Normal):</p>
                  <p>visualize the genetic information statistics of the selected gene(s) in the form of boxes</p>
                </li>
                <li className="" tabIndex="-1" style={{}}>
                  <p>Survival Plot:</p>
                  <p>visualize the recurrence/survival probability of patients according to clinical variable conditions</p>
                </li>
              </ul>
            </div>
            <div className="dataSearchBox">
              <div className="tabContents " >
                <table className="contentsTable">
                  <thead>
                    <tr>
                      <th>DataType</th>
                      <th>Variant Summary</th>
                      <th>Lollipop</th>
                      <th>CNV Plot</th>
                      <th>Heatmap</th>
                      <th>Circos Plot</th>
                      <th>Box Plot</th>
                      <th>SurvivalPlot</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sushma</td>
                      <td>24</td>
                    </tr>
                  </tbody>


                </table>

              </div>
            </div>

          </div> */}

        </>
        }

      </div>
    </div>

  )

}
