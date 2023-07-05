import React, { useState, useEffect } from 'react'
import { GeneInfo } from '../../../actions/api_actions'
import { useParams, useHistory } from "react-router-dom";
import LoaderCmp from '../../Common/Loader';
import chart_types from '../../DataSummary/genomicCharyTypes'
export default function DataGenomic({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
    console.log('load genomic called-----')
    const [loader, setLoader] = useState(false)
    // const [genomicJson, setGenomicJson] = useState({ data: [], domains: [], status: 204 })
    const history = useHistory();
    const [activeCmp, setActiveCmp] = useState(true)
    let { project_id } = useParams();
    const [summaryJson, setSummaryJson] = useState({})
    const [summaryJsonStatus, setSummaryJsonStatus] = useState(204)
    const [state, setState] = useState({ "charts": [] });


    useEffect(() => {
        if (project_id && activeCmp) {
            let dataJson = { "project_id": project_id }

            let data = GeneInfo('POST', dataJson)
            data.then((result) => {
                if (result.status === 200) {
                    setSummaryJson(result.data)
                    setSummaryJsonStatus(200)
                }
                else {
                    setSummaryJson({})
                    setSummaryJsonStatus(204)
                }
            })
            setActiveCmp(false)
        }
    }, [project_id, activeCmp])

    let visual_type = {
        "Variant Classification": "Bar",
        "Variant Type": "Bar",
        "SNV Class": "Bar",
        "Top 10 Mutated Genes": "stack_bar",
        "Variant Classification Summary": 'box_plot',
    }

    useEffect(() => {
        if (summaryJsonStatus === 200 && summaryJson) {
            let html = []
            Object.keys(summaryJson).forEach((item, k) => {
                let type = visual_type[item]
                let comp = ''
                if (item === "dna_per_sample") {
                    comp = chart_types(type, summaryJson[item], "x-axis")
                }
                else {
                    comp = chart_types(type, summaryJson[item], '')
                }

                html.push(
                    <li key={'omics_' + k} className='max-w bg-white rounded overflow-hidden shadow-lg px-4 py-3 mb-5 mx-3 card-border'>
                        <div className="px-6 py-4">
                            <div className="font-bold lg:text-2xl sm:text-xl md:text-xl mb-2">{item}</div>
                        </div>

                        <div className="lg:px-6 md:px-3 sm:px-0 sm:pt-1 lg:pt-4 md:pt-1 pb-4">
                            {comp}
                        </div>

                    </li>

                )
            })
            setState((prevState) => ({
                ...prevState,
                'charts': html
            }))

            setTimeout(function () {
                setLoader(false)
            }, (1000));
        }
    }, [summaryJson, summaryJsonStatus])

    return (
        <>
            {
                loader ?
                    <LoaderCmp />


                    :
                    <div className="genomic ptn">
                        <div className="auto">
                            {
                                state['charts']
                                &&
                                <div className='dataList singleDataViz'>
                                    <ul >
                                        {state['charts']}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>

            }
        </>
    )
}