import { BeakerIcon, DocumentAddIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import inputJson from './data';
import { samplesCount } from '../../actions/api_actions'

export default function Filter({ parentCallback, filterState, project_id }) {
  const [state, setState] = useState({ html: [] });
  const [selectState, setSelectState] = useState({ filterCondition: 'and' });
  const [selected, setSelected] = useState('Basic/Diagnostic Information');
  const [filtersUi, setFiltersUi] = useState({});
  const [filterHtml, setFilterHtml] = useState([]);
  const userDefinedFilter = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);
  const [filteredSamples, setFilteredSamples] = useState(0);
  const [totalSamplesCount, setTotalSamplesCount] = useState(0);
  const [filterJson, setFilterJson] = useState({});
  const SampleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);
  const [filterCondition, setFilterCondition] = useState('and');

  useEffect(() => {
    let returnedData = samplesCount("POST", { project_id: project_id })
    returnedData
      .then((result) => {
        if (result.status === 200 && result.data && 'no_of_samples' in result.data) {
          setTotalSamplesCount(result.data.no_of_samples);
        }
      })
      .catch(() => {
        setTotalSamplesCount(0);
      });
  }, [])

  useEffect(() => {
    if (Object.keys(filterState).length !== 0) {
      setSelectState({ ...filterState });
      switchButton();
    }
  }, [filterState]);

  useEffect(() => {
    if (SampleRnidListData) {
      setFilteredSamples(Object.keys(SampleRnidListData).length);
    }
  }, [SampleRnidListData]);

  useEffect(() => {
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        setSelected('Clinical Information');
        setFilterJson(userDefinedFilter['filterJson']);
        if (
          userDefinedFilter['filterJson'] &&
          'Clinical Information' in userDefinedFilter['filterJson']
        ) {
          let obj_dict = {};
          let obj = userDefinedFilter['filterJson']['Clinical Information'];
          Object.keys(obj).forEach((key) => {
            obj[key].forEach((list) => {
              if (key in obj_dict) {
                obj_dict[key].push(list['id']);
              } else {
                obj_dict[key] = [];
                obj_dict[key].push(list['id']);
              }
            });
          });
        }
      }
    } else {
      let filterBoxes = inputJson.filterBoxes;
      setFilterJson(filterBoxes);
    }
  }, [project_id, userDefinedFilter]);

  useEffect(() => {
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        leftSide(filterJson);
        drawTags(filterJson);
      }
    } else {
      leftSide(filterJson);
      drawTags(filterJson);
    }
  }, [userDefinedFilter, filterJson]);

  useEffect(() => {
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        leftSide(filterJson);
        drawTags(filterJson);
      }
    } else {
      leftSide(filterJson);
      drawTags(filterJson);
    }
  }, [selected, selectState, filterJson]);

  useEffect(() => {
    let html = [];
    if (Object.keys(filtersUi).length > 0) {
      Object.keys(filtersUi).forEach((e) => {
        let tmp = [];
        if (filtersUi[e].length > 0) {
          filtersUi[e].forEach((sub) => {
            tmp.push(
              <span key={`${sub.key}-${Math.random()}`} className="FilterSpan">
                {sub.key}:&nbsp;{sub.value}
              </span>
            );
          });
        }
        if (tmp.length > 0) {
          html.push(
            <div className="MarginBottom5" key={e + '_filter'}>
              <h4 className="MarginBottom5">{e}</h4>
              {tmp}
            </div>
          );
        }
      });
    }

    setFilterHtml(html);
  }, [filtersUi]);


  // for rendering the filter // inputs and checkboxes all html store in state
  const leftSide = (filterBoxes) => {
    let html = [];
    Object.keys(filterBoxes).forEach((item, k) => {
      let t = [];
      if (filterBoxes[item]) {
        let childElements = filterBoxes[item];
        Object.keys(childElements).forEach((childelm, c) => {
          let childHtml = childElements[childelm];
          let inputHtml = [];
          for (var i = 0; i < childHtml.length; i++) {
            let type = childHtml[i].type;
            // eslint-disable-next-line default-case
            switch (type) {
              case 'checkbox':
                inputHtml.push(checkbox(childHtml[i]));
                break;
              case 'number':
                inputHtml.push(inputbox(childHtml[i]));
                break;
            }
          }
          let color = inputJson['clinicalColor'][item];
          let id = item.split(' ').join('');
          t.push(
            <div className=" PaddingT10 PaddingB10 Relative ZIndex10" key={'div_mb_' + c}>
              <div htmlFor="toogleA" className="Flex ItemsCenter CursorPointer">
                <div className="Toggle FilterLabelText">
                  {childelm in chart_names ? (
                    <FormattedMessage id={childelm} defaultMessage={chart_names[childelm]} />
                  ) : (
                    <FormattedMessage id={childelm} defaultMessage={childelm} />
                  )}
                </div>
                <div
                  className="Relative"
                  style={{ paddingRight: '0.5rem' }}
                  onClick={(e) => checkBoxFn(e, 'md_' + id + '_' + c)}
                >
                  <label htmlFor={'md_' + id + '_' + c}></label>
                  <input
                    type="checkbox"
                    id={'md_' + id + '_' + c}
                    checked="checked"
                    data-parent={item}
                    className="CheckBoxSROnly"
                    onChange={(e) => checkBoxFn(e, 'md_' + id + '_' + c)}
                  />
                  <div
                    className="Block InputCheckBox"
                    id={'md_' + id + '_' + c + '_toggle'}
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="Absolute FilterDot" style={{ backgroundColor: '#fff' }}></div>
                </div>
              </div>
              <div className="py-5" id={'child_md_' + id + '_' + c}>
                {inputHtml}
              </div>
            </div>
          );
        });
      }
      html.push(
        <div
          key={item + '_' + k}
          className=" WFull OverFlowHidden BorderTop1 "
          onClick={(e) => switchButton(e, item, k)}
        >
          <input className="Absolute Opacity0" id={'tab-single-' + k} type="radio" name="tabs2" />
          <label className="Block P1 LeadingNormal CursorPointer" htmlFor={'tab-single-' + k}>
            {icon_type[item]}
            <span className="IconType Text2XL ">
              <FormattedMessage id={item} defaultMessage={item} />
            </span>
          </label>
          {selected === item ? (
            <div className="tab-content OverFlowHidden LeadingNormal Relative SelectedItem">
              {t}
            </div>
          ) : (
            ''
          )}
        </div>
      );
    });
    setState((prevState) => ({
      ...prevState,
      html: html
    }));
  };

  let icon_type = {
    'Basic/Diagnostic Information': <UserCircleIcon className="IconClass" />,
    'Patient Health Information': <DocumentAddIcon className="IconClass" />,
    'Clinical Information': <BeakerIcon className="IconClass" />,
    'Follow-up Observation': <SearchIcon className="IconClass" />
  };
  // sample_id	Age	Sex	ath_Stage_T	ath_Stage_N	Stage	BMI	Tobacco_smoking_history	Alcohol_history	Hypertension_history	Diabetes_history	rlps_yn	rlps_cnfr_drtn	death_yn	death_cnfr_drtn
  let chart_names = {
    'Age Of Diagnosis': 'Age of Diagnosis (20-40 Y)',
    'Body Mass Index': 'Body Mass Index (15.82-36.33 kg/㎡)',
    // 'First Menstrual Age': 'First Menstrual Age (10-17 Y)',
    // 'Duration of Breastfeeding': 'Duration of Breastfeeding (1-24 M)',
    // 'Ki-67 Index': 'Ki-67 Index(1-95 %)',
    'Time until relapse is confirmed': 'Time until relapse is confirmed (1-16 Y)'
  };

  let checkbox = (d) => {
    let check = false;
    if (d.id in selectState) {
      check = true;
    }
    return (
      <div key={d.id} className="PX10">
        <label htmlFor={d.id} className="ItemsCenter">
          <input
            type="checkbox"
            id={d.id}
            name={d.name}
            className="form-checkbox"
            value={d.value}
            defaultChecked={check}
            onChange={(e) => selectFn(e)}
          />
          <span className="MarginLeft2 LabelText">
            <FormattedMessage id={d.value} defaultMessage={d.value} />
          </span>
        </label>
      </div>
    );
  };

  let inputbox = (d) => {
    return (
      <div key={d.id} className="FilterInputGrid">
        <div className="">
          <label htmlFor={'from_' + d.id}></label>
          <input
            type="number"
            id={'from_' + d.id}
            className="HFull FilterNumberStyle Rounded"
            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
            defaultValue={selectState[`from_${d.id}`] || ''}
            onChange={(e) => selectFn(e)}
            placeholder={d.min}
            min={d.min}
            max={d.max}
          />
        </div>
        <div className="">
          <div className="FilterNumberLineBreak HFull">
            <b>-</b>
          </div>
        </div>
        <div className="">
          <label htmlFor={'to_' + d.id}></label>
          <input
            type="number"
            id={'to_' + d.id}
            className="HFull FilterNumberStyle"
            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
            defaultValue={selectState[`to_${d.id}`] || ''}
            onChange={(e) => selectFn(e)}
            placeholder={d.max}
            min={d.min}
            max={d.max}
          />
        </div>
      </div>
    );
  };

  const selectFn = (e) => {
    let val = e.target.value;
    let id = e.target.id;
    let tmp = selectState;

    var index = id.indexOf('_');
    var m_id = id.substr(index + 1);
    if (e.target.type === 'number') {
      let from_0 = document.getElementById(`from_${m_id}`);
      let from_ = from_0 ? +from_0.value : from_0.min;
      let min_value = from_0 ? +from_0.min : 0;
      let to_0 = document.getElementById(`to_${m_id}`);
      let to_ = to_0 ? +to_0.value : from_0.max;
      let max_value = from_0 ? +from_0.max : 0;

      let checked = true;

      if (from_ > max_value || from_ < min_value || from_ > to_) {
        delete tmp[`from_${m_id}`];
        delete tmp[`to_${m_id}`];
        setSelectState(tmp);
        checked = false;
      } else if (to_ > max_value || to_ < min_value || to_ < from_) {
        delete tmp[`from_${m_id}`];
        delete tmp[`to_${m_id}`];
        setSelectState(tmp);
        checked = false;
      } else {
        tmp[`from_${m_id}`] = from_;
        tmp[`to_${m_id}`] = to_;
        setSelectState(tmp);
      }

      if (checked) {
        from_0.classList.remove('Border2');
        from_0.classList.remove('BorderRed400');
        to_0.classList.remove('Border2');
        to_0.classList.remove('BorderRed400');
      } else {
        from_0.classList.add('Border2');
        from_0.classList.add('BorderRed400');
        to_0.classList.add('Border2');
        to_0.classList.add('BorderRed400');
        delete tmp[`from_${m_id}`];
        delete tmp[`to_${m_id}`];
        setSelectState(tmp);
      }
    } else {
      if (id in tmp) {
        delete tmp[id];
        document.getElementById(id).checked = false;
      } else {
        tmp[id] = val;
        document.getElementById(id).checked = true;
      }
    }
    setSelectState({ ...tmp });
  };

  const checkboxselectFn = (e) => {
    let id = e.id;
    let tmp = selectState;
    if (e.type === 'number') {
      e.classList.remove('Border2');
      e.classList.remove('BorderRed400');
      if (id in tmp) {
        delete tmp[id];
      }
      e.value = '';
    } else {
      if (id in tmp) {
        delete tmp[id];
      }
      e.checked = false;
    }
  };

  const checkBoxFn = (event, id) => {
    let child_id = 'child_' + id;
    let child_did = document.getElementById(child_id);
    const inputElements = child_did.querySelectorAll('input, select, checkbox, textarea');
    for (let e in inputElements) {
      if (inputElements[e].id) {
        checkboxselectFn(inputElements[e]);
      }
    }
    var did = document.getElementById(id);

    var checkbox_elm = document.getElementById(id).checked;
    if (checkbox_elm) {
      document.getElementById(id).checked = false;
      document.getElementById(id + '_toggle').style.background = '#ccc';
      document.getElementById('child_' + id).classList.add('Hidden');
    } else {
      document.getElementById(id).checked = true;
      document.getElementById(id + '_toggle').style.background =
        inputJson['clinicalColor'][did.getAttribute('data-parent')];
      document.getElementById('child_' + id).classList.remove('Hidden');
    }
  };

  const switchButton = (id, item, k) => {
    setSelected(item);
    let myRadios = document.getElementsByName('tabs2');
    let setCheck;
    let x = 0;
    for (x = 0; x < myRadios.length; x++) {
      // eslint-disable-next-line no-loop-func
      myRadios[x].onclick = function () {
        if (setCheck !== this) {
          setCheck = this;
        } else {
          this.checked = false;
          setCheck = null;
        }
      };
    }
  };

  const drawTags = (filterBoxes) => {
    let tx = ['aod', 'bmi', 'fma', 'dob', 'ki67', 'turc'];
    if (Object.keys(selectState).length > 0) {
      let filterSelectedHtml = {};
      Object.keys(filterBoxes).forEach((header) => {
        filterSelectedHtml = {
          ...filterSelectedHtml,
          [header]: []
        };
        Object.keys(filterBoxes[header]).forEach((field) => {
          filterBoxes[header][field].forEach((subField) => {
            tx.push(subField.id);
          });
          filterBoxes[header][field].forEach((subField) => {
            if (subField.id in selectState) {
              filterSelectedHtml = {
                ...filterSelectedHtml,
                [header]: [
                  ...filterSelectedHtml[header],
                  { key: [field], value: selectState[subField.id] }
                ]
              };
            } else if (
              tx.indexOf(subField.id) > -1 &&
              selectState['from_' + subField.id] &&
              selectState['to_' + subField.id]
            ) {
              filterSelectedHtml = {
                ...filterSelectedHtml,
                [header]: [
                  ...filterSelectedHtml[header],
                  {
                    key: [field],
                    value:
                      selectState['from_' + subField.id] + '-' + selectState['to_' + subField.id]
                  }
                ]
              };
            }
          });
        });
      });
      setFiltersUi(filterSelectedHtml);
    }
  };

  const sendFilter = () => {
    drawTags(filterJson);
    parentCallback({ filter: selectState });
  };

  const reset = () => {
    let toggle_check = [
      'Basic/Diagnostic Information',
      'Patient Health Information',
      'Clinical Information',
      'Follow-up Observation'
    ];
    let tmp = selectState;

    let ckb = document.querySelectorAll('#all_checkboxes input[type=checkbox]');
    [...ckb].forEach((el) => {
      let toggle_check_ = el.getAttribute('data-parent');
      if (!toggle_check.includes(toggle_check_)) {
        delete tmp[el.id];
        el.checked = false;
      }
    });

    let input_boxes = document.querySelectorAll('#all_checkboxes input[type=number]');
    [...input_boxes].forEach((il) => {
      il.classList.remove('Border2');
      il.classList.remove('BorderRed400');
      delete tmp[il.id];
      il.value = '';
    });
    setSelectState({ filterCondition: 'and' });
    parentCallback({ filter: {} });
    if (document.getElementById('default-radio-1')) {
      document.getElementById('default-radio-1').checked = true;
    }
    if (document.getElementById('default-radio-2')) {
      document.getElementById('default-radio-2').checked = false;
    }
    setFilterHtml([]);
    let filtervalues = { ...filtersUi };
    filtervalues['Basic/Diagnostic Information'] = [];
    setFiltersUi(filtervalues);
  };

  const changeFilterCondition = (e) => {
    let tmp = selectState;
    let val = e.target.value;
    setFilterCondition(val);
    tmp['filterCondition'] = val;
    setSelectState(tmp);
  };
  return (
    <div id="filterBoxCmp">
      {Object.keys(filterJson).length !== 0 && <>
        <div className="FilterMainDiv">
          <button className="FilterLabelText FilterButton" onClick={reset}>
            <FormattedMessage id="Reset" defaultMessage={' Reset '} />
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="FilterLabelText FilterButton"
            style={{ backgroundColor: '#009fe2', border: '1px solid white' }}
            onClick={sendFilter}
          >
            <FormattedMessage id="Search" defaultMessage={' Search '} />
          </button>
        </div>
        <div className="filter_sample">
          <label className="">
            <FormattedMessage id="filterCondition" defaultMessage={'Sample filter condition'} />:
          </label>
          <div className="Radiobtns" style={{ marginTop: '5px' }}>
            <div className="Flex ItemsCenter MarginLeft4">
              {filterCondition === 'and' ? (
                <input
                  id="default-radio-1"
                  type="radio"
                  value="and"
                  name="condition"
                  checked
                  onChange={(e) => changeFilterCondition(e)}
                  className="FilterCondition"
                />
              ) : (
                <input
                  id="default-radio-1"
                  type="radio"
                  value="and"
                  name="condition"
                  onChange={(e) => changeFilterCondition(e)}
                  className="FilterCondition"
                />
              )}

              <label htmlFor="default-radio-1" className="MarginLeft2 ConditionLabel">
                And
              </label>
            </div>
            <div className="Flex ItemsCenter MarginLeft4">
              {filterCondition === 'or' ? (
                <input
                  id="default-radio-2"
                  type="radio"
                  value="or"
                  name="condition"
                  onChange={(e) => changeFilterCondition(e)}
                  className="FilterCondition"
                />
              ) : (
                <input
                  id="default-radio-2"
                  type="radio"
                  value="or"
                  name="condition"
                  onChange={(e) => changeFilterCondition(e)}
                  className="FilterCondition"
                />
              )}
              <label htmlFor="default-radio-2" className="MarginLeft2 ConditionLabel">
                Or
              </label>
            </div>
          </div>
        </div>
      </>
      }
      <div className="MarginTop4" id="all_checkboxes">
        {state['html']}
      </div>
      <div className=" p-1">
        {filterHtml && filterHtml.length ? (
          <>
            <div className="MarginBottom5">
              <h6>Total Number of Samples : {totalSamplesCount}</h6>
            </div>
            {filterHtml}
            <div className="mt-5">
              <h6>Number of Filtered Samples: {filteredSamples}</h6>
            </div>
          </>
        ) : (
          ''
        )}
        {Object.keys(filterJson).length === 0 &&
          <span style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: '300px', fontSize: '15px' }}><FormattedMessage id="No Clinical Data" defaultMessage="No Clinical Data" /></span>}
      </div>
    </div>
  );
}
