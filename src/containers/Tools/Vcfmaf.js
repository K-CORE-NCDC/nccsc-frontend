import React, {useState,useEffect} from 'react'

import {
    vcfmaf
  } from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";


function Vcfmaf() {
    const[vcfMafFile, setVcfMafFile]=useState()
    const dispatch = useDispatch();



    // let extension = '	.fasta, .fna, .ffn, .faa, .frn, .fa'

    let VcfMafTool = ()=>{
        let element = document.getElementById('VcfMafFile')
        console.log('element ', element);
        console.log('element file is ---->', element.value);
        console.log('element file is ---->', element.files);
        console.log('element file is ---->', element.files[0]);
        setVcfMafFile(element.files[0])
    }
    useEffect(()=>{
       console.log("interprofile is ----- >>>", vcfMafFile);
    },[vcfMafFile])

    let uploadFile = ()=>{
        console.log("dispatch done");
        dispatch(vcfmaf("POST", { "file": vcfMafFile, "filename":vcfMafFile['name']}))
    }



    return (
        <div>
            {/* <div className='grid place-items-center' style={{ width: '200px', border: '12px solid red' }}>
                <h1>InterPro</h1>
                <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Input V2F</label>
                    <textarea id="message" rows="4" className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your sequence"></textarea>
                </div>
            </div> */}





            <div>
                <h1 className='text-center font-medium leading-tight text-5xl mt-4 mb-2 text-black-600'>VcfMaf</h1>
                <div className="py-5">
                    <section className="mt-2 flex flex-col items-center justify-center">
                        <div>
                            <div className="bg-white"
                                style={{
                                    width: "90rem",
                                    background: "1px solid red"
                                }}
                            >
                                <div className="">
                                    <div>
                                        <label htmlFor="message" className=" py-2 block mb-2  font-medium text-gray-900 dark:text-gray-400">VcfMaf</label>
                                        <textarea id="message" rows="4" className=" w-full h-  block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your sequence"></textarea>
                                    </div>
                                    <div>
                                        <div className="flex ">
                                            <div className="mb-3 w-96">
                                                <label htmlFor="VcfMafFile" className="mx-2 my-2 form-label inline-block mb-2 text-gray-700">or upload file</label>
                                                <input className="block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-outm-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" accept=".vcf, .maf" type="file" id="VcfMafFile"  onChange={VcfMafTool}/>
                                            </div>
                                        </div>
                                        <button
                                            className='bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-16 sm:h-16 xs:text-sm sm:text-xl lg:text-2xl text-white mt-4 font-bold py-2 px-4 border border-blue-700 rounded' onClick={uploadFile}>
                                            Submit
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Vcfmaf