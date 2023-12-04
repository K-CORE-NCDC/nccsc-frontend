import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { refverconverter, clearToolsData } from '../../actions/api_actions';
import Attachments from '../../assets/files/vcftest19to38.vcf';
import AttachmentsImage from '../../assets/images/refver2.png';
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
                                    <h3 className="Toolmodal-title">VCF Sample File</h3>
                                    <button className="Toolmodal-close-btn" onClick={() => setShowModal(false)}>
                                        ×
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="Toolmodal-body">
                                    <div className="Toolmodal-text">
                                        <ul style={{ margin: '10px' }}>
                                            <li>
                                                RefVer converter는 VCF 파일의 참조 유전체 버전 GRCh37(hg19) 과 버전 GRCh38(hg38) 간의 양방향 변환 기능을 지원합니다.
                                            </li>
                                            <li>
                                                게놈 버전 hg19 VCF 파일을 입력하면 게놈 버전 hg38 VCF 파일로 변환합니다.
                                            </li>
                                            <li>
                                                게놈 버전 hg38 VCF 파일을 입력하면 게놈 버전 hg19 VCF 파일로 변환합니다.
                                            </li>
                                        </ul>
                                        <img src={AttachmentsImage} alt="ExampleFileImage" />
                                        <div className='MarginTop2'>
                                            <ul style={{ listStyle: 'disc', margin: '18px' }}>
                                                <li>본 분석도구는 CrossMap(https://doi.org/10.1093/bioinformatics/btt730) 에 의존적이며, 버전 변환 시 일부 소실되는 변이 항목이 있을 수 있음.</li>
                                                <li>입력 파일의 게놈 버전을 잘못 선택할 시 부정확한 결과를 얻을 수 있음</li>
                                            </ul>
                                        </div>
                                        <div className="Flex FlexDirRow" style={{ marginTop: '20px', gap: '10px' }}>
                                            <a className="Tooldownload-link" href={Attachments} download>
                                            <FormattedMessage  id='DownloadFileRefVer' defaultMessage="Click on the link to download the sample file (hg19 VCF)"/>
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

function RefVerConverter() {
    const fileInputRef = useRef(null);
    const [refVerConverterFiles, setRefVerConverterFiles] = useState({});
    const [loader, setLoader] = useState(false);
    const [msg, setMsg] = useState({});
    const [html, setHtml] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const refVerConverterResponse = useSelector((data) => data.homeReducer.refverconverter);
    const title = { id: 'MyDataVisualization', defaultMessage: 'Visualize My Data' };
    const history = useHistory();

    const [hg19, sethg19] = useState(true);
    const [hg38, sethg38] = useState(false);

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

    let handleFileChange = (e) => {
        const newFileName = e.target.files[0].name;
        setRefVerConverterFiles(() => ({
            [newFileName]: {
                file: e.target.files[0],
                fileName: newFileName
            }
        }));
    }


    const handleHg19Change = () => {
        sethg19(true);
        sethg38(false);
    };

    const handleHg38Change = () => {
        sethg19(false);
        sethg38(true);
    };

    const handleFileRemove = (fileName) => {

        setRefVerConverterFiles((prevFormData) => {
            const updatedFormData = { ...prevFormData };
            delete updatedFormData[fileName];
            return updatedFormData;
        });


        fileInputRef.current.value = "";
    };

    let uploadFile = () => {
        // Check if all files in the object have the ".maf" extension
        const areAllFilesVcf = Object.keys(refVerConverterFiles).every(file => file.endsWith('.vcf'));

        if (areAllFilesVcf) {
            setIsError(false);
            setLoader(true);
            setHtml([])
            dispatch(refverconverter('POST', { refVerConverterFiles: refVerConverterFiles, hg19: hg19, hg38: hg38 }));
            setMsg({ id: 'FileUplodPlsWait', defaultMessage: 'File Uploading, Please Wait......' });
        } else {
            setIsError(true);
            setMsg({ id: 'RefverInvalid', defaultMessage: 'Invalid file format. Please select VCF files only.' });
        }
    };


    useEffect(() => {
        if (startInterval) {
            setLoop(setInterval(() => {
                dispatch(refverconverter("GET", { "container_name": refVerConverterResponse['container_name'] }))
            }, 10000));
        }
    }, [startInterval])

    useEffect(() => {
        if (refVerConverterResponse) {
            if (refVerConverterResponse['status'] === 'running') {
                setLoader(true);
                setStartInterval(true)
                setMsg({ id: 'RefverConversion', defaultMessage: 'File Uploaded, Conversion Started.....' });
            } else {
                let Conversion = ''
                const logLines = refVerConverterResponse['msg']?.split('\r\n');
                logLines.forEach(line => {
                    if (line.includes('Reference conversion')) {
                        // Extract the container ID value
                        Conversion = line.split('->')[1].trim();
                    }

                    // You can add similar logic for other information you want to extract
                });
                setLoader(false);
                setStartInterval(false)
                setLoop(interval => {
                    clearInterval(interval);
                    return null;
                });
                setRefVerConverterFiles({})
                let h = [];
                h.push(
                    <>
                        <div className="Flex FlexDirRow">
                            <span
                                style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }}
                                className="Flex"
                            >
                                <FormattedMessage id='RefverResult1' defaultMessage='Your Results are Ready here.' />
                                <a
                                    className="ToolResultsReady"
                                    href={
                                        backend_url +
                                        'media/RefVerConverter/output/' +
                                        'outputfile' + refVerConverterResponse['container_name'] + '.vcf'
                                    }
                                    download={`${refVerConverterResponse['container_name']}.vcf`}
                                >
                                    {` (${refVerConverterResponse['container_name']}) `}
                                </a>
                                <FormattedMessage id='RefverResult2' defaultMessage='Click on the Link to download' />
                            </span>
                        </div>
                    </>
                );
                setHtml(h);
            }
        }
    }, [refVerConverterResponse]);

    useEffect(() => {
        return () => {
            dispatch(clearToolsData());
        };
    }, []);

    const breadCrumbs = {
        '/refverconverter/': [
            { id: 'Home', defaultMessage: 'Home', to: '/' },
            { id: 'MyDataVisualization', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
            { id: 'Tools', defaultMessage: 'Other Tools', to: '/tools/' },
            { id: 'REFVERCONVERTER', defaultMessage: 'RefVer Converter', to: '/refverconverter/' }
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
            <HeaderComponent title={title} breadCrumbs={breadCrumbs['/refverconverter/']} type="single" />
            <article id="subContents" className="subContents">
                <div className="contentsTitle">
                    <div className="auto">
                        <h3 className="colorSecondary">
                            <span className="colorPrimary">RefVer </span>Converter
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
                                                                <div className="inputText">
                                                                    <input
                                                                        type="file"
                                                                        className="w100"
                                                                        accept=".vcf, "
                                                                        id="VCFFiles"
                                                                        onChange={(e) => handleFileChange(e)}
                                                                        autoComplete="off"
                                                                        style={{ padding: '10px' }}
                                                                        ref={fileInputRef}
                                                                    />
                                                                </div>
                                                            </dd>
                                                        </dl>
                                                        <div style={{ marginTop: '20px' }}>
                                                            <dl>
                                                                <dt>
                                                                    <FormattedMessage id='SelectConversion' defaultMessage='Genome Version' />
                                                                </dt>
                                                                <div>
                                                                    <label htmlFor="hg19">GRCh37 (hg19) </label>
                                                                    <input
                                                                        type="checkbox"
                                                                        id="hg19"
                                                                        checked={hg19}
                                                                        onChange={handleHg19Change}
                                                                    />

                                                                    <label htmlFor="hg38">GRCh38 (hg38) </label>
                                                                    <input
                                                                        type="checkbox"
                                                                        id="hg38"
                                                                        checked={hg38}
                                                                        onChange={handleHg38Change}
                                                                    />
                                                                </div>
                                                            </dl>
                                                        </div>
                                                        <div>
                                                            {Object.keys(refVerConverterFiles)?.map((filename, index) => (
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
                                                                        {filename} - {formatFileSize(refVerConverterFiles[filename].file.size)}
                                                                    </div>
                                                                    <button onClick={() => handleFileRemove(filename)}>X</button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <button className="btn btnPrimary SubmitButton" onClick={uploadFile}>
                                                            <FormattedMessage id="Submit" defaultMessage="Submit" />
                                                        </button>
                                                    </div>

                                                    {isError && <p>Upload only .vcf extension files</p>}
                                                </div>
                                            </div>
                                            <span
                                                style={{ fontSize: '1rem', lineHeight: '1.5rem', justifyContent: 'center' }}
                                                className="Flex"
                                            >
                                                <FormattedMessage
                                                    id="REFVERCONVERTERNote"
                                                    defaultMessage="Note: Bidirectional conversion functionality is supported for VCF files between GRCh37 (hg19) and GRCh38 (hg38) versions."
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
                                <section className="REFVERConverterHtml">
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

export default RefVerConverter;
