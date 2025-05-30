import { BeakerIcon, DocumentAddIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import inputJson from '../data';

export default function Filter({ parentCallback, set_screen, project_id }) {
  const [state, setState] = useState({ html: [] });
  const [selectState, setSelectState] = useState({ filterCondition: 'and' });
  const [selected, setSelected] = useState('Basic/Diagnostic Information');
  const [filtersUi, setFiltersUi] = useState({});
  const userDefinedFilter = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);
  const [filterJson, setFilterJson] = useState({});

  const [filterCondition, setFilterCondition] = useState('and');

  useEffect(() => {
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        setSelected('Clinical Information');
        setFilterJson(userDefinedFilter['filterJson']);
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
      }
    } else {
      leftSide(filterJson);
    }
  }, [userDefinedFilter, filterJson]);

  useEffect(() => {
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        leftSide(filterJson);
      }
    } else {
      leftSide(filterJson);
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
              <span
                key={`${sub.key}-${Math.random()}`}
                className="inline-flex items-center justify-center p-3 px-5  mr-2 text-md font-bold leading-none text-white bg-gray-600 rounded-full mb-4"
              >
                {sub.key}:&nbsp;{sub.value}
              </span>
            );
          });
        }
        if (tmp.length > 0) {
          html.push(
            <div className="mb-5" key={e + '_filter'}>
              <h4 className="mb-5">{e}</h4>
              {tmp}
            </div>
          );
        }
      });
    }
  }, [filtersUi]);

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
            <div className="px-5 py-3 relative z-10" key={'div_mb_' + c}>
              <label htmlFor="toogleA" className="flex items-center cursor-pointer">
                <div className="ml-3 text-gray-700 w-10/12 lg:text-2xl sm:text-xl md:text-xl tracking-wide">
                  {childelm in chart_names ? (
                    <FormattedMessage id={childelm} defaultMessage={chart_names[childelm]} />
                  ) : (
                    <FormattedMessage id={childelm} defaultMessage={childelm} />
                  )}
                </div>
                <div className="relative" onClick={(e) => checkBoxFn(e, 'md_' + id + '_' + c)}>
                  <input
                    type="checkbox"
                    id={'md_' + id + '_' + c}
                    checked="checked"
                    data-parent={item}
                    className="checkbox sr-only "
                    onChange={(e) => checkBoxFn(e, 'md_' + id + '_' + c)}
                  />
                  <div
                    className="block bg-gray-600 w-14 h-6 rounded-full"
                    id={'md_' + id + '_' + c + '_toggle'}
                    style={{ backgroundColor: color }}
                  ></div>
                  <div
                    className="dot absolute left-1 top-1 bg-white w-6 h-4 rounded-full transition bg-white"
                    style={{ backgroundColor: '#fff' }}
                  ></div>
                </div>
              </label>
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
          className="tab w-full overflow-hidden border-t"
          onClick={(e) => switchButton(e, item, k)}
        >
          <input className="absolute opacity-0" id={'tab-single-' + k} type="radio" name="tabs2" />
          <label className="block p-5 leading-normal cursor-pointer" htmlFor={'tab-single-' + k}>
            {icon_type[item]}
            <span className="no-underline  ml-2 text-2xl tracking-wide">
              <FormattedMessage id={item} defaultMessage={item} />
            </span>
          </label>
          {selected === item ? (
            <div className="tab-content overflow-hidden border-l-2 bg-gray-100  leading-normal relative py-3">
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
    'Basic/Diagnostic Information': <UserCircleIcon className="h-8 w-8 inline text-main-blue" />,
    'Patient Health Information': <DocumentAddIcon className="h-8 w-8 inline text-main-blue" />,
    'Clinical Information': <BeakerIcon className="h-8 w-8 inline text-main-blue" />,
    'Follow-up Observation': <SearchIcon className="h-8 w-8 inline text-main-blue" />
  };

  let chart_names = {
    'Age Of Daignosis': 'Age of Diagnosis (20-40 Y)',
    'Body Mass Index': 'Body Mass Index (15.82-36.33 kg/㎡)',
    'First Menstrual Age': 'First Menstrual Age (10-17 Y)',
    'Duration of Breastfeeding': 'Duration of Breastfeeding (1-24 M)',
    'Ki-67 Index': 'Ki-67 Index(1-95 %)',
    'Time until relapse is confirmed': 'Time until relapse is confirmed (1-16 Y)'
  };

  let checkbox = (d) => {
    let check = false;
    if (d.id in selectState) {
      check = true;
    }
    return (
      <div key={d.id} className="px-10">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            id={d.id}
            name={d.name}
            className="form-checkbox"
            value={d.value}
            defaultChecked={check}
            onChange={(e) => selectFn(e)}
          />
          <span className="ml-2 lg:text-2xl sm:text-xl md:text-xl">
            <FormattedMessage id={d.value} defaultMessage={d.value} />
          </span>
        </label>
      </div>
    );
  };

  let inputbox = (d) => {
    return (
      <div key={d.id} className="grid grid-cols-5  rounded mx-10 border border-b-color">
        <div className="col-span-2">
          <input
            type="number"
            id={'from_' + d.id}
            className="h-full shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight"
            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
            // value={selectState["from_" + d.id]}
            onChange={(e) => selectFn(e)}
            placeholder={d.min}
            min={d.min}
            max={d.max}
          />
        </div>
        <div className="col-span-1">
          <div className="box-border border-r border-l border-b-color bg-gray-100 h-full w-30  px-3 mb-6 text-center">
            <b>-</b>
          </div>
        </div>
        <div className="col-span-2">
          <input
            type="number"
            id={'to_' + d.id}
            className="h-full  shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight"
            onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
            // value={selectState["to_" + d.id]}
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
        from_0.classList.remove('border-2');
        from_0.classList.remove('border-red-400');
        to_0.classList.remove('border-2');
        to_0.classList.remove('border-red-400');
      } else {
        from_0.classList.add('border-2');
        from_0.classList.add('border-red-400');
        to_0.classList.add('border-2');
        to_0.classList.add('border-red-400');
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
      e.classList.remove('border-2');
      e.classList.remove('border-red-400');
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
      document.getElementById('child_' + id).classList.add('hidden');
    } else {
      document.getElementById(id).checked = true;
      document.getElementById(id + '_toggle').style.background =
        inputJson['clinicalColor'][did.getAttribute('data-parent')];
      document.getElementById('child_' + id).classList.remove('hidden');
    }
  };

  const switchButton = (id) => {
    setSelected(id);
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

  const sendFilter = () => {
    parentCallback(selectState);
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
      il.classList.remove('border-2');
      il.classList.remove('border-red-400');
      delete tmp[il.id];
      il.value = '';
    });
    setSelectState({ filterCondition: 'and' });
    parentCallback('');
    if (document.getElementById('default-radio-1')) {
      document.getElementById('default-radio-1').checked = true;
    }
    if (document.getElementById('default-radio-2')) {
      document.getElementById('default-radio-2').checked = false;
    }
    let abcd = { ...filtersUi };
    abcd['Basic/Diagnostic Information'] = [];
    setFiltersUi(abcd);
  };

  const changeFilterCondition = (e) => {
    let tmp = selectState;
    let val = e.target.value;
    setFilterCondition(val);
    tmp['filterCondition'] = val;
    setSelectState(tmp);
  };

  return (
    <div>
      <div className="py-3 px-2 w-full col-span-2">
        <button
          className="bg-white  lg:w-80 sm:w-52  lg:h-20 sm:h-16 mb-3 text-gray-500 ml-2 font-bold py-2 px-4 border border-gray-900 rounded"
          onClick={reset}
        >
          <FormattedMessage id="Reset" defaultMessage={' Reset '} />
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 lg:h-20 sm:w-52 sm:h-16 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={sendFilter}
        >
          <FormattedMessage id="Search" defaultMessage={' Search '} />
        </button>
        <button
          className="float-right lg:hidden md:hidden bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 my-4 mr-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={() => set_screen(false)}
          type="button"
        >
          close
        </button>
      </div>
      <div className="flex flex-row mb-4 ml-4">
        <label className="text-2xl font-bold">
          <FormattedMessage id="filterCondition" defaultMessage={' Sample filter condition'} />:
        </label>
        <div className="flex items-center ml-4">
          {filterCondition === 'and' ? (
            <input
              id="default-radio-1"
              type="radio"
              value="and"
              name="condition"
              checked
              onChange={(e) => changeFilterCondition(e)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          ) : (
            <input
              id="default-radio-1"
              type="radio"
              value="and"
              name="condition"
              onChange={(e) => changeFilterCondition(e)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          )}

          <label htmlFor="default-radio-1" className="ml-2 text-gray-900 dark:text-gray-300">
            And
          </label>
        </div>
        <div className="flex items-center ml-4">
          {filterCondition === 'or' ? (
            <input
              id="default-radio-2"
              type="radio"
              value="or"
              name="condition"
              onChange={(e) => changeFilterCondition(e)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          ) : (
            <input
              id="default-radio-2"
              type="radio"
              value="or"
              name="condition"
              onChange={(e) => changeFilterCondition(e)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          )}
          <label htmlFor="default-radio-2" className="ml-2 text-gray-900 dark:text-gray-300">
            Or
          </label>
        </div>
      </div>
      <div className="col-span-2" id="all_checkboxes">
        {state['html']}
      </div>
    </div>
  );
}
