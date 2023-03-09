import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import LoaderCmp from "../../../Common/Loader";
import {
  clear_new_file_upload_state
} from "../../../../actions/api_actions";
import { FormattedMessage } from "react-intl";

function FileProjectDataTable({ updateComponentNumber }) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [activeTableKey, setActiveTableKey] = useState("clinical_information");
  const [navTabIs, setNavTabIs] = useState('circos')
  let history = useHistory();
  const verificationResponse = useSelector(
    (data) => data.homeReducer.uploadClinicalColumns
  );

  const tabDropdownTable = (tab) => {
    setActiveTableKey(tab);
  };

  useEffect(()=>{
    if (verificationResponse && verificationResponse["project_details"]) {
      
      for(const available_step in verificationResponse["project_details"]["available_steps"]){
        if(verificationResponse["project_details"]["available_steps"][available_step].length > 0){
          setNavTabIs(available_step)
        }
      }
    }
  },[verificationResponse])
  useEffect(() => {
    if (verificationResponse && verificationResponse["result"]) {
      let temptabs = [];

      for (const tabrow in verificationResponse["result"]) {
        let tab = verificationResponse["result"][tabrow][0]["tab"];
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
      }
      setTableNavTabs(temptabs);
    }

    let Tablecolumns = [];
    let rowdata = [];
    if (verificationResponse) {
      for (const key in verificationResponse["result"]) {
        if (activeTableKey === verificationResponse["result"][key][0]["tab"]) {
          // setting the columns data
          let columns = verificationResponse["result"][key][0]["columns"];
          let rowObject = {};
          for (let i = 0; i < columns.length; i++) {
            rowObject[columns[i]] = "";
            Tablecolumns.push({
              name: columns[i],
              selector: (row) => {
                let rdata = String(row[columns[i]]);
                let v = rdata.split("||");
                if (v.length > 1) {
                  return <div className="text-red-700">{v[1]}</div>;
                } else {
                  return <div className="">{String(row[columns[i]])}</div>;
                }
              },
              sortable: true,
            });
          }

          let tempRow = { ...rowObject };
          setColData(Tablecolumns);
          // setting the row data
          let rawRowData = verificationResponse["result"][key];
          let noOfRows = rawRowData.length;
          for (let i = 1; i < noOfRows; i++) {
            if (rawRowData[i]) {
              let row = rawRowData[i][i];
              for (const colname in row) {
                if (rowObject[colname] === "") {
                  rowObject[colname] =
                    row[colname]["success"] === "True"
                      ? row[colname]["value"]
                      : "False||" + row[colname]["value"];
                }
              }
              rowdata.push(rowObject);
              rowObject = { ...tempRow };
            }
          }
          setRowData(rowdata);
        }
      }
      let projectResponse = verificationResponse["project_details"];
      if ("id" in projectResponse) {
        setProjectId(projectResponse["id"]);
      } else {
        setProjectId(0);
      }
    }
  }, [verificationResponse, activeTableKey]);

  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        backgroundColor: "green",
        userSelect: "none",
      },
    },
  ];
  return (
    <div>
      <div className="p-1 flex justify-around">
        <button
           className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          type="button"
          onClick={() => {
            updateComponentNumber(1);
          }}
          >
          <FormattedMessage id="Back" defaultMessage="Back" />
        </button>
        {projectId !== 0 && (
          <button
            onClick={() => {
              dispatch(clear_new_file_upload_state())
              history.push(`/visualise/${navTabIs}/${projectId}`)}}
            className={`capitalize bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded `}
          >
            <FormattedMessage id="Visualize" defaultMessage="Visualize" />
          </button>
        )}
      </div>
      <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 ">
          {tableNavTabs}
        </ul>
      </nav>
      <div className="App">
        {verificationResponse  && (
          <DataTable
            title=""
            columns={colData}
            data={rowData}
            defaultSortField="title"
            pagination
            // onRowClicked={handleRowClicked}
            conditionalRowStyles={conditionalRowStyles}
          />
        )}

        {!verificationResponse  && (
          <div>
          <LoaderCmp />
          { <p className="mt-8 text-center text-lg"><FormattedMessage id = 'WaitMessage' defaultMessage='It takes 1 or 2 minutes to process data' /> </p>}
          </div>
        )}
      </div>

      {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            updateComponentNumber(1);
          }}
        >
          <FormattedMessage id="Back" defaultMessage="Back" />
        </button>
      </div> */}
    </div>
  );
}

export default FileProjectDataTable;
