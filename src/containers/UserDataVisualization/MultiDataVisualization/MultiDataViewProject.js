import axios from "axios";
import { TrashIcon } from "@heroicons/react/outline";
import React, { useState, useEffect, useContext } from "react";
import '../../../interceptor/interceptor'
import config from '../../../config'
import { Redirect, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import { FormattedMessage } from 'react-intl';
import { Context } from "../../../wrapper";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import { MultiProjectsDelete, MultiProjectsView } from "../../../actions/api_actions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Draggable from 'react-draggable';
import AOS from 'aos';


function ProjectsList() {
  let history = useHistory();
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([])
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectInput, setSelectInput] = useState("title");
  const [searchInput, setSearchInput] = useState("");
  const [redirState, setState] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [SNo, setSNo] = useState("SNo")
  const [projectName, setProjectName] = useState('')
  const [clinicalInformation, setClinicalInformation] = useState("Clinical Information")
  const [dnaMutation, setDnaMutation] = useState("Dna Mutation")
  const [methylation, setMethylation] = useState("Methylation")
  const [rna, setRna] = useState("RNA")
  const [cnv, setCnv] = useState("CNV")
  const [proteome, setProteome] = useState("Proteome")
  const [phospho, setPhospho] = useState("Phospho")
  const [fusion, setFusion] = useState("Fusiom")
  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
    } else {
      setKoreanlanguage(false);
    }
  });

  useEffect(() => {
    // if (koreanlanguage) {
    //   setSNo("일련 번호")
    //   setProjectName('프로젝트 이름')
    //   setClinicalInformation("임상 정보")
    //   setDnaMutation("DNA 돌연변이")
    //   setMethylation("메틸화")
    //   setRna("RNA")
    //   setCnv("CNV")
    //   setProteome("프로테옴")
    //   setPhospho("포스포")
    //   setFusion("퓨전")

    // }
    // else {
    //   setSNo("SNo")
    //   setProjectName('ProjectName')
    //   setClinicalInformation("ClinicalInformation")
    //   setDnaMutation("DnaMutation")
    //   setMethylation("Methylation")
    //   setRna("Rna")
    //   setCnv("Cnv")
    //   setProteome("Proteome")
    //   setPhospho("Phospho")
    //   setFusion("Fusion")

    // }
  })

  const fetchUsers = async (page, method) => {
    setLoading(true);
    let response
    let postData = {}
    postData['type'] = selectInput
    postData['searchTerm'] = searchInput

    let data = MultiProjectsView(method, postData, page, perPage)
    data.then((response) => {
      if ('data' in response) {
        setTableData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      }
    })
    // if (method === "GET") {
    //     response = await axios.get(config.auth + `user-projects-data/?page=${page}&per_page=${perPage}&delay=1`);
    // } else {
    //     response = await axios.post(config.auth + `user-projects-data/?page=${page}&per_page=${perPage}&delay=1&input`, {
    //         type: selectInput,
    //         searchTerm: searchInput
    //     });
    // }
    // setTableData(response.data.data);
    // setTotalRows(response.data.total);
    // setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page, "GET");
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await axios.get(config.auth + `user-projects-data/?page=${page}&per_page=${perPage}&delay=1`);
    setTableData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const deleteRow = async (projectId) => {
    // const response = await axios.get(config.auth + `delete-user-project-data/${projectId}`);
    let data = MultiProjectsDelete('GET', projectId)
    data.then((response) => {
      if ('data' in response) {
        setTableData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      }
    })
  }

  useEffect(() => {
    fetchUsers(1, "GET"); // fetch page 1 of users
  }, []);

  let handleButtonClick = async (type, projectId) => {
    if (type === 'delete') {

      Swal.fire({
        text: "Are you sure you want to Delete this Project?",
        icon: 'error',
        confirmButtonColor: '#003177',
        confirmButtonText: 'Ok',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          deleteRow(projectId)
        }
      })

    }
  }

  const columns = [
    {
      name: <FormattedMessage id="Number" defaultMessage="No" />,
      selector: (_, index) => index + 1 + (currentPage - 1) * perPage,
      sortable: true
    },
    {
      name: <FormattedMessage id="VisualizationColumn" defaultMessage="Visualization" />,
      cell: (row) => (
        <div className="MultiDataTableViewDelete">
          {/* <Link to={`/visualise-multidata/home/${row?.project_id}`} > */}
          <Link to={{
            pathname: `/visualise-multidata/home/${row?.project_id}`,
            state: { projectName: row.project_name }
          }}>
            <span style={{ color: 'blue' }}>
              <FormattedMessage id="View" defaultMessage="View" />
            </span>
          </Link> &nbsp; | &nbsp;
          <Link to='#'>
            <span style={{ color: 'blue' }} onClick={() => handleButtonClick('delete', row.project_id)}>
              <FormattedMessage id="Delete" defaultMessage="Delete" />
            </span>
          </Link>
        </div>
      ),
      minWidth: '10%'
    },

    {
      name: <FormattedMessage id="ProjectName" defaultMessage="Project Name" />,
      cell: (row) => (
        <div className="MultiDataTableViewDelete">
          <div>
            {row.project_name}
          </div>
        </div>
      ),
      sortable: true,
      minWidth: '15%'
    },
    {
      name: <FormattedMessage id="clinicalInformation" defaultMessage="clinicalInformation" />,
      selector: row => row.clinical_information ? 'O' : '',
      sortable: true
    },
    {
      name: 'DNA Mutation',
      selector: row => row.dna_mutation ? 'O' : '',
      sortable: true
    },
    {
      name: "CNV",
      selector: row => row.cnv ? 'O' : '',
      sortable: true
    },
    {
      name: "Methylation",
      selector: row => row.methylation ? 'O' : '',
      sortable: true
    },
    {
      name: "RNA",
      selector: row => row.rna ? 'O' : '',
      sortable: true
    },
    {
      name: "Fusion",
      selector: row => row.fusion ? 'O' : '',
      sortable: true
    },

    {
      name: "Proteome",
      selector: row => row.proteome ? 'O' : '',
      sortable: true
    },
    {
      name: "Phosphorylation",
      selector: row => row.phospho ? 'O' : '',
      sortable: true
    },

  ]
  const customStyles = {
    table: {
      style: {
        display: "table",
        width: "100%",
        tableLayout: "fixed",
        borderTop: "2px solid #2e2e2e",
        borderCollapse: "collapse",
        fontSize: "16px",
        color: "#8f8f8f",
        fontWeight: "500",
        textAlign: "center !important"
      },
    },
    thead: {
      style: {
        display: "table-header-group",
        fontWeight: "500",
      },
    },
    td: {
      style: {
        display: "table-cell",
        verticalAlign: "middle",
        padding: "20px 16px",
        position: "relative",
        width: "90px",
        color: "#2e2e2e",
        borderBottom: "1px solid #2e2e2e"
      },
    },
    tr: {
      style: {
        display: "table-row",
        borderBottom: "1px solid #2e2e2e"
      },
    },
    tbody: {
      style: {
        display: "table-row-group",
      },
    },
    pagination: {
      style: {
        gap: "10px"
      }
    }
  };


  function searchTerm() {
    fetchUsers(1, "POST");
  }

  // let redirecting = redirState ? (<Redirect push to={`/visualise-multidata/home/${projectId}`} />) : '';

  return (
    <div className="container mx-auto p-4">
      <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
        <>
          <div>
            <button
              className='btn btnPrimary'
              type="button"
              onClick={() => {
                history.goBack()
              }}
            >
              <FormattedMessage id="Back" defaultMessage="Back" />
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                history.push('/newmultidataproject/')
              }}
              className='btn btnPrimary'
            >
              <FormattedMessage
                id="CreateProjects"
                defaultMessage="Create Project"
              />
            </button>
          </div>
        </>

      </div>
      <div className="">
        {
          tableData &&
          <DataTable
            columns={columns}
            data={tableData}
            customStyles={customStyles}
            progressPending={loading}
            pagination={true}
            paginationComponentOptions={{
              rowsPerPageText:
                <FormattedMessage id="RowsPerPage" defaultMessage="Rows Per Page">
                  {msg => msg}
                </FormattedMessage>
            }}
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}

          // onRowClicked={rowData => {
          //   setState(true);
          //   setProjectId(rowData.id);
          // }}
          // pointerOnHover={true}
          // highlightOnHover={true}
          />
        }
        {/* {redirecting} */}
      </div>
    </div>
  )
}

