/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import LineChart from 'react-linechart';
import 'react-linechart/dist/styles.css';
import '../../styles/survival.css';
import Table from './Table/ReactTable';
import { FormattedMessage, useIntl } from 'react-intl';


const SurvivalCmp = React.forwardRef(({ data, watermarkCss, pValue, survialType }, ref) => {
  const [survivalData, setSurvivalData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [changeLegend, setChangeLegend] = useState(true);
  const [offsetWidth, setOffsetWidth] = useState(900);
  const [yMinValue, setYMinValue] = useState(0);
  const [xMaxValue, setXmaxValue] = useState(100);
  const [chartTable, setChartTable] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const colorArray = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#000', '#1f0cf2', '#1f0cf2'];
  const intl = useIntl();
  useEffect(() => {
    if (data.survivalJson && data.survivalJson.all) {
      setSurvivalData(data.survivalJson.all);
      setOffsetWidth(document.getElementById('survival').offsetWidth);
      let lineChartDataTemp = [];
      let counter = 0;
      let minValue = 100;
      let maxXvalue = 0;
      for (let [key, value] of Object.entries(data.survivalJson.final)) {
        let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        if (counter < colorArray.length) {
          color = colorArray[counter];
        }
        value.forEach((e) => {
          if (e.x > maxXvalue) {
            maxXvalue = e.x;
          }
          if (e.y < minValue) {
            minValue = e.y;
          }
        });
        lineChartDataTemp.push({
          color: color,
          points: value,
          legend: key,
          id: `line-chart-${key}`,
          name: key
        });
        counter += 1;
      }
      setXmaxValue(maxXvalue + 20);
      setYMinValue(minValue - 1); //previously it was minvalue-3
      setLineChartData(lineChartDataTemp);
      changeLegendFunc()
    }
  }, [data]);


  useEffect(() => {
    if (data.survivalJson && data.survivalJson.all) {
      let tableHtmlData = [];
      for (let [key, value] of Object.entries(data.survivalJson.final)) {
        let filteredValue = value.filter(obj => obj.sample !== "");
        let columns = [
          { Header: intl.formatMessage({ id: "TimeInMonth", defaultMessage: 'Time (in month)' }), accessor: (row) => row.x },
          { Header: survialType === 'recurrence' ? intl.formatMessage({ id: "Recurrence", defaultMessage: 'Recurrence-free' }) : intl.formatMessage({ id: "Survival", defaultMessage: 'Survival' }), accessor: (row) => row.y },
          { Header: 'Sample', accessor: (row) => row.sample }
        ];
        if (filteredValue.length === 0) {
          tableHtmlData.push(
            <div className="p-3 SurvivalNoData" key={key}>
              <h3 className="NoData">{key}</h3>
              <p>No data found</p>
            </div>
          );
        }
        else {
          tableHtmlData.push(
            <div className="p-3" key={key}>
              <h3 className="mb-3 MultiUploadTextCenter">{key}</h3>
              <Table
                data={filteredValue}
                columns={columns}
              />
            </div>
          );
        }
        setChartTable(tableHtmlData);
      }
    }
  }, [data?.survivalJson]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });

  };

  const changeLegendFunc = () => {
    var svg = document.getElementsByClassName('legend')
    if (svg.length > 0 && changeLegend) {
      for (let index = 0; index < svg.length; index++) {
        const element = svg[index];
        var rectNode = element.childNodes[0]
        var textNode = element.childNodes[1]
        var l = textNode.textContent.length


        let rectTransform = rectNode.getAttribute('transform').split(",")
        let rectTransformx = parseInt(rectTransform[0].replace(/^\D+/g, ''))
        rectTransformx = rectTransformx - l - 20
        let rectTransformy = rectTransform[1].replace(/^\D+/g, '')
        rectTransformy = parseInt(rectTransformy.replace(')', ''))
        rectNode.setAttribute('transform', 'translate(' + rectTransformx + ',' + rectTransformy + ')')

        let textNodeTransform = textNode.getAttribute('transform').split(",")
        let textNodeTransformx = parseInt(textNodeTransform[0].replace(/^\D+/g, ''))
        textNodeTransformx = textNodeTransformx - l - 20
        let textNodeTransformy = textNodeTransform[1].replace(/^\D+/g, '')
        textNodeTransformy = parseInt(textNodeTransformy.replace(')', ''))
        textNode.setAttribute('transform', 'translate(' + textNodeTransformx + ',' + textNodeTransformy + ')')
      }
      setChangeLegend(false)
    }
  }


  return (
    <div>
      <div
        id="survival"
        ref={ref}
        className={`${watermarkCss} P1 OverFlowXHide`}
        onMouseMove={handleMouseMove}
      >
        <div className="TextLeft M4">{pValue}</div>
        {survivalData.length > 1 && (
          <LineChart
            name={pValue}
            id='my_dataviz'
            xLabel="Time (in month)"
            showLegends={true}
            legendPosition="top-right"
            yLabel="Survival(%)"
            interpolate="step-before"
            pointRadius={1}
            onPointHover={(e) => {
              const tooltipStyle = `
            position: fixed;
            left: ${mousePosition.x + 10}px;
            top: ${mousePosition.y + 20}px;
            background:#fff;
          `;

              return `<div style='${tooltipStyle}'><b>duration: </b>${e.x}<br /><b>Survival Rate: </b>${e.y}<br /><b>Sample: </b>${e.sample}</div>`;
            }}
            margin={{ top: 50, right: 100, bottom: 50, left: 55 }}
            yMin={yMinValue}
            xMin={0}
            xMax={xMaxValue}
            width={offsetWidth}
            height={700}
            data={lineChartData}
            tooltipClass="svg-line-chart-tooltip-custom"

          />
        )}
      </div>
      {chartTable.length > 0 && (
        <div style={{ gap: '100px' }} className={'M4 PopoverStyles'}>
          {chartTable}
        </div>
      )}
    </div>
  );
});

export default SurvivalCmp;
