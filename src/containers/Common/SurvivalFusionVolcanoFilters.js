import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Context } from '../../wrapper';
let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

let filterChoices = [
  { type: 'static', name: 'sex', id: 'sex_cd', options: ['Male', 'Female'] },
  {
    type: 'number',
    name: 'Age Of Diaganosis',
    id: 'diag_age',
    input: 'number'
  },
  { type: 'number', id: 'bmi_vl', name: 'Body Mass Index', input: 'number' },
  {
    type: 'boolean',
    id: 'bila_cncr_yn',
    name: 'Diagnosis of Bilateral Breast Cancer'
  },
  { type: 'boolean', name: 'Smoking Status', id: 'smok_curr_yn' },
  { type: 'boolean', name: 'Former Smoker', id: 'smok_yn' },
  { type: 'boolean', name: 'Alcohol Consumption', id: 'drnk_yn', value: 'Yes' },
  {
    type: 'boolean',
    name: 'Family History of Breast Cancer',
    id: 'fmhs_brst_yn',
    value: 'Yes'
  },
  {
    type: 'number',
    name: 'First Menstural Age',
    id: 'mena_age',
    input: 'number'
  },
  { type: 'boolean', name: 'Menopause', id: 'meno_yn' },
  { type: 'boolean', name: 'childbirth', id: 'delv_yn' },
  { type: 'boolean', name: 'Experience of Breastfeeding', id: 'feed_yn' },
  {
    type: 'number',
    name: 'Duration of Breastfeeding',
    id: 'feed_drtn_mnth',
    input: 'number'
  },
  { type: 'boolean', name: 'Intake of Oral Contraceptive Pill', id: 'oc_yn' },
  { type: 'boolean', name: 'Hormone Replacement Therapy', id: 'hrt_yn' },
  { type: 'number', name: 'T Category', id: 't_category', input: 'number' },
  { type: 'number', name: 'N Category', id: 'n_category', input: 'number' },
  { type: 'text', name: 'HER2 Score', id: 'her2_score', input: 'text' },
  { type: 'text', name: 'ki67', id: 'ki67_score', input: 'text' },
  {
    type: 'number',
    name: 'Relapse Duration',
    id: 'rlps_cnfr_drtn',
    input: 'number'
  },
  { type: 'boolean', name: 'Relapse Yes or No', id: 'rlps_yn' },
  { type: 'number', name: 'ER Test', id: 'er_score', input: 'number' },
  { type: 'number', name: 'PR Test', id: 'pr_score', input: 'number' }
];

const filterChoicesCustom = [
  { type: 'static', name: 'Sex', id: 'sex_cd', options: ['Male', 'Female'] },
  {
    type: 'number',
    name: 'Age Of Diagonosis',
    id: 'diag_age',
    input: 'number'
  },
  { type: 'number', id: 'bmi_vl', name: 'BMI', input: 'number' },
  {
    type: 'boolean',
    id: 'bila_cncr_yn',
    name: 'Diagnosis of Bilateral Breast Cancer'
  },
  { type: 'boolean', name: 'Smoking Status', id: 'smok_yn' },
  { type: 'boolean', name: 'Alcohol Consumption', id: 'drnk_yn', value: 'Yes' },
  {
    type: 'boolean',
    name: 'Breast cancer family history',
    id: 'fmhs_brst_yn',
    value: 'Yes'
  },
  { type: 'number', name: 'Menarche age', id: 'mena_age', input: 'number' },
  { type: 'boolean', name: 'Menopause', id: 'meno_yn' },
  { type: 'boolean', name: 'childbirth', id: 'delv_yn' },
  { type: 'boolean', name: 'Breastfeeding Experience', id: 'feed_yn' },
  {
    type: 'number',
    name: 'Duration of Breastfeeding',
    id: 'feed_drtn_mnth',
    input: 'number'
  },
  { type: 'boolean', name: 'Intake of Oral Contraceptive Pill', id: 'oc_yn' },
  { type: 'boolean', name: 'Hormone Replace Therapy', id: 'hrt_yn' },
  { type: 'number', name: 'T Category', id: 't_category', input: 'number' },
  { type: 'number', name: 'N Category', id: 'n_category', input: 'number' },
  { type: 'number', name: 'HER2 Score', id: 'her2_score', input: 'text' },
  { type: 'number', name: 'ki67', id: 'ki67_score', input: 'text' },
  { type: 'boolean', name: 'Recurance Yes or No', id: 'rlps_yn' },
  { type: 'number', name: 'ER Test', id: 'er_score', input: 'number' },
  { type: 'number', name: 'PR Test', id: 'pr_score', input: 'number' }
];

const filterChoicesCustomKorean = [
  { type: 'static', name: '성별', id: 'sex_cd', options: ['Male', 'Female'] },
  {
    type: 'number',
    name: '진단 시 나이',
    id: 'diag_age',
    input: 'number'
  },
  { type: 'number', id: 'bmi_vl', name: '체질량지수(BMI)', input: 'number' },
  {
    type: 'boolean',
    id: 'bila_cncr_yn',
    name: '양측성 유방암 여부'
  },
  { type: 'boolean', name: '흡연 정보', id: 'smok_yn' },
  { type: 'boolean', name: '음주 정보', id: 'drnk_yn', value: 'Yes' },
  {
    type: 'boolean',
    name: '유방암 가족력',
    id: 'fmhs_brst_yn',
    value: 'Yes'
  },
  { type: 'number', name: '초경 나이', id: 'mena_age', input: 'number' },
  { type: 'boolean', name: '폐경 여부', id: 'meno_yn' },
  { type: 'boolean', name: '출산 여부', id: 'delv_yn' },
  { type: 'boolean', name: '모유수유경험 유무', id: 'feed_yn' },
  {
    type: 'number',
    name: '수유기간',
    id: 'feed_drtn_mnth',
    input: 'number'
  },
  { type: 'boolean', name: '경구피임약 사용 유무', id: 'oc_yn' },
  { type: 'boolean', name: '호르몬대체요법(HRT) 유무', id: 'hrt_yn' },
  { type: 'number', name: 'T Stage', id: 't_category', input: 'number' },
  { type: 'number', name: 'N Category', id: 'n_category', input: 'number' },
  { type: 'number', name: 'HER2 점수', id: 'her2_score', input: 'text' },
  { type: 'number', name: '세포증식지수(Ki-67)', id: 'ki67_score', input: 'text' },
  { type: 'boolean', name: '재발 유무', id: 'rlps_yn' },
  { type: 'number', name: 'ER 검사 결과', id: 'er_score', input: 'number' },
  { type: 'number', name: 'PR 검사 결과', id: 'pr_score', input: 'number' }
];

let preDefienedGroups = {
  diag_age: [
    { label: '21-35', from: 21, to: 35 },
    { label: '35-40', from: 35, to: 40 }
  ],
  bmi_vl: [
    { label: '18.5~24.9', from: 18.5, to: 24.9 },
    { label: '25-', from: 25, to: 100 }
  ],
  mena_age: [
    { label: '10-13', from: 10, to: 13 },
    { label: '14-17', from: 14, to: 17 }
  ],
  feed_drtn_mnth: [
    { label: '> 1 Year', from: 12, to: 24 },
    { label: '1year ≤', from: 1, to: 11 }
  ],
  t_category: [
    { label: 'Tis-T2', from: 'Tis', to: 'T2' },
    { label: 'T3-T4', from: 'T3', to: 'T4' }
  ],
  n_category: [
    { label: 'Nx-N2', from: 'Nx', to: 'N2' },
    { label: 'N3', from: 'N3', to: 'N3' }
  ],
  her2_score: [
    {
      label: 'negative(0-1+)',
      from: 'negative(0, 0~1, 1+)',
      to: 'negative(0, 0~1, 1+)',
      value: 'negative(0, 0~1, 1+)'
    },
    {
      label: 'positive(2+-3+)',
      from: 'positive(2+,3+)',
      to: 'positive(2+,3+)',
      value: 'positive(2+,3+)'
    }
  ],
  pr_score: [
    { label: 'Positive', from: 0, to: 1 },
    { label: 'Negative', from: 1, to: 2 }
  ],
  er_score: [
    { label: 'Positive', from: 0, to: 1 },
    { label: 'Negative', from: 1, to: 2 }
  ],
  ki67_score: [
    { label: 'low(≤15%)', from: 'Positive 0%', to: 'Positive 15%' },
    {
      label: 'intermediate, high(15%<)',
      from: 'Positive 15%',
      to: 'Positive 100%'
    }
  ],
  smok_yn: [
    { label: 'No', value: 'smok_yn||N' },
    { label: 'Yes', value: 'smok_yn||Y' }
  ]
};



