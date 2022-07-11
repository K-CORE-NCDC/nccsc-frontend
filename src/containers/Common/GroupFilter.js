import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Multiselect from 'multiselect-react-dropdown';

const LabelCss = "block text-left text-blue-700-700 text-lg  font-bold mb-2"
const checkBoxCss = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
const numberInputBoxCss = "shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

let filterChoices = [
    { 'type': 'static', 'name': 'sex', 'id': 'sex_cd', options: ['Male', 'Female'] },
    { 'type': 'number', 'name': 'Age Of Diaganosis', 'id': 'diag_age', 'input': 'number' },
    { 'type': 'number', 'id': 'bmi_vl', 'name': 'Body Mass Index', 'input': 'number' },
    { 'type': 'boolean', 'id': 'bila_cncr_yn', 'name': 'Diagnosis of Bilateral Breast Cancer' },
    { 'type': 'boolean', 'name': 'Smoking Status', 'id': 'smok_curr_yn' },
    { 'type': 'boolean', 'name': 'Former Smoker', 'id': 'smok_yn' },
    { 'type': 'boolean', 'name': 'Alcohol Consuption', 'id': 'drnk_yn', 'value': 'Yes' },
    { 'type': 'boolean', 'name': 'Family History of Breast Cancer', 'id': 'fmhs_brst_yn', 'value': 'Yes' },
    { 'type': 'number', 'name': 'First Menstural Age', 'id': 'mena_age', 'input': 'number' },
    { 'type': 'boolean', 'name': 'Menopause', 'id': 'meno_yn' },
    { 'type': 'boolean', 'name': 'childbirth', 'id': 'delv_yn' },
    { 'type': 'boolean', 'name': 'Experience of Breastfeeding', 'id': 'feed_yn' },
    { 'type': 'number', 'name': 'Duration of Breastfeeding', 'id': 'feed_drtn_mnth', 'input': 'number' },
    { 'type': 'boolean', 'name': 'Intake of Oral Contraceptive Pill', 'id': 'oc_yn' },
    { 'type': 'boolean', 'name': 'Hormone Replacement Therapy', 'id': 'hrt_yn' },
    { 'type': 'number', 'name': 'T Category', 'id': 't_category', 'input': 'number' },
    { 'type': 'number', 'name': 'N Category', 'id': 'n_category', 'input': 'number' },
    { 'type': 'text', 'name': 'HER2 Score', 'id': 'her2_score', 'input': 'text' },
    { 'type': 'text', 'name': 'ki67', 'id': 'ki67_score', 'input': 'text' },
    { 'type': 'number', 'name': 'Relapse Duration', 'id': 'rlps_cnfr_drtn', 'input': 'number' },
    { 'type': 'boolean', 'name': 'Relapse Yes or No', 'id': 'rlps_yn' },
    { 'type': 'number', 'name': 'ER Test', 'id': 'er_score', 'input': 'number' },
    { 'type': 'number', 'name': 'PR Test', 'id': 'pr_score', 'input': 'number' }
]

const filterChoicesCustom = [
    { 'type': 'static', 'name': 'Sex', 'id': 'sex_cd', options: ['Male', 'Female'] },
    { 'type': 'number', 'name': 'Age Of Diagonosis', 'id': 'diag_age', 'input': 'number' },
    { 'type': 'number', 'id': 'bmi_vl', 'name': 'BMI', 'input': 'number' },
    { 'type': 'boolean', 'id': 'bila_cncr_yn', 'name': 'Diagnosis of Bilateral Breast Cancer' },
    { 'type': 'text', 'name': 'Smoking Status', 'id': 'smok_yn' },
    { 'type': 'boolean', 'name': 'Alcohol Consuption', 'id': 'drnk_yn', 'value': 'Yes' },
    { 'type': 'boolean', 'name': 'Breast cancer family history', 'id': 'fmhs_brst_yn', 'value': 'Yes' },
    { 'type': 'number', 'name': 'Menarche age', 'id': 'mena_age', 'input': 'number' },
    { 'type': 'boolean', 'name': 'Menopause', 'id': 'meno_yn' },
    { 'type': 'boolean', 'name': 'childbirth', 'id': 'delv_yn' },
    { 'type': 'boolean', 'name': 'Breastfeeding Experience', 'id': 'feed_yn' },
    { 'type': 'number', 'name': 'Duration of Breastfeeding', 'id': 'feed_drtn_mnth', 'input': 'number' },
    { 'type': 'boolean', 'name': 'Intake of Oral Contraceptive Pill', 'id': 'oc_yn' },
    { 'type': 'boolean', 'name': 'Hormone Replace Therapy', 'id': 'hrt_yn' },
    { 'type': 'number', 'name': 'T Category', 'id': 't_category', 'input': 'number' },
    { 'type': 'number', 'name': 'N Category', 'id': 'n_category', 'input': 'number' },
    { 'type': 'text', 'name': 'HER2 Score', 'id': 'her2_score', 'input': 'text' },
    { 'type': 'text', 'name': 'ki67', 'id': 'ki67_score', 'input': 'text' },
    { 'type': 'boolean', 'name': 'Recurance Yes or No', 'id': 'rlps_yn' },
    { 'type': 'number', 'name': 'ER Test', 'id': 'er_score', 'input': 'number' },
    { 'type': 'number', 'name': 'PR Test', 'id': 'pr_score', 'input': 'number' }
]

