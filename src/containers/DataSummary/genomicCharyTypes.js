import BarChartComp from '../Common/HorizontalBarChart';
import StackBarChartComp from '../Common/StackedBarChart';
import Boxplot from '../Common/boxplot';
import VerticalStackBarChartComp from '../Common/VerticalStackBarChart';
import VennCmp from '../Common/Venn';

const chart_types = (type, payload, axis) => {
  switch (type) {
    case 'Bar':
      return <BarChartComp data={payload} key={"GenmomicBarChart"} />;
    case 'stack_bar':
      return <StackBarChartComp data={payload} axis={axis} chart_key={"GenmomicStackBar"} />;
    case 'box_plot':
      return <Boxplot data={payload} />;
    case 'vertical_stack_bar':
      return <VerticalStackBarChartComp data={payload} key={"GenmomicVerticalStackBar"} />;
    case 'Venn':
      return <VennCmp width={300} data={payload} key={"GenmomicVenn"} />;
    default:
      return '';
  }
};

export default chart_types;
