import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoaderCmp from "../../Common/Loader";
import {
  clearSingleFIleUploadState
} from "../../../actions/api_actions";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

import warningImage from '../../../assets/images/warning.png'




function Modal({ showModal, setShowModal }) {
  const verificationResponse = useSelector(
    (data) => data.homeReducer.singleFileUploadData
  );
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col max-w-max bg-white outline-none focus:outline-none" >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Errors in the Columns of Uploaded Files
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {
                  verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'allFileColumns' &&
                  verificationResponse['res'].map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="uppercase m-auto" key={Math.random() * 102323}>{`Error in File ${item['tab']}: ${item['message']}`}</div>
                      </div>)
                  })
                }
                {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'clinicalInforamtionFile' &&
                  <div className="relative p-6 flex-auto">
                    <div className="my-4 text-2xl leading-relaxed">

                      {
                        Object.keys(verificationResponse["clinicalRows"]).map(filename => {
                          return (
                            <div key={Math.random}>
                              <div className="uppercase underline" >{filename}</div>
                              {
                                Object.keys(verificationResponse["clinicalRows"][filename]).map((item, index) => {
                                  return (
                                    <div className="capitalize ml-2 m-2" key={Math.random}>
                                      <p>{verificationResponse["clinicalRows"][filename][index]}</p>
                                      <p></p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                }
                {verificationResponse && 'issue' in verificationResponse && verificationResponse['issue'] === 'clinicalInforamtionFile' &&
                  <div className="relative p-6 flex-auto">
                    <div className="my-4 text-2xl leading-relaxed">

                      {verificationResponse && "columnMessages" in verificationResponse &&
                        Object.keys(verificationResponse["columnMessages"]).map(filename => {
                          return (
                            <div key={filename}>
                              <div className="uppercase underline " key={filename}>{filename}</div>
                              {
                                Object.keys(verificationResponse["columnMessages"][filename]).map(item => {
                                  return (verificationResponse["columnMessages"][filename][item] !== '' ?
                                    <div className="capitalize ml-2 m-2" key={item}>
                                      <p>{item}: {verificationResponse["columnMessages"][filename][item]}</p>
                                      <p></p>
                                    </div>
                                    : null)
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                }

                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-2xl leading-relaxed">

                    {verificationResponse && "columnMessages" in verificationResponse &&
                      Object.keys(verificationResponse["columnMessages"]).map(filename => {
                        return (
                          <div key={filename}>
                            <div className="uppercase underline " key={filename}>{filename}</div>
                            {
                              Object.keys(verificationResponse["columnMessages"][filename]).map(item => {
                                return (verificationResponse["columnMessages"][filename][item] !== '' ?
                                  <div className="capitalize ml-2 m-2" key={item}>
                                    <p>{item}: {verificationResponse["columnMessages"][filename][item]}</p>
                                    <p></p>
                                  </div>
                                  : null)
                              })
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </div>


                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}


function SingleDataTable({ updateComponentNumber }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [activeTableKey, setActiveTableKey] = useState("");
  const [navTabIs, setNavTabIs] = useState('circos')
  const [showModal, setShowModal] = useState(false)
  let history = useHistory();
  let { tab } = useParams();
  const verificationResponse = useSelector(
    (data) => data.homeReducer.singleFileUploadData
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
    if (verificationResponse && verificationResponse["result"]) {
      let temptabs = [];

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

  const setShowModalFunction = (stateData) => {
    setShowModal(stateData)
  }

  useEffect(() => {
    return () => {
      dispatch(clearSingleFIleUploadState())
    };
  }, [])

  return (
    <div className="auto">
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <Modal showModal={showModal} setShowModal={setShowModalFunction} />

        {projectId === 0 ?

          <>
            <button
              className='btn btnGray bdBtn'
              type="button"
              onClick={() => {
                updateComponentNumber(0)
              }}
            >
              <FormattedMessage id="Back" defaultMessage="Back" />
            </button>

            <div>
              <button onClick={() => setShowModalFunction(true)} className="">
                <img width='50' src={warningImage}></img>
              </button>
            </div>
          </> :
          <>
            <div className=" tab uploadTab">
              <ul >
                {tableNavTabs}
              </ul>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(clearSingleFIleUploadState())
                  history.push(`/visualise-singledata/${tab}/${projectId}`)
                }}
                className='btn btnPrimary'
              >
                <FormattedMessage id="Visualize" defaultMessage="Visualize" />
              </button>
            </div>
          </>
        }




      </div>

      <div className="boardList" style={{ textAlign: 'center' }}>
        {verificationResponse && (
          <DataTable
            title=""
            columns={colData}
            data={rowData}
            defaultSortField="title"
            pagination
            conditionalRowStyles={conditionalRowStyles}
          />
        )}
        {!verificationResponse && (
          <div>
            <LoaderCmp />
            {<p className="text-center">
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
  );
}

export default SingleDataTable;
