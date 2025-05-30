import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFaqData } from '../../actions/api_actions';
import config from '../../config';
import '../../interceptor/interceptor';
import LoaderComp from '../Common/Loader';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import PaginateTable from '../Common/Table/ReactTablePagination';

function FaqList() {
  const intl = useIntl();
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paramObj, setParamObj] = useState({
    perPage: 5,
    pageNumber: 1
  })
  const currentPage = paramObj?.pageNumber
  const fetchUsers = async (page, method) => {
    setLoading(true);
    let response;
    if (method === 'GET') {
      response = await axios.get(config.auth + `faq-api/?page=${paramObj?.pageNumber}&per_page=${paramObj.perPage}&delay=1`);
    } else {
      response = await axios.post(
        config.auth + `faq-api/?page=${paramObj?.pageNumber}&per_page=${paramObj.perPage}&delay=1&input`,
        {
          type: 'title',
          searchTerm: ''
        }
      );
    }
    if (response.data.data) {
      setTableData(response.data);
    }
    else {
      setTableData(null)
    }
    setLoading(false);
  };



  useEffect(() => {
    fetchUsers(1, 'GET'); // fetch page 1 of users
    setParamObj(paramObj)
  }, [paramObj]);

  const columns = [
    {
      Header: intl.formatMessage({ id: "Order", defaultMessage: 'Order' }),
      accessor: () => ' ',
      Cell: ({ cell: { value, row } }) => (
        <div title={value}>
          {parseInt(row?.index) + parseInt(1) + (currentPage - 1) * paramObj?.perPage}
        </div>
      ),
      width: "80"
    },
    {
      Header: intl.formatMessage({ id: "Title", defaultMessage: 'Title' }),
      accessor: (row) => row.title,
      Cell: ({ cell: { _, row } }) => {
        return <div>
          <Link to={`/faq/${row?.original?.id}`}>
            <span>{row.original.title}</span>
          </Link>
        </div>
      },
      width: "200"
    },
    {
      Header: intl.formatMessage({ id: "Writer", defaultMessage: 'Writer' }),
      accessor: (row) => row.writer,
    },
    {
      Header: intl.formatMessage({ id: "DateOfIssue", defaultMessage: 'Date' }),
      accessor: (row) => row.created_on.slice(0, 19).replace("T", " "),
    }
  ];

  return (
    <div >
      {loading ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoaderComp /> </div> :
        <div >
          {tableData  && (
            <PaginateTable
              columns={columns}
              data={tableData.data}
              width={"1075"}
              TotalCount={tableData?.total}
              PageSize={paramObj?.perPage}
              paramObj={paramObj}
              setParamObj={(data) => setParamObj(data)}
              tableSummary={"FAQ"}
            />
          )}
          {tableData && tableData.length === 0 && <h1 className="MultiUploadTextCenter">{intl.formatMessage({ id: "NoRecords", defaultMessage: 'No Records Found' })}</h1>}
        </div>}
    </div>
  );
}

function FaqDetail({ slug_id }) {
  const dispatch = useDispatch();
  const notice_data = useSelector((state) => state.homeReducer.dataFaq);

  useEffect(() => {
    dispatch(getFaqData(slug_id));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {notice_data && (
        <div className="grid grid-col-2">
          <div className="col-span-4">
            <h4 className="h-tit4_tit clear">
              <font>
                <font>FAQ</font>
              </font>
            </h4>
          </div>
          <div className="shadow-sm">
            <table className="border-slate-300 table-auto">
            {/* <caption style={{display: 'none'}}>FAQ</caption> */}
            <caption style={{visibility: 'hidden'}}>FAQ</caption>

              <tbody>
                <tr className="h-8">
                  <td className="p-4">Title</td>
                  <td className="p-4">{notice_data['title']}</td>
                </tr>
                <tr className="h-8">
                  <td className="p-4">Writer</td>
                  <td className="p-4">{notice_data['writer']}</td>
                </tr>
                <tr className="h-8">
                  <td className="p-4">Content</td>
                  <td className="p-4">
                    <div dangerouslySetInnerHTML={{ __html: notice_data['content'] }} />
                  </td>
                </tr>
              </tbody>
              <tfoot>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


export default function Faq() {
  let { slug } = useParams();
  const [postCreate, setPostCreate] = useState(false);
  const callback = (count) => {
    setPostCreate(count);
  };

  useEffect(() => { }, [postCreate]);

  const faq_comp = () => {
    if (slug) {
      return <FaqDetail slug_id={slug} />;
    } else {
      return <FaqList />;
    }
  };

  return <>{faq_comp()}</>;
}
