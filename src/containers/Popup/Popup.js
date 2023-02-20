import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { getNoticeDetail, clearNotice} from '../../actions/api_actions'
import config from '../../config';


function Popup({toggleModal}) {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const d = new Date();
  const day = d.getDay();

  const[content, setContent] = useState('')
  const noticedetails = useSelector((data) => data.homeReducer.noticedata);
  useEffect(() => {
    dispatch(getNoticeDetail("GET",{}));
  },[])

  useEffect(()=>{
    let currentUrl = window.location
    
    if((currentUrl['pathname'] === '/k-core/' || currentUrl['pathname']==='/k-core/home/' || currentUrl['pathname']==='/' || currentUrl['pathname']==='/k-core/') ){
      setShowModal(true)
      }
  })

  let changeDay = ()=>{
    let date = new Date().toISOString().split('T')[0]
    localStorage.setItem('ncc_notice_popup',JSON.stringify({'date':date, 'showpopup':false}))
    setShowModal(false)
    toggleModal(false)
  }
  let closeModal = ()=>{
    // dispatch(clearNotice())
    setShowModal(false)
    toggleModal(false)
  }  
  useEffect(()=>{
    if(noticedetails && 'data' in noticedetails && ( Object.keys(noticedetails['data']).length > 0)){
      let content = noticedetails['data']['content']
      if(content){
        content = content.replaceAll('="/media','="'+config['media']+'')
        setContent(content)
      }
    }
  },[noticedetails])

  return (
    <>
      {showModal && (noticedetails && 'data' in noticedetails && ( Object.keys(noticedetails['data']).length > 0) ) ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl w-6/12">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-10">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    K-Core Portal Notice
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}

                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                {/* {noticedetails && 'data' in noticedetails &&
                  <div className="relative p-6 flex-auto">
                    <p>{noticedetails.data.id}</p>
                    <p>{noticedetails.data.content}</p>
                    <p>{noticedetails.data.title}</p>

                  </div>
                } */}


                {noticedetails && 'data' in noticedetails && ( Object.keys(noticedetails['data']).length > 0) &&<div  dangerouslySetInnerHTML={{ __html: content }}></div>}


                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-dark active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => changeDay() }
                  >
                    Remind after 24 hrs
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Popup