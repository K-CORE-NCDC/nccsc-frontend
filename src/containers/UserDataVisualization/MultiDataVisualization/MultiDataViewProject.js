import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Swal from 'sweetalert2';
import { MultiProjectsDelete, MultiProjectsView, MultiProjectsExtend, getProject} from '../../../actions/api_actions';
import '../../../interceptor/interceptor';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import Table from '../../Common/Table/ReactTable';
import PaginateTable from '../../Common/Table/ReactTablePagination';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function ProjectsList() {
  let history = useHistory();
  // const currentPage = 1
  const [tableData, setTableData] = useState(null);
  const [paramObj, setParamObj] = useState({
    perPage: 10,
    pageNumber: 1
  })
  // const perPage = 10
  const currentPage = paramObj?.pageNumber
  const intl = useIntl();
  const selectInput = 'title'
  const searchInput = ''


  const fetchUsers = async (page, method) => {
    let postData = {};
    postData['type'] = selectInput;
    postData['searchTerm'] = searchInput;

    let data = MultiProjectsView(method, postData, paramObj?.pageNumber, paramObj?.perPage,'active');
    data.then((response) => {
      if ('data' in response) {
        // console.log('response', response.data)
        setTableData(response.data);
      }
    });
  };


  const deleteRow = async (projectId) => {
    let data = MultiProjectsDelete('GET', projectId);
    data.then((response) => {
      if ('data' in response) {
        if (response?.data?.message === 'File deleted Successfully') {
          fetchUsers(1, 'GET')
        }
      }
    });
  };

  const extendProject = async (projectId, reasonForExtension) => {

    let data = MultiProjectsExtend('POST', projectId, reasonForExtension);
    data.then((response) => {
      if ('data' in response) {
        if (response?.data?.message === 'Project extended successfully') {
          fetchUsers(1, 'GET')
        }
      }
    });
  };


  useEffect(() => {
    fetchUsers(1, 'GET'); // fetch page 1 of users
  }, [paramObj]);

  const extendConfirmation = async (projectId) => {
    let data = getProject(projectId);
    return data.then((response) => {
      if ('data' in response) {
        const expirationDate = new Date(response.data.expiration_date);
        const uploadedDate = new Date(response.data.uploaded_date);
        const diffInDays = Math.floor((expirationDate - uploadedDate) / (1000 * 60 * 60 * 24));
        if (diffInDays >= 15) {
          return 'no extend';
        }
        return 'extend';
      } else {
        return 'no expiry or uploaded date';
      }
    });
  };

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
    else if (type === 'extend') {
      const extendResult = await extendConfirmation(projectId);
      console.log(extendResult); // Debugging
      if (extendResult === 'extend') {
        Swal.fire({
          title: intl.formatMessage({ id: "ExtendReason", defaultMessage: "Enter Reason For Project Extension" }),
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          cancelButtonText: intl.formatMessage({ id: "Cancel", defaultMessage: 'Cancel' }),
          confirmButtonText: intl.formatMessage({ id: "Extend", defaultMessage: 'Extend' }),
          showLoaderOnConfirm: true,
          allowOutsideClick: false,
          preConfirm: (reason) => {
            return reason;
          }
        }).then((result) => {
          if (result.value) {
            // extendProject(projectId);
            const reason = result.value;
            extendProject(projectId, reason);
          }
        });
      }
      else {
        Swal.fire({
          text: intl.formatMessage({ id: "NoExtend", defaultMessage: "You cannot extend this project again" }),
          icon: 'error',
          confirmButtonColor: '#003177',
          confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
          showCancelButton: false,
          allowOutsideClick: false
        })
      }
    }
  };



  const columns = [
    {
      Header: intl.formatMessage({ id: "Number", defaultMessage: 'No' }),
      accessor: () => ' ',
      Cell: ({ cell: { value, row } }) =>
      (
        < div title={value}>
          {parseInt(row?.index) + parseInt(1) + (currentPage - 1) * paramObj?.perPage}
        </div>
      ),
    },
    {
      Header: intl.formatMessage({ id: "VisualizationColumn", defaultMessage: 'Visualization' }),
      accessor: (row) => row?.view,
      Cell: (row) => (
        <div>
          {!row?.row?.original?.deleted_on && (
            <>
              <Link
                to={{
                  pathname: `/visualise-multidata/home/${row?.row?.original?.project_id}`,
                  state: { projectName: row?.row?.original?.project_id }
                }}
              >
                <span style={{ color: 'blue' }}>
                  <FormattedMessage id="View" defaultMessage="View" />
                </span>
              </Link>
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
              &nbsp; | &nbsp;

              {row?.row?.original?.extended_on ? (
                  <span style={{ color: 'grey' }}>
                    <FormattedMessage id="Extend" defaultMessage="Extend" />
                  </span>
              ) : (
                <Link to="#">
                  <span
                    style={{ color: 'blue' }}
                    onClick={() =>
                      handleButtonClick('extend', row?.row?.original?.project_id)
                    }
                  >
                    <FormattedMessage id="Extend" defaultMessage="Extend" />
                  </span>
                </Link>
              )}
            </>
          )}
        </div>
      ),
      minWidth: '10%'
    },
    {
      Header: intl.formatMessage({ id: "ProjectName", defaultMessage: 'Project Name' }),
      accessor: (original) => original?.project_name,
    },
    {
      Header: intl.formatMessage({ id: "CreatedDate", defaultMessage: 'Created On' }),
      accessor: (original) => {
        const date = new Date(original?.uploaded_date);
        return date.toLocaleDateString(); // Format the date part only
      },
    },
    {
      Header: intl.formatMessage({ id: "ExtendedDate", defaultMessage: 'Extended On' }),
      accessor: (original) => {
        if (original?.extended_on) {
          const date = new Date(original.extended_on);
          return date.toLocaleDateString();
        } else {
          return "--";
        }
      },
    },
    // {
    //   Header: intl.formatMessage({ id: "ReasonForExtension", defaultMessage: 'Reason For Extension' }),
    //   accessor: (original) => {
    //     if (original?.reason_for_extension) {
    //       return original?.reason_for_extension
    //     } else {
    //       return "--";
    //     }
    //   },
    // },
    // {
    //   Header: intl.formatMessage({ id: "DeletedDate", defaultMessage: 'Deleted On' }),
    //   accessor: (original) => {
    //     if (original?.deleted_on) {
    //       const date = new Date(original.deleted_on);
    //       return date.toLocaleDateString();
    //     } else {
    //       return "--";
    //     }
    //   },
    // },
    {
      Header: intl.formatMessage({ id: "ExpirationDate", defaultMessage: 'Expiry Date' }),
      accessor: (original) => {
        const date = new Date(original?.expiration_date);
        return date.toLocaleDateString(); // Format the date part only
      },
    },
    {
      Header: intl.formatMessage({ id: "clinicalInformation", defaultMessage: 'Clinical Information' }),
      accessor: (row) => (row?.files?.clinical_information ? 'O' : ''),
    },
    {
      Header: 'DNA Mutation',
      accessor: (row) => (row?.files?.dna_mutation ? 'O' : ''),
    },
    {
      Header: 'CNV',
      accessor: (row) => (row?.files?.cnv ? 'O' : ''),
    },
    {
      Header: 'Methylation',
      accessor: (row) => (row?.files?.methylation ? 'O' : ''),
    },
    {
      Header: 'RNA',
      // accessor: (row) => (row.rna ? 'O' : ''),
      accessor: (row) => (row?.files?.rna ? 'O' : ''),
    },
    {
      Header: 'Fusion',
      accessor: (row) => (row?.files?.fusion ? 'O' : ''),
    },

    {
      Header: 'Proteome',
      accessor: (row) => (row?.files?.proteome ? 'O' : ''),
    },
    {
      Header: 'Phosphorylation',
      accessor: (row) => (row?.files?.phospho ? 'O' : ''),
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
          summary={'multi_data_view_table'}
            columns={columns}
            data={tableData?.data}
            width={"2300"}
            TotalCount={tableData?.total}
            paramObj={paramObj}
            setParamObj={(data) => setParamObj(data)}
          />
        )}
        {!tableData && <p className="MultiUploadTextCenter"><FormattedMessage id="NoRecords" defaultMessage="No Records Found" /></p>}
      </div>
    </div>
  );
}

