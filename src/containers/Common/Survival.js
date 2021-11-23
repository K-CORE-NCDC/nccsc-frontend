import React, { useState, useEffect } from 'react'
import '../../styles/survival.css'
import { Chart } from 'react-google-charts'
import { index } from 'd3'
import LineChart, { StairChart } from "react-linechart";
import "react-linechart/dist/styles.css";

const SurvivalCmp = React.forwardRef(({ width, data, watermarkCss, pValue }, ref) => {
  const [survivalData, setSurvivalData] = useState([])
  const [lineChartData, setLineChartData] = useState([])
  const colorArray = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#000', '#1f0cf2', '#1f0cf2']
  useEffect(() => {
    if (data.survivalJson && data.survivalJson.all) {
      setSurvivalData(data.survivalJson.all);
      let lineChartDataTemp = []
      let counter = 0
      for (const [key, value] of Object.entries(data.survivalJson.final)) {
        let color =  `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        if(counter < colorArray.length){
          color = colorArray[counter]
        }
        lineChartDataTemp.push({
          color: color,
          points: value,
          legend: key,
          id: `line-chart-${key}`,
			    name: key,
        })
        counter += 1
      }
      setLineChartData(lineChartDataTemp)
    }
  }, [data])

  return (
    <div ref={ref} className={`${watermarkCss} p-1`}>
      {/* {survivalData.length > 1 && <Chart
        width={'100%'}
        height={'600px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data.survivalJson.all}
        options={{

          explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 4.0
          },
          allowHtml: true,
          title: pValue,
          vAxis: { title: 'Recurrence rate(Max : 100%)' },
          hAxis: { title: 'Duration in Month' },
          isStacked: true,
          legend: { position: 'top' },
          chart: {
            title: 'Survival Plot Samples vs survival rate',
            subtitle: 'in Months',
          }
        }}
        rootProps={{ 'data-testid': '1' }}
      />} */}
      {/* <CanvasXpressReact target={target} data={survivalDataCanvas} config={config} width={500} height={500} /> */}
      {/* <div id="kaplanmeier1" className="kaplanmeier1"><Abc /></div> */}
      {/* <Abc /> */}
      {survivalData.length > 1 && <LineChart
        name={pValue}
        xLabel='Duration in Month'
        showLegends={true}
        legendPosition='top-right'
        yLabel='Recurrence rate(Max : 100%)'
        interpolate="step-before"
        pointRadius={1}
        onPointHover={(e) => {
          return `<div><b>duration: </b>${e.x}<br /><b>Survival Rate: </b>${e.y}<br /><b>Sample: </b>${e.sample}</div>`;
        }}
        yMin={0}
        width={900}
        height={500}
        data={lineChartData}
      />}
    </div>
  );
})

export default SurvivalCmp;
