import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
// import Multiselect from 'multiselect-react-dropdown';

const LabelCss = "block text-left text-blue-700-700 text-lg  font-bold mb-2";
const checkBoxCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const numberInputBoxCss =
  "shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

// let abc = ['a','b','c','d','e','f','g','h','i','j','k']
let filterChoices = [
  { type: "static", name: "sex", id: "sex_cd", options: ["Male", "Female"] },
  {
    type: "number",
    name: "Age Of Diaganosis",
    id: "diag_age",
    input: "number",
  },
  { type: "number", id: "bmi_vl", name: "Body Mass Index", input: "number" },
  {
    type: "boolean",
    id: "bila_cncr_yn",
    name: "Diagnosis of Bilateral Breast Cancer",
  },
  { type: "boolean", name: "Smoking Status", id: "smok_curr_yn" },
  { type: "boolean", name: "Former Smoker", id: "smok_yn" },
  { type: "boolean", name: "Alcohol Consuption", id: "drnk_yn", value: "Yes" },
  {
    type: "boolean",
    name: "Family History of Breast Cancer",
    id: "fmhs_brst_yn",
    value: "Yes",
  },
  {
    type: "number",
    name: "First Menstural Age",
    id: "mena_age",
    input: "number",
  },
  { type: "boolean", name: "Menopause", id: "meno_yn" },
  { type: "boolean", name: "childbirth", id: "delv_yn" },
  { type: "boolean", name: "Experience of Breastfeeding", id: "feed_yn" },
  {
    type: "number",
    name: "Duration of Breastfeeding",
    id: "feed_drtn_mnth",
    input: "number",
  },
  { type: "boolean", name: "Intake of Oral Contraceptive Pill", id: "oc_yn" },
  { type: "boolean", name: "Hormone Replacement Therapy", id: "hrt_yn" },
  { type: "number", name: "T Category", id: "t_category", input: "number" },
  { type: "number", name: "N Category", id: "n_category", input: "number" },
  { type: "text", name: "HER2 Score", id: "her2_score", input: "text" },
  { type: "text", name: "ki67", id: "ki67_score", input: "text" },
  {
    type: "number",
    name: "Relapse Duration",
    id: "rlps_cnfr_drtn",
    input: "number",
  },
  { type: "boolean", name: "Relapse Yes or No", id: "rlps_yn" },
  { type: "number", name: "ER Test", id: "er_score", input: "number" },
  { type: "number", name: "PR Test", id: "pr_score", input: "number" },
];

const filterChoicesCustom = [
  { type: "static", name: "Sex", id: "sex_cd", options: ["Male", "Female"] },
  {
    type: "number",
    name: "Age Of Diagonosis",
    id: "diag_age",
    input: "number",
  },
  { type: "number", id: "bmi_vl", name: "BMI", input: "number" },
  {
    type: "boolean",
    id: "bila_cncr_yn",
    name: "Diagnosis of Bilateral Breast Cancer",
  },
  { type: "boolean", name: "Smoking Status", id: "smok_yn" },
  { type: "boolean", name: "Alcohol Consuption", id: "drnk_yn", value: "Yes" },
  {
    type: "boolean",
    name: "Breast cancer family history",
    id: "fmhs_brst_yn",
    value: "Yes",
  },
  { type: "number", name: "Menarche age", id: "mena_age", input: "number" },
  { type: "boolean", name: "Menopause", id: "meno_yn" },
  { type: "boolean", name: "childbirth", id: "delv_yn" },
  { type: "boolean", name: "Breastfeeding Experience", id: "feed_yn" },
  {
    type: "number",
    name: "Duration of Breastfeeding",
    id: "feed_drtn_mnth",
    input: "number",
  },
  { type: "boolean", name: "Intake of Oral Contraceptive Pill", id: "oc_yn" },
  { type: "boolean", name: "Hormone Replace Therapy", id: "hrt_yn" },
  { type: "number", name: "T Category", id: "t_category", input: "number" },
  { type: "number", name: "N Category", id: "n_category", input: "number" },
  { type: "number", name: "HER2 Score", id: "her2_score", input: "text" },
  { type: "number", name: "ki67", id: "ki67_score", input: "text" },
  { type: "boolean", name: "Recurance Yes or No", id: "rlps_yn" },
  { type: "number", name: "ER Test", id: "er_score", input: "number" },
  { type: "number", name: "PR Test", id: "pr_score", input: "number" },
];

