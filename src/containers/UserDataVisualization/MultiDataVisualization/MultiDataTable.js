import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoaderCmp from "../../Common/Loader";
import {
  clearMultiFIleUploadState
} from "../../../actions/api_actions";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import warningImage from '../../../assets/images/warning.png'
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";




function ModalDiv() {

  const verificationResponse = useSelector(
    (data) => data.homeReducer.multiFileUploadData
  );
  return (verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] !== '' && <div className="MarginBottom4">
    <div className="InsideModel">
      {/*content*/}
      <div className="ErrorModalDivHeader">
        {/*header*/}
        <div className="HeaderTitle" style={{ textAlign: 'center', fontSize: '20px' }}>
          <h3>
            Errors in the Columns of Uploaded Files
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
                      Error in File {item['tab']}:
                      <p className="MarginTop4 MarginLeft4" style={{ fontSize: "12px", marginLeft: "3rem" }}>
                        {item['message']}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}

        {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'clinicalInforamtionFile' && (
          <div className="ClinicalInformationErrors">
            <div>
              <h2>
                Clinical Information
              </h2>
              {Object.keys(verificationResponse["clinicalRows"]).map((filename) => {
                return (
                  <div key={Math.random} style={{ margin: "20px", maxHeight: "400px", overflowY: "auto" }}>
                    <div className="uppercase" style={{ fontSize: "20px" }}>
                      {filename}
                    </div>
                    <ul>
                      {Object.keys(verificationResponse["clinicalRows"][filename]).map((item, index) => {
                        return (
                          <li style={{ textTransform: "uppercase", margin: "auto", fontSize: "15px", fontWeight: "500", marginLeft: "20px" }} key={Math.random}>
                            <p style={{ fontSize: "12px" }}>{verificationResponse["clinicalRows"][filename][index]}</p>
                          </li>
                        );
                      })}
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
                      const { success, message, row } = columnData;

                      if (success === "False") {
                        return (
                          <li key={columnName} className="MarginTop4 MarginLeft4">
                            Row {row}: In {columnName} Column {message} but Found Something Else.
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
  </div>)

}

function MultiDataTable({ updateComponentNumber }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [activeTableKey, setActiveTableKey] = useState("");
  const [navTabIs, setNavTabIs] = useState('circos')
  let history = useHistory();
  let { tab } = useParams();
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
    if (verificationResponse && verificationResponse["project_details"]) {
      for (const available_step in verificationResponse["project_details"]["available_steps"]) {
        if (verificationResponse["project_details"]["available_steps"][available_step].length > 0) {
          setNavTabIs(available_step)
        }
      }
      if ('result' in verificationResponse) {
        let first = Object.values(verificationResponse['result'])[0];
        setActiveTableKey(first[0]['tab']);
      }

    }
  }, [verificationResponse])

  useEffect(() => {
    let temptabs = [];
    if (verificationResponse && verificationResponse["result"]) {

      for (const tabrow in verificationResponse["result"]) {
        let tab = verificationResponse["result"][tabrow][0]["tab"];
        temptabs.push(
          <li key={tab} className={(activeTableKey === tab) ? 'on' : ''}>
            <button
              value={tab}
              onClick={() => tabDropdownTable(tab)}
              className="capitalize"
            >
              {tab}
            </button>
          </li>
        );
      }
      setTableNavTabs(temptabs);
    }

    let Tablecolumns = [];
    let rowdata = [];

    if (verificationResponse) {
      for (const key in verificationResponse["result"]) {
        if (activeTableKey === verificationResponse["result"][key][0]["tab"]) {
          // setting the columns data
          let columns = verificationResponse["result"][key][0]["columns"];
          let rowObject = {};
          for (let i = 0; i < columns.length; i++) {
            rowObject[columns[i]] = "";
            Tablecolumns.push({
              name: columns[i],
              selector: (row) => {
                let rdata = String(row[columns[i]]);
                let v = rdata.split("||");
                if (v.length > 1) {
                  return <div className="boardCell text-red-700">{v[1]}</div>;
                } else {
                  return <div className="boardCell">{String(row[columns[i]])}</div>;
                }

              },
              className: 'boardCell',
              sortable: true,
            });
          }

          let tempRow = { ...rowObject };
          setColData(Tablecolumns);
          // setting the row data
          let rawRowData = verificationResponse["result"][key];
          let noOfRows = rawRowData.length;
          for (let i = 1; i < noOfRows; i++) {
            if (rawRowData[i]) {
              let row = rawRowData[i][i];
              for (const colname in row) {
                if (rowObject[colname] === "") {
                  rowObject[colname] =
                    row[colname]["success"] === "True"
                      ? row[colname]["value"]
                      : "False||" + row[colname]["value"];
                }
              }
              rowdata.push(rowObject);
              rowObject = { ...tempRow };
            }
          }
          setRowData(rowdata);
        }
      }
      let projectResponse = 'project_details' in verificationResponse ? verificationResponse["project_details"] : {};
      if ("id" in projectResponse) {
        setProjectId(projectResponse["id"]);
      } else {
        setProjectId(0);
      }
    }

  }, [verificationResponse, activeTableKey]);

  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        backgroundColor: "green",
        userSelect: "none",
      },
    },
  ];


  useEffect(() => {
    return () => {
      dispatch(clearMultiFIleUploadState())
    };
  }, [])

  const title = { id: "MultiDataVisualization", defaultMessage: "Multi Data Visualization" }

  const breadCrumbs = {
    '/newmultidataproject/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
      { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization', to: '/multidatavisualization/' },
      { id: 'MultiDataUpload', defaultMessage: 'Multi Data Upload', to: '/home/visualizeMyData/' },
    ]
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
              <font ><FormattedMessage id="MultiData" defaultMessage="Multi Data" /> </font>
              <span className="colorSecondary">
                <font ><FormattedMessage id="Upload" defaultMessage="Upload" /> </font>
              </span>
            </font>
          </h3>
        </div>
        <div className="auto">

          <ModalDiv />

          <div className="flex" style={{ justifyContent: 'space-between' }}>
            {projectId === 0 ?
              <>
                <div>
                  <button
                    className='btn btnGray bdBtn'
                    type="button"
                    onClick={() => {
                      updateComponentNumber(0)
                    }}
                  >
                    <FormattedMessage id="Back" defaultMessage="Back" />
                  </button>
                </div>
                <div className="tab uploadTab">
                  <ul >
                    {tableNavTabs}
                  </ul>
                </div>
              </> :
              <>
                <div className="tab uploadTab">
                  <ul >
                    {tableNavTabs}
                  </ul>
                </div>
                <div>
                  <button
                    onClick={() => {
                      dispatch(clearMultiFIleUploadState())
                      history.push(`/visualise-multidata/home/${projectId}`)
                    }}
                    className='btn btnPrimary'
                  >
                    <FormattedMessage id="Visualize" defaultMessage="Visualize" />
                  </button>
                </div>
              </>
            }
          </div>

          <div className="boardList">
            {verificationResponse && (
              <DataTable
                title=""
                columns={colData}
                data={rowData}
                defaultSortField="title"
                pagination
                conditionalRowStyles={conditionalRowStyles}
                customStyles={{
                  table: {
                    border: '1px solid black',
                  },
                  pagination: {
                    style: {
                        gap:"10px"
                    }
                  }      
                }}
              />
            )}
            {!verificationResponse && (
              <div className="MultiUploadTextCenter">
                <LoaderCmp />
                {<p className="MultiUploadTextCenter">
                  <FormattedMessage id='WaitMessage' defaultMessage=' It takes some time to process the data. Please wait ! (2 minutes per 100 samples)' />
                </p>
                }
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            {
              fileUploadStatus && fileUploadStatus['failed'] &&
              <div>
                <p>Error</p>
              </div>
            }
          </div>

        </div>
      </article>
    </div>
  );
}

export default MultiDataTable;
