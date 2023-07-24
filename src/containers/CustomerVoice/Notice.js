import React, { useState,useEffect, useContext } from "react";
import {useSelector, useDispatch} from "react-redux";
import DataTable from "react-data-table-component";
import '../../interceptor/interceptor'
import axios from "axios";
import config from '../../config';
import { Redirect, useParams } from "react-router-dom";
import { Context } from "../../wrapper";
import { getNoticeData } from '../../actions/api_actions'
import {FormattedMessage} from 'react-intl';

function NoticeList() {
    const context = useContext(Context);
    const [koreanlanguage, setKoreanlanguage] = useState(false);
    const [Englishlanguage, setEnglishlanguage] = useState(true);
    const [ title, setTitle] = useState('Title')
    const [content, setContent] = useState("Content")
    const [writer, setWriter] = useState("Writer")
    const [order, setOrder] = useState("Order")
    const [Dateofissue, setDateofissue] = useState("Date Of Issue")

    const [tableData, setTableData] = useState([])
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const [selectInput, setSelectInput] = useState("title");
    const [searchInput, setSearchInput] = useState("");
    const [redirState, setState] = useState(false);
    const [shortName, setData] = useState('');

    useEffect(() => {
      if (context["locale"] === "kr-KO") {
        setKoreanlanguage(true);
        setEnglishlanguage(false);
      } else {
        setKoreanlanguage(false);
        setEnglishlanguage(true);
      }
    });

    useEffect(()=>{
      if(koreanlanguage){
        setTitle( '제목')
        setContent( "내용")
        setWriter( "작성자")
        setOrder("번호")
        setDateofissue("일시")
      }
      else if(Englishlanguage){
        setTitle( 'Title')
        setContent( "Content")
        setWriter( "Writer")
        setOrder("Order")
        setDateofissue("Date Of Issue")
      }
    })

    const fetchUsers = async (page,method) => {
      setLoading(true);
      let response
      if(method === "GET"){
         response = await axios.get(config.auth +`notice-api/?page=${page}&per_page=${perPage}&delay=1`);
      }else{
        response = await axios.post(config.auth +`notice-api/?page=${page}&per_page=${perPage}&delay=1&input`,{
          type:selectInput,
          searchTerm:searchInput
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
  		const response = await axios.get(config.auth +`notice-api/?page=${page}&per_page=${perPage}&delay=1`);
  		setTableData(response.data.data);
  		setPerPage(newPerPage);
  		setLoading(false);
   };

    useEffect(() => {
		    fetchUsers(1, "GET"); // fetch page 1 of users
     }, []);


    const columns =  [
      {
        name: order,
        selector: (row, index) => index+1,
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
              color:"black",
              backgroundColor:"#eee",
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

    function searchTerm(){
        fetchUsers(1, "POST");
    }

    let redirecting = redirState ? (<Redirect push to={`/notice/${shortName}/`}/>) : '';

    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-col-4">
          <div className="col-span-4">
              <h4 className="h-tit4_tit clear">
                  <font>
                    <font>Notice</font>
                  </font>
              </h4>
          </div>
          <div className="col-span-4 h-8">
            <div className="grid grid-col-4">
              <div className="col-span-2">
              </div>
              <div className="col-span-2">
                <div className="flex float-right">
                  <div className="flex-none w-40 h-14">
                    <select value={selectInput} onChange={(e)=>setSelectInput(e.target.value)} name="cars" id="cars" className="border border-slate-400 rounded pt-1 pb-1">
                      <option className="text-xl" value="title">{title}</option> 
                      <option className="text-xl" value="content">{content}</option>
                      <option className="text-xl" value="writer">{writer}</option>
                    </select>
                  </div>
                  <div className="flex-initial w-80 mr-4 mb-4">
                    <input type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}className="border border-slate-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" />
                  </div>
                  <div className="flex-initial w-32">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={searchTerm}>
                      <FormattedMessage id="Search" defaultMessage="Search"/>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col-span-4 mt-8">
            {
              tableData&&
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
      </div>
    )
}

function NoticeDetail({slug_id}){
  const dispatch = useDispatch()
  const notice_data = useSelector((state)=>state.homeReducer.dataNotice)


  useEffect(()=>{
    dispatch(getNoticeData(slug_id))
  },[])

  return (
    <div className="container mx-auto p-4">
      {notice_data && <div className="grid grid-col-2">
        <div className="col-span-4">
            <h4 className="h-tit4_tit clear">
                <font>
                  <font>Notice</font>
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
                <td className="p-4"><div dangerouslySetInnerHTML={{__html: notice_data['content']}} /></td>
              </tr>
            </tbody>
            </table>
        </div>
      </div>
    }
    </div>
  )
}

export default function Notice(){
  let { slug }  = useParams();

  return (
    <>
    {slug?<NoticeDetail slug_id={slug}/>:<NoticeList/>}
    </>
  )
}
