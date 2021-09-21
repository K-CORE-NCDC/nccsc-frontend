import React, { useState, useEffect } from 'react'
import '../../styles/survival.css'
import { Chart } from 'react-google-charts'
import { index } from 'd3'


// export default class SurvivalCmp extends React.Component {


//   render() {
//     const tooltip = this.state.tooltip
//     const donor = tooltip.donor
//     const tooltipStyle = {
//       position: 'absolute',
//       top: tooltip.y,
//       left: tooltip.x,
//       display: tooltip.isVisible ? 'block' : 'none',
//       pointerEvents: 'none',
//     }

//     return (
//       <div>
//         <div style={{'width':'960px'}}
//           ref={c => this._container = c}
//           className={this.props.className || ''}
//         />
//       </div>
//     );
//   }
// }

const SurvivalCmp = React.forwardRef(({ width, data, watermarkCss }, ref) => {
  console.log(data);
  if (data.survivalJson && data.survivalJson.all) {
    console.log(data.survivalJson.all);
  }
  const [survivalData, setSurvivalData] = useState([])
  // console.log(survivalData);

  function countUnique(iterable) {
    if (iterable) {
      return new Set(iterable).size;
    } else {
      return 0
    }
  }
  useEffect(() => {
    if (data.survivalJson && data.survivalJson.all) {
      setSurvivalData(data.survivalJson.all);
    }
  }, [data])

  // useEffect(() => {
  //   let chartsArray = [['', 'normal']]
  //   let survivalObject = { normal: {} }
  //   let sampleScore = {}
  //   let sampleScoreFilter = {}
  //   let gene = data.fileredGene
  //   // console.log(gene);
  //   let responseData = data.survivalJson

  //   if (responseData) {
  //     if (responseData.normal) {
  //       responseData.normal.time.forEach((element, index) => {
  //         survivalObject['normal'] = { ...survivalObject['normal'], [element]: responseData.normal.risk[index] }
  //       })
  //     }

  //     if (gene !== "" && gene in responseData) {
  //       chartsArray[0].push(gene)
  //       survivalObject = { ...survivalObject, [gene]: {} }

  //       responseData[gene].time.forEach((element, index) => {
  //         survivalObject[gene] = { ...survivalObject[gene], [element]: responseData[gene].risk[index] }
  //       })
  //     }

  //     let mergedArray = Object.keys(survivalObject['normal'])
  //     if (gene !== "" && gene in responseData) {
  //       mergedArray = [...mergedArray, ...Object.keys(survivalObject[gene])]
  //     }
  //     mergedArray = mergedArray.map(Number);
  //     mergedArray = mergedArray.filter(function(item, pos) {
  //       return mergedArray.indexOf(item) == pos;
  //   })
  //     mergedArray.sort(function (a, b) {  return a - b;  })

  //     // console.log(mergedArray);
  //     // mergedArray = mergedArray.splice(5,15)

  //     let oldVals = [null, null]
  //     if (gene !== "" && gene in responseData){
  //       oldVals = [Math.max(...Object.values(survivalObject['normal'])), Math.max(...Object.values(survivalObject[gene]))]
  //     }
  //     mergedArray.forEach((element, inex) => {

  //       let eachStep = [element, null, null]
  //       if (gene !== "" && gene in responseData) {
  //         if (element in survivalObject['normal']) {
  //           eachStep[1] = survivalObject['normal'][element]
  //           oldVals[0] = survivalObject['normal'][element]
  //         }

  //         if (element in survivalObject[gene]) {
  //           eachStep[2] = survivalObject[gene][element]
  //           oldVals[1] = survivalObject[gene][element]
  //         }
  //         eachStep[1] === null ? eachStep[1] = oldVals[0] : eachStep[1] = eachStep[1]
  //         eachStep[2] === null ? eachStep[2] = oldVals[1] : eachStep[2] = eachStep[2]

  //         chartsArray.push(eachStep)
  //       } else {
  //         chartsArray.push([element, survivalObject['normal'][element]])
  //       }
  //     })
  //   }
  //   chartsArray.splice(1, 1)
  //   setSurvivalData(chartsArray)
  // }, [data])

  return (
    <div ref={ref} className={`${watermarkCss} p-1`}>
      {survivalData.length > 1 && <Chart
        width={'100%'}
        height={'600px'}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={data.survivalJson.all}
        options={{
          title: "Survival Plot",
          vAxis: { title: 'Samples count' },
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
    </div>
  );
})

export default SurvivalCmp;
