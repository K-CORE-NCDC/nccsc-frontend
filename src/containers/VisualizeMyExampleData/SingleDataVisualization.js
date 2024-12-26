import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MultiDataVisualization from './MultiDataVisualization';
import { OtherTools } from './OtherTools';
import SingleDataManual from '../../assets/files/DownloadbleFiles/SingleDataVis/SingleDataVis_Manual.pdf';

export const SingleDataVisualization = () => {
  const [activeTab, setActiveTab] = useState('1');
  const history = useHistory();
  return (
    <div className="auto">
      <div className="mainContentsBox">
        <div className="tab visualizeExampleData">
          <ul>
            <li className={activeTab === '1' ? 'on' : ''}>
              <button type="button" onClick={() => setActiveTab('1')} id="SingleDataVisualizationGuidelinesButton"
                title="Single Data Visualization Guidelines">
                <FormattedMessage
                  id="Example_tab_01"
                  defaultMessage="Single Data Visualization Guidelines"
                />
              </button>
            </li>
            <li className={activeTab === '2' ? 'on' : ''}>
              <button type="button" onClick={() => setActiveTab('2')} id="MultiDataVisualizationGuidelinesButton"
                title="Multi Data Visualization Guidelines">
                <FormattedMessage
                  id="Example_tab_02"
                  defaultMessage="Multi Data Visualization Guidelines"
                />
              </button>
            </li>
            <li className={activeTab === '3' ? 'on' : ''}>
              <button type="button" onClick={() => setActiveTab('3')} id="OtherToolsGuidelinesButton"
                title="Other Tools Guidelines">
                <FormattedMessage id="Example_tab_03" defaultMessage="Other Tools Guidelines" />
              </button>
            </li>
          </ul>
        </div>
        {activeTab === '1' && (
          <>
            <div className="tabContents " style={{ height: '85vh' }}>
              <div className="dataSearchWrap">
                <div className="popularBox">
                  <div className="subHeader">
                    <p className="tit h5">Contents</p>
                    <div className="tit contentBtns">
                      <button
                        id="ExamplePage"
                        className="btn"
                        onClick={() => {
                          history.push({
                            pathname: '/visualizesingle-exampledata/home/',
                            state: { example: true }
                          });
                        }}
                      >
                        <FormattedMessage id="ExamplePage" defaultMessage="Example Page" />
                      </button>
                      {/* <button className="btn" id="DownloadManual">
                        <a href={SingleDataManual} download>
                          <FormattedMessage id="DownloadManual" defaultMessage="Download Manual" />
                        </a>
                      </button> */}
                      <a href={SingleDataManual} download className="btn" id="DownloadManual">
                        <FormattedMessage id="DownloadManual" defaultMessage="Download Manual" />
                      </a>
                    </div>
                    <div className="tit contentBtns_smallScreen">
                      <button
                        id="ExamplePage"
                        className="btn"
                        onClick={() => {
                          history.push({
                            pathname: '/visualizesingle-exampledata/home/',
                            state: { example: true }
                          });
                        }}
                      >
                        <span className="material-icons">
                          lightbulb
                        </span>
                      </button>
                      <button className="btn" id="DownloadManual">
                        <a href={SingleDataManual} download>
                          <span className="material-icons">
                            download
                          </span>
                        </a>
                      </button>
                    </div>
                  </div>

                  <div className="contentBox">
                    <ul className="contentBox_left">
                      {/* <li className="" tabIndex="0"> */}
                      <li className="">
                        <p>
                          {' '}
                          <b>Variant Summary : </b> &nbsp;
                          <FormattedMessage
                            id="Example_single_variantSummary"
                            defaultMessage="visualize summary information of major variant types"
                          />
                        </p>
                      </li>
                      {/* <li className="" tabIndex="-1" style={{}}> */}
                      <li className="">
                        <p>
                          {' '}
                          <b>Circos:</b> &nbsp;
                          <FormattedMessage
                            id="Example_single_circos"
                            defaultMessage=" visualize one of the seven omics data as a circular layer on a circular chromosome map"
                          />
                        </p>
                      </li>
                      {/* <li tabIndex="-1"> */}
                      <li>
                        <p>
                          {' '}
                          <b>Lollipop:</b> &nbsp;
                          <FormattedMessage
                            id="Example_single_Lollipop"
                            defaultMessage=" visualize mutation or phosphorylation of certain gene on a sequence"
                          />
                        </p>
                      </li>
                      {/* <li className="" tabIndex="-1"> */}
                      <li>
                        <p>
                          <b>CNV:</b> &nbsp;
                          <FormattedMessage
                            id="Example_single_CNV"
                            defaultMessage="visualize copy number variation data on integrated genome viewer"
                          />
                        </p>
                      </li>
                    </ul>
                    <ul className="contentBox_right">
                      {/* <li className="" tabIndex="-1"> */}
                      <li>
                        <p>
                          {' '}
                          <b>Heatmap:</b> &nbsp;
                          <FormattedMessage
                            id="Example_single_heatMap"
                            defaultMessage="represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)"
                          />
                        </p>
                      </li>
                      {/* <li className="" tabIndex="-1" style={{}}> */}
                      <li>
                        <p>
                          <b>Box (Tumor vs Normal):</b> &nbsp;
                          <FormattedMessage
                            id="Example_single_box"
                            defaultMessage="visualize the genetic information statistics of the selected gene(s) in the form of boxes"
                          />
                        </p>
                      </li>

                      {/* <li className="" tabIndex="-1" style={{}}> */}
                      <li>
                        <p>
                          {' '}
                          <b>Survival:</b> &nbsp;
                          <FormattedMessage
                            id="Example_single_survival"
                            defaultMessage="visualize the recurrence/survival probability of patients according to clinical variable conditions"
                          />
                        </p>
                      </li>
                      {/* <li className="" tabIndex="-1" style={{}}> */}
                      <li>
                        <p>
                          {' '}
                          <b>PCA:</b> &nbsp;
                          <FormattedMessage
            id="Example_pca_small"
            defaultMessage="Tumor and Normal sample visualization for selected gene sets"
                          />
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <table className="contentsTable" style={{ marginTop: '15px' }}summary='shows file types which are required for the vizualization'>
              <caption style={{ display: 'none' }}>Single Data Visualization Columns</caption>
                <thead>
                  <tr>
                    <th scope="col">Data Type</th>
                    <th style={{ width: '150px' }}scope="col">Variant Summary</th>
                    <th scope="col">Circos </th>
                    <th scope="col">Lollipop</th>
                    <th scope="col">CNV </th>
                    <th scope="col">Heatmap</th>
                    <th scope="col">Box </th>
                    <th scope="col">Survival </th>
                    <th scope="col">PCA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Clinical Information</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>

                  </tr>
                  <tr>
                    <td>DNA Mutation</td>
                    <td>
                      <span className="material-icons"alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>CNV</td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Methylation</td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>RNA</td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Fusion</td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Proteome</td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Phosphorylation</td>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td>
                      <span className="material-icons" alt="checkpoint">radio_button_unchecked</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
                <tfoot>
                </tfoot>
              </table>
            </div>
          </>
        )}
        {activeTab === '2' && <MultiDataVisualization />}

        {activeTab === '3' && <OtherTools />}
      </div>
    </div>
  );
};
