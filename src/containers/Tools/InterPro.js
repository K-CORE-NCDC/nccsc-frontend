import React, { useState, useEffect } from "react";

import { interPro } from "../../actions/api_actions";
import { useDispatch } from "react-redux";

function InterPro() {
    const [interproFile, setInterproFile] = useState();
    const dispatch = useDispatch();

    // let extension = '	.fasta, .fna, .ffn, .faa, .frn, .fa'

    let InterProTool = () => {
        let element = document.getElementById("FastaFile");
        setInterproFile(element.files[0]);
    };
    useEffect(() => {
        console.log("interprofile is ----- >>>", interproFile);
    }, [interproFile]);

    let uploadFile = () => {
        dispatch(
            interPro("POST", { file: interproFile, filename: interproFile["name"] })
        );
    };

    return (
        <div>
            <div>
                <h1 className="text-center font-medium leading-tight text-5xl mt-4 mb-2 text-black-600">
                    Interpro
                </h1>
                <div className="py-5">
                    <section className="mt-2 flex flex-col items-center justify-center">
                        <div>
                            <div
                                className="bg-white p-8"
                                style={{
                                    width: "90rem",
                                }}
                            >
                                <div className="">
                                    <div>
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
                                                    or upload file
                                                </label>
                                                <input
                                                    className="text-md block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-outm-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
                                                    type="file"
                                                    id="FastaFile"
                                                    onChange={InterProTool}
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
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default InterPro;