let preDefienedGroups = {
    diag_age: [
        { label: "21-35", from: 21, to: 35 },
        { label: "35-40", from: 35, to: 40 },
        
    ],
    bmi_vl: [
        { label: "18.5~24.9", from: 18.5, to: 24.9 },
        { label: "25>", from: 25, to: 100 },
        
    ],
    mena_age: [
        { label: "10-13", from: 10, to: 13 },
        { label: "14-17", from: 14, to: 17 },
    ],
    feed_drtn_mnth: [
        { label: "> 1 Year", from: 12, to: 24 },
        { label: "≤ 1 Year", from: 1, to: 11 }
    ],
    t_category: [
        { label: "Tis~T2", from: 'Tis', to: 'T2' },
        { label: "T3~T4", from: 'T3', to: 'T4' }
    ],
    n_category: [
        { label: "Nx~N2", from: 'N1', to: 'N2' },
        { label: "N3", from: 'N3', to: 'N3' }
    ],
    her2_score: [
        { label: "negative(0~1+)", value: "negative(0, 0~1, 1+)" },
        { label: "positive(2+3+)", value: "positive(2+3+)" }
    ],
    pr_score: [
        { label: "Positive", from: 1, to: 1 },
        { label: "Negative", from: 2, to: 2 }
    ],
    er_score: [
        { label: "Positive", from: 1, to: 1 },
        { label: "Negative", from: 2, to: 2 }
    ],
    ki67_score: [
        { label: "Positive 1-15%", value: "Positive 15%" },
        { label: "Positive 16%-", value: "Positive 50%" }
    ],
    smok_yn: [
        { label: "No", value: "smok_yn||N" },
        { label: "Yes", value: "smok_yn||Y" },
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
}
export const PreDefienedFilters = ({ parentCallback, groupFilters }) => {
    const [selectedFilterType, setSelectedFilterType] = useState({})
    const [filterGroupsHtml, setFilterGroupsHtml] = useState([])
    const [filters, setFilters] = useState({})
    const [resetClicked, setResetClicked] = useState(false)
    const [isGroupFilterProp, setIsGroupFilterProp] = useState(false)

    const submitFilters = () => {
        if (Object.keys(filters).length > 0) {
            parentCallback(filters)
        } else {
            parentCallback(groupFilters)
        }
    }

    const resetFilters = () => {
        setSelectedFilterType({})
        setFilterGroupsHtml([])
        setFilters({})
        setResetClicked(true)
        setIsGroupFilterProp(false)
    }

    useEffect(() => {
        if (groupFilters && groupFilters.type) {
            if (resetClicked === false) {
                setIsGroupFilterProp(true)
            }
            let filterGroupsHtmlTemp = []
            if (groupFilters.type === 'boolean') {
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 1 : </h5>
                            <h5 className="text-bold text-blue-700 xs:text-xl">Yes</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 2 : </h5>
                            <h5 className="text-bold text-blue-700 xs:text-xl">No</h5>
                        </div>
                    </div>
                )
            }

            if (groupFilters.type === 'static') {
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 1 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">Male</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 2 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">Female</h5>
                        </div>
                    </div>
                )
            }

            if (groupFilters.type === 'text') {
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 1 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">{groupFilters[1]}</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 2 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">{groupFilters[2]}</h5>
                        </div>
                    </div>
                )
            }
            if (groupFilters.type === 'number') {
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 1 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">{`${groupFilters['1_from']}-${groupFilters['1_to']}`}</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 2 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">{`${groupFilters['2_from']}-${groupFilters['2_to']}`}</h5>
                        </div>
                    </div>
                )
            }
            setFilterGroupsHtml(filterGroupsHtmlTemp)
        }
    }, [groupFilters])

    const filterTypeDropdownSelection = event => {
        let key = event.target.value
        console.log(key)
        setSelectedFilterType({ details: filterChoicesCustom[parseInt(key)], index: key })
    }

    const dropDownChange = (event) => {
        const eventObject = JSON.parse(event.target.value)
        const filterData = preDefienedGroups[eventObject.colName][(eventObject.index)]
        if ('value' in filterData) {
            setFilters(prevState => ({
                ...prevState,
                ...{ [eventObject.group]: filterData.value, column: selectedFilterType.details.id, type: "text" }
            }))
        } else {
            setFilters(prevState => ({
                ...prevState,
                ...{ [`${eventObject.group}_from`]: filterData.from, [`${eventObject.group}_to`]: filterData.to, column: selectedFilterType.details.id, type: "number" }
            }))
        }
    }

    useEffect(() => {
        let filterGroupsHtmlTemp = []
        if (selectedFilterType && selectedFilterType.details) {
            if (selectedFilterType.details.type === 'boolean') {
                setFilters({ group_a: true, group_b: false, column: selectedFilterType.details.id, type: "boolean" })
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="p-4 xs:text-xl">Group 1 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">Yes</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="p-4 xs:text-xl">Group 2 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">No</h5>
                        </div>
                    </div>
                )
            }

            if (selectedFilterType.details.type === 'static') {
                setFilters({ group_a: 'F', group_b: 'M', column: selectedFilterType.details.id, type: "static" })
                filterGroupsHtmlTemp.push(
                    <div key='gender'>
                        <div className="flex border mb-1 flex-row justify-around">
                            <h5 className="p-4 xs:text-xl">Group 1 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">Male</h5>
                        </div>
                        <div className="flex border mb-1 flex-row justify-around">
                            <h5 className="p-4 xs:text-xl">Group 2 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">Female</h5>
                        </div>
                    </div>
                )
            }

            if ((selectedFilterType.details.type === 'number') || (selectedFilterType.details.type === 'text')) {
                const colName = selectedFilterType.details.id
                
                
                
                let t = preDefienedGroups[colName]
                let tmp = {'column':colName,'type':selectedFilterType.details.type}
                for (let index = 0; index < t.length; index++) {
                    const element = t[index];
                    console.log(element)
                    let indx = index+1
                    filterGroupsHtmlTemp.push(
                        <div key={'drop-user-'+index}>
                            <div className="flex flex-row justify-around">
                                <h5 className="p-4 xs:text-xl">Group {indx}: </h5>
                                <h5 className="p-4 text-bold xs:text-xl text-blue-700">{element.label}</h5>
                            </div>
                        </div>
                    )
                    tmp[indx+"_from"] = element.from
                    tmp[indx+"_to"] = element.to 
                    
                }
                setFilters(tmp)
            }


            setFilterGroupsHtml(filterGroupsHtmlTemp)

        }
    }, [selectedFilterType])

    return (
        <div className="m-1 bg-gray-100">
            <div className="p-1 py-3 px-2 col-span-2">
                <div className="block text-left text-blue-700-700 text-lg  font-bold mb-2">
                    <FormattedMessage id="Clinical Filters" defaultMessage='Clinical Filters' />
                </div>
                {((resetClicked === true) || (isGroupFilterProp === false)) && <select
                    onChange={filterTypeDropdownSelection}
                    className='w-full lg:p-4 xs:p-2 border xs:text-sm lg:text-lg focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                    <option value=''></option>
                    {filterChoicesCustom.map((type, index) => (
                        <option className="lg:text-lg xs:text-sm" key={type.name} value={index}>{type.name}</option>
                    ))}
                </select>}
                {((resetClicked === false) && (isGroupFilterProp === true)) && <h6 className='border p-4'>{filterChoicesCustom.map(e => {
                    if (groupFilters.column === e.id) {
                        return e.name
                    }
                })}</h6>}
            </div>
            <div className="p-1 py-3 px-2 col-span-2">
                {filterGroupsHtml}
            </div>
            <div>
                <button onClick={submitFilters} className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 xs:w-28 h-20 xs:text-sm text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    <FormattedMessage id="Submit_volcano" defaultMessage='Submit' />
                </button>
            </div>
            <div>
                <button onClick={resetFilters} className="bg-white hover:bg-gray-700 mb-3 lg:w-80 h-20 xs:w-28 xs:text-sm text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    <FormattedMessage id="Reset_volcano" defaultMessage='Reset' />
                </button>
            </div>
        </div>
    );
}


