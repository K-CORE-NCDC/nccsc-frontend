import React, { useState, useEffect } from 'react'
import '../../styles/survival.css'
import { Chart } from 'react-google-charts'


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
  const [survivalData, setSurvivalData] = useState([])

  useEffect(()=>{
    let chartsArray = [['RLPS_CNFR_DRTN', 'RLPS_CNFR_DRTN']]
    if(data.survivalJson !== undefined){
      data.survivalJson.forEach(element => {
        chartsArray.push([element.pt_sbst_no, element.rlps_cnfr_drtn])
      });
    }
    setSurvivalData(chartsArray)
  },[data])

  return (
    <div ref={ref} className={watermarkCss}>
      {survivalData.length > 1 && <Chart
        width={'100%'}
        // height={'400px'}
        chartType="SteppedAreaChart"
        loader={<div>Loading Chart</div>}
        data={survivalData}
        options={{
          title: "Survival Plot",
          vAxis: { title: 'Samples' },
          isStacked: true,
          legend: {position: 'none'}
        }}
        rootProps={{ 'data-testid': '1' }}
      />}
    </div>
  );
})

export default SurvivalCmp;
