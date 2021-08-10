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
    case userdataVisualization.VOLCANO_REQUEST:
      return {
        ...state,
        volcanoSummary: payload
      }
    default:
      return state
  }
}
export default dataVisualizationReducer;