export const PreDefienedFilters = ({ parentCallback, groupFilters, viz_type, resetFiltersData }) => {
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState({});
  const [filterGroupsHtml, setFilterGroupsHtml] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectDefaultValue, setSelectDefaultValue] = useState('-1');

  const preDefienedGroups1 = {
    diag_age: [
      { label: '21-35', from: 21, to: 35 },
      { label: '36-40', from: 36, to: 40 }
    ],
    bmi_vl: [
      { label: '18.5~24.9', from: 18.5, to: 24.9 },
      { label: '25-100', from: 25, to: 100 }
    ],
    mena_age: [
      { label: '10-13', from: 10, to: 13 },
      { label: '14-17', from: 14, to: 17 }
    ],
    feed_drtn_mnth: [
      { label: '> 1 Year', from: 12, to: 24 },
      { label: '1year ≤', from: 1, to: 11 }
    ],
    t_category: [
      { label: 'Tis-T2', from: 'Tis', to: 'T2' },
      { label: 'T3-T4', from: 'T3', to: 'T4' }
    ],
    n_category: [
      { label: 'Nx-N2', from: 'Nx', to: 'N2' },
      { label: 'N3', from: 'N3', to: '' }
    ],
    pr_score: [
      { label: 'Positive', from: 0, to: 1 },
      { label: 'Negative', from: 1, to: 2 }
    ],
    er_score: [
      { label: 'Positive', from: 0, to: 1 },
      { label: 'Negative', from: 1, to: 2 }
    ],
    ki67_score: [
      { label: 'low(≤15%)', from: '0', to: '15' },
      { label: 'intermediate, high(15%<)', from: '15', to: '100' }
    ],
    smok_yn: [
      { label: 'No', value: 'smok_yn||N' },
      { label: 'Yes', value: 'smok_yn||Y' }
      // { label: "Current Smoking", value: "smok_curr_yn||Y" }
    ]

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

  if (viz_type === 'volcono') {
    preDefienedGroups1['her2_score'] = [
      {
        label: 'negative(0-1+)',
        from: 'negative(0-1+)',
        to: 'negative(0, 0~1, 1+)',
        value: 'negative(0-1+)'
      },
      {
        label: 'positive(2+-3+)',
        from: 'positive(2+-3+)',
        to: 'positive(2+,3+)',
        value: 'positive(2+-3+)'
      }
    ]
  }
  else if (viz_type === 'fusion') {
    preDefienedGroups1['her2_score'] = [
      {
        label: 'negative (0-2+)',
        from: 'negative (0-2+)',
        to: 'negative (0-2+)',
        value: 'negative(0-1+)'
      },
      {
        label: 'positive (3+)',
        from: 'positive (3+)',
        to: 'positive (3+)',
        value: 'positive (3+)'
      }
    ]
  }


  useEffect(() => {
    if (context['locale'] === 'kr-KO') {
      setKoreanlanguage(true);
    } else {
      setKoreanlanguage(false);
    }
  }, [context]);

  useEffect(() => {
    if (groupFilters && groupFilters.type) {
      setSelectDefaultValue(groupFilters.index)
      let colName = groupFilters['column'];
      let filterGroupsHtmlTemp = [];
      if (groupFilters.type === 'boolean') {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Yes</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">No</h5>
            </div>
          </div>
        );
      }

      if (groupFilters.type === 'static') {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Male</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="P4 xs:text-xl">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">Female</h5>
            </div>
          </div>
        );
      }

      if (groupFilters.type === 'text') {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">{preDefienedGroups1[colName][0]['label']}</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">{preDefienedGroups1[colName][1]['label']}</h5>
            </div>
          </div>
        );
      }
      if (groupFilters.type === 'number') {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">{preDefienedGroups1[colName][0]['label']}</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">{preDefienedGroups1[colName][1]['label']}</h5>
            </div>
          </div>
        );
      }
      setFilterGroupsHtml(filterGroupsHtmlTemp);
    }
  }, [groupFilters]);

  useEffect(() => {
    let filterGroupsHtmlTemp = [];
    if (selectedFilterType && selectedFilterType.details) {
      if (selectedFilterType.details.type === 'boolean') {
        setFilters({
          group_a: true,
          group_b: false,
          column: selectedFilterType.details.id,
          type: 'boolean',
          index: selectedFilterType.index
        });
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Yes</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">No</h5>
            </div>
          </div>
        );
      }

      if (selectedFilterType.details.type === 'static') {
        setFilters({
          group_a: 'F',
          group_b: 'M',
          column: selectedFilterType.details.id,
          type: 'static',
          index: selectedFilterType.index
        });
        filterGroupsHtmlTemp.push(
          <div key="gender">
            <div className="flex Border mb-1 flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Male</h5>
            </div>
            <div className="flex Border mb-1 flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">Female</h5>
            </div>
          </div>
        );
      }

      if (
        selectedFilterType.details.type === 'number' ||
        selectedFilterType.details.type === 'text'
      ) {
        const colName = selectedFilterType.details.id;

        let t = preDefienedGroups1[colName];
        let tmp = { column: colName, type: selectedFilterType.details.type, index: selectedFilterType.index };

        for (let index = 0; index < t.length; index++) {
          const element = t[index];
          let indx = index + 1;
          filterGroupsHtmlTemp.push(
            <div key={'drop-user-' + index}>
              <div className="flex flex-row JustifyCenter gap10px">
                <h5 className="TextBase MarginTop2">Group {indx}: </h5>
                <h5 className="TextBase MarginTop2">{element.label}</h5>
              </div>
            </div>
          );
          tmp[indx + '_from'] = element.from;
          tmp[indx + '_to'] = element.to;
        }

        setFilters(tmp);
      }

      setFilterGroupsHtml(filterGroupsHtmlTemp);
    }
  }, [selectedFilterType]);

  const filterTypeDropdownSelection = (event) => {
    const key = event.target.value;
    if (key !== "-1") {
      setSelectedFilterType({
        details: koreanlanguage
          ? filterChoicesCustomKorean[parseInt(key)]
          : filterChoicesCustom[parseInt(key)],
        index: key,
      });
    } else {
      setSelectedFilterType({});
    }

    setSelectDefaultValue(key)
  };

  const submitFilters = () => {
    if (Object.keys(filters).length > 0) {
      parentCallback(filters);
    } else {
      parentCallback(groupFilters);
    }
  };

  const resetFilters = () => {
    setSelectDefaultValue('-1')
    setSelectedFilterType({});
    setFilterGroupsHtml([]);
    setFilters({});
    resetFiltersData()
  };




  return (
    <div className="M1 PY3 PX2 BGGray100">
      <div className="P1 PY3 PX2 ColSpan2">
        <div className="Block  TextBase  FontBold MB2 TextLeft">
          <FormattedMessage id="Clinical Filters" defaultMessage="Clinical Attribute" />
        </div>
        <select
          onChange={filterTypeDropdownSelection}
          value={selectDefaultValue}
          className="WFull lg:P4 xs:p-2 Border lg:text-xl xs:text-sm focus:outline-none Border-b-color focus:ring focus:Border-b-color active:Border-b-color mt-3"
        >
          <option value="-1"></option>

          {koreanlanguage
            ? filterChoicesCustomKorean.map((type, index) => (
              <option className="FilterOptionText" key={type.name} value={index}>
                {type.name}
              </option>
            ))
            : filterChoicesCustom.map((type, index) => (
              <option className="FilterOptionText" key={type.name} value={index}>
                {type.name}
              </option>
            ))}
        </select>
        <h6 className="Border P4">
          {filterChoicesCustom.forEach((e) => {
            if (groupFilters.column === e.id) {
              return e.name;
            }
          })}
        </h6>
      </div>
      <div className="P1 PY3 PX2 ColSpan2">{filterGroupsHtml}</div>
      <div className="FilterGeneSet">
        <div className="P1 PY3 PX2 W50">
          <button
            onClick={submitFilters}
            className="FilterLabelText FilterButton"
            style={{ backgroundColor: 'rgb(0, 159, 226)', border: '1px solid white' }}
          >
            <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
          </button>
        </div>
        <div className="P1 PY3 PX2 W50">
          <button onClick={resetFilters} className="FilterLabelText FilterButton">
            <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const PreDefienedFiltersSurvival = ({
  parentCallback, groupFilters, resetFiltersData
}) => {
  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [Englishlanguage, setEnglishlanguage] = useState(true);
  const [selectedFilterType, setSelectedFilterType] = useState({});
  const [filterGroupsHtml, setFilterGroupsHtml] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectDefaultValue, setSelectDefaultValue] = useState('-1');

  let preDefienedGroups1 = {
    diag_age: [
      { label: '21-25', from: 21, to: 25 },
      { label: '26-30', from: 26, to: 30 },
      { label: '31-35', from: 31, to: 35 },
      { label: '36-40', from: 36, to: 40 }
    ],
    bmi_vl: [
      { label: '<18.5', from: 0, to: 18.5 },
      { label: '18.6-24.9', from: 18.6, to: 25 },
      { label: '25.0-29.9', from: 25.1, to: 30 },
      { label: '30.0≤', from: 30.1, to: 100 }
    ],
    mena_age: [
      { label: '10-13', from: 10, to: 13 },
      { label: '14-17', from: 14, to: 17 }
    ],
    feed_drtn_mnth: [
      { label: '< 1year', from: 1, to: 11 },
      { label: '1year ≤', from: 12, to: 24 }
    ],
    t_category: [
      { label: 'Tis', from: 'Tis', to: 'Tis' },
      { label: 'T1', from: 'T1', to: 'T1' },
      { label: 'T2', from: 'T2', to: 'T2' },
      { label: 'T3', from: 'T3', to: 'T3' },
      { label: 'T4', from: 'T4', to: 'T4' }
    ],
    n_category: [
      { label: 'Nx', from: 'Nx', to: 'Nx' },
      { label: 'N0', from: 'N0', to: 'N0' },
      { label: 'N1', from: 'N1', to: 'N1' },
      { label: 'N2', from: 'N2', to: 'N2' },
      { label: 'N3', from: 'N3', to: 'N3' }
    ],
    her2_score: [
      {
        from: 'negative (0-1+)',
        to: 'negative (0-1+)',
        label: 'negative (0-1+)',
        value: 'negative (0-1+)'
      },
      {
        from: 'equivocal (2+)',
        to: 'equivocal (2+)',
        label: 'equivocal (2+)',
        value: 'equivocal (2+)'
      },
      {
        from: 'positive (3+)',
        to: 'positive (3+)',
        label: 'positive (3+)',
        value: 'positive (3+)'
      }
    ],
    pr_score: [
      { label: 'Positive', from: 1, to: 1 },
      { label: 'Negative', from: 2, to: 2 }
    ],
    er_score: [
      { label: 'Positive', from: 1, to: 1 },
      { label: 'Negative', from: 2, to: 2 }
    ],
    ki67_score: [
      { label: 'low(≤15%)', value: 'low(≤15%)', from: 'low', to: 'low' },
      {
        label: 'intermediate(<15-30%≤)',
        value: 'intermediate(<15-30%≤)',
        from: 'intermediate',
        to: 'intermediate'
      },
      {
        label: 'high(30%<)',
        value: 'high(30%<)',
        from: 'high',
        to: 'high'
      }
    ],
    smok_yn: [
      { label: 'No Smoking', value: 'no' },
      { label: 'Past Smoking', value: 'past' },
      { label: 'Current Smoking', value: 'current' }
    ]
  };


  useEffect(() => {
    if (context['locale'] === 'kr-KO') {
      setKoreanlanguage(true);
      setEnglishlanguage(false);
    } else {
      setKoreanlanguage(false);
      setEnglishlanguage(true);
    }
  }, [context]);

  useEffect(() => {
    if (groupFilters && groupFilters.type) {
      setSelectDefaultValue(groupFilters.index)
      let colName = groupFilters['column'];
      let filterGroupsHtmlTemp = [];
      if (groupFilters.type === 'boolean') {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Yes</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">No</h5>
            </div>
          </div>
        );
      }
      else if (groupFilters.type === 'static') {
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Male</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="P4 xs:text-xl">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">Female</h5>
            </div>
          </div>
        );
      }
      else if (groupFilters.type === 'number' || groupFilters.type === 'text') {
        filterGroupsHtmlTemp.push(
          <div key="drop-user">
            {preDefienedGroups1[colName].map((element, index) => (
              <div className="TextLG" key={`${element.label}-${index}-grp-a`}>
                <div className="flex flex-row JustifyCenter gap10px">
                  <h5 className="TextBase MarginTop2">
                    Group {index + 1} : {element.label}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        );
      }

      setFilterGroupsHtml(filterGroupsHtmlTemp);
    }
  }, [groupFilters]);

  useEffect(() => {
    let filterGroupsHtmlTemp = [];
    if (selectedFilterType && selectedFilterType.details) {
      if (selectedFilterType.details.type === 'boolean') {
        setFilters({
          group_a: true,
          group_b: false,
          column: selectedFilterType.details.id,
          type: 'boolean',
          index: selectedFilterType.index

        });
        filterGroupsHtmlTemp.push(
          <div key="bool">
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Yes</h5>
            </div>
            <div className="flex flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">No</h5>
            </div>
          </div>
        );
      }
      else if (selectedFilterType.details.type === 'static') {
        setFilters({
          group_a: 'F',
          group_b: 'M',
          column: selectedFilterType.details.id,
          type: 'static',
          index: selectedFilterType.index
        });
        filterGroupsHtmlTemp.push(
          <div key="gender">
            <div className="flex Border mb-1 flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 1 : </h5>
              <h5 className="TextBase MarginTop2">Male</h5>
            </div>
            <div className="flex Border mb-1 flex-row JustifyCenter gap10px">
              <h5 className="TextBase MarginTop2">Group 2 : </h5>
              <h5 className="TextBase MarginTop2">Female</h5>
            </div>
          </div>
        );
      }
      else if (selectedFilterType.details.type === 'number' || selectedFilterType.details.type === 'text') {
        const colName = selectedFilterType.details.id;
        let filtersTemp = {
          type: selectedFilterType.details.type,
          column: colName,
          index: selectedFilterType.index
        };

        preDefienedGroups1[colName].forEach((e, index) => {
          filtersTemp = {
            ...filtersTemp,
            [`${index + 1}_from`]: e.from,
            [`${index + 1}_to`]: e.to
          };
        });
        setFilters(filtersTemp);

        filterGroupsHtmlTemp.push(
          <div key="drop-user">
            {preDefienedGroups1[colName].map((element, index) => (
              <div className="TextLG" key={`${element.label}-${index}-grp-a`}>
                <div className="flex flex-row JustifyCenter gap10px">
                  <h5 className="TextBase MarginTop2">
                    Group {index + 1} : {element.label}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        );
      }
      setFilterGroupsHtml(filterGroupsHtmlTemp);
    }
  }, [selectedFilterType]);

  const filterTypeDropdownSelection = (event) => {
    const key = event.target.value;
    if (key !== "-1") {
      setSelectedFilterType({
        details: koreanlanguage
          ? filterChoicesCustomKorean[parseInt(key)]
          : filterChoicesCustom[parseInt(key)],
        index: key,
      });
    } else {
      setSelectedFilterType({});
    }
    setSelectDefaultValue(key)
  };

  const submitFilters = () => {
    if (Object.keys(filters).length > 0) {
      parentCallback(filters);
    } else {
      parentCallback(groupFilters);
    }
  };

  const resetFilters = () => {
    setSelectDefaultValue('-1')
    setSelectedFilterType({});
    setFilterGroupsHtml([]);
    setFilters({});
    resetFiltersData()
  };



  return (
    <div className="m-1 PY3 PX2 BGGray100">
      <div className="P1 PY3 PX2 ColSpan2">
        <div className="Block  TextBlue700 TextLG  FontBold MB2 TextLeft">
          <FormattedMessage id="Clinical Filters" defaultMessage="Clinical Attribute" />
        </div>
        <select
          onChange={filterTypeDropdownSelection}
          value={selectDefaultValue}
          className="WFull lg:P4 xs:p-2 Border lg:text-xl xs:text-sm focus:outline-none Border-b-color focus:ring focus:Border-b-color active:Border-b-color mt-3"
        >
          <option value="-1"></option>

          {Englishlanguage &&
            filterChoicesCustom.map((type, index) => (
              <option className="TextBase" key={type.name} value={index}>
                {type.name}
              </option>
            ))}
          {koreanlanguage &&
            filterChoicesCustomKorean.map((type, index) => (
              <option className="TextBase" key={type.name} value={index}>
                {type.name}
              </option>
            ))}
        </select>
      </div>


      <div className="P1 PY3 PX2 ColSpan2">{filterGroupsHtml}</div>

      <div className="FilterGeneSet">
        <div className="P1 PY3 PX2 W50">
          <button
            onClick={() => submitFilters()}
            className="FilterLabelText FilterButton"
            style={{ backgroundColor: 'rgb(0, 159, 226)', border: '1px solid white' }}
          >
            <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
          </button>
        </div>
        <div className="P1 PY3 PX2 W50">
          <button onClick={() => resetFilters()} className="FilterLabelText FilterButton">
            <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
          </button>
        </div>
      </div>
    </div>
  );
};


export const GroupFilters = ({
  viz_type,
  groupFilters,
  parentCallback,
  resetFiltersData
}) => {
  const clinicalMaxMinInfo = useSelector(
    (data) => data.dataVisualizationReducer.clinicalMaxMinInfo
  );

  const context = useContext(Context);
  const [koreanlanguage, setKoreanlanguage] = useState(false);
  const [selectedFilterDetails, setSelectedFilterDetails] = useState({});
  const [filterInputs, setFilterInputs] = useState([]);
  const [userGivenInputValues, setUserGivenInputValues] = useState({});
  const [showAddGroupButton, setShowAddGroupButton] = useState(false);
  const [groupsCounter, setGroupsCounter] = useState(1);
  const [inputType, setInputType] = useState('');
  const [multipleInputs, setMultipleInputs] = useState({});
  const [selectDefaultValue, setSelectDefaultValue] = useState('-1');

  let preDefienedGroups1 = preDefienedGroups;

  useEffect(() => {
    if (context['locale'] === 'kr-KO') {
      setKoreanlanguage(true);
    } else {
      setKoreanlanguage(false);
    }
  }, [context]);


  if (viz_type === 'volcono' || viz_type === 'survival' || viz_type === 'fusion') {
    if (koreanlanguage) {
      filterChoices = [
        {
          type: 'number',
          id: 'bmi_vl',
          name: '체질량지수(BMI)',
          input: 'number'
        },
        {
          type: 'number',
          name: '진단 시 나이',
          id: 'diag_age',
          input: 'number'
        },
        { type: 'dropdown', name: '흡연 정보', id: 'smok_yn' },
        {
          type: 'number',
          name: '초경 나이',
          id: 'mena_age',
          input: 'number'
        },
        {
          type: 'number',
          name: '수유기간',
          id: 'feed_drtn_mnth',
          input: 'number'
        },
        {
          type: 'dropdown',
          name: 'T Stage',
          id: 't_category',
          input: 'number'
        },
        {
          type: 'dropdown',
          name: 'N Stage',
          id: 'n_category',
          input: 'number'
        },
        {
          type: 'dropdown',
          name: 'HER2 점수',
          id: 'her2_score',
          input: 'number'
        },
        { type: 'dropdown', name: '세포증식지수(Ki-67)', id: 'ki67_score', input: 'number' }
      ];
    }
    else {
      filterChoices = [
        {
          type: 'number',
          id: 'bmi_vl',
          name: 'Body Mass Index',
          input: 'number'
        },
        {
          type: 'number',
          name: 'Age Of Diagnosis',
          id: 'diag_age',
          input: 'number'
        },
        { type: 'dropdown', name: 'Smoking Status', id: 'smok_yn' },
        {
          type: 'number',
          name: 'First Menstural Age',
          id: 'mena_age',
          input: 'number'
        },
        {
          type: 'number',
          name: 'Duration of Breastfeeding(month)',
          id: 'feed_drtn_mnth',
          input: 'number'
        },
        {
          type: 'dropdown',
          name: 'T Category',
          id: 't_category',
          input: 'number'
        },
        {
          type: 'dropdown',
          name: 'N Category',
          id: 'n_category',
          input: 'number'
        },
        {
          type: 'dropdown',
          name: 'HER2 Score',
          id: 'her2_score',
          input: 'number'
        },
        { type: 'dropdown', name: 'ki67', id: 'ki67_score', input: 'number' }
      ];
    }

    if (koreanlanguage) {
      preDefienedGroups1['smok_yn'] = [
        { label: '비흡연자', value: 'smok_yn||N' },
        { label: '과거 흡연자', value: 'smok_yn||Y' },
        { label: '현재 흡연자', value: 'smok_curr_yn||Y' }
      ];
    }
    else {
      preDefienedGroups1['smok_yn'] = [
        { label: 'No Smoking', value: 'smok_yn||N' },
        { label: 'Past Smoking', value: 'smok_yn||Y' },
        { label: 'Current Smoking', value: 'smok_curr_yn||Y' }
      ];
    }

    preDefienedGroups1['t_category'] = [
      { label: 'Tis', from: 'Tis', to: 'Tis', value: 'Tis' },
      { label: 'T1', from: 'T1', to: 'T1', value: 'T1' },
      { label: 'T2', from: 'T2', to: 'T2', value: 'T2' },
      { label: 'T3', from: 'T3', to: 'T3', value: 'T3' },
      { label: 'T4', from: 'T4', to: 'T4', value: 'T4' }
    ];
    preDefienedGroups1['n_category'] = [
      { label: 'Nx', from: 'Nx', to: 'Nx', value: 'Nx' },
      { label: 'N0', from: 'N0', to: 'N0', value: 'N0' },
      { label: 'N1', from: 'N1', to: 'N1', value: 'N1' },
      { label: 'N2', from: 'N2', to: 'N2', value: 'N2' },
      { label: 'N3', from: 'N3', to: 'N3', value: 'N3' }
    ];
    preDefienedGroups1['her2_score'] = [
      {
        value: 'negative (0-1+)',
        label: 'negative (0-1+)',
        from: '0',
        to: '(0-1+)'
      },
      {
        value: 'equivocal (2+)',
        label: 'equivocal (2+)',
        from: '2',
        to: '(2+)'
      },
      {
        value: 'positive (3+)',
        label: 'positive (3+)',
        from: '2+',
        to: '(3+)'
      }
    ];

    preDefienedGroups1['ki67_score'] = [
      { label: 'low(≤15%)', value: 'low', from: '0', to: '15' },
      {
        label: 'intermediate(<15-30%≤)',
        value: 'intermediate',
        from: '15',
        to: '30'
      },
      { label: 'high(30%<)', value: 'high', from: '30', to: '100' }
    ];
  }

  useEffect(() => {
    let filterType = ''
    if (groupFilters && Object.keys(groupFilters).length > 0) {
      setUserGivenInputValues(groupFilters);
      let targetNumber = 0;
      filterChoices.forEach((e, index) => {
        if (e.id === groupFilters.column) {
          targetNumber = index;
          filterType = e.type
        }
      });
      if (filterType === 'number') {
        const maxNumber = Object.entries(groupFilters).reduce((max, [key]) => {
          if (key.endsWith("_from") || key.endsWith("_to")) {
            const number = parseInt(key.replace("_from", "").replace("_to", ""));
            return (!isNaN(number) && number > max) ? number : max;
          }
          return max;
        }, 1); // Set default maximum to 1
        setGroupsCounter(maxNumber)
      }
      else {
        setMultipleInputs(groupFilters);

      }
      setSelectDefaultValue(String(targetNumber));

      filterChoices && setSelectedFilterDetails(filterChoices[targetNumber]);
    }
  }, []);

  useEffect(() => {
    if (selectedFilterDetails && 'type' in selectedFilterDetails && 'id' in selectedFilterDetails) {
      let filterType = selectedFilterDetails.type;
      let colName = selectedFilterDetails.id;
      let booleanType;
      let booleanColumns = []
      if (booleanColumns.length > 0) {
        booleanType = booleanColumns.includes(selectedFilterDetails['name']) ? 'yes' : 'no';
      }
      if (filterType) {
        let componentData = [];

        if (filterType === 'boolean' || filterType === 'static' || booleanType === 'yes') {
          setShowAddGroupButton(false);
          let options = ['Yes', 'No'];
          if (filterType === 'static') {
            options = [selectedFilterDetails.options[0], selectedFilterDetails.options[1]];
            setUserGivenInputValues({
              group_a: 'M',
              group_b: 'F',
              column: selectedFilterDetails.id,
              type: filterType
            });
          } else {
            setUserGivenInputValues({
              group_a: true,
              group_b: false,
              column: selectedFilterDetails.id,
              type: 'boolean'
            });
          }
          componentData = [componetSwitch({ compCase: 'static', groupLabels: options })];
        }

        else if (filterType === 'number') {
          if (viz_type !== 'volcono') {
            setShowAddGroupButton(true);
          }
          setUserGivenInputValues({
            column: selectedFilterDetails.id,
            type: filterType
          });
          const upperLimit = viz_type !== 'volcono' ? groupsCounter : 2;
          for (let i = 1; i <= upperLimit; i++) {
            componentData.push(componetSwitch({ compCase: 'number', groupNumber: i }));
          }
        }

        else if (filterType === 'text') {
          setShowAddGroupButton(true);
          setUserGivenInputValues({
            column: selectedFilterDetails.id,
            type: selectedFilterDetails.type
          });
          componentData.push(componetSwitch({ compCase: 'text' }));
        }

        else if (filterType === 'dropdown') {
          let tr = [];
          setShowAddGroupButton(false);
          if (viz_type === 'volcono') {
            if (
              Object.keys(userGivenInputValues).length > 0 &&
              userGivenInputValues['type'] === 'static') {
              if (
                'group_a' in userGivenInputValues && userGivenInputValues['group_a'].length > 0 &&
                'group_b' in userGivenInputValues && userGivenInputValues['group_b'].length > 0
              ) {
                preDefienedGroups1[colName].forEach((element, index) => {
                  let group_a = false;
                  let group_b = false;
                  if (userGivenInputValues['group_a'].indexOf(element.value) > -1) {
                    group_a = true;
                  }
                  if (userGivenInputValues['group_b'].indexOf(element.value) > -1) {
                    group_b = true;
                  }
                  tr.push(
                    <tr key={colName + index} className="Border-b">
                      <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          defaultChecked={group_a}
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: 'group_a'
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
                            group: 'group_b'
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
                  <tr key={colName + index} className="Border-b">
                    <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                    <td className="PX6Y4">
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: index,
                          colName: colName,
                          group: 'group_a'
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
                          group: 'group_b'
                        })}
                      />
                    </td>
                  </tr>
                )
              );
            }
            componentData.push(
              <table className="table" key={'group_table'}>
                <thead className="Border-b WFull" key={'group_thead'}>
                  <tr>
                    <th></th>
                    <th className="GroupNamesFilter PX6Y4">Group A</th>
                    <th className="GroupNamesFilter PX6Y4">Group B</th>
                  </tr>
                </thead>
                <tbody key={'group_tbody'}>{tr}</tbody>
              </table>
            );
          }
          else if (viz_type === 'survival') {
            let d = preDefienedGroups1[colName];
            let thead = [];
            let boxes = d.length;
            for (let sv = 0; sv < d.length; sv++) {
              const element = d[sv];
              thead.push(
                <th key={sv} className="GroupNamesFilter PX6Y4 ">
                  Group {abc[sv]}:
                </th>
              );
              let checkbox = [];
              let group_i = 0;

              for (let index = 0; index < boxes; index++) {
                let name = 'group_' + abc[index] + '_' + element.value;
                if (Object.keys(userGivenInputValues).length > 0) {
                  let group_check = false;
                  if (
                    'group_' + abc[index] in userGivenInputValues &&
                    userGivenInputValues['group_' + abc[index]].length > 0
                  ) {
                    if (userGivenInputValues['group_' + abc[index]].indexOf(element.value) > -1) {
                      let gi_val = userGivenInputValues['group_' + abc[index]];
                      for (let gi = 0; gi < gi_val.length; gi++) {
                        let n = gi_val[gi];
                        if ('group_' + abc[index] + '_' + n === name) {
                          group_check = true;
                          break;
                        }
                      }
                    }
                  }
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        data-type={element.label}
                        data-name={abc[index]}
                        type="checkbox"
                        defaultChecked={group_check}
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                  group_i = group_i + 1;
                } else {
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                }
              }
              tr.push(
                <tr key={colName + sv} className="Border-b">
                  <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                  {checkbox}
                </tr>
              );
            }
            componentData.push(
              <table className="table" key={'group_table'}>
                <thead className="Border-b WFull" key={'group_thead'}>
                  <tr>
                    <th></th>
                    {thead}
                  </tr>
                </thead>
                <tbody key={'group_tbody'}>{tr}</tbody>
              </table>
            );
          }
          else if (viz_type === 'fusion') {
            let d = preDefienedGroups1[colName];
            let thead = [];

            for (let sv = 0; sv < 3; sv++) {
              const element = d[sv];
              thead.push(
                <th key={sv} className="GroupNamesFilter PX6Y4 ">
                  Group {abc[sv]}:
                </th>
              );
              let checkbox = [];
              let group_i = 0;

              for (let index = 0; index < 3; index++) {
                let name = 'group_' + abc[index] + '_' + element.value;
                if (Object.keys(userGivenInputValues).length > 0 && Object.keys(userGivenInputValues).some(key => ['group_a', 'group_b', 'group_c'].includes(key))) {
                  let group_check = false;
                  if (
                    'group_' + abc[index] in userGivenInputValues &&
                    userGivenInputValues['group_' + abc[index]].length > 0
                  ) {
                    if (userGivenInputValues['group_' + abc[index]].indexOf(element.value) > -1) {
                      let gi_val = userGivenInputValues['group_' + abc[index]];
                      for (let gi = 0; gi < gi_val.length; gi++) {
                        let n = gi_val[gi];
                        if ('group_' + abc[index] + '_' + n === name) {
                          group_check = true;
                          // break;
                        }
                      }
                    }
                  }
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        data-type={element.label}
                        data-name={abc[index]}
                        type="checkbox"
                        defaultChecked={group_check}
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                  group_i = group_i + 1;
                } else {
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                }
              }
              tr.push(
                <tr key={colName + sv} className="Border-b">
                  <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                  {checkbox}
                </tr>
              );
            }
            componentData.push(
              <table className="table" key={'group_table'}>
                <thead className="Border-b WFull" key={'group_thead'}>
                  <tr>
                    <th></th>
                    {thead}
                  </tr>
                </thead>
                <tbody key={'group_tbody'}>{tr}</tbody>
              </table>
            );
          }
        }

        setFilterInputs(componentData);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
    else {
      setFilterInputs([])
    }
  }, [selectedFilterDetails]);

  const updateSelectedFilter = (e) => {
    setGroupsCounter(1);
    setMultipleInputs({});
    setUserGivenInputValues((prevState) => ({
      column: undefined,
      type: undefined,
    }));
    const targetValue = e.target.value;
    if (targetValue !== '-1') {
      setInputType(filterChoices[parseInt(targetValue)]['type'])
      setSelectDefaultValue(String(targetValue));
      setSelectedFilterDetails(filterChoices[parseInt(targetValue)]);
    }
    else {
      setSelectedFilterDetails({});
      setInputType('')
      setSelectDefaultValue('-1');
    }
  };


  const onChangeFilterInput = (e) => {
    if (e.target.type === 'number') {
      let id = e.target.name;
      let ids = id.split('_');
      let one_to_0, one_to, one_max_value, one_from_0, one_from, one_min_value;
      if (ids.includes('from')) {
        one_from_0 = e.target;
        one_from = one_from_0 ? +one_from_0.value : +one_from_0.min;
        one_min_value = one_from_0 ? +one_from_0.min : 0;
        one_to_0 = one_from_0.nextSibling;
        one_to = one_to_0 ? +one_to_0.value : one_from_0.max;
        one_max_value = one_from_0 ? +one_from_0.max : 0;
      } else if (ids.includes('to')) {
        one_to_0 = e.target;
        one_to = one_to_0 ? +one_to_0.value : +one_to_0.max;
        one_max_value = one_to_0 ? +one_to_0.max : 0;
        one_from_0 = one_to_0.previousElementSibling;
        one_from = one_from_0 ? +one_from_0.value : one_from_0.min;
        one_min_value = one_from_0 ? +one_from_0.min : 0;
      }

      if (one_from > one_max_value || one_from < one_min_value || one_from > one_to) {
        one_from_0.classList.add('Border2');
        one_from_0.classList.add('BorderRed400');
        one_to_0.classList.add('Border2');
        one_to_0.classList.add('BorderRed400');
      } else if (one_to > one_max_value || one_to < one_min_value || one_to < one_from) {
        one_from_0.classList.add('Border2');
        one_from_0.classList.add('BorderRed400');
        one_to_0.classList.add('Border2');
        one_to_0.classList.add('BorderRed400');
      } else {
        one_from_0.classList.remove('Border2');
        one_from_0.classList.remove('BorderRed400');
        one_to_0.classList.remove('Border2');
        one_to_0.classList.remove('BorderRed400');
        setUserGivenInputValues((prevState) => ({
          ...prevState,
          [one_from_0.name]: one_from_0.value,
          [one_to_0.name]: one_to_0.value
        }));

      }
    } else {
      setUserGivenInputValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  };


  const componetSwitch = ({ compCase, groupLabels = null, groupNumber = null }) => {
    let max = 'to';
    let min = 'from';
    if (clinicalMaxMinInfo) {
      let clinicalMaxMinInfoData = clinicalMaxMinInfo['data'];
      let clinicalInfoId = selectedFilterDetails['id'];
      if (clinicalInfoId + '_min' in clinicalMaxMinInfoData) {
        min = clinicalMaxMinInfoData[clinicalInfoId + '_min'];
      }
      if (clinicalInfoId + '_max' in clinicalMaxMinInfoData) {
        max = clinicalMaxMinInfoData[clinicalInfoId + '_max'];
      }
    }
    switch (compCase) {
      case 'static':
        return (
          <div key={compCase} className="MarginBottom4">
            {['A Group', 'B Group'].map((e, index) => (
              <div key={index} className="Border MarginTop4 P1">
                <div
                  key={e}
                  className="Block  TextBlue700 TextLG  FontBold MB2 TextLeft"
                  htmlFor="yes"
                >
                  {e}
                </div>
                <h1 id="yes" className="MultiUploadTextCenter MarginTop2">
                  {groupLabels[index]}
                </h1>
              </div>
            ))}
          </div>
        );

      case 'number':
        return (
          <div key={`${compCase}-${groupNumber}${Math.random()}`} className="MarginBottom4">
            <div>
              <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
                {`Group ${groupNumber}`}
              </div>
              <div className='Flex'>
                <input
                  onChange={onChangeFilterInput}
                  className="NumberInputCss"
                  name={`${groupNumber}_from`}
                  type="number"
                  placeholder={min}
                  min={min}
                  max={max}
                  defaultValue={userGivenInputValues && userGivenInputValues[`${groupNumber}_from`] || ''}
                ></input>
                <input
                  onChange={onChangeFilterInput}
                  className="NumberInputCss"
                  name={`${groupNumber}_to`}
                  type="number"
                  placeholder={max}
                  min={min}
                  max={max}
                  defaultValue={userGivenInputValues && userGivenInputValues[`${groupNumber}_to`] || ''}
                ></input>
              </div>
            </div>
          </div>
        );
      case 'text':
        if (viz_type === 'volcono') {
          return (
            <div key={`${compCase}--${Math.random()}`}>
              <div key={`${compCase}-1-${Math.random()}`} className="MarginBottom4">
                <div>
                  <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
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
                  <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
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
            </div>
          );
        } else {
          return (
            <div key={`${compCase}-${groupsCounter}-${Math.random()}`} className="MarginBottom4">
              <div>
                <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
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
    const filterData = preDefienedGroups1[eventObject.colName][eventObject.index];
    let tmp = multipleInputs;
    if (eventObject.group in tmp) {
      tmp[eventObject.group].push(filterData.value);
    } else {
      tmp[eventObject.group] = [filterData.value];
    }

    let group = eventObject['group'];
    let value = filterData['value'];
    let shouldExist = event.target.checked;

    if (shouldExist === false) {
      event.target.checked = false;
      event.target.removeAttribute('checked');
      let newTmp = tmp[group].filter((e) => e !== value);
      if (newTmp.length > 0) {
        tmp[group] = newTmp;
      }
      else {
        delete tmp[group]
      }
    }
    setMultipleInputs(tmp);

    if ('value' in filterData) {
      setUserGivenInputValues((prevState) => ({
        ...prevState,
        [eventObject.group]: tmp[eventObject.group],
        column: selectedFilterDetails.id,
        type: 'static'
      }));
    }
  };

  const submitFilters = () => {

    const isVolcano = viz_type === 'volcono';
    const isFusion = viz_type === 'fusion';
    const isSurvival = viz_type === 'survival';

    let countNonEmptyGroupsWithPrefix = (prefix, payload) => {
      let count = 0;
      for (let key in payload) {
        if (key.startsWith(prefix) && Array.isArray(payload[key]) && payload[key].length > 0) {
          count++;
        }
      }
      return count;
    }

    if (userGivenInputValues && Object.keys(userGivenInputValues).length > 0) {
      let final_payload = { ...userGivenInputValues };
      if (isVolcano) {
        if (final_payload['type'] === 'static') {
          let groupKeys = Object.keys(final_payload).filter(key => key.startsWith('group_'));
          let totalGroups = groupKeys.length;
          let hasAtLeastTwoNonEmptyGroups = groupKeys.reduce((count, key) => {
            if (Array.isArray(final_payload[key]) && final_payload[key].length > 0) {
              return count + 1;
            }
            return count;
          }, 0) >= 2;
          let send_response = totalGroups >= 2 && hasAtLeastTwoNonEmptyGroups;
          if (send_response === true) {
            parentCallback(final_payload);
          }
        }
        else if (final_payload['type'] === 'boolean') {
          parentCallback(final_payload);
        }
        else {
          const inputs = [
            ...document.querySelectorAll('[name="1_from"]'),
            ...document.querySelectorAll('[name="1_to"]'),
            ...document.querySelectorAll('[name="2_from"]'),
            ...document.querySelectorAll('[name="2_to"]')
          ];

          let send_response = inputs.length > 0 && inputs.every(input =>
            !(input.classList && (input.classList.contains('Border2') || input.classList.contains('BorderRed400'))) && input.value !== '');

          if (send_response) {
            final_payload['1_from'] = Math.min(...inputs.filter(input => input.name === '1_from').map(input => +input.value));
            final_payload['1_to'] = Math.max(...inputs.filter(input => input.name === '1_to').map(input => +input.value));
            final_payload['2_from'] = Math.min(...inputs.filter(input => input.name === '2_from').map(input => +input.value));
            final_payload['2_to'] = Math.max(...inputs.filter(input => input.name === '2_to').map(input => +input.value));
          }
          if (send_response === true) {
            parentCallback(final_payload);
          }
        }
      }
      else {

        let send_response;
        if (final_payload['type'] === 'static') {

          if ((isSurvival && countNonEmptyGroupsWithPrefix('group_', final_payload) < 1) ||
            (isFusion && countNonEmptyGroupsWithPrefix('group_', final_payload) < 1)) {
            send_response = false;
          }
          else {
            send_response = true;
          }

          if (send_response === true) {
            setGroupsCounter(1);
            parentCallback(final_payload);
          }
        }
        else if (final_payload['type'] === 'boolean') {
          parentCallback(final_payload);
        }
        else {
          let minValues = Array(groupsCounter).fill(Number.MAX_VALUE);
          let maxValues = Array(groupsCounter).fill(Number.MIN_VALUE);
          for (let i = 1; i <= groupsCounter; i++) {
            const min_1_from = document.querySelectorAll(`[name="${i}_from"]`);
            const max_1_to = document.querySelectorAll(`[name="${i}_to"]`);
            let min_1_num, max_1_num;

            min_1_from.forEach((input) => {
              if (input) {
                const isValid = !(input.classList &&
                  (input.classList.contains('Border2') ||
                    input.classList.contains('BorderRed400'))) &&
                  input.value !== '';
                if (!isValid) {
                  send_response = false;
                } else {
                  send_response = true;
                  min_1_num = Math.min(min_1_num || +input.value, +input.value);
                }
              }
            });

            max_1_to.forEach((input) => {
              if (input) {
                const isValid = !(input.classList &&
                  (input.classList.contains('Border2') ||
                    input.classList.contains('BorderRed400'))) &&
                  input.value !== '';
                if (!isValid) {
                  send_response = false;
                } else {
                  send_response = true;
                  max_1_num = Math.max(max_1_num || +input.value, +input.value);
                }
              }
            });

            if (send_response === false) {
              break;
            }

            minValues[i] = min_1_num;
            maxValues[i] = max_1_num;
          }
          if (send_response === true) {
            for (let i = 1; i < groupsCounter; i++) {
              final_payload[`${i}_from`] = minValues[i];
              final_payload[`${i}_to`] = maxValues[i];
            }
            setGroupsCounter(1);
            parentCallback(final_payload);
          }

        }
      }
    }
  };


  const resetFilters = () => {
    setSelectDefaultValue('-1');
    setSelectedFilterDetails({});
    setFilterInputs([]);
    setUserGivenInputValues({});
    setShowAddGroupButton(false);
    setGroupsCounter(1);
    resetFiltersData();
  };


  const AppendNewGroup = () => {
    if (viz_type === 'fusion') {
      if (groupsCounter <= 3) {
        const filterType = selectedFilterDetails.type;
        const componentData = componetSwitch({ compCase: filterType, groupNumber: groupsCounter });
        setFilterInputs((prevState) => [...prevState, componentData]);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
    else if (viz_type === 'survival') {
      if (groupsCounter <= 5) {
        const filterType = selectedFilterDetails.type;
        const componentData = componetSwitch({ compCase: filterType, groupNumber: groupsCounter });
        setFilterInputs((prevState) => [...prevState, componentData]);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
    else {
      const filterType = selectedFilterDetails.type;
      const componentData = componetSwitch({ compCase: filterType, groupNumber: groupsCounter });
      setFilterInputs((prevState) => [...prevState, componentData]);
      setGroupsCounter((prevState) => prevState + 1);
    }
  };


  return (
    <div className="m-1 PY3 PX2  BGGray100">
      <div className="P1 PY3 PX2 ColSpan2">
        <div className="Block  TextBlue700 TextLG  FontBold MB2 TextLeft">
          <FormattedMessage id="Clinical Filters" defaultMessage="Clinical Attribute" />
        </div>
        <select
          value={selectDefaultValue}
          onChange={updateSelectedFilter}
          name="selectOptions"
          className="SelectDiv"
          id="ClinicalAttributeSelect"
        >
          <option value="-1"></option>
          {filterChoices.map((type, index) => (
            <option
              className="FilterOptionText"
              key={type.id}
              value={index}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
      {inputType && inputType === 'number' && (
        <p className="P1 PY3 PX2 TextBase TextLeft">
          Max and Min Values are based on Clinincal Information File
        </p>
      )}
      {showAddGroupButton && (
        <div onClick={AppendNewGroup} className="P1 PY3 PX2 ColSpan2">
          <button className="AddGroupButton">Add Group</button>
        </div>
      )}

      {<div className="P1 PY3 PX2 ColSpan2" style={{ overflowX: 'auto' }} id="UserInputs">
        {filterInputs}
      </div>}

      <div className="FilterGeneSet">
        <div className="P1 PY3 PX2 W50">
          <button
            onClick={submitFilters}
            className="FilterLabelText FilterButton"
            style={{ backgroundColor: 'rgb(0, 159, 226)', border: '1px solid white' }}
          >
            <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
          </button>
        </div>
        <div className="P1 PY3 PX2 W50">
          <button onClick={resetFilters} className="FilterLabelText FilterButton">
            <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
          </button>
        </div>
      </div>
    </div>
  );
};


export const UserDefinedGroupFilters = ({
  parentCallback,
  groupFilters,
  viz_type,
  resetFiltersData

}) => {
  const userDefinedFilter = useSelector((data) => data.dataVisualizationReducer.userDefinedFilter);

  const [selectedFilterDetails, setSelectedFilterDetails] = useState({});
  const [filterInputs, setFilterInputs] = useState([]);
  const [userGivenInputValues, setUserGivenInputValues] = useState({});
  const [showAddGroupButton, setShowAddGroupButton] = useState(false);
  const [groupsCounter, setGroupsCounter] = useState(1);
  const [inputType, setInputType] = useState('');
  const [multipleInputs, setMultipleInputs] = useState({});
  const [selectDefaultValue, setSelectDefaultValue] = useState('-1');


  const [clinicalMaxMinInfo, setClinicalMaxMinInfo] = useState({});
  const [preDefienedGroups1, setPreDefienedGroups1] = useState({});
  const [filterChoices, setFilterChoices] = useState([]);
  const [booleanColumns, setBooleanColumns] = useState([]);
  let { project_id } = useParams();


  useEffect(() => {
    if (userDefinedFilter && userDefinedFilter.filterJson && 'Clinical Information' in userDefinedFilter.filterJson) {
      const clinicalInfo = userDefinedFilter.filterJson['Clinical Information'];
      const minmax = {};
      const bool_cols = [];

      Object.keys(clinicalInfo).forEach((val) => {
        if (clinicalInfo[val].length === 1 && clinicalInfo[val][0].type === 'number') {
          const max = clinicalInfo[val][0].max;
          const min = clinicalInfo[val][0].min;
          minmax[`${val}_max`] = max;
          minmax[`${val}_min`] = min;
        }

        clinicalInfo[val].forEach((item) => {
          if ('id' in item) {
            const bool_include = item.id;
            if (bool_include.slice(-3) === 'yes' || bool_include.slice(-2) === 'no') {
              bool_cols.push(item.name);
            }
          }
        });
      });

      setClinicalMaxMinInfo(minmax);
      setBooleanColumns([...new Set(bool_cols)]);
    }
  }, [userDefinedFilter]);

  useEffect(() => {
    if (project_id !== undefined && userDefinedFilter && userDefinedFilter.filterJson && 'Clinical Information' in userDefinedFilter.filterJson) {
      const clinicalInfo = userDefinedFilter.filterJson['Clinical Information'];
      const preDefinedGroups1 = {};
      const filterChoices = [];

      for (const category of Object.values(clinicalInfo)) {
        for (const item of category) {
          if (item.type === 'number') {
            const d_obj = {
              type: 'number',
              id: item.name,
              name: item.name,
              input: 'number'
            };
            const group_a = {
              label: `${item.min}-${item.max}`,
              from: item.min,
              to: item.max
            };
            const group_b = {
              label: `${item.min}-${item.max}`,
              from: item.min,
              to: item.max
            };
            preDefinedGroups1[item.name] = preDefinedGroups1[item.name] || [];
            preDefinedGroups1[item.name].push(group_a);
            preDefinedGroups1[item.name].push(group_b);
            filterChoices.push(d_obj);
          } else {
            const d_obj = {
              type: 'dropdown',
              name: item.name,
              id: item.name,
              input: 'number'
            };
            const labelIndex = item.id.lastIndexOf('_');
            const label_ = item.id.substring(labelIndex + 1);
            const group = {
              label: label_,
              from: item.value,
              to: item.value,
              value: item.value
            };

            preDefinedGroups1[item.name] = preDefinedGroups1[item.name] || [];
            if (group.value !== 'None') {
              preDefinedGroups1[item.name].push(group);
            }
            filterChoices.push(d_obj);
          }
        }
      }

      const uniqueFilterChoices = [...new Map(filterChoices.map((v) => [v.id, v])).values()];
      setFilterChoices(uniqueFilterChoices);
      setPreDefienedGroups1(preDefinedGroups1);
    }
  }, [userDefinedFilter]);

  useEffect(() => {
    let filterType = ''
    if (groupFilters && Object.keys(groupFilters).length > 0 && filterChoices.length > 0) {
      setUserGivenInputValues(groupFilters);
      let targetNumber = 0;
      filterChoices.forEach((e, index) => {
        if (e.id === groupFilters.column) {
          targetNumber = index;
          filterType = e.type
        }
      });
      if (filterType === 'number') {
        const maxNumber = Object.entries(groupFilters).reduce((max, [key]) => {
          if (key.endsWith("_from") || key.endsWith("_to")) {
            const number = parseInt(key.replace("_from", "").replace("_to", ""));
            return (!isNaN(number) && number > max) ? number : max;
          }
          return max;
        }, 1); // Set default maximum to 1
        setGroupsCounter(maxNumber)
      }
      else {
        setMultipleInputs(groupFilters);

      }
      setSelectDefaultValue(String(targetNumber));

      filterChoices && setSelectedFilterDetails(filterChoices[targetNumber]);
    }
  }, [filterChoices]);

  useEffect(() => {
    if (selectedFilterDetails && 'type' in selectedFilterDetails && 'id' in selectedFilterDetails) {
      let filterType = selectedFilterDetails.type;
      let colName = selectedFilterDetails.id;
      let booleanType = booleanColumns.includes(selectedFilterDetails['name']) ? 'yes' : 'no';
      if (filterType) {
        let componentData = [];

        if (filterType === 'boolean' || filterType === 'static' || booleanType === 'yes') {
          setShowAddGroupButton(false);
          let options = ['Yes', 'No'];
          if (filterType === 'static') {
            options = [selectedFilterDetails.options[0], selectedFilterDetails.options[1]];
            setUserGivenInputValues({
              group_a: 'M',
              group_b: 'F',
              column: selectedFilterDetails.id,
              type: filterType
            });
          } else {
            setUserGivenInputValues({
              group_a: true,
              group_b: false,
              column: selectedFilterDetails.id,
              type: 'boolean'
            });
          }
          componentData = [componetSwitch({ compCase: 'static', groupLabels: options })];
        }

        else if (filterType === 'number') {
          if (viz_type !== 'volcono') {
            setShowAddGroupButton(true);
          }
          setUserGivenInputValues({
            column: selectedFilterDetails.id,
            type: filterType
          });
          const upperLimit = viz_type !== 'volcono' ? groupsCounter : 2;
          for (let i = 1; i <= upperLimit; i++) {
            componentData.push(componetSwitch({ compCase: 'number', groupNumber: i }));
          }
        }

        else if (filterType === 'text') {
          setShowAddGroupButton(true);
          setUserGivenInputValues({
            column: selectedFilterDetails.id,
            type: selectedFilterDetails.type
          });
          componentData.push(componetSwitch({ compCase: 'text' }));
        }

        else if (filterType === 'dropdown') {
          let tr = [];
          setShowAddGroupButton(false);
          if (viz_type === 'volcono') {
            if (
              Object.keys(userGivenInputValues).length > 0 &&
              userGivenInputValues['type'] === 'static') {
              if (
                'group_a' in userGivenInputValues && userGivenInputValues['group_a'].length > 0 &&
                'group_b' in userGivenInputValues && userGivenInputValues['group_b'].length > 0
              ) {
                preDefienedGroups1[colName].forEach((element, index) => {
                  let group_a = false;
                  let group_b = false;
                  if (userGivenInputValues['group_a'].indexOf(element.value) > -1) {
                    group_a = true;
                  }
                  if (userGivenInputValues['group_b'].indexOf(element.value) > -1) {
                    group_b = true;
                  }
                  tr.push(
                    <tr key={colName + index} className="Border-b">
                      <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                      <td className="PX6Y4">
                        <input
                          type="checkbox"
                          defaultChecked={group_a}
                          onChange={dropDownChange}
                          value={JSON.stringify({
                            index: index,
                            colName: colName,
                            group: 'group_a'
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
                            group: 'group_b'
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
                  <tr key={colName + index} className="Border-b">
                    <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                    <td className="PX6Y4">
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: index,
                          colName: colName,
                          group: 'group_a'
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
                          group: 'group_b'
                        })}
                      />
                    </td>
                  </tr>
                )
              );
            }
            componentData.push(
              <table className="table" key={'group_table'}>
                <thead className="Border-b WFull" key={'group_thead'}>
                  <tr>
                    <th></th>
                    <th className="GroupNamesFilter PX6Y4">Group A</th>
                    <th className="GroupNamesFilter PX6Y4">Group B</th>
                  </tr>
                </thead>
                <tbody key={'group_tbody'}>{tr}</tbody>
              </table>
            );
          }
          else if (viz_type === 'survival') {
            let d = preDefienedGroups1[colName];
            let thead = [];
            let boxes = d.length;
            for (let sv = 0; sv < d.length; sv++) {
              if (sv >= 5) {
                break;
              }
              const element = d[sv];
              thead.push(
                <th key={sv} className="GroupNamesFilter PX6Y4 ">
                  Group {abc[sv]}:
                </th>
              );
              let checkbox = [];
              let group_i = 0;

              for (let index = 0; index < boxes; index++) {
                if (index >= 5) {
                  break;
                }
                let name = 'group_' + abc[index] + '_' + element.value;
                if (Object.keys(userGivenInputValues).length > 0) {
                  let group_check = false;
                  if (
                    'group_' + abc[index] in userGivenInputValues &&
                    userGivenInputValues['group_' + abc[index]].length > 0
                  ) {
                    if (userGivenInputValues['group_' + abc[index]].indexOf(element.value) > -1) {
                      let gi_val = userGivenInputValues['group_' + abc[index]];
                      for (let gi = 0; gi < gi_val.length; gi++) {
                        let n = gi_val[gi];
                        if ('group_' + abc[index] + '_' + n === name) {
                          group_check = true;
                          break;
                        }
                      }
                    }
                  }
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        data-type={element.label}
                        data-name={abc[index]}
                        type="checkbox"
                        defaultChecked={group_check}
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                  group_i = group_i + 1;
                } else {
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                }
              }
              tr.push(
                <tr key={colName + sv} className="Border-b">
                  <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                  {checkbox}
                </tr>
              );
            }
            componentData.push(
              <table className="table" key={'group_table'}>
                <thead className="Border-b WFull" key={'group_thead'}>
                  <tr>
                    <th></th>
                    {thead}
                  </tr>
                </thead>
                <tbody key={'group_tbody'}>{tr}</tbody>
              </table>
            );
          }
          else if (viz_type === 'fusion') {
            let d = preDefienedGroups1[colName];
            let thead = [];
            for (let sv = 0; sv < d.length; sv++) {
              if (sv >= 3) {
                break;
              }
              const element = d[sv];
              thead.push(
                <th key={sv} className="GroupNamesFilter PX6Y4 ">
                  Group {abc[sv]}:
                </th>
              );
              let checkbox = [];
              let group_i = 0;

              for (let index = 0; index < d.length; index++) {
                if (index >= 3) {
                  break;
                }
                let name = 'group_' + abc[index] + '_' + element.value;
                if (Object.keys(userGivenInputValues).length > 0 && Object.keys(userGivenInputValues).some(key => ['group_a', 'group_b', 'group_c'].includes(key))) {
                  let group_check = false;
                  if (
                    'group_' + abc[index] in userGivenInputValues &&
                    userGivenInputValues['group_' + abc[index]].length > 0
                  ) {
                    if (userGivenInputValues['group_' + abc[index]].indexOf(element.value) > -1) {
                      let gi_val = userGivenInputValues['group_' + abc[index]];
                      for (let gi = 0; gi < gi_val.length; gi++) {
                        let n = gi_val[gi];
                        if ('group_' + abc[index] + '_' + n === name) {
                          group_check = true;
                          // break;
                        }
                      }
                    }
                  }
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        data-type={element.label}
                        data-name={abc[index]}
                        type="checkbox"
                        defaultChecked={group_check}
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                  group_i = group_i + 1;
                } else {
                  checkbox.push(
                    <td className="PX6Y4" key={index + '_' + sv + abc[sv] + '_' + element.label}>
                      <input
                        type="checkbox"
                        onChange={dropDownChange}
                        value={JSON.stringify({
                          index: sv,
                          colName: colName,
                          group: 'group_' + abc[index]
                        })}
                        key={element.label}
                      />
                    </td>
                  );
                }
              }
              tr.push(
                <tr key={colName + sv} className="Border-b">
                  <td className=" PX6Y4 CheckBoxRow">{element.label}</td>
                  {checkbox}
                </tr>
              );
            }
            componentData.push(
              <table className="table" key={'group_table'}>
                <thead className="Border-b WFull" key={'group_thead'}>
                  <tr>
                    <th></th>
                    {thead}
                  </tr>
                </thead>
                <tbody key={'group_tbody'}>{tr}</tbody>
              </table>
            );
          }
        }

        setFilterInputs(componentData);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
    else {
      setFilterInputs([])
    }
  }, [selectedFilterDetails]);

  const updateSelectedFilter = (e) => {
    setGroupsCounter(1);
    setMultipleInputs({});
    setUserGivenInputValues((prevState) => ({
      column: undefined,
      type: undefined,
    }));
    const targetValue = e.target.value;
    if (targetValue !== '-1') {
      setInputType(filterChoices[parseInt(targetValue)]['type'])
      setSelectDefaultValue(String(targetValue));
      setSelectedFilterDetails(filterChoices[parseInt(targetValue)]);
    }
    else {
      setSelectedFilterDetails({});
      setInputType('')
      setSelectDefaultValue('-1');
    }
  };

  const onChangeFilterInput = (e) => {
    if (e.target.type === 'number') {
      let id = e.target.name;
      let ids = id.split('_');

      let one_to_0, one_to, one_max_value, one_from_0, one_from, one_min_value;
      if (ids.includes('from')) {
        one_from_0 = e.target;
        one_from = one_from_0 ? +one_from_0.value : +one_from_0.min;
        one_min_value = one_from_0 ? +one_from_0.min : 0;
        one_to_0 = one_from_0.nextSibling;
        one_to = one_to_0 ? +one_to_0.value : one_from_0.max;
        one_max_value = one_from_0 ? +one_from_0.max : 0;
      } else if (ids.includes('to')) {
        one_to_0 = e.target;
        one_to = one_to_0 ? +one_to_0.value : +one_to_0.max;
        one_max_value = one_to_0 ? +one_to_0.max : 0;
        one_from_0 = one_to_0.previousElementSibling;
        one_from = one_from_0 ? +one_from_0.value : one_from_0.min;
        one_min_value = one_from_0 ? +one_from_0.min : 0;
      }

      if (one_from > one_max_value || one_from < one_min_value || one_from > one_to) {
        one_from_0.classList.add('Border2');
        one_from_0.classList.add('BorderRed400');
        one_to_0.classList.add('Border2');
        one_to_0.classList.add('BorderRed400');
      } else if (one_to > one_max_value || one_to < one_min_value || one_to < one_from) {
        one_from_0.classList.add('Border2');
        one_from_0.classList.add('BorderRed400');
        one_to_0.classList.add('Border2');
        one_to_0.classList.add('BorderRed400');
      } else {
        one_from_0.classList.remove('Border2');
        one_from_0.classList.remove('BorderRed400');
        one_to_0.classList.remove('Border2');
        one_to_0.classList.remove('BorderRed400');
        setUserGivenInputValues((prevState) => ({
          ...prevState,
          [one_from_0.name]: one_from_0.value
        }));
        setUserGivenInputValues((prevState) => ({
          ...prevState,
          [one_to_0.name]: one_to_0.value
        }));
      }
    } else {
      setUserGivenInputValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  };


  const componetSwitch = ({ compCase, groupLabels = null, groupNumber = null }) => {
    let max = 'to';
    let min = 'from';
    if (clinicalMaxMinInfo) {
      let clinicalInfoId = selectedFilterDetails['id'];
      if (clinicalInfoId + '_min' in clinicalMaxMinInfo) {
        min = clinicalMaxMinInfo[clinicalInfoId + '_min'];
      }
      if (clinicalInfoId + '_max' in clinicalMaxMinInfo) {
        max = clinicalMaxMinInfo[clinicalInfoId + '_max'];
      }
    }
    switch (compCase) {
      case 'static':
        return (
          <div key={compCase} className="MarginBottom4">
            {['A Group', 'B Group'].map((e, index) => (
              <div key={index} className="Border MarginTop4 P1">
                <div
                  key={e}
                  className="Block  TextBlue700 TextLG  FontBold MB2 TextLeft"
                  htmlFor="yes"
                >
                  {e}
                </div>
                <h1 id="yes" className="MultiUploadTextCenter MarginTop2">
                  {groupLabels[index]}
                </h1>
              </div>
            ))}
          </div>
        );
      case 'number':
        return (
          <div key={`${compCase}-${groupNumber}${Math.random()}`} className="MarginBottom4">
            <div>
              <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
                {`Group ${groupNumber}`}
              </div>
              <div className='Flex'>
                <input
                  onChange={onChangeFilterInput}
                  className="NumberInputCss"
                  name={`${groupNumber}_from`}
                  type="number"
                  placeholder={min}
                  min={min}
                  max={max}
                  defaultValue={userGivenInputValues && userGivenInputValues[`${groupNumber}_from`] || ''}
                  onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                ></input>
                <input
                  onChange={onChangeFilterInput}
                  className="NumberInputCss"
                  name={`${groupNumber}_to`}
                  type="number"
                  placeholder={max}
                  min={min}
                  max={max}
                  defaultValue={userGivenInputValues && userGivenInputValues[`${groupNumber}_to`] || ''}
                  onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                ></input>
              </div>
            </div>
          </div>
        );
      case 'text':
        if (viz_type === 'volcono') {
          return (
            <div key={`${compCase}--${Math.random()}`}>
              <div key={`${compCase}-1-${Math.random()}`} className="MarginBottom4">
                <div>
                  <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
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
                  <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
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
            </div>
          );
        } else {
          return (
            <div key={`${compCase}-${groupsCounter}-${Math.random()}`} className="MarginBottom4">
              <div>
                <div className="Block  TextBase  FontBold MB2 TextLeft" htmlFor="username">
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
    const filterData = preDefienedGroups1[eventObject.colName][eventObject.index];
    let tmp = multipleInputs;
    if (eventObject.group in tmp) {
      tmp[eventObject.group].push(filterData.value);
    } else {
      tmp[eventObject.group] = [filterData.value];
    }

    let group = eventObject['group'];
    let value = filterData['value'];
    let shouldExist = event.target.checked;

    if (shouldExist === false) {
      event.target.checked = false;
      event.target.removeAttribute('checked');
      let newTmp = tmp[group].filter((e) => e !== value);
      if (newTmp.length > 0) {
        tmp[group] = newTmp;
      }
      else {
        delete tmp[group]
      }
    }
    setMultipleInputs(tmp);

    if ('value' in filterData) {
      setUserGivenInputValues((prevState) => ({
        ...prevState,
        [eventObject.group]: tmp[eventObject.group],
        column: selectedFilterDetails.id,
        type: 'static'
      }));
    }
  };

  const submitFilters = () => {

    const isVolcano = viz_type === 'volcono';
    const isFusion = viz_type === 'fusion';
    const isSurvival = viz_type === 'survival';

    let countNonEmptyGroupsWithPrefix = (prefix, payload) => {
      let count = 0;
      for (let key in payload) {
        if (key.startsWith(prefix) && Array.isArray(payload[key]) && payload[key].length > 0) {
          count++;
        }
      }
      return count;
    }

    if (userGivenInputValues && Object.keys(userGivenInputValues).length > 0) {
      let final_payload = { ...userGivenInputValues };
      if (isVolcano) {
        if (final_payload['type'] === 'static') {
          let groupKeys = Object.keys(final_payload).filter(key => key.startsWith('group_'));
          let totalGroups = groupKeys.length;
          let hasAtLeastTwoNonEmptyGroups = groupKeys.reduce((count, key) => {
            if (Array.isArray(final_payload[key]) && final_payload[key].length > 0) {
              return count + 1;
            }
            return count;
          }, 0) >= 2;
          let send_response = totalGroups >= 2 && hasAtLeastTwoNonEmptyGroups;
          if (send_response === true) {
            parentCallback(final_payload);
          }
        }
        else if (final_payload['type'] === 'boolean') {
          parentCallback(final_payload);
        }
        else {
          const inputs = [
            ...document.querySelectorAll('[name="1_from"]'),
            ...document.querySelectorAll('[name="1_to"]'),
            ...document.querySelectorAll('[name="2_from"]'),
            ...document.querySelectorAll('[name="2_to"]')
          ];

          let send_response = inputs.length > 0 && inputs.every(input =>
            !(input.classList && (input.classList.contains('Border2') || input.classList.contains('BorderRed400'))) && input.value !== '');

          if (send_response) {
            final_payload['1_from'] = Math.min(...inputs.filter(input => input.name === '1_from').map(input => +input.value));
            final_payload['1_to'] = Math.max(...inputs.filter(input => input.name === '1_to').map(input => +input.value));
            final_payload['2_from'] = Math.min(...inputs.filter(input => input.name === '2_from').map(input => +input.value));
            final_payload['2_to'] = Math.max(...inputs.filter(input => input.name === '2_to').map(input => +input.value));
          }
          if (send_response === true) {
            parentCallback(final_payload);
          }
        }
      }
      else {

        let send_response;
        if (final_payload['type'] === 'static') {

          if ((isSurvival && countNonEmptyGroupsWithPrefix('group_', final_payload) < 1) ||
            (isFusion && countNonEmptyGroupsWithPrefix('group_', final_payload) < 1)) {
            send_response = false;
          }
          else {
            send_response = true;
          }

          if (send_response === true) {
            setGroupsCounter(1);
            parentCallback(final_payload);
          }
        }
        else if (final_payload['type'] === 'boolean') {
          parentCallback(final_payload);
        }
        else {
          let minValues = Array(groupsCounter).fill(Number.MAX_VALUE);
          let maxValues = Array(groupsCounter).fill(Number.MIN_VALUE);
          for (let i = 1; i <= groupsCounter; i++) {
            const min_1_from = document.querySelectorAll(`[name="${i}_from"]`);
            const max_1_to = document.querySelectorAll(`[name="${i}_to"]`);
            let min_1_num, max_1_num;

            min_1_from.forEach((input) => {
              if (input) {
                const isValid = !(input.classList &&
                  (input.classList.contains('Border2') ||
                    input.classList.contains('BorderRed400'))) &&
                  input.value !== '';
                if (!isValid) {
                  send_response = false;
                } else {
                  send_response = true;
                  min_1_num = Math.min(min_1_num || +input.value, +input.value);
                }
              }
            });

            max_1_to.forEach((input) => {
              if (input) {
                const isValid = !(input.classList &&
                  (input.classList.contains('Border2') ||
                    input.classList.contains('BorderRed400'))) &&
                  input.value !== '';
                if (!isValid) {
                  send_response = false;
                } else {
                  send_response = true;
                  max_1_num = Math.max(max_1_num || +input.value, +input.value);
                }
              }
            });

            if (send_response === false) {
              break;
            }

            minValues[i] = min_1_num;
            maxValues[i] = max_1_num;
          }
          if (send_response === true) {
            for (let i = 1; i < groupsCounter; i++) {
              final_payload[`${i}_from`] = minValues[i];
              final_payload[`${i}_to`] = maxValues[i];
            }
            setGroupsCounter(1);
            parentCallback(final_payload);
          }

        }
      }
    }
  };


  const resetFilters = () => {
    setSelectDefaultValue('-1');
    setSelectedFilterDetails({});
    setFilterInputs([]);
    setUserGivenInputValues({});
    setShowAddGroupButton(false);
    setGroupsCounter(1);
    resetFiltersData();
  };


  const AppendNewGroup = () => {
    if (viz_type === 'fusion') {
      if (groupsCounter <= 3) {
        const filterType = selectedFilterDetails.type;
        const componentData = componetSwitch({ compCase: filterType, groupNumber: groupsCounter });
        setFilterInputs((prevState) => [...prevState, componentData]);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
    else if (viz_type === 'survival') {
      if (groupsCounter <= 5) {
        const filterType = selectedFilterDetails.type;
        const componentData = componetSwitch({ compCase: filterType, groupNumber: groupsCounter });
        setFilterInputs((prevState) => [...prevState, componentData]);
        setGroupsCounter((prevState) => prevState + 1);
      }
    }
    else {
      const filterType = selectedFilterDetails.type;
      const componentData = componetSwitch({ compCase: filterType, groupNumber: groupsCounter });
      setFilterInputs((prevState) => [...prevState, componentData]);
      setGroupsCounter((prevState) => prevState + 1);
    }
  };

  return (
    <div className="m-1 PY3 PX2 BGGray100">
      <div className="P1 PY3 PX2 ColSpan2">
        <div className="Block  TextBlue700 TextLG  FontBold MB2 TextLeft">
          <FormattedMessage id="Clinical Filters" defaultMessage="Clinical Attribute" />
        </div>
        <select
          value={selectDefaultValue}
          onChange={updateSelectedFilter}
          name="selectOptions"
          className="SelectDiv"
          id="ClinicalAttributeSelect"
        >
          <option value="-1"></option>
          {filterChoices.map((type, index) => (
            <option
              className="FilterOptionText"
              key={type.id}
              value={index}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
      {inputType && inputType === 'number' && (
        <p className="P1 PY3 PX2 TextBase TextLeft">
          Max and Min Values are based on Clinincal Information File
        </p>
      )}

      {showAddGroupButton && (
        <div onClick={AppendNewGroup} className="P1 PY3 PX2 ColSpan2">
          <button className="AddGroupButton">Add Group</button>
        </div>
      )}
      <div className="P1 PY3 PX2 ColSpan2" style={{ overflowX: 'auto' }}>
        {filterInputs}
      </div>
      <div className="FilterGeneSet">
        <div className="P1 PY3 PX2 W50">
          <button
            onClick={submitFilters}
            className="FilterLabelText FilterButton"
            style={{ backgroundColor: 'rgb(0, 159, 226)', border: '1px solid white' }}
          >
            <FormattedMessage id="Submit_volcano" defaultMessage="Submit" />
          </button>
        </div>
        <div className="P1 PY3 PX2 W50">
          <button onClick={resetFilters} className="FilterLabelText FilterButton">
            <FormattedMessage id="Reset_volcano" defaultMessage="Reset" />
          </button>
        </div>
      </div>
    </div>
  );
};



























