let preDefienedGroups = {
  diag_age: [
    { label: "21-35", from: 21, to: 35 },
    { label: "35-40", from: 35, to: 40 },
  ],
  bmi_vl: [
    { label: "18.5~24.9", from: 18.5, to: 24.9 },
    { label: "25-", from: 25, to: 100 },
  ],
  mena_age: [
    { label: "10-13", from: 10, to: 13 },
    { label: "14-17", from: 14, to: 17 },
  ],
  feed_drtn_mnth: [
    { label: "> 1 Year", from: 12, to: 24 },
    { label: "1year ≤", from: 1, to: 11 },
  ],
  t_category: [
    { label: "Tis-T2", from: "Tis", to: "T2" },
    { label: "T3-T4", from: "T3", to: "T4" },
  ],
  n_category: [
    { label: "Nx-N2", from: "Nx", to: "N2" },
    { label: "N3", from: "N3", to: "N3" },
  ],
  her2_score: [
    {
      label: "negative(0-1+)",
      from: "negative(0, 0~1, 1+)",
      to: "negative(0, 0~1, 1+)",
      value: "negative(0, 0~1, 1+)",
    },
    {
      label: "positive(2+-3+)",
      from: "positive(2+,3+)",
      to: "positive(2+,3+)",
      value: "positive(2+,3+)",
    },
  ],
  pr_score: [
    { label: "Positive", from: 0, to: 1 },
    { label: "Negative", from: 1, to: 2 },
  ],
  er_score: [
    { label: "Positive", from: 0, to: 1 },
    { label: "Negative", from: 1, to: 2 },
  ],
  ki67_score: [
    { label: "low(≤15%)", from: "Positive 0%", to: "Positive 15%" },
    {
      label: "intermediate, high(15%<)",
      from: "Positive 15%",
      to: "Positive 100%",
    },
  ],
  smok_yn: [
    { label: "No", value: "smok_yn||N" },
    { label: "Yes", value: "smok_yn||Y" },
    // { label: "Current Smoking", value: "smok_curr_yn||Y" }
  ],

  // t_category: [
  //     { label: "Tis", from: 'Tis', to: 'Tis',value: 'Tis' },
  //     { label: "T1", from: 'T1', to: 'T1',value: 'T1' },
  //     { label: "T2", from: 'T2', to: 'T2',value: 'T2' },
  //     { label: "T3", from: 'T3', to: 'T3',value: 'T3' },
  //     { label: "T4", from: 'T4', to: 'T4',value: 'T4' },
  // ],
  // n_category: [
  //     { label: "N1", from: 'N1', to: 'N1' },
  //     { label: "N2", from: 'N2', to: 'N2' },
  //     { label: "N3", from: 'N3', to: 'N3' }
  // ]
};
export const PreDefienedFilters = ({ parentCallback, groupFilters }) => {
  const [selectedFilterType, setSelectedFilterType] = useState({});
  const [filterGroupsHtml, setFilterGroupsHtml] = useState([]);
  const [filters, setFilters] = useState({});
  const [resetClicked, setResetClicked] = useState(false);
  const [isGroupFilterProp, setIsGroupFilterProp] = useState(false);
  // const [filterType,setFilterType] = useState('transcriptome')
  const preDefienedGroups1 = {
    diag_age: [
      { label: "21-35", from: 21, to: 35 },
      { label: "36-40", from: 36, to: 40 },
    ],
    bmi_vl: [
      { label: "18.5~24.9", from: 18.5, to: 24.9 },
      { label: "25-", from: 25, to: 100 },
    ],
    mena_age: [
      { label: "10-13", from: 10, to: 13 },
      { label: "14-17", from: 14, to: 17 },
    ],
    feed_drtn_mnth: [
      { label: "> 1 Year", from: 12, to: 24 },
      { label: "1year ≤", from: 1, to: 11 },
    ],
    t_category: [
      { label: "Tis-T2", from: "Tis", to: "T2" },
      { label: "T3-T4", from: "T3", to: "T4" },
    ],
    n_category: [
      { label: "Nx-N2", from: "Nx", to: "N2" },
      { label: "N3", from: "N3", to: "" },
    ],
    her2_score: [
      {
        label: "negative(0-1+)",
        from: "negative(0-1+)",
        to: "0,0~1,1+",
        value: "negative(0-1+)",
      },
      {
        label: "positive(2+-3+)",
        from: "positive(2+-3+)",
        to: "2+,3+",
        value: "positive(2+-3+)",
      },
    ],
    pr_score: [
      { label: "Positive", from: 0, to: 1 },
      { label: "Negative", from: 1, to: 2 },
    ],
    er_score: [
      { label: "Positive", from: 0, to: 1 },
      { label: "Negative", from: 1, to: 2 },
    ],
    ki67_score: [
      { label: "low(≤15%)", from: "0", to: "15" },
      { label: "intermediate, high(15%<)", from: "15", to: "100" },
    ],
    smok_yn: [
      { label: "No", value: "smok_yn||N" },
      { label: "Yes", value: "smok_yn||Y" },
      // { label: "Current Smoking", value: "smok_curr_yn||Y" }
    ],
  };

  const submitFilters = () => {
    if (Object.keys(filters).length > 0) {
      
      parentCallback(filters);
    } else {
      parentCallback(groupFilters);
    }
  };

  const resetFilters = () => {
    setSelectedFilterType({});
    setFilterGroupsHtml([]);
    setFilters({});
    setResetClicked(true);
    setIsGroupFilterProp(false);
  };
  

  useEffect(() => {
    if (groupFilters && groupFilters.type) {
      if (resetClicked === false) {
        setIsGroupFilterProp(true);
      }

      let colName = groupFilters["column"];
      let filterGroupsHtmlTemp = [];
      if (groupFilters.type === "boolean") {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 1 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">Yes</h5>
            </div>
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 2 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">No</h5>
            </div>
          </div>
        );
      }

      if (groupFilters.type === "static") {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 1 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">Male</h5>
            </div>
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 2 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">Female</h5>
            </div>
          </div>
        );
      }

      if (groupFilters.type === "text") {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 1 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">
                {preDefienedGroups1[colName][0]["label"]}
              </h5>
            </div>
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 2 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">
                {preDefienedGroups1[colName][1]["label"]}
              </h5>
            </div>
          </div>
        );
      }
      if (groupFilters.type === "number") {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 1 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">
                {preDefienedGroups1[colName][0]["label"]}
              </h5>
            </div>
            <div className="flex flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 2 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">
                {preDefienedGroups1[colName][1]["label"]}
              </h5>
            </div>
          </div>
        );
      }
      setFilterGroupsHtml(filterGroupsHtmlTemp);
    }
  }, [groupFilters]);

  const filterTypeDropdownSelection = (event) => {
    let key = event.target.value;
    setSelectedFilterType({
      details: filterChoicesCustom[parseInt(key)],
      index: key,
    });
  };

  const dropDownChange = (event) => {
    const eventObject = JSON.parse(event.target.value);
    const filterData =
      preDefienedGroups1[eventObject.colName][eventObject.index];
    if ("value" in filterData) {
      setFilters((prevState) => ({
        ...prevState,
        ...{
          [eventObject.group]: filterData.value,
          column: selectedFilterType.details.id,
          type: "text",
        },
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        ...{
          [`${eventObject.group}_from`]: filterData.from,
          [`${eventObject.group}_to`]: filterData.to,
          column: selectedFilterType.details.id,
          type: "number",
        },
      }));
    }
  };

  useEffect(() => {
    let filterGroupsHtmlTemp = [];
    if (selectedFilterType && selectedFilterType.details) {
      if (selectedFilterType.details.type === "boolean") {
        setFilters({
          group_a: true,
          group_b: false,
          column: selectedFilterType.details.id,
          type: "boolean",
        });
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row">
              <h5 className="p-4 xs:text-xl">Group 1 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">Yes</h5>
            </div>
            <div className="flex flex-row">
              <h5 className="p-4 xs:text-xl">Group 2 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">No</h5>
            </div>
          </div>
        );
      }

      if (selectedFilterType.details.type === "static") {
        setFilters({
          group_a: "F",
          group_b: "M",
          column: selectedFilterType.details.id,
          type: "static",
        });
        filterGroupsHtmlTemp.push(
          <div key="gender">
            <div className="flex border mb-1 flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 1 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">Male</h5>
            </div>
            <div className="flex border mb-1 flex-row justify-around">
              <h5 className="p-4 xs:text-xl">Group 2 : </h5>
              <h5 className="p-4 text-bold xs:text-xl text-blue-700">Female</h5>
            </div>
          </div>
        );
      }

      if (
        selectedFilterType.details.type === "number" ||
        selectedFilterType.details.type === "text"
      ) {
        const colName = selectedFilterType.details.id;

        let t = preDefienedGroups1[colName];
        let tmp = { column: colName, type: selectedFilterType.details.type };

        for (let index = 0; index < t.length; index++) {
          const element = t[index];
          let indx = index + 1;
          filterGroupsHtmlTemp.push(
            <div key={"drop-user-" + index}>
              <div className="flex flex-row justify-around">
                <h5 className="p-4 xs:text-xl">Group {indx}: </h5>
                <h5 className="p-4 text-bold xs:text-xl text-blue-700">
                  {element.label}
                </h5>
              </div>
            </div>
          );
          tmp[indx + "_from"] = element.from;
          tmp[indx + "_to"] = element.to;
        }

        setFilters(tmp);
      }

      setFilterGroupsHtml(filterGroupsHtmlTemp);
    }
  }, [selectedFilterType]);
  return (
    <div className="m-1 bg-gray-100">
      <div className="p-1 py-3 px-2 col-span-2">
        <div className="block text-left text-blue-700-700 text-lg  font-bold mb-2">
          <FormattedMessage
            id="Clinical Attribute"
            defaultMessage="Clinical Attribute"
          />
        </div>
        {(resetClicked === true || isGroupFilterProp === false) && (
          <select
            onChange={filterTypeDropdownSelection}
            defaultValue=""
            className="w-full lg:p-4 xs:p-2 border xs:text-sm lg:text-lg focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
          >
            <option value=""></option>
            {filterChoicesCustom.map((type, index) => (
              <option
                className="lg:text-lg xs:text-sm"
                key={type.name}
                value={index}
              >
                {type.name}
              </option>
            ))}
          </select>
        )}
        {resetClicked === false && isGroupFilterProp === true && (
          <h6 className="border p-4">
            {filterChoicesCustom.map((e) => {
              if (groupFilters.column === e.id) {
                return e.name;
              }
            })}
          </h6>
        )}
      </div>
      <div className="p-1 py-3 px-2 col-span-2">{filterGroupsHtml}</div>
      <div>
        <button
          onClick={submitFilters}
          className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 xs:w-28 h-20 xs:text-sm text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
        >
          <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
        </button>
      </div>
      <div>
        <button
          onClick={resetFilters}
          className="bg-white hover:bg-gray-700 mb-3 lg:w-80 h-20 xs:w-28 xs:text-sm text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
        >
          <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
        </button>
      </div>
    </div>
  );
};

