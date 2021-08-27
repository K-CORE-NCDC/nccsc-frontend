import BarChartComp from "../Common/HorizontalBarChart"
import StackBarChartComp from "../Common/StackedBarChart"
import Boxplot from "../Common/boxplot"
import VerticalStackBarChartComp from "../Common/VerticalStackBarChart"

const chart_types = (type,payload,axis) => {
  switch (type) {
    case "Bar":
      return <BarChartComp data={payload}/>
    case "stack_bar":
      return <StackBarChartComp data={payload} axis={axis}/>
    case "box_plot":
      return <Boxplot data={payload} />
    case "vertical_stack_bar":
      return <VerticalStackBarChartComp data={payload} />
    default:
      return ""
  }
}
export default chart_types;
