import { dataVisualization, userdataVisualization } from '../actions/Constants';

const dataVisualizationReducer = (state = {'data':'data'}, {type,payload}) => {
  switch (type) {

    case dataVisualization.CIRCOS_REQUEST:
      return {
        ...state,
        circosSummary: payload
      }
    case dataVisualization.ONCO_REQUEST:
      return {
        ...state,
        oncoSummary: payload
      }
    case dataVisualization.KEYS_REQUEST:
      return {
        ...state,
        Keys: payload
      }
    case dataVisualization.LOLLIPOP_REQUEST:
      return {
        ...state,
        lollipopSummary:payload
      }
    case dataVisualization.REQUEST_DONE:
      return{
        ...state
      }
    case dataVisualization.VOLCANO_REQUEST:
      return {
        ...state,
        volcanoSummary: payload
      }
    case dataVisualization.HEATMAP_REQUEST:
      return {
        ...state,
        heatmapSummary: payload
      }
    default:
      return state
  }
}
export default dataVisualizationReducer;
