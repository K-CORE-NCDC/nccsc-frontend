import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from "../../Common/Survival";
import {
  getSurvivalInformation,
  getClinicalMaxMinInfo,
  clearSurvivalIMage
} from "../../../actions/api_actions";
import { exportComponentAsPNG, exportComponentAsJPEG } from "react-component-export-image";
import GroupFilters, {
  PreDefienedFiltersSurvival,
} from "../../Common/GroupFilter";
import UserDefinedGroupFilters  from "../../Common/GroupFilterUserDefined";
import NoContentMessage from "../../Common/NoContentComponent";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";

import LoaderCmp from "../../Common/Loader";
import { FormattedMessage } from "react-intl";
import inputJson from "../../Common/data";
import { Context } from "../../../wrapper";
const selectedCss =
  "w-1/2 rounded-r-none  hover:scale-110 xs:h-14 xs:text-sm focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition";
const nonSelectedCss =
  "w-1/2 rounded-l-none border-l-0 xs:h-14 xs:text-sm hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition";

export default function DataSurvival({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const reference = useRef();
  const dispatch = useDispatch();
  const survivalJson = useSelector(
    (data) => data.dataVisualizationReducer.survivalSummary
  );
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );
  const [watermarkCss, setWatermarkCSS] = useState("");
  const [genesArray, setGenesArray] = useState([]);
  const [fileredGene, setFilteredGene] = useState("");
  const [loader, setLoader] = useState(true);
  const [groupFilters, setGroupFilters] = useState({});
  const [geneDatabase, setGeneDatabase] = useState("dna_mutation");
  const [showClinicalFilters, setShowClinicalFilters] = useState(false);
  const [sampleCountsCard, setSampleCountsCard] = useState([]);
  const [renderSurvival, setRenderSurvival] = useState(true);
  const [renderNoContent, setRenderNoContent] = useState(false);
  const [filterTypeButton, setFilterTypeButton] = useState("clinical");
  let { tab, project_id } = useParams();
  const [userDefienedFilter, setUserDefienedFilter] = useState(
    project_id === undefined ? "static" : "dynamic"
  );

  const [coxUserDefinedFilter, setCoxUserDefinedFilter] = useState({})
  const [survivalModel, setSurvivalModel] = useState("kaplan");
  const [pValueData, setPvalueData] = useState("");
  const [smallScreen, setSmallScreen] = useState(false);
  const [coxClinical, setCoxClinical] = useState([]);
  const [coxTable, setCoxTable] = useState([]);
  const [coxNoData, setCoxNoData] = useState(true)
  const userDefinedFilterColumns = useSelector(
    (data) => data.dataVisualizationReducer.userDefinedFilter
  );
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const context = useContext(Context);
  
  useEffect(() => {
    if (context["locale"] === "kr-KO") {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  });
    
  const [coxFilter, setCoxFilter] = useState({
    // "Body Mass Index": false,
    // "Alcohol Consumption": false,
    // "Family History of Breast Cancer": false,
    // "Intake Of Contraceptive Pill": false,
    // "Hormone Replace Therapy": false,
    // Menopause: false,
    // Childbirth: false,
    // "Diagnosis of Bilateral Breast Cancer": false,
    // "First Menstrual Age": false,
    // "ER Test Results": false,
    // "PR Test Results": false,
    // "Ki67 Index": false,
    // "Age Of Diagnosis": false,
  });

  useEffect(()=>{
    if (userDefinedFilterColumns && userDefinedFilterColumns["filterJson"] && userDefinedFilterColumns["filterJson"]["Clinical Information"] && Object.keys(userDefinedFilterColumns).length > 0) {
      setCoxUserDefinedFilter(userDefinedFilterColumns["filterJson"]["Clinical Information"])
    }
  },[userDefinedFilterColumns])

  useEffect(()=>{
  if (survivalModel === "cox" && project_id !== undefined){
    let tmpe ={}
    if (coxUserDefinedFilter && Object.keys(coxUserDefinedFilter).length > 0) {
      // for (const a in coxUserDefinedFilter){
      //   if(a !== 'rlps_yn' && a!== 'rlps_cnfr_drtn')
      //     {
      //       tmpe[a] = false
      //     }
      // // setCoxFilter({ ...coxFilter, [a]: false });
      // }

      for (const a in coxUserDefinedFilter){
        if(a !== 'rlps_yn' && a!== 'rlps_cnfr_drtn' )
        {
          if( 'value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'yes' && 'value' in  coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'no' ){
            continue
          }
          else{
            tmpe[a] = false
          }
       
        }
      }
      setCoxFilter(tmpe)
    }
  }
  else{

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
    let tmpe ={}
  for (let i=0; i<tmp.length;i++){

    tmpe[tmp[i]] = false
  }
  setCoxFilter(tmpe)
}
  },[survivalModel])
 

  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      if(project_id === undefined){
        dispatch(getClinicalMaxMinInfo("GET", {}));
      }
    }
  }, []);

  const submitFitersAndFetchData = () => {
    if (fileredGene !== "" || filterTypeButton === "clinical") {
      setLoader(true);
      inputData["filterType"] = userDefienedFilter;
      inputData["survival_type"] = survivalModel;
      if (filterTypeButton === "clinical") {
        dispatch(
          getSurvivalInformation("POST", {
            ...inputData,
            filter_gene: fileredGene,
            gene_database: geneDatabase,
            group_filters: groupFilters,
            clinical: true,
          })
        );
      } else {
        dispatch(
          getSurvivalInformation("POST", {
            ...inputData,
            filter_gene: fileredGene,
            gene_database: geneDatabase,
          })
        );
      }
    } else {
      setLoader(true);
      dispatch(getSurvivalInformation("POST", inputData));
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
    if (fileredGene !== "") {
      setShowClinicalFilters(true);
    }
  }, [fileredGene]);

  useEffect(() => {
    setTimeout(function () {
      setLoader(false);
    }, 1000);
    if (survivalModel === "kaplan") {
      if (survivalJson && survivalJson.sample_counts) {
        const sampleCountsObject = survivalJson.sample_counts;
        let totalCount = 0;
        let htmlArray = [];
        if (Object.keys(sampleCountsObject).length > 0) {
          Object.keys(sampleCountsObject).map((e) => {
            totalCount += sampleCountsObject[e];
            htmlArray.push(
              <div
                key={e}
                className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue"
              >
                <FormattedMessage id={e} defaultMessage={e} />{" "}
                {`: ${sampleCountsObject[e]}`}
              </div>
            );
          });
        }
        if (htmlArray.length > 1) {
          // setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)} / R-Value : ${survivalJson.rvalue.toFixed(6)}`)
          setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`);
          setSampleCountsCard([
            <div
              key="total"
              className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue"
            >
              <FormattedMessage id="Total" defaultMessage="Total" /> :{" "}
              {totalCount}
            </div>,
            ...htmlArray,
          ]);
        } else {
          setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`);
          setSampleCountsCard([
            <div
              key="total"
              className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue"
            >
              <FormattedMessage id="Total" defaultMessage="Total" /> :{" "}
              {totalCount}
            </div>,
          ]);
        }
      }
    } else if (survivalModel === "cox") {
      let inputDataJson = {};
      if (project_id){
        if (coxUserDefinedFilter && Object.keys(coxUserDefinedFilter).length > 0) {
          for (const a in coxUserDefinedFilter){
            if(a !== 'rlps_yn' && a!== 'rlps_cnfr_drtn' )
            {
              if( 'value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'yes' && 'value' in  coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'no' ){
                continue
              }
              else{
                inputDataJson[a] = a
              }
           
            }
          }
        }
      }
     else{
       for (let z = 0; z < inputJson["filterChoices"].length; z++) {
         inputDataJson[inputJson["filterChoices"][z]["id"]] = inputJson["filterChoices"][z]["name"];
       }
     }

      let tmp = [];
      let columns = survivalJson && 'columns' in survivalJson &&  survivalJson["columns"];
      let table = [];
      let thead = [<th></th>];
      let data = survivalJson && 'data' in survivalJson && JSON.parse(survivalJson["data"]);
      let cf = survivalJson && 'clinical_filter' in survivalJson &&  survivalJson["clinical_filter"];
      let image = survivalJson && 'image' in survivalJson &&  survivalJson["image"];
      // let image = survivalJson["image"];
      let trow = [];
      if(columns){
        for (let c = 0; c < columns.length; c++) {
          thead.push(
            <th
            className="font-medium text-gray-900 px-6 py-4 text-left"
            key={`${c}'_'${columns[c]}`}
            >
            {columns[c]}
          </th>
        );
      }
    }
    if(cf){
      for (let c = 0; c < cf.length; c++) {
        let col = cf[c];
        let td = [];
        td.push(
          <td key={col} className=" text-gray-900  text-left px-5 py-6">
            {col}
          </td>
        );
        for (const key in data) {
          let v = data[key][col];
          v = parseFloat(v).toFixed(2);

          td.push(
            <td
              key={`${col}"_"${key}"_"${v}`}
              className=" text-gray-900 text-left px-5 py-6"
            >
              {v}
            </td>
          );
        }

        trow.push(
          <tr className="border-b py-4" key={`coxtr_${c}`}>
            {td}
          </tr>
        );
      }
    }

      tmp.push(
        <div className="flex flex-col p-12" key={"cox"}>
          <div className="bg-white  text-left  shadow-lg" key={"co"}>
            <h3 className="border-b border-gray-200 p-8 ">
              <FormattedMessage id="Co-efficientTable" defaultMessage = "Co-efficient Table" />
            </h3>
            <table className="table w-full">
              <thead className="border-b">
                <tr>{thead}</tr>
              </thead>
              <tbody>{trow}</tbody>
            </table>
          </div>
          <div
            key={"ci"}
            className="flex flex-col mt-20 bg-white  text-left  shadow-lg w-full"
          >
            <h3 className="border-b border-gray-200 p-8">
              <FormattedMessage id="ConfidenceIntervalPlot" defaultMessage="Confidence Interval Plot" />
            </h3>
            <div className="w-full">
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
        exportComponentAsJPEG(reference,{'fileName':'Survival',html2CanvasOptions:{
        }});
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
      setRenderNoContent(false);
      setRenderSurvival(true);
      setCoxNoData(false)
    } else if(survivalJson && survivalJson.status !== 200) {
      setRenderNoContent(true);
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
  if (project_id !== undefined){
    if (coxUserDefinedFilter && Object.keys(coxUserDefinedFilter).length > 0) {
      // for (const a in coxUserDefinedFilter){

      //   if(a !== 'rlps_yn' && a!== 'rlps_cnfr_drtn')
      //   {
      //     tmp.push(a);
      //   }
      // }
      for (const a in coxUserDefinedFilter){
        if(a !== 'rlps_yn' && a!== 'rlps_cnfr_drtn' )
        {
          if( 'value' in coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'yes' && 'value' in  coxUserDefinedFilter[a][0] && coxUserDefinedFilter[a][0]['value'] !== 'no' ){
            continue
          }
          else{
            tmp.push(a);
          }
       
        }
      }
    }
  }
  else{

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
    // if (type === "cox") {
    //   inputData["survival_type"] = type;
    //   inputData['coxFilter'] = coxFilter
    //   dispatch(getSurvivalInformation("POST", inputData));
    // }
  };

  const submitCox = (e, type) => {
    // dispatch(clearSurvivalIMage())
    setSurvivalModel(type);
    if (type === "cox") {
      inputData["survival_type"] = type;
      inputData["coxFilter"] = coxFilter;
      dispatch(getSurvivalInformation("POST", inputData));
    }
  };

  useEffect(() => {
  }, [coxFilter]);

  const selectAllCox = (e, type) => {
    // dispatch(clearSurvivalIMage())
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
        <div className="grid grid-cols-6 p-5">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h3 className="p-4 ml-1 text-left text-bold xs:text-xl text-blue-700">
                <FormattedMessage id="ChooseModel" defaultMessage = "Choose Model" />
              </h3>
            </div>
            <div className="flex flex-row">
              <button
                onClick={(e) => {
                  survivalModelFun(e, "kaplan");
                }}
                className={
                  survivalModel === "kaplan" ? selectedCss : nonSelectedCss
                }
              >
                Kaplan-Meier
              </button>
              <button
                onClick={(e) => {
                  survivalModelFun(e, "cox");
                }}
                className={
                  survivalModel === "cox" ? selectedCss : nonSelectedCss
                }
              >
                Cox Regression
              </button>
            </div>
            {survivalModel === "kaplan" && (
              <>
                <div
                  className={`flex flex-col border bg-white  ${
                    smallScreen
                      ? " flex flex-row xs:z-10 xs:opacity-95 xs:bg-white"
                      : "xs:hidden"
                  }`}
                >
                  {sampleCountsCard.length > 0 && (
                    <div className="m-1 p-1 border border-black border-dashed">
                      {sampleCountsCard}
                    </div>
                  )}

                  {project_id === undefined && (
                      <h6 className="p-4 ml-1 text-left text-bold xs:text-xl text-blue-700">
                        <FormattedMessage
                          id="Choose Filter group"
                          defaultMessage="Choose Filter group"
                        />
                      </h6>
                    ) && (
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
                  <h6 className="ml-1 mt-1 p-4 text-left text-bold xs:text-xl text-blue-700">
                    <FormattedMessage id="ChooseFilterType" defaultMessage = "Choose Filter Type" />
                  </h6>
                  <div className="m-1 flex flex-row justify-around">
                    <button
                      onClick={() => setFilterTypeButton("clinical")}
                      id="Mutation"
                      name="type"
                      className={
                        filterTypeButton === "clinical"
                          ? selectedCss
                          : nonSelectedCss
                      }
                    >
                      <FormattedMessage
                        id="Clinical"
                        defaultMessage="Clinical"
                      />
                    </button>
                    <button
                      onClick={() => setFilterTypeButton("omics")}
                      id="Phospho"
                      name="type"
                      className={
                        filterTypeButton === "omics"
                          ? selectedCss
                          : nonSelectedCss
                      }
                    >
                      <FormattedMessage id="Omics" defaultMessage="Omics" />
                    </button>
                  </div>
                  {filterTypeButton === "omics" && (
                    <div className="m-1 p-1">
                      <h6
                        className="text-blue-700 text-lg  font-bold mb-2 text-left"
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
                        className="w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
                      >
                        <option selected={fileredGene === ""} value=""></option>
                        {genesArray.map((gene, index) => (
                          <option
                            selected={fileredGene === gene}
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
                    <div className="m-1 p-1">
                      <h6
                        className="text-blue-700 text-lg  font-bold mb-1 text-left"
                        htmlFor="dropdown-database"
                      >
                        Select Database
                      </h6>
                      <select
                        id="dropdown-database"
                        onChange={(e) => setGeneDatabase(e.target.value)}
                        defaultValue={geneDatabase}
                        className="w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
                      >
                        <option
                          selected={geneDatabase === "dna_mutation"}
                          value="dna_mutation"
                        >
                          <FormattedMessage id="" defaultMessage="Default Mutation" />
                        </option>
                        <option selected={geneDatabase === "rna"} value="rna">
                        <FormattedMessage id="RNAExpression" defaultMessage="RNA Expression" />
                        </option>
                        <option
                          selected={geneDatabase === "proteome"}
                          value="proteome"
                        >
                          <FormattedMessage id="GlobalProteome" defaultMessage="Global Proteome" />
                        </option>
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
                      />
                    )}
                  {filterTypeButton === "clinical" &&
                    userDefienedFilter === "dynamic" &&
                    project_id === undefined && (
                      <GroupFilters
                        viz_type="survival"
                        parentCallback={updateGroupFilters}
                        groupFilters={groupFilters}
                      />
                    )}
                  {filterTypeButton === "clinical" &&
                    project_id !== undefined && (
                      <UserDefinedGroupFilters
                        viz_type="survival"
                        parentCallback={updateGroupFilters}
                        groupFilters={groupFilters}
                      />
                    )}
                  {filterTypeButton === "omics" && (
                    <div>
                      <div>
                        <button
                          onClick={submitFitersAndFetchData}
                          className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 xs:w-32 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
                        >
                          <FormattedMessage
                            id="Submit_volcano"
                            defaultMessage="Submit"
                          />
                        </button>
                      </div>
                      <div>
                        <button className="bg-white hover:bg-gray-700 mb-3 w-80 h-20 xs:w-20 lg:w-80 xs:w-32 text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
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
                  className={`flex flex-col border bg-white  ${
                    smallScreen
                      ? " flex flex-row xs:z-10 xs:opacity-95 xs:bg-white"
                      : "xs:hidden"
                  }`}
                >
                  <h6 className="p-4 ml-1 text-left text-bold xs:text-xl text-blue-700">
                    <FormattedMessage
                      id="Choose Filter group"
                      defaultMessage="Choose Filter group"
                    />
                  </h6>
                  <div className="m-1 flex flex-row justify-around w-max">
                    <div className="flex justify-center">
                      <div>
                        {tmp.map((element, index) => (
                          <div
                            className="form-check flex mb-4"
                            key={"cox" + index}
                          >
                            <label
                              className="form-check-label inline text-left text-gray-800"
                              htmlFor={"flexCheckChecked_" + index}
                            >
                              <input
                                onChange={(e) => selectCoxFiler(e)}
                                className="form-check-input 
                                h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 
                                checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat 
                                bg-center bg-contain float-left mr-2 cursor-pointer"
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
                        <div className="flex flex-row gap-5">
                          <button
                            onClick={(e) => selectAllCox(e, "select")}
                            className={
                              survivalModel === "cox"
                                ? selectedCss
                                : nonSelectedCss
                            }
                          >
                            <FormattedMessage id="SelectAll" defaultMessage = "Select All" />
                          </button>
                          <button
                            onClick={(e) => selectAllCox(e, "reset")}
                            className={
                              survivalModel === "cox"
                                ? selectedCss
                                : nonSelectedCss
                            }
                          >
                            <FormattedMessage
                            id="Reset_volcano"
                            defaultMessage="Reset"
                          />
                          </button>
                        </div>
                        <div className="flex flex-row gap-5">
                          <button
                            onClick={(e) => submitCox(e, "cox")}
                            className="w-full mt-5 rounded-r-none  hover:scale-110 xs:h-14 xs:text-sm focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition"
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

          <div className="col-span-5">
            {renderSurvival && survivalModel === "kaplan" && (
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
                <div  ref={reference}>{coxTable}</div>
              </>
            )}
            {renderNoContent && <NoContentMessage />}
            {
              inputData.genes.length === 0 &&  <p><FormattedMessage  id="PleaseSelecttheGeneSetData" defaultMessage="PleaseSelect the Gene Set Data" /></p>
            }
            {
              coxNoData && survivalModel === "cox" && <p><FormattedMessage id="PleaseSelectFilterData" defaultMessage="Please Select Filter Data" /> </p>
            }
          </div>
        </div>
      )}
    </>
  );
}
