import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQaData } from '../../actions/api_actions';
import config from '../../config';
import '../../interceptor/interceptor';
import Table from '../Common/Table/ReactTable';
import LoaderComp from '../Common/Loader';

function QAList() {
  const [tableData, setTableData] = useState([]);
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page, method) => {
    setLoading(true);
    let response;
    if (method === 'GET') {
      response = await axios.get(config.auth + `qa-api/?page=${page}&per_page=${10}&delay=1`);
    } else {
      response = await axios.post(
        config.auth + `qa-api/?page=${page}&per_page=${10}&delay=1&input`,
        {
          type: 'title',
          searchTerm: ''
        }
      );
    }
    setTableData(response.data.data);
    setLoading(false);
  };


  useEffect(() => {
    fetchUsers(1, 'GET'); // fetch page 1 of users
  }, []);

  const columns = [
    {
      Header: intl.formatMessage({ id: "Order", defaultMessage: 'Order' }),
      accessor: () => ' ',
      Cell: ({ cell: { value, row } }) => (
        < div title={value}>
          {parseInt(row?.index) + parseInt(1)}</div>
      ),
      width:"80"
    },
    {
      Header: intl.formatMessage({ id: "Title", defaultMessage: 'Title' }),
      accessor: (row) => row.title,
      width:"200"
    },
    {
      Header: intl.formatMessage({ id: "Writer", defaultMessage: 'Writer' }),
      accessor: (row) => row.writer,
    },
    {
      Header: intl.formatMessage({ id: "DateOfIssue", defaultMessage: 'Date Of Issue' }),
      accessor: (row) => row.created_on.slice(0, 19).replace("T", " "),
    }
  ];


  return (
    <div >
      {loading ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoaderComp /> </div> :
        <div >
          {tableData && (
            <Table
              columns={columns}
              data={tableData}
              width={"1075"}
            />
          )}
        </div>}
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
