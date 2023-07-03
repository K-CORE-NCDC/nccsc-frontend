/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  UserCircleIcon,
  BeakerIcon,
  SearchIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import inputJson from "./data";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";




export default function Filter({ parentCallback, filterState, set_screen, project_id }) {
  const [state, setState] = useState({ html: [] });
  const [selectState, setSelectState] = useState({ 'filterCondition': 'and' });
  const [selected, setSelected] = useState("Basic/Diagnostic Information");
  const [filtersUi, setFiltersUi] = useState({});
  const [filterHtml, setFilterHtml] = useState([]);
  const userDefinedFilter = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);
  const [totalSamples, setTotalSamples] = useState(0)
  const [filterJson, setFilterJson] = useState({})
  const totalSamplesS = useSelector((data) => data.dataVisualizationReducer.samplesCount)
  const [filterCondition, setFilterCondition] = useState("and");

  useEffect(() => {
    if (Object.keys(filterState).length !== 0) {
      setSelectState({ ...filterState });
      switchButton();
    }
  }, [filterState]);

  useEffect(() => {
    if (totalSamplesS && 'no_of_samples' in totalSamplesS) {
      setTotalSamples(totalSamplesS['no_of_samples'])
    }
  }, [totalSamplesS])

  const totalCount = useSelector((state) => {
    if ('Keys' in state.dataVisualizationReducer) {
      return Object.keys(state.dataVisualizationReducer.Keys).length || 0;
    } else {
      return 0
    }
  });

  
  useEffect(() => {
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        setSelected('Clinical Information')
        setFilterJson(userDefinedFilter['filterJson'])
        if (userDefinedFilter['filterJson'] && 'Clinical Information' in userDefinedFilter['filterJson']) {
          let obj_dict = {}
          let obj = userDefinedFilter['filterJson']['Clinical Information']
          Object.keys(obj).forEach(key => {
            obj[key].forEach((list) => {
              if (key in obj_dict) {
                obj_dict[key].push(list['id'])
              }
              else {
                obj_dict[key] = []
                obj_dict[key].push(list['id'])
              }
            })
          });
          // setFilterKeyandValues(obj_dict)
        }
      }
    }
    else {
      let filterBoxes = inputJson.filterBoxes;
      setFilterJson(filterBoxes)
    }
  }, [project_id, userDefinedFilter])

  useEffect(() => {
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        leftSide(filterJson);
        drawTags(filterJson);
      }
    } else {
      leftSide(filterJson);
      drawTags(filterJson)
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
      drawTags(filterJson)
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
                className="FilterSpan"
              >
                {sub.key}:&nbsp;{sub.value}
              </span>
            );
          });
        }
        if (tmp.length > 0) {
          html.push(
            <div className="MarginBottom5" key={e + "_filter"}>
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
              case "checkbox":
                inputHtml.push(checkbox(childHtml[i]));
                break;
              case "number":
                inputHtml.push(inputbox(childHtml[i]));
                break;
            }
          }
          let color = inputJson["clinicalColor"][item];
          let id = item.split(" ").join("");
          t.push(
            <div className=" PaddingT10 PaddingB10 Relative ZIndex10" key={"div_mb_" + c}>
              <label
                htmlFor="toogleA"
                className="Flex ItemsCenter CursorPointer"
              >
                <div className="Toggle FilterLabelText">
                  {childelm in chart_names ? (
                    <FormattedMessage
                      id={childelm}
                      defaultMessage={chart_names[childelm]}
                    />
                  ) : (
                    <FormattedMessage id={childelm} defaultMessage={childelm} />
                  )}
                </div>
                <div
                  className="Relative"
                  onClick={(e) => checkBoxFn(e, "md_" + id + "_" + c)}
                >
                  <input
                    type="checkbox"
                    id={"md_" + id + "_" + c}
                    checked="checked"
                    data-parent={item}
                    className="CheckBoxSROnly"
                    onChange={(e) => checkBoxFn(e, "md_" + id + "_" + c)}
                  />
                  <div
                    className="Block InputCheckBox"
                    id={"md_" + id + "_" + c + "_toggle"}
                    style={{ backgroundColor: color }}
                  ></div>
                  <div
                    className="Absolute FilterDot"
                    style={{ backgroundColor: "#fff" }}
                  ></div>
                </div>
              </label>
              <div className="py-5" id={"child_md_" + id + "_" + c}>
                {inputHtml}
              </div>
            </div>
          );
        });
      }
      html.push(
        <div
          key={item + "_" + k}
          className="tab WFull OverFlowHidden BorderTop1"
          onClick={(e) => switchButton(e, item, k)}
        >
          <input
            className="Absolute Opacity0"
            id={"tab-single-" + k}
            type="radio"
            name="tabs2"
          />
          <label
            className="Block P5 LeadingNormal CursorPointer"
            htmlFor={"tab-single-" + k}
          >
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
            ""
          )}
        </div>
      );
    });
    setState((prevState) => ({
      ...prevState,
      html: html,
    }));
  };

  let icon_type = {
    "Basic/Diagnostic Information": (
      <UserCircleIcon className="IconClass" />
    ),
    "Patient Health Information": (
      <DocumentAddIcon className="IconClass" />
    ),
    "Clinical Information": (
      <BeakerIcon className="IconClass" />
    ),
    "Follow-up Observation": (
      <SearchIcon className="IconClass" />
    ),
  };

  let chart_names = {
    "Age Of Daignosis": "Age of Diagnosis (20-40 Y)",
    "Body Mass Index": "Body Mass Index (15.82-36.33 kg/㎡)",
    "First Menstrual Age": "First Menstrual Age (10-17 Y)",
    "Duration of Breastfeeding": "Duration of Breastfeeding (1-24 M)",
    "Ki-67 Index": "Ki-67 Index(1-95 %)",
    "Time until relapse is confirmed":
      "Time until relapse is confirmed (1-16 Y)",
  };

  let checkbox = (d) => {
    let check = false;
    if (d.id in selectState) {
      check = true;
    }
    return (
      <div key={d.id} className="PX10">
        <label className="InlineFlex ItemsCenter">
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
      <div
        key={d.id}
        className="FilterInputGrid"
      >
        <div className="ColSpan2">
          <input
            type="number"
            id={"from_" + d.id}
            className="HFull FilterNumberStyle Rounded"
            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
            value={selectState["from_" + d.id]}
            onChange={(e) => selectFn(e)}
            placeholder={d.min}
            min={d.min}
            max={d.max}
          />
        </div>
        <div className="ColSpan1">
          <div className="FilterNumberLineBreak HFull">
            <b>-</b>
          </div>
        </div>
        <div className="ColSpan2">
          <input
            type="number"
            id={"to_" + d.id}
            className="HFull FilterNumberStyle"
            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
            value={selectState["to_" + d.id]}
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

    var index = id.indexOf("_")
    var m_id = id.substr(index + 1);
    if (e.target.type === "number") {
      let from_0 = document.getElementById(`from_${m_id}`);
      let from_ = from_0 ? +(from_0.value) : from_0.min;
      let min_value = from_0 ? +(from_0.min) : 0
      let to_0 = document.getElementById(`to_${m_id}`);
      let to_ = to_0 ? +(to_0.value) : from_0.max;
      let max_value = from_0 ? +(from_0.max) : 0

      let checked = true

      if (from_ > max_value || from_ < min_value || from_ > to_) {
        delete tmp[`from_${m_id}`];
        delete tmp[`to_${m_id}`];
        setSelectState(tmp)
        checked = false

      }
      else if (to_ > max_value || to_ < min_value || to_ < from_) {
        delete tmp[`from_${m_id}`];
        delete tmp[`to_${m_id}`];
        setSelectState(tmp)
        checked = false
      }
      else {
        tmp[`from_${m_id}`] = from_;
        tmp[`to_${m_id}`] = to_;
        setSelectState(tmp)
      }

      if (checked) {
        from_0.classList.remove('Border2')
        from_0.classList.remove('BorderRed400')
        to_0.classList.remove('Border2')
        to_0.classList.remove('BorderRed400')

      }
      else {
        from_0.classList.add('Border2')
        from_0.classList.add('BorderRed400')
        to_0.classList.add('Border2')
        to_0.classList.add('BorderRed400')
        delete tmp[`from_${m_id}`];
        delete tmp[`to_${m_id}`];
        setSelectState(tmp)
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
    if (e.type === "number") {
      e.classList.remove('Border2')
      e.classList.remove('BorderRed400')
      if (id in tmp) {
        delete tmp[id];
      }
      e.value = "";
    } else {
      if (id in tmp) {
        delete tmp[id];
      }
      e.checked = false;
    }
  };

  const checkBoxFn = (event, id) => {
    let child_id = "child_" + id;
    let child_did = document.getElementById(child_id);
    const inputElements = child_did.querySelectorAll(
      "input, select, checkbox, textarea"
    );
    for (let e in inputElements) {
      if (inputElements[e].id) {
        checkboxselectFn(inputElements[e]);
      }
    }
    var did = document.getElementById(id);

    var checkbox_elm = document.getElementById(id).checked;
    if (checkbox_elm) {
      document.getElementById(id).checked = false;
      document.getElementById(id + "_toggle").style.background = "#ccc";
      document.getElementById("child_" + id).classList.add("Hidden");
    } else {
      document.getElementById(id).checked = true;
      document.getElementById(id + "_toggle").style.background =
        inputJson["clinicalColor"][did.getAttribute("data-parent")];
      document.getElementById("child_" + id).classList.remove("Hidden");
    }
  };

  const switchButton = (event, id, k) => {
    setSelected(id);
    let myRadios = document.getElementsByName("tabs2");
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
    let tx = ["aod", "bmi", "fma", "dob", "ki67", "turc",];
    if (Object.keys(selectState).length > 0) {
      let filterSelectedHtml = {};
      Object.keys(filterBoxes).forEach((header) => {
        filterSelectedHtml = {
          ...filterSelectedHtml,
          [header]: [],
        };
        Object.keys(filterBoxes[header]).forEach((field) => {
          filterBoxes[header][field].forEach((subField) => {
            tx.push(subField.id)
          })
          filterBoxes[header][field].forEach((subField) => {
            if (subField.id in selectState) {
              filterSelectedHtml = {
                ...filterSelectedHtml,
                [header]: [
                  ...filterSelectedHtml[header],
                  { key: [field], value: selectState[subField.id] },
                ],
              };
            } else if (
              tx.indexOf(subField.id) > -1 &&
              selectState["from_" + subField.id] &&
              selectState["to_" + subField.id]
            ) {
              filterSelectedHtml = {
                ...filterSelectedHtml,
                [header]: [
                  ...filterSelectedHtml[header],
                  {
                    key: [field],
                    value:
                      selectState["from_" + subField.id] +
                      "-" +
                      selectState["to_" + subField.id],
                  },
                ],
              };
            }
          });
        });
      });
      setFiltersUi(filterSelectedHtml);
    }
  };

  const sendFilter = () => {
    parentCallback({ filters: selectState });
    drawTags(filterJson);
  };

  const reset = () => {
    let toggle_check = [
      "Basic/Diagnostic Information",
      "Patient Health Information",
      "Clinical Information",
      "Follow-up Observation",
    ];
    let tmp = selectState;

    let ckb = document.querySelectorAll("#all_checkboxes input[type=checkbox]");
    [...ckb].forEach((el) => {
      let toggle_check_ = el.getAttribute("data-parent");
      if (!toggle_check.includes(toggle_check_)) {
        delete tmp[el.id];
        el.checked = false;
      }
    });

    let input_boxes = document.querySelectorAll(
      "#all_checkboxes input[type=number]"
    );
    [...input_boxes].forEach((il) => {
      il.classList.remove('Border2')
      il.classList.remove('BorderRed400')
      delete tmp[il.id];
      il.value = "";
    });
    setSelectState({ 'filterCondition': 'and' });
    // parentCallback("");
    parentCallback({ filter: ""});
    if (document.getElementById('default-radio-1')) {
      document.getElementById('default-radio-1').checked = true
    }
    if (document.getElementById('default-radio-2')) {
      document.getElementById('default-radio-2').checked = false
    }
    setFilterHtml([])
    let filtervalues = { ...filtersUi }
    filtervalues['Basic/Diagnostic Information'] = []
    setFiltersUi(filtervalues)
  };

  const changeFilterCondition = (e) => {

    let tmp = selectState
    let val = e.target.value
    setFilterCondition(val)
    tmp['filterCondition'] = val
    setSelectState(tmp)
  }

  return (
    <div id='filterBoxCmp'>
      <div className="FilterMainDiv">
        <button
          className="FilterLabelText FilterButton"
          onClick={reset}

        >
          <FormattedMessage id='Reset' defaultMessage={' Reset '} />
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="FilterLabelText FilterButton" style={{backgroundColor:"#009fe2"}}
          onClick={sendFilter}
        >
          <FormattedMessage id='Search' defaultMessage={' Search '} />
        </button>
      </div>
      <div className="m-2">
        <button
          className="FilterButtonClose"
          onClick={() => set_screen(false)}
          type="button"
        >
          close
        </button>
      </div>
      <div className="Flex FlexDirRow MarginBottom4 MarginLeft4">
        <label className="Text2XL TextBold">
          <FormattedMessage id='filterCondition' defaultMessage={'Sample filter condition'} />:
        </label>
        <div className="Flex ItemsCenter MarginLeft4">
          {filterCondition === "and" ? (
            <input
              id="default-radio-1"
              type="radio"
              value="and"
              name="condition"
              checked
              onChange={e => changeFilterCondition(e)}
              className="FilterCondition"
            />
          ) : (
            <input
              id="default-radio-1"
              type="radio"
              value="and"
              name="condition"
              onChange={e => changeFilterCondition(e)}
              className="FilterCondition"
            />
          )}

          <label
            htmlFor="default-radio-1"
            className="MarginLeft2 ConditionLabel"
          >
            And
          </label>
        </div>
        <div className="Flex ItemsCenter MarginLeft4">
          {filterCondition === "or" ? (
            <input
              id="default-radio-2"
              type="radio"
              value="or"
              name="condition"
              onChange={e => changeFilterCondition(e)}
              className="FilterCondition"
            />
          ) : (
            <input
              id="default-radio-2"
              type="radio"
              value="or"
              name="condition"
              onChange={e => changeFilterCondition(e)}
              className="FilterCondition"
            />
          )}
          <label
            htmlFor="default-radio-2"
            className="MarginLeft2 ConditionLabel"
          >
            Or
          </label>
        </div>

      </div>
      <div className="ColSpan2" id="all_checkboxes">
        {state["html"]}
      </div>
      <div className="ColSpan2 p-1">
        {filterHtml && filterHtml.length ? (
          <>
            <div className="MarginBottom5">
              <h6>Total Number of Samples : {totalSamples}</h6>
            </div>
            {filterHtml}
            <div className="mt-5">
              <h6>Number of Filtered Samples: {totalCount}</h6>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
