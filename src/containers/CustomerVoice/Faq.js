import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import '../../interceptor/interceptor'
import config from '../../config'
import { Redirect, useParams } from "react-router-dom";
import { Context } from "../../wrapper";
import { getFaqData, getFaqPageData } from '../../actions/api_actions'
import { FormattedMessage } from "react-intl";

function FaqList() {
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [tableData, setTableData] = useState([])
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectInput, setSelectInput] = useState("title");
  const [searchInput, setSearchInput] = useState("");
  const [redirState, setState] = useState(false);
  const [shortName, setData] = useState('');
  const [title, setTitle] = useState('Title')
  const [content, setContent] = useState("Content")
  const [writer, setWriter] = useState("Writer")
  const [order, setOrder] = useState("Order")
  const [Dateofissue, setDateofissue] = useState("Date Of Issue")

  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
    } else {
      setKoreanlanguage(false);
    }
  });

  useEffect(() => {
    if (koreanlanguage) {
      setTitle('제목')
      setContent("내용")
      setWriter("작성자")
      setOrder("번호")
      setDateofissue("일시")
    }
    else {
      setTitle('Title')
      setContent("Content")
      setWriter("Writer")
      setOrder("Order")
      setDateofissue("Date Of Issue")
    }
  })

  const fetchUsers = async (page, method) => {
    setLoading(true);
    let response
    let url = config.auth + `faq-api/?page=${page}&per_page=${perPage}&delay=1`
    if (method === "GET") {
      let data = getFaqPageData(url, "GET")
      data.then((response) => {
        setTableData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      })
    } else {
      url = config.auth + `faq-api/?page=${page}&per_page=${perPage}&delay=1&input`
      let body = {
        type: selectInput,
        searchTerm: searchInput
      }
      let data = getFaqPageData(url, "POST", body)
      data.then((response) => {
        setTableData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
      })
    }
  };

  const handlePageChange = page => {
    fetchUsers(page, "GET");
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    let url = config.auth + `faq-api/?page=${page}&per_page=${perPage}&delay=1`
    let data = getFaqPageData(url, "GET")
    data.then((response) => {
      setTableData(response.data.data);
      setPerPage(newPerPage);
      setLoading(false);
    })
  };

  useEffect(() => {
    fetchUsers(1, "GET"); // fetch page 1 of users
  }, []);


  const columns = [
    {
      name: order,
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: title,
      selector: row => row.title,
      sortable: true
    },
    {
      name: writer,
      selector: row => row.writer,
      sortable: true
    },
    {
      name: Dateofissue,
      selector: row => row.created_on,
      sortable: true
    }
  ]

  const customStyles = {
    headCells: {
      style: {
        color: "black",
        backgroundColor: "#eee",
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderTop: "2px solid #4e4e4e!important",
        borderBottom: "1px solid #4e4e4e!important"
      },
    },
    pagination: {
      style: {
        gap: "10px"
      }
    }
  };

  let redirecting = redirState ? (<Redirect push to={`/faq/${shortName}/`} />) : '';

  return (
    <div className="container mx-auto p-4">
      <div className="">
        {
          tableData &&
          <DataTable
            columns={columns}
            data={tableData}
            customStyles={customStyles}
            progressPending={loading}
            pagination
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
            onRowClicked={rowData => {
              setState(true);
              setData(rowData.url_slug);
            }}
            pointerOnHover={true}
            highlightOnHover={true}
          />
        }
        {redirecting}
      </div>
    </div>
  )
}

function FaqDetail({ slug_id }) {
  const dispatch = useDispatch()
  const notice_data = useSelector((state) => state.homeReducer.dataFaq)

  useEffect(() => {
    dispatch(getFaqData(slug_id))
  }, [])

  return (
    <div className="container mx-auto p-4">
      {notice_data && <div className="grid grid-col-2">
        <div className="col-span-4">
          <h4 className="h-tit4_tit clear">
            <font>
              <font>FAQ</font>
            </font>
          </h4>
        </div>
        <div className="shadow-sm">
          <table className="border-slate-300 table-auto">
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
                <td className="p-4"><div dangerouslySetInnerHTML={{ __html: notice_data['content'] }} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
  )
}

export default function Notice() {
  let { slug } = useParams();

  return (
    <>
      {slug ? <FaqDetail slug_id={slug} /> : <FaqList />}
    </>
  )
}
