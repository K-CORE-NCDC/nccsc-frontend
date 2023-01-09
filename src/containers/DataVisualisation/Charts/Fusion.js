import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupFilters, {
  PreDefienedFilters,UserDefinedGroupFilters
} from "../../Common/FusionGroupFilter";
// import UserDefinedGroupFilters  from "../../Common/GroupFilterUserDefined";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import FusionVennCmp from "../../Common/FusionVenn";
import { useParams } from "react-router-dom";

import {
  getClinicalMaxMinInfo,
  getFusionVennDaigram,
  clearFusionVennDaigram
} from "../../../actions/api_actions";
// import Loader from "react-loader-spinner";
import LoaderCmp from "../../Common/Loader";
import FusionCustomPlot from "../../Common/FusionCustomPlot";
import { FormattedMessage } from "react-intl";
import DataTable from "react-data-table-component";
import { selector } from "d3";
const selectedCss =
  "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 xs:text-sm sm:text-sm md:text-2xl md:text-2xl ease-in-out border-gray-600 transition";
const nonSelectedCss =
  "w-1/2 rounded-l-none  hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border xs:text-sm sm:text-sm md:text-2xl md:text-2xl duration-200 ease-in-out border-teal-600 transition";

export default function FusionPlot({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [sampleCount, setSampleCount] = useState({});
  const [groupFilters, setGroupFilters] = useState({});
  const [tableData, setTableData] = useState([]);
  const [fusionId, setFusionId] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [noData, setNoData] = useState('false')
  const [firstTime, setFirstTime] = useState(true)
  let { tab, project_id } = useParams();
  const [userDefienedFilter, setUserDefienedFilter] = useState(
    project_id === undefined ? "static" : "dynamic"
  );
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );
  const VennData = useSelector(
    (data) => data.dataVisualizationReducer.VennData
  );
  const circosSanpleRnidListData = useSelector(
    (data) => data.dataVisualizationReducer.Keys
  );

  const tableColumnsData = [
    {
      name: "Sample Name",
      cell: (row, index) => {
        let html = [];
        let check = false;
        if ("group 1" in row) {
          let s = row["group 1"];
          
          html.push(
            <p>
              <strong>Group 1:</strong> {s.join(",")}
            </p>
          );
          check = true;
        }
        if ("group 2" in row) {
          let s = row["group 2"];
          html.push(
            <p>
              <strong>Group 2:</strong> {s.join(",")}
            </p>
          );
          check = true;
        }
        if ("group 3" in row) {
          let s = row["group 3"];
          html.push(
            <p>
              <strong>Group 3:</strong> {s.join(",")}
            </p>
          );
          check = true;
        }
        if (!check) {
          let s = row["sample_id"];
          s = [...new Set(s)]
          html.push(s.join(","));
          // html.push(s);
        }
        let main_html = [];
        main_html.push(
          <div className="flex flex-col w-full text-left">{html}</div>
        );
        return main_html;
      },
      sortable: true,
    },
    {
      name: "Left Gene Name",
      selector: (row) => row.left_gene_name,
      sortable: true,
    },
    {
      name: "Left Ensembl Id",
      selector: (row) => row.left_gene_ensmbl_id,
      sortable: true,
    },
    {
      name: "Left Breakpoint",
      cell: (row, index) => {
        return row.left_gene_chr + ":" + row.left_hg38_pos;
      },
      sortable: true,
    },
    {
      name: "Right Gene Name",
      selector: (row) => row.right_gene_name,
      sortable: true,
    },
    {
      name: "Right Ensembl Id",
      selector: (row) => row.right_gene_ensmbl_id,
      sortable: true,
    },
    {
      name: "Right Breakpoint",
      cell: (row, index) => {
        return row.right_gene_chr + ":" + row.right_hg38_pos;
      },
      sortable: true,
    },
    {
      button: true,
      cell: (row, index, column, id) => {
        return (
          <button
            onClick={(e) => generateFusion(e, row.id)}
            id={row.id}
            className="bg-main-blue hover:bg-main-blue mb-3 w-50  text-md text-white mt-2 px-8 py-4 border border-blue-700 rounded"
          >
            View
          </button>
        );
      },
    },
  ];

  const generateFusion = (e, id) => {
    setFusionId(id);
  };

  const updateGroupFilters = (filtersObject) => {
    if (filtersObject) {
      setGroupFilters(filtersObject);
    }
  };

  useEffect(() => {
    dispatch(clearFusionVennDaigram())
    setGroupName("")
    setNoData('true')
    setTableData([])
    if (inputData) {
      if (
        inputData.type !== "" &&
        Object.keys(groupFilters).length > 0 &&
        inputData["genes"].length > 0
      ) {
        setLoader(true);
        inputData["filterType"] = userDefienedFilter;
        dispatch(
          getFusionVennDaigram("POST", {
            ...inputData,
            filterGroup: groupFilters,
          })
        );
 
      }
    }
  }, [inputData, groupFilters,userDefienedFilter]);

  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      dispatch(getClinicalMaxMinInfo("GET", {}));
    }
  }, []);

  useEffect(() => {
    setNoData('true')
    setTableData([])
    if (VennData) {
      
      if (VennData.status === 200 && Object.keys(VennData['res']).length !== 0) {
        setLoader(false);
        setNoData('false')
      }
      else if(VennData.status !== 200){
        setLoader(false);
        setNoData('true')
      }
    }


  }, [VennData]);

  const getVennIds = (key) => {
    if (key.length > 0) {
      setFusionId(0);
      let name = key.split("_");
      let t = "Unique";

      if (name.length > 1) {
        t = "Core";
      }
      let tmp_name = name.join(" & ");
      tmp_name = tmp_name.replace(/g/g, "G");
      tmp_name = tmp_name.replace(/a/g, "A");
      tmp_name = tmp_name.replace(/b/g, "B");
      tmp_name = tmp_name.replace(/c/g, "C");
      tmp_name += " : " + t + " Fusion Gene Table ";
      setGroupName(tmp_name);
      let r = VennData.res.data;
      setTableData(r[key]);
    }
  };

  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        <div className="flex flex-row justify-around">
          <div className={`lg:hidden md:hidden xs:ml-8`}>
            <button
              className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={() => setSmallScreen(!smallScreen)}
              type="button"
            >
              <AdjustmentsIcon className="h-6 w-6 inline" />
            </button>
          </div>
          <div
            id="filterBox"
            className={`lg:w-1/5 md:w-4/5 lg:block md:block lg:block sm:hidden ${
              smallScreen
                ? "xs:mr-80 xs:z-10 xs:opacity-95 xs:bg-white"
                : "xs:hidden"
            } `}
          >
            <div>
              {sampleCount && Object.keys(sampleCount).length > 0 && (
                <div className="m-1 p-1 border border-black border-dashed">
                  {Object.keys(sampleCount).map((e) => (
                    <div
                      key={e}
                      className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue"
                    >
                      Group {e} : {sampleCount[e]}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {project_id === undefined && (
              <div className="m-1 flex flex-row justify-around">
                <button
                  onClick={() => {
                    setUserDefienedFilter("static");
                    setGroupFilters({});
                  }}
                  className={
                    userDefienedFilter === "static"
                      ? selectedCss
                      : nonSelectedCss
                  }
                >
                  <FormattedMessage
                    id="Static_volcano"
                    defaultMessage="Static"
                  />
                </button>
                <button
                  onClick={() => {
                    setUserDefienedFilter("dynamic");
                    setGroupFilters({});
                  }}
                  className={
                    userDefienedFilter === "dynamic"
                      ? selectedCss
                      : nonSelectedCss
                  }
                >
                  <FormattedMessage
                    id="Dynamic_volcano"
                    defaultMessage="Dynamic"
                  />
                </button>
              </div>
            )}

            {userDefienedFilter === "static" && project_id === undefined && (
              <PreDefienedFilters
                viz_type="fusion"
                parentCallback={updateGroupFilters}
                groupFilters={groupFilters}
              />
            )}
            {userDefienedFilter === "dynamic" && project_id === undefined && (
              <GroupFilters
                viz_type="fusion"
                parentCallback={updateGroupFilters}
                groupFilters={groupFilters}
              />
            )}
            { project_id !== undefined && (
              <UserDefinedGroupFilters
                viz_type="fusion"
                parentCallback={updateGroupFilters}
                groupFilters={groupFilters}
              />
            )}
          </div>
          <div
            className={`lg:w-4/5 md:w-4/5 sm:w-full lg:block ${
              smallScreen ? " xs:absolute" : "xs:w-full"
            }`}
          >
            {VennData && noData === 'false' && (
              <FusionVennCmp
                parentCallback={getVennIds}
                VennData={VennData}
                width={width}
              />
            )}
            {
              noData === 'true' && firstTime === false && (
                <div
                className="mt-20  w-11/12 mx-auto"
                style={{
                  textAlign: "center",
                  marginBottom: "-42px",
                  lineHeight: "1.4",
                  fontSize: "25px",
                }}
                >
                <h1>  No Data Found</h1>
                </div>
              )
            }
             {Object.keys(groupFilters).length === 0 && <p>Please Select the Filter Data</p>}
            {VennData && noData === 'false' && fusionId !== 0 &&  (
              <div className="mt-5 my-0 mx-auto h-auto w-11/12 shadow-lg">
                <FusionCustomPlot fusionId={fusionId}  />
              </div>
            )}
            {VennData && noData === 'false' && tableData.length > 0 && (
              <div>
                <div
                  className="mt-20  w-11/12 mx-auto"
                  style={{
                    textAlign: "start",
                    marginBottom: "-42px",
                    lineHeight: "1.4",
                    fontSize: "12px",
                  }}
                >
                  <p>
                    Fusion gene detected in at least 1 patient in a paitent
                    group is counted.
                  </p>

                  <p>Core : Fusion genes found in both Group 1 and Group 2</p>

                  <p>Unique : Fusion genes found in certain patient group.</p>
                </div>
                <div className="mt-20 my-0 mx-auto  w-11/12 shadow-lg">
                  <div className="bg-white border-b border-gray-200 py-5 text-left px-5">
                    {groupName}
                  </div>
                 { VennData && noData === 'false' && <DataTable
                    pagination
                    columns={tableColumnsData}
                    data={tableData}
                  />
                }
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