const GroupFilters = ({ parentCallback, groupFilters, viz_type }) => {
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );
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

  const preDefienedGroups1 = preDefienedGroups;

  filterChoices = [
    { type: "number", id: "bmi_vl", name: "Body Mass Index", input: "number" },
    {
      type: "number",
      name: "Age Of Diagonosis",
      id: "diag_age",
      input: "number",
    },
    { type: "dropdown", name: "Smoking Status", id: "smok_yn" },
    {
      type: "number",
      name: "First Menstural Age",
      id: "mena_age",
      input: "number",
    },
    {
      type: "number",
      name: "Duration of Breastfeeding(month)",
      id: "feed_drtn_mnth",
      input: "number",
    },
    { type: "dropdown", name: "T Category", id: "t_category", input: "number" },
    { type: "dropdown", name: "N Category", id: "n_category", input: "number" },
    { type: "dropdown", name: "HER2 Score", id: "her2_score", input: "number" },
    { type: "dropdown", name: "ki67", id: "ki67_score", input: "number" },
    {
      type: "number",
      name: "Relapse Duration(month)",
      id: "rlps_cnfr_drtn",
      input: "number",
    },
  ];

  preDefienedGroups1["smok_yn"] = [
    { label: "No Smoking", value: "smok_yn||N" },
    { label: "Past Smoking", value: "smok_yn||Y" },
    { label: "Current Smoking", value: "smok_curr_yn||Y" },
  ];
  preDefienedGroups1["t_category"] = [
    { label: "Tis", from: "Tis", to: "Tis", value: "Tis" },
    { label: "T1", from: "T1", to: "T1", value: "T1" },
    { label: "T2", from: "T2", to: "T2", value: "T2" },
    { label: "T3", from: "T3", to: "T3", value: "T3" },
    { label: "T4", from: "T4", to: "T4", value: "T4" },
  ];
  preDefienedGroups1["n_category"] = [
    { label: "Nx", from: "Nx", to: "Nx", value: "Nx" },
    { label: "N0", from: "N0", to: "N0", value: "N0" },
    { label: "N1", from: "N1", to: "N1", value: "N1" },
    { label: "N2", from: "N2", to: "N2", value: "N2" },
    { label: "N3", from: "N3", to: "N3", value: "N3" },
  ];
  preDefienedGroups1["her2_score"] = [
    {
      value: "negative (0-1+)",
      label: "negative (0-1+)",
      from: "0",
      to: "(0-1+)",
    },
    { value: "equivocal (2+)", label: "equivocal (2+)", from: "2", to: "(2+)" },
    { value: "positive (3+)", label: "positive (3+)", from: "2+", to: "(3+)" },
  ];

  preDefienedGroups1["ki67_score"] = [
    { label: "low(≤15%)", value: "low", from: "0", to: "15" },
    {
      label: "intermediate(<15-30%≤)",
      value: "intermediate",
      from: "15",
      to: "30",
    },
    { label: "high(30%<)", value: "high", from: "30", to: "100" },
  ];

  // const submitFilters = () => {

  //   if (isFilterResetHappened) {
  //     let send_response = true;
  //     let min1Value = Number.MAX_VALUE;
  //     let min2Value = Number.MAX_VALUE;
  //     let max1Value = Number.MIN_VALUE;
  //     let max2Value = Number.MIN_VALUE;
  //     const min_1_from = document.querySelectorAll('[name="1_from"]');
  //     const max_1_to = document.querySelectorAll('[name="1_to"]');
  //     const min_2_from = document.querySelectorAll('[name="2_from"]');
  //     const max_2_to = document.querySelectorAll('[name="2_to"]');
  //     // getting min value from all
  //     for (let obj in min_1_from) {
  //       if (min_1_from[obj]) {
  //         if (
  //           (min_1_from[obj].classList &&
  //             (min_1_from[obj].classList.contains("border-2") ||
  //               min_1_from[obj].classList.contains("border-red-400"))) ||
  //           min_1_from[obj].value === ""
  //         ) {
  //           send_response = false;
  //           // return 'error_in_1_from';
  //         } else {
  //           if (min_1_from[obj].value) {
  //             min1Value = Math.min(min_1_from[obj].value);
  //           }
  //         }
  //       }
  //     }
  //     for (let obj in max_1_to) {
  //       if (max_1_to[obj]) {
  //         if (
  //           (max_1_to[obj].classList &&
  //             (max_1_to[obj].classList.contains("border-2") ||
  //               max_1_to[obj].classList.contains("border-red-400"))) ||
  //           max_1_to[obj].value === ""
  //         ) {
  //           send_response = false;
  //           // return 'error_in_1_to';
  //         } else {
  //           if (max_1_to[obj].value) {
  //             max1Value = Math.max(max_1_to[obj].value);
  //           }
  //         }
  //       }
  //     }
  //     for (let obj in min_2_from) {
  //       if (min_2_from[obj]) {
  //         if (
  //           (min_2_from[obj].classList &&
  //             (min_2_from[obj].classList.contains("border-2") ||
  //               min_2_from[obj].classList.contains("border-red-400"))) ||
  //           min_2_from[obj].value === ""
  //         ) {
  //           send_response = false;
  //           // return 'error_in_2_from';
  //         } else {
  //           if (min_2_from[obj].value) {
  //             min2Value = Math.min(min_2_from[obj].value);
  //           }
  //         }
  //       }
  //     }
  //     for (let obj in max_2_to) {
  //       if (max_2_to[obj]) {
  //         if (
  //           (max_2_to[obj].classList &&
  //             (max_2_to[obj].classList.contains("border-2") ||
  //               max_2_to[obj].classList.contains("border-red-400"))) ||
  //           max_2_to[obj].value === ""
  //         ) {
  //           send_response = false;
  //           // return 'error_in_2_to';
  //         } else {
  //           if (max_2_to[obj].value) {
  //             max2Value = Math.max(max_2_to[obj].value);
  //           }
  //         }
  //       }
  //     }
  //     if (send_response === true) {
  //       let final_payload = { ...userGivenInputValues };
  //       final_payload["1_from"] = min1Value;
  //       final_payload["1_to"] = max1Value;
  //       final_payload["2_from"] = min2Value;
  //       final_payload["2_to"] = max2Value;
  //       setUserGivenInputValues(final_payload);
  //       parentCallback(userGivenInputValues);
  //       resetFilters()
  //     }
  //   } else {
  //     parentCallback({ ...userGivenInputValues });
  //   }
  // };

 const submitFilters = () => {

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
                  (min_1_from[obj].classList.contains("border-2") ||
                    min_1_from[obj].classList.contains("border-red-400"))) ||
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
                  (max_1_to[obj].classList.contains("border-2") ||
                    max_1_to[obj].classList.contains("border-red-400"))) ||
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
        // resetFilters();
      }
    } 
    else {
      // resetFilters();
      // parentCallback({ ...userGivenInputValues });
      parentCallback(userGivenInputValues );
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
    setFilters({});

  
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

  // let validate_fusion = ()=>{
  //     // let min1Value = Number.MAX_VALUE;
  //     // let min2Value = Number.MAX_VALUE;
  //     // let max1Value = Number.MIN_VALUE;
  //     // let max2Value = Number.MIN_VALUE;
  //     // let errorin_1_from,errorin_1_to,errorin_2_from,errorin_2_to;
  //     // const min_1_from = document.querySelectorAll('[name="1_from"]');
  //     // const max_1_to = document.querySelectorAll('[name="1_to"]');
  //     // const min_2_from = document.querySelectorAll('[name="2_from"]');
  //     // const max_2_to = document.querySelectorAll('[name="2_to"]');
  //     // // getting min value from all 1_from
  //     // for (let obj in min_1_from) {
  //     //     if (min_1_from[obj]) {
  //     //         if(min_1_from[obj].classList.includes('border-2') || min_1_from[obj].classList.includes('border-red-400'))
  //     //         {
  //     //             return 'error_in_1_from';
  //     //         }
  //     //         else{
  //     //             if(min_1_from[obj].target.value){
  //     //                 min1Value = Math.min(min_1_from[obj].target.value)
  //     //             }
  //     //         }

  //     //     }
  //     //   }
  //     // for (let obj in max_1_to) {
  //     //     if (max_1_to[obj]) {
  //     //         if(max_1_to[obj].classList.includes('border-2') || max_1_to[obj].classList.includes('border-red-400'))
  //     //         {
  //     //             return 'error_in_1_to';
  //     //         }
  //     //         else{
  //     //             if(max_1_to[obj].target.value){
  //     //                 max1Value = Math.max(max_1_to[obj].target.value)
  //     //             }
  //     //         }

  //     //     }
  //     //   }
  //     // for (let obj in min_2_from) {
  //     //     if (min_2_from[obj]) {
  //     //         if(min_2_from[obj].classList.includes('border-2') || min_2_from[obj].classList.includes('border-red-400'))
  //     //         {
  //     //             return 'error_in_2_from';
  //     //         }
  //     //         else{
  //     //             if(min_2_from[obj].target.value){
  //     //                 min2Value = Math.min(min_2_from[obj].target.value)
  //     //             }
  //     //         }

  //     //     }
  //     //   }
  //     // for (let obj in max_2_to) {
  //     //     if (max_2_to[obj]) {
  //     //         if(max_2_to[obj].classList.includes('border-2') || max_2_to[obj].classList.includes('border-red-400'))
  //     //         {
  //     //             return 'error_in_2_to';
  //     //         }
  //     //         else{
  //     //             if(max_2_to[obj].target.value){
  //     //                 max2Value = Math.max(max_2_to[obj].target.value)
  //     //             }
  //     //         }

  //     //     }
  //     //   }
  // }

  const onChangeFilterInput = (e) => {
    if (e.target.type === "number") {
      let id = e.target.name;
      let ids = id.split("_");
      let m_id = ids[0];

      
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
        one_from_0.classList.remove("border-2");
        one_from_0.classList.remove("border-red-400");
        one_to_0.classList.remove("border-2");
        one_to_0.classList.remove("border-red-400");
        // let is_valid = validate_fusion()
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
      setFilterSelected(filterChoices[targetNumber].name);
      setSelectDefaultValue(String(targetNumber));
      setSelectedFilterDetails(filterChoices[targetNumber]);
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
      let clinicalMaxMinInfoData = clinicalMaxMinInfo["data"];
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
        if (viz_type === "volcono" || viz_type === "fusion") {
          return (
            <>
              <div key={`${compCase}-1${Math.random()}`} className="mb-4">
                <div>
                  <div className={LabelCss} htmlFor="username">
                  {`Group ${groupsCounter}`}
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className={numberInputBoxCss}
                      min={min}
                      max={max}
                      name={`${groupsCounter}_from`}
                      type="number"
                      placeholder={min}
                    ></input>
                    <input
                      onChange={onChangeFilterInput}
                      className={numberInputBoxCss}
                      min={min}
                      max={max}
                      name={`${groupsCounter}_to`}
                      type="number"
                      placeholder={max}
                    ></input>
                  </div>
                </div>
              </div>
              {/* <div key={`${compCase}-2${Math.random()}`} className="mb-4">
                <div>
                  <div className={LabelCss} htmlFor="username">
                    Group 2
                  </div>
                  <div>
                    <input
                      onChange={onChangeFilterInput}
                      className={numberInputBoxCss}
                      name={`2_from`}
                      min={min}
                      max={max}
                      type="number"
                      placeholder={min}
                    ></input>
                    <input
                      onChange={onChangeFilterInput}
                      className={numberInputBoxCss}
                      name={`2_to`}
                      min={min}
                      max={max}
                      type="number"
                      placeholder={max}
                    ></input>
                  </div>
                </div>
              </div> */}
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
                    min={min}
                    max={max}
                    type="number"
                    placeholder={min}
                  ></input>
                  <input
                    onChange={onChangeFilterInput}
                    className={numberInputBoxCss}
                    name={`${groupsCounter}_to`}
                    min={min}
                    max={max}
                    type="number"
                    placeholder={max}
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
        return false;
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
        if (
          Object.keys(groupFilters).length > 0 &&
          groupFilters["type"] === "static"
        ) {
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
                <tr key={colName + index} className="border-b">
                  <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                    {element.label}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={group_a}
                      onChange={dropDownChange}
                      value={JSON.stringify({
                        index: index,
                        colName: colName,
                        group: "group_1",
                      })}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={group_b}
                      onChange={dropDownChange}
                      value={JSON.stringify({
                        index: index,
                        colName: colName,
                        group: "group_2",
                      })}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={group_c}
                      onChange={dropDownChange}
                      value={JSON.stringify({
                        index: index,
                        colName: colName,
                        group: "group_3",
                      })}
                    />
                  </td>
                </tr>
              );
            });
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
                        group: "group_1",
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
                        group: "group_2",
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
                        group: "group_3",
                      })}
                    />
                  </td>
                </tr>
              )
            );
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
                      group: "group_1",
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
                      group: "group_2",
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
                      group: "group_3",
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
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Group C
                </th>
              </tr>
            </thead>
            <tbody key={"group_tbody"}>{tr}</tbody>
          </table>
        );
      }

      if (prevStateFilters.length > 0) {
        setFilterInputs([...prevStateFilters]);
      } else {
        setFilterInputs([...componentData]);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
  }, [selectedFilterDetails]);

  const AppendNewGroup = () => {
    if (groupsCounter <= 3) {
      const filterType = selectedFilterDetails.type;
      const componentData = componetSwitch(filterType);
      console.log("compof",filterType);
      setFilterInputs((prevState) => [...prevState, componentData]);
      setGroupsCounter((prevState) => prevState + 1);
    }
  };

  return (
    <div className="m-1 bg-gray-100">
      <div className="p-1 py-3 px-2 col-span-2">
        <div className="block text-left text-blue-700-700 text-lg  font-bold mb-2">
          <FormattedMessage
            id="Clinical Attribute"
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
      {userGivenInputValues['type'] === 'number' &&
      <p className="text-left text-base ml-6">Max and Min Values are based on Clinincal Information File</p>
      }
      {showAddGroupButton && (
        <div onClick={AppendNewGroup} className="p-1 py-3 px-2 col-span-2">
          <button className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Group
          </button>
        </div>
      )}
      <div className="p-1 py-3 px-2 col-span-2 overflow-x-auto">
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

export default GroupFilters;

// export const UserDefinedGroupFilters = ({
//   parentCallback,
//   groupFilters,
//   viz_type,
// }) => {

//   const userDefinedFilter = useSelector(
//     (data) => data.dataVisualizationReducer.userDefinedFilter
//   );


//   useEffect(() => {
//     if (
//       userDefinedFilter &&
//       userDefinedFilter["filterJson"] &&
//       "Clinical Information" in userDefinedFilter["filterJson"]
//     ) {
//       let minmax = {};
//       let bool_cols = [];
//       for (let val in userDefinedFilter["filterJson"]["Clinical Information"]) {
//         if (
//           userDefinedFilter["filterJson"]["Clinical Information"][val]
//             .length === 1
//         ) {
//           if (
//             userDefinedFilter["filterJson"]["Clinical Information"][val][0][
//               "type"
//             ] === "number"
//           ) {
//             let max =
//               userDefinedFilter["filterJson"]["Clinical Information"][val][0][
//                 "max"
//               ];
//             let min =
//               userDefinedFilter["filterJson"]["Clinical Information"][val][0][
//                 "min"
//               ];
//             let max1 = val + "_max";
//             let min1 = val + "_min";
//             minmax[max1] = max;
//             minmax[min1] = min;
//           }
//         }
//         for (
//           let ind = 0;
//           ind <
//           userDefinedFilter["filterJson"]["Clinical Information"][val].length;
//           ind++
//         ) {
//           if (
//             "id" in
//             userDefinedFilter["filterJson"]["Clinical Information"][val][ind]
//           ) {
//             let bool_include =
//               userDefinedFilter["filterJson"]["Clinical Information"][val][ind][
//                 "id"
//               ];
//             if (
//               bool_include.slice(-3) === "yes" ||
//               bool_include.slice(-2) === "no"
//             ) {
//               bool_cols.push(
//                 userDefinedFilter["filterJson"]["Clinical Information"][val][
//                   ind
//                 ]["name"]
//               );
//             }
//           }
//         }
//       }
//       setClinicalMaxMinInfo(minmax);
//       setBooleanColumns([...new Set(bool_cols)]);

//     }
//   }, [userDefinedFilter]);



//   // const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);
//   const [filterSelected, setFilterSelected] = useState("");
//   const [selectedFilterDetails, setSelectedFilterDetails] = useState({});
//   const [filterInputs, setFilterInputs] = useState([]);
//   const [userGivenInputValues, setUserGivenInputValues] = useState({});
//   const [showAddGroupButton, setShowAddGroupButton] = useState(false);
//   const [groupsCounter, setGroupsCounter] = useState(2);
//   const [prevStateFilters, setPrevStateFilters] = useState([]);
//   const [isFilterResetHappened, setIsFilterResetHappened] = useState(false);
//   const [multipleInputs, setMultipleInputs] = useState({});
//   const [selectDefaultValue, setSelectDefaultValue] = useState("0");
//   const [preDefienedGroups1, setPreDefienedGroups1] = useState({});
//   const [filterChoices, setFilterChoices] = useState([]);
//   const [clinicalMaxMinInfo, setClinicalMaxMinInfo] = useState({});
//   const [booleanColumns, setBooleanColumns] = useState([]);
//   let { tab, project_id } = useParams();


//   useEffect(() => {
    
//     let preDefienedGroups1 = {};
//     let filterChoices = [];
//     if (project_id !== undefined) {
//       if (userDefinedFilter && Object.keys(userDefinedFilter).length > 0) {
//         let colsobj = userDefinedFilter["filterJson"]["Clinical Information"];
//         for (let i in colsobj) {
//           for (let j in colsobj[i]) {
//             if (colsobj[i][j]["type"] === "number") {
//               let d_obj = {
//                 type: "number",
//                 id: colsobj[i][j]["name"],
//                 name: colsobj[i][j]["name"],
//                 input: "number",
//               };

//               let group_a = {
//                 label: `${colsobj[i][j]["min"]}-${colsobj[i][j]["max"]}`,
//                 from: colsobj[i][j]["min"],
//                 to: colsobj[i][j]["max"],
//               };
//               let group_b = {
//                 label: `${colsobj[i][j]["min"]}-${colsobj[i][j]["max"]}`,
//                 from: colsobj[i][j]["min"],
//                 to: colsobj[i][j]["max"],
//               };
//               if (!preDefienedGroups1[colsobj[i][j]["name"]]) {
//                 preDefienedGroups1[colsobj[i][j]["name"]] = [];
//               }
//               preDefienedGroups1[colsobj[i][j]["name"]].push(group_a);
//               preDefienedGroups1[colsobj[i][j]["name"]].push(group_b);
//               filterChoices.push(d_obj);
//             } else {
//               let d_obj = {
//                 type: "dropdown",
//                 name: colsobj[i][j]["name"],
//                 id: colsobj[i][j]["name"],
//                 input: "number",
//               };
//               let labelIndex = colsobj[i][j]["id"].lastIndexOf("_");
//               let label_ = colsobj[i][j]["id"].substring(labelIndex + 1);
//               let group = {
//                 label: label_,
//                 from: colsobj[i][j]["value"],
//                 to: colsobj[i][j]["value"],
//                 value: colsobj[i][j]["value"],
//               };
//               if (!preDefienedGroups1[colsobj[i][j]["name"]]) {
//                 preDefienedGroups1[colsobj[i][j]["name"]] = [];
//               }
//               if (group["value"] !== "None") {
//                 preDefienedGroups1[colsobj[i][j]["name"]].push(group);
//               }
//               filterChoices.push(d_obj);
//             }
//           }
//         }
//         const uniqueFilterChoices = [
//           ...new Map(filterChoices.map((v) => [v.id, v])).values(),
//         ];
//         setFilterChoices(uniqueFilterChoices);
//         setPreDefienedGroups1(preDefienedGroups1);
//       }
//     }
//   }, [userDefinedFilter]);


//   const submitFilters = () => {

//     if (isFilterResetHappened) {
//       let send_response = true;
//       if(userGivenInputValues['type'] === 'static'){
//         let final_payload = { ...userGivenInputValues };
//         let total_groups=0;
//         for(let i=1;i<=3;i++){
//             if(`group_${i}` in final_payload){
//                 total_groups++;
//             }
//         }
//         // if('group_1' in final_payload  === false){
//         //   send_response = false; 
//         // }
//         // if(total_groups === 1 ){
//         //     send_response = false; 
//         // }
//         // else if(total_groups === 2){
//         //     if('group_1' in final_payload === false && 'group_2' in final_payload === true && 'group_3' in final_payload === true){
//         //         let l2 = [...userGivenInputValues['group_2']]
//         //         let l3 = [...userGivenInputValues['group_3']]
//         //         userGivenInputValues['group_2'] = l3
//         //         userGivenInputValues['group_1'] = l2
//         //         delete userGivenInputValues['group_3']
//         //     }
//         // }
//       }
//       else{
//         let min1Value = Number.MAX_VALUE;
//         let max1Value = Number.MIN_VALUE;
//         let final_payload = { ...userGivenInputValues };
//         for(let i = 1; i <groupsCounter; i++){
//           const min_1_from = document.querySelectorAll(`[name="${i}_from"]`);
//           const max_1_to = document.querySelectorAll(`[name="${i}_to"]`);
//           let min_1_num,max_1_num
//           for (let obj in min_1_from) {
//             if (min_1_from[obj]) {
//               if (
//                 (min_1_from[obj].classList &&
//                   (min_1_from[obj].classList.contains("border-2") ||
//                     min_1_from[obj].classList.contains("border-red-400"))) ||
//                 min_1_from[obj].value === ""
//               ) {
//                 send_response = false;
//               } else {
//                 if (min_1_from[obj].value) {
//                   min1Value = Math.min(min_1_from[obj].value,min1Value);
//                   min_1_num = +(min_1_from[obj].value)
//                 }
//               }
//             }
//           }
//           for (let obj in max_1_to) {
//             if (max_1_to[obj]) {
//               if (
//                 (max_1_to[obj].classList &&
//                   (max_1_to[obj].classList.contains("border-2") ||
//                     max_1_to[obj].classList.contains("border-red-400"))) ||
//                 max_1_to[obj].value === ""
//               ) {
//                 send_response = false;
//               } else {
//                 if (max_1_to[obj].value) {
//                   max1Value = Math.max(max_1_to[obj].value,max1Value);
//                   max_1_num = +(max_1_to[obj].value)
//                 }
//               }
//             }
//           }
//               let one_from = `${i}_from`
//               let one_to = `${i}_to`
//               final_payload[one_from] = min_1_num;
//               final_payload[one_to] = max_1_num ;
//         }

//         if (send_response === true) {
//           setGroupsCounter(1)
//           setUserGivenInputValues(final_payload);
//           parentCallback(final_payload);
//         }
//       }
//       if (send_response === true &&  userGivenInputValues['type'] !== 'number') {
//         parentCallback(userGivenInputValues);
//         setGroupsCounter(1)
//         // resetFilters();
//       }
//     } 
//     else {
//       // resetFilters();
//       // parentCallback({ ...userGivenInputValues });
//       parentCallback(userGivenInputValues );
//     }
    
//   };

//   const resetFilters = () => {
//     setFilterSelected("");
//     setSelectDefaultValue("");
//     setSelectedFilterDetails({});
//     setFilterInputs([]);
//     setUserGivenInputValues({});
//     setShowAddGroupButton(false);
//     setGroupsCounter(1);
//     setIsFilterResetHappened(true);
//     setPrevStateFilters([]);
//   };

//    const updateSelectedFilter = (e) => {
//     resetFilters();
//     setIsFilterResetHappened(true);
//     setFilterInputs([]);
//     const targetValue = e.target.value;

//     if (targetValue !== "") {
//       setFilterSelected(filterChoices[parseInt(targetValue)].name);
//       setSelectDefaultValue(String(targetValue));
//       setSelectedFilterDetails(filterChoices[parseInt(targetValue)]);
//     } else {
//       setFilterSelected("");
//       setSelectDefaultValue("0");
//       setSelectedFilterDetails({});
//     }
//     // setGroupsCounter(1)
//   };

//   const onChangeFilterInput = (e) => {
//     if (e.target.type === "number") {
//       let id = e.target.name;
//       let ids = id.split("_");
//       let m_id = ids[0];

//       let one_to_0, one_to, one_max_value, one_from_0, one_from, one_min_value;
//       if (ids.includes("from")) {
//         one_from_0 = e.target;
//         one_from = one_from_0 ? +one_from_0.value : +one_from_0.min;
//         one_min_value = one_from_0 ? +one_from_0.min : 0;
//         one_to_0 = one_from_0.nextSibling;
//         one_to = one_to_0 ? +one_to_0.value : one_from_0.max;
//         one_max_value = one_from_0 ? +one_from_0.max : 0;
//       } else if (ids.includes("to")) {
//         one_to_0 = e.target;
//         one_to = one_to_0 ? +one_to_0.value : +one_to_0.max;
//         one_max_value = one_to_0 ? +one_to_0.max : 0;
//         one_from_0 = one_to_0.previousElementSibling;
//         one_from = one_from_0 ? +one_from_0.value : one_from_0.min;
//         one_min_value = one_from_0 ? +one_from_0.min : 0;
//       }

//       if (
//         one_from > one_max_value ||
//         one_from < one_min_value ||
//         one_from > one_to
//       ) {
//         one_from_0.classList.add("border-2");
//         one_from_0.classList.add("border-red-400");
//         one_to_0.classList.add("border-2");
//         one_to_0.classList.add("border-red-400");
//       } else if (
//         one_to > one_max_value ||
//         one_to < one_min_value ||
//         one_to < one_from
//       ) {
//         one_from_0.classList.add("border-2");
//         one_from_0.classList.add("border-red-400");
//         one_to_0.classList.add("border-2");
//         one_to_0.classList.add("border-red-400");
//       } else {
//         one_from_0.classList.remove("border-2");
//         one_from_0.classList.remove("border-red-400");
//         one_to_0.classList.remove("border-2");
//         one_to_0.classList.remove("border-red-400");
//         // let is_valid = validate_fusion()
//         setUserGivenInputValues((prevState) => ({
//           ...prevState,
//           [one_from_0.name]: one_from_0.value,
//         }));
//         setUserGivenInputValues((prevState) => ({
//           ...prevState,
//           [one_to_0.name]: one_to_0.value,
//         }));
//       }
//     } else {
//       setUserGivenInputValues((prevState) => ({
//         ...prevState,
//         [e.target.name]: e.target.value,
//       }));
//     }
//   };

//   useEffect(() => {
//     if (groupFilters && Object.keys(groupFilters).length > 0) {
//       let filterType = groupFilters.type;
//       setUserGivenInputValues(groupFilters);
//       let targetNumber = 0;
//       filterChoices.forEach((e, index) => {
//         if (e.id === groupFilters.column) {
//           targetNumber = index;
//         }
//       });
//       filterChoices &&
//         filterChoices[targetNumber] &&
//         setFilterSelected(filterChoices[targetNumber].name);
//       setSelectDefaultValue(String(targetNumber));
//       filterChoices && setSelectedFilterDetails(filterChoices[targetNumber]);
//       let valsArray = [];
//       let counter = 1;
//       for (let i = 1; i < Object.keys(groupFilters).length; i++) {
//         if (i in groupFilters || `${i}` in groupFilters) {
//           counter += 1;
//           valsArray.push(
//             <div key={`${i}-text-${Math.random()}`} className="mb-4">
//               <div>
//                 <div className={LabelCss} htmlFor="username">
//                   {`Group ${i}`}
//                 </div>
//                 <div>
//                   <input
//                     value={groupFilters[i]}
//                     onChange={onChangeFilterInput}
//                     className={checkBoxCss}
//                     name={`${i}`}
//                     type="text"
//                     placeholder="Enter Text"
//                   ></input>
//                 </div>
//               </div>
//             </div>
//           );
//         } else if (`${i}_from` in groupFilters) {
//           counter += 1;
//           valsArray.push(
//             <div key={`number-${i}${Math.random()}`} className="mb-4">
//               <div>
//                 <div className={LabelCss} htmlFor="username">
//                   {`Group ${i}`}
//                 </div>
//                 <div>
//                   <input
//                     defaultValue={groupFilters[`${i}_from`]}
//                     onChange={onChangeFilterInput}
//                     className={numberInputBoxCss}
//                     name={`${i}_from`}
//                     type="number"
//                     placeholder="from"
//                   ></input>
//                   <input
//                     defaultValue={groupFilters[`${i}_to`]}
//                     onChange={onChangeFilterInput}
//                     className={numberInputBoxCss}
//                     name={`${i}_to`}
//                     type="number"
//                     placeholder="to"
//                   ></input>
//                 </div>
//               </div>
//             </div>
//           );
//         }
//       }
//       if (filterType === "text" || filterType === "number") {
//         setPrevStateFilters(valsArray);
//         setGroupsCounter(counter);
//       }
//     }
//   }, []);

//   const componetSwitch = (compCase, groupLabels = null) => {
//     let max = "to";
//     let min = "from";
//     if (clinicalMaxMinInfo) {
//       let clinicalMaxMinInfoData = clinicalMaxMinInfo;
//       let clinicalInfoId = selectedFilterDetails["id"];
//       if (clinicalInfoId + "_min" in clinicalMaxMinInfoData) {
//         min = clinicalMaxMinInfoData[clinicalInfoId + "_min"];
//       }
//       if (clinicalInfoId + "_max" in clinicalMaxMinInfoData) {
//         max = clinicalMaxMinInfoData[clinicalInfoId + "_max"];
//       }
//     }
//     switch (compCase) {
//       case "static":
//         return (
//           <div key={compCase} className="mb-4">
//             {["A Group", "B Group"].map((e, index) => (
//               <div key={e} className="border mt-4 p-1">
//                 <div className={LabelCss} htmlFor="yes">
//                   {e}
//                 </div>
//                 <h1 id="yes" className="text-left mt-2">
//                   {groupLabels[index]}
//                 </h1>
//               </div>
//             ))}
//           </div>
//         );

//       case "number":
       
//           return (
//             <div
//               key={`${compCase}-${groupsCounter}${Math.random()}`}
//               className="mb-4"
//             >
//               <div>
//                 <div className={LabelCss} htmlFor="username">
//                   {`Group ${groupsCounter}`}
//                 </div>
//                 <div>
//                   <input
//                     onChange={onChangeFilterInput}
//                     className={numberInputBoxCss}
//                     name={`${groupsCounter}_from`}
//                     type="number"
//                     placeholder={min}
//                     min={min}
//                     max={max}
//                   ></input>
//                   <input
//                     onChange={onChangeFilterInput}
//                     className={numberInputBoxCss}
//                     name={`${groupsCounter}_to`}
//                     type="number"
//                     placeholder={max}
//                     min={min}
//                     max={max}
//                   ></input>
//                 </div>
//               </div>
//             </div>
//           );
        
//       case "text":
//         if (viz_type === "volcono") {
//           return (
//             <>
//               <div key={`${compCase}-1-${Math.random()}`} className="mb-4">
//                 <div>
//                   <div className={LabelCss} htmlFor="username">
//                     Group 1
//                   </div>
//                   <div>
//                     <input
//                       onChange={onChangeFilterInput}
//                       className={checkBoxCss}
//                       name="1"
//                       type="text"
//                       placeholder="Enter Text"
//                     ></input>
//                   </div>
//                 </div>
//               </div>
//               <div key={`${compCase}-2-${Math.random()}`} className="mb-4">
//                 <div>
//                   <div className={LabelCss} htmlFor="username">
//                     Group 2
//                   </div>
//                   <div>
//                     <input
//                       onChange={onChangeFilterInput}
//                       className={checkBoxCss}
//                       name="2"
//                       type="text"
//                       placeholder="Enter Text"
//                     ></input>
//                   </div>
//                 </div>
//               </div>
//             </>
//           );
//         } else {
//           return (
//             <div
//               key={`${compCase}-${groupsCounter}-${Math.random()}`}
//               className="mb-4"
//             >
//               <div>
//                 <div className={LabelCss} htmlFor="username">
//                   {`Group ${groupsCounter}`}
//                 </div>
//                 <div>
//                   <input
//                     onChange={onChangeFilterInput}
//                     className={checkBoxCss}
//                     name={`${groupsCounter}`}
//                     type="text"
//                     placeholder="Enter Text"
//                   ></input>
//                 </div>
//               </div>
//             </div>
//           );
//         }
//       default:
//         return ;
//     }
//   };

// //   const dropDownChange = (event) => {
// //     const eventObject = JSON.parse(event.target.value);
// //     const filterData =
// //       preDefienedGroups1[eventObject.colName][eventObject.index];
  
// //     let tmp = multipleInputs;
// //     if (eventObject.group in tmp) {
// //       if (event.target.checked === true) {
// //         tmp[eventObject.group].push(filterData.value);
// //       } else {
// //         const index = tmp[eventObject.group].indexOf(filterData.value);
// //         if (index > -1) {
// //           // only splice array when item is found
// //           tmp[eventObject.group].splice(index, 1); // 2nd parameter means remove one item only
// //         }
// //       }
// //     } else {
// //       if (event.target.checked === true) {
// //         tmp[eventObject.group] = [filterData.value];
// //       }
// //     }
// //     setMultipleInputs(tmp, filterData);
// //     if ("value" in filterData) {
// //       setUserGivenInputValues((prevState) => ({
// //         ...prevState,
// //         ...{
// //           [eventObject.group]: tmp[eventObject.group],
// //           column: selectedFilterDetails.id,
// //           type: "static",
// //         },
// //       }));
// //     }
// //   };
//   const dropDownChange = (event) => {
//     const eventObject = JSON.parse(event.target.value);
//     const filterData =
//       preDefienedGroups1[eventObject.colName][eventObject.index];

//     let tmp = multipleInputs;
//     if (eventObject.group in tmp) {
//       tmp[eventObject.group].push(filterData.value);
//     } else {
//       tmp[eventObject.group] = [filterData.value];
//     }

//     let group = eventObject["group"];
//     let value = filterData["value"];
//     let shouldExist = event.target.checked;

//     if (shouldExist === false) {
//       event.target.checked = false;
//       event.target.removeAttribute("checked");
//       let newTmp = tmp[group].filter((e) => e !== value);
//       tmp[group] = newTmp;
//     }

//     setMultipleInputs(tmp, filterData);

//     if ("value" in filterData) {
//       setUserGivenInputValues((prevState) => ({
//         ...prevState,
//         ...{
//           [eventObject.group]: tmp[eventObject.group],
//           column: selectedFilterDetails.id,
//           type: "static",
//         },
//       }));
//     }
//   };
//   useEffect(() => {
//     if (selectedFilterDetails && "type" in selectedFilterDetails && "id" in selectedFilterDetails) {
//       let filterType = selectedFilterDetails.type;
//       let colName = selectedFilterDetails.id;
//       let booleanType = booleanColumns.includes(selectedFilterDetails["name"]) ? "yes": "no";
//       if (filterType) {
//         let componentData = [];
//         if (filterType === "boolean" || filterType === "static" || booleanType === "yes") {
//           let options = ["Yes", "No"];
//           if (filterType === "static") {
//             options = [
//               selectedFilterDetails.options[0],
//               selectedFilterDetails.options[1],
//             ];
//             setUserGivenInputValues({
//               group_a: "M",
//               group_b: "F",
//               column: selectedFilterDetails.id,
//               type: filterType,
//             });
//           } else {
//             setUserGivenInputValues({
//               group_a: true,
//               group_b: false,
//               column: selectedFilterDetails.id,
//               type: "boolean",
//             });
//           }
//           componentData = [componetSwitch("static", options)];
//         } else if (filterType === "number") {
//           if (viz_type !== "volcono") {
//             setShowAddGroupButton(true);
//           }
//           setUserGivenInputValues({
//             column: selectedFilterDetails.id,
//             type: filterType,
//           });
//           componentData.push(componetSwitch("number"));
//         } else if (filterType === "text") {
//           setShowAddGroupButton(true);
//           setUserGivenInputValues({
//             column: selectedFilterDetails.id,
//             type: selectedFilterDetails.type,
//           });
//           componentData.push(componetSwitch("text"));
//         } else if (filterType === "dropdown") {
//           let tr = [];
//           if (Object.keys(groupFilters).length > 0 && groupFilters["type"] === "static") {
//             if (
//               groupFilters &&
//               groupFilters["column"] === colName &&
//               "group_1" in groupFilters  && groupFilters["group_1"].length > 0 &&
//               "group_2" in groupFilters && groupFilters["group_2"].length > 0 && 
//               "group_3" in groupFilters &&groupFilters["group_3"].length > 0
//             ) {
//               preDefienedGroups1[colName].forEach((element, index) => {
//                 let group_a = false;
//                 let group_b = false;
//                 let group_c = false;
//                 if (groupFilters["group_1"].indexOf(element.value) > -1) {
//                   group_a = true;
//                 }
//                 if (groupFilters["group_2"].indexOf(element.value) > -1) {
//                   group_b = true;
//                 }
//                 if (groupFilters["group_3"].indexOf(element.value) > -1) {
//                   group_c = true;
//                 }
//                 tr.push(
//                   <tr key={colName + index} className="border-b">
//                     <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
//                       {element.label}
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={group_a}
//                         onChange={dropDownChange}
//                         value={JSON.stringify({
//                           index: index,
//                           colName: colName,
//                           group: "group_1",
//                         })}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={group_b}
//                         onChange={dropDownChange}
//                         value={JSON.stringify({
//                           index: index,
//                           colName: colName,
//                           group: "group_2",
//                         })}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={group_c}
//                         onChange={dropDownChange}
//                         value={JSON.stringify({
//                           index: index,
//                           colName: colName,
//                           group: "group_3",
//                         })}
//                       />
//                     </td>
//                   </tr>
//                 );
//               });
//             } else {
//               preDefienedGroups1[colName].map((element, index) =>
//                 tr.push(
//                   <tr key={colName + index} className="border-b">
//                     <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
//                       {element.label}
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         onChange={dropDownChange}
//                         value={JSON.stringify({
//                           index: index,
//                           colName: colName,
//                           group: "group_1",
//                         })}
//                         defaultChecked = {false}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         onChange={dropDownChange}
//                         value={JSON.stringify({
//                           index: index,
//                           colName: colName,
//                           group: "group_2",
//                         })}
//                         defaultChecked = {false}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         onChange={dropDownChange}
//                         value={JSON.stringify({
//                           index: index,
//                           colName: colName,
//                           group: "group_3",
//                         })}
//                         defaultChecked = {false}
//                       />
//                     </td>
//                   </tr>
//                 )
//               );
//             }
//           } else {
//             preDefienedGroups1[colName].map((element, index) =>
//               tr.push(
//                 <tr key={colName + index} className="border-b">
//                   <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
//                     {element.label}
//                   </td>
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       onChange={dropDownChange}
//                       value={JSON.stringify({
//                         index: index,
//                         colName: colName,
//                         group: "group_1",
//                       })}
//                       defaultChecked = {false}
//                     />
//                   </td>
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       onChange={dropDownChange}
//                       value={JSON.stringify({
//                         index: index,
//                         colName: colName,
//                         group: "group_2",
//                       })}
//                       defaultChecked = {false}
//                     />
//                   </td>
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       onChange={dropDownChange}
//                       value={JSON.stringify({
//                         index: index,
//                         colName: colName,
//                         group: "group_3",
//                       })}
//                       defaultChecked = {false}
//                     />
//                   </td>
//                 </tr>
//               )
//             );
//           }
//           componentData.push(
//             <table className="table" key={"group_table"}>
//               <thead className="border-b w-full" key={"group_thead"}>
//                 <tr>
//                   <th></th>
//                   <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
//                     Group A
//                   </th>
//                   <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
//                     Group B
//                   </th>
//                   <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
//                     Group C
//                   </th>
//                 </tr>
//               </thead>
//               <tbody key={"group_tbody"}>{tr}</tbody>
//             </table>
//           );
//         }

//         if (prevStateFilters.length > 0) {
//           setFilterInputs([...prevStateFilters]);
//         } else {
//           setFilterInputs([...componentData]);
//           setGroupsCounter((prevState) => prevState + 1);
//         }
//       }
//     }
//   }, [selectedFilterDetails]);

//   const AppendNewGroup = () => {
//     if (groupsCounter <= 3) {
//       const filterType = selectedFilterDetails.type;
//       const componentData = componetSwitch(filterType);
//       setFilterInputs((prevState) => [...prevState, componentData]);
//       setGroupsCounter((prevState) => prevState + 1);
//     }
//   };

//   return (
//     <div className="m-1 bg-gray-100">
//       <div className="p-1 py-3 px-2 col-span-2">
//         <div className="block text-left text-blue-700-700 text-lg  font-bold mb-2">
//           <FormattedMessage
//             id="Clinical Attribute"
//             defaultMessage="Clinical Attribute"
//           />
//         </div>
//         <select
//           defaultValue={selectDefaultValue}
//           onChange={updateSelectedFilter}
//           name="selectOptions"
//           className="w-full lg:p-4 xs:p-2 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3"
//         >
//           <option value="0"></option>
//           {filterChoices.map((type, index) => (
//             <option
//               selected={filterSelected === type.name}
//               className="lg:text-lg xs:text-sm"
//               key={type.id}
//               value={index}
//             >
//               {type.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {showAddGroupButton && (
//         <div onClick={AppendNewGroup} className="p-1 py-3 px-2 col-span-2">
//           <button className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
//             Add Group
//           </button>
//         </div>
//       )}
//       <div className="p-1 py-3 px-2 col-span-2 overflow-x-auto">
//         {filterInputs}
//       </div>
//       {filterSelected && (
//         <div>
//           <button
//             onClick={submitFilters}
//             className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//       {filterSelected && (
//         <div>
//           <button
//             onClick={resetFilters}
//             className="bg-white hover:bg-gray-700 mb-3 lg:w-80 sm:w-40 h-20 text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded"
//           >
//             Reset
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };


