import React, { useState,useEffect } from 'react'
import LollipopPlot from 'react-mutation-plot'
import UserFilesTable from './Table'


const LollipopCmp = React.forwardRef(({ width,data,gene,watermarkCss }, ref) => {
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState([])
  const mockData = {
    vizHeight: 400, // hardcoded
    vizWidth: width-400, // hardcoded
    xMax: data['width'], // protein length
    yMax: data['height'], // max #mutations
    hugoGeneSymbol: gene,
    lollipops: data['lollipop'],
    domains: data['domains']
  }
  // console.log(mockData);
  useEffect(()=>{
    if(gene!==''){
      setActive(true)
    }
  },[gene])




  const options = {
    displayDomainLabel: true,
    displayLegend: false,
    exportToPDF: false
  }

  const onLollipopClickHandler = (data) => {
    console.log('onLollipopClick', data)
  }



  return (

    <div ref={ref} id='lolipop' className={`lollipop ${watermarkCss}`}>
      {active &&
        <LollipopPlot
          domains={mockData.domains}
          lollipops={mockData.lollipops}
          vizWidth={mockData.vizWidth}
          vizHeight={mockData.vizHeight}
          hugoGeneSymbol={mockData.hugoGeneSymbol}
          xMax={mockData.xMax}
          yMax={mockData.yMax}
          onLollipopClick={onLollipopClickHandler}
          options={options}
        />
      }
    </div>
  )
})


export default LollipopCmp
