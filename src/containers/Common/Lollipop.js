import React, { useState,useEffect } from 'react'
import LollipopPlot from 'react-mutation-plot'
import $ from "jquery";


const LollipopCmp = React.forwardRef(({ type,width,data,gene,watermarkCss }, ref) => {
  const [active, setActive] = useState(false)
  let _width = width < 400 ? 800 : width -400 
  const mockData = {
    vizHeight: 400, // hardcoded
    vizWidth: _width, // hardcoded
    xMax: data['width'], // protein length
    yMax: data['height'], // max #mutations
    hugoGeneSymbol: gene,
    lollipops: data['lollipop'],
    domains: data['domains'],
    
  }
  useEffect(()=>{
    if(gene!==''){
      setActive(true)
    }
  },[gene])


  useEffect(()=>{
    if(active){
      $('svg g:last-child text').each(function(i,item){
        let  t = item.textContent
        if ( t.indexOf('#')!==-1){
          if(type==="Mutation"){
            $(this).text(gene+" Mutations")
          } else {
            $(this).text(gene+" Phosphorylation")
          }
        }
      })
    }
    
  },[active])

  const options = {
    displayDomainLabel: true,
    displayLegend: false,
    exportToPDF: false,
    label:'sameer'
  }

  const onLollipopClickHandler = (data) => {
  }



  return (

    <div ref={ref} id='lolipop' className={`lollipop ${watermarkCss}`} style={{overflowX:'auto'}}>
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
