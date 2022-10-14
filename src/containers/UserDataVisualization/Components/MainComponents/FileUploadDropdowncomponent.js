import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileProjectDataTable from "./FileProjectDataTable";
import {
  new_file_upload,
  uploadClinincalSamples,
} from "../../../../actions/api_actions";

function FileUploadDropdowncomponent({ updateComponentNumber }) {
  const [selectClinincalFilterColumn, setSelectClinincalFilterColumn] =
    useState([]);
  const [responseData, setResponseData] = useState({});
  const [clinincalFilterColumns, setClinincalFilterColumns] = useState([]);
  const [activeTableKey, setActiveTableKey] = useState("clinical_information");
  const [currentFilename, setCurrentFilename] = useState("");
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
    // console.log("inside getfilename------------->",tab);
    if (clinicalfileresponse && clinicalfileresponse["res"].length > 0) {
      for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
        if (clinicalfileresponse["res"][i]["tab"] === tab) {
          return clinicalfileresponse["res"][i]["filename"];
        }
      }
    }
  };

  useEffect(() => {
    // console.log("yes, first time ============================");
    // console.log(responseData);
    // let abc = {}
    // setResponseData(abc)
    // console.log(responseData);
  }, []);

  const clinicalUpdateFileTypeOnChange = (e) => {
    // console.log(activeTableKey, e.target.name, e.target.value);
    let divName = e.target.name;
    let divValue = e.target.value;
    // setUploadFile(prevState)
    // console.log("clinincalFilterColumns", clinincalFilterColumns);
    if (activeTableKey === "clinical_information") {
      let tmp = { ...clinincalFilterColumns };
      Object.keys(tmp).forEach((obj) => {
        if (tmp[obj].id === divName) {
          tmp[obj].value = divValue;
        }
      });
      // console.log("tmp", tmp);
      setClinincalFilterColumns(tmp);
      let tempresponseData = { ...responseData };
      // console.log(tempresponseData[activeTableKey]);
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

    // console.log("responseData",responseData);
  };

  let sendColumnsData = (columnsData, totalFiles) => {
    console.log(
      "columnsData",
      columnsData,
      Object.keys(columnsData).length,
      totalFiles
    );
    if (columnsData && Object.keys(columnsData).length === totalFiles) {
      // console.log("assd");
      dispatch(uploadClinincalSamples(columnsData));
      updateComponentNumber(2);
    }
    // dispatch(uploadClinincalSamples(columnsData));
  };

  const tabDropdownTable = (tab) => {
    // console.log("tab", tab);
    setActiveTableKey(tab);
    if (clinicalfileresponse && clinicalfileresponse["res"].length > 0) {
      for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
        let row = clinicalfileresponse["res"][i];
        let column = row["columns"];
        let types = row["types"];
        let tab = row["tab"];
        processColumns(column, tab, types);
      }
      // console.log("clinincalFilterColumns", clinincalFilterColumns);
    }
  };

  const processColumns = (columns, tab, types) => {
    // console.log("columns", columns,tab,types);
    let colsarray = [];

    if (tab !== "clinical_information") {
      for (let i = 0; i < columns.length; i++) {
        let obj = {
          id: columns[i],
          title: columns[i],
          type: "select",
          options: ["", "charecter", "numeric", "decimal", "yesorno"],
          value: types[columns[i]],
        };
        colsarray.push(obj);
      }
      // setClinincalFilterColumns([])
      setClinincalFilterColumns((prevState) => ({
        ...prevState,
        [tab]: colsarray,
      }));
      // setResponseData((prevState) =>({
      //   ...prevState,
      //   [tab]: types,
      //   ["filename"]:filename
      // }))

      let tempresponseData = { ...responseData };
      // console.log(tempresponseData[activeTableKey]);
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
      setResponseData(tempresponseData);
    } else {
      for (let i = 0; i < columns.length; i++) {
        let obj = {
          id: columns[i],
          title: columns[i],
          type: "select",
          options: ["", "charecter", "numeric", "decimal", "yesorno", "date"],
          value: "",
        };
        colsarray.push(obj);
      }
      // setClinincalFilterColumns([])
      setClinincalFilterColumns((prevState) => ({
        ...prevState,
        [tab]: colsarray,
      }));
    }
  };

  useEffect(() => {
    // console.log(
    //   "==============clinicalfileresponse==========",
    //   clinicalfileresponse
    // );

    // checking if clinical filter response has clinical filter in it:

    if (clinicalfileresponse && clinicalfileresponse["res"].length > 0) {
      let temptabs = [];
      for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
        setColumnTypes(clinicalfileresponse["res"][i]["types"]);
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
          console.log("empty");
          processColumns(columns, tab, types);
        } else {
          let key = clinicalfileresponse["res"][i]["tab"];
          let value = clinicalfileresponse["res"][i]["message"];
          setMessage((prevState) => ({
            ...prevState,
            [key]: value,
          }));
          console.log("message", message);
        }
      }
      setTableNavTabs(temptabs);
    }
  }, [clinicalfileresponse, activeTableKey]);

  useEffect(() => {
    // console.log(
    //   "clinincalFilterColumns-------->",
    //   clinincalFilterColumns,
    //   columnTypes,
    //   activeTableKey
    // );
    let firstInput = [];
    if (clinicalfileresponse) {
      Object.keys(clinincalFilterColumns).forEach((key) => {
        // console.log("aa------------------->",key);
        if (
          activeTableKey === "clinical_information" &&
          key === "clinical_information"
        ) {
          clinincalFilterColumns[key].forEach((obj) => {
            firstInput.push(
              <div className="flex justify-between">
                <div className="my-auto">
                  <h2>{obj.title}</h2>
                </div>
                <div key={obj.id} className="">
                  <div className="relative w-full col-span-4">
                    <select
                      onChange={clinicalUpdateFileTypeOnChange}
                      name={obj.title}
                      defaultChecked="false"
                      defaultValue={obj.value}
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
            // console.log("columnTypes[obj.id]",obj.id,"++++",columnTypes[obj.id]);
            columnTypes &&
              firstInput.push(
                <div className="flex justify-between">
                  <div className="my-auto">
                    <h2>{obj.title}</h2>
                  </div>
                  <div key={obj.id} className="">
                    <div className="relative w-full col-span-4">
                      <select
                        name={obj.title}
                        defaultChecked="false"
                        defaultValue={columnTypes[obj.id]}
                        value={columnTypes[obj.id]}
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
    // console.log("firstInput", firstInput);
  }, [clinincalFilterColumns]);

  // useEffect(() => {
  //   if (responseData && Object.keys(responseData).length > 0) {
  //     console.log(
  //       "finalresp",
  //       clinicalfileresponse["res"].length,
  //       Object.keys(responseData).length
  //     );
  //     sendColumnsData(responseData, clinicalfileresponse["res"].length);
  //   }
  // }, [responseData]);
  return (
    <div>
      <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 ">
          {tableNavTabs}
        </ul>
      </nav>
      <div id="tab-contents" className="mx-auto mt-20" style={{ width: "60%" }}>
        <div className="grid grid-cols-3 gap-4">
          {selectClinincalFilterColumn}
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-center">{message[activeTableKey]}</h1>
      </div>

      <div className="flex justify-between mt-24">
        <div className="">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
