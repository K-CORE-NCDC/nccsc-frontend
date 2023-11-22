import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { mafmerger, clearToolsData } from '../../actions/api_actions';
import Attachment1 from '../../assets/files/YBC_1.maf';
import Attachment2 from '../../assets/files/YBC_2.maf';
import AttachmentsImage from '../../assets/images/mafmerger.png';
import config from '../../config';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import LoaderCmp from '../Common/Loader';
import { useHistory } from 'react-router-dom';

function Modal({ showModal, setShowModal }) {
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
                                    <h3 className="Toolmodal-title">Maf Sample File</h3>
                                    <button className="Toolmodal-close-btn" onClick={() => setShowModal(false)}>
                                        ×
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="Toolmodal-body">
                                    <div className="Toolmodal-text">
                                        <ul style={{ margin: '10px' }}>
                                            <li>
                                                여러 개의 MAF 파일을 1개의 파일로 병합하는 도구입니다.
                                            </li>
                                            <li>
                                                입력하는 MAF 파일 이름은 샘플 이름이어야 하며, 공백은 없어야 합니다.
                                            </li>
                                        </ul>
                                        <img src={AttachmentsImage} alt="ExampleFileImage" />
                                        <div className="Flex FlexDirRow" style={{ marginTop: '20px', gap: '10px' }}>
                                            <p>Click on the link to download the sample files</p>
                                            <a className="Tooldownload-link" href={Attachment1} download>
                                                Download File 1
                                            </a>
                                            <a className="Tooldownload-link" href={Attachment2} download>
                                                Download File 2
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="Toolmodal-footer">
                                    <button className="Toolmodal-close-btn" onClick={() => setShowModal(false)}>
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

function MAFMerger() {
    const [mafMergerFiles, setMafMergerFiles] = useState({});
    const [mafMergerFilesName, setMafMergerFilesName] = useState([]);
    const [loader, setLoader] = useState(false);
    const [msg, setMsg] = useState('');
    const [html, setHtml] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const mafMergerResponse = useSelector((data) => data.homeReducer.mafmerger);
    const title = { id: 'MyDataVisualization', defaultMessage: 'Visualize My Data' };
    const history = useHistory();

    const setShowModalFunction = (stateData) => {
        setShowModal(stateData);
    };
    const [startInterval, setStartInterval] = useState(false)
    const [loop, setLoop] = useState(null)
    const InforIcon = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '2.5rem', height: '2.5rem' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
            </svg>
        );
    };

    let backend_url = config['auth'];
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);

        if (newFiles.length + Object.keys(mafMergerFiles).length > 5) {
            alert("You can upload a maximum of 5 files at once.");
            return;
        }

        let totalSize = 0;

        // Calculate the total size of already selected files
        for (const fileKey in mafMergerFiles) {
            totalSize += mafMergerFiles[fileKey].file.size;
        }

        // Calculate the total size of the new files
        let newFilesSize = 0;
        for (let i = 0; i < newFiles.length; i++) {
            newFilesSize += newFiles[i].size;
        }

        // Check if the total number of files does not exceed 5 and the total size is less than or equal to 500MB
        if (newFiles.length + Object.keys(mafMergerFiles).length <= 5 && totalSize + newFilesSize <= 500 * 1024 * 1024) {
            const newFormData = { ...mafMergerFiles };

            for (let i = 0; i < newFiles.length; i++) {
                const newFile = newFiles[i];
                const newFileName = newFile.name;
                newFormData[newFileName] = {
                    file: newFile,
                    fileName: newFileName,
                };
            }

            setMafMergerFiles(newFormData);

            const newFileNames = newFiles.map((file) => file.name);
            setMafMergerFilesName([...mafMergerFilesName, ...newFileNames]);
        } else if (totalSize + newFilesSize > 500 * 1024 * 1024) {
            alert("The total file size should not exceed 500MB.");
        } else {
            alert("Maximum 5 files are allowed.");
        }
    };

    const handleFileRemove = (fileName) => {
        setMafMergerFiles((prevFormData) => {
            const updatedFormData = { ...prevFormData };
            delete updatedFormData[fileName];
            return updatedFormData;
        });

        const updatedFileNames = mafMergerFilesName.filter((name) => name !== fileName);

        setMafMergerFilesName(updatedFileNames);
    };



    let uploadFile = () => {
        // Check if all files in the object have the ".maf" extension
        const areAllFilesMaf = Object.keys(mafMergerFiles).every(file => file.endsWith('.maf'));

        if (areAllFilesMaf && Object.keys(mafMergerFiles)?.length > 0) {
            setIsError(false);
            setLoader(true);
            setHtml([])
            dispatch(mafmerger('POST', mafMergerFiles));
            setMsg({ id: 'FileUplodPlsWait', defaultMessage: 'File Uploading, Please Wait......' });
        } else {
            setIsError(true);
            setMsg({ id: 'MAFMergerInvalid', defaultMessage: 'Invalid file format. Please select MAF files only.' });

        }
    };

    useEffect(() => {
        if (startInterval) {
            setLoop(setInterval(() => {
                dispatch(mafmerger("GET", { "container_name": mafMergerResponse['container_name'] }))
            }, 10000));
        }
    }, [startInterval])

    useEffect(() => {
        if (mafMergerResponse) {
            if (mafMergerResponse['status'] === 'running') {
                setLoader(true);
                setStartInterval(true)
                setMsg({ id: 'MAFMergerConversion', defaultMessage: 'File Uploaded, Conversion Started.....' });
            } else {
                setLoader(false);
                setStartInterval(false)
                setLoop(interval => {
                    clearInterval(interval);
                    return null;
                });
                setMafMergerFiles({})
                setMafMergerFilesName([])
                let h = [];
                h.push(
                    <>
                        <span style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }} className="Flex">
                            <div className="" key={0}>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormattedMessage id='MAFMergerResult1' defaultMessage='Your results are ready.' />
                                </div>
                                <div className='Flex FlexDirCol' style={{ marginBottom: '20px' }}>
                                    <div>
                                        <FormattedMessage id='MAFMergerResult2' defaultMessage='Click to download merged TSV : ' />
                                        <a
                                            className="ToolResultsReady"
                                            href={
                                                backend_url + mafMergerResponse['user_project_directory'] + mafMergerResponse['container_name'] + '.tsv'
                                            }
                                            download={mafMergerResponse['container_name'] + '.tsv'}
                                        >
                                            {mafMergerResponse['container_name'] + '.tsv'}
                                        </a>
                                    </div>
                                    <div>
                                        <FormattedMessage id='MAFMergerResult3' defaultMessage='* You can use merged TSV as DNA mutation input in visualization services.' />
                                    </div>
                                </div>

                                <div className='Flex FlexDirRow'>
                                    <div>
                                        <FormattedMessage id='MAFMergerResult4' defaultMessage='Click to download merged MAF : ' />
                                        <a
                                            className="ToolResultsReady"
                                            href={
                                                backend_url + mafMergerResponse['user_project_directory'] + mafMergerResponse['container_name'] + '.maf'
                                            }
                                            download={mafMergerResponse['container_name'] + '.maf'}
                                        >
                                            {mafMergerResponse['container_name'] + '.maf'}
                                        </a>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        </span>
                    </>
                );
                setHtml(h);
            }
        }
    }, [mafMergerResponse]);

    useEffect(() => {
        return () => {
            dispatch(clearToolsData());
        };
    }, []);

    const breadCrumbs = {
        '/mafmerger/': [
            { id: 'Home', defaultMessage: 'Home', to: '/' },
            { id: 'MyDataVisualization', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
            { id: 'Tools', defaultMessage: 'Other Tools', to: '/tools/' },
            { id: 'MAFMerger', defaultMessage: 'MAF Merger', to: '/mafmerger/' }
        ]
    };

    // Function to format file size in a user-friendly way
    function formatFileSize(size) {
        if (size < 1024) {
            return size + " B";
        } else if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + " KB";
        } else {
            return (size / (1024 * 1024)).toFixed(2) + " MB";
        }
    }

    return (
        <div>
            <HeaderComponent title={title} breadCrumbs={breadCrumbs['/mafmerger/']} type="single" />
            <article id="subContents" className="subContents">
                <div className="contentsTitle">
                    <div className="auto">
                        <h3 className="colorSecondary">
                            <span className="colorPrimary">MAF </span>Merger
                        </h3>
                    </div>
                </div>
                <div className="ptn">
                    <div className="auto">
                        <div>
                            {showModal && <Modal showModal={showModal} setShowModal={setShowModalFunction} />}
                        </div>

                        <div className="Tool formBox" style={{ paddingTop: '0px' }}>
                            <div className="PY5">
                                {!loader ? (
                                    <section className="Section">
                                        <div>
                                            <div className="BG">
                                                <div className="ModalBtn" style={{ marginBottom: '20px' }}>
                                                    <button onClick={() => setShowModal(true)} className="ToolModalBtn">
                                                        <InforIcon />
                                                    </button>
                                                </div>
                                                <div>
                                                    <div>
                                                        <dl>
                                                            <dt>
                                                                <FormattedMessage id="UploadFile" defaultMessage="Upload File" />
                                                            </dt>
                                                            <dd>
                                                                <div className="inputText flex">
                                                                    <input
                                                                        type="file"
                                                                        className="w100 maf-merger-file-input"
                                                                        accept=".maf, "
                                                                        id="MAFFiles"
                                                                        multiple
                                                                        onChange={(e) => handleFileChange(e)}
                                                                        autoComplete="off"
                                                                        style={{ padding: '10px' }}
                                                                    />
                                                                    <label className='maf-merger-label' htmlFor="MAFFiles">
                                                                        <FormattedMessage id='SelectMultipleFiles' defaultMessage='Select Multiple Files' />
                                                                    </label>
                                                                    <p style={{ marginTop: '10px' }}>
                                                                        {mafMergerFilesName?.length > 0 ? mafMergerFilesName?.length : ""}
                                                                    </p>

                                                                </div>
                                                            </dd>
                                                        </dl>

                                                        <div>
                                                            {Object.keys(mafMergerFiles)?.map((filename, index) => (
                                                                <div
                                                                    key={filename}
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                        padding: '10px',
                                                                        border: '1px solid #ccc',
                                                                        margin: '5px 0',
                                                                    }}
                                                                >
                                                                    <div>
                                                                        {filename} - {formatFileSize(mafMergerFiles[filename].file.size)}
                                                                    </div>
                                                                    <button onClick={() => handleFileRemove(filename)}>X</button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <button className="btn btnPrimary SubmitButton" onClick={uploadFile}>
                                                            <FormattedMessage id="Submit" defaultMessage="Submit" />
                                                        </button>
                                                    </div>

                                                    {isError && <p>Upload only .maf extension files</p>}
                                                </div>
                                            </div>
                                            <span
                                                style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }}
                                                className="Flex"
                                            >
                                                <FormattedMessage
                                                    id="MAFMergerNote"
                                                    defaultMessage="Note: The MAF file name you input should be the sample name and should not contain any spaces."
                                                />
                                            </span>
                                        </div>
                                    </section>
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                                            <LoaderCmp />
                                            <p className="MultiUploadTextCenter">
                                                <FormattedMessage id={msg?.id} defaultMessage={msg?.defaultMessage} />
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                            {html.length > 0 && (
                                <section className="MAFMergerHtml">
                                    <div>
                                        <div>{html}</div>
                                    </div>
                                </section>
                            )}
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            <button
                                id="BackButton"
                                className="btn btnPrimary"
                                style={{ float: 'right', margin: '10px 0px 10px 0px' }}
                                onClick={() => history.push(`/tools/`)}
                            >
                                <FormattedMessage id="Back" defaultMessage="Back" />
                            </button>
                        </div>

                    </div>
                </div>
            </article>
        </div>
    );
}

export default MAFMerger;
