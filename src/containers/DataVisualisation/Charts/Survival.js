import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation,getClinicalMaxMinInfo } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
import GroupFilters, { PreDefienedFiltersSurvival } from '../../Common/GroupFilter'
import NoContentMessage from '../../Common/NoContentComponent'
import {AdjustmentsIcon} from '@heroicons/react/outline'

import LoaderCmp from '../../Common/Loader'
import { FormattedMessage } from 'react-intl';

const selectedCss = "w-1/2 rounded-r-none  hover:scale-110 xs:h-14 xs:text-sm focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition"
const nonSelectedCss = "w-1/2 rounded-l-none border-l-0 xs:h-14 xs:text-sm hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition"

export default function DataSurvival({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);
  const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [genesArray, setGenesArray] = useState([])
  const [fileredGene, setFilteredGene] = useState("")
  const [loader, setLoader] = useState(true)
  const [groupFilters, setGroupFilters] = useState({})
  const [geneDatabase, setGeneDatabase] = useState('dna_mutation')
  const [showClinicalFilters, setShowClinicalFilters] = useState(false)
  const [sampleCountsCard, setSampleCountsCard] = useState([])
  const [renderSurvival, setRenderSurvival] = useState(true)
  const [renderNoContent, setRenderNoContent] = useState(false)
  const [filterTypeButton, setFilterTypeButton] = useState('clinical')
  const [userDefienedFilter, setUserDefienedFilter] = useState('static')
  const [pValueData, setPvalueData] = useState("")
  const [smallScreen, setSmallScreen] = useState(false)

  useEffect(()=>{
    if(!clinicalMaxMinInfo){
      dispatch(getClinicalMaxMinInfo('GET',{}))
    }
  },[])

  const submitFitersAndFetchData = () => {
    if ((fileredGene !== "") || (filterTypeButton === 'clinical')) {
      setLoader(true)
      inputData['filterType'] = userDefienedFilter
      if (filterTypeButton === 'clinical') {
        dispatch(getSurvivalInformation('POST', {
          ...inputData,
          filter_gene: fileredGene,
          gene_database: geneDatabase,
          group_filters: groupFilters,
          
          clinical: true
        }))
      } else {
        dispatch(getSurvivalInformation('POST', {
          ...inputData,
          filter_gene: fileredGene,
          gene_database: geneDatabase
        }))
      }
    } else {
      setLoader(true)
      dispatch(getSurvivalInformation('POST', inputData))
    }
  }

  useEffect(() => {
    if (inputData) {
      if (inputData.type !== '') {
        submitFitersAndFetchData()
      }
    }
  }, [inputData, groupFilters])

  useEffect(() => {
    if (inputData && inputData.genes) {
      setGenesArray(inputData.genes)
    }
  }, [inputData])

  useEffect(() => {
    if (fileredGene !== "") {
      setShowClinicalFilters(true)
    }
  }, [fileredGene])


  useEffect(() => {
    setTimeout(function () {
      setLoader(false)
    }, (1000));
    if (survivalJson && survivalJson.sample_counts) {
      const sampleCountsObject = survivalJson.sample_counts
      let totalCount = 0
      let htmlArray = []
      if (Object.keys(sampleCountsObject).length > 0) {
        Object.keys(sampleCountsObject).map(e => {
          totalCount += sampleCountsObject[e]
          htmlArray.push(
            <div key={e} className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue">
              <FormattedMessage id={e} defaultMessage={e} /> {`: ${sampleCountsObject[e]}`}
            </div>
          )
        })
      }
      if (htmlArray.length > 1) {
        // setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)} / R-Value : ${survivalJson.rvalue.toFixed(6)}`)
        setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`)
        setSampleCountsCard([
          <div key='total' className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue">
            <FormattedMessage id="Total" defaultMessage='Total' /> : {totalCount}
          </div>,
          ...htmlArray
        ])
      } else {
        setPvalueData(`P-Value : ${survivalJson.pvalue.toPrecision(3)}`)
        setSampleCountsCard([
          <div key='total' className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue">
            <FormattedMessage id="Total" defaultMessage='Total' /> : {totalCount}
          </div>
        ])
      }
    }
  }, [survivalJson])

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }

    if (watermarkCss !== "" && screenCapture) {
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])

  const updateGroupFilters = (filtersObject) => {
    // console.log(filtersObject);
    if (filtersObject) {
      setGroupFilters(filtersObject)
    }
  }

  useEffect(() => {
    if (survivalJson && survivalJson.status === 200) {
      setRenderNoContent(false)
      setRenderSurvival(true)
    } else {
      setRenderNoContent(true)
      setRenderSurvival(false)
    }
  }, [survivalJson])

  return (
    <>{
      loader ?
        <LoaderCmp />
        :
        <div className="grid grid-row-3">
          <div className="">
              <button className="float-left bg-blue-500 xs:ml-8 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={()=>setSmallScreen(!smallScreen)}
              type="button">
                <AdjustmentsIcon className="h-6 w-6 inline"/>
              </button>
          </div>
          <div className="flex flex-row justify-around">
            <div className={`border bg-white ${smallScreen?" xs:z-10 xs:opacity-95 xs:bg-white":"xs:hidden"}`}>
              {sampleCountsCard.length > 0 && <div className="m-1 p-1 border border-black border-dashed">
                {sampleCountsCard}
              </div>}
              <h6 className="p-4 ml-1 text-left text-bold xs:text-xl text-blue-700">
                <FormattedMessage id="Choose Filter group" defaultMessage='Choose Filter group' />
              </h6>
              <div className="m-1 flex flex-row justify-around">
                <button onClick={() => {setUserDefienedFilter('static');setGroupFilters({})}}
                  className={userDefienedFilter === 'static' ? selectedCss : nonSelectedCss}
                >
                  <FormattedMessage id="Static_volcano" defaultMessage='Static' />
                </button>
                <button onClick={() => {setUserDefienedFilter('dynamic');setGroupFilters({})}}
                  className={userDefienedFilter === 'dynamic' ? selectedCss : nonSelectedCss}
                >
                  <FormattedMessage id="Dynamic_volcano" defaultMessage='Dynamic' />
                </button>
              </div>
              <h6 className="ml-1 mt-1 p-4 text-left text-bold xs:text-xl text-blue-700">Choose Filter Type</h6>
              <div className="m-1 flex flex-row justify-around">
                <button onClick={() => setFilterTypeButton('clinical')} id='Mutation' name='type'
                  className={filterTypeButton === 'clinical' ? selectedCss : nonSelectedCss}
                >
                  <FormattedMessage id="Clinical" defaultMessage='Clinical' />
                </button>
                <button onClick={() => setFilterTypeButton('omics')} id='Phospho' name='type'
                  className={filterTypeButton === 'omics' ? selectedCss : nonSelectedCss}
                >
                  <FormattedMessage id="Omics" defaultMessage='Omics' />
                </button>
              </div>
              {(filterTypeButton === 'omics') && <div className="m-1 p-1">
                <h6 className="text-blue-700 text-lg  font-bold mb-2 text-left" htmlFor="dropdown-gene"><FormattedMessage id="Select Gene" defaultMessage='Select Gene' /></h6>
                <select id="dropdown-gene" onChange={(e) => setFilteredGene(e.target.value)}
                  defaultValue={fileredGene}
                  className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                  <option selected={fileredGene === ""} value=""></option>
                  {genesArray.map((gene, index) => (
                    <option selected={fileredGene === gene} key={`${gene}-${index}`} value={gene}>{gene}</option>
                  ))}
                </select>
              </div>}
              {(filterTypeButton === 'omics') && <div className="m-1 p-1">
                <h6 className="text-blue-700 text-lg  font-bold mb-1 text-left" htmlFor="dropdown-database">Select Database</h6>
                <select id="dropdown-database" onChange={(e) => setGeneDatabase(e.target.value)}
                  defaultValue={geneDatabase}
                  className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                  <option selected={geneDatabase === 'dna_mutation'} value="dna_mutation">DNA Mutation</option>
                  <option selected={geneDatabase === 'rna'} value="rna">RNA Expression</option>
                  <option selected={geneDatabase === 'proteome'} value="proteome">Global Proteome</option>
                </select>
              </div>}
              {((filterTypeButton === 'clinical') && (userDefienedFilter === 'static')) && <PreDefienedFiltersSurvival type='survival' parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
              {((filterTypeButton === 'clinical') && (userDefienedFilter === 'dynamic')) && <GroupFilters viz_type='survival' parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
              {(filterTypeButton === 'omics') && <div>
                <div>
                  <button onClick={submitFitersAndFetchData} className="bg-main-blue hover:bg-main-blue mb-3 lg:w-80 xs:w-32 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    <FormattedMessage id="Submit_volcano" defaultMessage='Submit' />
                  </button>
                </div>
                <div>
                  <button className="bg-white hover:bg-gray-700 mb-3 w-80 h-20 xs:w-20 lg:w-80 xs:w-32 text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                    <FormattedMessage id="Reset_volcano" defaultMessage='Reset' />
                  </button>
                </div>
              </div>}
            </div>
            <div className="lg:w-4/5 xs:w-full">
              {renderSurvival && <SurvivalCmp
                watermarkCss={watermarkCss}
                ref={reference} width={width}
                data={
                  {
                    fileredGene: fileredGene,
                    survivalJson: survivalJson
                  }
                }
                pValue={pValueData}
              />}
              {renderNoContent && <NoContentMessage />}
            </div>
          </div>
        </div>
    }
    </>
  )
}