export default function MultiDataViewProject() {
  let { slug } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const breadCrumbs = {
    '/multidatavisualization/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
      { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization', to: '/multidatavisualization/' },
      { id: 'MultiDataProjectView', defaultMessage: 'Multi Data Project View', to: '/MultiDataProjectView/' }
    ]
  }
  useEffect(() => {
    AOS.init({
      duration: 2000
    });
    AOS.refresh()
  }, [])

  let closeModal = () => {
    setIsOpen(false);
  }

  const handleDrag = () => {
    if (!isOpen) {
      return false;
    }
  };

  return (
    <>
      {isOpen && isOpen === true && <Draggable disabled={!isOpen} onDrag={handleDrag}>
        <div
          style={{
            width: '300px',
            height: '400px',
            position: 'fixed',
            bottom: isOpen ? '0px' : '-1000px',
            right: isOpen ? '50px' : '-1000px',
            zIndex: '15',

          }}

        >
          <div className="mainPopup W100" data-aos="zoom-in" data-aos-once='true'>
            <div className="popupHeader">
              <h3 className='TextLeft'>Note</h3>
              <span className="material-icons mainPopupClose" id="mainPopupClose" onClick={closeModal}>
                close
              </span>
            </div>
            <div className='popupBody  introduceWrap' style={{ "padding": "0px", "border": "1px solid #ddd" }}>
              <div className="introduceBox03" style={{ "width": "100%" }}>
                <ul>
                  <li>
                    <p>
                      <FormattedMessage id="ViewProjectUploadGuidepopUp1" defaultMessage="It is possible to create 5 projects on a account." />
                    </p>
                  </li>
                  <li>
                    <p>
                      <FormattedMessage id="ViewProjectUploadGuidepopUp2" defaultMessage="The period to check each project is 2 weeks from the date of creation. After 2 weeks, the project will be deleted." />
                    </p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </Draggable>}

      <HeaderComponent
        title={"sd"}
        routeName="/multidatavisualization/"
        breadCrumbs={breadCrumbs['/multidatavisualization/']}
        type="single"

      />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font><FormattedMessage id="MultiData" defaultMessage="Multi Data" /></font>
              <span className="colorSecondary">
                <font ><FormattedMessage id="visualization" defaultMessage="Visualization" /></font>
              </span>
            </font>
          </h3>
        </div>
        <div className="ptn">
          <div className="auto">
            {/* {slug ? <ProjectsDetail slug_id={slug} /> : <ProjectsList />} */}
            {<ProjectsList />}
          </div>
        </div>
      </article>
    </>
  )
}
