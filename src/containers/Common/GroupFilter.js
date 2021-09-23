import React, { useState, useEffect } from 'react';

const GroupFilters = ({ parentCallback, groupFilters }) => {
    const [filterSelected, setFilterSelected] = useState('')
    const [selectedFilterDetails, setSelectedFilterDetails] = useState({})
    const [filterInputs, setFilterInputs] = useState([])
    const [userGivenInputValues, setUserGivenInputValues] = useState({})
    const [showAddGroupButton, setShowAddGroupButton] = useState(false)
    const [groupsCounter, setGroupsCounter] = useState(1)
    const [prevStateFilters, setPrevStateFilters] = useState([])
    const [isFilterResetHappened, setIsFilterResetHappened] = useState(false)
    console.log(groupsCounter);

    const LabelCss = "block text-left text-blue-700 text-lg  font-bold mb-2"
    const checkBoxCss = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const numberInputBoxCss = "shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    let filterChoices = [
        { 'type': 'static', 'name': 'sex', 'id': 'sex_cd', options: ['Male', 'Female'] },
        { 'type': 'number', 'name': 'Age Of Diaganosis', 'id': 'diag_age', 'input': 'number' },
        { 'type': 'number', 'id': 'bmi_vl', 'name': 'Body Mass Index', 'input': 'number' },
        { 'type': 'boolean', 'id': 'bila_cncr_yn', 'name': 'Diagnosis of Bilateral Breast Cancer' },
        { 'type': 'boolean', 'name': 'Current Smoker', 'id': 'smok_curr_yn' },
        { 'type': 'boolean', 'name': 'Former Smoker', 'id': 'smok_yn' },
        { 'type': 'boolean', 'name': 'alcohol_consuption', 'id': 'drnk_yn', 'value': 'Yes' },
        { 'type': 'boolean', 'name': 'Family History of Breast Cancer', 'id': 'fmhs_brst_yn', 'value': 'Yes' },
        { 'type': 'number', 'name': 'First Menstural Age', 'id': 'mena_age', 'input': 'number' },
        { 'type': 'boolean', 'name': 'Menopause', 'id': 'meno_yn' },
        { 'type': 'boolean', 'name': 'childbirth', 'id': 'delv_yn' },
        { 'type': 'boolean', 'name': 'Experience of Breastfeeding', 'id': 'feed_yn' },
        { 'type': 'number', 'name': 'Duration of Breastfeeding (1-24 M)', 'id': 'feed_drtn_mnth', 'input': 'number' },
        { 'type': 'boolean', 'name': 'Intake of Oral Contraceptive Pill', 'id': 'oc_yn' },
        { 'type': 'boolean', 'name': 'Hormone Replacement Therapy', 'id': 'hrt_yn' },
        { 'type': 'number', 'name': 'T Stage', 'id': 't_category', 'input': 'number' },
        { 'type': 'text', 'name': 'N Stage', 'id': 'n_category', 'input': 'text' },
        { 'type': 'text', 'name': 'HER2 Score', 'id': 'her2_score', 'input': 'text' },
        { 'type': 'text', 'name': 'ki67', 'id': 'ki67_score', 'input': 'text' },
        { 'type': 'number', 'name': 'Relapse Duration', 'id': 'rlps_cnfr_drtn', 'input': 'number' },
        { 'type': 'boolean', 'name': 'Relapse Yes or No', 'id': 'rlps_yn' },
    ]

    const submitFilters = () => {
        if(isFilterResetHappened){
            parentCallback(userGivenInputValues)
        }else{
            parentCallback({...userGivenInputValues, ...groupFilters})
        }
    }

    const resetFilters = () => {
        setFilterSelected('')
        setSelectedFilterDetails({})
        setFilterInputs([])
        setUserGivenInputValues({})
        setShowAddGroupButton(false)
        setGroupsCounter(1)
        setIsFilterResetHappened(true)
    }

    const updateSelectedFilter = (e) => {
        resetFilters()
        setIsFilterResetHappened(true)
        const targetValue = e.target.value
        if (targetValue !== '') {
            setFilterSelected(filterChoices[parseInt(targetValue)].name)
            setSelectedFilterDetails(filterChoices[parseInt(targetValue)])
        } else {
            setFilterSelected('')
            setSelectedFilterDetails({})
        }
        setGroupsCounter(1)
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

            ////////
            if (filterType === 'text' | filterType === 'number') {
                console.log(counter)
                setPrevStateFilters(valsArray)
                setGroupsCounter(counter)
            }
        }
    }, [])




    const componetSwitch = (compCase, groupLabels = null) => {
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
                return (
                    <div key={`${compCase}-${groupsCounter}${Math.random()}`} className="mb-4">
                        <div>
                            <div className={LabelCss} htmlFor="username">
                                {`Group ${groupsCounter}`}
                            </div>
                            <div>
                                <input onChange={onChangeFilterInput} className={numberInputBoxCss} name={`${groupsCounter}_from`} type="number" placeholder="from" >
                                </input>
                                <input onChange={onChangeFilterInput} className={numberInputBoxCss} name={`${groupsCounter}_to`} type="number" placeholder="to" >
                                </input>
                            </div>
                        </div>
                    </div>
                )
            case "text":
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

    useEffect(() => {
        let filterType = selectedFilterDetails.type
        if (filterType) {
            let componentData = []
            console.log('this after state update');

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
                setShowAddGroupButton(true)
                setUserGivenInputValues({ column: selectedFilterDetails.id, type: filterType })
                componentData.push(componetSwitch('number'))
            } else if (filterType === "text") {
                setShowAddGroupButton(true)
                setUserGivenInputValues({ column: selectedFilterDetails.id, type: selectedFilterDetails.type })
                componentData.push(componetSwitch('text'))
            }
            if(prevStateFilters.length>0){
                setFilterInputs([...prevStateFilters])
            }else{
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
                <div className="block text-left text-blue-700 text-lg  font-bold mb-2">
                    Clinical Filters
                </div>
                <select
                    onChange={updateSelectedFilter}
                    defaultValue={filterSelected}
                    className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                    <option value=''></option>
                    {filterChoices.map((type, index) => (
                        <option selected={filterSelected === type.name} className="text-lg" key={type.name} value={index}>{type.name}</option>
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
                <button onClick={submitFilters} className="bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    Submit
                </button>
            </div>}
            {filterSelected && <div>
                <button onClick={resetFilters} className="bg-white hover:bg-gray-700 mb-3 w-80 h-20 text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    Reset
                </button>
            </div>}
        </div>
    );
}

export default GroupFilters;