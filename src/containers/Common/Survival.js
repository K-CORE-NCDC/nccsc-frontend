import React, { Component } from 'react'
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

  return (
    <div ref={ref} className={watermarkCss}>
      <Chart
        width={'100%'}
        // height={'400px'}
        chartType="SteppedAreaChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['RLPS_CNFR_DRTN', 'RLPS_CNFR_DRTN',],
          ['RN44439642', 20.7],
          ['RN02202045', 15.2],
          ['RN10281584', 12.4],
          ['RN57508938', 0.8],
          ['RN37312989', 0]
        ]}
        options={{
          title: "Survival Plot",
          vAxis: { title: 'Samples' },
          isStacked: true,
          legend: {position: 'none'}
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
})

export default SurvivalCmp;
