import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import plusicon from '../../assets/images/icon-plus-primary.svg';
import minusicon from '../../assets/images/icons8-minus-24.png';
import MultiDataManual from '../../assets/files/DownloadbleFiles/MultiDataVis/MultiDatavis_ManualV3.4.pdf';

const MultiDataVisualization = () => {
  const history = useHistory();
  const viewMoreData = false
  return (
    <div className="tabContents " style={{ height: '85vh' }}>
      <div className="dataSearchWrap">
        <div className="popularBox">
          <div className="subHeader">
            <p className="tit h5">Contents</p>
            <div className="tit contentBtns">
              <button
                className="btn"
                id="ExamplePage"
                onClick={() => {
                  history.push('/visualizemulti-exampledata/home');
                }}
              >
                <FormattedMessage id="ExamplePage" defaultMessage="Example Page" />
              </button>
              <button className="btn" id="DownloadManual">
                <a href={MultiDataManual} download>
                  <FormattedMessage id="DownloadManual" defaultMessage="Download Manual" />
                </a>
              </button>
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
                <a href={MultiDataManual} download>
                  <span className="material-icons">
                    download
                  </span>
                </a>
              </button>
            </div>
          </div>

          <div className="contentBox">
            <ul className="contentBox_left">
              <li className="" tabIndex="0">
                <p>
                  {' '}
                  <b>Circos: </b> &nbsp;
                  <FormattedMessage
                    id="Example_multi_circos"
                    defaultMessage="visualize seven omics data as a circular layer on a circular chromosome map"
                  />
                </p>
              </li>
              <li className="" tabIndex="-1">
                <p>
                  {' '}
                  <b>Oncoprint:</b> &nbsp;
                  <FormattedMessage
                    id="Example_multi_onco"
                    defaultMessage="visualize DNA mutations and various omics information of each patient's gene with columns, colors, symbols, etc."
                  />
                </p>
              </li>
              <li tabIndex="-1">
                <p>
                  {' '}
                  <b>Lollipop:</b> &nbsp;
                  <FormattedMessage
                    id="Example_single_Lollipop"
                    defaultMessage=" visualize mutation or phosphorylation of certain gene on a sequence"
                  />
                </p>
              </li>
              <li className="" tabIndex="-1" style={{}}>
                <p>
                  <b> Volcano:</b> &nbsp;
                  <FormattedMessage
                    id="Example_multi_valcano"
                    defaultMessage="visualize genes (DEGs) showing significant expression differences between the two groups divided according to clinical conditions"
                  />
                </p>
              </li>
              {viewMoreData && (
                <>
                  <li tabIndex="-1">
                    <p>
                      {' '}
                      <b>Heatmap :</b> &nbsp;
                      <FormattedMessage
                        id="Example_mutli_heatmap"
                        defaultMessage="represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)"
                      />
                    </p>
                  </li>
                  <li className="" tabIndex="-1" style={{}}>
                    <p>
                      {' '}
                      <b>Survival :</b> &nbsp;
                      <FormattedMessage
                        id="Example_multi_survival"
                        defaultMessage="visualize the recurrence/survival probability of patients according to clinical variable or genetic conditions"
                      />
                    </p>
                  </li>
                </>
              )}
            </ul>
            <ul className="contentBox_right">
              <li className="" tabIndex="-1">
                <p>
                  <b>Correlation :</b> &nbsp;
                  <FormattedMessage
                    id="Example_multi_correlation"
                    defaultMessage=" visualize the correlation between RNA expression values and proteome abundance values for a selected gene"
                  />
                </p>
              </li>
              <li className="" tabIndex="-1">
                <p>
                  <b>CNV:</b> &nbsp;
                  <FormattedMessage
                    id="Example_multi_CNV"
                    defaultMessage="visualize copy number variation data on integrated genome viewer"
                  />
                </p>
              </li>
              <li className="" tabIndex="-1" style={{}}>
                <p>
                  <b>Box (Tumor vs Normal):</b> &nbsp;
                  <FormattedMessage
                    id="Example_single_box"
                    defaultMessage="visualize the genetic information statistics of the selected gene(s) in the form of boxes"
                  />
                </p>
              </li>

              {viewMoreData && (
                <>
                  <li className="" tabIndex="-1" style={{}}>
                    <p>
                      {' '}
                      <b>Fusion:</b> &nbsp;
                      <FormattedMessage
                        id="Example_multi_fusion"
                        defaultMessage="visualize the number of fusion gene(s) and individual fusion gene for the selected sample group"
                      />
                    </p>
                  </li>
                  <li className="" tabIndex="-1" style={{}}>
                    <p>
                      {' '}
                      <b>Sankey:</b> &nbsp;
                      <FormattedMessage
                        id="Example_multi_sankey"
                        defaultMessage=" visualize drug relation information of the selected mutations"
                      />
                    </p>
                  </li>
                </>
              )}
              <button
                className="btnMore"
                style={{ float: 'right', marginTop: '25px' }}
                onClick={() => {
                  history.push('/visualizemulti-exampledata/home');
                }}
              >
                <img src={!viewMoreData ? plusicon : minusicon} alt={!viewMoreData ? "see more" : "see less"} />
              </button>
            </ul>
          </div>
        </div>
      </div>
      <table className="contentsTable" style={{ marginTop: '15px' }}summary='shows file types which are required for the vizualization'>
      <caption style={{display: 'none'}}>Multi Data Visualization Table</caption>
        <thead>
          <tr>
            <th scope="col" style={{ width: '160px' }}>Data Type</th>
            <th scope="col">Circos </th>
            <th scope="col">Oncoprint</th>
            <th scope="col">Lollipop</th>
            <th scope="col">Volcano </th>
            <th scope="col">Heatmap</th>
            <th scope="col">Survival </th>
            <th scope="col">Correlation</th>
            <th scope="col">CNV</th>
            <th scope="col">Box</th>
            <th scope="col">Fusion </th>
            <th scope="col">Sankey</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clinical Information</td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>{' '}
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>{' '}
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>{' '}
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>{' '}
            </td>
          </tr>
          <tr>
            <td>DNA Mutation</td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td></td>
            <td>
              <span className="material-icons" alt="checkpoint">O</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
          </tr>
          <tr>
            <td>CNV</td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Methylation</td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
          </tr>
          <tr>
            <td>RNA</td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td><span className="material-icons" alt="필수 입력">*</span></td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td>
              <span className="material-icons" alt="checkpoint">O</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Fusion</td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Proteome</td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td><span className="material-icons" alt="필수 입력">*</span></td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td>
              <span className="material-icons" alt="checkpoint">O</span>
            </td>
            <td>
              <span className="material-icons" alt="필수 입력">*</span>
            </td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td><span className="material-icons"alt="선택 입력">V</span></td>
          </tr>
          <tr>
            <td>Phosphorylation</td>
            <td></td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td>
              <span className="material-icons"alt="선택 입력">V</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <div>
        <ul className="contentBox_right" style={{ marginTop: "10px" }}>
          <li className="" tabIndex="-1">
            <p>
              <b>* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> &nbsp;
              <FormattedMessage
                id="Required"
                defaultMessage="Required"
              />
            </p>
          </li>
          <li className="" tabIndex="-1">
            <p>
              <b>V &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> &nbsp;
              <FormattedMessage
                id="AtleastOne"
                defaultMessage="At least one of the displayed data required"
              />
            </p>
          </li>
          <li className="" tabIndex="-1" style={{}}>
            <p>
              <b>O &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> &nbsp;
              <FormattedMessage
                id="Optional"
                defaultMessage="Optional"
              />
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MultiDataVisualization;
