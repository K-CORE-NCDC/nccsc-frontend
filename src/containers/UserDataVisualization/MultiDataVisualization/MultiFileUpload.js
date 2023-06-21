import React, { useEffect, useState } from "react";
import { multiFileUpload,clearMultiFIleUploadState } from "../../../actions/api_actions";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import swal from 'sweetalert';

const Table = ({ updateComponentNumber}) => {
  const [filesData, setFilesData] = useState({});
  const [projectName, setProjectName] = useState({});
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(clearMultiFIleUploadState())
  },[])

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
    } else if(projectName === '') {
      swal("Enter Project ID",{
        closeOnClickOutside: false,
        icon: "error",  
        button: {
          text: "Back",
          backgroundColor: '#4962B3'
        },
      
        className:"text-center"
      })
    }
    else if(filesData["clinical_information"] === null){
        swal("Upload Clinical Information",{
          closeOnClickOutside: false,
          icon: "error",  
          button: {
            text: "Back",
            backgroundColor: '#4962B3'
          },
        
          className:"text-center"
        })
      }
  };

  const handleReset = () => {
    setFilesData({});
    setProjectName('');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="h-auto bg-white my-4 p-6 rounded-lg shadow-lg" style={{width:'31vw'}}>

      <div className="flex mb-4">
    <label htmlFor="projectName" className="font-bold mr-2 my-1">
        Project Name: 
    </label>
    <input
        type="text"
        id="projectName"
        name="project_name"
        value={filesData.project_name}
        onChange={handleInputChange}
        className="border border-gray-300 px-2 py-1 w-40"
    />
    </div>


      <table className="w-full border-collapse border border-gray-300 my-8">
          <tbody>
            <tr className="bg-gray-200">
            <td className="border border-gray-300 px-4 py-2 text-center" colSpan="2">
            Clinical Information file (Required)
            </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 w-52">Clinical Information</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["clinical_information"] ? (
                  <>
                    <span>{filesData["clinical_information"] && filesData["clinical_information"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
      </table>

        <table className="w-full border-collapse border border-gray-300 my-8">
          <tbody>
            <tr className="bg-yellow-100">
            <td className="border border-gray-300 px-4 py-2 text-center" colSpan="2">
                DNA File
            </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 w-52">DNA Mutation</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["dna_mutation"] ? (
                  <>
                    <span>{filesData["dna_mutation"] && filesData["dna_mutation"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">CNV</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["cnv"] ? (
                  <>
                    <span>{filesData["cnv"] && filesData["cnv"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Methylation</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["methylation"] ? (
                  <>
                    <span>{filesData["methylation"] && filesData["methylation"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        

        <table className="w-full border-collapse border border-gray-300 my-8">
          <tbody>
            <tr className="bg-orange-100">
            <td className="border border-gray-300 px-4 py-2 text-center" colSpan="2">
                RNA File
            </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 w-52">RNA </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["rna"] ? (
                  <>
                    <span>{filesData["rna"] && filesData["rna"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Fusion</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["fusion"] ? (
                  <>
                    <span>{filesData["fusion"] && filesData["fusion"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        

        <table className="w-full border-collapse border border-gray-300 my-8">
          <tbody>
            <tr className="bg-blue-100">
            <td className="border border-gray-300 px-4 py-2 text-center" colSpan="2">
                Protein File
            </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 w-52">Proteome</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["proteome"] ? (
                  <>
                   <span>{filesData["proteome"] && filesData["proteome"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Phosphorylation</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                {filesData["phospho"] ? (
                  <>
                    <span>{filesData["phospho"] && filesData["phospho"].file.name}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
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
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled>
                      No file
                    </button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
           className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-40 h-16 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          type="button"
          onClick={handleUpload}
          >
          <FormattedMessage id="Upload" defaultMessage="Upload" />
        </button>

        <button
           className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-40 h-16 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          type="button"
          onClick={handleReset}
          >
          <FormattedMessage id="Reset" defaultMessage="Reset" />
        </button>
        </div>
      </div>
    </div>
  );
};

export default Table;