const GroupFilters = ({ parentCallback, groupFilters,viz_type }) => {
    const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);
    const [filterSelected, setFilterSelected] = useState('')
    const [selectedFilterDetails, setSelectedFilterDetails] = useState({})
    const [filterInputs, setFilterInputs] = useState([])
    const [userGivenInputValues, setUserGivenInputValues] = useState({})
    const [showAddGroupButton, setShowAddGroupButton] = useState(false)
    const [groupsCounter, setGroupsCounter] = useState(2)
    const [prevStateFilters, setPrevStateFilters] = useState([])
    const [isFilterResetHappened, setIsFilterResetHappened] = useState(false)
    const [filters, setFilters] = useState({})
    const [multipleInputs, setMultipleInputs] = useState({})
    if(viz_type==='volcono'){
        filterChoices = [
            { 'type': 'number', 'id': 'bmi_vl', 'name': 'Body Mass Index', 'input': 'number' },
            { 'type': 'number', 'name': 'Age Of Diagonosis', 'id': 'diag_age', 'input': 'number' },
            { 'type': 'dropdown', 'name': 'Smoking Status', 'id': 'smok_yn' },
            { 'type': 'number', 'name': 'First Menstural Age', 'id': 'mena_age', 'input': 'number' },
            { 'type': 'number', 'name': 'Duration of Breastfeeding(month)', 'id': 'feed_drtn_mnth', 'input': 'number' },
            { 'type': 'dropdown', 'name': 'T Category', 'id': 't_category', 'input': 'number' },
            { 'type': 'dropdown', 'name': 'N Category', 'id': 'n_category', 'input': 'number' },
            { 'type': 'text', 'name': 'HER2 Score', 'id': 'her2_score', 'input': 'text' },
            { 'type': 'text', 'name': 'ki67', 'id': 'ki67_score', 'input': 'text' },
            { 'type': 'number', 'name': 'Relapse Duration(month)', 'id': 'rlps_cnfr_drtn', 'input': 'number' },
            
        ]
        preDefienedGroups['smok_yn'] = [
            { label: "No Smoking", value: "smok_yn||N" },
            { label: "Past Smoking", value: "smok_yn||Y" },
            { label: "Current Smoking", value: "smok_curr_yn||Y" },
        ]
        preDefienedGroups['t_category'] = [
                { label: "Tis", from: 'Tis', to: 'Tis',value: 'Tis' },
                { label: "T1", from: 'T1', to: 'T1',value: 'T1' },
                { label: "T2", from: 'T2', to: 'T2',value: 'T2' },
                { label: "T3", from: 'T3', to: 'T3',value: 'T3' },
                { label: "T4", from: 'T4', to: 'T4',value: 'T4' },
            ]
        preDefienedGroups['n_category'] = [
            { label: "Nx", from: 'Nx', to: 'Nx' },
            { label: "N0", from: 'N0', to: 'N0' },
            { label: "N1", from: 'N1', to: 'N1' },
            { label: "N2", from: 'N2', to: 'N2' },
            { label: "N3", from: 'N3', to: 'N3' }
        ]
    }

    const submitFilters = () => {
        if (isFilterResetHappened) {
            parentCallback(userGivenInputValues)
        } else {
            parentCallback({ ...userGivenInputValues, ...groupFilters })
        }
    }

    const resetFilters = () => {
        console.log('===here===')
        setFilterSelected('')
        setSelectedFilterDetails({})
        setFilterInputs([])
        setUserGivenInputValues({})
        setShowAddGroupButton(false)
        setGroupsCounter(1)
        setIsFilterResetHappened(true)
        setPrevStateFilters([])
    }

    const updateSelectedFilter = (e) => {
        // console.log(clinicalMaxMinInfo['data'])
        resetFilters()
        setIsFilterResetHappened(true)
        setFilterInputs([])
        const targetValue = e.target.value
        // console.log(targetValue)
        if (targetValue !== '') {
            setFilterSelected(filterChoices[parseInt(targetValue)].name)
            setSelectedFilterDetails(filterChoices[parseInt(targetValue)])
        } else {
            setFilterSelected('')
            setSelectedFilterDetails({})
        }
        // setGroupsCounter(1)
    }


    const onChangeFilterInput = (e) => {
        setUserGivenInputValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (groupFilters && Object.keys(groupFilters).length > 0) {
            let filterType = groupFilters.type
            setUserGivenInputValues(groupFilters)
            let targetNumber = 0
            filterChoices.forEach((e, index) => {
                if (e.id === groupFilters.column) {
                    targetNumber = index
                }
            })
            setFilterSelected(filterChoices[targetNumber].name)
            setSelectedFilterDetails(filterChoices[targetNumber])
            let valsArray = []
            let counter = 1
            for (let i = 1; i < Object.keys(groupFilters).length; i++) {
                if (i in groupFilters || `${i}` in groupFilters) {
                    counter += 1
                    valsArray.push(
                        <div key={`${i}-text-${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    {`Group ${i}`}
                                </div>
                                <div>
                                    <input value={groupFilters[i]} onChange={onChangeFilterInput} className={checkBoxCss} name={`${i}`} type="text" placeholder="Enter Text" >
                                    </input>
                                </div>
                            </div>
                        </div>
                    )
                } else if (`${i}_from` in groupFilters) {
                    counter += 1
                    valsArray.push(
                        <div key={`number-${i}${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    {`Group ${i}`}
                                </div>
                                <div>
                                    <input defaultValue={groupFilters[`${i}_from`]} onChange={onChangeFilterInput} className={numberInputBoxCss} name={`${i}_from`} type="number" placeholder="from" >
                                    </input>
                                    <input defaultValue={groupFilters[`${i}_to`]} onChange={onChangeFilterInput} className={numberInputBoxCss} name={`${i}_to`} type="number" placeholder="to" >
                                    </input>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            if (filterType === 'text' || filterType === 'number') {
                setPrevStateFilters(valsArray)
                setGroupsCounter(counter)
            }
        }
    }, [])




    const componetSwitch = (compCase, groupLabels = null) => {
        let max = 'to' 
        let min = 'from'
        if(clinicalMaxMinInfo){
            let clinicalMaxMinInfoData = clinicalMaxMinInfo['data']
            let clinicalInfoId = selectedFilterDetails['id']
            if(clinicalInfoId+"_min" in clinicalMaxMinInfoData){
                min = clinicalMaxMinInfoData[clinicalInfoId+"_min"]
            }
            if(clinicalInfoId+"_max" in clinicalMaxMinInfoData){
                max = clinicalMaxMinInfoData[clinicalInfoId+"_max"]
            }
        }
        switch (compCase) {
            case "static":
                return (
                    <div key={compCase} className="mb-4">
                        {['A Group', 'B Group'].map((e, index) => (
                            <div key={e} className="border mt-4 p-1">
                                <div className={LabelCss} htmlFor="yes">
                                    {e}
                                </div>
                                <h1 id="yes" className="text-left mt-2">{groupLabels[index]}</h1>
                            </div>
                        ))}
                    </div>
                )

            case "number":
                if(viz_type==='volcono'){
                    return (
                        <>
                        <div key={`${compCase}-1${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    Group 1
                                </div>
                                <div>
                                    <input onChange={onChangeFilterInput} className={numberInputBoxCss} name="1_from" type="number" placeholder={min} >
                                    </input>
                                    <input onChange={onChangeFilterInput} className={numberInputBoxCss} name="1_to" type="number" placeholder={max} >
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div key={`${compCase}-2${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    Group 2
                                </div>
                                <div>
                                    <input onChange={onChangeFilterInput} className={numberInputBoxCss} name={`2_from`} type="number" placeholder={min} >
                                    </input>
                                    <input onChange={onChangeFilterInput} className={numberInputBoxCss} name={`2_to`} type="number" placeholder={max} >
                                    </input>
                                </div>
                            </div>
                        </div>
                    </> 
                    )
                }else{
                    return (
                        <div key={`${compCase}-${groupsCounter}${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    {`Group ${groupsCounter}`}
                                </div>
                                <div>
                                    <input onChange={onChangeFilterInput} className={numberInputBoxCss} name={`${groupsCounter}_from`} type="number" placeholder={min} >
                                    </input>
                                    <input onChange={onChangeFilterInput} className={numberInputBoxCss} name={`${groupsCounter}_to`} type="number" placeholder={max} >
                                    </input>
                                </div>
                            </div>
                        </div>
                    )
                }
            case "text":
                if(viz_type==='volcono'){
                    return (
                        <>
                        <div key={`${compCase}-1-${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    Group 1
                                </div>
                                <div>
                                    <input onChange={onChangeFilterInput} className={checkBoxCss} name='1' type="text" placeholder="Enter Text" >
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div key={`${compCase}-2-${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    Group 2
                                </div>
                                <div>
                                    <input onChange={onChangeFilterInput} className={checkBoxCss} name='2' type="text" placeholder="Enter Text" >
                                    </input>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                }else{
                    return (
                        <div key={`${compCase}-${groupsCounter}-${Math.random()}`} className="mb-4">
                            <div>
                                <div className={LabelCss} htmlFor="username">
                                    {`Group ${groupsCounter}`}
                                </div>
                                <div>
                                    <input onChange={onChangeFilterInput} className={checkBoxCss} name={`${groupsCounter}`} type="text" placeholder="Enter Text" >
                                    </input>
                                </div>
                            </div>
                        </div>
                    )
                }
        }
    }

    const dropDownChange = (event) => {
        const eventObject = JSON.parse(event.target.value)
        // console.log(event.target)
        // console.log(event.target.value)
        const filterData = preDefienedGroups[eventObject.colName][(eventObject.index)]
        console.log(eventObject)
        console.log(filterData)
        let tmp = multipleInputs
        if(eventObject.group in tmp){
            tmp[eventObject.group].push(filterData.value)
        }else{
            tmp[eventObject.group] = [filterData.value]
        }
        console.log(tmp)
        setMultipleInputs(tmp)
        if ('value' in filterData) {
            setUserGivenInputValues(prevState => ({
                ...prevState,
                ...{ [eventObject.group]: tmp[eventObject.group], column: selectedFilterDetails.id, type: "static" }
            }))
        } 
    }

    useEffect(() => {
        
        let filterType = selectedFilterDetails.type
        let colName = selectedFilterDetails.id
        console.log(groupFilters)
        if (filterType) {
            let componentData = []
            // console.log('this after state update');

            if (filterType === 'boolean' || filterType === 'static') {
                let options = ['Yes', 'No']
                if (filterType === 'static') {
                    options = [selectedFilterDetails.options[0], selectedFilterDetails.options[1]]
                    setUserGivenInputValues({ group_a: 'M', group_b: 'F', column: selectedFilterDetails.id, type: filterType })
                } else {
                    setUserGivenInputValues({ group_a: true, group_b: false, column: selectedFilterDetails.id, type: filterType })
                }
                componentData = [componetSwitch('static', options)]
            } else if (filterType === 'number') {
                if(viz_type!=='volcono'){
                    setShowAddGroupButton(true)
                }
                setUserGivenInputValues({ column: selectedFilterDetails.id, type: filterType })
                componentData.push(componetSwitch('number'))
            } else if (filterType === "text") {

                setShowAddGroupButton(true)
                setUserGivenInputValues({ column: selectedFilterDetails.id, type: selectedFilterDetails.type })
                componentData.push(componetSwitch('text'))
            }else if(filterType==="dropdown"){
                
                // console.log(groupFilters['group_a'])
                let tr = []
                // console.log(preDefienedGroups[colName])
                if(Object.keys(groupFilters).length>0 && groupFilters['type']==='static'){
                    if (groupFilters['group_a'].length>0 && groupFilters['group_b'].length>0){
                        preDefienedGroups[colName].forEach((element, index)=>{
                            let group_a = false
                            let group_b = false
                            if(groupFilters['group_a'].indexOf(element.value)>-1){
                                group_a = true
                            }
                            if(groupFilters['group_b'].indexOf(element.value)>-1){
                                group_b = true
                            }
                            tr.push(<tr key={colName+index} className='border-b'>
                                <td className='text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>{element.label}</td>
                                <td className='px-6 py-4'><input type='checkbox' checked={group_a} onChange={dropDownChange} value={JSON.stringify({ index: index, colName: colName, group: 'group_a' })}/></td>
                                <td className='px-6 py-4'><input type='checkbox' checked={group_b} onChange={dropDownChange} value={JSON.stringify({ index: index, colName: colName, group: 'group_b' })}/></td>
                            </tr>)    
                        })
                    }
                }else{
                    preDefienedGroups[colName].map((element, index) => (
                        
                        tr.push(<tr key={colName+index} className='border-b'>
                            <td className='text-left px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>{element.label}</td>
                            <td className='px-6 py-4'><input type='checkbox' onChange={dropDownChange} value={JSON.stringify({ index: index, colName: colName, group: 'group_a' })}/></td>
                            <td className='px-6 py-4'><input type='checkbox' onChange={dropDownChange} value={JSON.stringify({ index: index, colName: colName, group: 'group_b' })}/></td>
                        </tr>)
                    ))
                    
                }
                componentData.push(<table className='table' key={'group_table'}>
                    <thead className='border-b w-full' key={'group_thead'}>
                        <tr>
                        <th></th>
                        <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Group A</th>
                        <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Group B</th>
                        </tr>
                    </thead>
                    <tbody key={'group_tbody'}>{tr}</tbody>
                </table>)
                
            }
            
            if (prevStateFilters.length > 0) {
                setFilterInputs([...prevStateFilters])
            } else {
                setFilterInputs([...componentData])
                setGroupsCounter(prevState => prevState + 1)
            }
        }
    }, [selectedFilterDetails])

    const AppendNewGroup = () => {
        const filterType = selectedFilterDetails.type
        const componentData = componetSwitch(filterType)
        setFilterInputs(prevState => [...prevState, componentData])
        setGroupsCounter(prevState => prevState + 1)
    }

    return (
        <div className="m-1 bg-gray-100">
            <div className="p-1 py-3 px-2 col-span-2">
                <div className="block text-left text-blue-700-700 text-lg  font-bold mb-2">
                    <FormattedMessage id="Clinical Filters" defaultMessage='Clinical Filters' />
                </div>
                <select
                    onChange={updateSelectedFilter}
                    defaultValue={filterSelected}
                    className='w-full lg:p-4 xs:p-2 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                    <option value=''></option>
                    {filterChoices.map((type, index) => (
                        <option selected={filterSelected === type.name} className="lg:text-lg xs:text-sm" key={type.name} value={index}>{type.name}</option>
                    ))}
                </select>
            </div>
            {showAddGroupButton && <div onClick={AppendNewGroup} className="p-1 py-3 px-2 col-span-2">
                <button className="bg-main-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Add Group
                </button>
            </div>}
            <div className="p-1 py-3 px-2 col-span-2">
                {filterInputs}
            </div>
            {filterSelected && <div>
                <button onClick={submitFilters} className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    Submit
                </button>
            </div>}
            {filterSelected && <div>
                <button onClick={resetFilters} className="bg-white hover:bg-gray-700 mb-3 lg:w-80 sm:w-40 h-20 text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    Reset
                </button>
            </div>}
        </div>
    );
}

export default GroupFilters;



export const PreDefienedFiltersSurvival = ({ parentCallback, groupFilters,from }) => {
    const [selectedFilterType, setSelectedFilterType] = useState({})
    const [filterGroupsHtml, setFilterGroupsHtml] = useState([])
    const [filters, setFilters] = useState({})
    const [resetClicked, setResetClicked] = useState(false)
    const [isGroupFilterProp, setIsGroupFilterProp] = useState(false)


    let preDefienedGroups1 = {
        ...preDefienedGroups,
       
    }


    const submitFilters = () => {
        if (Object.keys(filters).length > 0) {
            parentCallback(filters)
        } else {
            parentCallback(groupFilters)
        }
    }

    const resetFilters = () => {
        setSelectedFilterType({})
        setFilterGroupsHtml([])
        setFilters({})
        setResetClicked(true)
        setIsGroupFilterProp(false)
    }

    useEffect(() => {
        if (groupFilters && groupFilters.type) {
            if (resetClicked === false) {
                setIsGroupFilterProp(true)
            }
            let filterGroupsHtmlTemp = []
            if (groupFilters.type === 'boolean') {
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 1 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">Yes</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 2 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">No</h5>
                        </div>
                    </div>
                )
            }

            if (groupFilters.type === 'static') {
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 1 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">Male</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="xs:text-xl">Group 2 : </h5>
                            <h5 className="text-bold xs:text-xl text-blue-700">Female</h5>
                        </div>
                    </div>
                )
            }

            // if (groupFilters.type === 'text') {
            //     filterGroupsHtmlTemp.push(
            //         <div key='bool'>
            //             <div className="flex flex-row">
            //                 <h5>Group 1 : </h5>
            //                 <h5 className="text-bold text-blue-700">{groupFilters[1]}</h5>
            //             </div>
            //             <div className="flex flex-row">
            //                 <h5>Group 2 : </h5>
            //                 <h5 className="text-bold text-blue-700">{groupFilters[2]}</h5>
            //             </div>
            //         </div>
            //     )
            // }
            if ((groupFilters.type === 'number') || (groupFilters.type === 'text')) {
                filterGroupsHtmlTemp.push(
                    <div key='drop-user'>
                        {preDefienedGroups1[groupFilters.column].map((element, index) => (
                            <div className="text-lg" key={`${element.label}-${index}-grp-a`}>
                                <div className="flex flex-row justify-around">
                                    <h5 className="p-4 xs:text-xl">Group {index + 1} : {element.label}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
            setFilterGroupsHtml(filterGroupsHtmlTemp)
        }
    }, [groupFilters])

    const filterTypeDropdownSelection = event => {
        let key = event.target.value
        setSelectedFilterType({ details: filterChoicesCustom[parseInt(key)], index: key })
    }

    const dropDownChange = (event) => {
        const eventObject = JSON.parse(event.target.value)
        console.log(eventObject)
        const filterData = preDefienedGroups1[eventObject.colName][(eventObject.index)]
        if ('value' in filterData) {
            setFilters(prevState => ({
                ...prevState,
                ...{ [eventObject.group]: filterData.value, column: selectedFilterType.details.id, type: "text" }
            }))
        } else {
            setFilters(prevState => ({
                ...prevState,
                ...{ [`${eventObject.group}_from`]: filterData.from, [`${eventObject.group}_to`]: filterData.to, column: selectedFilterType.details.id, type: "number" }
            }))
        }
    }

    useEffect(() => {
        let filterGroupsHtmlTemp = []
        if (selectedFilterType && selectedFilterType.details) {
            if (selectedFilterType.details.type === 'boolean') {
                setFilters({ group_a: true, group_b: false, column: selectedFilterType.details.id, type: "boolean" })
                filterGroupsHtmlTemp.push(
                    <div key='bool'>
                        <div className="flex flex-row">
                            <h5 className="p-4 xs:text-xl">Group 1 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">Yes</h5>
                        </div>
                        <div className="flex flex-row">
                            <h5 className="p-4 xs:text-xl">Group 2 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">No</h5>
                        </div>
                    </div>
                )
            }

            if (selectedFilterType.details.type === 'static') {
                setFilters({ group_a: 'F', group_b: 'M', column: selectedFilterType.details.id, type: "static" })
                filterGroupsHtmlTemp.push(
                    <div key='gender'>
                        <div className="flex border mb-1 flex-row justify-around">
                            <h5 className="p-4 xs:text-xl">Group 1 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">Male</h5>
                        </div>
                        <div className="flex border mb-1 flex-row justify-around">
                            <h5 className="p-4 xs:text-xl">Group 2 : </h5>
                            <h5 className="p-4 text-bold xs:text-xl text-blue-700">Female</h5>
                        </div>
                    </div>
                )
            }

            if ((selectedFilterType.details.type === 'number') || (selectedFilterType.details.type === 'text')) {
                const colName = selectedFilterType.details.id
                // console.log(selectedFilterType);
                let filtersTemp = { type: selectedFilterType.details.type, column: colName }
                preDefienedGroups1[colName].map((e, index) => {
                    filtersTemp = {
                        ...filtersTemp,
                        [`${index + 1}_from`]: e.from,
                        [`${index + 1}_to`]: e.to,
                    }
                })
                setFilters(filtersTemp)
                filterGroupsHtmlTemp.push(
                    <div key='drop-user'>
                        {preDefienedGroups1[colName].map((element, index) => (
                            <div className="text-lg" key={`${element.label}-${index}-grp-a`}>
                                <div className="flex flex-row justify-around">
                                    <h5 className="p-4 xs:text-xl">Group {index + 1} : {element.label}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }


            setFilterGroupsHtml(filterGroupsHtmlTemp)

        }
    }, [selectedFilterType])

    return (
        <div className="m-1 bg-gray-100">
            <div className="p-1 py-3 px-2 col-span-2">
                <div className="block text-left text-blue-700-700 text-lg  font-bold mb-2">
                    <FormattedMessage id="Clinical Filters" defaultMessage='Clinical Filters' />
                </div>
                {((resetClicked === true) || (isGroupFilterProp === false)) && <select
                    onChange={filterTypeDropdownSelection}
                    defaultValue={''}
                    className='w-full lg:p-4 xs:p-2 border lg:text-xl xs:text-sm focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                    <option value=''></option>
                    {filterChoicesCustom.map((type, index) => (
                        <option className="text-lg" key={type.name} value={index}>{type.name}</option>
                    ))}
                </select>}
                {((resetClicked === false) && (isGroupFilterProp === true)) && <h6 className='border p-4'>{filterChoicesCustom.map(e => {
                    if (groupFilters.column === e.id) {
                        return e.name
                    }
                })}</h6>}
            </div>
            <div className="p-1 py-3 px-2 col-span-2">
                {filterGroupsHtml}
            </div>
            <div>
                <button onClick={submitFilters} className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 sm:w-40 lg:h-20 sm:h-14 xs:text-sm text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    <FormattedMessage id="Submit_volcano" defaultMessage='Submit' />
                </button>
            </div>
            <div>
                <button onClick={resetFilters} className="bg-white hover:bg-gray-700 mb-3 lg:w-80 sm:w-42 lg:h-20 sm:h-14 xs:text-sm text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    <FormattedMessage id="Reset_volcano" defaultMessage='Reset' />
                </button>
            </div>
        </div>
    );
}
