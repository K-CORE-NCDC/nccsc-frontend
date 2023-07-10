import { GroupFilters,UserDefinedGroupFilters,PreDefienedFiltersSurvival } from "../../../Common/SurvivalFusionVolcanoFilters";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import {
    getClinicalMaxMinInfo,
} from "../../../../actions/api_actions";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const SurvivalFilterComponent = ({ parentCallback, filterState, survivalCardData }) => {

    const route = useLocation();
    const dispatch = useDispatch();
    let { project_id } = useParams();
    const clinicalMaxMinInfo = useSelector(
        (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
    );

    const [genesArray, setGenesArray] = useState([]);
    const [fileredGene, setFilteredGene] = useState("");

    const [loader, setLoader] = useState(true);
    const [groupFilters, setGroupFilters] = useState(null);
    const [geneDatabase, setGeneDatabase] = useState("dna_mutation");
    const [sampleCountsCard, setSampleCountsCard] = useState({})


    const [filterTypeButton, setFilterTypeButton] = useState("clinical");
    const [vizType, setVizType] = useState("single")


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

    useEffect(()=>{
        setSampleCountsCard(survivalCardData)
    },[survivalCardData])

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
    const smallScreen = false

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


    const submitFitersAndFetchData = () => {
        setLoader(true);
        let copyState = {}
        copyState["filterType"] = userDefienedFilter;
        copyState["survival_type"] = survivalModel;

        if (filterTypeButton === "clinical") {
            copyState['filter_gene'] = fileredGene
            copyState['gene_database'] = geneDatabase
            copyState['group_filters'] = groupFilters
            copyState['clinical'] = true
            // copyState['viz_type'] = vizType 
        }
        else {
            copyState['filter_gene'] = fileredGene
            copyState['gene_database'] = geneDatabase
            copyState['group_filters'] = groupFilters
            copyState['clinical'] = false
            // copyState['viz_type'] = vizType
        }
        if(groupFilters){
            parentCallback({ updatedState: copyState })
        }

    };


    useEffect(() => {

        if (filterState && filterState.genes) {
            setGenesArray(filterState.genes);
        }
        
        if(groupFilters){
            submitFitersAndFetchData();
        }

    }, [filterState, groupFilters]);


    const updateGroupFilters = (filtersObject) => {
        if (filtersObject) {
            setGroupFilters(filtersObject);
        }
    };


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
        let copyState = {}
        if (type === "cox") {
            copyState["survival_type"] = type;
            copyState["coxFilter"] = coxFilter;
            copyState["filterType"] = userDefienedFilter;
            copyState['coxUserDefinedFilter'] = coxUserDefinedFilter
            copyState['viz_type'] = vizType
            
            if(coxFilter){
                parentCallback({ updatedState: copyState })
            }
        }
    };



    const selectAllCox = (e, type) => {
        let tmp = coxFilter;
        for (const key in tmp) {
            if (type === "select") {
                tmp[key] = true;
            } else {
                tmp[key] = false;
            }
        }
        setCoxFilter({ ...tmp });
    };
    
    return (
        <div>
            <div className="P5">
                <div className="Flex FlexDirCol ColSpan3">

                    <div className="Flex FlexDirRow">
                        <h3 className="SurvivalChooseModel" style={{ margin: 'auto' }}>
                            <FormattedMessage id="ChooseModel" defaultMessage="Choose Model" />
                        </h3>
                    </div>

                    <div className="Flex FlexDirRowSurvivalFilter Gap2">
                        <button onClick={(e) => {
                            survivalModelFun(e, "recurrence");
                        }}
                            className={
                                survivalModel === "recurrence" ? "SurvivalSelectedCss btn btnPrimary MAuto" :
                                    "SurvivalNonSelectedCss btn MAuto"
                            }
                        >
                            Recurrence
                        </button>

                        <button onClick={(e) => {
                            survivalModelFun(e, "survival");
                        }}
                            className={
                                survivalModel === "survival" ? "SurvivalSelectedCss btn btnPrimary MAuto" :
                                    "SurvivalNonSelectedCss btn MAuto"
                            }
                        >
                            Survival
                        </button>

                        <button onClick={(e) => {
                            survivalModelFun(e, "cox");
                        }}
                            className={
                                survivalModel === "cox" ? "SurvivalSelectedCss btn btnPrimary MAuto" :
                                    "SurvivalNonSelectedCss btn MAuto"
                            }
                        >
                            Cox Regression
                        </button>

                    </div>


                    {(survivalModel === "recurrence" || survivalModel === "survival") && (
                        <>
                            <div className={`Flex FlexDirCol Border Backgroundwhite ${smallScreen ? " Flex FlexDirRow SurvivalSmallScreen"
                                : "SurvivalSmallScreenHidden"}`}>
                                {sampleCountsCard && sampleCountsCard.length > 0 && (
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
                                            <button onClick={() => {
                                                setUserDefienedFilter("static");
                                                setGroupFilters({});
                                            }}
                                                className={
                                                    userDefienedFilter === "static" ? "SurvivalSelectedCss btn btnPrimary" :
                                                        "SurvivalNonSelectedCss btn"
                                                }
                                            >
                                                <FormattedMessage id="Static_volcano" defaultMessage="Static" />
                                            </button>
                                            <button onClick={() => {
                                                setUserDefienedFilter("dynamic");
                                                setGroupFilters({});
                                            }}
                                                className={
                                                    userDefienedFilter === "dynamic" ? "SurvivalSelectedCss btn btnPrimary" :
                                                        "SurvivalNonSelectedCss btn"
                                                }
                                            >
                                                <FormattedMessage id="Dynamic_volcano" defaultMessage="Dynamic" />
                                            </button>
                                        </div>
                                    )}

                                <h3 className="SurvivalChooseModel">
                                    <FormattedMessage id="ChooseFilterType" defaultMessage="Choose Filter Type" />
                                </h3>
                                <div className="M1 Flex FlexDirRow JustifyContent Gap2">
                                    <button onClick={() => setFilterTypeButton("clinical")}
                                        id="Mutation"
                                        name="type"
                                        className={
                                            filterTypeButton === "clinical" ? "SurvivalSelectedCss btn btnPrimary" :
                                                "SurvivalNonSelectedCss btn"
                                        }
                                    >
                                        <FormattedMessage id="Clinical" defaultMessage="Clinical" />
                                    </button>

                                    <button onClick={() => {
                                        setFilterTypeButton("omics")
                                        setGroupFilters({})
                                    }}
                                        id="Phospho"
                                        name="type"
                                        className={
                                            filterTypeButton === "omics" ? "SurvivalSelectedCss btn btnPrimary" :
                                                "SurvivalNonSelectedCss btn"
                                        }
                                    >
                                        <FormattedMessage id="Omics" defaultMessage="Omics" />
                                    </button>
                                </div>

                                {filterTypeButton === "omics" && (
                                    <div className="M1 P1">
                                        <h6 className="SurvivalSelectDatabase MB2 TextLeft" htmlFor="dropdown-gene">
                                            <FormattedMessage id="Select Gene" defaultMessage="Select Gene" />
                                        </h6>
                                        <select id="dropdown-gene" onChange={(e) => setFilteredGene(e.target.value)}
                                            defaultValue={fileredGene}
                                            className="SurvivalSelectDatabase"
                                        >
                                            <option defaultValue={fileredGene === ""} value=""></option>
                                            {genesArray.map((gene, index) => (
                                                <option defaultValue={fileredGene === gene} key={`${gene}-${index}`} value={gene}>
                                                    {gene}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}


                                {filterTypeButton === "omics" && (
                                    <div className="M1 P1">
                                        <h6 className="SurvivalSelectDatabase MB1 TextLeft" htmlFor="dropdown-database">
                                            Select Database
                                        </h6>
                                        <select id="dropdown-database" onChange={(e) => setGeneDatabase(e.target.value)}
                                            defaultValue={geneDatabase}
                                            className="SurvivalSelectDatabase"
                                        >

                                            {project_id !== undefined && alltabList['dna_mutation'] && <option
                                                defaultValue={geneDatabase === "dna_mutation"} value="dna_mutation">
                                                DNA Mutation
                                            </option>
                                            }
                                            {project_id === undefined && <option defaultValue={geneDatabase === "dna_mutation"} value="dna_mutation">
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
                                                <option defaultValue={geneDatabase === "proteome"} value="proteome">
                                                    Global Proteome
                                                </option>
                                            }

                                            {project_id === undefined && <option defaultValue={geneDatabase === "proteome"} value="proteome">
                                                Global Proteome
                                            </option>}
                                        </select>
                                    </div>
                                )}

                                {filterTypeButton === "clinical" &&
                                    userDefienedFilter === "static" &&
                                    project_id === undefined && (
                                        <PreDefienedFiltersSurvival type="survival" viz_type="survival" filterParentCallback={updateGroupFilters} groupFilters={groupFilters}
                                            survivalModel={survivalModel} />
                                    )}

                                {filterTypeButton === "clinical" &&
                                    userDefienedFilter === "dynamic" &&
                                    project_id === undefined && (
                                        <GroupFilters viz_type="survival" parentCallback={updateGroupFilters} groupFilters={groupFilters}
                                            survivalModel={survivalModel} />
                                    )}

                                {filterTypeButton === "clinical" &&
                                    project_id !== undefined && (
                                        <UserDefinedGroupFilters viz_type="survival" parentCallback={updateGroupFilters} groupFilters={groupFilters}
                                            survivalModel={survivalModel} />
                                    )}

                                {filterTypeButton === "omics" && (
                                    <div>
                                        <div>
                                            <button onClick={submitFitersAndFetchData} className="SubmitButtonFilter">
                                                <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
                                            </button>
                                        </div>
                                        <div>
                                            <button className="ResetButtonFilter">
                                                <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {survivalModel === "cox" && (
                        <>
                            <div className={`Flex FlexDirCol border Backgroundwhite ${smallScreen ? " Flex FlexDirRow SurvivalSmallScreen"
                                : "SurvivalSmallScreenHidden"}`}>
                                <h3 className="SurvivalChooseModel">
                                    <FormattedMessage id="Choose Filter group" defaultMessage="Choose Filter group" />
                                </h3>


                                <div className="M1 Flex FlexDirRow JustifyContent WMax">
                                    <div className="Flex JustifyCenter">
                                        <div>
                                            {tmp.map((element, index) => (
                                                <div className="form-check Flex MB4" key={"cox" + index}>
                                                    <label className="form-check-label TextLeft Inline TextGray800" htmlFor={"flexCheckChecked_" + index}>
                                                        <input onChange={(e) => selectCoxFiler(e)}
                                                            className="form-check-input SurvivalInputBackgroundwhite"
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
                                                <button onClick={(e) => selectAllCox(e, "select")}
                                                    className={
                                                        survivalModel === "cox" ? "SurvivalSelectedCss btn btnPrimary" : "SurvivalNonSelectedCss btn"}>
                                                    <FormattedMessage id="SelectAll" defaultMessage="Select All" />
                                                </button>
                                                <button onClick={(e) => selectAllCox(e, "reset")}
                                                    className="SurvivalSelectedCss btn"
                                                    style={{ color: 'black' }}
                                                >
                                                    <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
                                                </button>
                                            </div>
                                            <div className="Flex FlexDirRow Gap5 PY2">
                                                <button onClick={(e) => submitCox(e, "cox")}
                                                    className="SubmitButtonFilter"
                                                >
                                                    <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default SurvivalFilterComponent;