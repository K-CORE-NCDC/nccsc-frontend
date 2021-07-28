import { element } from 'prop-types';
import React, { useState,useEffect } from 'react'
import {OncoPrint} from 'react-oncoprint'
import OncoPrintCustom  from './oncoprint/OncoPrint' 

export default function OncoCmp({ width }) {
  console.log('daata')
  const [state, setState] = useState([]);
  const [colorScale, setColorScale] = useState({})


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(()=>{
    const data = [
      {
          "gene": "NCOR2",
          "type": "Intron",
          "sample": "RN52308948",
          "alteration": "NCOR2"
      },
      {
          "gene": "PELI1",
          "type": "Intron",
          "sample": "RN52308948",
          "alteration": "PELI1"
      },
      {
          "gene": "AIFM3",
          "type": "Intron",
          "sample": "RN52308948",
          "alteration": "AIFM3"
      },
      {
          "gene": "DDX56",
          "type": "Missense_Mutation",
          "sample": "RN52308948",
          "alteration": "DDX56"
      },
      {
          "gene": "PLEKHO1",
          "type": "Missense_Mutation",
          "sample": "RN52308948",
          "alteration": "PLEKHO1"
      },
      {
          "gene": "PSMD3",
          "type": "5'Flank",
          "sample": "RN52308948",
          "alteration": "PSMD3"
      },
      {
          "gene": "MGAT5",
          "type": "Silent",
          "sample": "RN52308948",
          "alteration": "MGAT5"
      },
      {
          "gene": "STYX",
          "type": "3'UTR",
          "sample": "RN52308948",
          "alteration": "STYX"
      },
      {
          "gene": "ITGAX",
          "type": "Silent",
          "sample": "RN52308948",
          "alteration": "ITGAX"
      },
      {
          "gene": "CASC5",
          "type": "Missense_Mutation",
          "sample": "RN52308948",
          "alteration": "CASC5"
      },
      {
          "gene": "C2orf54",
          "type": "Missense_Mutation",
          "sample": "RN52308948",
          "alteration": "C2orf54"
      },
      {
          "gene": "SLCO5A1",
          "type": "Intron",
          "sample": "RN52308948",
          "alteration": "SLCO5A1"
      },
      {
          "gene": "SPEG",
          "type": "Intron",
          "sample": "RN52308948",
          "alteration": "SPEG"
      },
      {
          "gene": "SYNE1",
          "type": "Missense_Mutation",
          "sample": "RN52308948",
          "alteration": "SYNE1"
      },
      {
        "sample": "TCGA-25-2392-01",
        "gene": "TP53",
        "alteration": "FUSION",
        "type": "FUSION"
    }, {
        "sample": "TCGA-25-2393-01",
        "gene": "TP53",
        "alteration": "FUSION",
        "type": "FUSION"
    }, {
        "sample": "TCGA-04-1331-01",
        "gene": "PTEN",
        "alteration": "HOMDEL",
        "type": "CNA"
    }, {
        "sample": "TCGA-04-1365-01",
        "gene": "PTEN",
        "alteration": "HOMDEL",
        "type": "CNA"
    }, {
        "sample": "TCGA-04-1648-01",
        "gene": "TP53",
        "alteration": "HOMDEL",
        "type": "CNA"
    }, {
        "sample": "TCGA-09-1666-01",
        "gene": "PTEN",
        "alteration": "AMP",
        "type": "CNA"
    }, {
        "sample": "TCGA-13-0720-01",
        "gene": "PTEN",
        "alteration": "HOMDEL",
        "type": "CNA"
    }, {
        "sample": "TCGA-13-0801-01",
        "gene": "BRCA1",
        "alteration": "HOMDEL",
        "type": "CNA"
    }, {
        "sample": "TCGA-13-0801-01",
        "gene": "PTEN",
        "alteration": "HOMDEL",
        "type": "CNA"
    }, {
        "sample": "TCGA-13-0905-01",
        "gene": "PTEN",
        "alteration": "HOMDEL",
        "type": "CNA"
    }
      
  ]  

  let colorScaleData = {}
  data.forEach(element =>{
    colorScaleData = {...colorScaleData, [element.alteration]: {colorHTML: getRandomColor(), displayName: element.type}}
  })

  setColorScale(colorScaleData)
   setState(data)
  },[])

  console.log(colorScale);
  console.log(Object.keys(colorScale));
  return (
    <div className='onco' id='onco'>
      {Object.keys(colorScale).length > 0 && <OncoPrintCustom SupportedEvents={colorScale} colorccale={colorScale} data={state}/>}
      test
    </div>
  )
}
