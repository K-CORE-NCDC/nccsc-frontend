import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getClinicalMaxMinInfo } from '../../../../actions/api_actions';
import {
  PreDefienedFiltersSurvival,
  GroupFilters,
  UserDefinedGroupFilters,
} from '../../../Common/SurvivalFusionVolcanoFilters';

const SurvivalFilterComponent = ({ parentCallback, filterState }) => {
  const route = useLocation();
  const dispatch = useDispatch();
  const { project_id } = useParams();

  const tabList = useSelector((data) => data.dataVisualizationReducer);
  const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);
  const userDefinedFilterColumns = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);

  const [fileredGene, setFilteredGene] = useState('');
  const [groupFilters, setGroupFilters] = useState({});
  const [geneDatabase, setGeneDatabase] = useState('dna_mutation');
  const [filterTypeButton, setFilterTypeButton] = useState('clinical');
  const [vizType, setVizType] = useState('single');
  const [userDefienedFilter, setUserDefienedFilter] = useState('static');
  const [alltabList, setAllTabList] = useState({});
  const [coxUserDefinedFilter, setCoxUserDefinedFilter] = useState({});
  const [survivalModel, setSurvivalModel] = useState('recurrence');
  const [coxFilter, setCoxFilter] = useState({});
  const smallScreen = false;

  useEffect(() => {
    if (project_id) {
      setUserDefienedFilter('dynamic')
    }
    else {
      setUserDefienedFilter('static')
    }
  }, [])

  useEffect(() => {
    if (!clinicalMaxMinInfo && project_id === undefined) {
      dispatch(getClinicalMaxMinInfo('GET', {}));
    }
  }, [clinicalMaxMinInfo, dispatch, project_id]);

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
      console.log('columns',columns);
      delete columns['death_yn'];
      delete columns['death_cnfr_drtn'];
      setCoxUserDefinedFilter(columns);
    }
  }, [userDefinedFilterColumns]);

  useEffect(() => {
    if (survivalModel === 'cox') {
      const tmp = {};
      if (project_id !== undefined) {
        for (let a in coxUserDefinedFilter) {
          if (a !== 'rlps_yn' && a !== 'rlps_cnfr_drtn') {
            // if (coxUserDefinedFilter[a][0]?.value === 'yes' && coxUserDefinedFilter[a][0]?.value === 'no') {
            // if (coxUserDefinedFilter[a][0]?.value) {
              tmp[a] = false;
            // }
          }
        }
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
        tmpArray.forEach((item) => (tmp[item] = false));
      }
      console.log('tmpppppp',tmp);
      setCoxFilter(tmp);
    }
  }, [survivalModel, coxUserDefinedFilter, project_id]);

  useEffect(() => {
    if (Object.keys(groupFilters).length > 0) {
      submitFitersAndFetchData();
    }
  }, [groupFilters]);

  const updateGroupFilters = (filtersObject) => {
    if (filtersObject) {
      setGroupFilters(filtersObject);
    }
  };

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
    if (type === 'cox' && Object.values(coxFilter).some((value) => value === true)) {
      parentCallback({ updatedState: copyState });
    }
  };

  const selectAllCox = (type) => {
    console.log('coxFilter',coxFilter);
    const tmp = { ...coxFilter };
    console.log('tmp', tmp);
    for (const key in tmp) {
      tmp[key] = type === 'select';
    }
    setCoxFilter(tmp);
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

    if (filterTypeButton === 'omics') {
      if (project_id === undefined) {
        copyState.gene_database = geneDatabase;
        parentCallback({ updatedState: copyState });
      } else if (alltabList[geneDatabase] && copyState.filter_gene) {
        copyState.gene_database = geneDatabase;
        parentCallback({ updatedState: copyState });
      }
    } else if (filterTypeButton === 'clinical' && Object.keys(groupFilters).length > 0) {
      parentCallback({ updatedState: copyState });
    }
  };

  const tmp =
    project_id !== undefined
      ? Object.keys(coxUserDefinedFilter).filter(
        // (a) => a !== 'rlps_yn' && a !== 'rlps_cnfr_drtn' && (!coxUserDefinedFilter[a][0].value || coxUserDefinedFilter[a][0].value === 'yes' || coxUserDefinedFilter[a][0].value === 'no')
        (a) => a !== 'rlps_yn' && a !== 'rlps_cnfr_drtn')
      : [
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
        'AgeOfDiagnosis',
      ];


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
                {project_id === undefined && (
                  <h3 className="SurvivalChooseModel TextLeft">
                    <FormattedMessage id="Choose Filter group" defaultMessage="Choose Filter group" />
                  </h3>
                )}
                {project_id === undefined && (
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
                <h3 className="SurvivalChooseModel TextLeft">
                  <FormattedMessage id="ChooseFilterType" defaultMessage="Choose Filter Type" />
                </h3>
                <div className="m-1 tab Gap2 MarginTop2">
                  <ul>
                    <li className={filterTypeButton === 'clinical' ? 'on W50' : 'W50'}>
                      <button onClick={() => setFilterTypeButton('clinical')} id="Mutation" name="type">
                        <FormattedMessage id="Clinical" defaultMessage="Clinical" />
                      </button>
                    </li>
                    <li className={filterTypeButton === 'omics' ? 'on W50' : 'W50'}>
                      <button onClick={() => setFilterTypeButton('omics')} id="Phospho" name="type">
                        <FormattedMessage id="Omics" defaultMessage="Omics" />
                      </button>
                    </li>
                  </ul>
                </div>

                {filterTypeButton && filterTypeButton === 'omics' && (
                  <div className="M1 P1">
                    {filterState && filterState.genes && filterState.genes.length === 0 && (
                      <h6 className="MB2 TextLeft TextBase">
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
                {filterTypeButton && filterTypeButton === 'omics' && (
                  <div className="M1 P1">
                    {project_id !== undefined && !alltabList[geneDatabase] && (
                      <p className="ErrorText MB1 MultiUploadTextCenter" style={{ textTransform: 'capitalize' }}>
                        <FormattedMessage id="UploadGeneDB" defaultMessage={`Please Upload ${geneDatabase} file to use the ${geneDatabase} Database`} />
                      </p>
                    )}
                    <h6 className=" MB1 TextLeft TextBase" htmlFor="dropdown-database">
                      <FormattedMessage id="SelectDatabase" defaultMessage="Select Database" />
                    </h6>
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
                  <PreDefienedFiltersSurvival type="survival" viz_type="survival" parentCallback={updateGroupFilters} survivalModel={survivalModel} />
                )}

                {filterTypeButton === 'clinical' && userDefienedFilter === 'dynamic' && project_id === undefined && (
                  <GroupFilters viz_type="survival" parentCallback={updateGroupFilters} />
                )}

                {filterTypeButton === 'clinical' && project_id !== undefined && (
                  <UserDefinedGroupFilters viz_type="survival" parentCallback={updateGroupFilters} groupFilters={groupFilters} survivalModel={survivalModel} />
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
                      {tmp.map((element, index) => (
                        <div className="form-check Flex MB4" key={'cox' + index}>
                          <label className="form-check-label TextLeft Inline TextGray800 TextBase" htmlFor={'flexCheckChecked_' + index}>
                            <input
                              onChange={(e) => selectCoxFiler(e)}
                              className="form-check-input SurvivalInputBackgroundwhite"
                              type="checkbox"
                              name={element}
                              id={'flexCheckChecked_' + index}
                              checked={coxFilter[element] || false}
                              defaultValue={element}
                              style={{ marginRight: '5px' }}
                            />
                            <FormattedMessage id={element} defaultMessage={element} />
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