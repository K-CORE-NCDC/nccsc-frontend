import React, { useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearNewFileUploadState } from '../../../../actions/api_actions';
import LoaderCmp from '../../../Common/Loader';

import warningImage from '../../../../assets/images/warning.png';
import Table from '../../../Common/Table/ReactTable';

function Modal({ showModal, setShowModal }) {
  const verificationResponse = useSelector((data) => data.homeReducer.uploadClinicalColumns);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col max-w-max bg-white outline-none focus:outline-none">
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
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-2xl leading-relaxed">
                    {verificationResponse &&
                      'columnMessages' in verificationResponse &&
                      Object.keys(verificationResponse['columnMessages']).map((filename) => {
                        return (
                          <div key={filename}>
                            <div className="uppercase underline " key={filename}>
                              {filename}
                            </div>
                            {Object.keys(verificationResponse['columnMessages'][filename]).map(
                              (item) => {
                                return verificationResponse['columnMessages'][filename][item] !==
                                  '' ? (
                                  <div className="capitalize ml-2 m-2" key={item}>
                                    <p>
                                      {item}:{' '}
                                      {verificationResponse['columnMessages'][filename][item]}
                                    </p>
                                    <p></p>
                                  </div>
                                ) : null;
                              }
                            )}
                          </div>
                        );
                      })}
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

function FileProjectDataTable({ updateComponentNumber }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [activeTableKey, setActiveTableKey] = useState('');
  const [navTabIs, setNavTabIs] = useState('circos');
  const [showModal, setShowModal] = useState(false);
  let history = useHistory();
  const verificationResponse = useSelector((data) => data.homeReducer.uploadClinicalColumns);

  const tabDropdownTable = (tab) => {
    setActiveTableKey(tab);
  };

  useEffect(() => {
    if (verificationResponse && verificationResponse['project_details']) {
      for (const available_step in verificationResponse['project_details']['available_steps']) {
        if (verificationResponse['project_details']['available_steps'][available_step].length > 0) {
          setNavTabIs(available_step);
        }
      }
      if ('result' in verificationResponse) {
        let first = Object.values(verificationResponse['result'])[0];
        setActiveTableKey(first[0]['tab']);
      }
    }
  }, [verificationResponse]);
  useEffect(() => {
    if (verificationResponse && verificationResponse['result']) {
      let temptabs = [];

      for (const tabrow in verificationResponse['result']) {
        let tab = verificationResponse['result'][tabrow][0]['tab'];
        let css = 'px-4 py-2 font-semibold rounded-t opacity-50';
        if (activeTableKey === tab) {
          css += ' border-blue-400 border-b-4 -mb-px opacity-100';
        }
        temptabs.push(
          <li key={tab} className={css}>
            <button value={tab} onClick={() => tabDropdownTable(tab)} className="capitalize">
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
                  return <div className="text-red-700">{v[1]}</div>;
                } else {
                  return <div className="">{String(row[columns[i]])}</div>;
                }
              },
              sortable: true
            });
          }

          let tempRow = { ...rowObject };
          // Tablecolumns?.forEach(ele =>{
          //   ele[]
          // })
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
        }
      }
      let projectResponse = verificationResponse['project_details'];
      if ('id' in projectResponse) {
        setProjectId(projectResponse['id']);
      } else {
        setProjectId(0);
      }
    }
  }, [verificationResponse, activeTableKey]);

  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        backgroundColor: 'green',
        userSelect: 'none'
      }
    }
  ];

  const setShowModalFunction = (stateData) => {
    setShowModal(stateData);
  };

  return (
    <div>
      <div className="p-1 flex justify-around">
        <Modal showModal={showModal} setShowModal={setShowModalFunction} />
        {projectId === 0 && (
          <button
            className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
            type="button"
            onClick={() => {
              updateComponentNumber(1);
            }}
          >
            <FormattedMessage id="Back" defaultMessage="Back" />
          </button>
        )}
        {projectId === 0 && (
          <div>
            <button
              onClick={() => setShowModalFunction(true)}
              className="has-tooltip bg-red-500 hover:bg-red-700 text-white text-center py-2 px-4 rounded-full h-20 w-20 inline-flex items-center"
            >
              <img src={warningImage}></img>
            </button>
          </div>
        )}

        {projectId !== 0 && (
          <button
            onClick={() => {
              dispatch(clearNewFileUploadState());
              history.push(`/visualise-singledata/${navTabIs}/${projectId}`);
            }}
            className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          >
            <FormattedMessage id="Visualize" defaultMessage="Visualize" />
          </button>
        )}
      </div>
      <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 ">
          {tableNavTabs}
        </ul>
      </nav>
      <div className="App">
        {verificationResponse && (
          <Table
          summary={'project_upload_table'}
            title=""
            columns={colData}
            data={rowData}
            defaultSortField="title"
            pagination
            conditionalRowStyles={conditionalRowStyles}
            customStyles={{
              table: {
                border: '1px solid black'
              },
              pagination: {
                style: {
                  gap: '10px'
                }
              }
            }}
          />
        )}

        {!verificationResponse && (
          <div>
            <LoaderCmp />
            {
              <p className="mt-8 text-center text-lg">
                <FormattedMessage
                  id="WaitMessage"
                  defaultMessage=" It takes some time to process the data. Please wait ! (2 minutes per 100 samples)"
                />{' '}
              </p>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default FileProjectDataTable;
