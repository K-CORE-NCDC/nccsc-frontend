import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';
import GroupFilters from '../../Common/GroupFilter'

import LoaderCmp from '../../Common/Loader'


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

  useEffect(() => {
    if (inputData) {
      if (inputData.type !== '') {
        if (fileredGene !== "") {
          setLoader(true)
          dispatch(getSurvivalInformation('POST', {
            ...inputData,
            filter_gene: fileredGene,
            gene_database: geneDatabase,
            group_filters: groupFilters
          }))
        } else {
          setLoader(true)
          dispatch(getSurvivalInformation('POST', inputData))
        }
      }
    }
  }, [inputData, groupFilters])

  useEffect(() => {
    if (inputData && inputData.genes) {
      setGenesArray(inputData.genes)
    }
  }, [inputData])

  useEffect(() => {
    if(fileredGene !== ""){
      setShowClinicalFilters(true)
    }
  }, [fileredGene])


  useEffect(() => {
    setTimeout(function () {
      setLoader(false)
    }, (1000));
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

  return (
    <>{
      loader ?
        <LoaderCmp />
        :
        <div className="flex flex-row justify-around">
          <div className="w-1/5 border bg-white">
            <div className="m-1 p-1">
              <h6 className="text-blue-700 text-lg  font-bold mb-2 text-left" htmlFor="dropdown-gene">Select Gene</h6>
              <select id="dropdown-gene" onChange={(e) => setFilteredGene(e.target.value)}
                defaultValue={fileredGene}
                className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                <option value=""></option>
                {genesArray.map((gene, index) => (
                  <option key={`${gene}-${index}`} value={gene}>{gene}</option>
                ))}
              </select>
            </div>
            <div className="m-1 p-1">
              <h6 className="text-blue-700 text-lg  font-bold mb-1 text-left" htmlFor="dropdown-database">Select Database</h6>
              <select id="dropdown-database" onChange={(e) => setGeneDatabase(e.target.value)}
                defaultValue={geneDatabase}
                className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
                <option value="dna_mutation">DNA Mutation</option>
                <option value="rna">RNA</option>
                <option value="methylation">DNA Methylation</option>
              </select>
            </div>
            {showClinicalFilters && <GroupFilters parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
          </div>
          <div className="w-4/5">
            <SurvivalCmp watermarkCss={watermarkCss} ref={reference} width={width} data={
              {
                fileredGene: fileredGene,
                survivalJson: survivalJson
              }
            } />
          </div>
        </div>
    }
    </>
  )
}
