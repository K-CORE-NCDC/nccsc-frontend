import BarChartComp from "../Common/HorizontalBarChart"
import StackBarChartComp from "../Common/StackedBarChart"
import Boxplot from "../Common/boxplot"
// import BoxPlot from "../Common/BoxPlot"
import VerticalStackBarChartComp from "../Common/VerticalStackBarChart"
import VennCmp from "../Common/Venn"

const chart_types = (type,payload,axis) => {
  switch (type) {
    case "Bar":
      return <BarChartComp data={payload}/>
    case "stack_bar":
      return <StackBarChartComp data={payload} axis={axis}/>
    case "box_plot":
      return <Boxplot data={payload}/>
      // return <BoxPlot box_data={payload}/>
    case "vertical_stack_bar":
      return <VerticalStackBarChartComp data={payload} />
    case "Venn":
        return <VennCmp width={300} data={payload}/>
    default:
      return ""
  }
}
export default chart_types;
