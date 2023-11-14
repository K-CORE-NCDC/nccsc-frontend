import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Swal from 'sweetalert2';
import { MultiProjectsDelete, MultiProjectsView } from '../../../actions/api_actions';
import '../../../interceptor/interceptor';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import Table from '../../Common/Table/ReactTable';

function ProjectsList() {
  let history = useHistory();
  const currentPage = 1
  const [tableData, setTableData] = useState([]);
  const perPage = 10
  const intl = useIntl();
  const selectInput = 'title'
  const searchInput = ''

  const fetchUsers = async (page, method) => {
    let postData = {};
    postData['type'] = selectInput;
    postData['searchTerm'] = searchInput;

    let data = MultiProjectsView(method, postData, page, perPage);
    data.then((response) => {
      if ('data' in response) {
        setTableData(response.data.data);
      }
    });
  };

  const deleteRow = async (projectId) => {
    // const response = await axios.get(config.auth + `delete-user-project-data/${projectId}`);    
    let data = MultiProjectsDelete('GET', projectId); data.then((response) => {
      if ('data' in response) {
        if (response?.data?.message === 'File deleted Successfully') {
          fetchUsers(1, 'GET')
        }
      }
    });
  };

  useEffect(() => {
    fetchUsers(1, 'GET'); // fetch page 1 of users
  }, []);

  let handleButtonClick = async (type, projectId) => {
    if (type === 'delete') {
      Swal.fire({
        text: intl.formatMessage({ id: "DeleteProject", defaultMessage: "Are you sure you want to Delete this Project?" }),
        icon: 'error',
        confirmButtonColor: '#003177',
        confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
        showCancelButton: true,
        cancelButtonText: intl.formatMessage({ id: "Cancel", defaultMessage: 'Cancel' }),
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          deleteRow(projectId);
        }
      });
    }
  };

  const columns = [
    {
      Header: intl.formatMessage({ id: "Number", defaultMessage: 'No' }),
      accessor: () => ' ',
      Cell: ({ cell: { value, row } }) => (
        < div title={value}>
          {parseInt(row?.index) + parseInt(1) + (currentPage - 1) * perPage}</div>
      ),
    },
    {
      Header: intl.formatMessage({ id: "VisualizationColumn", defaultMessage: 'Visualization' }),
      accessor: (row) => row?.view,
      Cell: (row) => (
        <div>
          <Link
            to={{
              pathname: `/visualise-multidata/home/${row?.row?.original?.project_id}`,
              state: { projectName: row?.row?.original?.project_id }
            }}
          >
            <span style={{ color: 'blue' }}>
              <FormattedMessage id="View" defaultMessage="View" />
            </span>
          </Link>{' '}
          &nbsp; | &nbsp;
          <Link to="#">
            <span
              style={{ color: 'blue' }}
              onClick={() =>
                handleButtonClick('delete', row?.row?.original?.project_id)
              }
            >
              <FormattedMessage id="Delete" defaultMessage="Delete" />
            </span>
          </Link>
        </div>
      ),
      minWidth: '10%'
    },

    {
      Header: intl.formatMessage({ id: "ProjectName", defaultMessage: 'Project Name' }),
      accessor: (original) => original?.project_name,
    },
    {
      Header: intl.formatMessage({ id: "clinicalInformation", defaultMessage: 'clinical Information' }),
      accessor: (row) => (row.clinical_information ? 'O' : ''),
    },
    {
      Header: 'DNA Mutation',
      accessor: (row) => (row.dna_mutation ? 'O' : ''),
    },
    {
      Header: 'CNV',
      accessor: (row) => (row.cnv ? 'O' : ''),
    },
    {
      Header: 'Methylation',
      accessor: (row) => (row.methylation ? 'O' : ''),
    },
    {
      Header: 'RNA',
      accessor: (row) => (row.rna ? 'O' : ''),
    },
    {
      Header: 'Fusion',
      accessor: (row) => (row.fusion ? 'O' : ''),
    },

    {
      Header: 'Proteome',
      accessor: (row) => (row.proteome ? 'O' : ''),
    },
    {
      Header: 'Phosphorylation',
      accessor: (row) => (row.phospho ? 'O' : ''),
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
        <>
          <div>
            <button
              className="btn btnPrimary"
              type="button"
              onClick={() => {
                history.goBack();
              }}
            >
              <FormattedMessage id="Back" defaultMessage="Back" />
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                history.push('/newmultidataproject/');
              }}
              className="btn btnPrimary"
            >
              <FormattedMessage id="CreateProjects" defaultMessage="Create Project" />
            </button>
          </div>
        </>
      </div>
      <div className="">
        {tableData && (
          <Table
            columns={columns}
            data={tableData}
            width={"2300"}
          />
        )}
        {!tableData && <p className="MultiUploadTextCenter"><FormattedMessage id="NoRecords" defaultMessage="No Records Found" /></p>}
      </div>
    </div>
  );
}

