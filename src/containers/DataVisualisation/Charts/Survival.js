import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import SurvivalCmp from "../../Common/Survival";
import {
  SurvivalInformation,
  getClinicalMaxMinInfo,
} from "../../../actions/api_actions";
import { exportComponentAsJPEG } from "react-component-export-image";
import GroupFilters, { PreDefienedFiltersSurvival } from "../../Common/GroupFilter";
import UserDefinedGroupFilters from "../../Common/GroupFilterUserDefined";
import NoContentMessage from "../../Common/NoContentComponent";
import { useParams } from "react-router-dom";
import LoaderCmp from "../../Common/Loader";
import { FormattedMessage } from "react-intl";
import inputJson from "../../Common/data";

export default function DataSurvival({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const reference = useRef();
  const route = useLocation();
  const dispatch = useDispatch();
  const [survivalJson, setSurvivalJson] = useState({})
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );
  const [watermarkCss, setWatermarkCSS] = useState("");
  const [genesArray, setGenesArray] = useState([]);
  const [fileredGene, setFilteredGene] = useState("");
  const [reqstMsg, setReqstMsg] = useState(true)
  const [loader, setLoader] = useState(true);
  const [groupFilters, setGroupFilters] = useState(null);
  const [geneDatabase, setGeneDatabase] = useState("dna_mutation");
  const [sampleCountsCard, setSampleCountsCard] = useState([]);
  const [renderSurvival, setRenderSurvival] = useState(true);
  const [renderNoContent, setRenderNoContent] = useState(false);
  const [filterTypeButton, setFilterTypeButton] = useState("clinical");
  const [vizType, setVizType] = useState("single")

  let { project_id } = useParams();
  const [userDefienedFilter, setUserDefienedFilter] = useState(
    project_id === undefined ? "static" : "dynamic"
  );
  const [alltabList, setAllTabList] = useState({});
  const tabList = useSelector(
    (data) => data.dataVisualizationReducer
  );

  useEffect(() => {
    if ('userProjectsDataTable' in tabList) {
      setAllTabList(tabList.userProjectsDataTable)
    }

  }, [tabList])

  useEffect(() => {
    if (route.pathname.includes('visualise-singledata')) {
      setVizType("single")
    }
    else {
      setVizType("multi")
    }
  }, [route.pathname])
  const [coxUserDefinedFilter, setCoxUserDefinedFilter] = useState({})
  const [survivalModel, setSurvivalModel] = useState("recurrence");
  const [pValueData, setPvalueData] = useState("");
  const smallScreen = false
  const [coxTable, setCoxTable] = useState([]);
  const [coxNoData, setCoxNoData] = useState(true)
  const userDefinedFilterColumns = useSelector(
    (data) => data.dataVisualizationReducer.userDefinedFilter
  );

  const [coxFilter, setCoxFilter] = useState({
  });

  useEffect(() => {
    if (userDefinedFilterColumns && userDefinedFilterColumns["filterJson"] && userDefinedFilterColumns["filterJson"]["Clinical Information"] && Object.keys(userDefinedFilterColumns).length > 0) {
      setCoxUserDefinedFilter(userDefinedFilterColumns["filterJson"]["Clinical Information"])
    }
  }, [userDefinedFilterColumns])

  useEffect(() => {
    if (survivalModel === "cox" && project_id !== undefined) {
      let tmpe = {}
      if (coxUserDefinedFilter && Object.keys(coxUserDefinedFilter).length > 0) {
        for (const a in coxUserDefinedFilter) {
          if (a !== 'rlps_yn' && a !== 'rlps_cnfr_drtn') {
            if ('value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'yes' && 'value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'no') {
              continue
            }
            else {
              tmpe[a] = false
            }

          }
        }
        setCoxFilter(tmpe)
      }
    }
    else {

      let tmp = [
        "BodyMassIndex",
        "AlcoholConsumption",
        "FamilyHistoryofBreastCancer",
        "IntakeOfContraceptivePill",
        "HormoneReplaceTherapy",
        "Menopause",
        "Childbirth",
        "DiagnosisofBilateralBreastCancer",
        "FirstMenstrualAge",
        "ERTestResults",
        "PRTestResults",
        "Ki67Index",
        "AgeOfDiagnosis",
      ];
      let tmpe = {}
      for (let i = 0; i < tmp.length; i++) {

        tmpe[tmp[i]] = false
      }
      setCoxFilter(tmpe)
    }
  }, [survivalModel])


  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      if (project_id === undefined) {
        dispatch(getClinicalMaxMinInfo("GET", {}));
      }
    }
  }, []);

  let check = (d) => {
    let check = false
    for (let key in d["sample_counts"]) {
      if (d["sample_counts"][key] !== 0) {
        check = true
      }
    }
    return check
  }

  const submitFitersAndFetchData = () => {
    if (fileredGene !== "" || filterTypeButton === "clinical") {
      setLoader(true);
      inputData["filterType"] = userDefienedFilter;
      inputData["survival_type"] = survivalModel;
      if (groupFilters) {
        setReqstMsg(false)
        if (filterTypeButton === "clinical") {
          let return_data = SurvivalInformation("POST", {
            ...inputData,
            filter_gene: fileredGene,
            gene_database: geneDatabase,
            group_filters: groupFilters,
            clinical: true,
          })
          return_data.then((result) => {
            const d = result
            if (d.status === 200 && "data" in d && check(d["data"])) {
              let r_ = d["data"]
              r_['status'] = 200
              setSurvivalJson(r_)
              setRenderNoContent(false)
            } else {
              setRenderNoContent(true)
              setSurvivalJson({ status: d.status })
            }
          })
            .catch((e) => {
              setSurvivalJson({ status: 204 })
            });
        } else {
          let return_data = SurvivalInformation("POST", {
            ...inputData,
            filter_gene: fileredGene,
            gene_database: geneDatabase,
            group_filters: groupFilters,
            clinical: true,
          })
          return_data.then((result) => {
            const d = result
            if (d.status === 200 && "data" in d && check(d["data"])) {
              let r_ = d["data"]
              r_['status'] = 200
              setSurvivalJson(r_)
              setRenderNoContent(false)
            } else {
              setRenderNoContent(true)
              setSurvivalJson({ status: d.status })
              setRenderNoContent(true)
            }
          })
            .catch((e) => {
              setSurvivalJson({ status: 204 })
            });
        }
      } else {
        setReqstMsg(true)
      }

    } else {
      setLoader(true);
      let return_data = SurvivalInformation("POST", inputData)
      return_data.then((result) => {
        const d = result
        if (d.status === 200 && "data" in d && check(d["data"])) {
          let r_ = d["data"]
          r_['status'] = 200
          setSurvivalJson(r_)
          setRenderNoContent(false)
        } else {
          setRenderNoContent(true)
          setSurvivalJson({ status: d.status })
          setRenderNoContent(true)
        }
      })
        .catch((e) => {
          setSurvivalJson({ status: 204 })
        });
    }
  };


  useEffect(() => {
    if (inputData) {
      if (inputData.type !== "") {
        submitFitersAndFetchData();
      }
    }
  }, [inputData, groupFilters]);

  useEffect(() => {
    if (inputData && inputData.genes) {
      setGenesArray(inputData.genes);
    }
  }, [inputData]);

  useEffect(() => {
    setTimeout(function () {
      setLoader(false);
    }, 1000);
    if (survivalModel === "recurrence") {
      if (survivalJson && survivalJson.sample_counts) {
        const sampleCountsObject = survivalJson.sample_counts;
        let totalCount = 0;
        let htmlArray = [];
        if (Object.keys(sampleCountsObject).length > 0) {
          Object.keys(sampleCountsObject).forEach((e) => {
            totalCount += sampleCountsObject[e];
            htmlArray.push(
              <div
                key={e}
                className="SurvivalSampleCount"
              >
                <FormattedMessage id={e} defaultMessage={e} />{" "}
                {`: ${sampleCountsObject[e]}`}
              </div>
            );
          });
        }
        if (htmlArray.length > 1) {
          if (survivalJson.pvalue !== 0) {
            setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`);
          }
          setSampleCountsCard([
            <div
              key="total"
              className="SurvivalSampleCount"
            >
              <FormattedMessage id="Total" defaultMessage="Total" /> :{" "}
              {totalCount}
            </div>,
            ...htmlArray,
          ]);
        } else {
          if (survivalJson.pvalue !== 0) {
            setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`);
          }
          setSampleCountsCard([
            <div
              key="total"
              className="SurvivalSampleCount"
            >
              <FormattedMessage id="Total" defaultMessage="Total" /> :{" "}
              {totalCount}
            </div>,
          ]);
        }
      }
    }
    else if (survivalModel === "cox") {
      let inputDataJson = {};
      if (project_id) {
        if (coxUserDefinedFilter && Object.keys(coxUserDefinedFilter).length > 0) {
          for (const a in coxUserDefinedFilter) {
            if (a !== 'rlps_yn' && a !== 'rlps_cnfr_drtn') {
              if ('value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'yes' && 'value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'no') {
                continue
              }
              else {
                inputDataJson[a] = a
              }

            }
          }
        }
      }
      else {
        for (let z = 0; z < inputJson["filterChoices"].length; z++) {
          inputDataJson[inputJson["filterChoices"][z]["id"]] = inputJson["filterChoices"][z]["name"];
        }
      }

      let tmp = [];
      let columns = survivalJson && 'columns' in survivalJson && survivalJson["columns"];
      let thead = [<th key={'rows'}></th>];
      let data = survivalJson && 'data' in survivalJson && JSON.parse(survivalJson["data"]);
      let cf = survivalJson && 'clinical_filter' in survivalJson && survivalJson["clinical_filter"];
      let image = survivalJson && 'image' in survivalJson && survivalJson["image"];
      let trow = [];
      if (columns) {
        for (let c = 0; c < columns.length; c++) {
          thead.push(
            <th
              className="FontMedium TextGray900 P0625"
              key={`${c}'_'${columns[c]}`}
            >
              {columns[c]}
            </th>
          );
        }
      }
      if (cf) {
        for (let c = 0; c < cf.length; c++) {
          let col = cf[c];
          let td = [];
          td.push(
            <td key={col} className="TextGray900 P0625">
              {col}
            </td>
          );
          for (const key in data) {
            let v = data[key][col];
            v = parseFloat(v).toFixed(2);

            td.push(
              <td
                key={`${col}"_"${key}"_"${v}`}
                className="TextGray900 P0625"
              >
                {v}
              </td>
            );
          }

          trow.push(
            <tr className="BorderBottom1 PY1" key={`coxtr_${c}`}>
              {td}
            </tr>
          );
        }
      }

      tmp.push(
        <div className="Flex FlexDirCol" key={"cox"}>

          {/* Coefficient Table */}
          <div className="Backgroundwhite  TextLeft  ShadowLarge" key={"co"}>
            <h3 className="BorderBottom1 BorderGray200 P4">
              <FormattedMessage id="Co-efficientTable" defaultMessage="Co-efficient Table" />
            </h3>
            <table className="Table WFull">
              <thead className="BorderBottom1">
                <tr>{thead}</tr>
              </thead>
              <tbody>{trow}</tbody>
            </table>
          </div>

          {/* Confidence Intreval Plot */}
          <div
            key={"ci"}
            className="Flex FlexDirCol MarginTop20 Backgroundwhite  TextLeft  ShadowLarge WFull"
          >
            <h3 className="BorderBottom1 BorderGray200 P8">
              <FormattedMessage id="ConfidenceIntervalPlot" defaultMessage="Confidence Interval Plot" />
            </h3>
            <div className="WFull">
              <img
                alt="box-plot"
                width="960"
                src={"data:image/png;base64," + image}
              />
            </div>
          </div>
        </div>
      );
      setCoxTable(tmp);
    }
  }, [survivalJson]);

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark");
    } else {
      setWatermarkCSS("");
    }

    if (watermarkCss !== "" && screenCapture) {
      if (reference !== null) {
        exportComponentAsJPEG(reference, {
          'fileName': 'Survival', html2CanvasOptions: {
          }
        });
      }
      setToFalseAfterScreenCapture();
    }
  }, [screenCapture, watermarkCss]);

  const updateGroupFilters = (filtersObject) => {
    if (filtersObject) {
      setGroupFilters(filtersObject);
    }
  };

  useEffect(() => {
    if (survivalJson && survivalJson.status === 200) {
      setRenderSurvival(true);
      setCoxNoData(false)
    } else if (survivalJson && survivalJson.status !== 200) {
      setRenderSurvival(false);
      setCoxNoData(false)
    }
  }, [survivalJson]);

  const selectCoxFiler = (e) => {
    let val_ = e.target.value;
    let check = e.target.checked;
    if (check) {
      setCoxFilter({ ...coxFilter, [val_]: true });
    } else {
      setCoxFilter({ ...coxFilter, [val_]: false });
    }
  };
  let tmp = []
  if (project_id !== undefined) {
    if (coxUserDefinedFilter && Object.keys(coxUserDefinedFilter).length > 0) {
      for (const a in coxUserDefinedFilter) {
        if (a !== 'rlps_yn' && a !== 'rlps_cnfr_drtn') {
          if ('value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'yes' && 'value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'no') {
            continue
          }
          else {
            tmp.push(a);
          }

        }
      }
    }
  }
  else {

    let tmpe = [
      "BodyMassIndex",
      "AlcoholConsumption",
      "FamilyHistoryofBreastCancer",
      "IntakeOfContraceptivePill",
      "HormoneReplaceTherapy",
      "Menopause",
      "Childbirth",
      "DiagnosisofBilateralBreastCancer",
      "FirstMenstrualAge",
      "ERTestResults",
      "PRTestResults",
      "Ki67Index",
      "AgeOfDiagnosis",
    ];
    tmp = [...tmpe]
  }
  const survivalModelFun = (e, type) => {
    setSurvivalModel(type);
  };

  const submitCox = (e, type) => {
    setSurvivalModel(type);
    if (type === "cox") {
      inputData["survival_type"] = type;
      inputData["coxFilter"] = coxFilter;
      let return_data = SurvivalInformation("POST", inputData)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          r_['status'] = 200
          setSurvivalJson(r_)
          setRenderNoContent(false)
        } else {
          setRenderNoContent(true)
          setSurvivalJson({ status: d.status })
          setRenderNoContent(true)
        }
      })
        .catch((e) => {
          setSurvivalJson({ status: 204 })
        });
    }
  };

  useEffect(() => {
  }, [coxFilter]);

  const selectAllCox = (e, type) => {
    let tmp = coxFilter;
    for (const key in tmp) {
      if (type === "select") {
        tmp[key] = true;
      } else {
        setRenderNoContent(false);
        setCoxNoData(true)
        setRenderSurvival(false)
        tmp[key] = false;
      }
    }
    setCoxFilter({ ...tmp });
  };

  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        <div className="Grid GridCols12 P5 GridGap20">
          <div className="Flex FlexDirCol ColSpan3">

            <div className="Flex FlexDirRow">
              <h3 className="SurvivalChooseModel" style={{ margin: 'auto' }}>
                <FormattedMessage id="ChooseModel" defaultMessage="Choose Model" />
              </h3>
            </div>

            <div className="Flex FlexDirRowSurvivalFilter Gap2">
              <button
                onClick={(e) => {
                  survivalModelFun(e, "recurrence");
                }}
                className={
                  survivalModel === "recurrence" ? "SurvivalSelectedCss btn btnPrimary MAuto" : "SurvivalNonSelectedCss btn MAuto"
                }
              >
                Recurrence
              </button>

              <button
                onClick={(e) => {
                  survivalModelFun(e, "survival");
                }}
                className={
                  survivalModel === "survival" ? "SurvivalSelectedCss btn btnPrimary MAuto" : "SurvivalNonSelectedCss btn MAuto"
                }
              >
                Survival
              </button>

              {
                vizType && vizType === 'multi' && <button
                  onClick={(e) => {
                    survivalModelFun(e, "cox");
                  }}
                  className={
                    survivalModel === "cox" ? "SurvivalSelectedCss btn btnPrimary MAuto" : "SurvivalNonSelectedCss btn MAuto"
                  }
                >
                  Cox Regression
                </button>
              }

            </div>



            {(survivalModel === "recurrence" || survivalModel === "survival") && (
              <>
                <div
                  className={`Flex FlexDirCol Border Backgroundwhite  ${smallScreen
                    ? " Flex FlexDirRow SurvivalSmallScreen"
                    : "SurvivalSmallScreenHidden"
                    }`}
                >
                  {sampleCountsCard.length > 0 && (
                    <div className="SurvivalSampleCountCard">
                      {sampleCountsCard}
                    </div>
                  )}

                  {project_id === undefined && (
                    <h3 className="SurvivalChooseModel">
                      <FormattedMessage id="Choose Filter group" defaultMessage="Choose Filter group" />
                    </h3>
                  ) && (
                      <div className="M1 Flex FlexDirRow JustifyContent Gap2">
                        <button
                          onClick={() => {
                            setUserDefienedFilter("static");
                            setGroupFilters({});
                          }}
                          className={
                            userDefienedFilter === "static" ? "SurvivalSelectedCss btn btnPrimary" : "SurvivalNonSelectedCss btn"
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
                            userDefienedFilter === "dynamic" ? "SurvivalSelectedCss btn btnPrimary" : "SurvivalNonSelectedCss btn"
                          }
                        >
                          <FormattedMessage
                            id="Dynamic_volcano"
                            defaultMessage="Dynamic"
                          />
                        </button>
                      </div>
                    )}
                  {vizType && vizType === 'multi' &&
                    <h3 className="SurvivalChooseModel"><FormattedMessage id="ChooseFilterType" defaultMessage="Choose Filter Type" /></h3>
                  }
                  {vizType && vizType === 'multi' && <div className="M1 Flex FlexDirRow JustifyContent Gap2">
                    <button
                      onClick={() => setFilterTypeButton("clinical")}
                      id="Mutation"
                      name="type"
                      className={
                        filterTypeButton === "clinical" ? "SurvivalSelectedCss btn btnPrimary" : "SurvivalNonSelectedCss btn"
                      }
                    >
                      <FormattedMessage
                        id="Clinical"
                        defaultMessage="Clinical"
                      />
                    </button>

                    <button
                      onClick={() => {
                        setFilterTypeButton("omics")
                        setGroupFilters({})
                      }}
                      id="Phospho"
                      name="type"
                      className={
                        filterTypeButton === "omics" ? "SurvivalSelectedCss btn btnPrimary" : "SurvivalNonSelectedCss btn"
                      }
                    >
                      <FormattedMessage id="Omics" defaultMessage="Omics" />
                    </button>
                  </div>}

                  {filterTypeButton === "omics" && (
                    <div className="M1 P1">
                      <h6
                        className="SurvivalSelectDatabase MB2 TextLeft"
                        htmlFor="dropdown-gene"
                      >
                        <FormattedMessage
                          id="Select Gene"
                          defaultMessage="Select Gene"
                        />
                      </h6>
                      <select
                        id="dropdown-gene"
                        onChange={(e) => setFilteredGene(e.target.value)}
                        defaultValue={fileredGene}
                        className="SurvivalSelectDatabase"
                      >
                        <option defaultValue={fileredGene === ""} value=""></option>
                        {genesArray.map((gene, index) => (
                          <option
                            defaultValue={fileredGene === gene}
                            key={`${gene}-${index}`}
                            value={gene}
                          >
                            {gene}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}


                  {filterTypeButton === "omics" && (
                    <div className="M1 P1">
                      <h6
                        className="SurvivalSelectDatabase MB1 TextLeft"
                        htmlFor="dropdown-database"
                      >
                        Select Database
                      </h6>
                      <select
                        id="dropdown-database"
                        onChange={(e) => setGeneDatabase(e.target.value)}
                        defaultValue={geneDatabase}
                        className="SurvivalSelectDatabase"
                      >

                        {project_id !== undefined && alltabList['dna_mutation'] && <option
                          defaultValue={geneDatabase === "dna_mutation"}
                          value="dna_mutation"
                        >
                          DNA Mutation
                        </option>
                        }
                        {project_id === undefined && <option
                          defaultValue={geneDatabase === "dna_mutation"}
                          value="dna_mutation"
                        >
                          DNA Mutation
                        </option>}

                        {project_id !== undefined && alltabList['rna'] &&
                          <option defaultValue={geneDatabase === "rna"} value="rna">
                            RNA Expression
                          </option>
                        }

                        {
                          project_id === undefined && <option defaultValue={geneDatabase === "rna"} value="rna">
                            RNA Expression
                          </option>
                        }

                        {project_id !== undefined && alltabList['proteome'] &&
                          <option
                            defaultValue={geneDatabase === "proteome"}
                            value="proteome"
                          >
                            Global Proteome
                          </option>
                        }

                        {project_id === undefined && <option
                          defaultValue={geneDatabase === "proteome"}
                          value="proteome"
                        >
                          Global Proteome
                        </option>}
                      </select>
                    </div>
                  )}

                  {filterTypeButton === "clinical" &&
                    userDefienedFilter === "static" &&
                    project_id === undefined && (
                      <PreDefienedFiltersSurvival
                        type="survival"
                        parentCallback={updateGroupFilters}
                        groupFilters={groupFilters}
                        survivalModel={survivalModel}
                      />
                    )}

                  {filterTypeButton === "clinical" &&
                    userDefienedFilter === "dynamic" &&
                    project_id === undefined && (
                      <GroupFilters
                        viz_type="survival"
                        parentCallback={updateGroupFilters}
                        groupFilters={groupFilters}
                        survivalModel={survivalModel}
                      />
                    )}

                  {filterTypeButton === "clinical" &&
                    project_id !== undefined && (
                      <UserDefinedGroupFilters
                        viz_type="survival"
                        parentCallback={updateGroupFilters}
                        groupFilters={groupFilters}
                        survivalModel={survivalModel}
                        vizType={vizType}
                      />
                    )}

                  {filterTypeButton === "omics" && (
                    <div>
                      <div>
                        <button
                          onClick={submitFitersAndFetchData}
                          className="SubmitButtonFilter"
                        >
                          <FormattedMessage
                            id="Submit_volcano"
                            defaultMessage="Submit"
                          />
                        </button>
                      </div>
                      <div>
                        <button className="ResetButtonFilter">
                          <FormattedMessage
                            id="Reset_volcano"
                            defaultMessage="Reset"
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}






            {survivalModel === "cox" && (
              <>
                <div
                  className={`Flex FlexDirCol border Backgroundwhite  ${smallScreen
                    ? " Flex FlexDirRow SurvivalSmallScreen"
                    : "SurvivalSmallScreenHidden"
                    }`}
                >
                  <h3 className="SurvivalChooseModel">
                    <FormattedMessage id="Choose Filter group" defaultMessage="Choose Filter group" />
                  </h3>


                  <div className="M1 Flex FlexDirRow JustifyContent WMax">
                    <div className="Flex JustifyCenter">
                      <div>
                        {tmp.map((element, index) => (
                          <div
                            className="form-check Flex MB4"
                            key={"cox" + index}
                          >
                            <label
                              className="form-check-label TextLeft Inline TextGray800"
                              htmlFor={"flexCheckChecked_" + index}
                            >
                              <input
                                onChange={(e) => selectCoxFiler(e)}
                                className="form-check-input SurvivalInput Backgroundwhite"
                                type="checkbox"
                                name={element}
                                id={"flexCheckChecked_" + index}
                                checked={coxFilter[element]}
                                value={element}
                              />
                              <FormattedMessage id={element} defaultMessage={element} />
                            </label>
                          </div>
                        ))}
                        <div className="Flex FlexDirRow Gap5">
                          <button
                            onClick={(e) => selectAllCox(e, "select")}
                            className={
                              survivalModel === "cox" ? "SurvivalSelectedCss btn btnPrimary" : "SurvivalNonSelectedCss btn"
                            }
                          >
                            <FormattedMessage id="SelectAll" defaultMessage="Select All" />
                          </button>
                          <button
                            onClick={(e) => selectAllCox(e, "reset")}
                            className="SurvivalSelectedCss btn"
                            style={{ color: 'black' }}
                          >
                            <FormattedMessage
                              id="Reset_volcano"
                              defaultMessage="Reset"
                            />
                          </button>
                        </div>
                        <div className="Flex FlexDirRow Gap5 PY2">
                          <button
                            onClick={(e) => submitCox(e, "cox")}
                            className="SubmitButtonFilter"
                          >
                            <FormattedMessage
                              id="Submit_volcano"
                              defaultMessage="Submit"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="ColSpan8">
            {renderSurvival && (survivalModel === "recurrence" || survivalModel === "survival") && (
              <SurvivalCmp
                watermarkCss={watermarkCss}
                ref={reference}
                width={width}
                data={{
                  fileredGene: fileredGene,
                  survivalJson: survivalJson,
                }}
                pValue={pValueData}
              />
            )}
            {renderSurvival && survivalModel === "cox" && (
              <>
                <div ref={reference}>{coxTable}</div>
              </>
            )}
            {renderNoContent && <NoContentMessage />}
            {
              (inputData.genes.length === 0) && <p><FormattedMessage id="PleaseSelecttheGeneSetData" defaultMessage="Please Select the Gene Set Data" /></p>
            }
            {
              (coxNoData && survivalModel === "cox" || (reqstMsg && inputData.genes.length > 0)) && <p><FormattedMessage id="PleaseSelectFilterData" defaultMessage="Please Select Filter Data" /> </p>
            }
          </div>
        </div>
      )}
    </>
  );
}
