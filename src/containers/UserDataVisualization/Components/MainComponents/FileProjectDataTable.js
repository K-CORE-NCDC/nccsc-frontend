import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function FileProjectDataTable({ verificationResponse, activeTableKey }) {
  const [rowData, setRowData] = useState([]);
  const [colData, setColData] = useState([]);
  const [tableNavTabs, setTableNavTabs] = useState([]);

  useEffect(() => {
    const tabDropdownTable = (tab) => {
      console.log("tab", tab);
      // setActiveTableKey(tab)

      // console.log("clinincalFilterColumns", clinincalFilterColumns);
    };

    if (verificationResponse && verificationResponse["result"]) {
      let temptabs = [];
      for (const tabrow in verificationResponse["result"]) {
        console.log(tabrow);
        console.log(verificationResponse["result"][tabrow][0]["tab"]);
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

    console.log("verificationResponse", verificationResponse);
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
                console.log("row",row);
                console.log("columns",columns[i]);
                let v = row[columns[i]].split('||')
                if(v.length > 1){
                  return <div className="text-red-700">{v[1]}</div>
                }else{
                  return <div className="">{row[columns[i]]}</div>
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
                      : "False||"+row[colname]["value"];
                }
                // rowObject[colname] = row[colname]['value']
              }
              rowdata.push(rowObject);
              rowObject = { ...tempRow };

              // console.log(rowdata);
              // rowObject = temprowObject
            }
          }
          // console.log(rowdata);
          setRowData(rowdata);
        }
      }
    }
  }, [verificationResponse]);
  console.log("colData", colData);

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
      {/* <nav className=" px-8 pt-2 shadow-md">
        <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 ">
          {tableNavTabs}
        </ul>
      </nav> */}
      <div className="App">
        <DataTable
          title="Movies"
          columns={colData}
          data={rowData}
          defaultSortField="title"
          pagination
          // onRowClicked={handleRowClicked}
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>

      {/* <div className="App">
      <table>
        <tr>
{colData.map((val,key)=>{

   return (<th>{colData[key]['name']}</th>)
})}
        </tr>
        {rowData.map((val, key) => {
          return (
            <tr key={key}>
              <td>{colData[key] && val[colData[key]['name']]}</td>
              <td>{val.bmi_vl}</td>
              <td>{val.drnk_yn}</td>
            </tr>
          )
        })}
      </table>
    </div> */}
    </div>
  );
}

export default FileProjectDataTable;
