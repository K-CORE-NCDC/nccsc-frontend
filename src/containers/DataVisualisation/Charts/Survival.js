import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SurvivalCmp from '../../Common/Survival'
import { getSurvivalInformation } from '../../../actions/api_actions'
import { exportComponentAsPNG } from 'react-component-export-image';

import LoaderCmp from '../../Common/Loader'


export default function DataSurvival({ width, inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const dispatch = useDispatch()
  const survivalJson = useSelector((data) => data.dataVisualizationReducer.survivalSummary);
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [genesArray, setGenesArray] = useState([])
  const [fileredGene, setFilteredGene] = useState("")
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (inputData) {
      if (inputData.type !== '') {
        if (fileredGene !== "") {
          setLoader(true)
          dispatch(getSurvivalInformation('POST', { ...inputData, filter_gene: fileredGene }))
        } else {
          setLoader(true)
          dispatch(getSurvivalInformation('POST', inputData))
        }
      }
      if (inputData.genes) {
        setGenesArray(inputData.genes)
      }
    }
  }, [inputData, fileredGene])


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

  return (
    <>{
      loader ?
        <LoaderCmp/>
        :
        <div className="flex flex-row justify-around">
          <div className="w-1/5">
            <select onChange={(e) => setFilteredGene(e.target.value)}
              value={fileredGene}
              className='w-full p-4 border focus:outline-none border-b-color focus:ring focus:border-b-color active:border-b-color mt-3'>
              <option value=""></option>
              {genesArray.map((gene, index) => (
                <option key={`${gene}-${index}`} value={gene}>{gene}</option>
              ))}
            </select>
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
