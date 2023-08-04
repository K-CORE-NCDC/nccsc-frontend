import React, { useState, useEffect } from "react";
import { GroupFilters, PreDefienedFilters, UserDefinedGroupFilters } from "../../../Common/SurvivalFusionVolcanoFilters";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


let VolcanoFusionFilterComponent = ({ parentCallback, tab }) => {
    const selectedCss =
        "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200  ease-in-out border-gray-600 transition text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md";
    const nonSelectedCss =
        "w-1/2 rounded-l-none  hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md";

    let { project_id } = useParams();

    const [groupFilters, setGroupFilters] = useState({});
    const [volcanoType, setVolcanoType] = useState("transcriptome");
    const [proteomeValue, setProteomeValue] = useState("N");

    const [userDefienedFilter, setUserDefienedFilter] = useState(
        project_id === undefined ? "static" : "dynamic"
    );
    const tabList = useSelector(
        (data) => data.dataVisualizationReducer
    );

    const [alltabList, setAllTabList] = useState({});

    // fusion 
    const [smallScreen, setSmallScreen] = useState(false);
    const sampleCount = {}

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


    const updateGroupFilters = (filtersObject) => {
        if(tab === 'volcano'){

            if (filtersObject && proteomeValue !== 'NT') {
                setGroupFilters(filtersObject);
            }
            else {
                setGroupFilters(filtersObject);
            }
        }
        else if(tab === 'fusion'){
            setGroupFilters(filtersObject);
        }
    };

    useEffect(() => {
        if ('userProjectsDataTable' in tabList) {
            setAllTabList(tabList.userProjectsDataTable)
        }

    }, [tabList])

    useEffect(() => {
        if (tab === 'volcano') {

            let volcanoFusionFilterData = {}

            volcanoFusionFilterData['groupFilters'] = groupFilters

            if (proteomeValue === 'NT') {
                volcanoFusionFilterData['groupFilters'] = {}
            }

            volcanoFusionFilterData['volcanoType'] = volcanoType    
            volcanoFusionFilterData['proteomeValue'] = proteomeValue
            volcanoFusionFilterData['userDefienedFilter'] = userDefienedFilter

            
            if(!project_id){
                if('group_1' in groupFilters)
                    groupFilters.group_a = groupFilters.group_1;
                
                if('group_2' in groupFilters)
                    groupFilters.group_b = groupFilters.group_2;
                
                if('group_3' in groupFilters)
                    groupFilters.group_c = groupFilters.group_3;

                if('group_1' in groupFilters)
                    delete groupFilters.group_1;
                
                if('group_2' in groupFilters)
                    delete groupFilters.group_2;
                
                if('group_3' in groupFilters)
                    delete groupFilters.group_3;
                
                
            }

            if (volcanoType === 'transcriptome' && groupFilters && Object.keys(groupFilters).length) {
                parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData })
            }
            else if (volcanoType === 'proteome' && (proteomeValue === 'N' || proteomeValue === 'T') && groupFilters && Object.keys(groupFilters).length) {
                parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData })
            }
            else if (volcanoType === 'proteome' && proteomeValue === 'NT') {
                parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData })
            }
        }
        else if(tab === 'fusion'){
            let volcanoFusionFilterData = {}
            volcanoFusionFilterData['groupFilters'] = groupFilters
            if(groupFilters && Object.keys(groupFilters).length){
                parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData })
            }
        }
    }, [groupFilters])


    return (
        <div>

            {
                tab === 'volcano' &&
                <div>
                    <div className="M4 Flex JustifyContent Gap2">

                        <button
                            onClick={() => changeVolcanoType("transcriptome")}
                            className={
                                volcanoType === "transcriptome" ? "SurvivalSelectedCss btn btnPrimary MAuto on" : "SurvivalNonSelectedCss btn MAuto"
                            }
                        >
                            <FormattedMessage id="Transcriptome" defaultMessage="Transcriptome" />
                        </button>


                        {project_id !== undefined && alltabList['proteome'] && <button
                            onClick={() => changeVolcanoType("proteome")}
                            className={
                                volcanoType === "proteome" ? "SurvivalSelectedCss btn btnPrimary MAuto on" : "SurvivalNonSelectedCss btn MAuto"
                            }
                        >
                            <FormattedMessage id="Proteome" defaultMessage="Proteome" />
                        </button>}

                        {project_id === undefined &&
                            <button
                                onClick={() => changeVolcanoType("proteome")}
                                className={
                                    volcanoType === "proteome" ? "SurvivalSelectedCss btn btnPrimary MAuto on" : "SurvivalNonSelectedCss btn MAuto"
                                }
                            >
                                <FormattedMessage id="Proteome" defaultMessage="Proteome" />
                            </button>
                        }
                    </div>

                    {volcanoType === "proteome" && (
                        <>
                            <h6 className="Block  TextBlue700 TextLG  FontBold MB2">
                                <FormattedMessage
                                    id="Choose sample type"
                                    defaultMessage="Choose sample type"
                                />
                            </h6>
                            <div className="Flex JustifyCenter Gap5 MarginBottom5">
                                <div className="flex-row items-center mb-4">
                                    <input
                                        onChange={() => setProteomeValue("N")}
                                        checked={proteomeValue === "N" ? true : false}
                                        id="default-radio-1"
                                        type="radio"
                                        defaultValue="normal"
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
                                        defaultValue="tumor"
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
                                    <div className="m-1 flex flex-row justify-around" style={{gap:"15px"}}>
                                        {
                                            <button
                                                onClick={() => {
                                                    setUserDefienedFilter("static");
                                                    setGroupFilters({});
                                                }}
                                                className={
                                                    userDefienedFilter === "static" ?
                                                     "SurvivalSelectedCss btn btnPrimary MAuto on" : "SurvivalNonSelectedCss btn MAuto"
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
                                                  ? "SurvivalSelectedCss btn btnPrimary MAuto on" : "SurvivalNonSelectedCss btn MAuto"
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
                            {project_id !== undefined && (
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
                            onClick={() => updateGroupFilters()}
                            className="btn btnPrimary MAuto on MarginBottom4"
                        >
                            <FormattedMessage
                                id="Submit_volcano"
                                defaultMessage="Submit"
                            />
                        </button>
                    )}
                </div>
            }

            {
                tab === 'fusion' &&
                <div>
                    <div
                        id="filterBox"
                        className={`lg:w-1/5 md:w-4/5 lg:block md:block lg:block sm:hidden ${smallScreen
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
                        {project_id !== undefined && (
                            <UserDefinedGroupFilters
                                viz_type="fusion"
                                parentCallback={updateGroupFilters}
                                groupFilters={groupFilters}
                            />
                        )}

                    </div>
                </div>
            }
        </div>
    )
}

export default VolcanoFusionFilterComponent