import BarChartComp from "../Common/HorizontalBarChart"
import StackBarChartComp from "../Common/StackedBarChart"

const chart_types = (type,payload,axis) => {
  switch (type) {
    case "Bar":
      return <BarChartComp data={payload}/>
    case "stack_bar":
      return <StackBarChartComp data={payload} axis={axis}/>
    default:
      return ""
  }
}
export default chart_types;
