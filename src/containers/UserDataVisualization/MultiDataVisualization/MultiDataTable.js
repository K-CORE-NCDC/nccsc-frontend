import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearMultiFIleUploadState } from '../../../actions/api_actions';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import LoaderCmp from '../../Common/Loader';

function ErrorMessage() {
  const verificationResponse = useSelector((data) => data.homeReducer.multiFileUploadData);

  return (
    verificationResponse &&
    'issue' in verificationResponse &&
    (verificationResponse['issue'] === 'allFileColumns' ||
      verificationResponse['issue'] === 'clinicalInforamtionFile' ||
      verificationResponse['issue'] === 'DataIssues') && (
      <p className="h5 MultiUploadTextCenter">
        <FormattedMessage id="UserDataGuideMessage" defaultMessage="Red mark for invalid data." />
      </p>
    )
  );
}

function MultiDataTable({ updateComponentNumber }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [activeTableKey, setActiveTableKey] = useState('');
  let history = useHistory();
  const verificationResponse = useSelector((data) => data.homeReducer.multiFileUploadData);
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
      console.log('projectResponse', projectResponse);
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

          <ErrorMessage />

          <div className="flex" style={{ justifyContent: 'space-between' }}>
            {projectId === 0 ? (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <button
                    className="btn btnGray bdBtn"
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
                    className="btn btnPrimary"
                  >
                    <FormattedMessage id="Visualize" defaultMessage="Visualize" />
                  </button>
                </div>
              </>
            )}
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
