import React, { Component } from 'react'
import '../../styles/survival.css'


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
    <div ref={ref}>pass</div>
   );
})
 
export default SurvivalCmp;
