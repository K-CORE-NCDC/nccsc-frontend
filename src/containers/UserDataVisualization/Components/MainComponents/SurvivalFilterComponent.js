import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getClinicalMaxMinInfo } from '../../../../actions/api_actions';
import {
  PreDefienedFiltersSurvival,
  GroupFilters,
  UserDefinedGroupFilters,
} from '../../../Common/SurvivalFusionVolcanoFilters';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';

const SurvivalFilterComponent = ({ parentCallback, filterState, survialData, SVFState,SurvivalType }) => {
  const route = useLocation();
  const dispatch = useDispatch();
  const { project_id } = useParams();
  const intl = useIntl();

  const tabList = useSelector((data) => data.dataVisualizationReducer);
  const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);
  const userDefinedFilterColumns = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);

  const [groupFilters, setGroupFilters] = useState(survialData?.group_filters || {});
  const [fileredGene, setFilteredGene] = useState(survialData?.filter_gene || '');
  const [geneDatabase, setGeneDatabase] = useState(survialData?.gene_database || 'dna_mutation');
  const [filterTypeButton, setFilterTypeButton] = useState(survialData && survialData.clinical ? 'clinical' : 'omics');
  const [survivalModel, setSurvivalModel] = useState(survialData?.survival_type || 'recurrence');
  const [coxFilter, setCoxFilter] = useState(survialData?.coxFilter || {});
  const [coxUserDefinedFilter, setCoxUserDefinedFilter] = useState(survialData?.coxUserDefinedFilter || {});
  const [userDefienedFilter, setUserDefienedFilter] = useState(SVFState);
  const [vizType, setVizType] = useState('single');
  const [alltabList, setAllTabList] = useState({});
  const [initialUserDefiendRender, setInitialUserDefiendRender] = useState(true);
  const smallScreen = false;

  const [updateFiltersFlag, setUpdateFiltersFlag] = useState(false);

  useEffect(() => {
    if (!clinicalMaxMinInfo && project_id === undefined) {
      dispatch(getClinicalMaxMinInfo('GET', {}));
    }
  }, [clinicalMaxMinInfo, dispatch, project_id]);

  useEffect(()=>{
    setFilterTypeButton('clinical')
  },[SurvivalType])

  useEffect(() => {
    if ('userProjectsDataTable' in tabList) {
      setAllTabList(tabList.userProjectsDataTable);
    }
  }, [tabList]);

  useEffect(() => {
    setVizType(route.pathname.includes('visualise-singledata') ? 'single' : 'multi');
  }, [route.pathname]);

  useEffect(() => {
    if (userDefinedFilterColumns && userDefinedFilterColumns['filterJson'] && userDefinedFilterColumns['filterJson']['Clinical Information']) {
      const columns = userDefinedFilterColumns['filterJson']['Clinical Information'];
      delete columns['death_yn'];
      delete columns['death_cnfr_drtn'];
      setCoxUserDefinedFilter(columns);
    }
  }, [userDefinedFilterColumns]);

  useEffect(() => {
    if (survivalModel === 'cox') {
      let tmp = {};
      if (project_id) {
        Object.entries(coxUserDefinedFilter).forEach(([item, _]) => {
          if (item !== 'rlps_yn' && item !== 'rlps_cnfr_drtn' && (coxUserDefinedFilter[item][0]?.type !== "checkbox" || ["yes", "y", "no", "n", "true", "false"].includes(coxUserDefinedFilter[item][0]?.value?.toLowerCase()))) {
            // Use bracket notation to access coxFilter properties with dynamic keys
            if (coxFilter && item in coxFilter && coxFilter[item] === true) {
              tmp[item] = true;
            } else {
              tmp[item] = false;
            }
          }
        });
      } else {
        const tmpArray = [
          'BodyMassIndex',
          'AlcoholConsumption',
          'FamilyHistoryofBreastCancer',
          'IntakeOfContraceptivePill',
          'HormoneReplaceTherapy',
          'Menopause',
          'Childbirth',
          'DiagnosisofBilateralBreastCancer',
          'FirstMenstrualAge',
          'ERTestResults',
          'PRTestResults',
          'Ki67Index',
          'AgeOfDiagnosis'
        ];

        tmpArray.forEach((item) => {
          // Use bracket notation to access coxFilter properties with dynamic keys
          tmp[item] = coxFilter && item in coxFilter && coxFilter[item] === true ? true : false;
        });
      }

      setCoxFilter(tmp);
    }
  }, [survivalModel, coxUserDefinedFilter, project_id]);


  useEffect(() => {
    if (Object.keys(groupFilters).length > 0) {
      submitFitersAndFetchData();
    }
  }, [groupFilters]);

  useEffect(() => {
    if (initialUserDefiendRender) {
      setInitialUserDefiendRender(false);
      return;
    }
    setUpdateFiltersFlag(false);
  }, [userDefienedFilter]);

  const updateGroupFilters = (filtersObject) => {
    if (filtersObject) {
      setUpdateFiltersFlag(true);
      setGroupFilters(filtersObject);
    }
  };


  let resetFiltersData = () => {
    parentCallback({ updatedState: {} });
  }

  const selectCoxFiler = (e) => {
    const val_ = e.target.value;
    const check = e.target.checked;
    setCoxFilter((prevFilter) => ({ ...prevFilter, [val_]: check }));
  };

  const survivalModelFun = (type) => {
    setSurvivalModel(type);
  };

  const submitCox = (type) => {
    setSurvivalModel(type);
    const copyState = {
      survival_type: type,
      coxFilter,
      filterType: userDefienedFilter,
      coxUserDefinedFilter,
      viz_type: vizType,
    };
    console.log(copyState)
    if (type === 'cox' && Object.values(coxFilter).some((value) => value === true)) {
      parentCallback({ updatedState: copyState });
      setUpdateFiltersFlag(false)
    }
  };

  const selectAllCox = (type) => {
    const tmp = { ...coxFilter };
    for (const key in tmp) {
      tmp[key] = type === 'select';
    }
    setCoxFilter(tmp);
    if (type === 'reset') {
      parentCallback({ updatedState: {} });
    }
  };

  const ChangeGeneDataBase = (geneDB) => {
    setGeneDatabase(geneDB);
  };

  const submitFitersAndFetchData = () => {
    const copyState = {
      filterType: userDefienedFilter,
      survival_type: survivalModel,
      filter_gene: fileredGene,
      group_filters: groupFilters,
      gene_database: geneDatabase,
      clinical: filterTypeButton === 'clinical',
    };
    if (updateFiltersFlag && filterTypeButton !== 'omics') {
      if (filterTypeButton === 'clinical' && Object.keys(groupFilters).length > 0) {
        parentCallback({ updatedState: copyState });
      }
      setUpdateFiltersFlag(false)
    }
    else if (filterTypeButton === 'omics') {
      delete copyState.group_filters;
      if (project_id === undefined) {
        copyState.gene_database = geneDatabase;
        parentCallback({ updatedState: copyState });
      } else if (alltabList[geneDatabase] && copyState.filter_gene) {
        copyState.gene_database = geneDatabase;
        parentCallback({ updatedState: copyState });
      }

    }
  };

  return (
    <div>
      <div className="Margin0313">
        <div className="Flex FlexDirCol ColSpan3">
          <div className="Flex FlexDirRow">
            <h3 className="SurvivalChooseModel TextLeft">
              <FormattedMessage id="ChooseModel" defaultMessage="Choose Model" />
            </h3>
          </div>

          <div className="m-1 tab">
            <ul className="FlexDirCol">
              <li className={survivalModel === 'recurrence' ? 'on' : ''}>
                <button onClick={() => survivalModelFun('recurrence')}>Recurrence</button>
              </li>
              <li className={survivalModel === 'survival' ? 'on' : ''}>
                <button onClick={() => survivalModelFun('survival')}>Survival</button>
              </li>

              <li className={survivalModel === 'cox' ? 'on' : ''}>
                <button onClick={() => survivalModelFun('cox')}>Cox Regression</button>
              </li>
            </ul>
          </div>

          {(survivalModel === 'recurrence' || survivalModel === 'survival') && (
            <>
              <div className={`Flex FlexDirCol Border Backgroundwhite ${smallScreen ? 'Flex FlexDirRow SurvivalSmallScreen' : 'SurvivalSmallScreenHidden'}`}>
                {project_id === undefined && SurvivalType!=='single' &&  (
                  <h3 className="SurvivalChooseModel TextLeft">
                    <FormattedMessage id="Choose Filter group" defaultMessage="Choose Filter group" />
                  </h3>
                )}
                {project_id === undefined && SurvivalType!=='single' && (
                  <div className="m-1 tab Gap2">
                    <ul>
                      <li className={userDefienedFilter === 'static' ? 'on W50' : 'W50'}>
                        <button onClick={() => { setUserDefienedFilter('static'); setGroupFilters({}); }}>
                          <FormattedMessage id="Static_volcano" defaultMessage="Static" />
                        </button>
                      </li>
                      <li className={userDefienedFilter === 'dynamic' ? 'on W50' : 'W50'}>
                        <button onClick={() => { setUserDefienedFilter('dynamic'); setGroupFilters({}); }}>
                          <FormattedMessage id="Dynamic_volcano" defaultMessage="Dynamic" />
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                {SurvivalType!=='single' && (<>
                <h3 className="SurvivalChooseModel TextLeft">
                  <FormattedMessage id="ChooseFilterType" defaultMessage="Choose Filter Type" />
                </h3>
                <div className="m-1 tab Gap2 MarginTop2">
                  <ul>
                    <li className={filterTypeButton === 'omics' ? 'on W50' : 'W50'}>
                      <button onClick={() => setFilterTypeButton('omics')} id="Phospho" name="type">
                        <FormattedMessage id="Omics" defaultMessage="Omics" />
                      </button>
                    </li>
                    <li className={filterTypeButton === 'clinical' ? 'on W50' : 'W50'}>
                      <button onClick={() => setFilterTypeButton('clinical')} id="Mutation" name="type">
                        <FormattedMessage id="Clinical" defaultMessage="Clinical" />
                      </button>
                    </li>
                  </ul>
                </div></>)}

                {filterTypeButton && filterTypeButton === 'omics' && SurvivalType!=='single'&& (
                  <div className="M1 P1">
                    {filterState && filterState.genes && filterState.genes.length === 0 && (
                      <h6 className="MB2 TextLeft TextBase" style={{ color: 'red' }}>
                        <FormattedMessage id="SelectGenesOmics" defaultMessage="Please Select Genes from Gene Set Filter" />
                      </h6>
                    )}
                    <h6 className="MB2 TextLeft TextBase" htmlFor="dropdown-gene">
                      <FormattedMessage id="Select Gene" defaultMessage="Select Gene" />
                    </h6>
                    <select
                      id="dropdown-gene"
                      onChange={(e) => setFilteredGene(e.target.value)}
                      value={fileredGene}
                      className="SurvivalSelectDatabase"
                    >
                      <option className="TextBase" defaultValue={fileredGene === ''} value=""></option>
                      {filterState && filterState.genes && filterState.genes.length > 0 && filterState.genes.map((gene, index) => (
                        <option className="TextBase" defaultValue={fileredGene === gene} key={`${gene}-${index}`} value={gene}>
                          {gene}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {filterTypeButton && filterTypeButton === 'omics' && SurvivalType!=='single' && (
                  <div className="M1 P1">
                    {project_id !== undefined && !alltabList[geneDatabase] && (
                      <p className="ErrorText MB1 MultiUploadTextCenter" style={{ textTransform: 'capitalize' }}>
                        <FormattedMessage id="UploadGeneDB" defaultMessage={`Please Upload ${geneDatabase} file to use the ${geneDatabase} Database`} />
                      </p>
                    )}

                    <div className='Flex'>
                      <h6 className=" MB1 TextLeft TextBase" htmlFor="dropdown-database">
                        <FormattedMessage id="SelectDatabase" defaultMessage="Select Database" />
                      </h6>
                      {geneDatabase === 'dna_mutation' && <h6>
                        <FormattedMessage id='SurvivalDNAMutationTooltip1' defaultMessage="Samples with 7 major mutations for the selected genes that belong to the Mutation group.">
                          {(placeholder) => (
                            <>
                              <QuestionMarkCircleIcon
                                data-multiline={true}
                                className="inline ml-2 mb-1"
                                data-class="my-tooltip"
                                data-tip={`DNA Mutation:  ${placeholder} <br>  <br/>  ${intl.formatMessage({ id: "SurvivalDNAMutationTooltip3", defaultMessage: '7 major mutations: ' })}Missense mutation, Nonsense mutation, Splice site, <br>  <br/>In frame insertion, In frame deletion, Frame-shift insertion, Frame-shift deletion
                                          <br>No Mutation:${intl.formatMessage({ id: "SurvivalDNAMutationTooltip2", defaultMessage: 'When there are no major 7 mutation types for the selected gene' })}`}
                                style={{ width: '20px', cursor: 'pointer' }} />
                              <ReactTooltip />
                            </>
                          )}
                        </FormattedMessage>
                      </h6>}
                      {geneDatabase === 'rna' && <h6>
                        <QuestionMarkCircleIcon
                          data-multiline="true"
                          className="inline ml-2 mb-1"
                          data-tip="RNA high : z-score ≥ 1,<br>  <br/>RNA low : z-score ≤ -1 "
                          style={{ width: '20px', cursor: 'pointer' }}
                        ></QuestionMarkCircleIcon>
                        <ReactTooltip />
                      </h6>}
                      {geneDatabase === 'proteome' && <h6>
                        <QuestionMarkCircleIcon
                          data-multiline="true"
                          className="inline ml-2 mb-1"
                          data-tip="Proteome high : z-score ≥ 1.5,<br>  <br/>Proteome low : z-score ≤ 0.5"
                          style={{ width: '20px', cursor: 'pointer' }}
                        ></QuestionMarkCircleIcon>
                        <ReactTooltip />
                      </h6>}
                    </div>
                    <select
                      id="dropdown-database"
                      onChange={(e) => ChangeGeneDataBase(e.target.value)}
                      defaultValue={geneDatabase}
                      className="SurvivalSelectDatabase"
                    >
                      <option className="TextBase" defaultValue={geneDatabase === 'dna_mutation'} value="dna_mutation">
                        DNA Mutation
                      </option>
                      <option className="TextBase" defaultValue={geneDatabase === 'rna'} value="rna">
                        RNA Expression
                      </option>
                      <option className="TextBase" defaultValue={geneDatabase === 'proteome'} value="proteome">
                        Global Proteome
                      </option>
                    </select>

                  </div>
                )}

                {filterTypeButton === 'clinical' && userDefienedFilter === 'static' && project_id === undefined && (
                  <PreDefienedFiltersSurvival type="survival" viz_type="survival" parentCallback={updateGroupFilters} groupFilters={groupFilters} resetFiltersData={resetFiltersData} />
                )}

                {filterTypeButton === 'clinical' && userDefienedFilter === 'dynamic' && project_id === undefined && (
                  <GroupFilters viz_type="survival" parentCallback={updateGroupFilters} resetFiltersData={resetFiltersData} groupFilters={groupFilters} />
                )}

                {filterTypeButton === 'clinical' && project_id !== undefined && (
                  <UserDefinedGroupFilters viz_type="survival" parentCallback={updateGroupFilters} groupFilters={groupFilters} survivalModel={survivalModel} resetFiltersData={resetFiltersData} />
                )}

                {filterTypeButton === 'omics' && (
                  <div className="FilterGeneSet M1">
                    <div className="P1 PY3 PX2 W50">
                      <button
                        onClick={submitFitersAndFetchData}
                        className="FilterLabelText FilterButton"
                        style={{ backgroundColor: 'rgb(0, 159, 226)', border: '1px solid white' }}
                      >
                        <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
                      </button>
                    </div>
                    <div className="P1 PY3 PX2 W50">
                      <button className="FilterLabelText FilterButton" onClick={() => setFilteredGene('')}>
                        <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </>
          )}

          {survivalModel === 'cox' && (
            <>
              <div className={`Flex FlexDirCol border Backgroundwhite ${smallScreen ? 'Flex FlexDirRow SurvivalSmallScreen' : 'SurvivalSmallScreenHidden'}`}>
                <h3 className="SurvivalChooseModel TextLeft">
                  <FormattedMessage id="Choose Filter group" defaultMessage="Choose Filter group" />
                </h3>
                <div className="m-1 Flex FlexDirRow JustifyContent WMax">
                  <div className="Flex JustifyCenter">
                    <div>
                      {Object.entries(coxFilter).map(([key, value], index) => (
                        <div className="form-check Flex MB4" key={'cox' + index}>
                          <label className="form-check-label TextLeft Inline TextGray800 TextBase" htmlFor={'flexCheckChecked_' + index}>
                            <input
                              onChange={(e) => selectCoxFiler(e)}
                              className="form-check-input SurvivalInputBackgroundwhite"
                              type="checkbox"
                              name={key} // Use the key as the name
                              id={'flexCheckChecked_' + index}
                              checked={value}
                              defaultValue={key}
                              style={{ marginRight: '5px' }}
                            />
                            <FormattedMessage id={key} defaultMessage={key} /> {/* Use 'value' as the default message */}
                          </label>
                        </div>
                      ))}
                      <div className="Flex FlexDirRow Gap5">
                        <button
                          onClick={() => selectAllCox('select')}
                          style={{ backgroundColor: 'rgb(0, 159, 226)', border: '1px solid white', color: 'black' }}
                          className={survivalModel === 'cox' ? 'SurvivalSelectedCss btn btnPrimary' : 'SurvivalNonSelectedCss btn'}
                        >
                          <FormattedMessage id="SelectAll" defaultMessage="Select All" />
                        </button>
                        <button onClick={() => selectAllCox('reset')} className="SurvivalSelectedCss btn" style={{ color: 'black' }}>
                          <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
                        </button>
                      </div>
                      <div className="Flex FlexDirRow Gap5 PY2">
                        <button onClick={() => submitCox('cox')} className="FilterLabelText FilterButton" style={{ backgroundColor: 'rgb(0, 159, 226)', border: '1px solid white' }}>
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
    </div >
  );
};

export default SurvivalFilterComponent;