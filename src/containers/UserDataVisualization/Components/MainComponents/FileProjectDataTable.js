import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";

function FileProjectDataTable({updateComponentNumber}) {
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);
  const [activeTableKey, setActiveTableKey] = useState("clinical_information");

  const verificationResponse = useSelector(
    (data) => data.homeReducer.uploadClinicalColumns
  );

  // const tabDropdownTable = (tab) => {
  //   // console.log("tab", tab);
  //   setActiveTableKey(tab);
  //   if (clinicalfileresponse && clinicalfileresponse["res"].length > 0) {
  //     for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
  //       let row = clinicalfileresponse["res"][i];
  //       let column = row["columns"];
  //       let types = row["types"];
  //       let tab = row["tab"];
  //       processColumns(column, tab, types);
  //     }
  //     // console.log("clinincalFilterColumns", clinincalFilterColumns);
  //   }
  // };

  // useEffect(() => {
  //   // console.log("==============clinicalfileresponse==========",clinicalfileresponse);
  //   if (clinicalfileresponse && clinicalfileresponse["res"].length > 0) {
  //     let temptabs = [];
  //     for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
  //       setColumnTypes(clinicalfileresponse["res"][i]["types"]);
  //       let row = clinicalfileresponse["res"][i];
  //       let tab = row["tab"];
  //       let css = "px-4 py-2 font-semibold rounded-t opacity-50";
  //       if (activeTableKey === tab) {
  //         css += " border-blue-400 border-b-4 -mb-px opacity-100";
  //       }
  //       temptabs.push(
  //         <li key={tab} className={css}>
  //           <button
  //             value={tab}
  //             onClick={() => tabDropdownTable(tab)}
  //             className="capitalize"
  //           >
  //             {tab}
  //           </button>
  //         </li>
  //       );
  //       let columns = row["columns"];
  //       let types = row["types"];
  //       processColumns(columns, tab, types);
  //     }
  //     setTableNavTabs(temptabs);
  //   } else if (clinicalfileresponse) {
  //     for (let i = 0; i < clinicalfileresponse["res"].length; i++) {
  //       if (clinicalfileresponse["res"][i]["tab"] === activeTableKey) {
  //         setMessage(clinicalfileresponse["res"][i]["message"]);
  //       }
  //     }
  //   }
  // }, [clinicalfileresponse]);
  const tabDropdownTable = (tab) => {
    setActiveTableKey(tab);
  };
  useEffect(() => {
    console.log("active tbale key", activeTableKey);

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
      console.log("tabs are", temptabs);
      setTableNavTabs(temptabs);
    }

    let Tablecolumns = [];
    let rowdata = [];
    if (verificationResponse) {
      for (const key in verificationResponse["result"]) {
        if (activeTableKey === verificationResponse["result"][key][0]["tab"]) {
          // console.log("verificationResponse['result'][key]",verificationResponse['result'][key]);

          // setting the columns data
          let columns = verificationResponse["result"][key][0]["columns"];
          let rowObject = {};
          for (let i = 0; i < columns.length; i++) {
            rowObject[columns[i]] = "";
            Tablecolumns.push({
              name: columns[i],
              selector: (row) => {
                // console.log("row",row);
                // console.log("columns",columns[i]);
                let v = row[columns[i]].split("||");
                if (v.length > 1) {
                  return <div className="text-red-700">{v[1]}</div>;
                } else {
                  return <div className="">{row[columns[i]]}</div>;
                }
                // if (row.dna === "YES") {
                // }
              },
              sortable: true,
            });
          }
          // console.log("co",columns);
          let tempRow = { ...rowObject };
          setColData(Tablecolumns);

          // setting the row data

          let rawRowData = verificationResponse["result"][key];
          let noOfRows = rawRowData.length;
          for (let i = 1; i < noOfRows; i++) {
            if (rawRowData[i]) {
              let row = rawRowData[i][i];
              for (const colname in row) {
                // console.log(colname, row[colname]);
                if (rowObject[colname] === "") {
                  rowObject[colname] =
                    row[colname]["success"] === "True"
                      ? row[colname]["value"]
                      : "False||" + row[colname]["value"];
                }
                // rowObject[colname] = row[colname]['value']
              }
              rowdata.push(rowObject);
              rowObject = { ...tempRow };

              // console.log(rowdata);
              // rowObject = temprowObject
            }
          }
          console.log("rowdata", rowdata);
          setRowData(rowdata);
        }
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
      <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 ">
          {tableNavTabs}
        </ul>
      </nav>
      <div className="App">
        <DataTable
          title=""
          columns={colData}
          data={rowData}
          defaultSortField="title"
          pagination
          // onRowClicked={handleRowClicked}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>

      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            updateComponentNumber(1)
          }}  
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default FileProjectDataTable;
