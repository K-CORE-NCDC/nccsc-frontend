import React, { useState,useEffect, useRef } from "react";
import {useSelector, useDispatch} from "react-redux";
import pipeline from '../../assets/images/sub/pipeline.png'
import DataTable from "react-data-table-component";
import '../../assets/interceptor/interceptor'
import axios from "axios";
import config from '../../config'
import { Link, Redirect, useParams } from "react-router-dom";

import { getQaData } from '../../actions/api_actions'
// import JoditEditor from "jodit-react";
// import "./styles.css";

// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";




// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU';
// import $ from 'jquery';

// var webpack = require('webpack');
// window.jQuery = require("jquery");

// new webpack.ProvidePlugin({
//     $: "jquery",
//     jQuery: "jquery"
// })

// import DataTableExtensions from "react-data-table-component-extensions";

// import TinyMCE from 'react-tinymce';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

function QAList({new_post}) {
    const [tableData, setTableData] = useState([])
    const faq_data = useSelector((state)=>state.homeReducer.dataQA)
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [selectInput, setSelectInput] = useState("title");
    const [searchInput, setSearchInput] = useState("");
    const [redirState, setState] = useState(false);
    const [shortName, setData] = useState('');
    const [title, setTitle] = React.useState()
    const [writer, setWriter] = React.useState()
    const [content, setContent] = React.useState()
    const dispatch = useDispatch();
    const editor = useRef(null);


    const handleUpdate = (event) => {
      const editorContent = event.target.innerHTML;
      setContent(editorContent);
    };


    const fetchUsers = async (page,method) => {
      setLoading(true);
      let response
      if(method === "GET"){
         response = await axios.get(config.auth +`qa-api/?page=${page}&per_page=${perPage}&delay=1`);
      }else{
        response = await axios.post(config.auth +`qa-api/?page=${page}&per_page=${perPage}&delay=1&input`,{
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
  		const response = await axios.get(config.auth +`qa-api/?page=${page}&per_page=${perPage}&delay=1`);
  		setTableData(response.data.data);
  		setPerPage(newPerPage);
  		setLoading(false);
   };

    useEffect(() => {
		    fetchUsers(1, "GET"); // fetch page 1 of users
     }, []);


    const columns =  [
      {
        name: 'Order',
        selector: row => row.id,
        sortable: true
      },
      {
        name: 'Title',
        selector: row => row.title,
        sortable: true
      },
      {
        name: 'Writer',
        selector: row => row.writer,
        sortable: true
      },
      {
        name: 'Date Of Issue',
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
      }
    };

    function searchTerm(){
        fetchUsers(1, "POST");
    }


    let redirecting = redirState ? (<Redirect push to={`/qa/${shortName}/`}/>) : '';
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-col-4">
          <div className="col-span-4">
              <h4 className="h-tit4_tit clear">
                  <font>
                    <font>Q & A</font>
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
                      <option className="text-xl" value="title">Title</option>
                      <option className="text-xl" value="content">Content</option>
                      <option className="text-xl" value="writer">Writer</option>
                    </select>
                  </div>
                  <div className="flex-initial w-80 mr-4 mb-4">
                    <input type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}className="border border-slate-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" />
                  </div>
                  <div className="flex-initial w-32">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={searchTerm}>
                      Search
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
          <div className="col-span-4 mt-8">
            <div className="float-right">
              <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => new_post(true)}
                  style={{backgroundColor:"#2957cc"}}
                >
                Create Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}


function QaDetail({slug_id}){
  const dispatch = useDispatch()
  const notice_data = useSelector((state)=>state.homeReducer.dataQA)

  useEffect(()=>{
    dispatch(getQaData(slug_id,""))
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


function QaCreate({new_post}){
  const notice_data = useSelector((state)=>state.homeReducer.dataQA)
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [title, setTitle] = React.useState()
  const [writer, setWriter] = React.useState()
  const [message, setMessage] = React.useState()
  // const [content, setContent] = React.useState()
  const [convertedText, setConvertedText] = useState("Some default content");

  // useEffect(()=>{
  //   dispatch(getQaData(slug_id,""))
  // },[])

  useEffect(()=>{
    if(notice_data !== undefined){
        setMessage(notice_data['message'])
      }
  },[notice_data])



  function createQA(){
    let temp = {
      "title":title,
      "writer":writer,
      "content":convertedText,
      "new":true
    }
    dispatch(getQaData("",temp))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 w-full">
        <div className="col-span-1">
          <label htmlFor="Name">Title</label>
        </div>
        <div className="col-span-2 mb-8">
          <input
            value={title}
            type="text"
            name="name"
            onChange={(e)=>setTitle(e.target.value)}
            className="w-3/4 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
          />
          {message?<h4 className="mt-4" style={{color:"red"}}>{message}</h4>:""}
        </div>
        <div className="col-span-1">
          <label htmlFor="Name">Writer</label>
        </div>
        <div className="col-span-2 mb-8">
          <input
            type="text"
            value={writer}
            name="name"
            onChange={(e)=>setWriter(e.target.value)}
            className="w-3/4 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="Name">Content</label>
        </div>
        <div className="col-span-2 mb-8 border border-gray-300">
              <ReactQuill
                theme='snow'
                value={convertedText}
                onChange={setConvertedText}
                style={{minHeight: '300px'}}
              />
        </div>
        <div className="col-span-2 ">
            <button
                className="float-right bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=>new_post(false)}
                style={{backgroundColor:"#b5b5b5",color:"#fff"}}
              >
              Cancel
            </button>
            <button
                className="float-right bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={createQA}
                style={{backgroundColor:"#2957cc"}}
              >
              Save
            </button>
        </div>
      </div>
    </div>
  )
}


export default function QA(){
  let { slug }  = useParams();
  const [slugState, setSlugStare] = useState()
  const [postCreate, setPostCreate] = useState(false)
  let render = []

  const callback = (count) => {
      setPostCreate(count)
  }

  useEffect(()=>{
  },[postCreate])

  const qa_comp = () => {
    if(slug){
      return <QaDetail slug_id={slug}/>
    }else if (postCreate) {
      return <QaCreate new_post={callback}/>
    }else{
      return <QAList new_post={callback}/>
    }
  }

  return (
    <>
    {qa_comp()}
    </>
  )
}