function DeletedProjectsList() {
  let history = useHistory();
  // const currentPage = 1
  const [tableData, setTableData] = useState(null);
  const [paramObj, setParamObj] = useState({
    perPage: 10,
    pageNumber: 1
  })
  // const perPage = 10
  const currentPage = paramObj?.pageNumber
  const intl = useIntl();
  const selectInput = 'title'
  const searchInput = ''



  const fetchUsers = async (page, method) => {
    let postData = {};
    postData['type'] = selectInput;
    postData['searchTerm'] = searchInput;

    let data = MultiProjectsView(method, postData, paramObj?.pageNumber, paramObj?.perPage,'deleted');
    data.then((response) => {
      if ('data' in response) {

        setTableData(response.data);
      }
    });
  };


  useEffect(() => {
    fetchUsers(1, 'GET'); // fetch page 1 of users
  }, [paramObj]);



  const columns = [
    {
      Header: intl.formatMessage({ id: "Number", defaultMessage: 'No' }),
      accessor: () => ' ',
      Cell: ({ cell: { value, row } }) =>
      (
        < div title={value}>
          {parseInt(row?.index) + parseInt(1) + (currentPage - 1) * paramObj?.perPage}
        </div>
      ),
    },

    {
      Header: intl.formatMessage({ id: "VisualizationColumn", defaultMessage: 'Visualization' }),
      accessor: (row) => row?.view,
      Cell: (row) => (
        <div>
          {row?.row?.original?.deleted_on &&
          <div>
              <span
                style={{ color: 'grey' }}
              >
                <FormattedMessage id="Delete" defaultMessage="Deleted" />
              </span>
            </div>
          }
        </div>
      ),
      minWidth: '10%'
    },
    {
      Header: intl.formatMessage({ id: "ProjectName", defaultMessage: 'Project Name' }),
      accessor: (original) => original?.project_name,
    },
    {
      Header: intl.formatMessage({ id: "CreatedDate", defaultMessage: 'Created On' }),
      accessor: (original) => {
        const date = new Date(original?.uploaded_date);
        return date.toLocaleDateString(); // Format the date part only
      },
    },
    {
      Header: intl.formatMessage({ id: "ExtendedDate", defaultMessage: 'Extended On' }),
      accessor: (original) => {
        if (original?.extended_on) {
          const date = new Date(original.extended_on);
          return date.toLocaleDateString();
        } else {
          return "--";
        }
      },
    },
    // {
    //   Header: intl.formatMessage({ id: "ReasonForExtension", defaultMessage: 'Reason For Extension' }),
    //   accessor: (original) => {
    //     if (original?.reason_for_extension) {
    //       return original?.reason_for_extension
    //     } else {
    //       return "--";
    //     }
    //   },
    // },
    // {
    //   Header: intl.formatMessage({ id: "DeletedDate", defaultMessage: 'Deleted On' }),
    //   accessor: (original) => {
    //     if (original?.deleted_on) {
    //       const date = new Date(original.deleted_on);
    //       return date.toLocaleDateString();
    //     } else {
    //       return "--";
    //     }
    //   },
    // },
    {
      Header: intl.formatMessage({ id: "DeletedDate", defaultMessage: 'Deleted On' }),
      accessor: (original) => {
        const date = new Date(original?.deleted_on);
        return date.toLocaleDateString(); // Format the date part only
      },
    },
    {
      Header: intl.formatMessage({ id: "clinicalInformation", defaultMessage: 'Clinical Information' }),
      accessor: (row) => (row?.files?.clinical_information ? 'O' : ''),
    },
    {
      Header: 'DNA Mutation',
      accessor: (row) => (row?.files?.dna_mutation ? 'O' : ''),
    },
    {
      Header: 'CNV',
      accessor: (row) => (row?.files?.cnv ? 'O' : ''),
    },
    {
      Header: 'Methylation',
      accessor: (row) => (row?.files?.methylation ? 'O' : ''),
    },
    {
      Header: 'RNA',
      // accessor: (row) => (row.rna ? 'O' : ''),
      accessor: (row) => (row?.files?.rna ? 'O' : ''),
    },
    {
      Header: 'Fusion',
      accessor: (row) => (row?.files?.fusion ? 'O' : ''),
    },

    {
      Header: 'Proteome',
      accessor: (row) => (row?.files?.proteome ? 'O' : ''),
    },
    {
      Header: 'Phosphorylation',
      accessor: (row) => (row?.files?.phospho ? 'O' : ''),
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
          <PaginateTable
            columns={columns}
            data={tableData?.data}
            width={"2300"}
            TotalCount={tableData?.total}
            PageSize={paramObj?.perPage}
            paramObj={paramObj}
            setParamObj={(data) => setParamObj(data)}
          />
        )}
        {!tableData && <p className="MultiUploadTextCenter"><FormattedMessage id="NoRecords" defaultMessage="No Records Found" /></p>}
      </div>
    </div>
  );
}

