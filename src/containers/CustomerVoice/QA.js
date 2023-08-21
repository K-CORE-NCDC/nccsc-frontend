import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FormattedMessage } from 'react-intl';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getQaData } from '../../actions/api_actions';
import config from '../../config';
import '../../interceptor/interceptor';

function QAList() {
  const [tableData, setTableData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [redirState, setState] = useState(false);
  const [shortName, setData] = useState('');

  const fetchUsers = async (page, method) => {
    setLoading(true);
    let response;
    if (method === 'GET') {
      response = await axios.get(config.auth + `qa-api/?page=${page}&per_page=${perPage}&delay=1`);
    } else {
      response = await axios.post(
        config.auth + `qa-api/?page=${page}&per_page=${perPage}&delay=1&input`,
        {
          type: 'title',
          searchTerm: ''
        }
      );
    }
    setTableData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page, 'GET');
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await axios.get(
      config.auth + `qa-api/?page=${page}&per_page=${perPage}&delay=1`
    );
    setTableData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1, 'GET'); // fetch page 1 of users
  }, []);

  const columns = [
    {
      name: <FormattedMessage id="Order" defaultMessage="Order" />,
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: <FormattedMessage id="Title" defaultMessage="Title" />,
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: <FormattedMessage id="Writer" defaultMessage="Writer" />,
      selector: (row) => row.writer,
      sortable: true
    },
    {
      name: <FormattedMessage id="DateOfIssue" defaultMessage="Date Of Issue" />,
      selector: (row) => row.created_on,
      sortable: true
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        color: 'black',
        backgroundColor: '#eee',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderTop: '2px solid #4e4e4e!important',
        borderBottom: '1px solid #4e4e4e!important'
      }
    },
    pagination: {
      style: {
        gap: '10px'
      }
    }
  };



  let redirecting = redirState ? <Redirect push to={`/details/${shortName}/`} /> : '';
  return (
    <div className="container mx-auto p-4">
      <div className="contentsTable">
        {tableData && (
          <DataTable
            columns={columns}
            data={tableData}
            customStyles={customStyles}
            progressPending={loading}
            pagination
            paginationComponentOptions={{
              rowsPerPageText: (
                <FormattedMessage id="RowsPerPage" defaultMessage="Rows Per Page">
                  {(msg) => msg}
                </FormattedMessage>
              )
            }}
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            onRowClicked={(rowData) => {
              setState(true);
              setData(rowData.url_slug);
            }}
            pointerOnHover={true}
            highlightOnHover={true}
          />
        )}
        {redirecting}
      </div>
    </div>
  );
}

function QaDetail({ slug_id }) {
  const dispatch = useDispatch();
  const notice_data = useSelector((state) => state.homeReducer.dataQA);

  useEffect(() => {
    dispatch(getQaData(slug_id, ''));
  }, []);

  return (
    <div className="" style={{ color: 'black', border: '1px solid black' }}>
      "sushma"
      {notice_data && (
        <div className="">
        </div>
      )}
    </div>
  );
}

function QaCreate() {
  const dispatch = useDispatch();
  const writer = ''





  function createQA() {
    let temp = {
      title: title,
      writer: writer,
      content: convertedText,
      new: true
    };
    dispatch(getQaData('', temp));
  }

  return (
    <div className="">
      <div className="">
        <div className="">
          <label htmlFor="">Title</label>
        </div>
        <div className="">
          <input
            value={title}
            type="text"
            name="name"
            onChange={(e) => setTitle(e.target.value)}
            className=""
          />
          {message ? <h4 className="mt-4" style={{ color: "red" }}>{message}</h4> : ""}
        </div>
        <div className="">
          <label htmlFor="Name">Writer</label>
        </div>
        <div className="">
          <input
            type="text"
            value={writer}
            name="name"
            onChange={(e) => setWriter(e.target.value)}
            className=""
          />
        </div>
        <div className="">
          <label htmlFor="Name">Content</label>
        </div>
        <div className="">
          <ReactQuill
            theme='snow'
            value={convertedText}
            onChange={setConvertedText}
            style={{ minHeight: '300px' }}
          />
        </div>
        <div className="">
          <button
            className=""
            type="button"
            onClick={() => new_post(false)}
            style={{ backgroundColor: "#b5b5b5", color: "#fff" }}
          >
            Cancel
          </button>
          <button
            className=""
            type="button"
            onClick={createQA}
            style={{ backgroundColor: "#2957cc" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QA() {
  let { slug } = useParams();
  const [postCreate, setPostCreate] = useState(false);

  const callback = (count) => {
    setPostCreate(count);
  };

  useEffect(() => { }, [postCreate]);

  const qa_comp = () => {
    if (slug) {
      return <QaDetail slug_id={slug} />;
    } else if (postCreate) {
      return <QaCreate new_post={callback} />;
    } else {
      return <QAList new_post={callback} />;
    }
  };

  return <>{qa_comp()}</>;
}
