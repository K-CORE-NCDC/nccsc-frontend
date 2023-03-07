/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import VolcanoCmp from "../../Common/Volcano";
import GroupFilters, { PreDefienedFilters } from "../../Common/GroupFilter";
import UserDefinedGroupFilters  from "../../Common/GroupFilterUserDefined";
import NoContentMessage from "../../Common/NoContentComponent";
import swal from 'sweetalert';

import {
  getClinicalMaxMinInfo,
  VolcanoPlotInfo
} from "../../../actions/api_actions";
import LoaderCmp from "../../Common/Loader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

const selectedCss =
  "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200  ease-in-out border-gray-600 transition text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md";
const nonSelectedCss =
  "w-1/2 rounded-l-none  hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md";

export default function DataVolcono({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const reference = useRef();
  const dispatch = useDispatch();
  const [volcanoJson, setVolcanoJson]= useState({'status':204})
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );

  const tabList = useSelector(
    (data) => data.dataVisualizationReducer
  );

  const [activeCmp, setActiveCmp] = useState(false);
  const [data_, setData] = useState("");
  const [watermarkCss, setWatermarkCSS] = useState("");
  const [loader, setLoader] = useState(false);
  const [negativeData, setNegativeData] = useState();
  const [positiveData, setPositiveData] = useState();
  const [tabCount, setTabCount] = useState();
  const [groupFilters, setGroupFilters] = useState({});
  const [showVolcano, setShowVolcano] = useState(false);
  const [noContent, setNoContent] = useState(false);
  const [sampleCount, setSampleCount] = useState({});
  const [volcanoType, setVolcanoType] = useState("transcriptome");
  const [proteomeValue, setProteomeValue] = useState("N");
  const [smallScreen, setSmallScreen] = useState(false);
  const [alltabList, setAllTabList] = useState({});
  let { tab, project_id } = useParams();
  
  const [userDefienedFilter, setUserDefienedFilter] = useState(
    project_id === undefined ? "static" : "dynamic"
  );
  

  useEffect(()=>{
    if('userProjectsDataTable' in tabList ){
      setAllTabList(tabList.userProjectsDataTable)
    }
    
    },[tabList])

  const updateGroupFilters = (filtersObject) => {

    if (filtersObject) {
     
        swal("If processed information is big, it takes time to Load",{
          closeOnClickOutside: false,
          buttons: ["Cancel", "Continue"],
          className:"text-center"
        })
          .then((value) => {
            setTimeout(()=>{
            if(value)
            setGroupFilters(filtersObject);
            },1000)
          });
    
      
    }
  };
  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      if (project_id) {
        return false
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
        if(project_id ){
          inputData['project_id'] = parseInt(project_id)
        }
        let return_data = VolcanoPlotInfo("POST", { ...inputData, filterGroup: groupFilters })
        return_data.then((result) => {
          const d = result
          if (d.status === 200) {
            let r_ = d["data"]
            r_["status"] = 200
            setVolcanoJson(r_)
          } else {
            setVolcanoJson({'status':204})
          }
        })
        .catch((e) => {
          setVolcanoJson({'status':204})
        });
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
          let log2foldchange = parseFloat(item["log2(fold_change)"]);
          if (log2foldchange < 0) {
            negativeCount += 1;
            negative.push({
              "Gene Name": item["gene"],
              Log2FC: parseFloat(item["log2(fold_change)"]),
              "-Log(Pvalue)": item["q_value"],
            });
            // console.log('item["q_value"]',item["q_value"]);
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
    } else if (volcanoJson && (volcanoJson.status !== undefined)) {
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
    if(project_id === undefined){
      let return_data = VolcanoPlotInfo("POST", { ...inputData, filterGroup: groupFilters })
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          r_["status"] = 200
          setVolcanoJson(r_)
        } else {
          setVolcanoJson({'status':204})
        }
      })
      .catch((e) => {
        setVolcanoJson({'status':204})
      });
    }
    else{
      let return_data = VolcanoPlotInfo("POST", { ...inputData, filterGroup: groupFilters })
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          r_["status"] = 200
          setVolcanoJson(r_)
        } else {
          setVolcanoJson({'status':204})
        }
      })
      .catch((e) => {
        setVolcanoJson({'status':204})
      });
      // userDefinedGetVolcanoPlotInfo("POST", { ...inputData, filterGroup: groupFilters });
    }
  };

  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        <div className="flex flex-row justify-around">
          
          <div
            className={`lg:w-1/5 md:w-4/5 lg:block md:block lg:block sm:hidden text-base sm:text-sm md:text-md lg:text-base xl:text-2xl  2xl:text-md bg-white ${
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
                <FormattedMessage id="Transcriptome" defaultMessage="Transcriptome" />
              </button>
              {project_id !== undefined &&  alltabList['proteome'] && <button
                onClick={() => changeVolcanoType("proteome")}
                className={
                  volcanoType === "proteome" ? `${ alltabList['proteome'] ? `${selectedCss} hidden` : selectedCss}` : `${nonSelectedCss}`
                }
              >
                <FormattedMessage id="Proteome" defaultMessage="Proteome" />
              </button> }

            { project_id === undefined &&
              <button
              onClick={() => changeVolcanoType("proteome")}
              className={
                volcanoType === "proteome" ? selectedCss: nonSelectedCss
              }
              >
                <FormattedMessage id="Proteome" defaultMessage="Proteome" />
              </button>
              }
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
                      <FormattedMessage id="Normal" defaultMessage="Normal" />
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
                      className="ml-2  text-gray-900 dark:text-gray-300"
                    >
                      <FormattedMessage id="Tumor" defaultMessage="Tumor" />
                    </label>
                  </div>
                  <div className="flex-row items-center mb-4">
                    <input
                      onChange = {() => setProteomeValue("NT")}
                      checked = {proteomeValue === "NT" ? true : false}
                      id = "default-radio-3"
                      type = "radio"
                      value = "normal_tumor"
                      name = "proteome"
                      className = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-3"
                      className="ml-2 text-gray-900 dark:text-gray-300"
                    >
                      <FormattedMessage id="TumorVsNormal" defaultMessage="Normal vs Tumor" />
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
               <FormattedMessage
                            id="Submit_volcano"
                            defaultMessage="Submit"
                          />
              </button>
            )}
            {/* <GroupFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} /> */}
            <div className="m-1 p-1 border border-black border-dashed">
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left"><FormattedMessage id="Blue" defaultMessage = "Blue :" />{`Blue: Log2FC <= -1.5 & pvalue <= 0.05`}</p>
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left"><FormattedMessage id="Red" defaultMessage = "Red :" />{`Log2FC >= 1.5 & pvalue <= 0.05`}</p>
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left">
              <FormattedMessage id="Grey" defaultMessage = "Grey :" /> Not significant gene
              </p>
              <p className="text-blue-900 lg:text-lg sm:text-xl xs:text-sm font-bold text-left">
              <FormattedMessage id="Black" defaultMessage = "Black :" /> Selected genes
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
            {Object.keys(groupFilters).length === 0 && <p><FormattedMessage id="PleaseSelectFilterData" defaultMessage = "Please Select the Filter Data" /></p>}
          </div>
        </div>
      )}
    </>
  );
}
