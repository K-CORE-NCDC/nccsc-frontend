import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { clearSingleFIleUploadState } from '../../../actions/api_actions';
import LoaderCmp from '../../Common/Loader';

function ErrorMessage() {

  return (
    <p className="h5 MultiUploadTextCenter">
      <FormattedMessage id="UserDataGuideMessage" defaultMessage="Red mark for invalid data." />
    </p>
  );
}

function SingleDataTable({ updateComponentNumber }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [activeTableKey, setActiveTableKey] = useState('');
  let history = useHistory();
  let { tab } = useParams();
  const verificationResponse = useSelector((data) => data.homeReducer.singleFileUploadData);
  const fileUploadStatus = useSelector((data) => data.homeReducer.fileUploadStatus);

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
              name: columns[i],
              selector: (row) => {
                let rdata = String(row[columns[i]]);
                let v = rdata.split('||');
                if (v.length > 1) {
                  return (
                    <div className="boardCell" style={{ color: 'red' }}>
                      {v[1]}
                    </div>
                  );
                } else {
                  return <div className="boardCell">{String(row[columns[i]])}</div>;
                }
              },
              className: 'boardCell',
              sortable: true
            });
          }

          let tempRow = { ...rowObject };
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
      let projectResponse =
        'project_details' in verificationResponse ? verificationResponse['project_details'] : {};
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

  useEffect(() => {
    return () => {
      dispatch(clearSingleFIleUploadState());
    };
  }, []);

  return (
    <div className="auto">
      {/* <ModalDiv /> */}
      <ErrorMessage />

      <p style={{ justifyContent: 'center', display: 'flex' }}>
        <FormattedMessage
          id="loginGuide"
          defaultMessage="The user should be responsible for using result."
        />
      </p>

      <div className="flex" style={{ justifyContent: 'space-between' }}>
        {projectId === 0 ? (
          <>
            <button
              className="btn btnGray bdBtn"
              type="button"
              onClick={() => {
                updateComponentNumber(0);
              }}
            >
              <FormattedMessage id="Back" defaultMessage="Back" />
            </button>

            <div className=" tab uploadTab">
              <ul>{tableNavTabs}</ul>
            </div>
          </>
        ) : (
          <>
            <div className=" tab uploadTab">
              <ul>{tableNavTabs}</ul>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(clearSingleFIleUploadState());
                  history.push(`/visualise-singledata/${tab}/${projectId}`);
                }}
                className="btn btnPrimary"
              >
                <FormattedMessage id="Visualize" defaultMessage="Visualize" />
              </button>
            </div>
          </>
        )}
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
              <p className="text-center">
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
  );
}

export default SingleDataTable;