export default function MultiDataViewProject() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('1');
  const route = useLocation();

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
  const [title, setTitle] = useState({ id: '', defaultMessage: '' });

  useEffect(() => {
    let newTitle = '';
    let newMsg = '';
    if (route.pathname.includes('/home/visualizemydata/')) {
      newTitle += 'visualizemydata';
      newMsg += 'Visualize My Data';
    } else if (route.pathname.includes('/multidatavisualization/')) {
      newTitle = 'MultiDataVisualization';
      newMsg = 'Multi Data Visualization';
    }else if (route.pathname.includes('/multidataprojectview/')) {
      newTitle = 'Multi: View Projects';
      newMsg = 'View Projects';
    }

    if (title.id !== newTitle) {
      setTitle({ id: newTitle, defaultMessage: newMsg });
    }

  }, [route.pathname, breadCrumbs, title.id]);


  useEffect(() => {
    document.title = title.id;
  }, [title]);




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
                <button
                  className="material-icons mainPopupClose"
                  id="mainPopupClose"
                  onClick={closeModal}
                  onTouchStart={closeModal}
                >
                  close
                </button>
              </div>
              <div
                className="popupBody  introduceWrap"
                style={{ padding: '0px', border: '1px solid #ddd' }}
              >
                <div className="introduceBox03" style={{ width: '100%', backgroundColor: "rgb(254, 196, 11)" }}>
                  <ul >
                    <li style={{ borderBottom: "1px solid black", color: 'black' }}>
                      <p style={{ color: "black" }}>
                        <FormattedMessage
                          id="ViewProjectUploadGuidepopUp1"
                          defaultMessage="It is possible to create 5 projects on a account."
                        />
                      </p>
                    </li>
                    <li style={{ color: 'black' }}>
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
        title={title}
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
            <div className="tab">
                <ul>
                    <li className={activeTab === '1' ? 'on' : ''}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('1');
                        }}
                      >
                        <FormattedMessage id="CurrentProjects" defaultMessage="Current Projects" />
                      </button>
                    </li>
                    <li className={activeTab === '2' ? 'on' : ''}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('2');
                        }}
                      >
                        <FormattedMessage id="ArchivedProjects" defaultMessage="Archived Projects" />
                      </button>
                    </li>
                </ul>
              {/* </div> */}
            </div>
            {activeTab === '1' && (
            <div style={{paddingTop: '1%' }}>
              <ProjectsList />
            </div>
            )}
            {activeTab === '2' && (
              <div style={{ paddingTop: '1%' }}>
                <DeletedProjectsList />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
