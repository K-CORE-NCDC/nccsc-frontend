import React, { useState, useEffect } from 'react'

import {
    vcfmaf
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";
import LoaderCmp from '../Common/Loader'

function Vcfmaf() {
    const [vcfMafFile, setVcfMafFile] = useState()
    const [loader, setLoader] = useState(false)
    const [startInterval, setStartInterval] = useState(false)
    const [msg, setMsg] = useState('')
    const [loop,setLoop] = useState(null)
    const [html, setHtml] = useState([])
    const dispatch = useDispatch();
    const vcf2mafResponse = useSelector((data) => data.homeReducer.vcfmaf);    
    

    let VcfMafTool = (event) => {
        setVcfMafFile(event.target.files[0])
    }
    

    let uploadFile = () => {
        setLoader(true)
        dispatch(vcfmaf("POST", { "file": vcfMafFile, "filename": vcfMafFile['name'] }))
        setMsg('File Uploading, Please Wait......')
    }

    useEffect(()=>{
        if(startInterval){
            setLoop(setInterval(() => {
                dispatch(vcfmaf("GET", { "container_name": vcf2mafResponse['container_name']  }))
            }, 10000));
        }
    },[startInterval])

    
    
    useEffect(()=>{
        if(vcf2mafResponse){
            if(vcf2mafResponse['status']==='running'){
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
                                 href={"http://3.141.3.176:9798/media/VcfMap/files/"+vcf2mafResponse['container_name']+".maf"} 
                                 download={vcf2mafResponse['container_name']+".maf"}>{vcf2mafResponse['container_name']}</a>
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
    },[vcf2mafResponse])



    return (
        <div>
            <div>
                <h1 className='text-center font-medium leading-tight text-5xl mt-4 mb-2 text-black-600'>Vcf to Maf</h1>
                <div className="py-5">
                {!loader ? <section className="mt-2 flex flex-col items-center justify-center">
                        <div>
                            <div className="bg-white p-8"
                                style={{
                                    width: "90rem"
                                }}
                            >
                                <div className="">
                                    <div>
                                        <div className="flex ">
                                            <div className="mb-3 w-96">
                                                <label htmlFor="VcfMafFile" className="text-md mx-2 my-2 form-label inline-block mb-2 text-gray-700">Upload file</label>
                                                <input className="form-control
                                                    block
                                                    w-full
                                                    px-3
                                                    py-1.5
                                                    text-md
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                                    accept=".vcf, " type="file" id="VcfMafFile" onChange={(e)=>VcfMafTool(e)} />
                                                    
                                            </div>
                                        </div>
                                        <button
                                            className='bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white mt-4 font-bold py-2 px-4 border border-blue-700 rounded' onClick={uploadFile}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <span className='text-base'>
                                Note: only .vcf file accepted and files which are generated using genome version hg38
                            </span>
                        </div>
                    </section>
                    :<>
                        <LoaderCmp/>
                        <p className='text-center'>
                            {msg}
                        </p>
                    </>}
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
    )
}

export default Vcfmaf