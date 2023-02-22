import React, { useState, useEffect } from "react";

import { interPro } from "../../actions/api_actions";
import { useDispatch,useSelector } from "react-redux";
import LoaderCmp from '../Common/Loader'
import config from "../../config";
import {FormattedMessage} from 'react-intl';
import Attachments from '../../assets/insulin.fasta'

function Modal({ showModal, setShowModal, body }) {
    return (
      <>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" style={{width:'31vw'}}>
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Interpro Sample File
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="my-4 text-2xl leading-relaxed">
                      <p>Click on the link to download sample file</p>
                      <a href={Attachments} download className='text-blue-300'>Download</a>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
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


function InterPro() {
    const [interProFile, setInterProFile] = useState();
    const [loader, setLoader] = useState(false)
    const [msg, setMsg] = useState('')
    const [loop,setLoop] = useState(null)
    const [html, setHtml] = useState([])
    const [startInterval, setStartInterval] = useState(false)
    const [showModalInfo, setShowModalInfo] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isError, setIsError] = useState(false)
    const interproResponse = useSelector((data) => data.homeReducer.interpro);    
    const dispatch = useDispatch();
    let backend_url = config['auth']
    let InterProTool = (event) => {
        setInterProFile(event.target.files[0])
        
    };


    const setShowModalFunction = (stateData) => {
        setShowModal(stateData)
      }



    let uploadFile = () => {
        if(interProFile["name"].includes(".fasta")){
            setIsError(false)
            setLoader(true)
            dispatch(interPro("POST", { "file": interProFile, "filename": interProFile["name"] }));
            setMsg('File Uploading, Please Wait......')
        }
        else{
            setIsError(true)
        }

    };

    useEffect(()=>{
        if(startInterval){
            setLoop(setInterval(() => {
                dispatch(interPro("GET", { "container_name": interproResponse['container_name']  }))
            }, 10000));
        }
    },[startInterval])


    useEffect(()=>{
        if(interproResponse){
            console.log('interproResponse',interproResponse);
            if(interproResponse['status']==='running'){
                setLoader(true)
                setStartInterval(true)
                setMsg('File Uploaded, Conversion Started.....')
            }else{
                setLoader(false)
                setStartInterval(false)
                setLoop(interval => {
                    clearInterval(interval);
                    return null;
                });
                let h = []
                h.push(
                    <>
                        <div className='flex flex-row'>
                            <div>
                                Your Results are ready kindly click link to download &nbsp;
                                <a className='text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4'
                                 href={backend_url+"media/Interpro/files/"+interproResponse['container_name']+".tsv"} 
                                 download={interproResponse['container_name']+".tsv"}>{interproResponse['container_name']}</a>
                            </div>
                            {/* <div>
                                <p className='text-blue-400 hover:text-blue-500 transition duration-300 ease-in-out mb-4'>logs</p>
                            </div> */}
                        </div>
                    </>
                )
                setHtml(h)
            }
        }
    },[interproResponse])

    const InforIcon = () => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      }

    return (
        <div>
            <div>
            {showModal && <Modal showModal={showModal} setShowModal={setShowModalFunction}/>}
            </div>
            <div>
                <div className="flex justify-between">
                    <div></div>
                <h1 className="text-center font-medium leading-tight text-5xl mt-4 mb-2 text-black-600 flex justify-center">
                    Interpro
                </h1>
                <div className="flex justify-end xs:pr-9 sm:pr-10 lg:pr-52">
                </div>
              </div>
              
                <div className="py-5">
                    {!loader ?<section className="mt-2 flex flex-col items-center justify-center">
                        <div>
                            <div
                                className="bg-white p-8"
                                style={{
                                    width: "90rem",
                                }}
                            >
                                              <div className="flex flex-row-reverse m-4">
                            <button onClick={() => setShowModal(true)} className="has-tooltip bg-red-500 hover:bg-red-700 text-white text-center py-2 px-4 rounded-full h-14 w-14 inline-flex items-center">
                            <InforIcon />
                            </button>
              </div>
                                <p className="text-md leading-10 text-justify">
                                    <FormattedMessage id="InterproDesc" defaultMessage=" InterPro is a resource that provides functional analysis of protein sequences by classifying them into families and predicting the presence of domains and important sites.
                                    To classify proteins, InterPro uses predictive models called signatures, provided by several collaborating databases that collectively make up the InterPro consortium" />
                                    
                                </p>
                            </div>
                            <div
                                className="bg-white p-8"
                                style={{
                                    width: "90rem",
                                }}
                            >
                                <div className="">
                                    
                                    <div className="hidden">
                                        <label
                                            htmlFor="message"
                                            className=" py-2 block mb-2  text-md text-gray-900 dark:text-gray-400"
                                        >
                                            Sequence, in FASTA format
                                        </label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className=" w-full h-50  block text-md text-gray-900 
                                            bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
                                            focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                            dark:focus:border-blue-500 p-8"
                                            placeholder="Enter your sequence"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <div className="flex ">
                                            <div className="mb-3 w-96">
                                                <label
                                                    htmlFor="FastaFile"
                                                    className="mx-2 my-2 form-label inline-block mb-2 text-gray-700 text-md"
                                                >
                                                    <FormattedMessage id="UploadFile" defaultMessage="Upload File" />
                                                </label>
                                                <input
                                                    className="text-md block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-outm-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
                                                    type="file"
                                                    id="FastaFile"
                                                    onChange={(e)=>InterProTool(e)}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white mt-4 font-bold py-2 px-4 border border-blue-700 rounded"
                                            onClick={uploadFile}
                                        >
                                            <FormattedMessage id="Submit" defaultMessage="Submit" />
                                        </button>
                                    </div>
                                    {isError && <p>Upload only .fasta extension files</p> }
                                </div>
                            </div>
                            <span className='text-base'>
                                Note: protein sequence in .fasta format
                            </span>
                        </div>
                    </section>:
                    <>
                        <LoaderCmp/>
                        <p className='text-center'>
                            {msg}
                        </p>
                    </>
                    }
                </div>
                {html.length>0 && 
                    <section className="mt-2 flex flex-col items-center justify-center">
                        <div>
                            <div className="bg-white p-8" style={{width: "90rem"}}>
                                {html}
                            </div>
                        </div>
                    </section>
                }
            </div>
        </div>
    );
}

export default InterPro;
