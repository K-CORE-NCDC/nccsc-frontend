import React, { useState, useEffect } from "react";

import { interPro } from "../../actions/api_actions";
import { useDispatch, useSelector } from "react-redux";
import LoaderCmp from '../Common/Loader'
import config from "../../config";
import { FormattedMessage } from 'react-intl';
import Attachments from '../../assets/files/insulin.fasta'
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";



function Modal({ showModal, setShowModal, body }) {
    return (
        <>
            {showModal ? (
                <>
                    <div className="Toolmodal-container">
                        <div className="Toolmodal-content">
                            {/*content*/}
                            <div className="Toolmodal-dialog">
                                {/*header*/}
                                <div className="Toolmodal-header">
                                    <h3 className="Toolmodal-title">Vcf to Maf Sample File</h3>
                                    <button
                                        className="Toolmodal-close-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        ×
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="Toolmodal-body">
                                    <div className="Toolmodal-text">
                                        <div className='Flex FlexDirRow' style={{ marginTop: "20px", gap: "10px" }}>
                                            <p>Click on the link to download the sample file</p>
                                            <a className="Tooldownload-link" href={Attachments} download>
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="Toolmodal-footer">
                                    <button
                                        className="Toolmodal-close-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Toolmodal-overlay"></div>
                </>
            ) : null}
        </>
    );
}


function InterPro() {
    const [interProFile, setInterProFile] = useState();
    const [loader, setLoader] = useState(false)
    const [msg, setMsg] = useState('')
    const [loop, setLoop] = useState(null)
    const [html, setHtml] = useState([])
    const [startInterval, setStartInterval] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isError, setIsError] = useState(false)
    const interproResponse = useSelector((data) => data.homeReducer.interpro);
    const dispatch = useDispatch();
    let backend_url = config['auth']
    let InterProTool = (event) => {
        setInterProFile(event.target.files[0])

    };
    const title = { id: "Interpro", defaultMessage: "Interpro" }


    const setShowModalFunction = (stateData) => {
        setShowModal(stateData)
    }



    let uploadFile = () => {
        if (interProFile["name"].includes(".fasta")) {
            setIsError(false)
            setLoader(true)
            dispatch(interPro("POST", { "file": interProFile, "filename": interProFile["name"] }));
            setMsg('File Uploading, Please Wait......')
        }
        else {
            setIsError(true)
        }

    };

    useEffect(() => {
        if (startInterval) {
            setLoop(setInterval(() => {
                dispatch(interPro("GET", { "container_name": interproResponse['container_name'] }))
            }, 10000));
        }
    }, [startInterval])


    useEffect(() => {
        if (interproResponse) {
            if (interproResponse['status'] === 'running') {
                setLoader(true)
                setStartInterval(true)
                setMsg('File Uploaded, Conversion Started.....')
            } else {
                setLoader(false)
                setStartInterval(false)
                setLoop(interval => {
                    clearInterval(interval);
                    return null;
                });
                let h = []
                h.push(
                    <>

                        <div className="Flex FlexDirRow">
                            <p>Your Results are ready kindly click link to download &nbsp;</p>
                            <a className='ToolResultsReady'
                                href={backend_url + "media/Interpro/files/" + interproResponse['container_name'] + ".tsv"}
                                download={interproResponse['container_name'] + ".tsv"}>{interproResponse['container_name']}</a>
                        </div>
                    </>
                )
                setHtml(h)
            }
        }
    }, [interproResponse])

    const InforIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "2.5rem", height: "2.5rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    }


    const breadCrumbs = {
        '/interpro/': [
            { id: 'Home', defaultMessage: 'Home', to: '/' },
            { id: 'Tools', defaultMessage: 'Tools', to: '/tools/' },
            { id: 'Interpro', defaultMessage: 'Interpro', to: '/interpro/' }
        ],
    };

    return (
        <div>
            <HeaderComponent
                title={title}
                breadCrumbs={breadCrumbs['/interpro/']}
                type="single"
            />
            <article id="subContents" className="subContents">
                <div className="contentsTitle">
                    <div className="auto">
                        <h3 className="colorSecondary">
                            <span className="colorPrimary">Inter</span>
                            pro
                        </h3>
                    </div>
                </div>
                <div className="ptn">
                    <div className="auto">

                        <div>
                            {showModal && <Modal showModal={showModal} setShowModal={setShowModalFunction} />}
                        </div>
                        <div className="Tool formBox" style={{paddingTop:"0px"}}>
                            <div className="PY5">
                                {!loader ? <section className="Section">
                                    <div>
                                        <div>
                                            <div className="BG">
                                                <div className="ModalBtn" style={{ marginBottom: "20px" }}>
                                                    <button onClick={() => setShowModal(true)} className="ToolModalBtn">
                                                        <InforIcon />
                                                    </button>
                                                </div>
                                            </div>
                                            <div style={{marginBottom:"40px"}}>
                                            <p style={{ lineHeight: "2.5rem", textAlign: "justify" }}>
                                                <FormattedMessage id="InterproDesc1" defaultMessage=" InterPro is a resource that provides functional analysis of protein sequences by classifying them into families and predicting the presence of domains and important sites." /></p>
                                            <p style={{ lineHeight: "2.5rem", textAlign: "justify" }}><FormattedMessage id="InterproDesc2" defaultMessage="To classify proteins, InterPro uses predictive models called signatures, provided by several collaborating databases that collectively make up the InterPro consortium" /></p>
                                            </div>
                                        </div>
                                        <div className="Flex FlexDirCol ItemsCenter" style={{ gap: "10px" }}>
                                            <div>
                                                <dl>
                                                    <dt>
                                                        <FormattedMessage id="UploadFile" defaultMessage="Sequence, in FASTA format" />
                                                    </dt>
                                                    <dd>
                                                        <div className="">
                                                            <textarea type="file" className="w100"
                                                                id="message"
                                                                rows="4"
                                                                placeholder="Enter yout sequence" autoComplete="off" style={{ padding: "10px" }} />
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div>
                                                <dl>
                                                    <dt>
                                                        <FormattedMessage id="UploadFile" defaultMessage="Upload File" />
                                                    </dt>
                                                    <dd>
                                                        <div className="inputText">
                                                            <input type="file" className="w100" accept=".fasta, .fna, .ffn, .faa, .frn, .fa"
                                                                id="FastaFile"
                                                                onChange={(e) => InterProTool(e)} placeholder="Please Select the File" autoComplete="off" style={{ padding: "10px" }} />
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div>
                                                <button
                                                    className='btn btnPrimary SubmitButton' onClick={uploadFile}>
                                                    <FormattedMessage id="Submit" defaultMessage="Submit" />
                                                </button>
                                            </div>
                                            {isError && <p>Upload only .fasta extension files</p>}
                                        </div>
                                        <span style={{ fontSize: "1rem", lineHeight: "1.5rem", justifyContent: "center", marginTop: "40px" }} className='Flex'>
                                            Note: protein sequence in .fasta format
                                        </span>
                                    </div>
                                </section> :
                                    <>
                                        <LoaderCmp />
                                        <p className='MultiUploadTextCenter'>
                                            {msg}
                                        </p>
                                    </>
                                }
                            </div>
                            {html.length > 0 &&
                                <section className="VCFHtml">
                                    <div>
                                        <div>
                                            {html}
                                        </div>
                                    </div>
                                </section>
                            }
                        </div>

                    </div>
                </div>
            </article>
        </div>
    );
}

export default InterPro;
