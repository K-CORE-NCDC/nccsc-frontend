import React, { useEffect, useState } from "react";
import { multiFileUpload, clearMultiFIleUploadState, UserDataProjectsCount } from "../../../actions/api_actions";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import Swal from 'sweetalert2';
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import Draggable from 'react-draggable';
import AOS from 'aos';
import { useHistory } from 'react-router-dom';

function Modal({ showModal, toggleModal, fileName }) {

  let fileNameImage = require(`../../../assets/images/FileScreenshots/${fileName}.png`).default
  let fileNameFile = require(`../../../assets/files/20_samples/${fileName}.tsv`).default

  return (
    <>
      {showModal ? (
        <>
          <div className="Toolmodal-container">
            <div className="Toolmodal-content" style={{ maxWidth: "60vw" }}>
              {/*content*/}
              <div className="Toolmodal-dialog">
                {/*header*/}
                <div className="Toolmodal-header">
                  <h5 className="Toolmodal-title" style={{ fontSize: '20px' }}> <FormattedMessage id="SampleFileDownload" defaultMessage='Sample File Download.' /></h5>
                  <button
                    className="Toolmodal-close-btn"
                    onClick={() => toggleModal(false, '')}
                  >
                    ×
                  </button>
                </div>
                {/*body*/}
                <div style={{border:'1px solid black' , objectFit:'contain' , margin:'0px 10px 0px 15px'}}>
                <img src={fileNameImage} alt="ExampleFileImage" style={{padding:'5px 10px 5px 10px'}} /></div>
                <div className="Toolmodal-body">
                  <div className="Toolmodal-text">
                    <DataOfFiles fileName={fileName} />
                    <div className='Flex FlexDirRow' style={{ marginTop: "20px", gap: "10px" }}>

                      <p><FormattedMessage id="Click on the link to download the sample file Download" defaultMessage='Click on the link to download the sample file.' /></p>
                      <a className="Tooldownload-link" href={fileNameFile} download>

                        <FormattedMessage id="Download" defaultMessage='Download' />
                      </a>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="Toolmodal-footer">
                  <button
                    className="Toolmodal-close-btn"
                    style={{ fontSize: '20px' }}
                    onClick={() => toggleModal(false, '')}
                  >
                    <FormattedMessage id="Close" defaultMessage='Close' />
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
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  useEffect(() => {
    dispatch(clearMultiFIleUploadState())
    AOS.init({});
    AOS.refresh()
    let return_data = UserDataProjectsCount('GET', {})
    return_data.then((result) => {
      const d = result
      if (d.status === 200 && result.data.data >= 5 ) {
        history.push({
          pathname: '/multidatavisualization/',
          state: { redirected: true },
        });
      }
    })
  }, [])

  const handleDrag = () => {
    if (!isOpen) {
      return false;
    }
  };

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

  let toggleModal = (status, file) => {
    setShowModal(status)
    setFileName(file)
  }

  const title = { id: "MultiDataVisualization", defaultMessage: "Multi Data Visualization" }

  const breadCrumbs = {
    '/newmultidataproject/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
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
  let closeModal = () => {
    setIsOpen(false);
    toggleModal(false)
  }

  return (

    <div>
      {isOpen && isOpen === true &&

        <Draggable disabled={!isOpen} onDrag={handleDrag}>
          <div
            style={{
              width: '300px',
              height: '400px',
              position: 'fixed',
              transitionDelay: '3s',
              bottom: isOpen ? '150px' : '-1000px',
              right: isOpen ? '50px' : '-1000px',
              transition: 'bottom 0.10s ease-in-out, right 0.5s ease-in-out',
              zIndex: '15',
              transitionDuration: '5s',
              transitionTimingFunction: 'linear'
            }}

          >
            <div className="mainPopup W100" data-aos="zoom-in" data-aos-once='true' >
              <div className="popupHeader">
                <h3 className='TextLeft'>Note</h3>
                <span className="material-icons mainPopupClose" id="mainPopupClose" onClick={closeModal}>
                  close
                </span>
              </div>
              <div className='popupBody  introduceWrap' style={{ "padding": "0px", "border": "1px solid #ddd" }}>
                <div className="introduceBox03" style={{ "width": "100%" }}>
                  <ul>
                    <li>
                      <p>
                        <FormattedMessage id="uploadGuide1" defaultMessage="Provides visualization results only for plots related to the uploaded data." />
                      </p>
                    </li>
                    <li>
                      <p>
                        <FormattedMessage id="uploadGuide2" defaultMessage="For omics data information required for each plot, please refer to the [Visualize Example Data] page." />
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </Draggable>

      }

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
                <FormattedMessage id="ProjectName" defaultMessage="Project Name" />
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
                      <button onClick={() => toggleModal(true, 'ClinicalInformation')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "clinical_information")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
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
                      <button onClick={() => toggleModal(true, 'DnaMutation')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "dna_mutation")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>CNV</span>
                      <button onClick={() => toggleModal(true, 'CNV')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "cnv")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>methylation</span>
                      <button onClick={() => toggleModal(true, 'Methylation')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "methylation")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
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
                      <button onClick={() => toggleModal(true, 'RNA')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "rna")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>Fusion</span>
                      <button onClick={() => toggleModal(true, 'Fusion')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "fusion")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
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
                      <button onClick={() => toggleModal(true, 'Proteome')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "proteome")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">
                    <div className="Flex JustifySpaceBetween">
                      <span>Phosphorylation</span>
                      <button onClick={() => toggleModal(true, 'Phospho')}>
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
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "phospho")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          <FormattedMessage id="Reset" defaultMessage="Reset" />
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


export const DataOfFiles = ({ fileName }) => {



  return (
    <ul style={{ margin: "10px" }}>
      {/* <li> <FormattedMessage id="CommonGuideMsg" defaultMessage='This is a Sample Example File for ' />{` ${fileName}`}</li> */}

      <div className="popularBox" >
        <div className="contentBox">
          {fileName === 'ClinicalInformation' &&
            <ul className="" style={{ paddingTop: '10px' }}>
              <li className="" tabIndex="0" >
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="clinicalInformationGuidep1" defaultMessage='[sample_id] columns is essential. Other columns except [sample_id] are userdata.' />
                </p>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="clinicalInformationGuidep2" defaultMessage=' For survival plot, [rlps_yn], [rlps_cnfr_drtn], [death_yn], [death_cnfr_drtn] are essential. Recurrence or survival plot is composed of [rlps_yn], [rlps_cnfr_drtn], and Survival of survival plot is composed of [death_yn], [death_cnfr_drtn].' />
                </p>

                <ul>
                  <li style={{ paddingLeft: '5%', paddingTop: '10px' }}> -  <FormattedMessage id="clinicalInformationGuideinnerp1" defaultMessage='rlps_yn : recurrence yes or no (TRUE / FALSE)' /> </li>
                  <li style={{ paddingLeft: '5%' }}> - <FormattedMessage id="clinicalInformationGuideinnerp2" defaultMessage='rlps_cnfr_drtn : recurrence confirmation duration (numeric data)' /> </li>
                  <li style={{ paddingLeft: '5%' }}>- <FormattedMessage id="clinicalInformationGuideinnerp3" defaultMessage='death_yn : death yes or no (TRUE / FALSE)' /></li>
                  <li style={{ paddingLeft: '5%' }}>- <FormattedMessage id="clinicalInformationGuideinnerp4" defaultMessage='death_cnfr_drtn : death confirmation duration (numeric data)' /> </li>
                </ul>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="RNAGuideP2" defaultMessage='Leave the “None” value empty.' />
                </p>
              </li>

            </ul>}

          {(fileName === 'DnaMutation' || fileName === 'CNV' || fileName === 'Methylation' || fileName === 'Fusion' || fileName === 'Phospho') &&
            <ul className="" style={{ paddingTop: '10px' }}>
              <li className="" tabIndex="0" >
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="DNAMutationGuideP1" defaultMessage='Each column configuration of omics data must be same to the sample format. ' />
                </p>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="DNAMutationGuideP2" defaultMessage='Leave the “None” value empty.' />
                </p>
              </li>
            </ul>
          }
          {(fileName === 'RNA' || fileName === 'Proteome') &&
            <ul className="" style={{ paddingTop: '10px' }}>
              <li className="" tabIndex="0" >
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="RNAGuideP1" defaultMessage='Each column configuration of omics data must be same to the sample format.' />
                </p>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="RNAGuideP2" defaultMessage='Leave the “None” value empty.' />
                </p>
              </li>
              <li tabIndex="-1" style={{ paddingTop: '10px' }}>
                <p style={{ color: 'black' }}> <b></b> &nbsp;
                  <FormattedMessage id="RNAGuideP3" defaultMessage='[raw] column is raw count information. [norm] column is normalization information like CPM, RPKM, FPKM, TPM.' />
                </p>
              </li>
            </ul>
          }

        </div>



      </div>
      {/* <ul>
        {fileName !== 'ClinicalInformation' ?
          <li style={{ paddingLeft: '5%', paddingTop: '10px' }}> 1. &nbsp; &nbsp; Each column configuration of omics data must be same to the sample format. </li>
          :
          <>
            <li style={{ paddingLeft: '5%', paddingTop: '10px' }}>1. &nbsp; &nbsp; [sample_id] column is essential. Other columns except [sample_id] are userdata. </li>
            <li style={{ paddingLeft: '5%', paddingTop: '10px' }}>2. &nbsp; &nbsp; For survival plot, [rlps_yn], [rlps_cnfr_drtn], [death_yn], [death_cnfr_drtn] are essential. Recurrence or survival plot is composed of [rlps_yn], [rlps_cnfr_drtn], and Survival of survival plot is composed of [death_yn], [death_cnfr_drtn].
              <ul>
                <li style={{ paddingLeft: '5%', paddingTop: '10px' }}> - &nbsp; &nbsp; rlps_yn : &nbsp; &nbsp;recurrence yes or no (TRUE / FALSE) </li>
                <li style={{ paddingLeft: '5%' }}> - &nbsp; &nbsp; rlps_cnfr_drtn : &nbsp; &nbsp;recurrence confirmation duration (numeric data)</li>
                <li style={{ paddingLeft: '5%' }}>- &nbsp; &nbsp; death_yn : &nbsp; &nbsp;death yes or no (TRUE / FALSE)</li>
                <li style={{ paddingLeft: '5%' }}>- &nbsp; &nbsp; death_cnfr_drtn : &nbsp; &nbsp; death confirmation duration (numeric data) </li>
              </ul>
            </li> </>
        }
      </ul> */}
    </ul>
  )

}



