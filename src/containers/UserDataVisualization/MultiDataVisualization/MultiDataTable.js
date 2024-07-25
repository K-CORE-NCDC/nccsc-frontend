import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearMultiFIleUploadState
} from "../../../actions/api_actions";
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import LoaderCmp from "../../Common/Loader";
import Table from '../../Common/Table/ReactTable';

function Modal({ showModal, toggleModal }) {

  const verificationResponse = useSelector(
    (data) => data.homeReducer.multiFileUploadData
  );
  return (
    <>
      {showModal ? (
        <>
          {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] !== '' &&
            <div className="Toolmodal-container">
              <div className="Toolmodal-content" style={{ maxWidth: "60vw" }}>
                {/*content*/}
                <div className="Toolmodal-dialog">
                  {/*header*/}
                  <div className="Toolmodal-header">
                    <h3 className="Toolmodal-title"><FormattedMessage id="Errors" defaultMessage="Errors" /></h3>
                    <button
                      className="Toolmodal-close-btn"
                      onClick={() => toggleModal(false, '')}
                    >
                      ×
                    </button>
                  </div>
                  {/*body*/}

                  <div className="Toolmodal-body">

                    <div className="MarginBottom4">
                      <div className="InsideModel">
                        {/*content*/}
                        <div className="ErrorModalDivHeader">
                          {/*header*/}
                          <div className="HeaderTitle" style={{ textAlign: 'center', fontSize: '20px' }}>
                            <h3>
                              <FormattedMessage id="ErrorsUploadedFile" defaultMessage="Errors in the Uploaded Files" />
                            </h3>
                          </div>

                          {/* Render the error messages */}
                          {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'allFileColumns' &&
                            verificationResponse['res'].map((item, index) => {
                              return (
                                <div key={index} style={{ margin: "20px", maxHeight: "400px", overflowY: "auto" }}>
                                  <ul>
                                    {item['message'] !== "" && (
                                      <li style={{ textTransform: "uppercase", margin: "auto", fontSize: "15px", fontWeight: "500" }}>
                                        <FormattedMessage id="ErrorinFile" defaultMessage="Error in File" /> {item['tab']}:
                                        <p className="MarginTop4 MarginLeft4" style={{ fontSize: "12px", marginLeft: "3rem" }}>
                                          {/* {item['message']} */}
                                          {verificationResponse && 'specific_issue' in verificationResponse && verificationResponse['specific_issue'] === 'allFileColumns1' &&
                                            <FormattedMessage id="allFileColumns1" defaultMessage="Please insert all the Mandatory columns, Click on the Help Icon to see the required columns" />
                                          }
                                          {verificationResponse && 'specific_issue' in verificationResponse && verificationResponse['specific_issue'] === 'allFileColumns2' &&
                                            <FormattedMessage id="allFileColumns2" defaultMessage="Clinical Information File should have less than or equal to 17 columns, more than 17 found" />
                                          }
                                          {verificationResponse && 'specific_issue' in verificationResponse && verificationResponse['specific_issue'] === 'allFileColumns3' &&
                                            <FormattedMessage id="allFileColumns3" defaultMessage="Error: Please Read Instructions" />
                                          }
                                        </p>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              );
                            })}

                          {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'SampleMismatch' && (
                            <div className="ClinicalInformationErrors">
                              <div>
                                <h2>
                                  <FormattedMessage id="SampleMismatch" defaultMessage="Samples didn't match properly. Please recheck the files and try uploading again." />
                                </h2>
                              </div>
                            </div>
                          )}


                          {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'clinicalInforamtionFile' && (
                            <div className="ClinicalInformationErrors">
                              <div>
                                <h2>
                                  <FormattedMessage id="임상정보" defaultMessage="Clinical Information" />
                                </h2>
                                {Object.keys(verificationResponse["clinicalRows"]).map((columnName) => {
                                  return (
                                    <div key={Math.random} style={{ margin: "20px", maxHeight: "400px", overflowY: "auto" }}>
                                      <div className="uppercase" style={{ fontSize: "20px" }}>
                                        {columnName}
                                      </div>
                                      <ul>
                                        {'type1' in verificationResponse["clinicalRows"][columnName] && verificationResponse["clinicalRows"][columnName]['type1'] &&
                                          <li style={{ textTransform: "uppercase", margin: "auto", fontSize: "15px", fontWeight: "500", marginLeft: "20px" }} key={Math.random}>

                                            <p style={{ fontSize: "12px" }}>
                                              <FormattedMessage id="Row" defaultMessage="In Row " />
                                              {verificationResponse["clinicalRows"][columnName]["error_rows"]}:

                                              {`${columnName} `}

                                              <FormattedMessage id="DataTypeIncorrect" defaultMessage="The data type of the column is incorrect. Correct data type is " />

                                              {`${verificationResponse["clinicalRows"][columnName]["expected_type"]} `}

                                              <FormattedMessage id="ButFound" defaultMessage="But Found " />

                                              {`${verificationResponse["clinicalRows"][columnName]["current_type"]} `}
                                            </p>

                                          </li>
                                        }
                                        {'type2' in verificationResponse["clinicalRows"][columnName] && verificationResponse["clinicalRows"][columnName]['type2'] &&
                                          <li style={{ textTransform: "uppercase", margin: "auto", fontSize: "15px", fontWeight: "500", marginLeft: "20px" }} key={Math.random}>
                                            <p style={{ fontSize: "12px" }}><FormattedMessage id="5Columns" defaultMessage="The column has more than 5 unique values" /></p>
                                          </li>
                                        }

                                      </ul>

                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'DataIssues' && (
                            <div style={{ margin: "20px", maxHeight: "400px", overflowY: "auto" }}>
                              {Object.entries(verificationResponse.result).map(([tabName, tabData]) => (
                                <div key={tabName} style={{ textTransform: "uppercase", margin: "auto" }}>
                                  {tabData[0]['is_error'] && <h2 style={{ textTransform: "uppercase", margin: "auto", fontSize: "15px" }}>{tabData[0]['tab']}</h2>}
                                  <ul>
                                    {tabData.slice(1).map((rowData) => {
                                      const rowNumber = Object.keys(rowData)[0];
                                      const rowValues = rowData[rowNumber];
                                      return Object.entries(rowValues).map(([columnName, columnData]) => {
                                        const { success, row, expected } = columnData;
                                        if (success === "False") {
                                          return (
                                            <li key={columnName} className="MarginTop4 MarginLeft4">
                                              <p style={{ fontSize: "12px" }}>
                                                <FormattedMessage id="Row" defaultMessage="In Row " />
                                                {`${row} : `}
                                                {`${columnName} `}
                                                <FormattedMessage id="DataTypeIncorrect" defaultMessage="The data type of the column is incorrect. Correct data type is " />
                                                {`${expected} `}
                                              </p>
                                            </li>
                                          );
                                        }
                                        return null;
                                      });
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="Toolmodal-footer">
                    <button
                      className="Toolmodal-close-btn"
                      onClick={() => toggleModal(false, '')}
                    >
                      <FormattedMessage id="Close" defaultMessage="Close" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          <div className="Toolmodal-overlay"></div>
        </>
      ) : null}
    </>
  );
}

function MultiDataTable({ updateComponentNumber }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [activeTableKey, setActiveTableKey] = useState("");
  const [showModal, setShowModal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [FalseData, setFalseData] = useState(false)

  let toggleModal = (status) => {
    setShowModal(status)
  }
  let history = useHistory();

  const verificationResponse = useSelector(
    (data) => data.homeReducer.multiFileUploadData
  );
  const fileUploadStatus = useSelector(
    (data) => data.homeReducer.fileUploadStatus
  );

  const tabDropdownTable = (tab) => {
    setActiveTableKey(tab);
  };



  useEffect(() => {
    if (verificationResponse && verificationResponse['project_details']) {
      if ('result' in verificationResponse) {
        let first = Object.values(verificationResponse['result'])[0];
        setActiveTableKey(first[0]['tab']);
      }
    }
  }, [verificationResponse]);

  useEffect(() => {
    let temptabs = [];
    if (verificationResponse && verificationResponse['result']) {
      for (const tabrow in verificationResponse['result']) {
        let tab = verificationResponse['result'][tabrow][0]['tab'];
        if (tab === 'clinical_information') {
          verificationResponse['result'][tabrow][0]['tabName'] = 'Clinical info';
        } else if (tab === 'dna_mutation') {
          verificationResponse['result'][tabrow][0]['tabName'] = 'DNA Mutation';
        } else if (tab === 'cnv') {
          verificationResponse['result'][tabrow][0]['tabName'] = 'CNV';
        } else if (tab === 'methylation') {
          verificationResponse['result'][tabrow][0]['tabName'] = 'Methylation';
        } else if (tab === 'rna') {
          verificationResponse['result'][tabrow][0]['tabName'] = 'RNA';
        } else if (tab === 'fusion') {
          verificationResponse['result'][tabrow][0]['tabName'] = 'Fusion';
        } else if (tab === 'proteome') {
          verificationResponse['result'][tabrow][0]['tabName'] = 'Proteome';
        } else {
          verificationResponse['result'][tabrow][0]['tabName'] = 'Phosphorylation';
        }
        temptabs.push(
          <li key={tab} className={activeTableKey === tab ? 'on' : ''}>
            <button value={tab} onClick={() => tabDropdownTable(tab)} className="capitalize">
              {verificationResponse['result'][tabrow][0]['tabName']}
            </button>
          </li>
        );
      }
      setTableNavTabs(temptabs);
    }

    let Tablecolumns = [];
    let rowdata = [];

    if (verificationResponse) {
      for (const key in verificationResponse['result']) {
        if (activeTableKey === verificationResponse['result'][key][0]['tab']) {
          // setting the columns data
          let columns = verificationResponse['result'][key][0]['columns'];
          let rowObject = {};
          for (let i = 0; i < columns.length; i++) {
            rowObject[columns[i]] = '';
            Tablecolumns.push({
              Header: columns[i],
              accessor: (row) => {
                let rdata = String(row[columns[i]]);
                let v = rdata.split('||');
                if (v.length > 1) {
                  return (
                    <div className="" style={{ color: 'red' }}>
                      {v[1]}
                    </div>
                  );
                } else {
                  return <div className="">{String(row[columns[i]])}</div>;
                }
              }
            });
          }
          let tempRow = { ...rowObject };
          Tablecolumns?.forEach(ele => {
            if (ele?.Header === 'sample_id') {
              ele["fixed"] = 'left'
            }
          })
          setColData(Tablecolumns);
          // setting the row data
          let rawRowData = verificationResponse['result'][key];
          let noOfRows = rawRowData.length;
          for (let i = 1; i < noOfRows; i++) {
            if (rawRowData[i]) {
              let row = rawRowData[i][i];
              for (const colname in row) {
                if (rowObject[colname] === '') {
                  rowObject[colname] =
                    row[colname]['success'] === 'True'
                      ? row[colname]['value']
                      : 'False||' + row[colname]['value'];
                }
              }
              rowdata.push(rowObject);
              rowObject = { ...tempRow };
            }
          }
          setRowData(rowdata);
          setLoading(false)
        }
      }
      let projectResponse =
        'project_details' in verificationResponse ? verificationResponse['project_details'] : {};
      if ('id' in projectResponse) {
        setProjectId(projectResponse['id']);
      } else {
        setProjectId(0);
      }
    }

    if (verificationResponse && 'issue' in verificationResponse && (verificationResponse['issue'] === 'allFileColumns' || verificationResponse['issue'] === 'clinicalInforamtionFile')) {
      setFalseData(true)
      setLoading(false)
    }
  }, [verificationResponse, activeTableKey]);

  useEffect(() => {
    return () => {
      dispatch(clearMultiFIleUploadState());
    };
  }, []);

  const title = { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization' };

  const breadCrumbs = {
    '/newmultidataproject/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
      {
        id: 'MultiDataVisualization',
        defaultMessage: 'Multi Data Visualization',
        to: '/multidatavisualization/'
      },
      { id: 'MultiDataUpload', defaultMessage: 'Multi Data Upload', to: '/home/visualizeMyData/' }
    ]
  };

  const InforIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "1.5rem", height: "1.5rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }

  return (
    <div>
      <HeaderComponent
        title={title}
        routeName="/newmultidataproject/"
        breadCrumbs={breadCrumbs['/newmultidataproject/']}
        type="single"
      />

      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font>
                <FormattedMessage id="MultiData" defaultMessage="Multi Data" />{' '}
              </font>
              <span className="colorSecondary">
                <font>
                  <FormattedMessage id="Upload" defaultMessage="Upload" />{' '}
                </font>
              </span>
            </font>
          </h3>
        </div>
        <div className="auto">

          {verificationResponse && 'issue' in verificationResponse && (verificationResponse['issue'] !== '') &&
            <button onClick={() => toggleModal(true)} className="ToolModalBtn" style={{ float: "right" }}>
              <InforIcon />
            </button>
          }

          {verificationResponse && 'issue' in verificationResponse && (verificationResponse['issue'] !== '') &&
            <div>
              {showModal && <Modal showModal={showModal} toggleModal={toggleModal} />}
            </div>
          }

          {/* Error and Success Messages */}

          <div style={{ width: "fit-content", margin: "auto" }}>

            {verificationResponse && 'issue' in verificationResponse && <p style={{ textAlign: "start" }} className="h5 MultiUploadTextCenter"><FormattedMessage id="UploadDefault1" defaultMessage="QC is completed for all the data, and the top 10 data are displayed." /></p>}

            {verificationResponse && 'issue' in verificationResponse && (verificationResponse['issue'] !== '') && <p style={{ textAlign: "start" }} className="h5 MultiUploadTextCenter"><FormattedMessage id="FilesErrorRed" defaultMessage="For files with data errors, the invalid data among the entire data is displayed in red." /></p>}
            {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] !== '' && <p style={{ textAlign: "start" }} className="h5 MultiUploadTextCenter"><FormattedMessage id="ErrorDataHelpIcon" defaultMessage="Click on the help icon to see detailed error information." /></p>}

            {verificationResponse && 'issue' in verificationResponse && <p style={{ textAlign: "start" }} className="h5 MultiUploadTextCenter"><FormattedMessage id="UploadDefault2" defaultMessage="Please be advised that the user is responsible for using the results." /></p>}

          </div>






          <div className="flex" style={{ justifyContent: 'space-between' }}>
            {projectId === 0 ? (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <button
                    className="btn btnGray bdBtn"
                    style={{ marginBottom: "10px" }}
                    type="button"
                    onClick={() => {
                      updateComponentNumber(0);
                    }}
                  >
                    <FormattedMessage id="Back" defaultMessage="Back" />
                  </button>
                </div>
                <div className="tab uploadTab">
                  <ul>{tableNavTabs}</ul>
                </div>
              </>
            ) : (
              <>
                <div className="tab uploadTab">
                  <ul>{tableNavTabs}</ul>
                </div>
                <div>
                  <button
                    onClick={() => {
                      dispatch(clearMultiFIleUploadState());
                      history.push({
                        pathname: `/visualise-multidata/home/${projectId}`,
                        state: { projectName: verificationResponse?.project_details?.name }
                      });
                    }}
                    className="btn"
                    style={{ backgroundColor: "#009fe2" }}
                  >
                    <FormattedMessage id="Visualize" defaultMessage="Visualize" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="boardList" style={{ width: '100%' }}>
            {loading ?
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%', flexDirection: 'column' }}>
                <span style={{ textAlign: 'center' }}><LoaderCmp /></span>

                <p className="text-center" style={{ marginTop: '3%', textAlign: 'center' }}>
                  <FormattedMessage
                    id="WaitMessage"
                    defaultMessage=" It takes some time to process the data. Please wait ! (2 minutes per 100 samples)"
                  />
                </p>

              </div>
              :
              <>
                {!FalseData &&
                  <div style={{ marginTop: '3%' }}>
                    <Table
                      title=""
                      columns={colData}
                      data={rowData}
                      width={"3300"}
                    />
                  </div>
                }
                {FalseData && <h2 style={{ textAlign: "center", color: "black", marginTop: "20px" }}><FormattedMessage id="NoRecords" defaultMessage="No Records Found" /></h2>}
              </>
            }
            {!verificationResponse && (
              <div className="MultiUploadTextCenter">
                <LoaderCmp />
                {
                  <p className="MultiUploadTextCenter" style={{ marginTop: '20px' }}>
                    <FormattedMessage
                      id="WaitMessage"
                      defaultMessage=" It takes some time to process the data. Please wait ! (2 minutes per 100 samples)"
                    />
                  </p>
                }
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            {fileUploadStatus && fileUploadStatus['failed'] && (
              <div>
                <p>Error</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default MultiDataTable;
