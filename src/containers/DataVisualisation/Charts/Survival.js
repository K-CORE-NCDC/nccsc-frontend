import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
import GroupFilters, { PreDefienedFilters } from '../../Common/GroupFilter'
import NoContentMessage from '../../Common/NoContentComponent'

import LoaderCmp from '../../Common/Loader'

const selectedCss = "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 ease-in-out border-gray-600 transition"
const nonSelectedCss = "w-1/2 rounded-l-none border-l-0 hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border duration-200 ease-in-out border-teal-600 transition"

export default function DataSurvival({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);
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

  const submitFitersAndFetchData = () => {
    if (fileredGene !== "") {
      setLoader(true)
      if (filterTypeButton === 'clinical') {
        dispatch(getSurvivalInformation('POST', {
          ...inputData,
          filter_gene: fileredGene,
          gene_database: geneDatabase,
          group_filters: groupFilters
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
              {`${e} : ${sampleCountsObject[e]}`}
            </div>
          )
        })
      }
      if (htmlArray.length > 1) {
        setSampleCountsCard([
          <div key='total' className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue">
            Total : {totalCount}
          </div>,
          ...htmlArray
        ])
      } else {
        setSampleCountsCard([
          <div key='total' className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue">
            Total : {totalCount}
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
        <div className="flex flex-row justify-around">
          <div className="w-1/5 border bg-white">
          <h6 className="p-4 ml-1 text-left text-bold text-blue-700">Choose Filter group</h6>
          <div className="m-1 flex flex-row justify-around">
              <button onClick={() => setUserDefienedFilter('static')}
                className={userDefienedFilter === 'static' ? selectedCss : nonSelectedCss}
              >
                Static
              </button>
              <button onClick={() => setUserDefienedFilter('dynamic')}
                className={userDefienedFilter === 'dynamic' ? selectedCss : nonSelectedCss}
              >
                Dynamic
              </button>
            </div>
            <h6 className="ml-1 mt-1 p-4 text-left text-bold text-blue-700">Choose Filter Type</h6>
            {sampleCountsCard.length > 0 && <div className="m-1 p-1 border border-black border-dashed">
              {sampleCountsCard}
            </div>}
            <div className="m-1 flex flex-row justify-around">
              <button onClick={() => setFilterTypeButton('clinical')} id='Mutation' name='type'
                className={filterTypeButton === 'clinical' ? selectedCss : nonSelectedCss}
              >
                Clinical
              </button>
              <button onClick={() => setFilterTypeButton('omics')} id='Phospho' name='type'
                className={filterTypeButton === 'omics' ? selectedCss : nonSelectedCss}
              >
                Omics
              </button>
            </div>
            <div className="m-1 p-1">
              <h6 className="text-blue-700 text-lg  font-bold mb-2 text-left" htmlFor="dropdown-gene">Select Gene</h6>
              <select id="dropdown-gene" onChange={(e) => setFilteredGene(e.target.value)}
                defaultValue={fileredGene}
                className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                <option selected={fileredGene === ""} value=""></option>
                {genesArray.map((gene, index) => (
                  <option selected={fileredGene === gene} key={`${gene}-${index}`} value={gene}>{gene}</option>
                ))}
              </select>
            </div>
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
            {((filterTypeButton === 'clinical')  && (userDefienedFilter === 'static')) && <PreDefienedFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
            {((filterTypeButton === 'clinical') && (userDefienedFilter === 'dynamic')) && <GroupFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
            {(filterTypeButton === 'omics') &&  <div>
              <div>
                <button onClick={submitFitersAndFetchData} className="bg-main-blue hover:bg-main-blue mb-3 w-80 h-20 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                  Submit
                </button>
              </div>
              <div>
                <button className="bg-white hover:bg-gray-700 mb-3 w-80 h-20 text-black hover:text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded">
                  Reset
                </button>
              </div>
            </div>}
          </div>
          <div className="w-4/5">
            {renderSurvival && <SurvivalCmp watermarkCss={watermarkCss} ref={reference} width={width} data={
              {
                fileredGene: fileredGene,
                survivalJson: survivalJson
              }
            } />}
            {renderNoContent && <NoContentMessage />}
          </div>
        </div>
    }
    </>
  )
}
