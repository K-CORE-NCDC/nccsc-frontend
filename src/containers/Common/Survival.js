import React, { useState, useEffect } from 'react'
import '../../styles/survival.css'
import { Chart } from 'react-google-charts'
import { index } from 'd3'
import CanvasXpressReact from 'canvasxpress-react';

const SurvivalCmp = React.forwardRef(({ width, data, watermarkCss }, ref) => {
  const [survivalData, setSurvivalData] = useState([])
  useEffect(() => {
    if (data.survivalJson && data.survivalJson.all) {
      setSurvivalData(data.survivalJson.all);
    }
  }, [data])

  return (
    <div ref={ref} className={`${watermarkCss} p-1`}>
      {survivalData.length > 1 && <Chart
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
          title: "Survival Plot",
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
      />}
      {/* <CanvasXpressReact target={target} data={survivalDataCanvas} config={config} width={500} height={500} /> */}
      {/* <div id="kaplanmeier1" className="kaplanmeier1"><Abc /></div> */}
      {/* <Abc /> */}
    </div>
  );
})

export default SurvivalCmp;
