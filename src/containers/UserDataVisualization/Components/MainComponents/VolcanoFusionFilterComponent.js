import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GroupFilters, PreDefienedFilters, UserDefinedGroupFilters } from '../../../Common/SurvivalFusionVolcanoFilters';
import { getClinicalMaxMinInfo } from '../../../../actions/api_actions';

let VolcanoFusionFilterComponent = ({ parentCallback, tab, VFData, SVFState }) => {

  const tabList = useSelector((data) => data.dataVisualizationReducer);
  const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);

  const dispatch = useDispatch();
  let { project_id } = useParams();

  const [groupFilters, setGroupFilters] = useState(VFData?.groupFilters || {});
  const [volcanoType, setVolcanoType] = useState('transcriptome');
  const [proteomeValue, setProteomeValue] = useState('N');
  const [userDefinedFilter, setUserDefienedFilter] = useState(SVFState);
  const [alltabList, setAllTabList] = useState({});
  const [updateFiltersFlag, setUpdateFiltersFlag] = useState(false);
  const [initialUserDefiendRender, setInitialUserDefiendRender] = useState(true);


  // fusion
  const smallScreen = false
  const sampleCount = {};

  const changeVolcanoType = (e) => {
    if (e === 'transcriptome') {
      setVolcanoType('transcriptome');
      setProteomeValue('N');
    } else {
      setVolcanoType('proteome');
    }
    let d = {};
    setGroupFilters({ ...d });
  };

  useEffect(() => {
    if ('userProjectsDataTable' in tabList) {
      setAllTabList(tabList.userProjectsDataTable);
    }
  }, [tabList]);


  const updateGroupFilters = (filtersObject) => {
    if (tab === 'volcano') {
      if (filtersObject && proteomeValue !== 'NT') {
        setGroupFilters(filtersObject);
        setUpdateFiltersFlag(true);
      } else {
        setGroupFilters(filtersObject);
        setUpdateFiltersFlag(true);
      }
    } else if (tab === 'fusion') {
      setGroupFilters(filtersObject);
      setUpdateFiltersFlag(true);
    }
  };

  let resetFiltersData = () => {
    parentCallback({ volcanoFusionFilterData: {} });
  }

  useEffect(() => {
    if (updateFiltersFlag) {

      if (tab === 'volcano') {
        let volcanoFusionFilterData = {};

        volcanoFusionFilterData['groupFilters'] = groupFilters;

        if (proteomeValue === 'NT') {
          volcanoFusionFilterData['groupFilters'] = {};
        }

        volcanoFusionFilterData['volcanoType'] = volcanoType;
        volcanoFusionFilterData['volcanoTranscriptomeType'] = proteomeValue;
        volcanoFusionFilterData['filterType'] = userDefinedFilter;
        if (volcanoType === 'transcriptome' && proteomeValue==="NT"){
          parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData });
        }
        if (volcanoType === 'transcriptome' && groupFilters && Object.keys(groupFilters).length) {
          parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData });
        } else if (
          volcanoType === 'proteome' &&
          (proteomeValue === 'N' || proteomeValue === 'T') &&
          groupFilters &&
          Object.keys(groupFilters).length
        ) {
          parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData });
        } else if (volcanoType === 'proteome' && proteomeValue === 'NT') {
          parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData });
        }
      }
      else if (tab === 'fusion') {
        let volcanoFusionFilterData = {};
        volcanoFusionFilterData['groupFilters'] = groupFilters;
        volcanoFusionFilterData['filterType'] = userDefinedFilter;
        if (groupFilters && Object.keys(groupFilters).length) {
          parentCallback({ volcanoFusionFilterData: volcanoFusionFilterData });
        }
      }
      setUpdateFiltersFlag(false)
    }

  }, [updateFiltersFlag, groupFilters]);

  useEffect(() => {
    if (initialUserDefiendRender) {
      setInitialUserDefiendRender(false);
      return;
    }
    setUpdateFiltersFlag(false);
  }, [userDefinedFilter]);

  useEffect(() => {
    if (!clinicalMaxMinInfo) {
      if (project_id === undefined) {
        dispatch(getClinicalMaxMinInfo('GET', {}));
      }
    }
  }, []);

  return (
    <div>
      {tab === 'volcano' && (
        <div>
          <div className="M4 JustifyContent Gap2 tab">
            <ul>
              <li className={volcanoType === 'transcriptome' ? 'on W50' : ' W50 '}>
                <button onClick={() => changeVolcanoType('transcriptome')}>
                  <FormattedMessage id="Transcriptome" defaultMessage="Transcriptome" />
                </button>
              </li>

              {project_id !== undefined && alltabList['proteome'] && (
                <li className={volcanoType === 'proteome' ? 'on W50' : ' W50 '}>
                  <button onClick={() => changeVolcanoType('proteome')}>
                    <FormattedMessage id="Proteome" defaultMessage="Proteome" />
                  </button>
                </li>
              )}

              {project_id === undefined && (
                <li className={volcanoType === 'proteome' ? 'on W50' : ' W50 '}>
                  <button onClick={() => changeVolcanoType('proteome')}>
                    <FormattedMessage id="Proteome" defaultMessage="Proteome" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {(volcanoType === 'proteome' ||volcanoType === 'transcriptome') && (
            <>
              <h6 className="MarginLeft4 Block  TextBlue700 TextBase  FontBold MB2 TextLeft">
                <FormattedMessage id="Choose sample type" defaultMessage="Choose sample type" />
              </h6>
              <div className="Flex JustifyCenter Gap5 MarginBottom5">
                <div className="flex-row items-center mb-4">
                  <input
                    onChange={() => setProteomeValue('N')}
                    checked={proteomeValue === 'N' ? true : false}
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
                    onChange={() => setProteomeValue('T')}
                    checked={proteomeValue === 'T' ? true : false}
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
                    onChange={() => setProteomeValue('NT')}
                    checked={proteomeValue === 'NT' ? true : false}
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

          {proteomeValue !== 'NT' && (
            <>
              {project_id === undefined && (
                <h6 className="p-4 ml-1 text-left text-bold sm:text-xl lg:text-2xl text-blue-700">
                  <FormattedMessage
                    id="Choose Filter group"
                    defaultMessage="Choose Filter group"
                  />
                </h6>
              ) && (
                  <div className="m-1   tab" style={{ gap: '15px' }}>
                    <ul>
                      {
                        <li className={userDefinedFilter === 'static' ? ' on W50' : ' W50'}>
                          <button
                            onClick={() => {
                              setUserDefienedFilter('static');
                              setGroupFilters({});
                            }}
                          >
                            <FormattedMessage id="Static_volcano" defaultMessage="Static" />
                          </button>
                        </li>
                      }
                      <li className={userDefinedFilter === 'dynamic' ? 'on W50' : ' W50'}>
                        <button
                          onClick={() => {
                            setUserDefienedFilter('dynamic');
                            setGroupFilters({});
                          }}
                        >
                          <FormattedMessage id="Dynamic_volcano" defaultMessage="Dynamic" />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              {userDefinedFilter === 'static' && project_id === undefined && (
                <PreDefienedFilters
                  viz_type="volcono"
                  groupFilters={groupFilters}
                  parentCallback={updateGroupFilters}
                  resetFiltersData={resetFiltersData}
                />

              )}
              {userDefinedFilter === 'dynamic' && project_id === undefined && (
                <GroupFilters
                  volcanoType={volcanoType}
                  viz_type="volcono"
                  groupFilters={groupFilters}
                  parentCallback={updateGroupFilters}
                  resetFiltersData={resetFiltersData}
                />
              )}
              {project_id !== undefined && (
                <UserDefinedGroupFilters
                  volcanoType={volcanoType}
                  viz_type="volcono"
                  groupFilters={groupFilters}
                  parentCallback={updateGroupFilters}
                  resetFiltersData={resetFiltersData}
                />
              )}
            </>
          )}

          {proteomeValue === 'NT' && (
            <button
              onClick={() => updateGroupFilters()}
              className="btn btnPrimary MAuto on MarginBottom4"
            >
              <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
            </button>
          )}
        </div>
      )}

      {tab === 'fusion' && (
        <div>
          <div
            id="filterBox"
            className={`lg:w-1/5 md:w-4/5 lg:block md:block lg:block sm:hidden ${smallScreen ? 'xs:mr-80 xs:z-10 xs:opacity-95 xs:bg-white' : 'xs:hidden'
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
              <div className="m-1 tab" style={{ gap: '10px' }}>
                <ul>
                  <li className={userDefinedFilter === 'static' ? ' on W50' : ' W50 '}>
                    <button
                      onClick={() => {
                        setUserDefienedFilter('static');
                        setGroupFilters({});
                      }}
                    >
                      <FormattedMessage id="Static_volcano" defaultMessage="Static" />
                    </button>
                  </li>
                  <li className={userDefinedFilter === 'dynamic' ? ' on W50' : 'W50'}>
                    <button
                      onClick={() => {
                        setUserDefienedFilter('dynamic');
                        setGroupFilters({});
                      }}
                    >
                      <FormattedMessage id="Dynamic_volcano" defaultMessage="Dynamic" />
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {userDefinedFilter === 'static' && project_id === undefined && (
              <PreDefienedFilters
                viz_type="fusion"
                groupFilters={groupFilters}
                parentCallback={updateGroupFilters}
                resetFiltersData={resetFiltersData}
              />
            )}
            {userDefinedFilter === 'dynamic' && project_id === undefined && (
              <GroupFilters
                viz_type="fusion"
                groupFilters={groupFilters}
                parentCallback={updateGroupFilters}
                resetFiltersData={resetFiltersData}
              />
            )}
            {project_id !== undefined && (
              <UserDefinedGroupFilters
                viz_type="fusion"
                groupFilters={groupFilters}
                parentCallback={updateGroupFilters}
                resetFiltersData={resetFiltersData}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VolcanoFusionFilterComponent;
