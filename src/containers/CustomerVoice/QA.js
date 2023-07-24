import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import '../../interceptor/interceptor'
import axios from "axios";
import config from '../../config'
import { Redirect, useParams } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import { Context } from "../../wrapper";
import { getQaData } from '../../actions/api_actions'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

function QAList({ new_post }) {
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


  const fetchUsers = async (page, method) => {
    setLoading(true);
    let response
    if (method === "GET") {
      response = await axios.get(config.auth + `qa-api/?page=${page}&per_page=${perPage}&delay=1`);
    } else {
      response = await axios.post(config.auth + `qa-api/?page=${page}&per_page=${perPage}&delay=1&input`, {
        type: selectInput,
        searchTerm: searchInput
      });
    }
    setTableData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = page => {
    fetchUsers(page, "GET");
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await axios.get(config.auth + `qa-api/?page=${page}&per_page=${perPage}&delay=1`);
    setTableData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
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

  function searchTerm() {
    fetchUsers(1, "POST");
  }


  let redirecting = redirState ? (<Redirect push to={`/details/${shortName}/`} />) : '';
  return (
    <div className="container mx-auto p-4">
      <div className="contentsTable">
        {
          tableData &&
          <DataTable
            columns={columns}
            data={tableData}
            customStyles={customStyles}
            progressPending={loading}
            pagination
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


function QaDetail({ slug_id }) {
  const dispatch = useDispatch()
  const notice_data = useSelector((state) => state.homeReducer.dataQA)

  useEffect(() => {
    console.log('QA Detail')
    dispatch(getQaData(slug_id, ""))
  }, [])

  return (
    <div className="" style={{color:'black' , border:'1px solid black'}}>
      "sushma"
      {notice_data && <div className="">
        {/* <div className="col-span-4">
            <h4 className="h-tit4_tit clear">
                <font>
                  <font>Q&A</font>
                </font>
            </h4>
        </div> */}
        {/* <div className="">
          <table className="">
            <tbody>
              <tr className="">
                <td className="">Title</td>
                <td className="">{notice_data['title']}</td>
              </tr>
              <tr className="">
                <td className="">Writer</td>
                <td className="">{notice_data['writer']}</td>
              </tr>
              <tr className="">
                <td className="">Content</td>
                <td className=""><div dangerouslySetInnerHTML={{ __html: notice_data['content'] }} /></td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
      }
    </div>
  )
}


function QaCreate({ new_post }) {
  const notice_data = useSelector((state) => state.homeReducer.dataQA)
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState()
  const [writer, setWriter] = React.useState()
  const [message, setMessage] = React.useState()
  // const [content, setContent] = React.useState()
  const [convertedText, setConvertedText] = useState("Some default content");

  // useEffect(()=>{
  //   dispatch(getQaData(slug_id,""))
  // },[])

  useEffect(() => {
    console.log('Qa Create')
    if (notice_data !== undefined) {
      setMessage(notice_data['message'])
    }
  }, [notice_data])



  function createQA() {
    let temp = {
      "title": title,
      "writer": writer,
      "content": convertedText,
      "new": true
    }
    dispatch(getQaData("", temp))
  }

  return (
    // <div className="">
    //   <div className="">
    //     <div className="">
    //       <label htmlFor="">Title</label>
    //     </div>
    //     <div className="">
    //       <input
    //         value={title}
    //         type="text"
    //         name="name"
    //         onChange={(e)=>setTitle(e.target.value)}
    //         className=""
    //       />
    //       {message?<h4 className="mt-4" style={{color:"red"}}>{message}</h4>:""}
    //     </div>
    //     <div className="">
    //       <label htmlFor="Name">Writer</label>
    //     </div>
    //     <div className="">
    //       <input
    //         type="text"
    //         value={writer}
    //         name="name"
    //         onChange={(e)=>setWriter(e.target.value)}
    //         className=""
    //       />
    //     </div>
    //     <div className="">
    //       <label htmlFor="Name">Content</label>
    //     </div>
    //     <div className="">
    //           <ReactQuill
    //             theme='snow'
    //             value={convertedText}
    //             onChange={setConvertedText}
    //             style={{minHeight: '300px'}}
    //           />
    //     </div>
    //     <div className="">
    //         <button
    //             className=""
    //             type="button"
    //             onClick={()=>new_post(false)}
    //             style={{backgroundColor:"#b5b5b5",color:"#fff"}}
    //           >
    //           Cancel
    //         </button>
    //         <button
    //             className=""
    //             type="button"
    //             onClick={createQA}
    //             style={{backgroundColor:"#2957cc"}}
    //           >
    //           Save
    //         </button>
    //     </div>
    //   </div>
    // </div>
    <></>
  )
}


export default function QA() {
  let { slug } = useParams();
  const [postCreate, setPostCreate] = useState(false)

  const callback = (count) => {
    setPostCreate(count)
  }

  useEffect(() => {
  }, [postCreate])

  const qa_comp = () => {
    if (slug) {
      return <QaDetail slug_id={slug} />
    } else if (postCreate) {
      return <QaCreate new_post={callback} />
    } else {
      return <QAList new_post={callback} />
    }
  }

  return (
    <>
      {qa_comp()}
    </>
  )
}
