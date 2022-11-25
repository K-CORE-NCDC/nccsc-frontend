import React, { useState, useEffect } from "react";

import { interPro } from "../../actions/api_actions";
import { useDispatch,useSelector } from "react-redux";
import LoaderCmp from '../Common/Loader'
import config from "../../config";

function InterPro() {
    const [interProFile, setInterProFile] = useState();
    const [loader, setLoader] = useState(false)
    const [msg, setMsg] = useState('')
    const [loop,setLoop] = useState(null)
    const [html, setHtml] = useState([])
    const [startInterval, setStartInterval] = useState(false)
    const interproResponse = useSelector((data) => data.homeReducer.interpro);    
    const dispatch = useDispatch();
    let backend_url = config['auth']
    let InterProTool = (event) => {
        setInterProFile(event.target.files[0])
        
    };

    let uploadFile = () => {
        setLoader(true)
        console.log(interProFile)
        dispatch(interPro("POST", { "file": interProFile, "filename": interProFile["name"] }));
        setMsg('File Uploading, Please Wait......')
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

    return (
        <div>
            <div>
                <h1 className="text-center font-medium leading-tight text-5xl mt-4 mb-2 text-black-600">
                    Interpro
                </h1>
                <div className="py-5">
                    {!loader ?<section className="mt-2 flex flex-col items-center justify-center">
                        <div>
                            <div
                                className="bg-white p-8"
                                style={{
                                    width: "90rem",
                                }}
                            >
                                <p className="text-md leading-10 text-justify">
                                    InterPro is a resource that provides functional analysis of protein sequences by classifying them into families and predicting the presence of domains and important sites.
                                    To classify proteins, InterPro uses predictive models called signatures, provided by several collaborating databases that collectively make up the InterPro consortium
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
                                                    Upload file
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
                                            Submit
                                        </button>
                                    </div>
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
