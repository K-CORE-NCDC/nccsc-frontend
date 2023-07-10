import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

let UserDefinedGroupFilters = ({
  volcanoType,
  parentCallback,
  groupFilters,
  viz_type,
  survivalModel
}) => {
  const [clinicalMaxMinInfo, setClinicalMaxMinInfo] = useState({})
  const userDefinedFilter = useSelector(
    (data) => data.dataVisualizationReducer.userDefinedFilter
  );

  useEffect(() => {
    if (
      userDefinedFilter &&
      userDefinedFilter["filterJson"] &&
      "Clinical Information" in userDefinedFilter["filterJson"]
    ) {
      let minmax = {};
      let bool_cols = [];
      for (let val in userDefinedFilter["filterJson"]["Clinical Information"]) {
        if (
          userDefinedFilter["filterJson"]["Clinical Information"][val]
            .length === 1
        ) {
          if (
            userDefinedFilter["filterJson"]["Clinical Information"][val][0][
            "type"
            ] === "number"
          ) {
            let max =
              userDefinedFilter["filterJson"]["Clinical Information"][val][0][
              "max"
              ];
            let min =
              userDefinedFilter["filterJson"]["Clinical Information"][val][0][
              "min"
              ];
            let max1 = val + "_max";
            let min1 = val + "_min";
            minmax[max1] = max;
            minmax[min1] = min;
          }
        }
        for (
          let ind = 0;
          ind <
          userDefinedFilter["filterJson"]["Clinical Information"][val].length;
          ind++
        ) {
          if (
            "id" in
            userDefinedFilter["filterJson"]["Clinical Information"][val][ind]
          ) {
            let bool_include =
              userDefinedFilter["filterJson"]["Clinical Information"][val][ind][
              "id"
              ];
            if (
              bool_include.slice(-3) === "yes" ||
              bool_include.slice(-2) === "no"
            ) {
              bool_cols.push(
                userDefinedFilter["filterJson"]["Clinical Information"][val][
                ind
                ]["name"]
              );
            }
          }
        }
      }
      setClinicalMaxMinInfo(minmax);
      setBooleanColumns([...new Set(bool_cols)]);

    }
  }, [userDefinedFilter]);

  const [filterSelected, setFilterSelected] = useState("");
  const [selectedFilterDetails, setSelectedFilterDetails] = useState({});
  const [filterInputs, setFilterInputs] = useState([]);
  const [userGivenInputValues, setUserGivenInputValues] = useState({});
  const [showAddGroupButton, setShowAddGroupButton] = useState(false);
  const [groupsCounter, setGroupsCounter] = useState(2);
  const [prevStateFilters, setPrevStateFilters] = useState([]);
  const [isFilterResetHappened, setIsFilterResetHappened] = useState(false);
  const [multipleInputs, setMultipleInputs] = useState({});
  const [filterType, setFilterType] = useState("transcriptome");
  const [selectDefaultValue, setSelectDefaultValue] = useState("0");
  const [preDefienedGroups1, setPreDefienedGroups1] = useState({});
  const [filterChoices, setFilterChoices] = useState([]);
  const [booleanColumns, setBooleanColumns] = useState([]);
  let { project_id } = useParams();

  useEffect(() => {
    let preDefienedGroups1 = {};
    let filterChoices = [];
    if (project_id !== undefined) {
      if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
        let colsobj = userDefinedFilter["filterJson"]["Clinical Information"];
        for (let i in colsobj) {
          for (let j in colsobj[i]) {
            if (colsobj[i][j]["type"] === "number") {
              let d_obj = {
                type: "number",
                id: colsobj[i][j]["name"],
                name: colsobj[i][j]["name"],
                input: "number",
              };

              let group_a = {
                label: `${colsobj[i][j]["min"]}-${colsobj[i][j]["max"]}`,
                from: colsobj[i][j]["min"],
                to: colsobj[i][j]["max"],
              };
              let group_b = {
                label: `${colsobj[i][j]["min"]}-${colsobj[i][j]["max"]}`,
                from: colsobj[i][j]["min"],
                to: colsobj[i][j]["max"],
              };
              if (!preDefienedGroups1[colsobj[i][j]["name"]]) {
                preDefienedGroups1[colsobj[i][j]["name"]] = [];
              }
              preDefienedGroups1[colsobj[i][j]["name"]].push(group_a);
              preDefienedGroups1[colsobj[i][j]["name"]].push(group_b);
              filterChoices.push(d_obj);
            } else {
              let d_obj = {
                type: "dropdown",
                name: colsobj[i][j]["name"],
                id: colsobj[i][j]["name"],
                input: "number",
              };
              let labelIndex = colsobj[i][j]["id"].lastIndexOf("_");
              let label_ = colsobj[i][j]["id"].substring(labelIndex + 1);
              let group = {
                label: label_,
                from: colsobj[i][j]["value"],
                to: colsobj[i][j]["value"],
                value: colsobj[i][j]["value"],
              };
              if (!preDefienedGroups1[colsobj[i][j]["name"]]) {
                preDefienedGroups1[colsobj[i][j]["name"]] = [];
              }
              if (group["value"] !== "None") {
                preDefienedGroups1[colsobj[i][j]["name"]].push(group);
              }
              filterChoices.push(d_obj);
            }
          }
        }
        const uniqueFilterChoices = [
          ...new Map(filterChoices.map((v) => [v.id, v])).values(),
        ];
        setFilterChoices(uniqueFilterChoices);
        setPreDefienedGroups1(preDefienedGroups1);
      }
    }
  }, [userDefinedFilter]);

  useEffect(() => {
    if (volcanoType !== filterType) {
      setFilterType(volcanoType);
      resetFilters();
    }
  }, [volcanoType]);

  const submitFilters = () => {
    if (viz_type === 'volcono') {
      if (isFilterResetHappened) {
        let send_response = true;
        if (userGivenInputValues['type'] === 'static') {
          let final_payload = { ...userGivenInputValues };
          let total_groups = 0;
          if ('group_a' in final_payload) {
            total_groups++;
          }
          if ('group_b' in final_payload) {
            total_groups++;
          }
          if (total_groups < 2) {
            send_response = false;
          }
        }
        else {
          let min1Value = Number.MAX_VALUE;
          let min2Value = Number.MAX_VALUE;
          let max1Value = Number.MIN_VALUE;
          let max2Value = Number.MIN_VALUE;
          const min_1_from = document.querySelectorAll('[name="1_from"]');
          const max_1_to = document.querySelectorAll('[name="1_to"]');
          const min_2_from = document.querySelectorAll('[name="2_from"]');
          const max_2_to = document.querySelectorAll('[name="2_to"]');
          for (let obj in min_1_from) {
            if (min_1_from[obj]) {
              if (
                (min_1_from[obj].classList &&
                  (min_1_from[obj].classList.contains("Border2") ||
                    min_1_from[obj].classList.contains("BorderRed400"))) ||
                min_1_from[obj].value === ""
              ) {
                send_response = false;
              } else {
                if (min_1_from[obj].value) {
                  min1Value = Math.min(min_1_from[obj].value, min1Value);
                }
              }
            }
          }
          for (let obj in max_1_to) {
            if (max_1_to[obj]) {
              if (
                (max_1_to[obj].classList &&
                  (max_1_to[obj].classList.contains("Border2") ||
                    max_1_to[obj].classList.contains("BorderRed400"))) ||
                max_1_to[obj].value === ""
              ) {
                send_response = false;
              } else {
                if (max_1_to[obj].value) {
                  max1Value = Math.max(max_1_to[obj].value, max1Value);
                }
              }
            }
          }
          for (let obj in min_2_from) {
            if (min_2_from[obj]) {
              if (
                (min_2_from[obj].classList &&
                  (min_2_from[obj].classList.contains("Border2") ||
                    min_2_from[obj].classList.contains("BorderRed400"))) ||
                min_2_from[obj].value === ""
              ) {
                send_response = false;
              } else {
                if (min_2_from[obj].value) {
                  min2Value = Math.min(min_2_from[obj].value, min2Value);
                }
              }
            }
          }
          for (let obj in max_2_to) {
            if (max_2_to[obj]) {
              if (
                (max_2_to[obj].classList &&
                  (max_2_to[obj].classList.contains("Border2") ||
                    max_2_to[obj].classList.contains("BorderRed400"))) ||
                max_2_to[obj].value === ""
              ) {
                send_response = false;
              } else {
                if (max_2_to[obj].value) {
                  max2Value = Math.max(max_2_to[obj].value, max2Value);
                }
              }
            }
          }
          if (send_response === true) {
            let final_payload = { ...userGivenInputValues };
            final_payload["1_from"] = min1Value;
            final_payload["1_to"] = max1Value;
            final_payload["2_from"] = min2Value;
            final_payload["2_to"] = max2Value;
            setUserGivenInputValues(final_payload);
            parentCallback(final_payload);
          }
        }
        if (send_response === true && userGivenInputValues['type'] !== 'number') {
          parentCallback(userGivenInputValues);
        }
      }
      else {
        parentCallback(userGivenInputValues);
      }
    }
    else if(viz_type === 'fusion'){
      if (isFilterResetHappened) {
        let send_response = true;
        if(userGivenInputValues['type'] === 'static'){
          let final_payload = { ...userGivenInputValues };
          let total_groups=0;
          for(let i=1;i<=3;i++){
              if(`group_${i}` in final_payload){
                  total_groups++;
              }
          }
          if(total_groups === 1 ){
              send_response = false; 
          }
        }
        else{
          let min1Value = Number.MAX_VALUE;
          let max1Value = Number.MIN_VALUE;
          let final_payload = { ...userGivenInputValues };
          for(let i = 1; i <groupsCounter; i++){
            const min_1_from = document.querySelectorAll(`[name="${i}_from"]`);
            const max_1_to = document.querySelectorAll(`[name="${i}_to"]`);
            let min_1_num,max_1_num
            for (let obj in min_1_from) {
              if (min_1_from[obj]) {
                if (
                  (min_1_from[obj].classList &&
                    (min_1_from[obj].classList.contains("Border-2") ||
                      min_1_from[obj].classList.contains("Border-red-400"))) ||
                  min_1_from[obj].value === ""
                ) {
                  send_response = false;
                } else {
                  if (min_1_from[obj].value) {
                    min1Value = Math.min(min_1_from[obj].value,min1Value);
                    min_1_num = +(min_1_from[obj].value)
                  }
                }
              }
            }
            for (let obj in max_1_to) {
              if (max_1_to[obj]) {
                if (
                  (max_1_to[obj].classList &&
                    (max_1_to[obj].classList.contains("Border-2") ||
                      max_1_to[obj].classList.contains("Border-red-400"))) ||
                  max_1_to[obj].value === ""
                ) {
                  send_response = false;
                } else {
                  if (max_1_to[obj].value) {
                    max1Value = Math.max(max_1_to[obj].value,max1Value);
                    max_1_num = +(max_1_to[obj].value)
                  }
                }
              }
            }
                let one_from = `${i}_from`
                let one_to = `${i}_to`
                final_payload[one_from] = min_1_num;
                final_payload[one_to] = max_1_num ;
          }
  
          if (send_response === true) {
            setGroupsCounter(1)
            setUserGivenInputValues(final_payload);
            parentCallback(final_payload);
          }
        }
        if (send_response === true &&  userGivenInputValues['type'] !== 'number') {
          parentCallback(userGivenInputValues);
          setGroupsCounter(1)
        }
      } 
      else {
        parentCallback(userGivenInputValues );
      }
    }
    else {
      if (isFilterResetHappened) {
        parentCallback(userGivenInputValues);
      } else {
        parentCallback(userGivenInputValues);
      }
    }
  };

  const resetFilters = () => {
    if (document.getElementById('ClinicalAttributeSelect') && document.getElementById('ClinicalAttributeSelect').value) {
      document.getElementById('ClinicalAttributeSelect').value = 0
    }
    setFilterSelected("");
    setSelectDefaultValue("");
    setSelectedFilterDetails({});
    setFilterInputs([]);
    setUserGivenInputValues({});
    setShowAddGroupButton(false);
    setGroupsCounter(1);
    setIsFilterResetHappened(true);
    setPrevStateFilters([]);
  };

  useEffect(() => {
    resetFilters()
  }, [survivalModel])

  const updateSelectedFilter = (e) => {
    setIsFilterResetHappened(true);
    setFilterInputs([]);
    const targetValue = e.target.value;

    if (targetValue !== "") {
      setFilterSelected(filterChoices[parseInt(targetValue)].name);
      setSelectDefaultValue(String(targetValue));
      setSelectedFilterDetails(filterChoices[parseInt(targetValue)]);
    } else {
      setFilterSelected("");
      setSelectDefaultValue("0");
      setSelectedFilterDetails({});
    }
  };

  const onChangeFilterInput = (e) => {
    if (e.target.type === "number") {
      let id = e.target.name;
      let ids = id.split("_");

      let one_to_0, one_to, one_max_value, one_from_0, one_from, one_min_value;
      if (ids.includes("from")) {
        one_from_0 = e.target;
        one_from = one_from_0 ? +one_from_0.value : +one_from_0.min;
        one_min_value = one_from_0 ? +one_from_0.min : 0;
        one_to_0 = one_from_0.nextSibling;
        one_to = one_to_0 ? +one_to_0.value : one_from_0.max;
        one_max_value = one_from_0 ? +one_from_0.max : 0;
      } else if (ids.includes("to")) {
        one_to_0 = e.target;
        one_to = one_to_0 ? +one_to_0.value : +one_to_0.max;
        one_max_value = one_to_0 ? +one_to_0.max : 0;
        one_from_0 = one_to_0.previousElementSibling;
        one_from = one_from_0 ? +one_from_0.value : one_from_0.min;
        one_min_value = one_from_0 ? +one_from_0.min : 0;
      }

      if (
        one_from > one_max_value ||
        one_from < one_min_value ||
        one_from > one_to
      ) {
        one_from_0.classList.add("Border2");
        one_from_0.classList.add("BorderRed400");
        one_to_0.classList.add("Border2");
        one_to_0.classList.add("BorderRed400");
      } else if (
        one_to > one_max_value ||
        one_to < one_min_value ||
        one_to < one_from
      ) {
        one_from_0.classList.add("Border2");
        one_from_0.classList.add("BorderRed400");
        one_to_0.classList.add("Border2");
        one_to_0.classList.add("BorderRed400");
      } else {
        one_from_0.classList.remove("Border2");
        one_from_0.classList.remove("BorderRed400");
        one_to_0.classList.remove("Border2");
        one_to_0.classList.remove("BorderRed400");
        setUserGivenInputValues((prevState) => ({
          ...prevState,
          [one_from_0.name]: one_from_0.value,
        }));
        setUserGivenInputValues((prevState) => ({
          ...prevState,
          [one_to_0.name]: one_to_0.value,
        }));
      }
    } else {
      setUserGivenInputValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Chnage
  useEffect(() => {
    if (groupFilters && Object.keys(groupFilters).length > 0) {
      let filterType = groupFilters.type;
      setUserGivenInputValues(groupFilters);
      let targetNumber = 0;
      filterChoices.forEach((e, index) => {
        if (e.id === groupFilters.column) {
          targetNumber = index;
        }
      });
      filterChoices &&
        filterChoices[targetNumber] &&
        setFilterSelected(filterChoices[targetNumber].name);
      setSelectDefaultValue(String(targetNumber));
      filterChoices && setSelectedFilterDetails(filterChoices[targetNumber]);
      let valsArray = [];
      let counter = 1;
      for (let i = 1; i < Object.keys(groupFilters).length; i++) {
        if (i in groupFilters || `${i}` in groupFilters) {
          counter += 1;
          valsArray.push(
            <div key={`${i}-text-${Math.random()}`} className="MarginBottom4">
              <div>
                <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                  {`Group ${i}`}
                </div>
                <div>
                  <input
                    value={groupFilters[i]}
                    onChange={onChangeFilterInput}
                    className="CheckBoxCss"
                    name={`${i}`}
                    type="text"
                    placeholder="Enter Text"
                  ></input>
                </div>
              </div>
            </div>
          );
        } else if (`${i}_from` in groupFilters) {
          counter += 1;
          valsArray.push(
            <div key={`number-${i}${Math.random()}`} className="MarginBottom4">
              <div>
                <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                  {`Group ${i}`}
                </div>
                <div>
                  <input
                    defaultValue={groupFilters[`${i}_from`]}
                    onChange={onChangeFilterInput}
                    className="NumberInputCss"
                    name={`${i}_from`}
                    type="number"
                    placeholder="from"
                  ></input>
                  <input
                    defaultValue={groupFilters[`${i}_to`]}
                    onChange={onChangeFilterInput}
                    className="NumberInputCss"
                    name={`${i}_to`}
                    type="number"
                    placeholder="to"
                  ></input>
                </div>
              </div>
            </div>
          );
        }
      }
      if (filterType === "text" || filterType === "number") {
        setPrevStateFilters(valsArray);
        setGroupsCounter(counter);
      }
    }
  }, []);

  const componetSwitch = (compCase, groupLabels = null) => {
    let max = "to";
    let min = "from";
    if (clinicalMaxMinInfo) {
      let clinicalMaxMinInfoData = clinicalMaxMinInfo;
      let clinicalInfoId = selectedFilterDetails["id"];

      if (clinicalInfoId + "_min" in clinicalMaxMinInfoData) {
        min = clinicalMaxMinInfoData[clinicalInfoId + "_min"];
      }
      if (clinicalInfoId + "_max" in clinicalMaxMinInfoData) {
        max = clinicalMaxMinInfoData[clinicalInfoId + "_max"];
      }
    }
    switch (compCase) {
      case "static":
        return (
          <div key={compCase} className="MarginBottom4">
            {["A Group", "B Group"].map((e, index) => (
              <div key={e} className="Border MarginTop4 P1">
                <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="yes">
                  {e}
                </div>
                <h1 id="yes" className=" MarginTop2">
                  {groupLabels[index]}
                </h1>
              </div>
            ))}
          </div>
        );

      case "number":
        if (viz_type === "volcono") {
          return (
            <React.Fragment key={`${compCase}-${Math.random()}`}>
              <div key={`${compCase}-1${Math.random()}`} className="MarginBottom4">
                <div>
                  <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                    Group 1
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className="NumberInputCss"
                      name="1_from"
                      type="number"
                      id="1_from"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder={min}
                      min={min}
                      max={max}
                    ></input>
                    <input
                      onChange={onChangeFilterInput}
                      className="NumberInputCss"
                      name="1_to"
                      id="1_to"
                      type="number"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder={max}
                      min={min}
                      max={max}
                    ></input>
                  </div>
                </div>
              </div>
              <div key={`${compCase}-2${Math.random()}`} className="MarginBottom4">
                <div>
                  <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                    Group 2
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className="NumberInputCss"
                      name={`2_from`}
                      id={`2_from`}
                      type="number"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder={min}
                      min={min}
                      max={max}
                    ></input>
                    <input
                      onChange={onChangeFilterInput}
                      className="NumberInputCss"
                      name={`2_to`}
                      id={`2_to`}
                      type="number"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      placeholder={max}
                      min={min}
                      max={max}
                    ></input>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        } else {
          return (
            <div
              key={`${compCase}-${groupsCounter}${Math.random()}`}
              className="MarginBottom4"
            >
              <div>
                <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                  {`Group ${groupsCounter}`}
                </div>
                <div>
                  <input
                    onChange={onChangeFilterInput}
                    className="NumberInputCss"
                    name={`${groupsCounter}_from`}
                    type="number"
                    placeholder={min}
                    min={min}
                    max={max}
                  ></input>
                  <input
                    onChange={onChangeFilterInput}
                    className="NumberInputCss"
                    name={`${groupsCounter}_to`}
                    type="number"
                    placeholder={max}
                    min={min}
                    max={max}
                  ></input>
                </div>
              </div>
            </div>
          );
        }
      case "text":
        if (viz_type === "volcono") {
          return (
            <>
              <div key={`${compCase}-1-${Math.random()}`} className="MarginBottom4">
                <div>
                  <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                    Group 1
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className="CheckBoxCss"
                      name="1"
                      type="text"
                      placeholder="Enter Text"
                    ></input>
                  </div>
                </div>
              </div>
              <div key={`${compCase}-2-${Math.random()}`} className="MarginBottom4">
                <div>
                  <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                    Group 2
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className="CheckBoxCss"
                      name="2"
                      type="text"
                      placeholder="Enter Text"
                    ></input>
                  </div>
                </div>
              </div>
            </>
          );
        } else {
          return (
            <div
              key={`${compCase}-${groupsCounter}-${Math.random()}`}
              className="MarginBottom4"
            >
              <div>
                <div className="Block  TextBlue700 TextLG  FontBold MB2" htmlFor="username">
                  {`Group ${groupsCounter}`}
                </div>
                <div>
                  <input
                    onChange={onChangeFilterInput}
                    className="CheckBoxCss"
                    name={`${groupsCounter}`}
                    type="text"
                    placeholder="Enter Text"
                  ></input>
                </div>
              </div>
            </div>
          );
        }
      default:
        return;
    }
  };

  const dropDownChange = (event) => {
    const eventObject = JSON.parse(event.target.value);
    const filterData =
      preDefienedGroups1[eventObject.colName][eventObject.index];

    let tmp = multipleInputs;
    if (eventObject.group in tmp) {
      tmp[eventObject.group].push(filterData.value);
    } else {
      tmp[eventObject.group] = [filterData.value];
    }

    let group = eventObject["group"];
    let value = filterData["value"];
    let shouldExist = event.target.checked;

    if (shouldExist === false) {
      event.target.checked = false;
      event.target.removeAttribute("checked");
      let newTmp = tmp[group].filter((e) => e !== value);
      tmp[group] = newTmp;
    }

    setMultipleInputs(tmp, filterData);

    if ("value" in filterData) {
      setUserGivenInputValues((prevState) => ({
        ...prevState,
        ...{
          [eventObject.group]: tmp[eventObject.group],
          column: selectedFilterDetails.id,
          type: "static",
        },
      }));
    }
  };

  useEffect(() => {
    if (
      selectedFilterDetails &&
      "type" in selectedFilterDetails &&
      "id" in selectedFilterDetails
    ) {
      let filterType = selectedFilterDetails.type;
      let colName = selectedFilterDetails.id;
      let booleanType = booleanColumns.includes(selectedFilterDetails["name"]) ? "yes" : "no";
      if (filterType) {
        let componentData = [];

        if (filterType === "boolean" || filterType === "static" || booleanType === "yes") {
          let options = ["Yes", "No"];
          if (filterType === "static") {
            options = [
              selectedFilterDetails.options[0],
              selectedFilterDetails.options[1],
            ];
            setUserGivenInputValues({
              group_a: "M",
              group_b: "F",
              column: selectedFilterDetails.id,
              type: filterType,
            });
          } else {
            setUserGivenInputValues({
              group_a: true,
              group_b: false,
              column: selectedFilterDetails.id,
              type: "boolean",
            });
          }
          componentData = [componetSwitch("static", options)];
        } else if (filterType === "number") {
          if (viz_type !== "volcono") {
            setShowAddGroupButton(true);
          }
          setUserGivenInputValues({
            column: selectedFilterDetails.id,
            type: filterType,
          });
          componentData.push(componetSwitch("number"));
        } else if (filterType === "text") {
          setShowAddGroupButton(true);
          setUserGivenInputValues({
            column: selectedFilterDetails.id,
            type: selectedFilterDetails.type,
          });
          componentData.push(componetSwitch("text"));
        } else if (filterType === "dropdown") {
          let tr = [];

          if (viz_type === "volcono") {
            if (
              Object.keys(userGivenInputValues).length > 0 &&
              userGivenInputValues["type"] === "static"
            ) {
              if (
                userGivenInputValues && 'group_a' in userGivenInputValues && userGivenInputValues["group_a"].length > 0 &&
                userGivenInputValues && 'group_b' in userGivenInputValues && userGivenInputValues["group_b"].length > 0
              ) {
                preDefienedGroups1[colName].forEach((element, index) => {
                  let group_a = false;
                  let group_b = false;
                  if (
                    userGivenInputValues["group_a"].indexOf(element.value) > -1
                  ) {
                    group_a = true;
                  }
                  if (
                    userGivenInputValues["group_b"].indexOf(element.value) > -1
                  ) {
                    group_b = true;
                  }
                  tr.push(
                    <tr key={colName + index} className="BorderBottom1">
                      <td className=" PX6Y4 CheckBoxRow">
                        {element.label}
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          defaultChecked={group_a}
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_a",
                          })}
                        />
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          defaultChecked={group_b}
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_b",
                          })}
                        />
                      </td>
                    </tr>
                  );
                });
              }
            } else {
              preDefienedGroups1[colName].map((element, index) =>
                tr.push(
                  <tr key={colName + index} className="BorderBottom1">
                    <td className=" PX6Y4 CheckBoxRow">
                      {element.label}
                    </td>
                    <td className="PX6Y4">
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: index,
                          colName: colName,
                          group: "group_a",
                        })}
                      />
                    </td>
                    <td className="PX6Y4">
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: index,
                          colName: colName,
                          group: "group_b",
                        })}
                      />
                    </td>
                  </tr>
                )
              );
            }
            componentData.push(
              <table className="table" key={"group_table"}>
                <thead className="BorderBottom1 WFull" key={"group_thead"}>
                  <tr>
                    <th></th>
                    <th className="GroupNamesFilter PX6Y4">
                      Group A
                    </th>
                    <th className="GroupNamesFilter PX6Y4">
                      Group B
                    </th>
                  </tr>
                </thead>
                <tbody key={"group_tbody"}>{tr}</tbody>
              </table>
            );
          }
          else if (viz_type === "survival") {
            let d = preDefienedGroups1[colName];
            let thead = [];
            let boxes = d.length;
            for (let sv = 0; sv < d.length; sv++) {
              const element = d[sv];
              thead.push(
                <th className="GroupNamesFilter PX6Y4 ">
                  Group {abc[sv]}:
                </th>
              );
              let checkbox = [];
              let group_i = 0;

              for (let index = 0; index < boxes; index++) {
                let name = "group_" + abc[index] + "_" + element.label;

                if (Object.keys(userGivenInputValues).length > 0) {
                  let group_check = false;
                  if (
                    "group_" + abc[index] in userGivenInputValues &&
                    userGivenInputValues["group_" + abc[index]].length > 0
                  ) {
                    if (
                      userGivenInputValues["group_" + abc[index]].indexOf(
                        element.value
                      ) > -1
                    ) {
                      let gi_val = userGivenInputValues["group_" + abc[index]];
                      for (let gi = 0; gi < gi_val.length; gi++) {
                        let n = gi_val[gi];
                        if ("group_" + abc[index] + "_" + n === name) {
                          group_check = true;
                          break;
                        }
                      }
                    }
                  }
                  checkbox.push(
                    <td
                      className="PX6Y4"
                      key={index + "_" + sv + abc[sv] + "_" + element.label}
                    >
                      <input
                        data-type={element.label}
                        data-name={abc[index]}
                        type="checkbox"
                        defaultChecked={group_check}
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: "group_" + abc[index],
                        })}
                      />
                    </td>
                  );
                  group_i = group_i + 1;
                } else {
                  checkbox.push(
                    <td
                      className="PX6Y4"
                      key={index + "_" + sv + abc[sv] + "_" + element.label}
                    >
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: "group_" + abc[index],
                        })}
                      />
                    </td>
                  );
                }
              }
              tr.push(
                <tr key={colName + sv} className="BorderBottom1">
                  <td className=" PX6Y4 CheckBoxRow">
                    {element.label}
                  </td>
                  {checkbox}
                </tr>
              );
            }
            componentData.push(
              <table className="table" key={"group_table"}>
                <thead className="BorderBottom1 WFull" key={"group_thead"}>
                  <tr>
                    <th></th>
                    {thead}
                  </tr>
                </thead>
                <tbody key={"group_tbody"}>{tr}</tbody>
              </table>
            );
          }
          else   if(viz_type === 'fusion'){
            if (Object.keys(groupFilters).length > 0 && groupFilters["type"] === "static") {
              if (
                groupFilters &&
                groupFilters["column"] === colName &&
                "group_1" in groupFilters  && groupFilters["group_1"].length > 0 &&
                "group_2" in groupFilters && groupFilters["group_2"].length > 0 && 
                "group_3" in groupFilters &&groupFilters["group_3"].length > 0
              ) {
                preDefienedGroups1[colName].forEach((element, index) => {
                  let group_a = false;
                  let group_b = false;
                  let group_c = false;
                  if (groupFilters["group_1"].indexOf(element.value) > -1) {
                    group_a = true;
                  }
                  if (groupFilters["group_2"].indexOf(element.value) > -1) {
                    group_b = true;
                  }
                  if (groupFilters["group_3"].indexOf(element.value) > -1) {
                    group_c = true;
                  }
                  tr.push(
                    <tr key={colName + index} className="Border-b">
                      <td className=" PX6Y4 CheckBoxRow">
                        {element.label}
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          checked={group_a}
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_1",
                          })}
                          defaultChecked = {false}
                        />
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          checked={group_b}
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_2",
                          })}
                          defaultChecked = {false}
                        />
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          checked={group_c}
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_3",
                          })}
                          defaultChecked = {false}
                        />
                      </td>
                    </tr>
                  );
                });
              } else {
                preDefienedGroups1[colName].map((element, index) =>
                  tr.push(
                    <tr key={colName + index} className="Border-b">
                      <td className=" PX6Y4 CheckBoxRow">
                        {element.label}
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_1",
                          })}
                          defaultChecked = {false}
                        />
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_2",
                          })}
                          defaultChecked = {false}
                        />
                      </td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: "group_3",
                          })}
                          defaultChecked = {false}
                        />
                      </td>
                    </tr>
                  )
                );
              }
            } else {
              preDefienedGroups1[colName].map((element, index) =>
                tr.push(
                  <tr key={colName + index} className="Border-b">
                    <td className=" PX6Y4 CheckBoxRow">
                      {element.label}
                    </td>
                    <td className="PX6Y4">
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: index,
                          colName: colName,
                          group: "group_1",
                        })}
                        defaultChecked = {false}
                      />
                    </td>
                    <td className="PX6Y4">
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: index,
                          colName: colName,
                          group: "group_2",
                        })}
                        defaultChecked = {false}
                      />
                    </td>
                    <td className="PX6Y4">
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: index,
                          colName: colName,
                          group: "group_3",
                        })}
                        defaultChecked = {false}
                      />
                    </td>
                  </tr>
                )
              );
            }
            componentData.push(
              <table className="table" key={"group_table"}>
                <thead className="Border-b WFull" key={"group_thead"}>
                  <tr>
                    <th></th>
                    <th className="GroupNamesFilter PX6Y4">
                      Group A
                    </th>
                    <th className="GroupNamesFilter PX6Y4">
                      Group B
                    </th>
                    <th className="GroupNamesFilter PX6Y4">
                      Group C
                    </th>
                  </tr>
                </thead>
                <tbody key={"group_tbody"}>{tr}</tbody>
              </table>
            );
          }
        }

        if (prevStateFilters.length > 0) {
          setFilterInputs([...prevStateFilters]);
        } else {
          setFilterInputs([...componentData]);
          setGroupsCounter((prevState) => prevState + 1);
        }
      }
    }
  }, [selectedFilterDetails]);

  const AppendNewGroup = () => {
    if(viz_type === fusion){
      if (groupsCounter <= 3) {
        const filterType = selectedFilterDetails.type;
        const componentData = componetSwitch(filterType);
        setFilterInputs((prevState) => [...prevState, componentData]);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
    else{
      const filterType = selectedFilterDetails.type;
      const componentData = componetSwitch(filterType);
      setFilterInputs((prevState) => [...prevState, componentData]);
      setGroupsCounter((prevState) => prevState + 1);
    }
  };

  return (
    <div className="M1 BGGray100">
      <div className="P1 PY3 PX2 ColSpan2">
        <div className="Block  TextBlue700 TextLG  FontBold MB2">
          <FormattedMessage
            id="Clinical Filters"
            defaultMessage="Clinical Attribute"
          />
        </div>
        <select
          defaultValue={selectDefaultValue}
          onChange={updateSelectedFilter}
          name="selectOptions"
          className="SelectDiv"
          id="ClinicalAttributeSelect"
        >
          <option value="0"></option>
          {filterChoices.map((type, index) => (
            <option
              defaultValue={filterSelected === type.name}
              className="FilterOptionText"
              key={type.id}
              value={index}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
      {userGivenInputValues['type'] === 'number' &&
        <p className=" TextBase MarginLeft6">Max and Min Values are based on Clinincal Information File</p>
      }

      {showAddGroupButton && (
        <div onClick={AppendNewGroup} className="P1 PY3 PX2 ColSpan2">
          <button className="AddGroupButton">
            Add Group
          </button>
        </div>
      )}
      <div className="P1 PY3 PX2 ColSpan2" style={{ overflowX: "auto" }}>
        {filterInputs}
      </div>
      {filterSelected && (
        <div>
          <button
            onClick={submitFilters}
            className="SubmitButtonFilter"
          >
            <FormattedMessage
              id="Submit_volcano"
              defaultMessage="Submit"
            />
          </button>
        </div>
      )}
      {filterSelected && (
        <div>
          <button
            onClick={resetFilters}
            className="ResetButtonFilter"
          >
            <FormattedMessage
              id="Reset_volcano"
              defaultMessage="Reset"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDefinedGroupFilters;
