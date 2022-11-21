import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
const LabelCss = "block text-left text-blue-700-700 text-lg  font-bold mb-2";
const checkBoxCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const numberInputBoxCss =
  "shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
let UserDefinedGroupFilters = ({
  volcanoType,
  parentCallback,
  groupFilters,
  viz_type,
}) => {
  const  [clinicalMaxMinInfo, setClinicalMaxMinInfo] = useState({})

  const userDefinedFilter = useSelector(
    (data) => data.dataVisualizationReducer.userDefinedFilter
  );
  useEffect(() => {
    if (userDefinedFilter && userDefinedFilter['filterJson'] && 'Clinical Information' in  userDefinedFilter['filterJson']){
      let minmax={}
      for( let val in userDefinedFilter['filterJson']['Clinical Information']){
        if(userDefinedFilter['filterJson']['Clinical Information'][val].length === 1){
          if(userDefinedFilter['filterJson']['Clinical Information'][val][0]['type'] === 'number'){
            let max = userDefinedFilter['filterJson']['Clinical Information'][val][0]['max']
            let min = userDefinedFilter['filterJson']['Clinical Information'][val][0]['min']
            let max1 = val + '_max';
            let min1 = val + '_min';
            minmax[max1] = max;
            minmax[min1] = min;
          }
          
        }
      }
      setClinicalMaxMinInfo(minmax)
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
  const [filters, setFilters] = useState({});
  const [multipleInputs, setMultipleInputs] = useState({});
  const [filterType, setFilterType] = useState("transcriptome");
  const [selectDefaultValue, setSelectDefaultValue] = useState("0");
  const [preDefienedGroups1, setPreDefienedGroups1] = useState({});
  const [filterChoices, setFilterChoices] = useState([]);
  let { tab, project_id } = useParams();

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
              preDefienedGroups1[colsobj[i][j]["name"]].push(group);
              // console.log(d_obj);
              // console.log("->", group);
              filterChoices.push(d_obj);
            }
          }
        }
        const uniqueFilterChoices = [
          ...new Map(filterChoices.map((v) => [v.id, v])).values(),
        ];
        // console.log(preDefienedGroups1);
        setFilterChoices(uniqueFilterChoices);
        setPreDefienedGroups1(preDefienedGroups1);
        // console.log("filtet", uniqueFilterChoices);
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
    // console.log("final", userGivenInputValues);
    if (isFilterResetHappened) {
      parentCallback(userGivenInputValues);
    } else {
      parentCallback(userGivenInputValues);
    }
  };

  const resetFilters = () => {
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

  const updateSelectedFilter = (e) => {
    resetFilters();
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
    // setGroupsCounter(1)
  };

  const onChangeFilterInput = (e) => {
    // console.log("selectedFilterDetails---->",filterSelected);
    // console.log("selectedFilterDetails---->",selectedFilterDetails);
    if (e.target.type === "number") {
      console.log("a");
      let id = e.target.id;
      let ids = id.split("_");
      let m_id = ids[0];

      let one_from_0 = document.getElementById(`${m_id}_from`);
      let one_from = one_from_0 ? +one_from_0.value : one_from_0.min;
      let one_min_value = one_from_0 ? +one_from_0.min : 0;
      let one_to_0 = document.getElementById(`${m_id}_to`);
      let one_to = one_to_0 ? +one_to_0.value : one_from_0.max;
      let one_max_value = one_from_0 ? +one_from_0.max : 0;

      if (
        one_from > one_max_value ||
        one_from < one_min_value ||
        one_from > one_to
      ) {
        one_from_0.classList.add("border-2");
        one_from_0.classList.add("border-red-400");
        one_to_0.classList.add("border-2");
        one_to_0.classList.add("border-red-400");
      } else if (
        one_to > one_max_value ||
        one_to < one_min_value ||
        one_to < one_from
      ) {
        one_from_0.classList.add("border-2");
        one_from_0.classList.add("border-red-400");
        one_to_0.classList.add("border-2");
        one_to_0.classList.add("border-red-400");
      } else {
        // console.log("final",one_from_0.name,one_from_0.value,one_to_0.name,one_to_0.value);
        one_from_0.classList.remove("border-2");
        one_from_0.classList.remove("border-red-400");
        one_to_0.classList.remove("border-2");
        one_to_0.classList.remove("border-red-400");
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
      console.log("b");
      setUserGivenInputValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    // console.log("userGivenInputValues 000000000", userGivenInputValues);
  };

 
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
      console.log("assd", filterChoices[targetNumber]);
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
            <div key={`${i}-text-${Math.random()}`} className="mb-4">
              <div>
                <div className={LabelCss} htmlFor="username">
                  {`Group ${i}`}
                </div>
                <div>
                  <input
                    value={groupFilters[i]}
                    onChange={onChangeFilterInput}
                    className={checkBoxCss}
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
            <div key={`number-${i}${Math.random()}`} className="mb-4">
              <div>
                <div className={LabelCss} htmlFor="username">
                  {`Group ${i}`}
                </div>
                <div>
                  <input
                    defaultValue={groupFilters[`${i}_from`]}
                    onChange={onChangeFilterInput}
                    className={numberInputBoxCss}
                    name={`${i}_from`}
                    type="number"
                    placeholder="from"
                  ></input>
                  <input
                    defaultValue={groupFilters[`${i}_to`]}
                    onChange={onChangeFilterInput}
                    className={numberInputBoxCss}
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
      // let clinicalMaxMinInfoData = clinicalMaxMinInfo["data"];
      console.log("lastttttttttt",clinicalMaxMinInfo);
      let clinicalMaxMinInfoData = clinicalMaxMinInfo;
      let clinicalInfoId = selectedFilterDetails["id"];
      console.log("selectedFilterDetails", selectedFilterDetails);
      console.log("clinicalInfoId", clinicalInfoId);
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
          <div key={compCase} className="mb-4">
            {["A Group", "B Group"].map((e, index) => (
              <div key={e} className="border mt-4 p-1">
                <div className={LabelCss} htmlFor="yes">
                  {e}
                </div>
                <h1 id="yes" className="text-left mt-2">
                  {groupLabels[index]}
                </h1>
              </div>
            ))}
          </div>
        );

      case "number":
        if (viz_type === "volcono") {
          return (
            <>
              <div key={`${compCase}-1${Math.random()}`} className="mb-4">
                <div>
                  <div className={LabelCss} htmlFor="username">
                    Group 1
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className={numberInputBoxCss}
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
                      className={numberInputBoxCss}
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
              <div key={`${compCase}-2${Math.random()}`} className="mb-4">
                <div>
                  <div className={LabelCss} htmlFor="username">
                    Group 2
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className={numberInputBoxCss}
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
                      className={numberInputBoxCss}
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
            </>
          );
        } else {
          return (
            <div
              key={`${compCase}-${groupsCounter}${Math.random()}`}
              className="mb-4"
            >
              <div>
                <div className={LabelCss} htmlFor="username">
                  {`Group ${groupsCounter}`}
                </div>
                <div>
                  <input
                    onChange={onChangeFilterInput}
                    className={numberInputBoxCss}
                    name={`${groupsCounter}_from`}
                    type="number"
                    placeholder={min}
                    min={min}
                    max={max}
                  ></input>
                  <input
                    onChange={onChangeFilterInput}
                    className={numberInputBoxCss}
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
              <div key={`${compCase}-1-${Math.random()}`} className="mb-4">
                <div>
                  <div className={LabelCss} htmlFor="username">
                    Group 1
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className={checkBoxCss}
                      name="1"
                      type="text"
                      placeholder="Enter Text"
                    ></input>
                  </div>
                </div>
              </div>
              <div key={`${compCase}-2-${Math.random()}`} className="mb-4">
                <div>
                  <div className={LabelCss} htmlFor="username">
                    Group 2
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className={checkBoxCss}
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
              className="mb-4"
            >
              <div>
                <div className={LabelCss} htmlFor="username">
                  {`Group ${groupsCounter}`}
                </div>
                <div>
                  <input
                    onChange={onChangeFilterInput}
                    className={checkBoxCss}
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
    // if(selectedFilterDetails){
    //   console.log("--------------------------start",selectedFilterDetails);
    // }
    if (
      selectedFilterDetails &&
      "type" in selectedFilterDetails &&
      "id" in selectedFilterDetails
    ) {
      let filterType = selectedFilterDetails.type;
      let colName = selectedFilterDetails.id;
      if (filterType) {
        let componentData = [];

        if (filterType === "boolean" || filterType === "static") {
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
              type: filterType,
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
                userGivenInputValues["group_a"].length > 0 &&
                userGivenInputValues["group_b"].length > 0
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
                    <tr key={colName + index} className="border-b">
                      <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                        {element.label}
                      </td>
                      <td className="px-6 py-4">
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
                      <td className="px-6 py-4">
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
                  <tr key={colName + index} className="border-b">
                    <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                      {element.label}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
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
                <thead className="border-b w-full" key={"group_thead"}>
                  <tr>
                    <th></th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Group A
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Group B
                    </th>
                  </tr>
                </thead>
                <tbody key={"group_tbody"}>{tr}</tbody>
              </table>
            );
          } else if (viz_type === "survival") {
            let d = preDefienedGroups1[colName];
            let thead = [];
            let boxes = d.length;
            for (let sv = 0; sv < d.length; sv++) {
              const element = d[sv];
              thead.push(
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Group {abc[sv]}:
                </th>
              );
              let checkbox = [];
              let group_i = 0;

              for (let index = 0; index < boxes; index++) {
                let name = "group_" + abc[index] + "_" + element.label;

                // console.log(sv,index)
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
                      // console.log(name,gi_val)
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
                      className="px-6 py-4"
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
                      className="px-6 py-4"
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
                <tr key={colName + sv} className="border-b">
                  <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                    {element.label}
                  </td>
                  {checkbox}
                </tr>
              );
            }
            componentData.push(
              <table className="table" key={"group_table"}>
                <thead className="border-b w-full" key={"group_thead"}>
                  <tr>
                    <th></th>
                    {thead}
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
    const filterType = selectedFilterDetails.type;
    const componentData = componetSwitch(filterType);
    setFilterInputs((prevState) => [...prevState, componentData]);
    setGroupsCounter((prevState) => prevState + 1);
  };

  return (
    <div className="m-1 bg-gray-100">
      <div className="p-1 py-3 px-2 col-span-2">
        <div className="block text-left text-blue-700-700 text-lg  font-bold mb-2">
          <FormattedMessage
            id="Clinical Filters"
            defaultMessage="Clinical Attribute"
          />
        </div>
        <select
          defaultValue={selectDefaultValue}
          onChange={updateSelectedFilter}
          name="selectOptions"
          className="w-full lg:p-4 xs:p-2 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
        >
          <option value="0"></option>
          {filterChoices.map((type, index) => (
            <option
              selected={filterSelected === type.name}
              className="lg:text-lg xs:text-sm"
              key={type.id}
              value={index}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
      {showAddGroupButton && (
        <div onClick={AppendNewGroup} className="p-1 py-3 px-2 col-span-2">
          <button className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Group
          </button>
        </div>
      )}
      <div className="p-1 py-3 px-2 col-span-2" style={{ overflowX: "auto" }}>
        {filterInputs}
      </div>
      {filterSelected && (
        <div>
          <button
            onClick={submitFilters}
            className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Submit
          </button>
        </div>
      )}
      {filterSelected && (
        <div>
          <button
            onClick={resetFilters}
            className="bg-white hover:bg-gray-700 mb-3 lg:w-80 sm:w-40 h-20 text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDefinedGroupFilters;