export default function MultiDataViewProject() {
  const [isOpen, setIsOpen] = useState(true);
  const breadCrumbs = {
    '/multidatavisualization/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
      {
        id: 'MultiDataVisualization',
        defaultMessage: 'Multi Data Visualization',
        to: '/multidatavisualization/'
      },
      {
        id: 'MultiDataProjectView',
        defaultMessage: 'Multi Data Project View',
        to: '/MultiDataProjectView/'
      }
    ]
  };
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
    AOS.refresh();
  }, []);

  let closeModal = () => {
    setIsOpen(false);
  };

  const handleDrag = () => {
    if (!isOpen) {
      return false;
    }
  };

  return (
    <>
      {isOpen && isOpen === true && (
        <Draggable disabled={!isOpen} onDrag={handleDrag}>
          <div
            style={{
              width: '300px',
              height: '400px',
              position: 'fixed',
              bottom: isOpen ? '0px' : '-1000px',
              right: isOpen ? '50px' : '-1000px',
              zIndex: '15'
            }}
          >
            <div className="mainPopup W100" data-aos="zoom-in" data-aos-once="true">
              <div className="popupHeader">
                <h3 className="TextLeft">Note</h3>
                <span
                  className="material-icons mainPopupClose"
                  id="mainPopupClose"
                  onClick={closeModal}
                  onTouchStart={closeModal}
                >
                  close
                </span>
              </div>
              <div
                className="popupBody  introduceWrap"
                style={{ padding: '0px', border: '1px solid #ddd' }}
              >
                <div className="introduceBox03" style={{ width: '100%', backgroundColor: "rgb(254, 196, 11)" }}>
                  <ul >
                    <li style={{borderBottom:"1px solid black", color:'black' }}>
                      <p style={{ color: "black"}}>
                        <FormattedMessage
                          id="ViewProjectUploadGuidepopUp1"
                          defaultMessage="It is possible to create 5 projects on a account."
                        />
                      </p>
                    </li>
                    <li style={{color:'black'}}>
                      <p style={{ color: "black" }}>
                        <FormattedMessage
                          id="ViewProjectUploadGuidepopUp2"
                          defaultMessage="The period to check each project is 2 weeks from the date of creation. After 2 weeks, the project will be deleted."
                        />
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}

      <HeaderComponent
        title={'sd'}
        routeName="/multidatavisualization/"
        breadCrumbs={breadCrumbs['/multidatavisualization/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font>
                <FormattedMessage id="MultiData" defaultMessage="Multi Data" />
              </font>
              <span className="colorSecondary">
                <font>
                  <FormattedMessage id="visualization" defaultMessage="Visualization" />
                </font>
              </span>
            </font>
          </h3>
        </div>
        <div className="ptn">
          <div className="auto">
            {<ProjectsList />}
          </div>
        </div>
      </article>
    </>
  );
}
