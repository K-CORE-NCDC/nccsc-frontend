import React, { useEffect, useState } from "react";
import { multiFileUpload, clearMultiFIleUploadState } from "../../../actions/api_actions";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import Swal from 'sweetalert2';
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";

function Modal({ showModal, toggleModal, fileName }) {
  let fileNameImage = require(`../../../assets/images/FileScreenshots/${fileName}.png`).default
  let fileNameFile = require(`../../../assets/files/20_samples/${fileName}.tsv`).default
  return (
    <>
      {showModal ? (
        <>
          <div className="Toolmodal-container">
            <div className="Toolmodal-content" style={{maxWidth:"60vw"}}>
              {/*content*/}
              <div className="Toolmodal-dialog">
                {/*header*/}
                <div className="Toolmodal-header">
                  <h3 className="Toolmodal-title">Sample File Download</h3>
                  <button
                    className="Toolmodal-close-btn"
                    onClick={() => toggleModal(false, '')}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <ul style={{ margin: "10px" }}>
                      <li>{`This is a Sample Example File for ${fileName}`}</li>
                    </ul>
                    <img src={fileNameImage} alt="ExampleFileImage" />
                    <div className='Flex FlexDirRow' style={{ marginTop: "20px", gap: "10px" }}>

                      <p>Click on the link to download the sample file</p>
                      <a className="Tooldownload-link" href={fileNameFile} download>
                      Download
                    </a> 
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="Toolmodal-footer">
                  <button
                    className="Toolmodal-close-btn"
                    onClick={() => toggleModal(false, '')}
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
const Table = ({ updateComponentNumber }) => {
  const [filesData, setFilesData] = useState({});
  const [projectName, setProjectName] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [fileName, setFileName] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearMultiFIleUploadState())
  }, [])

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    setFilesData((prevFormData) => ({
      ...prevFormData,
      [type]: {
        file: selectedFile,
        type: type,
      },
    }));
  };


  const handleInputChange = (event) => {
    setProjectName(event.target.value)
  };

  const handleClearFile = (name) => {
    setFilesData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      delete updatedFormData[name];
      return updatedFormData;
    });
  };

  const handleUpload = () => {
    console.log(projectName);
    if (filesData["clinical_information"] && projectName !== '') {
      dispatch(multiFileUpload(filesData, projectName));
      updateComponentNumber(1);
    } else if (projectName === '') {
      Swal.fire({
        title: 'Warning',
        text: "Enter Project Name",
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
        }
      })
    }
    else if (!filesData["clinical_information"]) {
      Swal.fire({
        title: 'Warning',
        text: "Upload Clinical Information.",
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
        }
      })
    }
  };

  const handleReset = () => {
    setFilesData({});
    setProjectName('');
    if (document.getElementById('projectName')) {
      document.getElementById('projectName').value = ''
    }
    dispatch(clearMultiFIleUploadState())

  };

  let toggleModal = (status,file) => {
    setShowModal(status)
    setFileName(file)
  }

  const title = { id: "MultiDataVisualization", defaultMessage: "Multi Data Visualization" }

  const breadCrumbs = {
    '/newmultidataproject/': [
      { id: 'FindID', defaultMessage: 'Home', to: '/' },
      { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization', to: '/multidatavisualization/' },
      { id: 'MultiDataUpload', defaultMessage: 'Multi Data Upload', to: '/newmultidataproject/' },
    ]
  }

  const InforIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "1.5rem", height: "1.5rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }

  return (

    <div>
      <HeaderComponent
        title={title}
        routeName="/newmultidataproject/"
        breadCrumbs={breadCrumbs['/newmultidataproject/']}
        type="single"

      />
      <article id="subContents" className="subContents">
        <div>
          {showModal && <Modal showModal={showModal} toggleModal={toggleModal} fileName={fileName} />}
        </div>
        <div className="contentsTitle" style={{ margin: "0px" }}>
          <h3>
            <font>
              <font><FormattedMessage id="MultiData" defaultMessage="Multi Data" /></font>
              <span className="colorSecondary">
                <font><FormattedMessage id="Upload" defaultMessage="Upload" /> </font>
              </span>
            </font>
          </h3>
        </div>
        <div className="MultiUploadFlex">
          <div className="MultiUploadContainer">
            <div className="MultiUploadFlex1">
              <label htmlFor="projectName" className="MultiUploadProjectNameLabel">
                Project Name:
              </label>
              <div className="MultiUploadProjectName">
                <input
                  type="text"
                  id="projectName"
                  name="project_name"
                  value={projectName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <table className="MultiUploadTableHead">
              <tbody>
                <tr className="MultiUploadBGGray">
                  <td className="MultiUploadTDHeader MultiUploadTextCenter" colSpan="2">
                    Clinical Information file <span style={{ color: "red" }}> (Required) </span>
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208" style={{ width: '31vw' }}>
                    <div className="Flex JustifySpaceBetween">
                      <span>Clinical Information</span>
                      <button onClick={() => toggleModal(true,'ClinicalInformation')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["clinical_information"] ? (
                      <>
                        <span>{filesData["clinical_information"] && filesData["clinical_information"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("clinical_information")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "clinical_information")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="MultiUploadTableHead">
              <tbody>
                <tr className="MultiUploadBGYellow">
                  <td className="MultiUploadTDHeader MultiUploadTextCenter" colSpan="2">
                    DNA File
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208">
                    <div className="Flex JustifySpaceBetween">
                      <span>DNA Mutation</span>
                      <button onClick={() => toggleModal(true,'DnaMutation')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["dna_mutation"] ? (
                      <>
                        <span>{filesData["dna_mutation"] && filesData["dna_mutation"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("dna_mutation")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "dna_mutation")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>CNV</span>
                      <button onClick={() => toggleModal(true,'CNV')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["cnv"] ? (
                      <>
                        <span>{filesData["cnv"] && filesData["cnv"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("cnv")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "cnv")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>methylation</span>
                      <button onClick={() => toggleModal(true,'Methylation')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["methylation"] ? (
                      <>
                        <span>{filesData["methylation"] && filesData["methylation"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("methylation")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "methylation")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>


            <table className="MultiUploadTableHead">
              <tbody>
                <tr className="MultiUploadBGOrange">
                  <td className="MultiUploadTDHeader MultiUploadTextCenter" colSpan="2">
                    RNA File
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208">
                    <div className="Flex JustifySpaceBetween">
                      <span>RNA</span>
                      <button onClick={() => toggleModal(true,'RNA')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["rna"] ? (
                      <>
                        <span>{filesData["rna"] && filesData["rna"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("rna")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "rna")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>Fusion</span>
                      <button onClick={() => toggleModal(true,'Fusion')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["fusion"] ? (
                      <>
                        <span>{filesData["fusion"] && filesData["fusion"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("fusion")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "fusion")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>


            <table className="MultiUploadTableHead">
              <tbody>
                <tr className="MultiUploadBGBlue">
                  <td className="MultiUploadTDHeader MultiUploadTextCenter" colSpan="2">
                    Protein File
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208">
                    <div className="Flex JustifySpaceBetween">
                      <span>Proteome</span>
                      <button onClick={() => toggleModal(true,'Proteome')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["proteome"] ? (
                      <>
                        <span>{filesData["proteome"] && filesData["proteome"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("proteome")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "proteome")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>Phosphorylation</span>
                      <button onClick={() => toggleModal(true,'Phospho')}>
                        <InforIcon />
                      </button>
                    </div>
                  </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["phospho"] ? (
                      <>
                        <span>{filesData["phospho"] && filesData["phospho"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("phospho")}
                        >
                          Reset
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "phospho")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          Reset
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bottomBtns">
              <div className="flex">
                <button className="btn btnGray bdBtn" onClick={handleReset}>
                  <FormattedMessage id="ResetAll" defaultMessage="Reset All" />
                </button>
                <button className="btn btnPrimary" onClick={handleUpload}>
                  <FormattedMessage id="Upload" defaultMessage="Upload" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </article>
    </div>
  );
};

export default Table;



