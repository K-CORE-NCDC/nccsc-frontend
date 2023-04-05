/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react'
import '../../styles/survival.css'
import LineChart  from "react-linechart";
import "react-linechart/dist/styles.css";
import DataTable from 'react-data-table-component';

const SurvivalCmp = React.forwardRef(({ width, data, watermarkCss, pValue }, ref) => {
  const [survivalData, setSurvivalData] = useState([])
  const [lineChartData, setLineChartData] = useState([])
  const [offsetWidth, setOffsetWidth] = useState(900)
  const [yMinValue, setYMinValue] = useState(0)
  const [xMaxValue, setXmaxValue] = useState(100)
  const [chartTable,setChartTable] = useState([])
  const colorArray = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#000', '#1f0cf2', '#1f0cf2']
  useEffect(() => {
    if (data.survivalJson && data.survivalJson.all) {
      setSurvivalData(data.survivalJson.all);
      setOffsetWidth(document.getElementById('survival').offsetWidth);
      let lineChartDataTemp = []
      let counter = 0
      let minValue = 100
      let maxXvalue = 0
      // let tableData = {}
      let tableHtmlData = []
      for (const [key, value] of Object.entries(data.survivalJson.final)) {
        // tableData[key] = [['Sample','X','Y']]
        
        let columns = [{name:"X",selector: row => row.x,},{name:"Y",selector: row => row.y},{name:"Sample",selector: row => row.sample},]
        tableHtmlData.push(
          <div className='p-3'>
            <h3 className='mb-3 text-left'>{key}</h3>
            <DataTable data={value} pagination  paginationPerPage={5}  paginationRowsPerPageOptions={[5, 15, 25, 50]} columns={columns}/>
          </div>)
        let color =  `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        if(counter < colorArray.length){
          color = colorArray[counter]
        }
        value.forEach(e=>{
          if(e.x > maxXvalue){
            maxXvalue = e.x
          }
          if(e.y < minValue){
            minValue = e.y
          }

        })
        lineChartDataTemp.push({
          color: color,
          points: value,
          legend: key,
          id: `line-chart-${key}`,
			    name: key,
        })
        counter += 1
      }
      setXmaxValue(maxXvalue+20)
      setYMinValue(minValue) //previously it was minvalue-3 
      setLineChartData(lineChartDataTemp)
      setChartTable(tableHtmlData)

      
    }
  }, [data])

  

  return (
    <div id="survival" ref={ref} className={`${watermarkCss} p-1`}>
      <div className="text-left">{pValue}</div>
      {survivalData.length > 1 && <LineChart
        name={pValue}
        xLabel='Time (in month)'
        showLegends={true}
        legendPosition='top-right'
        yLabel='Survival(%)'
        interpolate="step-before"
        pointRadius={1}
        onPointHover={(e) => {
          return `<div style='position:absolute'><b>duration: </b>${e.x}<br /><b>Survival Rate: </b>${e.y}<br /><b>Sample: </b>${e.sample}</div>`;
        }}
        yMin={yMinValue}
        xMin={0}
        xMax={xMaxValue}
        width={offsetWidth}
        height={700}
        data={lineChartData}
        tooltipClass="svg-line-chart-tooltip-custom"
      />}
      {chartTable.length>0 && <div className={'mt-20 hidden grid grid-cols-'+chartTable.length}>{chartTable}</div>}
    </div>
  );
})

export default SurvivalCmp;
