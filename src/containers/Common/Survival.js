/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react'
import '../../styles/survival.css'
import LineChart from "react-linechart";
import "react-linechart/dist/styles.css";
import DataTable from 'react-data-table-component';

const SurvivalCmp = React.forwardRef(({ width, data, watermarkCss, pValue }, ref) => {
  const [survivalData, setSurvivalData] = useState([])
  const [lineChartData, setLineChartData] = useState([])
  const [offsetWidth, setOffsetWidth] = useState(900)
  const [yMinValue, setYMinValue] = useState(0)
  const [xMaxValue, setXmaxValue] = useState(100)
  const [chartTable, setChartTable] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const colorArray = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#000', '#1f0cf2', '#1f0cf2']

  useEffect(() => {
    if (data.survivalJson && data.survivalJson.all) {
      setSurvivalData(data.survivalJson.all);
      setOffsetWidth(document.getElementById('survival').offsetWidth);
      let lineChartDataTemp = []
      let counter = 0
      let minValue = 100
      let maxXvalue = 0
      let tableHtmlData = []
      for (const [key, value] of Object.entries(data.survivalJson.final)) {

        let columns = [{ name: "X", selector: row => row.x, }, { name: "Y", selector: row => row.y }, { name: "Sample", selector: row => row.sample },]
        tableHtmlData.push(
          <div className='p-3'>
            <h3 className='mb-3 MultiUploadTextCenter'>{key}</h3>
            <DataTable data={value} pagination paginationPerPage={5} paginationRowsPerPageOptions={[5, 15, 25, 50]} columns={columns}
              customStyles={{
                table: {
                  border: '1px solid black',
                },
                pagination: {
                  style: {
                      gap:"10px"
                  }
                }      
              }}
            />
          </div>)
        let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        if (counter < colorArray.length) {
          color = colorArray[counter]
        }
        value.forEach(e => {
          if (e.x > maxXvalue) {
            maxXvalue = e.x
          }
          if (e.y < minValue) {
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
      setXmaxValue(maxXvalue + 20)
      setYMinValue(minValue - 1) //previously it was minvalue-3 
      setLineChartData(lineChartDataTemp)
      setChartTable(tableHtmlData)


    }
  }, [data])

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };
  

  return (
    <div id="survival" ref={ref} className={`${watermarkCss} P1 OverFlowXHide`} onMouseMove={handleMouseMove}>
      <div className="TextLeft M4">{pValue}</div>
      {survivalData.length > 1 && <LineChart
        name={pValue}
        xLabel='Time (in month)'
        showLegends={true}
        legendPosition='top-center'
        yLabel='Survival(%)'
        interpolate="step-before"
        pointRadius={1}
        // onPointHover={(e) => {
        //   return `<div style='position:absolute'><b>duration: </b>${e.x}<br /><b>Survival Rate: </b>${e.y}<br /><b>Sample: </b>${e.sample}</div>`;
        // }}
        onPointHover={(e) => {
          const tooltipStyle = `
            position: fixed;
            left: ${mousePosition.x + 10}px;
            top: ${mousePosition.y + 20}px;
            background:#fff;

          `;

          return `<div style='${tooltipStyle}'><b>duration: </b>${e.x}<br /><b>Survival Rate: </b>${e.y}<br /><b>Sample: </b>${e.sample}</div>`;
        }}

        yMin={yMinValue}
        xMin={0}
        xMax={xMaxValue}
        width={offsetWidth}
        height={700}
        data={lineChartData}
        tooltipClass="svg-line-chart-tooltip-custom"
      />}
      {chartTable.length > 0 && <div style={{ gap: '100px' }} className={'M4 PopoverStyles'}>{chartTable}</div>}
    </div>
  );
})

export default SurvivalCmp;
