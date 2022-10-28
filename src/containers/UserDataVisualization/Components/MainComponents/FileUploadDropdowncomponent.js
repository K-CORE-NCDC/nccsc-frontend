import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileProjectDataTable from "./FileProjectDataTable";
import {
  new_file_upload,
  uploadClinincalSamples,
} from "../../../../actions/api_actions";
import swal from "sweetalert";
import LoaderCmp from "../../../Common/Loader";

function FileUploadDropdowncomponent({ updateComponentNumber }) {
  const [selectClinincalFilterColumn, setSelectClinincalFilterColumn] =
    useState([]);
  const [responseData, setResponseData] = useState({});
  const [clinincalFilterColumns, setClinincalFilterColumns] = useState([]);
  const [activeTableKey, setActiveTableKey] = useState("clinical_information");
  const [currentFilename, setCurrentFilename] = useState("");
  const [clinicalInformationColumns, setClinicalInformationColumns] = useState(
    {}
  );
  const [
    defaultClinicalInformationColumns,
    setDefaultClinicalInformationColumns,
  ] = useState({});
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const dispatch = useDispatch();
  const clinicalfileresponse = useSelector(
    (data) => data.homeReducer.newFileUploadData
  );
  const verificationResponse = useSelector(
    (data) => data.homeReducer.uploadClinicalColumns
  );
  const [message, setMessage] = useState({});
  const [columnTypes, setColumnTypes] = useState({});

  const getFileName = (clinicalfileresponse, tab) => {
    if (
      clinicalfileresponse &&
      clinicalfileresponse["res"] &&
      clinicalfileresponse["res"].length > 0
    ) {
      for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
        if (clinicalfileresponse["res"][i]["tab"] === tab) {
          return clinicalfileresponse["res"][i]["filename"];
        }
      }
    }
  };
  console.log(clinicalfileresponse);

  useEffect(() => {
    if (
      clinicalfileresponse &&
      clinicalfileresponse["res"] &&
      clinicalfileresponse["res"].length > 0
    ) {
      for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
        if (clinicalfileresponse["res"][i]["tab"] === "clinical_information") {
          setDefaultClinicalInformationColumns(clinicalfileresponse["res"][i]["types"]);
        }
      }
    }
  }, [clinicalfileresponse]);

  const clinicalUpdateFileTypeOnChange = (e) => {
    let divName = e.target.name;
    let divValue = e.target.value;
    console.log('defaultClinicalInformationColumns',defaultClinicalInformationColumns);
    if(divName === 'sample_id' || divName === 'rlps_yn' || divName === 'rlps_cnfr_drtn'){
          if(defaultClinicalInformationColumns[divName] === divValue ){
            setClinicalInformationColumns((prevState) => ({
              ...prevState,
              [divName]: divValue,
            }));
           if(e){
            e.target.classList.remove("border-red-400")
           }
          }
          else{
            if(e){
              e.target.classList.add("border-red-400")
            }
          }
         
    }
    else{
      setClinicalInformationColumns((prevState) => ({
        ...prevState,
        [divName]: divValue,
      }));
    }
    // console.log("length is ",Object.keys(clinicalInformationColumns).length);
    if (activeTableKey === "clinical_information") {
      let tmp = { ...clinincalFilterColumns };
      Object.keys(tmp).forEach((obj) => {
        if (tmp[obj].id === divName) {
          tmp[obj].value = divValue;
        }
      });
      setClinincalFilterColumns(tmp);
      let tempresponseData = { ...responseData };
      if (tempresponseData[activeTableKey]) {
        tempresponseData[activeTableKey]["types"][divName] = divValue;
      } else {
        tempresponseData[activeTableKey] = {};
        tempresponseData[activeTableKey]["tab"] = activeTableKey;
        tempresponseData[activeTableKey]["filename"] = getFileName(
          clinicalfileresponse,
          activeTableKey
        );
        tempresponseData[activeTableKey]["types"] = {};
        tempresponseData[activeTableKey]["types"][divName] = divValue;
      }
      setResponseData(tempresponseData);
    }
  };

  const sendColumnsData = (columnsData, totalFiles) => {
    console.log(
      "columnsData",
      columnsData,
      Object.keys(columnsData).length,
      totalFiles
    );
    let verifyClinincalInformationColumns = () => {
      if (
        clinicalfileresponse &&
        clinicalfileresponse["res"] &&
        clinicalfileresponse["res"].length > 0
      ) {
        let total_columns;
        for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
          if (
            clinicalfileresponse["res"][i]["tab"] === "clinical_information"
          ) {
            total_columns = clinicalfileresponse["res"][i]["columns"].length;
            return (
              total_columns === Object.keys(clinicalInformationColumns).length
            );
          }
        }
      }
    };
    if (
      columnsData &&
      Object.keys(columnsData).length === totalFiles &&
      verifyClinincalInformationColumns()
    ) {
      console.log("a");
      let d = {
        project_name: clinicalfileresponse["project_name"],
        file_types: columnsData,
      };
      dispatch(uploadClinincalSamples(d));
      updateComponentNumber(2);
    } else {
      console.log("asasd");
      swal("Please Select All Columns in Clinical Information.", {
        closeOnClickOutside: false,
      });
    }
  };

  const tabDropdownTable = (tab) => {
    setActiveTableKey(tab);
    if (
      clinicalfileresponse &&
      clinicalfileresponse["res"] &&
      clinicalfileresponse["res"].length > 0
    ) {
      for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
        let row = clinicalfileresponse["res"][i];
        let column = row["columns"];
        let types = row["types"];
        let tab = row["tab"];
        processColumns(column, tab, types);
      }
    }
  };

  const processColumns = (columns, tab, types) => {
    let colsarray = [];
    if (tab !== "clinical_information") {
      for (let i = 0; i < columns.length; i++) {
        let obj = {
          id: columns[i],
          title: columns[i],
          type: "select",
          options: ["", "character", "numeric", "decimal", "yesorno"],
          value: types[columns[i]],
        };
        colsarray.push(obj);
      }
      // console.log("PC usshhh",tab);
      setClinincalFilterColumns((prevState) => ({
        ...prevState,
        [tab]: colsarray,
      }));
      // console.log("PC ClinincalFilterColumns",clinincalFilterColumns);
      let tempresponseData = { ...responseData };
      if (tempresponseData[tab]) {
        tempresponseData[tab]["types"] = types;
      } else {
        tempresponseData[tab] = {};
        tempresponseData[tab]["filename"] = getFileName(
          clinicalfileresponse,
          tab
        );
        tempresponseData[tab]["types"] = {};
        tempresponseData[tab]["types"] = types;
        tempresponseData[tab]["tab"] = tab;
      }
      console.log("temp rp", tempresponseData[tab]);
      // setResponseData(tempresponseData);
      setResponseData((prevState) => ({
        ...prevState,
        [tab]: tempresponseData[tab],
      }));
      // tempRP.assign(tempresponseData)

      console.log("reponsedata", responseData);
    } else {
      for (let i = 0; i < columns.length; i++) {
        let obj = {
          id: columns[i],
          title: columns[i],
          type: "select",
          options: ["", "character", "numeric", "decimal", "yesorno"],
          value: "",
        };
        colsarray.push(obj);
      }
      setClinincalFilterColumns((prevState) => ({
        ...prevState,
        [tab]: colsarray,
      }));
    }
  };

  useEffect(() => {
    // checking if clinical filter response has clinical filter in it:
    if (
      clinicalfileresponse &&
      clinicalfileresponse["res"] &&
      clinicalfileresponse["res"].length > 0
    ) {
      // console.log("1111-------->",clinicalfileresponse);
      let temptabs = [];
      for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
        // console.log("col types ----------->",clinicalfileresponse["res"][i]);
        // setColumnTypes(clinicalfileresponse["res"][i]["types"]);
        setColumnTypes((prevState) => ({
          ...prevState,
          [clinicalfileresponse["res"][i]["tab"]]:
            clinicalfileresponse["res"][i]["types"],
        }));
        let row = clinicalfileresponse["res"][i];
        let tab = row["tab"];
        let css = "px-4 py-2 font-semibold rounded-t opacity-50";
        if (activeTableKey === tab) {
          css += " border-blue-400 border-b-4 -mb-px opacity-100";
        }
        temptabs.push(
          <li key={tab} className={css}>
            <button
              value={tab}
              onClick={() => tabDropdownTable(tab)}
              className="capitalize"
            >
              {tab}
            </button>
          </li>
        );
        let columns = row["columns"];
        let types = row["types"];
        if (clinicalfileresponse["res"][i]["message"] === "") {
          processColumns(columns, tab, types);
        } else {
          let key = clinicalfileresponse["res"][i]["tab"];
          let value = clinicalfileresponse["res"][i]["message"];
          setMessage((prevState) => ({
            ...prevState,
            [key]: value,
          }));
        }
      }
      setTableNavTabs(temptabs);
    }
  }, [clinicalfileresponse, activeTableKey]);

  useEffect(() => {
    // console.log("column types are ",columnTypes);
  }, [columnTypes]);

  useEffect(() => {
    let firstInput = [];
    if (clinincalFilterColumns) {
      Object.keys(clinincalFilterColumns).forEach((key) => {
        if (
          activeTableKey === "clinical_information" &&
          key === "clinical_information"
        ) {
          clinincalFilterColumns[key].forEach((obj) => {
            firstInput.push(
              <div className="flex justify-between" key={key + "_" + obj.id}>
                <div className="my-auto">
                  <h2>{obj.title}</h2>
                </div>
                <div key={obj.id} className="">
                  <div className="relative w-full col-span-4">
                    <select
                      onChange={clinicalUpdateFileTypeOnChange}
                      name={obj.title}
                      defaultChecked="false"
                      // defaultValue={obj.value}
                      defaultValue={
                        clinicalInformationColumns[obj.title]
                          ? clinicalInformationColumns[obj.title]
                          : ""
                      }
                      className="select-color w-48 p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
                    >
                      {Object.keys(obj.options).map((type) => (
                        <option
                          className="text-gray-900"
                          key={type}
                          value={obj.options[type]}
                        >
                          {obj.options[type]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          });
        } else if (
          activeTableKey !== "clinical_information" &&
          key === activeTableKey
        ) {
          clinincalFilterColumns[key].forEach((obj) => {
            columnTypes &&
              firstInput.push(
                <div className="flex justify-between" key={obj.id + "_" + key}>
                  <div className="my-auto">
                    <h2>{obj.title}</h2>
                  </div>
                  <div key={obj.id} className="">
                    <div className="relative w-full col-span-4">
                      <select
                        name={obj.title}
                        defaultChecked="false"
                        defaultValue={columnTypes[key][obj.id]}
                        className="select-color w-48 p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
                      >
                        {Object.keys(obj.options).map((type) => (
                          <option
                            className="text-gray-900"
                            key={type}
                            value={obj.options[type]}
                          >
                            {obj.options[type]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
          });
        }
      });
    }
    setSelectClinincalFilterColumn(firstInput);
  }, [clinincalFilterColumns]);

  return (
    <div className="container mx-auto mt-8">
      <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 ">
          {tableNavTabs}
        </ul>
      </nav>
      <div id="tab-contents" className="mx-auto mt-20" style={{ width: "60%" }}>
        <div className="grid grid-cols-3 gap-4">
          {clinicalfileresponse && selectClinincalFilterColumn}
        </div>
        {!clinicalfileresponse && (
          <div>
            <LoaderCmp />
          </div>
        )}
      </div>
      <div className="w-full">
        <h1 className="text-center">{message[activeTableKey]}</h1>
      </div>

      <div className="flex justify-between mt-24">
        <div className="">
          <button
            className="capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
            type="button"
            onClick={() => {
              updateComponentNumber(0);
            }}
          >
            Back
          </button>
        </div>
        <div className="">
          <button
            className="capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
            type="button"
            onClick={() => {
              sendColumnsData(responseData, clinicalfileresponse["res"].length);
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadDropdowncomponent;
