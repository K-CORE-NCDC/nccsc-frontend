import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from "../../Common/Volcano";
import GroupFilters, { PreDefienedFilters } from "../../Common/GroupFilter";
import UserDefinedGroupFilters  from "../../Common/GroupFilterUserDefined";
import { exportComponentAsPNG } from "react-component-export-image";
import NoContentMessage from "../../Common/NoContentComponent";
import { AdjustmentsIcon } from "@heroicons/react/outline";

import {
  getClinicalMaxMinInfo,
  getVolcanoPlotInfo,
} from "../../../actions/api_actions";
// import Loader from "react-loader-spinner";
import LoaderCmp from "../../Common/Loader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

const selectedCss =
  "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 xs:text-sm sm:text-sm md:text-2xl md:text-2xl ease-in-out border-gray-600 transition";
const nonSelectedCss =
  "w-1/2 rounded-l-none  hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border xs:text-sm sm:text-sm md:text-2xl md:text-2xl duration-200 ease-in-out border-teal-600 transition";

export default function DataVolcono({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const reference = useRef();
  const dispatch = useDispatch();
  const volcanoJson = useSelector(
    (data) => data.dataVisualizationReducer.volcanoSummary
  );
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );
  const [activeCmp, setActiveCmp] = useState(false);
  const [comp, setComp] = useState([]);
  // const didMountRef = useRef(false)
  const [data_, setData] = useState("");
  const [watermarkCss, setWatermarkCSS] = useState("");
  const [loader, setLoader] = useState(false);
  const [negativeData, setNegativeData] = useState();
  const [positiveData, setPositiveData] = useState();
  const [tabCount, setTabCount] = useState();
  const [groupFilters, setGroupFilters] = useState({});
  const [showVolcano, setShowVolcano] = useState(false);
  const [noContent, setNoContent] = useState(true);
  const [sampleCount, setSampleCount] = useState({});
  const [volcanoType, setVolcanoType] = useState("transcriptome");
  const [proteomeValue, setProteomeValue] = useState("N");
  const [smallScreen, setSmallScreen] = useState(false);
  let { tab, project_id } = useParams();
  const [userDefienedFilter, setUserDefienedFilter] = useState(
    project_id === undefined ? "static" : "dynamic"
  );

  const updateGroupFilters = (filtersObject) => {
    console.log(filtersObject);
    if (filtersObject) {
      setGroupFilters(filtersObject);
    }
  };

  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      console.log(project_id);
      if (project_id) {
        // dispatch(getClinicalMaxMinInfo("GET", { project_id: project_id }));
        dispatch(getClinicalMaxMinInfo("GET", {}));
      } else {
        dispatch(getClinicalMaxMinInfo("GET", {}));
      }
    }
  }, []);

  useEffect(() => {
    if (inputData) {
      setActiveCmp(false);
      if (inputData.type !== "" && Object.keys(groupFilters).length > 0) {
        setLoader(true);
        if ("volcanoProteomeType" in inputData) {
          delete inputData["volcanoProteomeType"];
        }
        if (volcanoType === "proteome") {
          inputData["volcanoProteomeType"] = proteomeValue;
        }
        inputData["filterType"] = userDefienedFilter;
        // console.log(inputData,groupFilters)
        dispatch(
          getVolcanoPlotInfo("POST", {
            ...inputData,
            filterGroup: groupFilters,
          })
        );
      }
    }
  }, [inputData, groupFilters]);

  useEffect(() => {
    if (volcanoJson) {
      if (Object.keys(volcanoJson).length > 0) {
        setActiveCmp(true);
        setData(volcanoJson);
      }
      setTimeout(function () {
        setLoader(false);
      }, 1000);

      let negative = [];
      let positive = [];
      let negativeCount = 0;
      let positiveCount = 0;
      if ("table_data" in volcanoJson) {
        volcanoJson["table_data"].forEach((item, i) => {
          // console.log(item)
          let log2foldchange = parseFloat(item["log2(fold_change)"]);
          if (log2foldchange < 0) {
            negativeCount += 1;
            negative.push({
              "Gene Name": item["gene"],
              Log2FC: parseFloat(item["log2(fold_change)"]),
              "-Log(Pvalue)": item["q_value"],
            });
          } else {
            positiveCount += 1;
            positive.push({
              "Gene Name": item["gene"],
              Log2FC: parseFloat(item["log2(fold_change)"]),
              "-Log(Pvalue)": item["q_value"],
            });
          }
        });
      }

      setTabCount({
        negative: negativeCount,
        positive: positiveCount,
      });

      setNegativeData(negative);
      setPositiveData(positive);
    }
  }, [volcanoJson]);

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark");
    } else {
      setWatermarkCSS("");
    }

    if (watermarkCss !== "" && screenCapture) {
      // exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture();
    }
  }, [screenCapture, watermarkCss]);

  useEffect(() => {
    if (volcanoJson && volcanoJson.status === 200) {
      if (volcanoJson && Object.keys(volcanoJson).length > 0) {
        setSampleCount(volcanoJson.samples);
        setShowVolcano(true);
        setNoContent(false);
      } else {
        setShowVolcano(false);
        setNoContent(true);
      }
    } else {
      setShowVolcano(false);
      setNoContent(true);
    }
  }, [volcanoJson]);

  const changeVolcanoType = (e) => {
    if (e === "transcriptome") {
      setVolcanoType("transcriptome");
      setProteomeValue("N");
    } else {
      setVolcanoType("proteome");
    }
    let d = {};
    setGroupFilters({ ...d });
  };
  const submitProteomeNT = (e) => {
    setLoader(true);

    inputData["volcanoProteomeType"] = proteomeValue;
    inputData["filterType"] = userDefienedFilter;
    dispatch(
      getVolcanoPlotInfo("POST", { ...inputData, filterGroup: groupFilters })
    );
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
            <div className="m-1 flex flex-row justify-around">
              <button
                onClick={() => changeVolcanoType("transcriptome")}
                className={
                  volcanoType === "transcriptome" ? selectedCss : nonSelectedCss
                }
              >
                Transcriptome
              </button>
              <button
                onClick={() => changeVolcanoType("proteome")}
                className={
                  volcanoType === "proteome" ? selectedCss : nonSelectedCss
                }
              >
                Proteome
              </button>
            </div>
            {volcanoType === "proteome" && (
              <>
                <h6 className="p-4 ml-1 text-left text-bold sm:text-xl lg:text-2xl text-blue-700">
                  <FormattedMessage
                    id="Choose sample type"
                    defaultMessage="Choose sample type"
                  />
                </h6>
                <div className="flex flex-col pt-6 pb-14 px-5">
                  <div className="flex-row items-center mb-4">
                    <input
                      onChange={() => setProteomeValue("N")}
                      checked={proteomeValue === "N" ? true : false}
                      id="default-radio-1"
                      type="radio"
                      value="normal"
                      name="proteome"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >
                      Normal
                    </label>
                  </div>
                  <div className="flex-row items-center mb-4">
                    <input
                      onChange={() => setProteomeValue("T")}
                      checked={proteomeValue === "T" ? true : false}
                      id="default-radio-2"
                      type="radio"
                      value="tumor"
                      name="proteome"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >
                      Tumor
                    </label>
                  </div>
                  <div className="flex-row items-center mb-4">
                    <input
                      onChange={() => setProteomeValue("NT")}
                      checked={proteomeValue === "NT" ? true : false}
                      id="default-radio-3"
                      type="radio"
                      value="normal_tumor"
                      name="proteome"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-3"
                      className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
                    >
                      Normal Vs Tumor
                    </label>
                  </div>
                </div>
              </>
            )}
            {proteomeValue !== "NT" && (
              <>
                {project_id === undefined && (
                    <h6 className="p-4 ml-1 text-left text-bold sm:text-xl lg:text-2xl text-blue-700">
                      <FormattedMessage
                        id="Choose Filter group"
                        defaultMessage="Choose Filter group"
                      />
                    </h6>
                  ) && (
                    <div className="m-1 flex flex-row justify-around">
                      {
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
                      }
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
                {userDefienedFilter === "static" &&  project_id === undefined && (
                  <PreDefienedFilters
                    volcanoType={volcanoType}
                    viz_type="volcono"
                    parentCallback={updateGroupFilters}
                    groupFilters={groupFilters}
                  />
                )}
                {userDefienedFilter === "dynamic" && project_id === undefined && (
                  <GroupFilters
                    volcanoType={volcanoType}
                    viz_type="volcono"
                    parentCallback={updateGroupFilters}
                    groupFilters={groupFilters}
                  />
                )}
                {project_id !== undefined  && (
                  <UserDefinedGroupFilters
                    volcanoType={volcanoType}
                    viz_type="volcono"
                    parentCallback={updateGroupFilters}
                    groupFilters={groupFilters}
                  />
                )}
              </>
            )}
            {proteomeValue === "NT" && (
              <button
                onClick={() => submitProteomeNT()}
                className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Submit
              </button>
            )}
            {/* <GroupFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} /> */}
            <div className="m-1 p-1 border border-black border-dashed">
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left">{`Blue: Log2FC <= -1.5 & pvalue >= 0.05`}</p>
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left">{`Red: Log2FC >= 1.5 & pvalue >= 0.05`}</p>
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left">
                Grey: Not significant gene
              </p>
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left">
                Black: Selected genes
              </p>
            </div>
          </div>
          <div
            className={`lg:w-4/5 md:w-4/5 sm:w-full lg:block ${
              smallScreen ? "xs:absolute" : "xs:w-full"
            }`}
            style={{ overflowX: "scroll" }}
          >
            {showVolcano && (
              <VolcanoCmp
                watermarkCss={watermarkCss}
                ref={reference}
                w={width}
                data={volcanoJson["d3_response"]}
                negative_data={negativeData}
                positive_data={positiveData}
                tab_count={tabCount}
                tableData={volcanoJson["table_data"]}
              />
            )}
            {noContent && <NoContentMessage />}
          </div>
        </div>
      )}
    </>
  );
}
