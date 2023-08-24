import React, { useState, useEffect } from 'react';
import '../../styles/timeline.css';

const TimeLineChart = ({ yearKey, valueKey, data }) => {
  const [yearsObject, setYearsObject] = useState({});
  const [yearsArray, setYearsArray] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      let yearsObjectTemp = {};
      let yearsArrayTemp = [];
      for (let i = 0; i < 23; i++) {
        yearsObjectTemp = { ...yearsObjectTemp, [`${2000 + i}`]: [] };
        yearsArrayTemp.push(`${2000 + i}`);
      }
      data.forEach((element) => {
        let year = element[yearKey].split('-')[0];
        yearsObjectTemp[year].push(element);
      });
      setYearsObject(yearsObjectTemp);
      setYearsArray(yearsArrayTemp);
      setShowGraph(true);
    }
  }, [data]);

  return (
    <div>
      {showGraph ? (
        <div className="wraper-timeline-graph">
          <ul className="container-timeline-graph">
            {yearsArray.map((element, index) => (
              <li
                key={`${element}-${index}`}
                className={`${
                  yearsObject[element].length > 0 ? 'link-timeline-graph' : 'line-timeline-graph'
                } active-timeline-graph tooltip-timeline-graph`}
              >
                <div>{index + 2000}</div>
                {yearsObject[element].length > 0 ? (
                  <div className="tooltiptext">
                    {yearsObject[element].map((toolTipData, indexSub) => (
                      <div className="" key={`${indexSub}-${toolTipData[yearKey]}`}>
                        <span className="pr-1">{`Date: ${toolTipData[yearKey]}   `}</span>
                        <span className="pl-1"> {`Value: ${toolTipData[valueKey]}`} </span>
                        <br />
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
          <div className="m-1 p-1"></div>
        </div>
      ) : (
        <div>No content</div>
      )}
    </div>
  );
};

export default TimeLineChart;
