import React, { useEffect, useState } from "react";
import { multiFileUpload, clearMultiFIleUploadState } from "../../../actions/api_actions";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import Swal from 'sweetalert2';
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
const Table = ({ updateComponentNumber }) => {
  const [filesData, setFilesData] = useState({});
  const [projectName, setProjectName] = useState({});
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
    if (filesData["clinical_information"] && projectName !== '') {
      dispatch(multiFileUpload(filesData, projectName));
      updateComponentNumber(1);
    } else if (projectName === '') {
      Swal.fire({
        title: 'Warning',
        text: "Enter Project ID",
        icon: 'warning',
        confirmButtonColor: '#003177',
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
        }
      })
    }
    else if (filesData["clinical_information"] === null) {
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
  };

  const title = { id: "MultiDataVisualization", defaultMessage: "Multi Data Visualization" }

  const breadCrumbs = {
    '/newmultidataproject/': [
      { id: 'FindID', defaultMessage: 'Home', to: '/' },
      { id: 'MultiDataUpload', defaultMessage: 'Multi Data Upload', to: '/home/visualizeMyData/' },
    ]
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
      <div className="contentsTitle" style={{margin:"0px"}}>
          <h3>
            <font>
              <font><FormattedMessage id="MultiData" defaultMessage="Multi Data"/></font>
              <span className="colorSecondary">
                <font><FormattedMessage id="Upload" defaultMessage="Upload"/> </font>
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
                  value={filesData.project_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <table className="MultiUploadTableHead">
              <tbody>
                <tr className="MultiUploadBGGray">
                  <td className="MultiUploadTDHeader MultiUploadTextCenter" colSpan="2">
                    Clinical Information file <span style={{color:"red"}}> (Required) </span>
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader MultiUploadW208" style={{ width: '31vw' }}>Clinical Information</td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["clinical_information"] ? (
                      <>
                        <span>{filesData["clinical_information"] && filesData["clinical_information"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("clinical_information")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "clinical_information")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
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
                  <td className="MultiUploadTDHeader MultiUploadW208">DNA Mutation</td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["dna_mutation"] ? (
                      <>
                        <span>{filesData["dna_mutation"] && filesData["dna_mutation"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("dna_mutation")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "dna_mutation")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">CNV</td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["cnv"] ? (
                      <>
                        <span>{filesData["cnv"] && filesData["cnv"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("cnv")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "cnv")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">Methylation</td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["methylation"] ? (
                      <>
                        <span>{filesData["methylation"] && filesData["methylation"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("methylation")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "methylation")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
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
                  <td className="MultiUploadTDHeader MultiUploadW208">RNA </td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["rna"] ? (
                      <>
                        <span>{filesData["rna"] && filesData["rna"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("rna")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "rna")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">Fusion</td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["fusion"] ? (
                      <>
                        <span>{filesData["fusion"] && filesData["fusion"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("fusion")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "fusion")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
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
                  <td className="MultiUploadTDHeader MultiUploadW208">Proteome</td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["proteome"] ? (
                      <>
                        <span>{filesData["proteome"] && filesData["proteome"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("proteome")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "proteome")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="MultiUploadTDHeader">Phosphorylation</td>
                  <td className="MultiUploadTDHeader MultiUploadTD">
                    {filesData["phospho"] ? (
                      <>
                        <span>{filesData["phospho"] && filesData["phospho"].file.name}</span>
                        <button
                          className="MultiUploadBgGrayButton"
                          type="button"
                          onClick={() => handleClearFile("phospho")}
                        >
                          No file
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          onChange={(event) => handleFileChange(event, "phospho")}
                        />
                        <button className="MultiUploadBgGrayButton" disabled>
                          No file
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table> 

            <div className="bottomBtns">
              <div className="flex">
                <button className="btn btnGray bdBtn"  onClick={handleReset}>
                <FormattedMessage id="Reset" defaultMessage="Reset" />
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