export const UserDefinedGroupFilters = ({
  parentCallback,
  groupFilters,
  viz_type,
}) => {
  const  [clinicalMaxMinInfo, setClinicalMaxMinInfo] = useState({})
  const userDefinedFilter = useSelector(
    (data) => data.dataVisualizationReducer.userDefinedFilter
  );
  let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
 
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
  const [selectDefaultValue, setSelectDefaultValue] = useState("0");
  const [preDefienedGroups1, setPreDefienedGroups1] = useState({});
  const [filterChoices, setFilterChoices] = useState([]);
  const [booleanColumns, setBooleanColumns] = useState([]);
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


 const submitFilters = () => {

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
        // if('group_1' in final_payload  === false){
        //   send_response = false; 
        // }
        if(total_groups === 1 ){
            send_response = false; 
        }
        // else if(total_groups === 2){
        //     if('group_1' in final_payload === false && 'group_2' in final_payload === true && 'group_3' in final_payload === true){
        //         let l2 = [...userGivenInputValues['group_2']]
        //         let l3 = [...userGivenInputValues['group_3']]
        //         userGivenInputValues['group_2'] = l3
        //         userGivenInputValues['group_1'] = l2
        //         delete userGivenInputValues['group_3']
        //     }
        // }
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
                  (min_1_from[obj].classList.contains("border-2") ||
                    min_1_from[obj].classList.contains("border-red-400"))) ||
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
                  (max_1_to[obj].classList.contains("border-2") ||
                    max_1_to[obj].classList.contains("border-red-400"))) ||
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
        // resetFilters();
      }
    } 
    else {
      // resetFilters();
      // parentCallback({ ...userGivenInputValues });
      parentCallback(userGivenInputValues );
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

  // const onChangeFilterInput = (e) => {
  //   if (e.target.type === "number") {
  //     let id = e.target.id;
  //     let ids = id.split("_");
  //     let m_id = ids[0];

  //     let one_from_0 = document.getElementById(`${m_id}_from`);
  //     let one_from = one_from_0 ? +one_from_0.value : one_from_0.min;
  //     let one_min_value = one_from_0 ? +one_from_0.min : 0;
  //     let one_to_0 = document.getElementById(`${m_id}_to`);
  //     let one_to = one_to_0 ? +one_to_0.value : one_from_0.max;
  //     let one_max_value = one_from_0 ? +one_from_0.max : 0;

  //     if (
  //       one_from > one_max_value ||
  //       one_from < one_min_value ||
  //       one_from > one_to
  //     ) {
  //       one_from_0.classList.add("border-2");
  //       one_from_0.classList.add("border-red-400");
  //       one_to_0.classList.add("border-2");
  //       one_to_0.classList.add("border-red-400");
  //     } else if (
  //       one_to > one_max_value ||
  //       one_to < one_min_value ||
  //       one_to < one_from
  //     ) {
  //       one_from_0.classList.add("border-2");
  //       one_from_0.classList.add("border-red-400");
  //       one_to_0.classList.add("border-2");
  //       one_to_0.classList.add("border-red-400");
  //     } else {
  //       one_from_0.classList.remove("border-2");
  //       one_from_0.classList.remove("border-red-400");
  //       one_to_0.classList.remove("border-2");
  //       one_to_0.classList.remove("border-red-400");
  //       setUserGivenInputValues((prevState) => ({
  //         ...prevState,
  //         [one_from_0.name]: one_from_0.value,
  //       }));
  //       setUserGivenInputValues((prevState) => ({
  //         ...prevState,
  //         [one_to_0.name]: one_to_0.value,
  //       }));
  //     }
  //   } else {
  //     setUserGivenInputValues((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     }));
  //   }
  // };

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
        one_from_0.classList.remove("border-2");
        one_from_0.classList.remove("border-red-400");
        one_to_0.classList.remove("border-2");
        one_to_0.classList.remove("border-red-400");
        // let is_valid = validate_fusion()
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
      let clinicalMaxMinInfoData = clinicalMaxMinInfo;
      let clinicalInfoId = selectedFilterDetails["id"];
      // let clinicalMaxMinInfoData = clinicalMaxMinInfo["data"];
     
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
        if (viz_type === "volcono" ) {
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
    if (
      selectedFilterDetails &&
      "type" in selectedFilterDetails &&
      "id" in selectedFilterDetails
    ) {
      let filterType = selectedFilterDetails.type;
      let colName = selectedFilterDetails.id;
      let booleanType = booleanColumns.includes(selectedFilterDetails["name"]) ? "yes": "no";
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
          if(viz_type === 'fusion'){
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
                    <tr key={colName + index} className="border-b">
                      <td className="text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                        {element.label}
                      </td>
                      <td className="px-6 py-4">
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
                      <td className="px-6 py-4">
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
                      <td className="px-6 py-4">
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
                            group: "group_1",
                          })}
                          defaultChecked = {false}
                        />
                      </td>
                      <td className="px-6 py-4">
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
                      <td className="px-6 py-4">
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
                          group: "group_1",
                        })}
                        defaultChecked = {false}
                      />
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
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
                <thead className="border-b w-full" key={"group_thead"}>
                  <tr>
                    <th></th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Group A
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Group B
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
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
    if (groupsCounter <= 3) {
      const filterType = selectedFilterDetails.type;
      const componentData = componetSwitch(filterType);
      setFilterInputs((prevState) => [...prevState, componentData]);
      setGroupsCounter((prevState) => prevState + 1);
    }
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
      {userGivenInputValues['type'] === 'number' &&
      <p className="text-left text-base ml-6">Max and Min Values are based on Clinincal Information File</p>
      }
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
